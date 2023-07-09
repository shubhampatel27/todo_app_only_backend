import express from "express";
import { getMyProfile, login, logout, register } from "../controller/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", register);
router.post("/login", login);

router.get("/my", isAuthenticated, getMyProfile);

router.get("/logout",logout);

export default router;
