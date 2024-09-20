import React from "react";
import searchIcon from "../../assets/icon/icon=search.png";
import "./SearchBar.css"; // CSS 파일 로드

const SearchBar = () => {
  return (
    <div className="search-bar">
      <img src={searchIcon} alt="search-icon" className="search-icon" />{" "}
      {/* 아이콘 추가 */}
      <input type="text" placeholder="그룹명을 검색해 주세요" />
    </div>
  );
};

export default SearchBar;
