import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const allowedOrigins = [
    "http://localhost:5173",
    "https://boisterous-bienenstitch-d1cdda.netlify.app", // Netlify frontend
  ];
const corsOptions = {
    origin: allowedOrigins, 

    credentials: true, 
}
app.use(cors(corsOptions));
app.use(express.json({
    limit : "16kb"
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(cookieParser());

import userRouter from "./routes/user.route.js"
import capsuleRouter from "./routes/capsule.route.js"

app.use("/api/v1/users" , userRouter)
app.use("/api/v1/capsules" , capsuleRouter)

export { app  };