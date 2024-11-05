import React from 'react'
import { assets } from '../../assets/assets'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="background-overlay"></div>
        <div className='footer-content'>
            <div className='footer-content-left'>
                {/* <img src={assets.logo} alt=""/> */}
                <h2>Baking-Studio.</h2>
                <p>Cuisines, all delivered straight to your door. We’re committed to serving you delicious food, fast delivery, and top-notch service. Whether it's breakfast, lunch, or a late-night snack, we've got you covered! Download our app or order online now and experience the convenience of delicious meals delivered to you. </p>
                <div className='footer-social-icons'>
                    <img src={assets.facebook} alt=""/>
                    <img src={assets.instagram} alt=""/>
                    <img className="whatsapp-icon" src={assets.whatsapp} alt="" />    
                </div>
            </div>
            <div className='footer-content-center'>
                    <h2>COMPANY</h2>
                    <div className='footer-content-center-list'>
                        <ul>
                            <li>Home</li>
                            <li>About us</li>
                            <li>Delivery</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
            </div>
            <div className='footer-content-right'>
                <h2> Get In Touch</h2>
                <div className='footer-content-right-list'>
                    <ul>
                        <li className='name'>Vaishnavi B <span>(Executive Chef & CEO)</span></li>
                        <li>+91-8123968976</li>
                        <li>contact@bakingstudio.com</li>
                    </ul>
                </div>
            </div>
        </div>
        <hr/>
        <p className='footer-copyright'>Copyright 2024 @baking-studio.com - All Rights Reserved </p>
    </div>
  )
}

export default Footer