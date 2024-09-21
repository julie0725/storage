import React, { useState } from "react";
import Input from "../components/ToCreateGroup/Input";
import Textarea from "../components/ToCreateGroup/TextArea";
import FileUpload from "../components/ToCreateGroup/FileUpload";
import Toggle from "../components/ToCreateGroup/Toggle";
import Button from "../components/ToCreateGroup/Button";

import "./GroupCreatePage.css";

export const GroupCreatePage = () => {
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const [groupDescription, setGroupDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      groupName,
      groupImage,
      groupDescription,
      isPublic,
      password,
    });
  };

  return (
    <div className="group-create-container">
      <h1>그룹 만들기</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="그룹명"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="그룹명을 입력하세요"
        />
        <FileUpload
          label="대표 이미지"
          onChange={(file) => setGroupImage(file)}
        />
        <Textarea
          label="그룹 소개"
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
          placeholder="그룹을 소개해주세요"
        />
        <Toggle
          label="공개"
          checked={isPublic}
          onChange={() => setIsPublic(!isPublic)}
        />
        {!isPublic && (
          <Input
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
          />
        )}
        <Button label="만들기" />
      </form>
    </div>
  );
};
