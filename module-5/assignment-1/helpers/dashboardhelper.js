import userOrder from "../models/model.js";

export const dashboard={
    allOrders:async()=>{
        try{
           return userOrder.find()
        }
        catch(err){
            throw err
        }
    }
}