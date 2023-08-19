import React from "react";
import "./../assets/css/table.css";
const AscendingSort = ({ field, handleSort }) => {
  return (
    <button
      onClick={() => handleSort("asc", field)}
      className="sort_button me-1"
    >
      <i className="fa fa-sort-asc sort_button_icon"></i>
    </button>
  );
};

export default AscendingSort;
