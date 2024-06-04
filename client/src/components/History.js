import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Transaction from './Transaction.js';
import axios from "axios";
import { addItems } from '../utils/TransactionSlice.js';

const History = (props) => {
  
  const [trans,settrans] = useState([]);
  const userdetails = useSelector( (store) => store.user.userdetails );

  const {items} = useSelector( (store) =>  store.transaction);

  const dispatch = useDispatch();

  useEffect( () => {
    getDataById();
  } , [props.value.flag]);


  async function getDataById()
  {
      const response = await axios.get(`http://localhost:3030/read/${userdetails._id}`);
      
      if(response.status === 200)
      {
        settrans(response.data.data);
        console.log("Inside History : \n\n");

        console.log(response.data.data);
        dispatch(addItems(response.data.data));
      }
  }

  return (
    <div>
      <div className="text-xl font-bold pt-4">
          History
      </div>

      {
          items && items?.map( (value , index) => <Transaction key={index} data={value}/>)
          // trans?.length === 0 ? <></> : trans?.map( (value , index) => <Transaction key={index} data={value}/> )  
      }

    </div>
    
  )
}

export default History