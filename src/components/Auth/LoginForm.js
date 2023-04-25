import { useContext } from "react";
import { FormModalContext } from "../context/FormModalContext";
import Button from "../Button";

export default function LoginForm({ handleSubmit, children }) {
  const { formData, setFormData } = useContext(FormModalContext);
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
          <div className="px-2">
            <h2 className="text-lg font-medium text-gray-700 mb-2 text-center">Login</h2>
          </div>
          <div className="px-2">
            {children}
          </div>
          <div className="px-2 pt-4 text-center">
            <Button full variant="primary">
              Sign In
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
