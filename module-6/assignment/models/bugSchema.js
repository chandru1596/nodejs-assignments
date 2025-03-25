import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title:{type:String, required:true},
    description: {type:String, required:true},
    assignee:{type:String, required:true},
    createdAt:{type:Date, default:Date.now()},
    resolved:{type:Boolean, default:false }
})

export const bugSchema = mongoose.model('bug-track', schema)