import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/transactions.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// using middlewares

app.use(cors( {origin : "http://localhost:3000" , credentials : true} ));

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use("/" , router);

export default app;