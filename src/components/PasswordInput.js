import { FormModalContext } from "./context/FormModalContext";
import { useState, useContext } from "react";

export default function PasswordInput({
  name,
  placeholder,
  label,
  full,
  disabled = false,
  required = true,
}) {
  const [isVisible, setIsVisible] = useState(false);

  const { formData, setFormData } = useContext(FormModalContext);

  return (
    <div className={`flex flex-col gap-2 ${full && "w-full"} mb-2`}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className="flex ring-gray/50 ring-[1.5px] rounded-sm items-stretch">
        <input
          className={`px-3 py-1.5 flex-1 !outline-none ${
            disabled && "cursor-not-allowed text-black/50"
          }`}
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
