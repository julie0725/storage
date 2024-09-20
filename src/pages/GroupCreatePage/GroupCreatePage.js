import React, { useState } from "react";
// 컴포넌트 불러오기
import Input from "../../components/ToCreateGroup/Input";
import Textarea from "../../components/ToCreateGroup/TextArea";
import FileUpload from "../../components/ToCreateGroup/FileUpload";
import Toggle from "../../components/ToCreateGroup/Toggle";
import Button from "../../components/ToCreateGroup/Button";

export const GroupCreatePage = () => {
  // 상태 관리
  const [groupName, setGroupName] = useState(""); // 그룹명
  const [groupImage, setGroupImage] = useState(null); // 대표 이미지
  const [groupDescription, setGroupDescription] = useState(""); // 그룹 소개
  const [isPublic, setIsPublic] = useState(false); // 공개 여부
  const [password, setPassword] = useState(""); // 비밀번호

  // 폼 제출 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    // 제출 시 콘솔에 출력
    console.log({
      groupName,
      groupImage,
      groupDescription,
      isPublic,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 그룹명 입력 (Input 컴포넌트 사용) */}
      <Input
        label="그룹명"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="그룹명을 입력하세요"
      />

      {/* 대표 이미지 업로드 (FileUpload 컴포넌트 사용) */}
      <FileUpload
        label="대표 이미지"
        onChange={(file) => setGroupImage(file)} // 파일을 선택하면 상태로 저장
      />

      {/* 그룹 소개 입력 (Textarea 컴포넌트 사용) */}
      <Textarea
        label="그룹 소개"
        value={groupDescription}
        onChange={(e) => setGroupDescription(e.target.value)}
        placeholder="그룹을 소개해주세요"
      />

      {/* 그룹 공개 여부 (Toggle 컴포넌트 사용) */}
      <Toggle
        label="공개"
        checked={isPublic}
        onChange={() => setIsPublic(!isPublic)} // 공개 여부 토글
      />

      {/* 비공개일 경우에만 비밀번호 입력 (Input 컴포넌트 사용) */}
      {!isPublic && (
        <Input
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
        />
      )}

      {/* 만들기 버튼 (Button 컴포넌트 사용) */}
      <Button label="만들기" onClick={handleSubmit} />
    </form>
  );
};
