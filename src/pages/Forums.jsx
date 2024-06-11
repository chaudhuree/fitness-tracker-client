import Layout from "../layout/Layout";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosDefault } from "../hooks/useAxiosHook";
import Spinner from "../components/Spinner";
import ForumCard from "../components/ForumCard";
export default function Forums() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const{
    isLoading,
    data: forums,
  } = useQuery({
    queryKey: ["forums", page, limit],
    queryFn: async () => {
      const { data } = await axiosDefault.get(`/forums?page=${page}&limit=${limit}`);
      return data.data;
    },
  });
  
  if (isLoading) {
    return <Spinner />;
  }
  // pagination function
  const numberOfPages = Math.ceil(forums?.total / limit);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  const handlePaginationButton = (value) => {
    setPage(value);
  };
  return (
    <Layout>
      <section className="text-white font-poppins relative px-2 lg:px-6 py-5 lg:py-10 mx-auto ">
        <span className="bg__blur right-0"></span>
        <div className=" px-6 py-5 pb-10 mx-auto">
          <h1 className="text-2xl lg:text-4xl font-bold mb-2 md:mb-4 lg:mb-6 text-center">
            Forum <span className="text-amber-500">Posts</span>
          </h1>
        </div>
        <div className="grid gap-8 lg:grid-cols-1">
          {forums?.forums.map((forum) => (
            <ForumCard key={forum._id} forum={forum} />
          ))}
        </div>
        {/*
          pagination
        */}
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
        {/*
          pagination end
        */}
      </section>
    </Layout>
  );
}
