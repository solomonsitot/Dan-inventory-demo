// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import '../../bootstrap.css'
import './Store.css'
import del from '../../img/delete.png'
import edit from '../../img/edit.png'
import sell from '../../img/sell.png'
import {Link} from 'react-router-dom'
// import axios from 'axios';
function Store() {
  const [data,Setdata] = useState([]);
  const [search, Setsearch] = useState('');
  // const [show, Setshow] = useState(true);
  useEffect(() =>{
    fetch('http://localhost:8000/products/get',{
      method: 'GET'
    })
    .then((res)=>res.json())
    .then((products)=>{
      // console.log(products);===>is to check fetch method 
      Setdata(products);
    });

  },[]);

   const deleteItem=async (id)=>{
    const response = await fetch(`http://localhost:8000/products/delete/${id}`, {
    method: 'DELETE'
  })
  if (response.ok) {
    alert('item deleted successfully')
    fetch('http://localhost:8000/products/get',{
      method: 'GET'
    })
    .then((res)=>res.json())
    .then((products)=>{
      // console.log(products);===>is to check fetch method 
      Setdata(products);
    });
  } else {
    console.error('Failed to delete item');
  }
} 


  return (
    <div className='card-wrapper'>
      <h1 className='fw-bold'>Store Summary</h1>
      <input
        className='searchBar'
        type='text'
        onChange={(e) => {
          Setsearch(e.target.value);
        }}
        placeholder="  what's on your mind?"
      />
   <br /> 
    
   <br />
   <div className="card-container row">
    
      {data
        .filter((items) =>
          search.toLowerCase() === '' ? items : items.name.toLowerCase().includes(search)
        )
        .map((i, index) => { 
          const cardstatus =i.amount>40?' sufficient':'insufficient';
          const status = i.amount>40?'sufficient':'insufficient';
          return(
            
          <div key={index} className='card col-7 col-md-4 col-lg-3'>
            <div className={`status ${cardstatus}`}>{status}</div>
          <div className='imgs'><div className='img'><img className='cards-img' src={i.image} alt="" /></div></div>
          <div className='product-detail'>
            <h4>{i.name}</h4>
            <p>{i.description}</p>
            <p>category: {i.category}</p>
            <p>Price: {i.price}</p>
            <p>Amount: {i.amount}</p>
          </div>
          <div className="card-actions">
            
            <img src={del} onClick={() => deleteItem(i._id)} alt="Delete" />
            <Link to={`/sell-product/${i._id}/${i.name}/${i.price}/${i.amount}`}>
              <img src={sell} alt="Sell" />
            </Link>

            <Link to={`/edit-product/${i._id}`}>
              <img src={edit} alt="Edit" />
            </Link>
          </div>
        </div>)
      })}
    </div>
   
    </div>
  );
}

export default Store;