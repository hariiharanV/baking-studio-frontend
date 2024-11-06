import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import './Cart.css'
import { useNavigate } from 'react-router-dom';

const Cart = () => {

    const {cartItems, food_list, removeFromCart, getTotalCartAmount, url,rupees } = useContext(StoreContext);

    const navigate = useNavigate();

  return (
    <div className='cart'>
        <div className='cart-items'>
            <div className='cart-items-title'>
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br/>
                <hr/>
                {food_list.map((item,index)=>{
                    if(cartItems[item._id]>0){
                        return (
                            <div>
                                <div className='cart-items-title cart-items-item'>
                                    <img src={url+"/images/"+item.image} alt=""/>
                                    <p>{item.name}</p>
                                    <p>{rupees}{item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>{rupees}{item.price*cartItems[item._id]}</p>
                                    <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
                                    </div>
                                 <hr/>
                            </div>
                        )
                    }
                })}
            </div>
            <div className='cart-bottom'>
                <div className='cart-total'>
                    <h2> Cart Totals</h2>
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
                    <button onClick={()=>navigate("/order")}>Proceed to Checkout</button>
                </div>
                <div className='cart-promocode'>
                    <div>
                        <p>If any promocode, enter it here </p>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder='Promocode'/>
                            <button> Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Cart