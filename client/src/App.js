import './App.css';
import Graph from './components/Graph';
import Form from './components/Form';
import History from './components/History';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from './utils/UserSlice';
import { useNavigate } from 'react-router-dom';

function App() {

  const [flag , setFlag] = useState(true);
  const {_id} = useSelector( (store) => store.user.userdetails );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout()
  {
      dispatch(removeUser({_id : null}));
      navigate("/");
  }

  useEffect( () => {

    if(_id === null)
    {
        navigate("/");
    }

  } , [] );

  return (
 
    <>

    <div className="App">
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
        
        <div className="absolute bg-slate-600 top-[35px] right-[15px] rounded-xl">
          <button className='font-bold text-white px-4 py-2' onClick={handleLogout}>Logout</button>
        </div>

        <h1 className="text-4xl py-8 mb-10 bg-slate-800 text-white rounded max-[400px]:w-full mx-0 px-0">Expense Tracker</h1>
        
        
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
