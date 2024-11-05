import { createContext, useState } from "react";
import { useEffect } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props)=>{

    const [cartItems,setCartItems]= useState({});

    const [food_list,setFoodList] = useState([])

    const rupees = '₹';

    const url = "http://localhost:4000";

    const [token,setToken] = useState("");

    const addToCart = async (itemId) =>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev, [itemId]:1}));
        }else{
            setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}));
        }

        if(token)
        {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));

        if(token)
        {
            await axios.post(url+"/api/cart/remove",itemId,{headers:{token}})
        }
    }

    const loadCartData = async(token)=>
    {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});

            setCartItems(response.data.cartData);
    }

    const getTotalCartAmount =()=>{
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo = food_list.find((prod)=>prod._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }

        return totalAmount;
    }

    const fetchFoodList = async()=>{

        const response = await axios.get(`${url}/api/food/list`);

        setFoodList(response.data.data);
    }

    useEffect(()=>{

        async function loadData()
        {
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }  
        loadData();
    },[])

    const ContextValue = {
            food_list,
            cartItems,
            setCartItems,
            addToCart,
            removeFromCart,
            getTotalCartAmount, 
            url,
            token,
            setToken,
            rupees
    }

    return (
        <StoreContext.Provider value ={ContextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;