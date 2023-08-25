import express from "express"
import { loginController, registerController } from "../controllers/usercontroller.js";

export const router = express.Router();


// login / register router

router.post("/login",loginController )
router.post("/register",registerController )