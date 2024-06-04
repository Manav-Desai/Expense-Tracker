import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare} from "@fortawesome/free-regular-svg-icons";


const Transaction = (props) => {

  const {_id , title , type , amount} = props.data;
  const navigate = useNavigate();

  function handleClick(e)
  {
      navigate("/update" , {state : {_id , title, type , amount}});
  }

  return (
    <div className="flex justify-evenly w-full mt-4 text-xl max-[600px]:text-sm">
        
        <span className="w-[25%]">{title}</span>        
        <span className="w-[25%]">{type}</span>        
        <span className="w-[20%]">{amount}</span>


        <button className="w-[10%]" onClick={handleClick}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>

    </div>
  )
}

export default Transaction