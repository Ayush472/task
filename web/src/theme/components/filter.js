import React from "react";

const SearchBar = ({
  search,
  handleSearchInput,
  handleSearchBtn,
  handleResetBtn,
}) => {
  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          className="search-bar"
          value={search}
          onChange={handleSearchInput}
          placeholder="Search..."
        />
      </div>
      <div className="search-button">
        <button onClick={handleSearchBtn} className="button-search">
          <i className="fa fa-search"></i>
        </button>
        <button onClick={handleResetBtn} className="button-refresh">
          <i className="fa fa-refresh"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
