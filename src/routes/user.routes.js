import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";

const router = Router();
// register router
router.route("/signup").post(registerUser);
// login router
router.route("/login").post(loginUser);

export default router;
