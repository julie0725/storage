import React from "react";
import "./Dropdown.css";

const Dropdown = () => {
  return (
    <div className="dropdown">
      <select>
        <option value="공감순">공감순</option>
        <option value="조회순">조회순</option>
        <option value="댓글순">댓글순</option>
      </select>
    </div>
  );
};

export default Dropdown;
