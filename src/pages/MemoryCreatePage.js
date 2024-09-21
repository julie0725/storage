import React, { useState } from "react";
import Input from "../../components/ToCreateGroup/Input";
import Textarea from "../../components/ToCreateGroup/TextArea";
import FileUpload from "../../components/ToCreateGroup/FileUpload";
import TagInput from "../../components/TagInput";
import DateInput from "../../components/DateInput";
import Toggle from "../../components/ToCreateGroup/Toggle";
import Button from "../../components/ToCreateGroup/Button";

const MemoryCreatePage = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [date, setDate] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      image,
      description,
      tags,
      date,
      isPublic,
      password,
    });
  };

  return (
    <div className="memory-create-container">
      <h1>추억 올리기</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="추억 제목을 입력하세요"
        />
        <FileUpload label="이미지" onChange={(file) => setImage(file)} />
        <Textarea
          label="본문"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="본문 내용을 입력하세요"
        />
        <TagInput
          label="태그"
          value={tags}
          onChange={(newTags) => setTags(newTags)}
        />
        <DateInput
          label="추억의 순간"
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
        <Button label="올리기" />
      </form>
    </div>
  );
};

export default MemoryCreatePage;
