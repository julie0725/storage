import React from "react";
import MemoryDetail from "../../components/MemoryDetail";
import CommentSection from "../../components/CommentSection";
import LikeButton from "../../components/LikeButton";

const MemoryDetailPage = () => {
  return (
    <div className="memory-detail-container">
      <MemoryDetail />
      <LikeButton />
      <CommentSection />
    </div>
  );
};

export default MemoryDetailPage;
