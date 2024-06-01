import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema( {
    title : {
        type : String,
        required : true,
    },
    type : {
        type : String,
        required : true,
    },
    amount : {
        type : Number,
        required : true,
    },
    doneBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
}, {timestamp : true});

export const Transaction = mongoose.model("Transaction" , TransactionSchema);