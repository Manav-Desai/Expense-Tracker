
async function isLoggedIn(req,res,next)
{
    /*
    Operation performed :
        1. obtain the cookie from the req
        2. verify the cookie
        3. if successfully verified, then allow the user to access the resource
        4. return the response from here only , not allow user to access the resource
    */

    const token = req.cookies.jwt;

    if(token)
    {
        try{
            const result = await jwt.verify(token , process.env.JWT_SECRET_KEY);
            next();
        }
        catch(err)
        {
            res.clearCookie("jwt");
            return res.send({message : "Token expired or invalid"});
        }
        
    }
    else
    {
        return res.status(401).send({message : "User is not authorised"});
    }
}

export default isLoggedIn;