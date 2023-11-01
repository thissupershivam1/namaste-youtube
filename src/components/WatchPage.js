import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router-dom';
import CommentContainer from "./CommentContainer";
import { abbreviateNumber } from "js-abbreviation-number";

const WatchPage = () => {

  const [searchParams]=useSearchParams();
  const videoId= searchParams.get("v");
  console.log(searchParams.get("v"));
  console.log(10);

  const dispatch=useDispatch();
  useEffect(() =>{
    dispatch(closeMenu());

  },[]);
  return (
    <div>
    <div className='m-2'>
      <iframe width="800" height="400" src={"https://www.youtube.com/embed/"+searchParams.get("v")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </div>

<div className=" dark:text-white">

<CommentContainer videoId={videoId} />
</div>

</div>


  )
}

export default WatchPage