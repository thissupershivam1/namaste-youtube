import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "./Constants";
import { cacheResults } from "../utils/searchSlice";
// import { useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import { RiVideoAddLine } from "react-icons/ri";

import ytLogo from "../images/yt-logo.png";
import ytLogoMobile from "../images/yt-logo-mobile.png";
import mobilelogo from "../images/yt-logo-mobile.png";
import { Link } from "react-router-dom";

const Header = () => {
  // const navigate=useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // const navigate=useNavigate();

  const searchCache = useSelector((store) => store.search);

  // Handling event when clicked enter in search bar
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Navigate");
    // navigate("/search?q="+searchQuery,{ relative: "path" })
    setShowSuggestions(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }

      console.log(suggestions, "suggestions");
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();

    setSuggestions(json[1]);

    //update cache
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  return (
    <div className="flex justify-between items-center h-16 sticky top-0 content-center z-10 shadow-lg bg-[#0f0f0f]">
      <div className="flex justify-between items-center gap-5 mx-3 ">
        <div className="hidden md:block">
        <i
          className="fa-solid fa-bars text-white text-xl  cursor-pointer   "
          onClick={() => toggleMenuHandler()}
        ></i>


        </div>
        
        {/* <img className="h-6 w-30  mt-5 " src={logo} alt="" /> */}
        <a href="/" className="flex h-5 items-center">
        <img
                        className="h-full hidden dark:md:block"
                        src={ytLogo}
                        alt="Youtube"
                    />
                    <img
                        className="h-full md:hidden"
                        src={ytLogoMobile}
                        alt="Youtube"
                    />

        </a>
       
       
      </div>


      {/* <div className="flex flex-col ">
        <div className="flex items-center justify-center h-10">
          <input
            className="bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px] border border-white rounded-l-full "
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            placeholder="Search"
          />
          <button
            className=" border border-gray-500 bg-[#3f3f3f] rounded-r-full flex justify-center align-middle"
            onClick={() => {
              window.location.href = "/search?q=" + searchQuery;
            }}
          >
            <i className="fa-solid fa-magnifying-glass text-white"></i>
          </button>
        </div>  */}

<div className="flex flex-col">
      <div className="flex items-center   h-15 ralative ">
        <input
          className="h-[40px] bg-transparent outline-none text-white  pr-5 pl-12 w-44 md:w-64 lg:w-[500px] border border-white rounded-l-full"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
          placeholder="Search"
        />
        <i className="absolute ml-5 top-1/2  transform -translate-y-1/2 text-white">
          <i className="fa-solid fa-magnifying-glass"></i>
        </i>
        <button
          className="h-[40px] w-10   bg-[#3f3f3f] rounded-r-full flex justify-center items-center border-1 border-white"
          onClick={() => {
            window.location.href = "/search?q=" + searchQuery;
          }}
        >
          <i className="fa-solid fa-search text-white"></i>
        </button>
      </div>

      {(showSuggestions && suggestions.length>0) && (
        <div className="bg-white text-slate-950 absolute   mt-12 rounded-md ">
          <ul className="mt-10   w-44 md:w-64 lg:w-[500px]">
            {suggestions.map((s) => (
              <li
                key={s}
                className="m-2 p-2 border-zinc-50 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSearchQuery(s);
                  setShowSuggestions(false);
                }}
              >
                <i className="fa-solid fa-magnifying-glass mx-2"></i> {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    <div className="flex items-center">
                <div className="hidden md:flex">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
                        <RiVideoAddLine className="text-white text-xl cursor-pointer" />
                    </div>
                    <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
                        <FiBell className="text-white text-xl cursor-pointer" />
                    </div>
                </div>
                <div className="flex h-8 w-8 overflow-hidden rounded-full md:ml-4">
                    <img src="https://xsgames.co/randomusers/assets/avatars/female/67.jpg" />
                </div>
            </div>
    </div>
  );
};

export default Header;

/*
 <div className="group flex items-center">
                <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
                    <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
                        <IoIosSearch className="text-white text-xl" />
                    </div>
                    <input
                        type="text"
                        className="bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyUp={searchQueryHandler}
                        placeholder="Search"
                        value={searchQuery}
                    />
                </div>
                <button
                    className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]"
                    onClick={() => searchQueryHandler("searchButton")}
                >
                    <IoIosSearch className="text-white text-xl" />
                </button>
            </div>
            <div className="flex items-center">
                <div className="hidden md:flex">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
                        <RiVideoAddLine className="text-white text-xl cursor-pointer" />
                    </div>
                    <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
                        <FiBell className="text-white text-xl cursor-pointer" />
                    </div>
                </div>
                <div className="flex h-8 w-8 overflow-hidden rounded-full md:ml-4">
                    <img src="https://xsgames.co/randomusers/assets/avatars/female/67.jpg" />
                </div>
            </div>
*/