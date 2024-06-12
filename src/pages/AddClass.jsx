import MasterLayout from "../layout/masterLayout/MasterLayout";
import FullscreenLoader from "../layout/fullscreenLoader/FullscreenLoader";
import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosHook";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
export default function AddClass() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    trainers: [],
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  // get all trainers
  const { data: trainers, isLoading } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/trainer");
      return data.data.trainers;
    },
  });
  // mutation for adding class
  const {mutateAsync: addClass} = useMutation({
    mutationFn: async ({formData}) => {
      
      const { data } = await axiosSecure.post("/class/add", formData);
      return data;
    },
    onError: (error) => {
      toast.error("Error adding class");
    },
    onSuccess: (data) => {
      toast.success("Class added successfully");
      queryClient.invalidateQueries("classes");
      navigate("/classes");
    },
  })
  if (isLoading) {
    return <FullscreenLoader />;
  }

  // making options for select
  let trainersOptions = trainers.map((trainer) => {
      return { value: trainer._id, label: trainer.name };
    });

    
    
  // selecting trainers and adding them to the form data
  const handleClassChange = (selectedOption) => {
    let selectedTrainers = selectedOption.map((option) => {
      return option.value;
    });
    setFormData({ ...formData, trainers: selectedTrainers });
  };
  // handle class add
  const handleAdd = async (e) => {
    e.preventDefault();
    if(formData.trainers.length === 0 || formData.name === "" || formData.description === "" || formData.image === "") {
      toast.error("Please fill all the fields");
      return;
    }
    if(formData.trainers.length > 5) {
      toast.error("You can not add more than 5 trainers");
      return;
    }
    await addClass({formData});
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <MasterLayout>
      <h2 className="text-3xl font-bold text-center capitalize dark:text-white mb-4">
        Add New Class
      </h2>
      <form onSubmit={handleAdd}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className=" dark:text-gray-200" for="name">
              Class Name
            </label>
            <input
              onChange={handleChange}
              id="name"
              name="name"
              type="text"
              className="block w-full px-4 shadow-sm py-2 mt-2 text-[#111317] bg-[#F9FAFB] border border-blue-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className=" dark:text-gray-200" for="image">
              Banner Image url
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
          <div>
            <label className=" dark:text-gray-200">
              Select Trainers
            </label>
            <Select
              className=" mt-2 shadow-sm text-[#111317] bg-[#F9FAFB] border border-blue-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              closeMenuOnSelect={false}
              components={animatedComponents}
              defaultValue={formData.trainers.map((trainer) => {
                return {
                  value: trainer._id,
                  label: trainer.name,
                };
              }
              )}
              isMulti
              options={trainersOptions}
              onChange={handleClassChange}
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
        <div className="flex justify-end mt-6">
          <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-sky-700 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-gray-600">
            Add Class
          </button>
        </div>
      </form>
    </MasterLayout>
  );
}
