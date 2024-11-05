import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import profile from '../../../public/Vaiish.png'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="title">
          <h2>Baking-Studio.</h2>
          <p>Admin Panel</p>
        </div>
        <img className='profile_image' src={profile} alt=""/>
    </div>
  )
}

export default Navbar