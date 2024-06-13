import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Form = (props) => {

    const [title , setTitle] = useState("");
    const [type , setType] = useState("Expense");
    const [amount , setAmount] = useState("");
    
    const userdetails = useSelector( (store) => store.user.userdetails );
    const navigate = useNavigate();

    async function handleSubmit()
    {
        const response = await axios.post("http://localhost:3030/create" , {
            title,
            type,
            amount,
            doneBy : userdetails._id
        } , {withCredentials : true});
        
        if(response.data.message === true)
        {
            toast.success("Transaction Added Successfully...");
            // navigate("/Home");
            props.value.setFlag(!props.value.flag);
        }
        else
        {
            toast.error("Some Error Occurred . Please try later..");
        }
    }


  return (
    <div className='form max-w-sm mx-auto w-96'>

        <h1 className="font-bold pb-4 text-xl">Transaction</h1>

        <form id="form" onSubmit={(e) => e.preventDefault()}>

            <div className='grid gap-4'>
                <div className='input-group'>
                    <input type="text" placeholder='Sallary,House,Rent,SIP' className='form-input'
                    onChange={(e) => setTitle(e.target.value)}/>
                </div>

                <select className='form-input' value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="Expense" >Expense</option>
                    <option value="Investment">Investment</option>
                    <option value="Savings" >Savings</option>
                </select>

                <div className='input-group'>
                    <input type="text" placeholder='Amount' className='form-input'
                    onChange={(e) => setAmount(e.target.value)}/>
                </div>

                <div className="submit-btn">
                    <button className="border py-2 text-white bg-indigo-500 rounded-md w-full"
                    onClick={handleSubmit}>Make Transaction</button>
                </div>
            </div>
        </form>

        <Toaster
            position="top-center"
            reverseOrder={true}
        />

    </div>
  )
}

export default Form