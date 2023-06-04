import React, { useContext } from "react";
import Button from "../Button";
import { FormModalContext } from "../context/FormModalContext";
import Modals from "../Modals";
import { B } from "../Typography";
export default function FormCreatePostinganTugas({ handleSubmit, children }) {
  const { formData, setFormData, isOpen, setIsOpen } =
    useContext(FormModalContext);

  const submitting = (e) => {
    e.stopPropagation;
    e.preventDefault;
    handleSubmit(formData, setFormData, isOpen, setIsOpen);
  };
  const handleConfirmClick = () => {
    setIsOpen(false);
  };

  const handleCancelClick = () => {
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div>
        <form
          autoComplete="off"
          className="flex flex-col h-full transition duration-300 overflow-x-hidden relative bg-white z-40"
          onSubmit={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleSubmit(formData, setFormData);
          }}
        >
          {isOpen && (
            <div>
              {/* Overlay */}
              <div
                className="fixed inset-0 w-screen h-screen bg-black/20"
                onClick={handleClose}
              ></div>
              <div className="fixed inset-0 w-screen h-screen grid place-items-center">
                <div className="px-4">
                  {/* Modal */}
                  <div className="bg-white rounded-lg max-w-[448px] mx-auto p-6">
                    <B className="text-xl mb-2">Create Tugas</B>
                    <p className="text-gray-500 mb-4">
                      Are You Sure Want To Add This Tugas
                    </p>
                    <div className="flex justify-end space-x-2">
                      <Button className="bg-red" onClick={handleCancelClick}>
                        Cancel
                      </Button>
                      <Button onClick={handleConfirmClick} type={"submit"}>
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
        <div className="max-w-[375px] w-full flex-1 flex flex-col justify-center mx-auto">
          <div className="px-2">{children}</div>
          <div className="px-2">
            <Button full variant="primary" onClick={() => setIsOpen(!isOpen)}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
