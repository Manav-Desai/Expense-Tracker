import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/transactions.js";

dotenv.config();

const app = express();

// using middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use("/test" , router);

export default app;