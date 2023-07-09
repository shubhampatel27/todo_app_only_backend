import jwt from "jsonwebtoken";
import { User } from "../model/user.js";

export const isAuthenticated = async (req, res, next) => {
  let { token } = req.cookies;

  if (!token) {
    return res.status(404).json({
      success: false,
      message: "login first mere dost",
    });
  }

  let decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded);

  next();
};
