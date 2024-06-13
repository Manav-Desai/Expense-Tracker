import jwt from "jsonwebtoken";

const generateToken = async (_id) => {
    const token = await jwt.sign({ _id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
    });
    return token;
};

export { generateToken };