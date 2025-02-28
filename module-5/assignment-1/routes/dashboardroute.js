import express from 'express'
import { dashboard } from '../helpers/dashboardhelper.js'

const router=express.Router()

router.get('/',async(req,res)=>{
    try{
     const result = await dashboard.allOrders()
     console.log(result)
     result? res.json(result):res.status(404).json({message:'orders not found'})
    }
    catch(err){
        res.status(500).json({error:'DB error'})

    }
    })
  export const dashboardRoute= router  