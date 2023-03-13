import React, { useState } from "react";
import { useContext } from "react";
import { FormModalContext } from "./context/FormModalContext";

const variants = {
  primary: "bg-main-color-navy text-background",
  secondary:
    "bg-white ring-1 ring-main-text-brown rounded-md px-2 py-1 h-[48px]",
  disabled: "bg-background text-main-color-navy",
  ghost: "bg-white text-main-color-navy ring-1 ring-main-color-navy",
  delete: "bg-red-500 text-white",
};

export default function Input({
  placeholder,
  name,
  label,
  variant,
  helper,
  disabled,
  required = true,
  full,
  type = "text",
  inputvalue
}) {
  // const [form, setForm] = useState()
  const { setFormData, formData } = useContext(FormModalContext);

  return (
    <div className={`flex flex-col gap-2 py-1.5 ${full && "w-full"} mb-2`}>
      <label htmlFor={name}>
        {label}
      </label>
      <div className="flex ring-gray/50 ring-[1.5px] rounded-sm items-stretch">
        <input
          className={` px-3 py-1.5 flex-1 !outline-none ${variants[variant]}`}
          id={name}
          placeholder={placeholder}
          name={name}
          disabled={disabled}
          type={type}
          value={formData[name] || inputvalue}
          required={required}
          onChange={(e) => {
            setFormData((previous) => ({
              ...previous,
              [name]: e.target.value,
            }));
          }}
        />
      </div>
      {helper && (
        <span className="px-4 font-medium text-red-300">{helper}</span>
      )}
    </div>
  );
}
