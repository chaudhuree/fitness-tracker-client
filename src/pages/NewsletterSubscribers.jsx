import React, { useState } from "react";
import MasterLayout from "../layout/masterLayout/MasterLayout";
import FullscreenLoader from "../layout/fullscreenLoader/FullscreenLoader";
import { useQuery } from "@tanstack/react-query";
import { axiosDefault } from "../hooks/useAxiosHook";
export default function NewsletterSubscribers() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data: subscribersData, isLoading } = useQuery({
    queryKey: ["newsletterSubscribers", page, limit],
    queryFn: async () => {
      const response = await axiosDefault.get(
        `/newsletter/subscribers?page=${page}&limit=${limit}&search=`
      );
      return response.data;
    },
  });
  console.log("data", subscribersData);
  if (isLoading) {
    return <FullscreenLoader />;
  }
  // calculate page number
  const numberOfPages = Math.ceil(subscribersData.total / limit);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  //  handle pagination button
  const handlePaginationButton = (value) => {
    setPage(value);
  };

  return (
    <MasterLayout>
      <section className="mx-auto">
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="text-center min-w-full divide-y  divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800 text-center ">
                    <tr>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm md:text-base font-semibold   text-gray-500 dark:text-gray-400"
                      >
                        Email
                      </th>

                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm md:text-base font-semibold   text-gray-500 dark:text-gray-400"
                      >
                        Name
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {subscribersData?.subscribers.map((subscriber, index) => (
                      <tr key={subscriber?._id}>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap border-r">
                          <div>
                            <h2 className="font-medium text-gray-800 dark:text-white ">
                              {subscriber?.email}
                            </h2>
                          </div>
                        </td>
                        <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                          <div className="font-medium text-gray-800 dark:text-white">
                            {subscriber?.name}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/*
          pagination
        */}
        {
           subscribersData.total > subscribersData?.subscribers.length  && (
            <div className="flex justify-center mt-12">
          {/* Previous Button */}
          <button
            disabled={page === 1}
            onClick={() => handlePaginationButton(page - 1)}
            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <div className="flex items-center -mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>

              <span className="mx-1">previous</span>
            </div>
          </button>
          {/* Numbers */}
          {pages.map((btnNum) => (
            <button
              onClick={() => handlePaginationButton(btnNum)}
              key={btnNum}
              className={`hidden ${
                page === btnNum ? "bg-orange-500 text-white" : ""
              } px-4 py-2 text-sm mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-orange-500  hover:text-white`}
            >
              {btnNum}
            </button>
          ))}

          {/* Next Button */}
          <button
            disabled={page === numberOfPages}
            onClick={() => handlePaginationButton(page + 1)}
            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <div className="flex items-center -mx-1">
              <span className="mx-1">Next</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </button>
        </div>
          )
        }
        {/*
          pagination end
        */}
      </section>
    </MasterLayout>
  );
}
