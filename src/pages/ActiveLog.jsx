import MasterLayout from "../layout/masterLayout/MasterLayout";
import FullscreenLoader from "../layout/fullscreenLoader/FullscreenLoader";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosHook";
import { useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import toast from "react-hot-toast";
import moment from "moment";
import { getUserDataFromLocalStorage } from "../utils";
import { AiOutlineEye } from "react-icons/ai";
import RejectedDataViewModal from "../components/RejectedDataViewModal";
import { Helmet } from "react-helmet";

export default function ActiveLog() {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const userId = getUserDataFromLocalStorage()._id;
  const { data: activeLog, isLoading } = useQuery({
    queryKey: ["activeLog"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/trainer/user/${userId}`);
      return data.data;
    },
  });

  if (isLoading) {
    return <FullscreenLoader />;
  }
  // console.log("activeLog", activeLog);

  return (
    <MasterLayout>
      <Helmet>
        <title>Active Log</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center capitalize dark:text-white mb-4">
        Active Log
      </h2>

      <section className="mx-auto">
        {activeLog?.length > 0 ? (<div className="flex flex-col mt-6">
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
                        Applied Date
                      </th>

                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm md:text-base font-semibold   text-gray-500 dark:text-gray-400"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm md:text-base font-semibold   text-gray-500 dark:text-gray-400"
                      >
                        Status Update Date
                      </th>

                      <th
                        scope="col"
                        className={`px-12 py-3.5 text-sm md:text-base font-semibold   text-gray-500 dark:text-gray-400 ${activeLog?.status === "rejected" ? "" : "hidden"}`}
                      >
                        Rejected Reason
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap  ">
                        {moment(activeLog?.appliedDate).format("DD/MM/YYYY")}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap  ">
                        <p
                          className={`px-3 py-2 text-sm rounded-full ${
                            activeLog?.status === "pending"
                              ? "text-indigo-500   bg-indigo-100/60"
                              : "text-red-500 bg-red-100/60"
                          }`}
                        >
                          {activeLog?.status}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap  ">
                        {moment(activeLog?.updatedAt).format("DD/MM/YYYY")}
                      </td>
                      <td
                        className={`px-4 py-4 flex justify-center items-center text-sm font-medium whitespace-nowrap   ${activeLog?.status === "rejected" ? "" : "hidden"}`}
                      >
                      <RejectedDataViewModal message={activeLog?.rejectedReason} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>) : (
          <p className="text-center text-xl dark:text-white">
            No active log found
          </p>
        )}
      </section>
    </MasterLayout>
  );
}
