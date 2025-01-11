import React from "react";
import './Searchbar.css';
const SearchBar = ({ placeholderText, onSearch }) => {
  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        <img src="/Images/search.png" alt="Search Icon" className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder={placeholderText || "Search Events"}
          onChange={(e) => onSearch && onSearch(e.target.value)} // Check if `onSearch` is provided
        />
      </div>
    </div>
  );
};

export default SearchBar;