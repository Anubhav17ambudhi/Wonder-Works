import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";

export const registerMayor = catchAsyncError(async (req, res, next) => {
  const { name, email, password, registrationKey } = req.body;

  // 🔐 Security check
  if (registrationKey !== process.env.MAYOR_REGISTRATION_KEY) {
    return next(new ErrorHandler(403, "Unauthorized mayor registration"));
  }

  if (!name || !email || !password) {
    return next(new ErrorHandler(400, "All fields are required"));
  }

  const existingMayor = await User.findOne({ role: "mayor" });
  if (existingMayor) {
    return next(new ErrorHandler(409, "Mayor already exists for this city"));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler(409, "Email already registered"));
  }

  // const hashedPassword = await bcrypt.hash(password, 12);

  const mayor = await User.create({
    name,
    email,
    password,
    role: "mayor",
  });

  res.status(201).json({
    success: true,
    message: "Mayor registered successfully",
    mayor: {
      id: mayor._id,
      name: mayor.name,
      email: mayor.email,
    },
  });
});
