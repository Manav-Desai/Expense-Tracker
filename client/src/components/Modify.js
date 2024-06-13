import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Modify = () => {

  const location = useLocation();
  const data = location.state;

  const [title , setTitle] = useState(data.title);
  const [type , setType] = useState(data.type);
  const [amount , setAmount] = useState(data.amount);

  const navigate = useNavigate();

  async function handleUpdate()
  {
        const result = await axios.put("http://localhost:3030/update" , {
            title,type,amount,_id : data._id
        }, {withCredentials : true});

        if(result.data.message)
        {
            toast.success("Transaction Updated Successfully");
        }
        else
        {
            toast.error("Some error occurred . Please try again...");
        }

        setTimeout(() => {
            navigate("/Home");            
        }, 1000);

  }

  async function handleDelete()
  {
        const result = await axios.delete(`http://localhost:3030/delete/${data._id}`, {withCredentials : true});

        if(result.data.message)
        {
            toast.success("Transaction Deleted Successfully");
        }
        else
        {
            toast.error("Some error occurred . Please try again...");
        }
    
        setTimeout(() => {
            navigate("/Home");            
        }, 1000);
  }

  return (
    <>
          <div className="text-xl font-bold text-center mt-8">Modify Transaction</div>

            <div className='grid gap-4'>
                <div className='flex justify-center'>
                    <input type="text" placeholder='Sallary,House,Rent,SIP' value={title} className='form-input-modified'
                    onChange={(e) => setTitle(e.target.value)}/>
                </div>

                <div className='flex justify-center'>
                    <select className='form-input-modified' value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="Expense" >Expense</option>
                        <option value="Investment">Investment</option>
                        <option value="Savings" >Savings</option>
                    </select>
                </div>

                <div className='flex justify-center'>
                    <input type="text" placeholder='Amount' className='form-input-modified'
                    onChange={(e) => setAmount(e.target.value)} value={amount}/>
                </div>

                <div className="flex justify-center gap-[10%] w-full">
                        <button className="border py-2 text-white bg-indigo-500 text-xl rounded-md w-[200px]" onClick={handleUpdate}>Update</button>
                        <button className="border py-2 text-white bg-red-500 text-xl rounded-md w-[200px]" onClick={handleDelete}>Delete</button>
            </div>
        </div>

        

        <Toaster
            position="top-center"
            reverseOrder={true}
        />
    </>
  )
}

export default Modify