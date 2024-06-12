import MasterLayout from "../layout/masterLayout/MasterLayout";
import FullscreenLoader from "../layout/fullscreenLoader/FullscreenLoader";
import toast from "react-hot-toast";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosHook";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { getUserDataFromLocalStorage } from "../utils";

export default function AddForum() {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    author: getUserDataFromLocalStorage()._id,
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  // mutation for adding forum
  const { mutateAsync: addClass, isLoading } = useMutation({
    mutationFn: async ({ formData }) => {
      const { data } = await axiosSecure.post("/forum/add", formData);
      return data;
    },
    onError: (error) => {
      toast.error("Error adding class");
    },
    onSuccess: (data) => {
      toast.success("Forum added successfully");
      queryClient.invalidateQueries("forums");
      navigate("/allforums");
    },
  });

  // handle class add
  const handleAdd = async () => {
    if (
      formData.title === "" ||
      formData.subtitle === "" ||
      formData.description === "" ||
      formData.image === ""
    ) {
      return toast.error("Please fill all the fields");
    }
    await addClass({ formData });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      {isLoading && <FullscreenLoader />}
      <MasterLayout>
        <h2 className="text-3xl font-bold text-center capitalize dark:text-white mb-4">
          Add New Forum
        </h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className=" dark:text-gray-200" for="title">
                Title
              </label>
              <input
                onChange={handleChange}
                id="title"
                name="title"
                type="text"
                className="block w-full px-4 shadow-sm py-2 mt-2 text-[#111317] bg-[#F9FAFB] border border-blue-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className=" dark:text-gray-200" for="subtitle">
                Subtitle
              </label>
              <input
                onChange={handleChange}
                id="subtitle"
                name="subtitle"
                type="text"
                className="block w-full shadow-sm bg-[#F9FAFB] px-4 py-2 mt-2 text-[#111317]  border border-blue-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="mt-6">
            <div>
              <label className=" dark:text-gray-200" for="image">
                Image Url
              </label>
              <input
                onChange={handleChange}
                id="image"
                name="image"
                type="text"
                className="block w-full shadow-sm bg-[#F9FAFB] px-4 py-2 mt-2 text-[#111317]  border border-blue-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="mt-6">
            <label className=" dark:text-gray-200" for="description">
              Description
            </label>
            <textarea
              id="description"
              type="textarea"
              name="description"
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 shadow-sm text-[#111317] bg-[#F9FAFB] border border-blue-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
          </div>
        </form>
        <div className="flex justify-end mt-6">
          <button
            onClick={handleAdd}
            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-sky-700 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-gray-600"
          >
            Add Forum
          </button>
        </div>
      </MasterLayout>
    </>
  );
}
