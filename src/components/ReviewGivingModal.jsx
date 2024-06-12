import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosHook";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getUserDataFromLocalStorage } from "../utils";
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
// this is the modal body
const Modal = ({ isOpen, onClose, trainer,trainerName }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0)
  const userId = getUserDataFromLocalStorage()?._id;
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { mutateAsync: reviewTrainer, isLoading: reviewTrainerLoading } =
    useMutation({
      mutationFn: async () => {
        const response = await axiosSecure.post(
          `/review/add`,
          {
            user: userId,
            trainer: trainer,
            review,
            rating: rating
          }
        );
        return response.data;
      },
      onSuccess: () => {
        toast.success("Review given done");
        queryClient.invalidateQueries(["bookedtrainers", trainer]);
        setReview("");
        setRating(0);
        onClose();
        navigate("/bookedtrainers");
      },
      onError: (error) => {
        console.log(error);
        toast.error("Failed to give a review,try again later");
      },
    });

  console.log('rating',rating);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await reviewTrainer();
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
            Review <span className="text-orange-600">{trainerName}</span>
          </h3>

          <form onSubmit={handleSubmit} className="mt-4">
            <label
              key="review"
              className="block mt-3"
              htmlFor="review"
            >
              <input
                type="text"
                name="review"
                id="review"
                placeholder="rejected reason"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />
            </label>
            <label
              key="rating"
              className="block mt-3"
              htmlFor="rating"
            >
            <Rating id="rating" style={{ maxWidth: 150 }} value={rating} onChange={setRating} />
            </label>

            <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
              <button
                type="button"
                onClick={()=>{
                  setReview("");
                  setRating(0);
                  onClose();
                }}
                className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-900 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
              >
                Cancel
              </button>

              <button
                type="submit"
                
                className={"w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 " + (review==="" ? "opacity-70 cursor-not-allowed" : "")}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// this is the modal component i mean the button
const ReviewGivingModal = ({ trainerData,trainerName }) => {
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
        className="lg:px-8 px-6 lg:py-2 py-2 text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 rounded-lg"
      >
        Review
      </button>

      <Modal isOpen={isOpen} onClose={closeModal} trainer={trainerData} trainerName={trainerName} />
    </div>
  );
};

export default ReviewGivingModal;
