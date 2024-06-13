import MasterLayout from "../layout/masterLayout/MasterLayout"
import FullscreenLoader from "../layout/fullscreenLoader/FullscreenLoader"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import useAxiosSecure from "../hooks/useAxiosHook"
import moment from "moment"
import toast from "react-hot-toast"
import { getUserDataFromLocalStorage } from "../utils"
import AppliedUserShowModal from "../components/AppliedUserShowModal"
import { Helmet } from "react-helmet"

export default function ManageSlot() {
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()
  const userData = getUserDataFromLocalStorage()._id
  // console.log('userData', userData);
  
  // get trainer data by user id
  const { data: trainerData, isLoading: isLoadingTrainerData } = useQuery({
    queryKey: ["trainerData"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/trainer/user/${userData}`)
      return response.data.data
    },
  })

  // delete a slot
  // const {mutateAsync: deleteSlot} = useMutation({
  //   mutationFn: async ({ id,scheduleTime}) => {
  //     console.log('slotId mutate', id);
  //     const response = await axiosSecure.delete(`/trainer/slot/delete/${trainerData._id}`,{
  //       slotId: id,
  //       scheduleTime: scheduleTime
  //     })
  //     return response.data
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["trainerData"])
  //     toast.success("Slot deleted successfully")
  //   },
  //   onError: () => {
  //     toast.error("Failed to delete slot")
  //   },
  // })

  if (isLoadingTrainerData) {
    return <FullscreenLoader />
  }

  // console.log('trainerData', trainerData);
  const handleDelete = async (slotId,scheduleTime) => {
    // console.log('slotId fn', slotId);
    
    try {
      await axiosSecure.delete(`/trainer/slot/delete/${trainerData._id}`,{
        data: {
          slotId: slotId,
          scheduleTime: scheduleTime
        }
      })
      queryClient.invalidateQueries(["trainerData"])
      toast.success("Slot deleted successfully")
      
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <MasterLayout>
    <Helmet>
      <title>Manage Slot</title>
    </Helmet>
    <h2 className="text-3xl font-bold text-center capitalize dark:text-white mb-4">
        Manage Slot
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
                    Slot Name
                  </th>

                  <th
                    scope="col"
                    className="px-12 py-3.5 text-sm md:text-base font-semibold   text-gray-500 dark:text-gray-400"
                  >
                    Slot Time
                  </th>
                  <th
                    scope="col"
                    className="px-12 py-3.5 text-sm md:text-base font-semibold   text-gray-500 dark:text-gray-400"
                  >
                    Applied Users
                  </th>

                  <th
                    scope="col"
                    className={`px-12 py-3.5 text-sm md:text-base font-semibold   text-gray-500 dark:text-gray-400 `}
                  >
                    Delete Slot
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
               {trainerData?.slotTime.map((slot) => (
                 <tr>
                  <td className="px-4 py-4 text-sm font-medium whitespace-nowrap  ">
                   {slot.slotName}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium whitespace-nowrap  ">
                    {slot.scheduleTime}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium whitespace-nowrap  ">
                    <AppliedUserShowModal trainer={trainerData._id} scheduleTime={slot.scheduleTime} />
                  </td>
                  <td
                    className={`px-4 py-4 flex justify-center items-center text-sm font-medium whitespace-nowrap   `}
                  >
                  <button className="px-4  py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg" onClick={()=>handleDelete(slot._id,slot.scheduleTime)}>delete</button>
                  </td>
                </tr>
               ))}
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
      </section>
    </MasterLayout>
  )
}
