import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema({

    taskName:{
        type:String,
        required:true
    },
    isDone:{
        type:Boolean,
        required:true,
    }
},{timestamps:true})


export const Task = mongoose.model("Task", taskSchema);
