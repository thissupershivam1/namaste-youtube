import React from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'
import { useSelector } from "react-redux";

let visible=false;
const MainContainer = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  return (
    <div className={`w-full ${isMenuOpen ? 'fixed bg-opacity-50' : 'null'}`}>

      <ButtonList/>
      <VideoContainer/>
    </div>
  )
}

export default MainContainer