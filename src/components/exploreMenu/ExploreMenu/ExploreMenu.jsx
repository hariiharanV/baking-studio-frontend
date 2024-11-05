import React from 'react'
import { menu_list } from '../../../assets/assets'
import './ExploreMenu.css'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1> Explore Our Menu</h1>
        <p className='explore-menu-text'>Choose from our diverse menu of mouth-watering dishes 🍱🍕🍔, freshly prepared and delivered right to your door! 🚪🍽️ Whether you're craving comfort food or trying something new, we've got you covered. Order now for a delicious experience!</p>
        <div className='explore-menu-list'>
            {menu_list.map((item,index)=>{
                return <div onClick={()=>setCategory((prev)=>prev===item.menu_name?"All":item.menu_name)} key={index}>
                    <img className={category===item.menu_name?"active":""} src={item.menu_image} alt=""/>
                    <p>{item.menu_name}</p>
                </div>
            })}
        </div>
          <hr/>
    </div>
  )
}

export default ExploreMenu