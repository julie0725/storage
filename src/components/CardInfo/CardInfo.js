import React from "react";
import "./CardInfo.css";

const CardInfo = () => {
  return (
    <div className="card-info-container">
      <img
        className="card-info-image"
        src="/path/to/image.jpg"
        alt="그룹 이미지"
      />
      <div className="card-info-text">
        <div className="card-info-header">
          <span className="days-left">D-265</span>
          <span className="status">공개</span>
        </div>
        <h2 className="group-name">달봉이네 가족</h2>
        <p className="group-description">
          서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.
        </p>
        <div className="group-stats">
          <span className="posts">게시물 8</span> |
          <span className="likes"> 그룹 공감 1.5K</span>
        </div>
        <div className="badge-list">
          <span className="badge"> 7일 연속 게시글 등록</span>
          <span className="badge"> 그룹 공감 1만 개 이상 받기</span>
          <span className="badge"> 게시글 공감 1만 개 이상 받기</span>
        </div>
        <button className="like-button"> 공감 보내기</button>
      </div>
    </div>
  );
};

export default CardInfo;
