import express from "express"
import {  addTransection, getAllTransection ,deleteTransection } from "../controllers/transectioncontroller.js";

 const router = express.Router();

router.post("/add-transection", addTransection)
router.post("/get-transection", getAllTransection)
router.post("/delete-transection", deleteTransection)


export default router