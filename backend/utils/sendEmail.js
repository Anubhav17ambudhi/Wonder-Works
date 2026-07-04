import { Resend } from "resend";
import ErrorHandler from "../middlewares/error.js";

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ email, subject, msg }) => {
  if (!email || typeof email !== "string" || !email.includes("@")) {
    console.log("email.typeof:", typeof email);
    throw new ErrorHandler(400, "Invalid or missing recipient email address.");
  }

  try {
    console.log("📧 Preparing to send email via Resend to:", email);
    
    // Resend uses 'onboarding@resend.dev' by default for testing. 
    // In production, configure RESEND_FROM_EMAIL with your verified domain.
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@thefearlesscoder.site";
    
    const { data, error } = await resend.emails.send({
      from: `"Wonder Works" <${fromEmail}>`,
      to: [email],
      subject: subject,
      html: msg,
    });

    if (error) {
      console.error("❌ Resend API Error:", error);
      throw new ErrorHandler(400, "Email sending failed");
    }

    console.log("✅ Email sent successfully:", data);
  } catch (error) {
    console.error("❌ Failed to send email:", error.message);
    throw new ErrorHandler(400, "Email sending failed");
  }
};
