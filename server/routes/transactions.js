import express from "express";
import { addTransaction, deleteTransaction, modifyTransaction, readTransaction , createUser , validateUser} from "../controllers/CRUD_Transaction.js";
import isLoggedIn from "../middleware/isLoggedIn.js";
import getUser from "../controllers/getUser.js";

const router = express.Router();

router.get("/" , (req,res) => {
    console.log("Request recieved at /");
    res.send("Hello World");
});

router.post("/register",createUser);
router.post("/create" ,isLoggedIn, addTransaction);
router.get("/read/:id" , isLoggedIn,  readTransaction);
router.delete("/delete/:id" ,isLoggedIn ,deleteTransaction);
router.put("/update" ,isLoggedIn, modifyTransaction);
router.post("/verify" , validateUser);
router.get("/getUser" , getUser);

export default router;