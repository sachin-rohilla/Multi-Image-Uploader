import React from "react";

const InputComp = ({ handleImageChange, index }) => {
  return (
    <div>
      <label
        htmlFor={`fileInput${index}`}
        className="cursor-pointer  text-[#a78bfa] font-semibold py-2 px-4 rounded-md"
      >
        Upload Image Here
      </label>
      <input
        id={`fileInput${index}`}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(e, index)}
      />
    </div>
  );
};

export default InputComp;
