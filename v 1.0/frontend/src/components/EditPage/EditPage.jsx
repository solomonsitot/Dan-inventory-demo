// eslint-disable-next-line no-unused-vars
import React,{useState,useEffect} from 'react'
import './EditPage.css'
import { useParams } from 'react-router-dom';
function EditPage() {
  const [name,Setname]=useState('');
  const [image,Setimage]=useState('');
  const [category,Setcategory]=useState('');
  const [description,Setdescription]=useState('');
  const [price,Setprice]=useState('');
  const [amount,Setamount]=useState('');
  const { Id } = useParams();

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
    
    async function editItem(e) {
        e.preventDefault();
        try {
            alert('edited successfully')
          const response = await fetch(`http://localhost:8000/products/edit/${Id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name,
              image,
              category,
              description,
              price,
              amount,
            }),
          });
    
          if (response.ok) {
            console.log('Item edited successfully');
            // Handle success, e.g., redirect or show a success message
          } else {
            console.error('Failed to edit item');
            // Handle failure, e.g., show an error message
          }
        } catch (err) {
          console.error('Error:', err);
          // Handle other errors, e.g., network issues
        }
      }
    
      useEffect(() => {
        // Fetch additional data if needed when the component mounts
        // For example, you might want to fetch the existing data for the product with the given ID
        // and update the state with that data
      }, [Id]);


  return (
    <div className='edit-wrapper'>
    <h1>EditPage</h1>
    <form className='form row'>
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
          <button className='btn' onClick={editItem}>submit</button>
        </div>
      </form>
</div>
  )
}

export default EditPage