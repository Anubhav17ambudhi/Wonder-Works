import mongoose from "mongoose";
const complaintSchema = new mongoose.Schema(
  {
    person_details: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: false },
      street_address: { type: String, required: false },
    },

    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Area",
    },
    locality: { type: String, required: false },

    description: { type: String, required: true },

    photoUrl: {
      publicId: { type: String, required: false },
      url: { type: String, required: false },
    },

    complaint_id: { type: String, required: true, unique: true },

    type_of_complaint: { type: String, required: false, default: "general" },

    priority: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      default: 5,
    },

    assinedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    status: {
      type: String,
      enum: ["OPEN", "IN", "PROGRESS", "RESOLVED", "ESCALATED"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// create a model
export const Complaint = mongoose.model("Complaint", complaintSchema);
