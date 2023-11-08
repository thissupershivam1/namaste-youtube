import React, { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router-dom';
import CommentContainer from "./CommentContainer";
import { abbreviateNumber } from "js-abbreviation-number";
import RelatedVideos from './RelatedVideos';
import Store from '../utils/Store';
import WpageVideoDetails from './WPageVideoDetail';
import ChatContainer from './ChatContainer';
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
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  const [searchParams] = useSearchParams();
	const videoId = searchParams.get("v");

	const [videoDetails, setVideoDetails] = useState();
	const [channelDetails, setChannelDetails] = useState();

	const channelId = useSelector((store) => store.channel.channelId);

	const dispatch = useDispatch();
	
    const [showChat,setShowLiveChat]=useState(false);
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
    

	// <div className='w-full flex justify-between items-center '>

	// 	<div className="left flex flex-col justify-center items-center w-full">

	// 		<div className="videoplayer">
	// 		<iframe width="800" height="400" src={"https://www.youtube.com/embed/"+searchParams.get("v")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>


	// 		</div>
	// 		<div className="comment">
	// 		<WpageVideoDetails videoId={videoId}/>

	// 		</div>



	// 	</div>

	// 	<div className="right m-1 mx-2   w-full">
	// 	 <RelatedVideos channelId={videoDetails?.snippet?.channelId} />




	// 	</div>


	// </div>

	<div className={`flex w-full flex-row justify-between bg-[#0f0f0f]  ${isMenuOpen ? 'fixed bg-opacity-90' : 'null'}`}>


      <div className='flex flex-col w-full content-center'>
    <div className='m-2 bg-[#131211] flex-grow-9 rounded-xl max-sm:px-1 sm:pr-2  w-screen md:w-[750px]'>
      {/* <iframe width="800" height="400" src={"https://www.youtube.com/embed/"+searchParams.get("v")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> */}

	  <iframe
                data-testid="iframe"
                    width="100%"
                    height="450"
                    src={"https://www.youtube.com/embed/" + searchParams.get("v")+ "?autoplay=1&mute=0"}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className='rounded-xl'
                >
                </iframe>
    </div>


    <div className=" dark:text-white  w-full m-2 p-2">


{/* <CommentContainer videoId={videoId} /> */}
<WpageVideoDetails videoId={videoId}/>
    </div>
    </div>


   {/* related video & live chat section */}
   {/* <div className=" m-1 mx-2 max-sm:hidden "> */}
                {/* <LiveChat /> */}


                {/* related video section */}
                {/* <RelatedVideos channelId={videoDetails?.snippet?.channelId} /> */}
            {/* </div> */}

			

			  {<div className='col-span-4 p-1 hidden md:block'>
          <div className='w-full'>
              {showChat && <ChatContainer />}
              <div className='w-full flex justify-center rounded-3xl text-white '>
                  <button data-testid="show-chat" onClick={()=>setShowLiveChat(!showChat)} className='w-full py-2 border rounded-3xl my-2 hover:bg-gray-200 dark:hover:bg-slate-600'>{showChat ? "Hide chat" : "Show chat"}</button>
              </div>
          </div>
          <RelatedVideos channelId={videoDetails?.snippet?.channelId} />
      </div>
     }
			
			


</div>




  )
}

export default WatchPage