import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleWare } from "./middlewares/error.js";

export const app = express();

config({
  path: "./data/config.env",
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin:[process.env.FRONTEND_URL],
  method:["GET","POST","PUT","DELETE"],
  credentials: true,
}))

app.use("/api/v1/task", taskRouter);
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("hii dosto kam chal rha haii");
});

app.use(errorMiddleWare);
