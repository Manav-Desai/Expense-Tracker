import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate , Link } from 'react-router-dom';
import { removeUser } from '../utils/UserSlice.js';
import '../App.css';

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout()
    {
        localStorage.removeItem("userId");
        dispatch(removeUser({_id : null}));
        navigate("/");
    }

  return (
    <>
        <div className="absolute top-[56px] right-[15px] rounded-xl flex justify-between w-[148px]">
          <button className='font-bold bg-slate-400 text-white px-2 py-2 rounded-xl h-[40px]' onClick={handleLogout}>Logout</button>  
          <Link to="/genAI" className='font-bold text-white px-2 py-2 bg-blue-400 rounded-xl h-[40px]'>Ask AI</Link>
        </div>

        <h1 className="text-2xl py-8 mb-10 bg-slate-800 text-white rounded max-[400px]:w-full mx-0 px-0">Expense Tracker</h1>
    </>
  )
}

export default Header