import { useContext, useEffect } from "react";
import { FormModalContext } from "../context/FormModalContext";
import Button from "../Button";

export default function RegisterGuruForm({ handleSubmit, children }) {
    const { formData, setFormData } = useContext(FormModalContext);
    useEffect(() =>{
        setFormData((previous) => ({
            ...previous,
            ['role']: "GURU"
        }))
    },[])
  return (
    <>
      <form
        autoComplete="off"
        className="flex flex-col h-full transition duration-300 overflow-x-hidden relative bg-white z-40"
        onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleSubmit(formData, setFormData);
        }}
      >
        <div className="max-w-[375px] w-full flex-1 flex flex-col justify-center mx-auto">
          <div className="px-2">{children}</div>
          <div className="px-2">
            <Button full variant="primary">
              Register
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}