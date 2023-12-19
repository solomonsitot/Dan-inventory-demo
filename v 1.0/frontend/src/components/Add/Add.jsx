// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
// import 'dotenv'
import '../../bootstrap.css'
import './Add.css'
import axios from 'axios';
function Add() {
  const [name,Setname]=useState('');
  const [image,Setimage]=useState('');
  const [category,Setcategory]=useState('');
  const [description,Setdescription]=useState('');
  const [price,Setprice]=useState('');
  const [amount,Setamount]=useState('');
function Base64(e){
var reader=new FileReader();
reader.readAsDataURL(e.target.files[0]);
reader.onload=()=>{
  Setimage(reader.result);
  // console.log(reader.result);
};
reader.onerror=(err)=>{
  console.log('error', err);
};
}



async function submit(e){
e.preventDefault();
try{
  alert('submitted successfully')
  axios.post('http://localhost:8000/products/add',{
    name,
    image,
    category,
    description,
    price,
    amount
  })
}
catch(e){
  console.log(e);
}
}




  return (
    <>
    <div className='add-wrapper'>
      <h3>Add New Product</h3>
      
      <form className='forms row'>


        <div className='col-lg-6'>
          <input accept='image/*' type="file"onChange={Base64}/>
          <img className='choosen-image' src={image} alt="" />
        </div>


        
        <div className='col-lg-6'>
        <label className='col-12'>Product name:</label>
        <input className='col-12' type="text" onChange={(e)=>{Setname(e.target.value)}} />
        </div>
        <div className='col-lg-6'>
        <label className='col-12'>Product category:</label>
        <input className='col-12' type="text" onChange={(e)=>{Setcategory(e.target.value)}} />
        </div>
        <div className='col-12 col-lg-9'> 
          <label>Description</label>
          <textarea className='description col-12' name="description" onChange={(e)=>{Setdescription(e.target.value)}} cols="35" rows="5"></textarea>
        </div>
        <div className='col-lg-6'> 
        <label className='col-12 '>Product Price:</label>
        <input className='col-12' type="number" onChange={(e)=>{Setprice(e.target.value)}} />
        </div>
        <div className='col-lg-6'>
        <label className='col-12'>Product Amount:</label>
        <input className='col-12' type="number" onChange={(e)=>{Setamount(e.target.value)}} />
        </div>
        <div className='btn-container'>
          <button className='btn' onClick={submit}>submit</button>
        </div>
      </form>

    </div>
    </>
  )
}

export default Add