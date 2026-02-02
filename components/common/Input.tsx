"use client";

import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  defValue?: string;
  editable?: boolean;
}

const InputField = ({
  label,
  defValue,
  editable,
  ...props
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      {/* Label - Darker, bolder text */}
      <label className="text-sm font-bold text-[#1a2b3b] tracking-tight">
        {label}
      </label>

      {/* Input Field */}
      <input
        defaultValue={defValue}
        {...props}
        className={`w-full px-4 py-3 text-sm rounded-xl border border-gray-200 
                  ${editable ? "text-gray-700" : "text-gray-400"} outline-none transition-all duration-200
                   placeholder:text-gray-400 placeholder:font-light
                   focus:border-blue-400 focus:ring-1 focus:ring-blue-100`}
      />
    </div>
  );
};

export default InputField;
