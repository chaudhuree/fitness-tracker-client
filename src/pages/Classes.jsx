import Layout from "../layout/Layout";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useQuery } from "@tanstack/react-query";
import { axiosDefault } from "../hooks/useAxiosHook";
import ClassCard from "../components/ClassCard";
export default function Classes() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [search, setSearch] = useState("");
  const { checkingStatus } = useAuthStatus();
  const {
    isLoading,
    isError,
    error,
    data: classes,
  } = useQuery({
    queryKey: ["classes", page, limit, search],
    queryFn: async () => {
      const { data } = await axiosDefault.get(
        `/class?page=${page}&limit=${limit}&search=${search}`
      );
      return data.data;
    },
  });
  // console.log("classes", classes);

  //  search function
  const handleSearch = (e) => {
    e.preventDefault();

    setSearch(e.target.search.value);
    setPage(1);
  };

  if (checkingStatus || isLoading) {
    return <Spinner />;
  }
  // pagination function
  const numberOfPages = Math.ceil(classes?.total / limit);
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
            Our <span className="text-amber-500">Exclusive Classes</span>
          </h1>
        </div>
        {/*
          classes
        */}
        <div className="flex justify-center flex-col items-center mb-20">
          <h2 className="font-bold text-lg mb-4">Search Classe</h2>
          <form className="w-full flex justify-center items-center" onSubmit={handleSearch}>
          <input placeholder="search class" type="text" name="search" className="px-4 text-black w-full lg:w-1/4 py-2 border rounded-md" />
          </form>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-6">
          {classes?.classes?.map((classItem) => (
            <ClassCard key={classItem._id} classItem={classItem} />
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
