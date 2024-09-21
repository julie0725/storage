import React from "react";
import activeImg from "../../assets/tab/state=active.png";
import defaultImg from "../../assets/tab/state=default.png";
import "./GroupToggle.css";

const GroupToggle = ({ isPublic, setIsPublic }) => {
  return (
    <div className="group-toggle">
      <button className="toggle-button" onClick={() => setIsPublic(true)}>
        <img
          src={isPublic ? activeImg : defaultImg}
          alt="공개"
          className={isPublic ? "active" : ""}
        />
      </button>
      <button className="toggle-button" onClick={() => setIsPublic(false)}>
        <img
          src={!isPublic ? activeImg : defaultImg}
          alt="비공개"
          className={!isPublic ? "active" : ""}
        />
      </button>
    </div>
  );
};

export default GroupToggle;
