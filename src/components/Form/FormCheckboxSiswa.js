import React, {useContext} from 'react'
import Button from '../Button';
// import { FormModalContext } from '../context/FormModalContext';
import { FormCheckboxContext } from '../context/FormCheckboxContext';
export default function FormCheckboxSiswa ({handleSubmit,children}) {
  const { formData, setFormData } = useContext(FormCheckboxContext);

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
              Submit
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}
