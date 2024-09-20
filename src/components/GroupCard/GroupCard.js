import React from "react";
import "./GroupCard.css";

const GroupCard = ({ group }) => {
  const hasImage = group.image; //이미지 확인 용도 있냐 없냐에 따라 크기 다르게

  return (
    <div className={`group-card ${hasImage ? "" : "no-image"}`}>
      {hasImage && (
        <img className="group-card-image" src={group.image} alt={group.title} />
      )}
      <div className="group-card-content">
        <div className="group-meta">
          <span>D+{group.daysLeft}</span>
          <span>{group.isPrivate ? "비공개" : "공개"}</span>
        </div>
        <h3 className="group-title">{group.title}</h3>
        <p className="group-description">{group.description}</p>

        <div className="group-stats">
          <div className="stat">
            <span>획득 배지</span>
            <span>{group.badges}</span>
          </div>
          <div className="stat">
            <span>추억</span>
            <span>{group.comments}</span>
          </div>
          <div className="stat">
            <span>그룹 공감</span>
            <span>🌼 {group.views}K</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
