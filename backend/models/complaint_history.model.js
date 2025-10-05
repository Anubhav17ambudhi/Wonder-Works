import mongoose from "mongoose";

const complaintHistorySchema = new mongoose.model({
  complaint_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Complaint'
  },
  updated_by_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  action_taken: {
    type: String
  },
  comment: {
    type: String
  }
},
{
  timestamps: true
})

export const ComplaintHistory = mongoose.model("ComplaintHistory", complaintHistorySchema);