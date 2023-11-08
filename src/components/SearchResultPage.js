import React, { useEffect ,useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import { YOUTUBE_SEARCH_VIDEO_API } from './Constants'
import SearchVideoCard from './SearchVideoCard'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setChannelId } from '../utils/channelIdSlice'
import { closeMenu } from '../utils/appSlice'

// Search Results
const SearchResultsPage = () => {
  const [params]=useSearchParams();
  const query=params.get("q");
  const [searchresults,setSearchResults]=useState([]);
  const dispatcher=useDispatch();

  useEffect(()=>{
    getSearchData();
    dispatcher(closeMenu())
    console.log(query)
  },[query])

  const getSearchData=async ()=>{
    const data=await fetch(YOUTUBE_SEARCH_VIDEO_API+query);
    const json=await data.json();
    setSearchResults(json?.items);
  } 

  return (
    <div className=' w-full  overflow-y-hidden'>
      {
        searchresults.map((result)=> <Link 
        key={result?.id?.videoId} 
        to={"/watch?v="+result?.id?.videoId} 
        onClick={()=>{
          dispatcher(setChannelId(result?.snippet?.channelId))
        }}>

        <SearchVideoCard 
        data={result?.snippet}/>
        </Link>
        )
      }
    </div>
  )
}

export default SearchResultsPage
