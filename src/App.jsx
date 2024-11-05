import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Cart from './pages/cart/Cart'
import PlaceOrder from './pages/placeOrder/PlaceOrder'
import Home from './pages/home/HomePage'
import Footer from './components/footer/Footer'
import LoginPopupPage from './components/loginPopup/LoginPopupPage'
import Verify from './pages/verify/Verify'
import MyOrders from './pages/myOrders/MyOrders'
import SearchFilter from './pages/searchbar/SearchFilter'

const App = () => {

  const [showLogin,setShowLogin] = useState(false);

  return (
    <> 
      {showLogin?<LoginPopupPage setShowLogin={setShowLogin}/>:<></>}
        <div className='app'>
      
          <Navbar setShowLogin={setShowLogin} />
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/order" element={<PlaceOrder/>}/>
            <Route path="/verify" element={<Verify/>}/>
            <Route path="/myorders" element={<MyOrders/>}/>
            <Route path="/searchFilter/:searchText" element={<SearchFilter/>}/>
            <Route path="/searchFilter/" element={<Home/>}/>
          </Routes>
        </div>
        <Footer/>
    </>
  )
}

export default App