import { User } from "../model/user.js";
import bcrypt from "bcryptjs";
import { sendCookies } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";


export const login = async (req, res,next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");

    if (!user)
      return next(new ErrorHandler("incorrect password or Email", 400));
    else {
      let match = await bcrypt.compare(password, user.password);

      if (!match)
        return next(new ErrorHandler("incorrect password or Email", 400));
      else {
        sendCookies(user, res, `welcome mere dost ${user.name}`, 201);
      }
    }
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try { 
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("user already exits", 400));
    else {
      const hpassword = await bcrypt.hash(password, 10);

      user = await User.create({
        name,
        email,
        password: hpassword,
      });
      sendCookies(user, res, "Register ho Gya hai Dost", 201);
    }
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    message: "haa dost ho gya done",
  });
};

export const logout = (req, res) => {
  res
  .status(200)
  .cookie("token", "", {
    expires: new Date(Date.now()),
    sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
    secure: process.env.NODE_ENV === "Develpoment" ? false : true,
  })
  .json({
    success: true,
    user: req.user,
  });
};
