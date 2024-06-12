import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";

const Modal = ({ isOpen, onClose, message }) => {
  return (
    <div
      className={`${
        isOpen ? "fixed inset-0 z-50 overflow-y-auto" : "hidden"
      } flex items-center justify-center`}
    >
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div className="relative inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div>
          <h3 className="text-lg  font-medium leading-6 text-gray-800 capitalize dark:text-white">
            Rejection Reason - <span className="text-orange-600">{message}</span>
          </h3>

          <div className="mt-4">
            <div className="mt-4 sm:flex sm:items-center sm:justify-end sm:-mx-2">
             

              <button
                type="submit"
                className="w-full px-2 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/4 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RejectedDataViewModal = ({ message }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative flex justify-center">
      <p
        onClick={openModal}
      >
        <AiOutlineEye className="text-2xl text-orange-500 cursor-pointer" />
      </p>

      <Modal isOpen={isOpen} onClose={closeModal} message={message} />
    </div>
  );
};

export default RejectedDataViewModal;
