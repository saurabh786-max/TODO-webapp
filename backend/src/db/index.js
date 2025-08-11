import mongoose from "mongoose"
import { DB_NAME } from "../contants.js"
const connectDB = async ()=>{
    try{
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`CONECTION SUCCESSFULL!! DB-HOST:${connectionInstance.connection.host}`)
    }
    catch(error){
        console.log("mongoDB connection error", error);
        process.exit(1)
    }
}

export default connectDB