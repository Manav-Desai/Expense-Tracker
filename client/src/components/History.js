import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Transaction from './Transaction.js';
import axios from "axios";
import { addItems } from '../utils/TransactionSlice.js';

const History = (props) => {
  
  const {_id} = useSelector( (store) => store.user.userdetails );

  const {items} = useSelector( (store) =>  store.transaction);

  const dispatch = useDispatch();

  useEffect( () => {
    getDataById();
  } , [props.value.flag , _id]);


  async function getDataById()
  {
      const response = await axios.get(`http://localhost:3030/read/${_id}`, {withCredentials : true});
      
      if(response.status === 200)
      {
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