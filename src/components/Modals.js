import Button from "./Button";

import React, { useRef, useState } from "react";
import { B } from "./Typography";
// import useOnClickOutside from "./useOnClickOutside";


export default function Modals({ onClick, title, desc, buttonName }) {
  const [isOpen, setIsOpen] = useState(false);

  // const ref = useRef();

  // useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div>
      {/* Button */}
      <Button variant="secondary" onClick={() => setIsOpen(true)} >This Is Modals</Button>
      {isOpen && (
        <div>
          {/* Overlay */}
          <div className="fixed inset-0 w-screen h-screen bg-black/20"></div>
          <div className="fixed inset-0 w-screen h-screen grid place-items-center">
            <div className="px-4">
              {/* Modal */}
              <div className="bg-white rounded-lg max-w-[448px] max-h-[448px]" >
                <div className="flex py-4 px-6">

                  <div className=" font-semibold">
                    <B>Delete user</B>
                  </div>
                  <div className="ml-40">
                    <img src="assets/Close Button.svg"></img>
                  </div>
                </div>
                <p className="py-4 px-6">Are you sure want to delete this workspace?</p>
                <div className="flex gap-4 px-6 justify-end py-4">
                  <Button variant="disabled" onClick={() => setIsOpen(!isOpen)}>
                    cancel
                  </Button>
                  {/* <button
                      className="bg-indigo-500 text-white px-4 py-2 rounded"
                      onClick={() => {
                        onClick();
                        setIsOpen(false);
                      }}
                    >
                      {buttonName}
                    </button> */}
                  <Button variant={buttonName} onClick={() => setIsOpen(!isOpen)}>
                    {buttonName}
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