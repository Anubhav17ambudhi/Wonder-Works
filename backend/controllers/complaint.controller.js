import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
// import { User } from "../models/user.model.js";
import { Complaint } from "../models/complaint.model.js";
// import { ComplaintHistory } from "../models/complaint_history.model.js";
import { v2 as cloudinary } from "cloudinary";
// import { complaintQueue } from "../queues/ComplainQueue.js";

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
    street,
    location_details,
    description,
  } = req.body;

  if (!name || !email || !area || !locality || !street || !description) {
    return next(new ErrorHandler(400, "Please provide all required fields"));
  }

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
  // console.log(cloudinaryResponse);

  if (!cloudinaryResponse) {
    console.error(
      "Error uploading complaint photo to cloudinary:",
      cloudinaryResponse.error || "Unknown error"
    );
    return next(
      new ErrorHandler(500, "Error uploading complaint photo to cloudinary")
    );
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
    location: {
      area,
      locality,
      street,
      location_details,
    },
    photoUrl: {
      publicId: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    status: "OPEN",
    description,
    complaint_id
  });
  complaint.save();

  res.status(201).json({
    success: true,
    message: "Complaint registered successfully",
    complaint,
  });
});

// export const getAllComplaints = catchAsyncError(async (req, res, next) => {
//   const complaints = await Complaint.find().populate("userId", "name email");
//   res.status(200).json({
//     success: true,
//     complaints,
//   });
// });

// export const getComplaintById = catchAsyncError(async (req, res, next) => {
//   const { id } = req.params;
//   const complaint = await Complaint.findById(id)
//     // .populate("userId", "name email")
//     .populate("assignedTo", "name email")
//     .populate("updated_by_id", "name email");
//   if (!complaint) {
//     return next(new ErrorHandler(404, "Complaint not found"));
//   }
//   const history = await ComplaintHistory.find({ complaint_id: id })
//     .populate("updated_by_id", "name email")
//     .sort({ createdAt: -1 });
//   res.status(200).json({
//     success: true,
//     complaint,
//     history,
//   });
// });

// Updating a complaint's status (updateComplaintStatus)

// export const assignComplaint = catchAsyncError(async (req, res, next) => {
//   const { id } = req.params;

//   const complaint = await Complaint.findById(id);

//   if(!complaint){
//     return next(new ErrorHandler(404, "Complaint not found"));
//   }

// });
