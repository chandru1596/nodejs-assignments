import express from 'express'
import { users_order } from '../helpers/userOrderHelper.js'

const router= express.Router()

router.post('/',async(req,res)=>{
   try{
    const order= req.body
    const result = await users_order.addOrder(order)
    console.log(result)
    result ? res.status(201).json({message:'order placed Successfully'}):  res.status(400).json({error:'something went wrong'})
   }
   catch(err){
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: errors });
  }
     res.status(500).json({message:'DB error', error: err.message})
   }
})

export const userOrderRoute=router