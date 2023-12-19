// eslint-disable-next-line no-unused-vars
import React from 'react'
import menu from '../../img/menu.png'
import addProduct from '../../img/addProduct.png'
import see from '../../img/eye.png'
import '../../bootstrap.css'
import './SideNav.css'
function SideNav() {
  return (
    <div className='nav-wrapper'>
      <div className='menu'>
        <div className='side-menu'>
          <a href="/"><img src={menu} alt="" /> Dashboard</a>
        </div>
        <div className='side-menu'>
          <a href="/add-product"><img src={addProduct} alt="" /> Add product</a>
        </div>
        <div className='side-menu'>
          <a href="/see-store"><img src={see} alt="" />  See Store</a>
        </div>

      </div>

    </div>
  )
}

export default SideNav