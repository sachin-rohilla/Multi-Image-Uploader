import React from "react";

const InputComp = ({ handleImageChange }) => {
  return (
    <div className=" ">
      <label
        htmlFor="fileInput"
        className="cursor-pointer  text-[#a78bfa] font-semibold py-2 px-4 rounded-md"
      >
        Upload Image Here
      </label>
      <input
        id="fileInput"
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default InputComp;
