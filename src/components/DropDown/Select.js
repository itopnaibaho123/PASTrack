import React, { useContext } from "react";
import { FormModalContext } from "../context/FormModalContext";
export default function Select({ label, children, name, placeholder }) {
  const { setFormData, formData } = useContext(FormModalContext);
  return (
    <div className='className={`flex flex-col gap-2 py-1.5 ${full && "w-full"} mb-2`'>
      <label>{label}</label>
      <div className="flex ring-gray/50 ring-[1.5px] rounded-sm items-stretch">
        <select
          placeholder="test"
          className="px-3 py-1.5 flex-1 !outline-none"
          value={formData[name]}
          onChange={(e) => {
            setFormData((previous) => ({
              ...previous,
              [name]: e.target.value,
            }));
          }}
        >
          {children.map((item, index) => {
            return <option value={item}>{item}</option>;
          })}
        </select>
      </div>
    </div>
  );
}
