import { Parser } from "json2csv";
import { Area } from "../models/area.model.js";
import fs from "fs";
import csv from "csv-parser";
import { User } from "../models/user.model.js";
import { sendEmail } from "../utils/sendEmail.js"; // Uncomment when ready

// Fixed typo in chars and "License" category
const generateRandomPassword = () => {
  const length = 10;
  const chars =
    "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let password = "";
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * chars.length);
    password += chars[index];
  }
  return password;
};

const CATEGORIES = [
  "Street Light",
  "Public Toilet",
  "Tax and Lisence",
  "Garbage",
  "Water Stagnation",
  "Storm Water Drains",
  "Floods",
  "Park and Playground",
  "Road and footpaths",
  "Water Supply",
  "Sewerage & Manholes",
  "Air Quality",
  "Noise Pollution",
  "Stray Animals",
  "general",
];

export const downloadAssignmentTemplate = async (req, res, next) => {
  try {
    const areas = await Area.find({}, "name zipCode");
    const csvRows = [];

    for (const area of areas) {
      for (const category of CATEGORIES) {
        const supervisor = await User.findOne({
          area: area._id,
          category,
        });

        csvRows.push({
          "Area Name": area.name,
          "Zip Code": area.zipCode,
          Category: category,
          "Supervisor Name": supervisor?.name || "",
          "Supervisor Email": supervisor?.email || "",
        });
      }
    }

    const parser = new Parser();
    const csvData = parser.parse(csvRows);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=supervisor_assignment_template.csv",
    );

    return res.status(200).send(csvData);
  } catch (error) {
    next(error);
  }
};

export const uploadFilledAssignments = async (req, res, next) => {
  try {
    // 1. Validation: Ensure file exists and key is 'file'
    console.log("FILES:", req.files);

    if (!req.files || !req.files.assign_csv) {
      return res.status(400).json({
        message: "Please upload the filled CSV file using the key 'assign_csv'",
      });
    }

    const uploadedFile = req.files.assign_csv;
    const results = [];
    const errors = [];
    let successCount = 0;

    // 2. Stream Processing
    fs.createReadStream(uploadedFile.tempFilePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("error", (err) => {
        // Cleanup on stream error
        try {
          fs.unlinkSync(uploadedFile.tempFilePath);
        } catch (e) {}
        return next(err);
      })
      .on("end", async () => {
        // Process collected rows
        try {
          for (const row of results) {
            const email = row["Supervisor Email"]?.trim();
            const name = row["Supervisor Name"]?.trim();
            const zipCode = row["Zip Code"]?.trim();
            const category = row["Category"]?.trim();

            // Skip rows without email
            if (!email) continue;

            try {
              const area = await Area.findOne({ zipCode });
              if (!area) {
                errors.push(`Area with Zip ${zipCode} not found.`);
                continue; // Skip this row, move to next
              }

              let supervisor = await User.findOne({ email });

              if (!supervisor) {
                const password = generateRandomPassword();

                supervisor = await User.create({
                  name: name || "Supervisor",
                  email,
                  password,
                  role: "supervisor",
                  area: area._id,
                  category,
                });

                await sendEmail({
                  email,
                  subject: "Welcome",
                  msg: `Your credentials... Password: ${password}`,
                });

                successCount++;
                continue;
              }

              // 🚨 Existing supervisor case
              if (supervisor.area) {
                errors.push(
                  `Supervisor ${email} already assigned to area ${supervisor.area}. Skipping.`
                );
                continue;
              }

              // ✅ Assign only if unassigned
              supervisor.area = area._id;
              supervisor.category = category;
              await supervisor.save();

              successCount++;
            } catch (err) {
              errors.push(`Error processing ${email}: ${err.message}`);
            }
          }

          res.status(200).json({
            success: true,
            message: `Processed. Assigned/Updated ${successCount} supervisors.`,
            errors: errors.length > 0 ? errors : null,
          });
        } catch (processError) {
          next(processError);
        } finally {
          // 3. FINAL CLEANUP: Always delete the temp file
          try {
            if (fs.existsSync(uploadedFile.tempFilePath)) {
              fs.unlinkSync(uploadedFile.tempFilePath);
            }
          } catch (cleanupErr) {
            console.error("Failed to delete temp file:", cleanupErr);
          }
        }
      });
  } catch (error) {
    next(error);
  }
};
