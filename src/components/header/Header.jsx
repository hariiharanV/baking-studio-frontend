import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <>
        <div className='header'>
            <div className='background-overlay'></div>
            <div className='header-contents'>
                <h2> Order your favourite food here</h2>
                <p>Craving something delicious? 🍕🍔🍣 Order now and enjoy your favorite meals delivered right to your doorstep! 🚪🍽️ Fresh, fast, and hassle-free. Bon appétit!</p>
                <a href="#explore-menu"> <button> View Menu</button></a>
            </div>
        </div>        
   
    </>
  )
}

export default Header