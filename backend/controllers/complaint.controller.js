import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateComplainAcceptanceEmailTemplate } from "../utils/emailTemplate.js";
import { Complaint } from "../models/complaint.model.js";
import { Area } from "../models/area.model.js";
import { v2 as cloudinary } from "cloudinary";
// import { User } from "../models/user.model.js";

// const priorityMap = {
//   "Water Sanitation": "high",
//   "Drainage Problem": "high",
//   "Streetlight Maintenance": "medium",
//   "Garbage Not Collected": "medium",
//   "Road Repair": "medium",
//   "Stray Animals": "low",
//   Other: "low",
// };

function generateComplaintId() {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(100 + Math.random() * 900);
  return `CMP-${timestamp}-${random}`;
}

export const createComplaint = catchAsyncError(async (req, res, next) => {
  const {
    name,
    email,
    phone,
    person_address,
    area,
    locality,
    zipCode,
    description,
  } = req.body;

  if (!name || !email || !area || !locality || !description || !zipCode) {
    return next(new ErrorHandler(400, "Please provide all required fields"));
  }
  const existingArea = await Area.findOne({ zipCode });
  if (!existingArea) {
    return next(new ErrorHandler(400, "The specified area does not exist"));
  }

  let photoData = null;

  if (req.files && req.files.complaint_photo) {
    const { complaint_photo } = req.files;
    // console.log(req.files);

    const allowedFileTypes = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp",
    ];
    if (!allowedFileTypes.includes(complaint_photo.mimetype)) {
      return next(
        new ErrorHandler(
          400,
          "Invalid file type. Only png, jpg, jpeg and webp are allowed",
        ),
      );
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
      complaint_photo.tempFilePath,
      { folder: "Wonder_works" },
    );
    // console.log(cloudinaryResponse);

    if (!cloudinaryResponse) {
      console.error(
        "Error uploading complaint photo to cloudinary:",
        cloudinaryResponse.error || "Unknown error",
      );
      return next(
        new ErrorHandler(500, "Error uploading complaint photo to cloudinary"),
      );
    }

    photoData = {
      publicId: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  //creating the logic for generating the unique complaint ID,type,Priority and the
  //assignment to a supervisor also will be done here
  const complaint_id = generateComplaintId();

  const complaint = await Complaint.create({
    person_details: {
      name,
      email,
      phone,
      street_address: person_address,
    },
    location: existingArea._id,
    photoUrl: photoData,
    status: "OPEN",
    description,
    complaint_id,
  });
  // await complaint.save({ validateBeforeSave: false });
  // complaint.save();

  const msg = generateComplainAcceptanceEmailTemplate(complaint.complaint_id);

  try {
    await sendEmail({
      email: complaint.person_details.email,
      subject: "Acceptance of your complaint - Wonder Works",
      msg,
    });
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }

  res.status(201).json({
    success: true,
    message: "Complaint registered successfully",
    complaint,
  });
});

export const getNewComplaints = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return ErrorHandler(400, "Supervisor not found");
  }
  const complaints = await Complaint.find({
    assinedTo: user._id,
    status: "IN",
  }).sort({ priority: -1 });
  return res.status(200).json({
    success: true,
    message: complaints.length
      ? "Complaints fetched successfully"
      : "No complaints assigned currently",
    complaints, // empty array if none
    count: complaints.length,
  });
});

export const assignmentofComplaintbySuperVisor = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    const user = req.user;

    if (!user) {
      return next(new ErrorHandler(400, "Supervisor not found"));
    }
    const complaint = await Complaint.findOne({ complaint_id: id });
    if (!complaint) {
      return next(new ErrorHandler(404, "Complaint not found"));
    }
    complaint.status = "PROGRESS";
    await complaint.save();
    await sendEmail({
      email: complaint.person_details.email,
      subject: `Complaint status update for complaint_id: ${complaint.complaint_id}`,
      msg: `Your complaint is now being addressed by one our team worker. We appreciate your patience and will keep you updated on the progress.`,
    });
    return res.status(200).json({
      success: true,
      message: "Complaint assigned successfully",
      complaint,
    });
  },
);

