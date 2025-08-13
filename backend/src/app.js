import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.json({
    limit:"16kb"
}))
app.use(express.urlencoded({
    limit:"16kb",
    extended:true,
}))

app.use(cookieParser());

// importing routes 
import { taskRouter } from "./routes/task.routes.js";

app.use("/api/v1/users",taskRouter)

app.get("/", (req, res) => {
    res.send("Server is live 🚀");
});


export default app