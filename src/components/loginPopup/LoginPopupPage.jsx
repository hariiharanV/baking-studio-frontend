import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { assets } from '../../assets/assets';
import './LoginPopupPage.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopupPage = ({setShowLogin}) => {

  const {url,setToken} = useContext(StoreContext)

  const [currState,setCurrState] = useState("Sign Up");

  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler = (event)=>{

    const name = event.target.name;
    const value = event.target.value;

    setData((item)=>{
      return {...item,[name]:value};
    })

  }

  const onLogin = async (event)=>{
       event.preventDefault();

       let newUrl = url;
       
       if(currState === "Login"){
         newUrl += "/api/user/login"; 
        }else{
         newUrl += "/api/user/register";
       }

      const response = await axios.post(newUrl,data);

      if(response.data.success)
      {
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token);

          setShowLogin(false);
      }else{
        alert(response.data.message);
      }
  }

  return (
    <div className='login-popup'>
      <form onSubmit ={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt=""/>
        </div>
        <div className='login-popup-inputs'>
        {currState=="Login"?<></>:
          <input type="text" onChange={onChangeHandler} name="name" value={data.name} placeholder='your name' required/>
        }
          <input type="email" onChange={onChangeHandler} name="email" value={data.email} placeholder='email' required />
          <input type="password" onChange={onChangeHandler} name="password" value={data.password} placeholder='password' required/>
        </div>
        <button type="submit">{currState==="Sign Up"?"Create Account":"Login"}</button>
        <div className='login-popup-condition'>
          <input type="checkbox" required />
          <p> By Continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currState==="Sign Up"? 
        <p> Already have an account ? <span onClick={()=>setCurrState("Login")}> Login here </span></p> :
        <p> Create a new account ? <span onClick={()=>setCurrState("Sign Up")}> Click here</span></p> }    
      </form>
    </div>
  )
}

export default LoginPopupPage