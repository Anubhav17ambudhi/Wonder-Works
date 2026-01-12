import mongoose from "mongoose";

const areaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide an area name"],
      unique: true, // Prevent duplicate areas like "Downtown"
      trim: true,
    },
    zipCode: {
      type: String,
      required: [true, "Please provide a zip code or area code"],
    },
    localities: [{ type: String }],
    // Optional: Link a supervisor to this area immediately or later
    assignedSupervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // To track which Mayor created it
      required: true,
    },
  },
  { timestamps: true }
);

export const Area = mongoose.model("Area", areaSchema);
