// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import './Electronics.css'
import edit from '../../img/edit.png'
import sell from '../../img/sell.png'
import { useParams,Link } from 'react-router-dom';
function Electronics() {
  const {productType} =useParams();
    const [data,Setdata]=useState([]);
    useEffect(()=>{
      fetch( `http://localhost:8000/Products/see/${productType}`,{
        method: 'GET',
      }).then((res)=>res.json())
      .then((response)=>{
        Setdata(response)
      })

    },[]);

  return (
    <div className='res row'>
      <h1>{productType}</h1>
      {
        data.map((i,index)=>{
          const cardstatus =i.amount>40?' sufficient':'insufficient';
          return(
            <div key={index} className='card col-7 col-md-4 col-lg-3'>
            <div className={`status ${cardstatus}`}>{cardstatus}</div>
          <div className='imgs'><div className='img'><img className='cards-img' src={`http://localhost:8000/images/${i.image}`} alt="" /></div></div>
          <div className='product-detail'>
            <h4>{i.name}</h4>
            <p>{i.description}</p>
            <p>category: {i.category}</p>
            <p>Price: {i.price}</p>
            <p>Amount: {i.amount}</p>
          </div>
          <div className="card-actions">
            <Link to={`/sell-product/${i._id}/${i.name}/${i.price}/${i.amount}`}>
              <img src={sell} alt="Sell" />
            </Link>

            <Link to={`/edit-product/${i._id}`}>
              <img src={edit} alt="Edit" />
            </Link>
          </div>
        </div>
          )
        })
      }
    </div>
  )
}

export default Electronics