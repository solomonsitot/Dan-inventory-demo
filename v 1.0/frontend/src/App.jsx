// eslint-disable-next-line no-unused-vars
import React from 'react'
import './App.css'
import {Route, Routes} from 'react-router-dom'
import TopNav from './components/TopNav/TopNav'
import SideNav from './components/SideNav/SideNav'
import Dashboard from './components/Dashboard/Dashboard'
import Add from './components/Add/Add'
import Store from './components/Store/Store'
import EditPage from './components/EditPage/EditPage'
import Sell from './components/Sell/Sell'
import Electronics from './components/Electronics/Electronics'
function App() {
  return (
    <>
         <TopNav/>
         <SideNav/>
         
         <div className='right'>
         <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/add-product' element={<Add/>}/>
          <Route path='/see-store' element={<Store/>}/>
          <Route path="/edit-product/:Id?" element={<EditPage />} />
          <Route path="/sell-product/:Id?/:name?/:price?/:amount?/" element={<Sell />} />
          <Route path='/see/:productType?' element={<Electronics/>}/>


         </Routes>
         </div>
         
         
     
      </>
  )
}

export default App