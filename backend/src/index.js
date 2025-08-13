
import app from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: './.env'
})

connectDB ()
.then(
    ()=>{
        console.log("✅ Database connected successfully");
        })
.catch((error)=> console.log(error))


export default app