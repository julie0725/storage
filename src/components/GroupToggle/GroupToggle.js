import React from "react";
import "./GroupToggle.css";

const GroupToggle = ({ isPublic, setIsPublic }) => {
  return (
    <div className="group-toggle">
      <button
        className={`toggle-button ${isPublic ? "active" : ""}`}
        onClick={() => setIsPublic(true)}
      >
        공개
      </button>
      <button
        className={`toggle-button ${!isPublic ? "active" : ""}`}
        onClick={() => setIsPublic(false)}
      >
        비공개
      </button>
    </div>
  );
};

export default GroupToggle;
