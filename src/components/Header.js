import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleMenu } from '../utils/appSlice';



const Header = () => {
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
        <div className='flex'>
            <input className='h-10  p-3 my-3 border border-gray-500 rounded-l-full w-96' type="text" placeholder='Search' />
            <button className='h-10 p-3 my-3 border border-gray-500 rounded-r-full flex justify-center align-middle'><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
        <div className='flex h-7'>
            <img className="flex justify-center align-middle my-3 h-10 p-1 "  src="https://cdn-icons-png.flaticon.com/512/666/666201.png" alt="" />
            {/* <i className="fa-solid fa-user font-bold"></i> */}
        </div>
    </div>
  )
}

export default Header