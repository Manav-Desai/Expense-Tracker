import {User} from "../models/User.js";
import {Transaction} from "../models/Transaction.js";
import bcrypt from "bcrypt";

export async function createUser(req,res)
{
    try
    {
        const {name , password , email} = req.body;
    
        const createdUser = await User.create({
            name,password,email
        });

        return res.send({message : "User Created Successfully..." , data : createUser});
    }
    catch(err)
    {
        return res.send({message : false});
    }
}

export async function addTransaction(req,res)
{
    try{
        console.log(req.body);
        const {title , type , amount , doneBy} = req.body;

        if(doneBy == null)
            return res.send({message : false});
        
        const createdTrans = await Transaction.create({
            title , type , amount , doneBy
        });
        
        return res.send({message : true , data : createdTrans});
    }
    catch(err)
    {
        return res.send({message : false});
    }
}

export async function deleteTransaction(req,res)
{
    try
    {
        const tid = req.params.id;
        const result = await Transaction.deleteOne({_id : tid});

        return res.send({message : true});
    }
    catch(err)
    {
        return res.send({message : false});
    }
}

export async function modifyTransaction(req,res)
{
    try
    {
        const {title , type , amount , _id} = req.body;
        const updatedTrans = await Transaction.findOneAndUpdate({_id : _id},{title , type , amount},{new : true});

        return res.send({message : true});
    }
    catch(err)
    {
        return res.send({message : false});
    }
}

export async function readTransaction(req,res)
{
    try
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
        return res.send({message : true , data : trans_data.user_transactions});
    }
    catch(err)
    {
        return res.send({message : false});
    }
}

export async function validateUser(req,res)
{
    const {email , password} = req.body;
    const user = await User.findOne({email});

    if(user === null)
    {
        return res.send({message : "User Not found"});
    }
    else
    {
        // console.log(user);
        const result = await bcrypt.compare(password , user.password);
        return res.send({message : result , data : user});
    }
    
}