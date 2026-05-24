import nodemailer from "nodemailer";
import ErrorHandler from "../middlewares/error.js";
import { log } from "console";

export const sendEmail = async ({ email, subject, msg }) => {
  if (!email || typeof email !== "string" || !email.includes("@")) {
    console.log("email.typeof:", typeof email);
    
    throw new ErrorHandler(400,"Invalid or missing recipient email address.");
  }

  try {
    console.log("📧 Preparing to send email to:", email);
    // console.log("MAIL:", process.env.SMTP_MAIL);
    // console.log("PASS:", process.env.SMTP_PASSWORD);
    const transporter = nodemailer.createTransport({
      // host: process.env.SMTP_HOST,
      // port: Number(process.env.SMTP_PORT) || 587,
      service: process.env.SMTP_SERVICE,
      auth: { 
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    console.log("yaha tk chal rha hai");
    

    const mailOptions = {
      from: `"Wonder Works mail system" <${process.env.SMTP_MAIL}>`,
      to: email,
      subject: subject,
      html: msg,
    }; 
    console.log("Working till mailOptions");
    
    await transporter.verify();
    console.log("SMTP verified");
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.response);
  } catch (error) {
    console.error("❌ Failed to send email:", error.message);
    throw new ErrorHandler(400,"Email sending failed");
  }
};
