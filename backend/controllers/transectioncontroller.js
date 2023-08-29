import { transectionModel } from "../models/transectionModel.js";
import moment from "moment"

export const getAllTransection = async (req, res)=>{
   try {
    const {frequesny,selectedDate,type} = req.body;
    const transections = await transectionModel.find({
      ...(frequesny !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequesny), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),userid: req.body.userid, ...(type !== "all" && {type})});
    res.status(200).json(transections)
    
   } catch (error) {
    console.log(error)
    res.status(500).send(error)
   }
}
export const addTransection = async (req, res)=>{
  try {
    const newTransection = new transectionModel(req.body);
    await newTransection.save()

    res.status(201).json({
        success:true,
        newTransection
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export const deleteTransection = async (req, res)=>{
   try {
    
    await transectionModel.findOneAndDelete({_id:req.body.transectionId})
    res.status(200).send("Transection Deleted")
   } catch (error) {
     console.log(error)
     res.status(500).josn(error)
   }
}


