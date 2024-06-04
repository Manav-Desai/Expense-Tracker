import React from 'react';
import { Chart  , ArcElement} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Labels from './Labels';
import { useSelector } from 'react-redux';

Chart.register(ArcElement);

const Graph = () => {
  
  const {details} = useSelector( (store) => store.data);

  const config = {
    data : {
        datasets: [{
            data: [details.investment, details.expense, details.saving],  // [invest,expense,saving]
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 4,
            borderRadius : 30,
            spacing : 10
          }]
    },
    options : {
        cutout : 115
    }
};


  return (
    <div className='flex justify-content max-w-xs mx-auto'>
        <div className="item">
            <div className="chart relative">
                <Doughnut {...config}></Doughnut>
                <h3 className='mb-4 font-bold title'>
                    Total
                    <span className='block text-3xl text-emerald-400'>Rs.{details.saving + details.investment + details.expense}</span>
                </h3>
            </div>

            <div className="flex flex-col py-10 gap-4">
            {/* labels */}
            <Labels></Labels>
            </div>
        </div>
    </div>
  )
}

export default Graph