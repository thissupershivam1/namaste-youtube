import React, { useEffect, useState } from "react";
import { YOUTUBE_RELATED_VIDEO_LIST_API } from "./Constants";
import { PublishedTimeOfVideo } from "../utils/help";
import { Link } from "react-router-dom";

const RelatedVideos = ({ channelId }) => {
	console.log("channelid" + channelId);

	const [relatedVideoList, setRelatedVideoList] = useState([]);
	let check = false;

	useEffect(() => {
		getRelatedVideos();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [channelId]);

	const getRelatedVideos = async () => {
		const response = await fetch(
			YOUTUBE_RELATED_VIDEO_LIST_API + channelId
		);
		const jsonData = await response.json();
		console.log(jsonData?.items);
		setRelatedVideoList(jsonData?.items);
	};
	return !relatedVideoList ? null : (
		<div className=" w-[340px] bg-[#131211]">
			<div className="flex flex-col justify-start bg-[#131211]">
				{/* { relatedVideoList[0].snippet.title} */}
				{relatedVideoList.map((item) => {
					if (item?.kind==="youtube#activity") check = true;
					return check && (
                        <Link key={item?.id} to={"/watch?v=" + item?.contentDetails?.upload?.videoId}>
						    <div className=" bg-[#131211] my-1 flex p-1 rounded-lg">			
								<img
									alt="thumbnails"
									className=" px-1 rounded-lg h-20 w-36"
									src={item?.snippet?.thumbnails?.medium?.url}
								/>
								<div className=" flex flex-col bg-[#131211] ">
									<div className=" dark:text-slate-100/90 font-semibold text-white text-sm line-clamp-2 bg-[#131211]">
										{item?.snippet?.title}
									</div>
									<div className=" dark:text-slate-100/70 text-slate-700 font-semibold text-xs bg-[#131211]">
										{item?.snippet?.channelTitle}
									</div>
									<div className=" dark:text-slate-100/70 text-slate-600 text-xs bg-[#131211]">
										{PublishedTimeOfVideo(
											item?.snippet?.publishedAt
										)}
									</div>
								</div>	
						    </div>
                        </Link>
					);
				})}
			</div>
		</div>
	);
};

export default RelatedVideos;