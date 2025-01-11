import React from "react";
import "./SearchBar.css";

const SearchBar = ({ placeholderText, onSearch }) => {
    return (
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder={placeholderText || "Search..."}
          onChange={(e) => onSearch && onSearch(e.target.value)} // Check if `onSearch` is provided
        />
      </div>
    );
  };

export default SearchBar;
