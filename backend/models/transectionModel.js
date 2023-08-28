import mongoose from "mongoose"


const transectionSchema = new mongoose.Schema({
    userid:{
   type:String,
   required :true
    },
    amount:{
    type: Number,
    required:[true, "amount is required"]
    },
    type:{
      type:String,
      required:[true, "type is required"]
    },
    category:{
        type:String,
        required:[true, "Category is required"]
    },
    refrence:{
        type:String

    },
    description:{
        type:String,
        required:[true, "Description is required"]
    },
    date:{
        type:Date,
        required :[true, "Date is required"]
    }

},{timestamps:true})

export const transectionModel = mongoose.model("transections", transectionSchema)