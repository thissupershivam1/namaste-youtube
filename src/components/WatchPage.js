import React, { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router-dom';
import CommentContainer from "./CommentContainer";
import { abbreviateNumber } from "js-abbreviation-number";
import RelatedVideos from './RelatedVideos';
import Store from '../utils/Store';
import {
	YOUTUBE_CHANNEL_DETAILS_API,
	YOUTUBE_VIDEO_DETAILS_API,
} from "./Constants";

const WatchPage = () => {

  // const [searchParams]=useSearchParams();
  // const videoId= searchParams.get("v");
  // console.log(searchParams.get("v"));
  // console.log(10);
  // const channelId = useSelector((store) => store.channel.channelId);

  // const dispatch=useDispatch();
  // useEffect(() =>{
  //   dispatch(closeMenu());

  // },[]);

  const [searchParams] = useSearchParams();
	const videoId = searchParams.get("v");

	const [videoDetails, setVideoDetails] = useState();
	const [channelDetails, setChannelDetails] = useState();

	const channelId = useSelector((store) => store.channel.channelId);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(closeMenu());
		getChannelDetails();
		getVideoDetails();
	}, [videoId]);

	const getChannelDetails = async () => {
		const response = await fetch(YOUTUBE_CHANNEL_DETAILS_API + channelId);
		const jsonData = await response.json();
		// console.log(jsonData?.items[0]);
		setChannelDetails(jsonData?.items[0]);
	};

	const getVideoDetails = async () => {
		const response = await fetch(YOUTUBE_VIDEO_DETAILS_API + videoId);
		const jsonData = await response.json();
		// console.log(jsonData?.items[0]);
		setVideoDetails(jsonData?.items[0]);
	};
  return (
    <div className='flex w-full flex-row justify-between'>
      <div className='flex flex-col w-1/2 content-center'>
    <div className='m-2'>
      <iframe width="800" height="400" src={"https://www.youtube.com/embed/"+searchParams.get("v")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </div>

    <div className=" dark:text-white relative">

<CommentContainer videoId={videoId} />
    </div>
    </div>

   {/* related video & live chat section */}
   <div className=" m-1 mx-2 ">
				{/* <LiveChat /> */}

				{/* related video section */}
				<RelatedVideos channelId={videoDetails?.snippet?.channelId} />
			</div>

</div>


  )
}

export default WatchPage