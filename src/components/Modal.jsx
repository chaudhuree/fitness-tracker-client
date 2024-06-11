import React, { useState } from "react";
import { useMutation ,useQueryClient} from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosHook";
import toast from "react-hot-toast";
import {getUserDataFromLocalStorage} from "../utils";

const Modal = ({ isOpen, onClose, classId,price,className,refetch }) => {
  const [transactionId, setTransactionId] = useState("");
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const {mutateAsync} = useMutation({
    mutationFn: async ({classId,price}) => {
      const { data } = await axiosSecure.post(`/classbooking/add`, {
        class: classId,
        user: getUserDataFromLocalStorage()._id,
        price,
        traisactionId: transactionId,
        status: "approved",
      });
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({queryKey:["class", classId]});
      // refetch();
      onClose();
    },
    onError: (error) => {
      toast.error(error.response.data.message);
      onClose();
    },
 

  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('submitting form');
    
    
    await mutateAsync({classId,price});
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
            Book <span className="text-orange-600">{className}</span> Class
          </h3>
          <div className="flex flex-col gap-1 my-2 ml-1">
          <h4 className="text-gray-800"> Name: {getUserDataFromLocalStorage().displayName}</h4>
          <h4 className="text-gray-800"> Email: {getUserDataFromLocalStorage().email}</h4>
          <h4 className="text-gray-800"> Price: {price}</h4>
          </div>

          <form onSubmit={handleSubmit} className="mt-4">
            
            
           
            <label key="transactionId" className="block mt-3" htmlFor="transactionId">
              <input
                type="text"
                name="transactionId"
                id="transactionId"
                placeholder="give transaction id here"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
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
                className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              >
                Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ModalItem = ({ classId, price ,className,refetch}) => {
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
        className="px-14 py-3 rounded-md transition-all duration-200 hover:bg-sky-500 bg-sky-700"
      >
        Book Now
      </button>

      <Modal isOpen={isOpen} onClose={closeModal} className={className} classId={classId} price={price} refetch={refetch} />
    </div>
  );
};

export default ModalItem;
