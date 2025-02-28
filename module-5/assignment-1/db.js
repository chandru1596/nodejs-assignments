import mongoose from "mongoose"
const mongoURL= 'mongodb://localhost:27017/nodelearning'

async function dbConnect(){
    try{
   await mongoose.connect(mongoURL)
   console.log('mongo DB connected successfully')
    } catch (err){
        console.error('mongoDB connection error',err)
    }
}

export default dbConnect