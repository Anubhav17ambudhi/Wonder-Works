import cron from "node-cron";
import axios from "axios"; // Needed to fetch the image bytes
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import "dotenv/config";
import {Complaint} from "../models/complaint.model.js";
import {User} from "../models/user.model.js";
import {sendEmail } from "../utils/sendEmail.js";

// 1. Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use the "flash" model - it's fast, free-tier eligible, and smart enough
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json", // Force JSON output
  },
});


const VALID_CATEGORIES = [
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

// --- HELPER: Convert Image URL to Base64 for Gemini ---
async function urlToGenerativePart(url) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    return {
      inlineData: {
        data: Buffer.from(response.data).toString("base64"),
        mimeType: response.headers["content-type"] || "image/jpeg",
      },
    };
  } catch (error) {
    console.error("Failed to fetch image for AI:", error.message);
    return null;
  }
}

// --- AI CLASSIFIER FUNCTION ---
async function classifyComplaint(description, photoUrl) {
  console.log(photoUrl);
  
  const prompt = `
    You are an intelligent City Dispatcher. Analyze the complaint.
    
    Output a JSON object with strictly these two fields:
    1. "category": One of ${JSON.stringify(VALID_CATEGORIES)}.
       - If vague/unclear, use "General".
    2. "priority": Integer 1-10 based on urgency (10=Life Threatening, 1=Cosmetic).

    Complaint Description: "${description}"
  `;

  try {
    // Prepare the input parts (Text + Optional Image)
    const inputParts = [prompt];

    if (photoUrl !== null && photoUrl.url && photoUrl.url.startsWith("http")) {
      const imagePart = await urlToGenerativePart(photoUrl.url);
      if (imagePart) {
        inputParts.push(imagePart);
      }
    }

    // Call Gemini
    const result = await model.generateContent(inputParts);
    const response = await result.response;
    const text = response.text();

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return { category: "general", priority: 5 }; // Fallback
  }
}

// --- ASSIGNMENT LOGIC (Same as before) ---
async function assignSupervisor(complaint, category) {
  let supervisor = await User.findOne({
    role: "supervisor",
    category,
    area: complaint.location,
  });

  if (!supervisor) {
    supervisor = await User.findOne({
      role: "supervisor",
      department: "general",
      area: complaint.location,
    });
  }

  if (supervisor) {
    complaint.assinedTo = supervisor._id;
    complaint.status = "IN";
    supervisor.myComplaints.push(complaint._id);
    await supervisor.save();
    await complaint.save();
    await sendEmail({
      email: supervisor.email,
      subject: `New Complaint Assigned: ${complaint.complaint_id}`,
      msg: `A new complaint has been assigned to you. Please check your dashboard.`,
    });
    await sendEmail({
      email: complaint.person_details.email,
      subject: `Complaint status track of complaint_id: ${complaint.complaint_id}`,
      msg: `Your complaint has been assigned to our supervisor and is now being processed. You can track the status using your complaint ID.`,
    });
  } else {
    console.error("CRITICAL: No General Supervisor found!");
  }
}

// --- CRON WORKER ---
export const startDispatcher = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("🤖 GEMINI DISPATCHER: waking up...");

    try {
      const batch = await Complaint.find({
        status: "OPEN",
        type_of_complaint: "general",
      }).limit(10);

      if (batch.length === 0) return;

      for (const complaint of batch) {
        const result = await classifyComplaint(
          complaint.description,
          complaint.photoUrl
        );

        if (result) {
          complaint.type_of_complaint = result.category;
          complaint.priority = result.priority;
          // complaint.aiAnalysisLog = `Gemini: ${result.category} (Prio: ${result.priority})`;

          await assignSupervisor(complaint, result.category);
          console.log("now complaint is saved");
          
          await complaint.save();

          console.log(
            `✅ [${complaint.complaint_id}] Processed: ${result.category}`
          );
        }
      }
    } catch (err) {
      console.error("Worker Error:", err);
    }
  });
};
