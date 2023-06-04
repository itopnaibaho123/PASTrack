import Button from "./Button";
import React, { useContext, useState } from "react";
import { B } from "./Typography";
import { FormModalContext } from "./context/FormModalContext";

export default function Modals({

  title,
  desc,
  confirmButtonName,
  cancelButtonName,
  
}) {
  const { isOpen, setIsOpen } =useContext(FormModalContext);

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
    <div>
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
                <B className="text-xl mb-2">{title}</B>
                <p className="text-gray-500 mb-4">{desc}</p>
                <div className="flex justify-end space-x-2">
                  <Button
                    className="color-"
                    onClick={handleCancelClick}
                    type=""
                  >
                    {cancelButtonName}
                  </Button>
                  <Button onClick={handleConfirmClick} type={"submit"}>
                    {confirmButtonName}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
