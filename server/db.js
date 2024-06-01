import mongoose from "mongoose";

async function connectionDB(){

    try{
        const mongoURL = process.env.MONGO_URL;
        const connobj = await mongoose.connect(mongoURL);

        console.log("MongoDB connected Successfully...");
    }
    catch(e){
        console.log("Connection Failed : " + e);
    }
}

export default connectionDB;