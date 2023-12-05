// eslint-disable-next-line no-unused-vars
import React from 'react'
import './TopNav.css'
import logo from '../../img/logo.png'
function TopNav() {
  return (<>
    <div className='top-nav'>
    <img className='logo' src={logo} alt="" />
    
        <h2>Welcome to Dan Inventory</h2>

    </div>
    </>
  )
}

export default TopNav