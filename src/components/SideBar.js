import React from 'react'
import { useSelector } from 'react-redux'

const SideBar = () => {
    const isMenuOpen=useSelector(store=>store.app.isMenuOpen);

    if(!isMenuOpen) {
        return null;
    }
  return (
    <div className=' w-32  shadow-2xl'>
        <h1>Sidebar</h1>
        <ul>
            <li>Home</li>
            <li>Shorts</li>
            <li>videos</li>
            <li>Live</li>
        </ul>

        <h4 className='text-xl'>Subscriptions</h4>
        <ul className='my-2'>
            <li>
                Music
            </li>
            <li>Sports</li>
            <li>Gaming</li>
            <li>Movies</li>
        </ul>
        <ul className='my-2'>
            <li>
                Music
            </li>
            <li>Sports</li>
            <li>Gaming</li>
            <li>Movies</li>
        </ul>
        
        </div>
  )
}

export default SideBar