import jwt from "jsonwebtoken";

async function isLoggedin (req, res, next) 
{
    try {
        let token = req.cookies.jwt;
        if (token) {
            try {
                const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

                next();

            } catch (error) {
                res.clearCookie("jwt");
                return res.status(401).json({
                    message: "Token expired or invalid",
                });
            }
        } else {
            if (!token) {
                return res.status(401).json({
                    message: "Not Authorized",
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export default isLoggedin;