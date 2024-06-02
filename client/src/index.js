import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import LoginForm from './components/LoginForm';
import Error from './components/Error';

const appRouter = createBrowserRouter([
  {
    path : "/Login",
    element : <LoginForm/>,
    errorElement : <Error />
  },
  {
    path : "/",
    element : <App/>,
    errorElement : <Error />
  },
  {
    path : "/update",
    element : "Update User Page",
    errorElement : <Error />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={appRouter} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals