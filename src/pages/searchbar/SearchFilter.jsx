import React, {useContext, useEffect} from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate, useParams } from 'react-router-dom';
import FoodItem from '../../components/foodItem/FoodItem';
import './SearchFilter.css'

const SearchFilter = () => {


    const {food_list} = useContext(StoreContext);

    const navigate = useNavigate();

    const { searchText } = useParams();

    console.log(searchText);


  return (
    <div className="food-display-list">
        {searchText && 
        food_list.filter((item)=>item.name.toLowerCase().includes(searchText.toLowerCase()))
        .map((item)=>(
           <FoodItem key={item._id} id={item._id} name={item.name} price={item.price} 
                    description={item.description} image={item.image} />

            ))
        }  
    </div>
  )
}

export default SearchFilter