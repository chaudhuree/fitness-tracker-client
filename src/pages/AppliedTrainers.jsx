import MasterLayout from "../layout/masterLayout/MasterLayout";
import FullscreenLoader from "../layout/fullscreenLoader/FullscreenLoader";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosHook";
import { useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
export default function AppliedTrainers() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { data: trainersData, isLoading } = useQuery({
    queryKey: ["trainers", page, limit],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/trainer/pending?page=${page}&limit=${limit}`
      );
      return response.data.data;
    },
  });

  const { mutateAsync: deleteTrainer } = useMutation({
    mutationFn: async ({ id }) => {
      const response = await axiosSecure.delete(`/trainer/delete/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allTrainers", "trainers"]);
      toast.success("Trainer deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete trainer");
    },
  });
  if (isLoading) {
    return <FullscreenLoader />;
  }
  const handleDelete = async (id) => {
    try {
      await deleteTrainer({ id });
    } catch (error) {
      console.log(error);
    }
  };
  // calculate page number
  const numberOfPages = Math.ceil(trainersData.count / limit);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  //  handle pagination button
  const handlePaginationButton = (value) => {
    setPage(value);
  };
  return (
    <MasterLayout>
    <h2 className="text-3xl font-bold text-center capitalize dark:text-white mb-4">
        Applied Trainers
      </h2>
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
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm md:text-base font-semibold   text-gray-500 dark:text-gray-400"
                      >
                        Classes
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm md:text-base font-semibold   text-gray-500 dark:text-gray-400"
                      >
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {trainersData?.trainers.map((trainer, index) => (
                      <tr key={trainer?._id}>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap border-r">
                          <div>
                            <h2 className="font-medium text-gray-800 dark:text-white ">
                              {trainer?.email}
                            </h2>
                          </div>
                        </td>
                        <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                          <div className="font-medium text-gray-800 dark:text-white">
                            {trainer?.name}
                          </div>
                        </td>
                        <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                          <div className="font-medium text-gray-800 dark:text-white">
                            <div className="flex items-center justify-center gap-x-2">
                              {trainer?.classes?.map((cls, index) => (
                                <p
                                  className={`px-3 py-1 text-xs ${
                                    index === 0
                                      ? "text-indigo-500 bg-indigo-100/60"
                                      : index === 1
                                      ? "text-blue-500 bg-blue-100/60"
                                      : "text-pink-500 bg-pink-100/60"
                                  } rounded-full dark:bg-gray-800 `}
                                >
                                  {cls?.name}
                                </p>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                          <div className="font-medium text-gray-800 dark:text-white">
                            <Link
                              to={`/appliedtrainer/${trainer?._id}`}
                              className="text-sky-800/70"
                            >
                              view details
                            </Link>
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
        {trainersData.count > trainersData?.trainers?.length && (
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
        )}
        {/*
         pagination end
       */}
      </section>
    </MasterLayout>
  );
}
