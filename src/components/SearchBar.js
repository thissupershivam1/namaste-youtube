import React, { useState } from 'react';

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestions = ['suggestion1', 'suggestion2', 'suggestion3']; // Add your suggestions here

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center h-15 relative">
        <input
          className="h-[40px] bg-transparent outline-none text-white pr-5 pl-12 w-44 md:w-64 lg:w-[500px] border border-white rounded-l-full"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
          placeholder="Search"
        />
        <i className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white">
          <i className="fa-solid fa-magnifying-glass"></i>
        </i>
        <button
          className="h-[40px] w-10 border border-gray-500 bg-[#3f3f3f] rounded-r-full flex justify-center items-center"
          onClick={() => {
            window.location.href = "/search?q=" + searchQuery;
          }}
        >
          <i className="fa-solid fa-search text-white"></i>
        </button>
      </div>

      {showSuggestions && (
        <div className="bg-white text-slate-950 z-30 w-96 mt-1">
          <ul>
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
  );
}

export default SearchBar;
