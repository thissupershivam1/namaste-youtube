import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from './Constants';
import { cacheResults } from '../utils/searchSlice';



const Header = () => {
  const [searchQuery,setSearchQuery]=useState("");
  const [suggestions,setSuggestions]=useState([]);
  const [showSuggestions,setShowSuggestions]=useState(false);

  const searchCache=useSelector((store)=>store.search);

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
    <div className='flex justify-between h-16 align-middle m-1 shadow-lg '>
        <div className='flex '>
            
            <img
            onClick={()=>toggleMenuHandler()}
             className='p-2 cursor-pointer' src="https://static.vecteezy.com/system/resources/previews/021/190/402/original/hamburger-menu-filled-icon-in-transparent-background-basic-app-and-web-ui-bold-line-icon-eps10-free-vector.jpg" alt="" />
            <img className ="mx-[-20px]" src=" https://techcrunch.com/wp-content/uploads/2017/08/youtube-new-logo.png" alt="" />
        </div>
        <div className='flex flex-col'>
        <div className='flex'>
            <input className='h-10  p-3 my-3 border border-gray-500 rounded-l-full w-96' type="text"
            value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}
            onFocus={()=>setShowSuggestions(true)}
            onBlur={()=>setShowSuggestions(false)}
             placeholder='Search' />
            <button className='h-10 p-3 my-3 border border-gray-500 rounded-r-full flex justify-center align-middle'><i className="fa-solid fa-magnifying-glass"></i></button>
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