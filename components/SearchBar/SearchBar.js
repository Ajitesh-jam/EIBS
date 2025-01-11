import React from "react";
import "./SearchBar.css";

const SearchBar = ({ placeholderText, onSearch }) => {
  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper search-bar ">
        <img src="/Images/search.png" alt="Search Icon" className="search-icon" />
        <input
          type="text"
          className="search-bar-wrapper"
          placeholder={placeholderText || "Search..."}
          onChange={(e) => onSearch && onSearch(e.target.value)} // Check if `onSearch` is provided
        />
      </div>
    </div>
  );
};

export default SearchBar;
