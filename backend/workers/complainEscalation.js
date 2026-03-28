import cron from "node-cron";
import "dotenv/config";
import { Complaint } from "../models/complaint.model.js";
import { User } from "../models/user.model.js";
import { sendEmail } from "../utils/sendEmail.js";

export const escalateComplaints = () => {  
  cron.schedule("*/1 * * * *", async () => {
    console.log("🤖 Complaint escalator: waking up...");

    try {
      const batch = await Complaint.find({
        status: { $in: ["IN", "OPEN"] },
        createdAt: { $lte: new Date(Date.now() - 120 * 60 * 60 * 1000) },
      });

      for(const complain of batch){
        const supervisor = await User.findById(complain.assinedTo);
        if(supervisor){
          sendEmail({
            email: supervisor.email,
            subject: "Complaint Escalation",
            msg: `Complaint assigned to you has been escalated to the mayor with complaint_id: ${complain.complaint_id}`,
          })
        }
        complain.status = "ESCALATED";
        await complain.save(); 
        console.log("Complaint escalated to mayor");
      }
    } catch (err) {
      console.error("Worker Error:", err);
    }
  });
};