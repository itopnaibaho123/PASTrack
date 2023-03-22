import { useRouter } from "next/router";
import React from "react";
import Button from "./Button";
import { B, H2, H3, P } from "./Typography";
import { POSTINGAN_TUGAS } from "@/components/Hooks/Tugas";
import { deleteTugas } from "@/components/Hooks/Tugas";
import { getCookie } from "@/components/Helper/cookies";
import { useContext } from "react";
// import FormModalContextProvider from "./context/FormModalContext";
import { FormCheckboxContext } from "./context/FormCheckboxContext";

export default function Checkbox({ name, value, id, username }) {
  const { setFormData, formData } = useContext(FormCheckboxContext);

  function onCheck(e) {
    const { value, checked, name } = e.target;
    if (checked) {
      setFormData((prev) => [...prev, { [name]: value }]);
    } else {
      setFormData(formData.filter((valCheck) => valCheck[name] !== value));
    }
  }

  return (
    <div>
      <label className="flex items-center" key={id}>
        <input
          id={id}
          className="mr-2 accent-blue-500 w-4 h-4"
          type="checkbox"
          name={name}
          value={username}
          onChange={onCheck}
        />
        <span className="text-gray-700">{value}</span>
      </label>
    </div>
  );
}
