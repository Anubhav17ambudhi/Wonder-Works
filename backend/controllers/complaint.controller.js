import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.model.js";
import { Complaint } from "../models/complaint.model.js";
import { ComplaintHistory } from "../models/complaint_history.model.js";
import { v2 as cloudinary } from "cloudinary";

const priorityMap = {
  "Water Sanitation": "high",
  "Drainage Problem": "high",
  "Streetlight Maintenance": "medium",
  "Garbage Not Collected": "medium",
  "Road Repair": "medium",
  "Stray Animals": "low",
  Other: "low",
};

export const createComplaint = catchAsyncError(async (req, res, next) => {
  const { title, description, area, location_details, complaint_type } =
    req.body;

  if (!title || !description || !area || !location_details || !complaint_type) {
    return next(new ErrorHandler(400, "Please provide all required fields"));
  }

  const mayor = await User.findOne({ role: "mayor" });
  if (!mayor) {
    return next(new ErrorHandler(500, "No mayor found. Please contact admin."));
  }

  const assignedTo = mayor._id;

  const priority = priorityMap[complaint_type] || "low";

  const { complaint_photo } = req.files;
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
        "Invalid file type. Only png, jpg, jpeg and webp are allowed"
      )
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    complaint_photo.tempFilePath,
    { folder: "Wonder_works" }
  );
  console.log(cloudinaryResponse);
  
  if (!cloudinaryResponse) {
    console.error(
      "Error uploading complaint photo to cloudinary:",
      cloudinaryResponse.error || "Unknown error"
    );
    return next(new ErrorHandler(500, "Error uploading avatar to cloudinary"));
  }

  const complaint = await Complaint.create({
    userId : req.user._id,
    title,
    description,
    area,
    location_details,
    complaint_type,
    priority,
    assignedTo,
    photo_url: {
      publicId: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    created_by: req.user._id,
  });

  

  req.user.myComplaints.push(complaint._id);
  await req.user.save();

  await ComplaintHistory.create({
    complaint_id: complaint._id,
    updated_by_id: req.user._id,
    action_taken: `Complaint Filed on ${new Date().toLocaleString()}`,
    comment: `Complaint titled "${title}" filed by ${req.user.name}`,
  });

  res.status(201).json({
    success: true,
    message: "Complaint registered successfully",
    complaint,
  });
});

export const getAllComplaints = catchAsyncError(async (req, res, next) => {
  const complaints = await Complaint.find().populate("userId", "name email");
  res.status(200).json({
    success: true,
    complaints,
  });
});

export const getComplaintById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const complaint = await Complaint.findById(id)
    // .populate("userId", "name email")
    .populate("assignedTo", "name email")
    .populate("updated_by_id", "name email");
  if (!complaint) {
    return next(new ErrorHandler(404, "Complaint not found"));
  }
  const history = await ComplaintHistory.find({ complaint_id: id })
    .populate("updated_by_id", "name email")
    .sort({ createdAt: -1 });   
  res.status(200).json({
    success: true,
    complaint,
    history,
  });
});

// Updating a complaint's status (updateComplaintStatus)

// export const assignComplaint = catchAsyncError(async (req, res, next) => {
//   const { id } = req.params;

//   const complaint = await Complaint.findById(id); 

//   if(!complaint){
//     return next(new ErrorHandler(404, "Complaint not found"));
//   }


// });
