import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";

const CommentModal = ({ onClose }) => {
  const [nickname, setNickname] = useState("");
  const [comment, setComment] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nickname, comment, password });
  };

  return (
    <div className="comment-modal">
      <form onSubmit={handleSubmit}>
        <Input
          label="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Input
          label="댓글"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Input
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button label="등록하기" />
      </form>
      <Button label="닫기" onClick={onClose} />
    </div>
  );
};

export default CommentModal;
