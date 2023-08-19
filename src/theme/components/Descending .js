import React from "react";

const DescendingSort = ({ field, handleSort }) => {
  return (
    <button onClick={() => handleSort("desc", field)} className="sort_button">
      <i className="fa fa-sort-desc sort_button_icon"></i>
    </button>
  );
};

export default DescendingSort;
