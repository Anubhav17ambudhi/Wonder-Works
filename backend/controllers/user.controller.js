import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.model.js";
import { generateForgotPasswordEmailTemplate } from "../utils/emailTemplate.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new ErrorHandler(400, "Please provide email ans password.")
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler(400, "Invalid Email Or Password"));
  }
  const isPasswordMatched = await user.comparePasswords(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler(400, "Invalid Email Or Password"));
  }
  // console.log("user logged in");

  sendToken(user, 201, res, "User Logged In!");
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});

export const getUser = catchAsyncError((req, res, next) => {
  // console.log("here at getuser");

  const user = req.user;
  // console.log(user);

  res.status(200).json({
    success: true,
    user,
  });
});

export const forgotPassword = catchAsyncError(async (req, res, next) => {
  if (!req.body.email) {
    return next(new ErrorHandler(400, "Please provide email"));
  }
  const { email } = req.body;
  if (!email) {
    return next(new ErrorHandler(400, "Please provide email"));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler(400, "Invalid Email"));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateModifiedOnly: false });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  console.log("yaha tk bhi chal rha hai");
  
  const message = generateForgotPasswordEmailTemplate(resetPasswordUrl);

  try {
    await sendEmail({
      email: user.email,
      subject: "Wonder Works Password Recovery",
      msg: message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} with password reset instructions`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(500, error.message));
  }
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }, // Check if the token is still valid
  });
  if (!user) {
    return next(new ErrorHandler(400, "Invalid or expired reset token"));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler(400, "Passwords do not match"));
  }

  if (req.body.password.length < 8 || req.body.password.length > 16) {
    return next(
      new ErrorHandler(
        400,
        "Password must be at least 8 characters long and less than 16 characters"
      )
    );
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save({ validateBeforeSave: false });

  sendToken(user, 200, res, "Password reset successfully");
});

export const updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");
  const { currentPassword, newPassword, confirmPassword } = req.body;
  if (!currentPassword || !newPassword || !confirmPassword) {
    return next(new ErrorHandler(400, "Please provide all fields"));
  }

  const isPasswordMatched = await user.comparePasswords(currentPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler(400, "Current password is incorrect"));
  }
  if (newPassword.length < 8 || newPassword.length > 16) {
    return next(
      new ErrorHandler(
        400,"Password must be at least 8 characters long and less than 16 characters"
      )
    );
  }
  if (newPassword !== confirmPassword) {
    return next(
      new ErrorHandler(400, "New password and confirm password do not match")
    );
  }

  // const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = newPassword;
  await user.save({ validateModifiedOnly: false });

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});
