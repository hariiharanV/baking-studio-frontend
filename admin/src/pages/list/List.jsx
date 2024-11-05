import React from 'react'
import './List.css'
import {toast} from 'react-toastify'
import {useState, useEffect} from 'react'
import axios from 'axios'

const List = ({url}) => {

    const [list,setList] = useState([]);

    const fetchList = async()=>{

        const response = await axios.get(`${url}/api/food/list`);

        if(response.data.success)
        {
            setList(response.data.data);
        }
        else{
            toast.error(response.data.message);
        }
    }

useEffect(()=>{
    fetchList();
},[])


const removeFood = async(id)=>{

    console.log(id);
    const response = await axios.post(`${url}/api/food/remove`,{id:id});
    await fetchList();

    if(response.data.success){
        toast.success(response.data.message);
    }
    else{
        toast.error(response.data.message);
    }
}

  return (
    <div className="list add flex-col">
        <p> All Food List</p>
        <div className='list-table'>
            <div className='list-table-format title'>
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b>Action</b>
            </div>
            {list.map((item)=>{
                return (<div className='list-table-format'>
                     <img src={`${url}/images/`+item.image} alt=""/>
                     <p>{item.name}</p> 
                     <p>{item.category}</p>
                     <p>{item.price}</p>
                     <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
                </div>)
            })}
        </div>
    </div>
  )
}

export default List