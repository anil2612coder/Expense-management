import { transectionModel } from "../models/TransectionModel.js"

export const getAllTransection = async (req, res)=>{
   try {
    const transections = await transectionModel.find({userid: req.body.userid});
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


