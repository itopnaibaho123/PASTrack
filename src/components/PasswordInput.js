import { FormModalContext } from "./context/FormModalContext";
import { useState, useContext } from "react";

const variants = {
  primary: "bg-main-color-navy text-background",
  secondary:
    "bg-white ring-1 ring-main-text-brown rounded-md px-2 py-1 h-[48px]",
  disabled: "bg-background text-main-color-navy",
  ghost: "bg-white text-main-color-navy ring-1 ring-main-color-navy",
  delete: "bg-red-500 text-white",
};

export default function PasswordInput({
  name,
  placeholder,
  label,
  full,
  disabled = false,
  required = true,
  variant
}) {
  const [isVisible, setIsVisible] = useState(false);

  const { formData, setFormData } = useContext(FormModalContext);

  return (
    <div className={`flex flex-col gap-2 ${full && "w-full"} mb-2`}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className="flex ring-gray/50 ring-[1.5px] rounded-sm items-stretch">
        <input
          className={`px-3 py-1.5 flex-1 !outline-none ${variants[variant]}`}
          autoComplete="off"
          id={name}
          name={name}
          placeholder={placeholder}
          type="password"
          disabled={disabled}
          required={required}
          value={formData[name] || ""}
          onChange={(e) =>
            setFormData((previous) => ({
              ...previous,
              [name]: e.target.value,
            }))
          }
          onInput={(e) => e.target.setCustomValidity("")}
          onInvalid={(e) => {
            e.target.setCustomValidity(`${label} cannot be empty.`);
          }}
        />
      </div>
    </div>
  );
}
