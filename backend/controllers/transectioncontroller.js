import { transectionModel } from "../models/TransectionModel.js";
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


