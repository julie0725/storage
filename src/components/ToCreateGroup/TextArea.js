import React from "react";

const Textarea = ({ label, value, onChange, placeholder }) => {
  return (
    <div className="textarea-container">
      <label>{label}</label>
      <textarea value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
};

export default Textarea;