export const complainResolvedBySuperVisor = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    const user = req.user;

    if (!user) {
      return next(new ErrorHandler(400, "Supervisor not found"));
    }
    const complaint = await Complaint.findOne({ complaint_id: id });
    if (!complaint) {
      return next(new ErrorHandler(404, "Complaint not found"));
    }
    complaint.status = "RESOLVED";
    await complaint.save();
    await sendEmail({
      email: complaint.person_details.email,
      subject: `Complaint status update for complaint_id: ${complaint.complaint_id}`,
      msg: `We are pleased to inform you that your complaint has been resolved. Thank you for bringing this to our attention and helping us improve our community services.`,
    });
    return res.status(200).json({
      success: true,
      message: "Complaint Resolved successfully",
      complaint,
    });
  },
);

export const getEscalatedComplaints = catchAsyncError(
  async (req, res, next) => {
    const user = req.user;
    if (!user) {
      return ErrorHandler(400, "Mayor not found");
    }

    const complaints = await Complaint.find({ status: "ESCALATED" }).sort({
      priority: -1,
    });
    return res.status(200).json({
      success: true,
      message: complaints.length
        ? "Escalated Complaints fetched successfully"
        : "No escalated complaints currently",
      complaints, // empty array if none
      count: complaints.length,
    });
  },
);

export const escalatedComplainResolvedByMayor = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    const user = req.user;

    if (!user) {
      return next(new ErrorHandler(400, "Mayor not found"));
    }
    const complaint = await Complaint.findOne({ complaint_id: id });
    if (!complaint) {
      return next(new ErrorHandler(404, "Complaint not found"));
    }
    complaint.status = "RESOLVED";
    await complaint.save();
    await sendEmail({
      email: complaint.person_details.email,
      subject: `Complaint status update for complaint_id: ${complaint.complaint_id}`,
      msg: `We are pleased to inform you that your complaint has been resolved by the mayor. Thank you for bringing this to our attention and helping us improve our community services.`,
    });
    return res.status(200).json({
      success: true,
      message: "Complaint Resolved successfully by mayor",
      complaint,
    });
  },
);

export const getComplaintByAreaandLocality = catchAsyncError(
  async (req, res, next) => {
    const { zipCode, locality } = req.body;

    if (!zipCode || !locality) {
      return next(new ErrorHandler(400, "Please Provide Area and locality"));
    }

    const area = await Area.findOne({ zipCode });

    if (!area) {
      return next(new ErrorHandler(400, "No area with this ZipCode"));
    }
    let complaints;
    if (locality === "all") {
      complaints = await Complaint.find({
        location: area._id,
        status: { $ne: "RESOLVED" },
      });
    } else {
      complaints = await Complaint.find({
        location: area._id,
        locality: locality,
        status: { $ne: "RESOLVED" },
      });
    }
    return res.status(200).json({
      success: true,
      message: "Complaints are fetched successfully",
      complaints,
    });
  },
);

export const allAreawiseComplaints = catchAsyncError(async (req, res, next) => {
  const complaintsCount = await Complaint.aggregate([
    {
      $match: {
        status: { $ne: "RESOLVED" }, // ✅ correct enum
      },
    },
    {
      $group: {
        _id: "$location", // group by Area ObjectId
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "areas", // collection name (lowercase plural)
        localField: "_id",
        foreignField: "_id",
        as: "area",
      },
    },
    {
      $unwind: "$area",
    },
    {
      $project: {
        _id: 0,
        areaId: "$area._id",
        areaName: "$area.name",
        zipCode: "$area.zipCode",
        count: 1,
      },
    },
    {
      $sort: { count: -1 }, // 🔥 most problematic areas first
    },
  ]);

  return res.status(200).json({
    success: true,
    message: "Area-wise complaint count fetched successfully",
    complaintsCount,
  });
});

export const allCategoryWiseComplaints = catchAsyncError(
  async (req, res, next) => {
    const complaintsCount = await Complaint.aggregate([
      {
        $match: {
          status: { $ne: "RESOLVED" }, // ✅ correct filter
        },
      },
      {
        $group: {
          _id: "$type_of_complaint", // ✅ correct field
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          count: 1,
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Category-wise complaint count fetched successfully",
      complaintsCount,
    });
  },
);

export const categoryWiseComplaintsByArea = catchAsyncError(
  async (req, res, next) => {
    const { areaId } = req.params;

    const complaintsCount = await Complaint.aggregate([
      {
        $match: {
          location: new mongoose.Types.ObjectId(areaId), // ✅ filter by area
          status: { $ne: "RESOLVED" }, // ✅ exclude resolved
        },
      },
      {
        $group: {
          _id: "$type_of_complaint", // ✅ group by category
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          count: 1,
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Category-wise complaints for area fetched successfully",
      complaintsCount,
    });
  },
);