import express from "express";
const router = express.Router();

import HomeController from "../controllers/home.js";
import signupVerification from "../middlewares/signupVerification.js";
import authVerification from "../middlewares/authVerification.js";

import { signUp, signIn } from "../controllers/authCtrl.js";

router.get("/", HomeController);
router.post("/signup", signupVerification, signUp);
router.post("/signin", authVerification, signIn);

export default router;
