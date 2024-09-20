import React, { useState, useRef } from "react";

const FileUpload = ({ label, onChange }) => {
  const [fileName, setFileName] = useState(""); // 선택한 파일 이름 저장
  const fileInputRef = useRef(null); // useRef를 사용하여 파일 입력을 참조

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // 선택한 파일

    if (file) {
      setFileName(file.name); // 파일 이름 저장
      onChange(file); // 부모 컴포넌트에 파일 전달
    }
  };

  const handleButtonClick = () => {
    // 숨겨진 파일 입력 요소 클릭
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className="file-upload-container"
      style={{ display: "flex", alignItems: "center" }}
    >
      <label>{label}</label>
      <input
        type="text"
        value={fileName}
        placeholder="파일을 선택해 주세요"
        readOnly
        style={{ marginRight: "10px", flex: 1 }}
      />
      <input
        type="file"
        ref={fileInputRef} // useRef로 파일 입력 참조
        onChange={handleFileChange}
        style={{ display: "none" }} // 기본 파일 업로드 버튼 숨기기
      />
      <button
        type="button"
        onClick={handleButtonClick}
        style={{
          cursor: "pointer",
          padding: "5px 10px",
          border: "1px solid black",
          borderRadius: "5px",
        }}
      >
        파일 선택
      </button>
    </div>
  );
};

export default FileUpload;
