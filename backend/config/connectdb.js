import mongoose from "mongoose"


export const connectDb = async ()=>{
  try {
    await  mongoose.connect(process.env.MONGO_URL)
    console.log(`Database is connected on host ${mongoose.connection.host}`)
  } catch (error) {
    console.log(error)
  }   
}

