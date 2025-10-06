import mongoose from "mongoose";
const complaintSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: { type: String, required: true },

    description: { type: String, required: true },

    status: {
      type: String,
      enum: ["open", "in", "in_progress", "resolved"],
      default: "open",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    area: { type: String, required: true },

    location_details: { type: String, required: true },

    complaint_type: {
      type: String,
      enum: [
        "Water Sanitation",
        "Drainage Problem",
        "Streetlight Maintenance",
        "Garbage Not Collected",
        "Road Repair",
        "Stray Animals",
        "Other",
      ],
      required: true,
    },

    photo_url: {
      publicId: String,
      url: String,
    },

    updated_by_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    resolved_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// create a model
export const Complaint = mongoose.model("Complaint", complaintSchema);
