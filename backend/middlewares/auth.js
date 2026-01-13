import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { catchAsyncError } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      new ErrorHandler(401, "This user is not authenticated / token not found")
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    console.log("Yaha authentication ho gya hai");
    
    next();
  } catch (error) {
    // This will catch the specific error from jwt.verify
    console.error("JWT Verification Failed:", error.message);
    return next(
      new ErrorHandler(
        401,
        `JSON Web Token is invalid. Error: ${error.message}`
      )
    );
  }
});

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(
        new ErrorHandler(
          401,
          "User not found in request / user can't be authorized"
        )
      );
    }
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          403,
          `Role:with this role (${req.user.role}) is not allowed to access this resource`
        )
      );
    }
    next();
  };
};
