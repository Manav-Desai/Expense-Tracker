import jwt from "jsonwebtoken";

async function generateToken(_id)
{
    const token = await jwt.sign({
        _id
    },
        process.env.JWT_SECRET_KEY
    ,
        {
            expiresIn : "30m"
        }
    ); 
}


export { generateToken }