import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from './Constants';
import { cacheResults } from '../utils/searchSlice';
import logo from "../images/yt-logo.png";
import mobilelogo from "../images/yt-logo-mobile.png";
import {Link}  from 'react-router-dom';



const Header = () => {
  // const navigate=useNavigate();
  const [searchQuery,setSearchQuery]=useState("");
  const [suggestions,setSuggestions]=useState([]);
  const [showSuggestions,setShowSuggestions]=useState(false);

  const searchCache=useSelector((store)=>store.search);

   // Handling event when clicked enter in search bar
   const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Navigate");
    // navigate("/search?q="+searchQuery,{ relative: "path" })
    setShowSuggestions(false);
}

  useEffect(() =>{

    const timer=setTimeout(()=>{

      if(searchCache[searchQuery]){
        setSuggestions(searchCache[searchQuery]);
      }
      else{
        getSearchSuggestions();

      }


     

    } ,200 );

    return ()=>{
      clearTimeout(timer);
    };
    


  },[searchQuery]);

  const getSearchSuggestions = async () =>{
    const data= await fetch(YOUTUBE_SEARCH_API+searchQuery);
    const json=await data.json();
    
    setSuggestions(json[1]);

    //update cache
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };
  
  const dispatch=useDispatch();

  const toggleMenuHandler=()=>{
    dispatch(toggleMenu());

  }
  return (
    <div className='flex justify-between h-16 sticky top-0 content-center z-50 shadow-lg bg-[#0f0f0f]'>
        <div className='flex justify-between content-center '>

        <i className="fa-solid fa-bars text-white text-2xl mx-2 mt-5 cursor-pointer "
        onClick={()=>toggleMenuHandler()}
        
        ></i>
            
            {/* <img
            onClick={()=>toggleMenuHandler()}
             className='p-2 cursor-pointer' src="https://static.vecteezy.com/system/resources/previews/021/190/402/original/hamburger-menu-filled-icon-in-transparent-background-basic-app-and-web-ui-bold-line-icon-eps10-free-vector.jpg" alt="" />
            */}
            
            <img className ="h-6 w-30  mt-5 " src= {logo}  alt="" />
            
             
        </div>
        <div className='flex flex-col'>
        <div className='flex'>
            <input className='h-10  p-3 my-3 border border-blue-400 rounded-l-full w-96' type="text"
            value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}
            onFocus={()=>setShowSuggestions(true)}
            onBlur={()=>setShowSuggestions(false)}
             placeholder='Search'
            // //  onKeyDown={(e) => {
            // //   if (e.key === 'Enter') {
            // //     handleSubmit(e);
            // //   }
            // }} 
            />
            <button className='h-10 p-3 my-3 border border-gray-500 bg-[#3f3f3f] rounded-r-full flex justify-center align-middle'
            //  onClick={()=>{
            //   // const screenWidth = window.innerWidth;
            //   // if(screenWidth<=768 && !smSearch){
            //   //   if(!smSearch) setsmSearch(true);
            //   // }
            //   //  navigate("/search?q="+searchQuery,{ relative: "path" })}}
            ><i className="fa-solid fa-magnifying-glass text-white"></i></button>
        </div>
       { showSuggestions&&<div className='bg-white text-slate-950  w-96 z-10'>
          <ul>
            {
              suggestions.map(s=><li key={s} className='m-2 p-2 border-zinc-50'>
              <i className="fa-solid fa-magnifying-glass mx-2 hover:bg-gray-600"></i> {s}
              </li>)
            }

            
            
           
          </ul>
        </div>}
        </div>
        <div className='flex h-7'>
            <img className="flex justify-center align-middle my-3 h-10 p-1 "  src="https://cdn-icons-png.flaticon.com/512/666/666201.png" alt="" />
            {/* <i className="fa-solid fa-user font-bold"></i> */}
        </div>
    </div>
  )
}

export default Header