import './App.css';
import Graph from './components/Graph';
import Form from './components/Form';
import History from './components/History';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from './utils/UserSlice';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';

function App() {

  const [flag , setFlag] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect( () => {

      const id = localStorage.getItem("userId");
      
      if(id == null)
      {
          navigate("/");
      }
      else
      {
        dispatch(addUser({_id : id}));
      }
  });

  return (
 
    <>

    <div className="App">
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
        
        <Header />
        
        
        {/* Grid Coloumns */}
        <div className=" grid md:grid-cols-2 gap-4">
          <Graph/>
          <Form value={{flag , setFlag}}/>
        </div>

        <History value={{flag , setFlag}}/>
      </div>
    </div>
    </>
  );
}

export default App;
