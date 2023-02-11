import React from "react";

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-white"
          // className="block text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-400 text-xs bg-orange-600 py-1 px-2 rounded-[5px] text-white hover:bg-orange-700"
            // className="font-semibold text-xs bg-[#ececf1] py-1 px-2 rounded-[5px] text-black hover:bg-orange-500"
          >
            Illuminate
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="bg-[#2d2d2d] border-red text-white text-sm rounded-lg focus:ring-[#fff] focus:border-[#fff] outline-none block w-full p-3"
        // className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
        required
      />
    </div>
  );
};

export default FormField;
