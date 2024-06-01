import {User} from "../models/User.js";
import {Transaction} from "../models/Transaction.js";

export async function createUser(req,res)
{
    const {name , password , email} = req.body;
    
    const createdUser = await User.create({
        name,password,email
    });

    return res.send({message : "User Created Successfully..." , data : createUser});
}

export async function addTransaction(req,res)
{
    const {title , type , amount , doneBy} = req.body;
    const createdTrans = await Transaction.create({
        title , type , amount , doneBy
    });
    
    return res.send({message : "Transaction Added Successfully.." , data : createdTrans});
}

export async function deleteTransaction(req,res)
{
    const tid = req.params.id;
    const result = await Transaction.deleteOne({_id : tid});

    return res.send({message : "Transaction Deleted Successfully.."});
}

export async function modifyTransaction(req,res)
{
    const {title , type , amount , _id} = req.body;
    const updatedTrans = await Transaction.findOneAndUpdate({_id : _id},{title , type , amount},{new : true});

    return res.send({message : "Transaction Updated Successfully.."});
}

export async function readTransaction(req,res)
{
    const user_id = req.params.id;
    // console.log("User id : " + user_id);

    const result = await User.aggregate([
        { $lookup:  { 
            from: 'transactions', 
            localField: '_id',  
            foreignField: 'doneBy', 
            as: 'user_transactions' } }]) ;

    
    // console.log("Result : " + result);
    // result.map((value) => console.log(value));
    // console.log("\n\n\n\n\n\n\n");

    const updated = result.filter( (value) =>  user_id == value._id);
    
    updated.map((value) => console.log(value));

    let trans_data = updated[0];
    
    res.setHeader('Content-Type', 'application/json');
    return res.send({message : "Data Fetched Successfully" , data : trans_data.user_transactions});
}