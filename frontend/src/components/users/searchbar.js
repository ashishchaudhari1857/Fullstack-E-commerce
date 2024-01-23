import React, { useState } from 'react'
import useFetch from '../../api/useFetch';
import { useDispatch } from 'react-redux';
import { IoMdSearch } from "react-icons/io";
import {setError ,setLoading ,getProducts } from '../../redux/slices/adminproductManager'
function Searchbar() {
    const dispatch=useDispatch()
    const [search, setSearch] = useState('');
    const encodedSearch = encodeURIComponent(search.trim()); 
  const { data, error } = useFetch(`api/product/search?name=${encodedSearch}`);


  if(error){
     dispatch(setError(error))
  }
  if(data){
    const d=data.products;
    dispatch(getProducts(d))
 }

  console.log(data)
  return (
    <div className=" md:w-[45vw] p-1 flex items-center   rounded-md outline-none shadow-lg bg-white  shadow-lg"> 
    
        <input type='text' placeholder='Search  '   className=" md:w-[42vw]  ca   outline-none" value={search}  onChange={(e)=> setSearch(e.target.value)}></input>
        <span ><IoMdSearch  className='text-2xl' /></span>
    </div>
  )
}

export default Searchbar