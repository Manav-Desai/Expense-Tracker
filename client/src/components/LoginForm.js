import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { checkValidateData } from '../validate.js';
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {useDispatch} from "react-redux";
import {addUser} from "../utils/UserSlice.js"

const LoginForm = () => {
    

    const [issignin,setissignin] = useState(true);
    const [errMessage,seterrMessage] = useState(null);

    const [email , setEmail] = useState(null);
    const [password , setPassword] = useState(null);
    const [username , setUserName] = useState(null);

    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    // const {setid} = useContext(UserContext);

    function toggleSignInForm()
    {
        setissignin(!issignin);
    }

    async function handleButtonClick()
    {
        // validate the form data
        const message = checkValidateData(email,password);
        seterrMessage(message);

        // if the credentials are valid then we are going to create newuser
        if(message)
            return;     // if message is null then cond. is false and below code is executed
        
        
        // sing in or sign up logic
        if(issignin)
        {
            // sign in logic
            const verify = await axios.post("http://localhost:3030/verify" , {
                email : email,
                password : password
            });

            console.log(verify);
            console.log("Response by server in sign in : " + verify);

            if(verify.data.message === true)
            {
                dispatch(addUser({_id : verify.data.data._id}));
                navigate("/Home");
            }
            else
            {
                toast.error("Invalid credentials . Please enter valid credentials");
                navigate("/");
            }
            
        }
        else
        {
            // sign up logic
            
            const result = await axios.post("http://localhost:3030/register" , {
                name : username, 
                email,
                password
            });
            
            if(result.message !== null)
            {        
                dispatch(addUser({_id : result.data.data._id}));
                navigate("/Home");
            }
            else
            {
                navigate("/Error");
            }
        }
    }
    
    return (
        <>
            <div>
                
                <form
                onSubmit={(e) => {e.preventDefault()}}
                
                className='absolute p-12 bg-black w-3/12 my-36 mx-auto left-0 right-0 text-white text-base rounded-xl bg-opacity-80'>
                    <h1 className='font-bold text-3xl py-4'>
                        {issignin ? "Sign In" : "Sign Up"} 
                    </h1>

                    {
                        !issignin ? <input onChange={(e) => setUserName(e.target.value)} type="text" placeholder="User Name" className=' p-2 my-4 w-full bg-gray-800 rounded-md'/> : null
                    }

                    
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" className=' p-2 my-4 w-full bg-gray-800 rounded-md'/>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className='p-2 my-4 w-full bg-gray-800 rounded-md'/>
                    
                    <p 
                    className=' text-red-500 font-bold text-lg py-2'>{errMessage}</p>

                    <button 
                    onClick={handleButtonClick}
                    className='p-4 my-6 bg-red-600 w-full rounded-md'>
                        {issignin ? "Sign In" : "Sign Up"}
                    </button>

                    <p className=' text-base py-6 hover:underline cursor-pointer' onClick={toggleSignInForm}>
                        {issignin ? "New User?  Sign Up Now" : "Already registered ? Sign In Now"}
                        </p>
                </form>
                
            </div>

            <Toaster
            position="top-center"
            reverseOrder={true}
            />
        </>
    )
}

export default LoginForm;
