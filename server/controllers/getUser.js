import {User} from "../models/User.js";
import jwt from "jsonwebtoken";

async function getUser(req,res)
{
    const token = await req.cookies.jwt;

    if(token)
    {
        const decoded = await jwt.verify(token,process.env.JWT_SECRET_KEY);

        const user = await User.findById(decoded);
        
        if(user)
        {
            return res.send({message : true , data : user});
        }
    }
    
    return res.send({message : false});
    
}

export default getUser;