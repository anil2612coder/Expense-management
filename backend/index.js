import express  from "express";
import cors from "cors";
import dotenv from "dotenv"
import { connectDb } from "./config/connectdb.js";
import userRoute from "./routes/userRoute.js"

const app = express();

// config
dotenv.config({path: './config/.env'})
connectDb();

// middleware
app.use(express.json())
app.use(cors())

//routes
app.use("/api/v1/users",userRoute )


// Port
const PORT = process.env.PORT || 5000

//  listen
app.listen(PORT, ()=>{
    console.log(`Server in working  on port ${PORT}`)
})

