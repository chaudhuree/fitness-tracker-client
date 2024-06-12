import MasterLayout from "../layout/masterLayout/MasterLayout";
import FullscreenLoader from "../layout/fullscreenLoader/FullscreenLoader";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosHook";
import moment from "moment";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";

export default function Dashboard() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  // total income for dashboard
  const { data: totalPrice, isLoading } = useQuery({
    queryKey: ["totalPrice"],
    queryFn: async () => {
      const response = await axiosSecure.get("/trainerbooking/totalprice");
      return response.data.data[0].totalPrice;
    },
  });
  // all bookings for table
  const { data: allBookings, isLoading: isLoadingAllBookings } = useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        "/trainerbooking/all?page=1&limit=6"
      );
      return response.data.data.trainerBookings;
    },
  });

  const { data: paidMemberCount, isLoading: isLoadingPaidMemberCount } =
    useQuery({
      queryKey: ["paidMemberCount"],
      queryFn: async () => {
        const response = await axiosSecure.get(
          "/trainerbooking/uniquepaidmembers"
        );
        return response.data.data;
      },
    });
  // total subscriberCount for
  const { data: subscriberCount, isLoading: isLoadingSubscriberCount } =
    useQuery({
      queryKey: ["subscriberCount"],
      queryFn: async () => {
        const response = await axiosSecure.get("/newsletter/total");
        return response.data;
      },
    });

  if (isLoading || isLoadingSubscriberCount) {
    return <FullscreenLoader />;
  }
  let chartData = [];
  if (subscriberCount && paidMemberCount) {
    chartData = [
      {
        name: "subscriber",
        value: subscriberCount.total,
      },
      {
        name: "paid member",
        value: paidMemberCount.length,
      },
    ];
  }
  const COLORS = ['#8884d8', '#82ca9d'];
  return (
    <MasterLayout>
      <h2 className="text-3xl font-bold text-center capitalize dark:text-white mb-4">
        Dashboard
      </h2>
      <section className="mx-auto">
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 ">
          <div className="stats shadow">
            <div className="stat place-items-center">
              <div className="stat-title text-4xl font-bold text-ornage">Total Income</div>
              <div className="stat-value">{totalPrice}$</div>
            </div>
          </div>
          {/*
            chart goes here
          */}
          <div className="flex flex-col justify-center items-center">
          <div className="stats shadow">
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={chartData}
                cx={200}
                cy={200}
                outerRadius={80}
                fill="#8884d8"
                label
              >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              </Pie>

              <Tooltip />
            </PieChart>
            </div>
          </div>
        </div>
        <div className="my-4">
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
                          Trainer Name
                        </th>

                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm md:text-base font-semibold   text-gray-500 dark:text-gray-400"
                        >
                          User Name
                        </th>
                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm md:text-base font-semibold   text-gray-500 dark:text-gray-400"
                        >
                          Price
                        </th>

                        <th
                          scope="col"
                          className={`px-12 py-3.5 text-sm md:text-base font-semibold   text-gray-500 dark:text-gray-400 `}
                        >
                          Booking Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {allBookings?.map((booking) => (
                        <tr key={booking._id}>
                          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap  ">
                            {booking.trainer.name}
                          </td>
                          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap  ">
                            {booking.user.displayName}
                          </td>
                          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap  ">
                            {booking.price}$
                          </td>
                          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap  ">
                            {moment(booking.createdAt).format("DD/MM/YYYY")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MasterLayout>
  );
}
