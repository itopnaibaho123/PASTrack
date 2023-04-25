import Button from "./Button";
import React, { useState } from "react";
import { B } from "./Typography";

export default function Modals({
  onClick,
  onClose,
  title,
  desc,
  confirmButtonName,
  cancelButtonName,
}) {
  const [isOpen, setIsOpen] = useState(true);

  const handleConfirmClick = () => {
    setIsOpen(false);
    onClick();
  };

  const handleCancelClick = () => {
    setIsOpen(false);
    onClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
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
                  <Button onClick={handleCancelClick}>{cancelButtonName}</Button>
                  <Button onClick={handleConfirmClick}>{confirmButtonName}</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
