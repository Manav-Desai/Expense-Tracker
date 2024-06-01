import express from "express";
import { addTransaction, deleteTransaction, modifyTransaction, readTransaction , createUser } from "../controllers/CRUD_Transaction.js";

const router = express.Router();

router.get("/" , (req,res) => {
    console.log("Request recieved at /");
    res.send("Hello World");
});

router.post("/register" , createUser);
router.post("/create" , addTransaction);
router.get("/read/:id" , readTransaction);
router.delete("/delete/:id" , deleteTransaction);
router.put("/update" , modifyTransaction);

export default router;