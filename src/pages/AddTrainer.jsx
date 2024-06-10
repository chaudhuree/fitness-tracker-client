import Layout from "../layout/Layout";
import { useState, useEffect } from "react";
import { getUserDataFromLocalStorage } from "../utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosHook";
import { useNavigate } from "react-router-dom";
export default function AddTrainer() {
  const [trainerData, setTrainerData] = useState({});
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  return (
    <Layout>
      <section className="text-white font-poppins relative px-2 lg:px-6 py-5 lg:py-10 mx-auto ">
        <span className="bg__blur left-[60%]"></span>
        <div className=" px-6 py-10 mx-auto">
          <h1 className="text-2xl lg:text-4xl font-bold mb-2 md:mb-4 lg:mb-6 text-center">
            Be A - <span className="text-amber-500">Trainer</span>
          </h1>
        </div>
        {/*
      form starts here
    */}
        <section className="max-w-4xl p-6 mx-auto bg-[#1f2125] rounded-md shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-white capitalize dark:text-white">
            Submit Details
          </h2>

          <form>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-white dark:text-gray-200" for="name">
                  Trainer Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-white bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label
                  className="text-white dark:text-gray-200"
                  for="emailAddress"
                >
                  Email Address
                </label>
                <input
                  id="emailAddress"
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-white bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label className="text-white dark:text-gray-200" for="photo">
                  Photo URL
                </label>
                <input
                  id="photo"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-white bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label className="text-white dark:text-gray-200" for="age">
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  className="block w-full px-4 py-2 mt-2 text-white bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="text-white dark:text-gray-200" for="experience">
                  Years of Experience
                </label>
                <input
                  id="experience"
                  type="number"
                  className="block w-full px-4 py-2 mt-2 text-white bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
            </div>
            {/*
              description
            */}
            <div className="mt-6">
              <label
                className="text-white dark:text-gray-200"
                for="description"
              >
                Description
              </label>
              <textarea
                id="description"
                type="textarea"
                className="block w-full px-4 py-2 mt-2 text-[#111317] bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div className="flex justify-end mt-6">
              <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-sky-700 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-gray-600">
                Save
              </button>
            </div>
          </form>
        </section>
      </section>
    </Layout>
  );
}
