import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import LoginForm from './components/LoginForm';
import Error from './components/Error';
import {Provider} from "react-redux";
import appStore from './utils/appStore';
import Modify from './components/Modify';
import AskGemini from './components/AskGemini';

const appRouter = createBrowserRouter([
  {
    path : "/",
    element : <LoginForm/>,
    errorElement : <Error />
  },
  {
    path : "/Home",
    element : <App/>,
    errorElement : <Error />
  },
  {
    path : "/update",
    element : <Modify />,
    errorElement : <Error />
  },
  {
    path : "/genAI",
    element : <AskGemini/>,
    errorElement : <Error/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals