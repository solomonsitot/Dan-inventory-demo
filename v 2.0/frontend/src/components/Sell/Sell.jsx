// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './Sell.css';
import { useParams } from 'react-router-dom';

function Sell() {
    
    const { Id, name, price,amount } = useParams();
    
    console.log(price);

    const [sold, setSold] = useState('');
const total=sold*price
    async function sendSell(e) {
        e.preventDefault();
        try {
            alert('sold successfully')
          const response = await fetch(`http://localhost:8000/Products/sell/${Id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sold
            }),
          });
          
          
            if (response.ok) {
                console.log('Item edited successfully');
                
                // Handle success, e.g., display a success message
            } else {
                console.error('Failed to edit item');
                // Handle failure, e.g., display an error message
            }
        } catch (err) {
            console.error('Error:', err);
            // Handle other errors, e.g., display an error message
        }
    }

    return (
        <div className='sell-wrapper'>
            
            <form>
                <h1 >{name}</h1>
                <p>you have <span className='green'>{amount} {name}</span> in stock</p>
                <label htmlFor="sellAmount">
                    How much do you want to sell?
                </label>
                <br />
                <p className='price'>the price is :{price} X </p>
                <input className='amount'
                    type="number"
                    id="sellAmount"
                    onChange={(e) => setSold(e.target.value)}
                    placeholder="amount..."
                />
                <div className='total'><p>Total:{total}</p>
</div>
                <button onClick={sendSell}>Sell</button>
            </form>
        </div>
    );
}

export default Sell;
