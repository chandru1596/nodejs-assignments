import mongoose from "mongoose"

const userPurchase= new mongoose.Schema({
    name:{type:String, required:true},
    address:{type:String, required:true},
    mobile:{type:String, required:true, match: [/^\d{10}$/, "Mobile number must be exactly 10 digits"] },
    email:{type:String, required:true, unique:true},
    date:{type:Date, default:Date.now},
    products:[
        {
        item:{type:String, required:true},
        quantity:{type:Number, required:true},
        rate:{type:Number, required:true}
    }
    ]
})

 const userOrder= mongoose.model('userOrders', userPurchase)
 
 export default userOrder

