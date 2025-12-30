import React from 'react'
import CreateUser from './components/CreateUser'
import { RouterProvider,createBrowserRouter } from "react-router-dom";
import Login from './components/Login';
import DataDisplay from './components/DataDisplay';
import UpdateUser from './components/UpdateUser';

const App = () => {
  
  const router =createBrowserRouter([
   
  {
    path:'/create',
    element:<CreateUser/>
  },
  {
    path:'/',
    element:<Login/>
  },
  {
    path:'/data',
    element:<DataDisplay/>
  },
  {
    path:'/update/:id',
    element:<UpdateUser/>
  }
  
])
  return (
    <RouterProvider router={router}/>
  )
}

export default App