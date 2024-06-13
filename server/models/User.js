import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
        select : false
    },
    email : {
        type : String,
        required : true
    }
    
} , {timestamps : true});


UserSchema.pre("save" , async function (next) {

    if(!this.isModified("password"))
    {
        return next();
    }
    console.log("Enrypting the password : ");

    this.password = await bcrypt.hash(this.password , 10);
    console.log("Encrypted Password : " + this.password);
});

UserSchema.methods.isPasswordCorrect = async function (password){

    // becrypt.compare(userpassword,encryptedpassword) will return true or false .
    /*
    It will return the value true or false based on comparing the userpassword with that
    of stored in db in encrypted form .

    this.password refers to stored in db and password is provided by user along with request
    */
    
    const result = await bcrypt.compare(password , this.password);
    return result;
}


export const User = mongoose.model("User" , UserSchema);