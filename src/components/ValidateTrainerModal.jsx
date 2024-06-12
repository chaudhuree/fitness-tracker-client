import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosHook";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// this is the modal body
const Modal = ({ isOpen, onClose, trainer }) => {
  const [rejectedReason, setRejectedReason] = useState("");
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { mutateAsync: validateTrainer, isLoading: validateTrainerLoading } =
    useMutation({
      mutationFn: async () => {
        const response = await axiosSecure.put(
          `/trainer/validate/${trainer._id}`,
          {
            status: "rejected",
            rejectedReason,
          }
        );
        return response.data;
      },
      onSuccess: () => {
        toast.success("Trainer validated successfully");
        queryClient.invalidateQueries(["trainer", trainer?._id, "trainers"]);
        onClose();
        navigate("/appliedtrainers");
      },
      onError: (error) => {
        console.log(error);
        toast.error("Failed to validate trainer from modal");
      },
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await validateTrainer();
  };

  return (
    <div
      className={`${
        isOpen ? "fixed inset-0 z-10 overflow-y-auto" : "hidden"
      } flex items-center justify-center`}
    >
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div className="relative inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div>
          <h3 className="text-lg  font-medium leading-6 text-gray-800 capitalize dark:text-white">
            Reject <span className="text-orange-600">{trainer.name}</span>
          </h3>
          <div className="flex flex-col gap-1 my-2 ml-1">
            <h4 className="text-gray-800"> Email: {trainer.email}</h4>
            <p>Available at : {trainer.availableTimeSlot}</p>
            <p>
              Classes :{" "}
              {trainer.classes.map((cls, index) => (
                <span key={index} className="mr-2">
                  {cls.name}
                  {index < trainer.classes.length - 1 ? "," : ""}
                </span>
              ))}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-4">
            <label
              key="rejectedReason"
              className="block mt-3"
              htmlFor="rejectedReason"
            >
              <input
                type="text"
                name="rejectedReason"
                id="rejectedReason"
                placeholder="rejected reason"
                value={rejectedReason}
                onChange={(e) => setRejectedReason(e.target.value)}
                className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />
            </label>

            <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-900 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
              >
                Cancel
              </button>

              <button
                type="submit"
                
                className={"w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-red-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 " + (rejectedReason==="" ? "opacity-70 cursor-not-allowed" : "")}
              >
                Reject
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// this is the modal component i mean the button
const ValidateTrainerModal = ({ trainerData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative flex justify-center">
      <button
        onClick={openModal}
        className="lg:px-10 px-6 lg:py-2 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg"
      >
        Reject
      </button>

      <Modal isOpen={isOpen} onClose={closeModal} trainer={trainerData} />
    </div>
  );
};

export default ValidateTrainerModal;
