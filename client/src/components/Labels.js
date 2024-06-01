import React from 'react'

const obj = [
    {
        type : "Savings",
        color : '#f9c74f',
        percent : 45
    },
    {
        type : "Investment",
        color : "#ff6384",
        percent : 20
    },
    {
        type : "Expense",
        color : '#36a2eb',
        percent : 10
    }
]

const Labels = () => {
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
            <h3 className='font-bold '>{data.percent ?? 0}%</h3>
        </div>
    )
}

export default Labels