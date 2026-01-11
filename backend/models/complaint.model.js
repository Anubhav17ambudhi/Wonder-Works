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
      area: { type: String, required: true },
      locality: { type: String, required: true },
      street: { type: String, required: true },
      location_details: { type: String, required: true },
    },

    description: { type: String, required: true },
    
    photo_url: {
      publicId: { type: String, required: true },
      url: { type: String, required: true },
    },

    complaint_id: { type: String, required: true, unique: true },

    type_of_complaint: { type: String, required: false, default: "general"},

    priority: {type: Number,enum: [1,2,3,4,5,6,7,8,9,10], default: 5},
    
    assinedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

// create a model
export const Complaint = mongoose.model("Complaint", complaintSchema);
