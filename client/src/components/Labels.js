import React, { useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addData } from '../utils/DataSlice';

const Labels = () => {

    let saving = 0 , expense = 0 , investment = 0;
    const {items} = useSelector( (store) =>  store.transaction);
    
    const dispatch = useDispatch();

    const [obj,setObj] = useState([
        {
            type : "Saving",
            color : '#f9c74f',
            amount : 45
        },
        {
            type : "Investment",
            color : "#ff6384",
            amount : 10
        },
        {
            type : "Expense",
            color : '#36a2eb',
            amount : 1
        }
    ])

    useEffect( () => {
        
        items?.map( (value) => {           

            saving += (value.type.toLowerCase() === "savings" ? value.amount : 0);
            expense += (value.type.toLowerCase() === "expense" ? value.amount : 0);
            investment += (value.type.toLowerCase() === "investment" ? value.amount : 0);
            
        } );

        dispatch(addData({saving,expense,investment}));

        setObj([
            {
                type : "Saving",
                color : '#f9c74f',
                amount : saving
            },
            {
                type : "Investment",
                color : "#ff6384",
                amount : investment
            },
            {
                type : "Expense",
                color : '#36a2eb',
                amount : expense
            }
        ]);

    } , [items]);

  return (
    <div>
        {obj.map( (value , index) => {
            return (
                    <LabelComponent key={index} data={value}></LabelComponent>
            )
        } )}
    </div>
  )
}

const LabelComponent = ({data}) => {

    // early return
    if(!data)
    {
        return <></>;
    }

    return (
        <div className='labels flex justify-between'>
            <div className='flex gap-2'>
                <div className='w-2 h-2 rounded py-3 mb-1' style={{background : data.color ?? "#f9c74f"}}></div>
                <h3 className='text-md'>{data.type ?? ""}</h3>
            </div>
            <h3 className='font-bold '>Rs.{data.amount ?? 0}</h3>
        </div>
    )
}

export default Labels