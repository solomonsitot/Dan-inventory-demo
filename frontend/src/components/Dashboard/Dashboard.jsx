// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import test from '../../img/tripod.jpg'
import test2 from '../../img/dress.jpg'
function Dashboard() {
  const [search,Setsearch]=useState();
  const [searchResult,SetsearchResult]=useState([]);
  const [navparams,Setnavparams]=useState('');
   useEffect(()=>{
    try{
      fetch(`http://localhost:8000/products/search/${search}`,{
        method: 'GET',
      })
      .then((res)=>res.json())
      .then((product)=>{SetsearchResult(product)})
    }
  catch(err) {
    console.log(err.message);
  }
   },[search]);
   


  
  return (
    <div>
      <input className='' type="text" placeholder='search a product' onChange={(e) => { Setsearch(e.target.value) }} />
      <div>
        
        
        <div className='row dash-wrapper'>
        {searchResult.map((i, index) => {
          const cardstatus =i.amount>40?' sufficient':'insufficient';
          const status = i.amount>40?'sufficient':'insufficient';
          return(<div key={index} className="card col-7 col-md-4 col-lg-3">
                        <div className={`status ${cardstatus}`}>{status}</div>

            <div className='imgs'><div className='img'><img className='cards-img' src={i.image} alt="" /></div></div>
            <div className='product-detail'>
              <h4>{i.name}</h4>
              <p>category: {i.category}</p>
              <p>{i.description}</p>
              <p>Price: {i.price}</p>
              <p>Amount: {i.amount}</p>
            </div>
          </div>)
})}
 <a className='col-9 col-md-3 col-lg-2' href={`/see/${navparams}`}onClick={()=>{Setnavparams('Electronics')}}> <div className='row'>
          <div className='card menu-items '>
            <img className='image' src={test} alt="" />
            <h1 className='title'>Electronics</h1>

          </div>
    </div></a>


    <a className='col-9 col-md-3 col-lg-2' href={`/see/${navparams}`}onClick={()=>{Setnavparams('Fashion')}}> <div className='row'>
          <div className='card  menu-items '>
            <img className='image' src={test2} alt="" />
            <h1 className='title'>Fashion</h1>

          </div>
    </div></a>


    <a className='col-9 col-md-3 col-lg-2' href={`/see/${navparams}`}onClick={()=>{Setnavparams('Electronics')}}> <div className='row'>
          <div className='card menu-items '>
            <img className='image' src={test} alt="" />
            <h1 className='title'>Electronics</h1>

          </div>
    </div></a>


    <a className='col-9 col-md-3 col-lg-2' href={`/see/${navparams}`}onClick={()=>{Setnavparams('Fashion')}}> <div className='row'>
          <div className='card  menu-items '>
            <img className='image' src={test2} alt="" />
            <h1 className='title'>Fashion</h1>

          </div>
    </div></a>


        </div>
      
      </div>

    </div>
  );
}

export default Dashboard;