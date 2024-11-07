import React, { useContext, useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

    const {getTotalCartAmount,token,food_list,cartItems,url,rupees} = useContext(StoreContext);

    const [paymentMethod,setPaymentMethod] = useState('');

    const [data,setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipcode:"",
        country:"",
        phone:""
    })

    const onChangeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;

        setData((currData)=>{
            return {...currData,[name]:value};
        })

    }

    const placeOrder = async(event)=>{

        event.preventDefault();

        if(paymentMethod==="online")
        {

            let orderItems = [];

            food_list.map((item)=>{
                if(cartItems[item._id]>0)
                {
                    let itemInfo = item;
                    itemInfo["quantity"] = cartItems[item._id];
                    orderItems.push(itemInfo);
                }
            })
        
            let orderData = {
                address:data,
                items:orderItems,
                amount : getTotalCartAmount()+2
            }

            let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});

            if(response.data.success)
            {
                const {session_url} = response.data;
                window.location.replace(session_url);
            }
            else{
                alert("Error");
            }
        }else{
            console.log('COD');

            let orderItems = [];

            food_list.map((item)=>{
                if(cartItems[item._id]>0)
                {
                    let itemInfo = item;
                    itemInfo["quantity"] = cartItems[item._id];
                    orderItems.push(itemInfo);
                }
            })
        
            let orderData = {
                address:data,
                items:orderItems,
                amount : getTotalCartAmount()+2
            }

            let response = await axios.post(url+"/api/order/placeCOD",orderData,{headers:{token}});

            if(response.data.success)
            {
                const {session_url} = response.data;
                window.location.replace(session_url);
            }
            else{
                alert("Error");
            }
        }
    }

    const navigate = useNavigate();

    useEffect(()=>{
        if(!token)
        {
            navigate("/cart");
        }
        else if(getTotalCartAmount() === 0)
        {
            navigate("/cart");
        }

    },[token])


  return (
    <form onSubmit={placeOrder} className='place-order'>
        <div className='place-order-left'>
            <p className='title'>Delivery Information</p>
            <div className='multi-fields'>
                <input required type="text" name="firstName" value={data.firstName} onChange={onChangeHandler} placeholder='first name'/>
                <input required type="text" onChange={onChangeHandler} name="lastName" value={data.lastName} placeholder='last name'/>
            </div>
            <input required type="email" onChange={onChangeHandler} name="email" value={data.email} placeholder='email'/>
            <input required type="text" onChange={onChangeHandler} name="street" value={data.street} placeholder='street'/>
            <div className='multi-fields'>
                <input required type="text" onChange={onChangeHandler} name="city" value={data.city} placeholder='city'/>
                <input required type="text" onChange={onChangeHandler} name="state" value={data.state} placeholder='state'/>
            </div>
            <div className='multi-fields'>
                <input required type="text" onChange={onChangeHandler} name="zipcode" value={data.zipcode} placeholder='zip code'/>
                <input required type="text" onChange={onChangeHandler} name="country" value={data.country} placeholder='country'/>
            </div>
            <input required type="text" onChange={onChangeHandler} name="phone" value={data.phone} placeholder='phone number'/>
        </div>
        <div className='place-order-right'>
        <div className='cart-total'>
                    <h2 >Cart Total</h2>
                    <div>
                        <div className='cart-total-details'>
                            <p>Subtotal</p>
                            <p>{rupees}{getTotalCartAmount()}</p>
                        </div>
                        <hr/>
                        <div className='cart-total-details'>
                            <p>Delivery Fee</p>
                            <p>{rupees}{getTotalCartAmount()?30:0}</p>
                        </div>
                        <hr/>
                        <div className='cart-total-details'>
                            <b>Total</b>
                            <b>{rupees}{getTotalCartAmount()? getTotalCartAmount() + 30:0}</b>
                        </div>
                    </div>
                    <div className="submit-buttons">
                        <button type="submit" onClick={() => setPaymentMethod("online")}>Proceed to Payment</button>
                        <button className="delivery-button" onClick={() => setPaymentMethod("cod")} >Cash On Delivery (COD)</button>
                    </div>
                </div>     
        </div>
    </form>
  )
}

export default PlaceOrder