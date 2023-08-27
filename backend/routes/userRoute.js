import express from "express"
import { loginController, registerController } from "../controllers/usercontroller.js";

 const router = express.Router();


// login / register router

router.post("/login",loginController )
router.post("/register",registerController )


export default router;