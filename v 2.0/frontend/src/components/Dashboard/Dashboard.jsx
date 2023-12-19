// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import '../../bootstrap.css'
import './Dashboard.css'
import fashion from '../../img/fashion.jpg'
import electronics from '../../img/elecrtonics.jpg'
import grocery from '../../img/grocery.jpg'
import health from '../../img/health.jpg'
function Dashboard() {
  const [search,Setsearch]=useState();
  const [searchResult,SetsearchResult]=useState([]);
  const [navparams,Setnavparams]=useState('');
  const [data,Setdata] = useState([]);
   useEffect(()=>{
      fetch('http://localhost:8000/products/get',{
        method: 'GET'
      })
      .then((res)=>res.json())
      .then((products)=>{
        // console.log(products);===>is to check fetch method 
        Setdata(products);
      });
  
  
    try{
      fetch(`http://localhost:8000/products/search/${search}`,{
        method: 'GET',
      })
      .then((res)=>res.json())
      .then((product)=>{SetsearchResult(product)})
      if (search === '') {
        SetsearchResult([]);
        return;
      }
    }
  catch(err) {
    console.log(err.message);
  }
   },[search]);

   const totalCost= data.reduce((acc,i)=>{

    const productcost=i.price*i.amount;
     return acc+productcost },0
   )
   const totalamount=data.reduce((acc,i)=>{
    const amounts=i.amount*1
        return acc+amounts;
   },0)


  
  return (
    <div className='whole-dash-wrapper'>
<div><input className='search-bar' type="text" placeholder='search a product' onChange={(e) => { Setsearch(e.target.value) }} /></div>      
      <div>     
        <div className='row dash-wrapper'>
        {searchResult.map((i, index) => {
          const cardstatus =i.amount>40?' sufficient':'insufficient';
          const status = i.amount>40?'sufficient':'insufficient';
          return(<div key={index} className="card col-7 col-md-4 col-lg-3">
                        <div className={`status ${cardstatus}`}>{status}</div>

            <div className='imgs'><div className='img'><img className='cards-img' src={`http://localhost:8000/images/${i.image}`} alt="" /></div></div>
            <div className='product-detail'>
              <h4>{i.name}</h4>
              <p>category: {i.category}</p>
              <p>{i.description}</p>
              <p>Price: {i.price}</p>
              <p>Amount: {i.amount}</p>
            </div>
          </div>)
})}
 </div>
 <div className='dash-card row'>
 <div className='card col-10 col-md-6 col-lg-4' >
  <p>total amount</p>
  <h1>{totalamount} <p className='card-amt'>items in stock</p></h1>
</div>
<div className='card col-10 col-md-6 col-lg-4'>
  <p>total cost</p>
  <h1>$  {totalCost}<p className='card-amt'> Birr</p></h1>
</div>
 </div>
{/* <h1>{Total()}</h1> */}
 <hr />
<div className='row'>
            <a className='col-12 col-md-6 col-lg-3'onClick={()=>{Setnavparams('Fashion')}} href={`/see/${navparams}`}>
                <div className='cat card'>
                    <a href=""><img className='image' src={fashion} alt="" /></a>
                    <h1 className='card-text'>Fashion</h1>
                </div>
            </a>
            <a className='col-12 col-md-6 col-lg-3' onClick={()=>{Setnavparams('Electronics')}} href={`/see/${navparams}`}>
                <div className='cat card'>
                    <a href=""><img className='image' src={electronics} alt="" /></a>
                    <h1 className='card-text'>Electronics</h1>
                </div>
            </a>
            <a className='col-12 col-md-6 col-lg-3' onClick={()=>{Setnavparams('Grocery')}} href={`/see/${navparams}`}>
                <div className='cat card'>
                    <a href=""><img className='image' src={grocery} alt="" /></a>
                    <h1 className='card-text'>Grocery</h1>
                </div>
            </a>
            <a className='col-12 col-md-6 col-lg-3' onClick={()=>{Setnavparams('Health')}} href={`/see/${navparams}`}>
                <div className='cat card'>
                    <a href=""><img className='image' src={health} alt="" /></a>
                    <h1 className='card-text'>Health</h1>
                </div>
            </a>

        </div>


       
      
      </div>

    </div>
  );
}

export default Dashboard;