import Layout from "../layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { axiosDefault } from "../hooks/useAxiosHook";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useTrainerBooking } from "../context/TrainerBookingContext";
import toast from "react-hot-toast";
export default function TrainerBooking() {
  const { checkingStatus } = useAuthStatus();
  const { bookingData, setBookingData } = useTrainerBooking();
  const { trainer: id, slot } = useParams();
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    error,
    data: trainerData,
  } = useQuery({
    queryKey: ["trainer", id],
    queryFn: async () => {
      const { data } = await axiosDefault.get(`/trainer/${id}`);
      return data.data;
    },
  });
  const selectedSlot = trainerData?.slotTime.find((s) => s._id === slot);
  const hadlePackageSelection = (packageName, packagePrice) => {
    setBookingData({
      trainer: trainerData._id,
      trainerName: trainerData.name,
      slot: selectedSlot,
      packageName: packageName,
      price: packagePrice,
    });
  };
  const handleJoin = () => {
    if(!bookingData.packageName) return toast.error("Please select a package");
    navigate('/trainercheckout')
  };
  if (checkingStatus || isLoading) return <Spinner />;
  return (
    <Layout>
      <div className="font-poppins text-white relative px-2 lg:px-6 py-5 lg:py-10 mx-auto">
        <span className="bg__blur__bottom"></span>
        <span className="bg__blur"></span>
        <section>
          <div className=" px-6 py-10 mx-auto">
            <h1 className="text-2xl lg:text-4xl font-bold mb-2 md:mb-4 lg:mb-6 text-center">
              Book - <span className="text-amber-500">{trainerData.name}</span>
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-5 flex-wrap mb-4">
            <p className="space-x-2">
              <span className="md:text-xl text-lg capitalize">selected slot:</span>
              <span className="md:text-xl text-lg text-orange-400 capitalize">
                {selectedSlot.slotName} - {selectedSlot.scheduleTime}
              </span>
            </p>
            <p className="space-x-2">
              <span className="md:text-xl text-lg capitalize">available classes:</span>
              <span className="md:text-xl text-lg text-orange-400">
                {trainerData.classes.map((cls, index) => (
                  <span key={index} className="mr-2">
                    {cls.name}
                    {index < trainerData.classes.length - 1 ? "," : ""}
                  </span>
                ))}
              </span>
            </p>
          </div>

          {/*
            pricing information
          */}
          <div className="">
            <div className="container px-6 py-8 mx-auto">
              <div className="flex flex-col items-center justify-center space-y-8 lg:-mx-4 lg:flex-row lg:items-stretch lg:space-y-0">
                {trainerData.packages.map((pkg, index) => (
                  <div className={`flex flex-col w-full max-w-sm p-8 space-y-8 text-center  rounded-lg lg:mx-4 border-[2px]  bg-[#1f2125] hover:bg-[#35373b] hover:border-ornage transition-item ${bookingData.packageName===pkg.name ? "bg-[#35373b] border-ornage ":"border-transparent"}`}>
                    <div className="flex-shrink-0">
                      <h2 className="inline-flex items-center justify-center px-2 font-semibold tracking-tight text-white uppercase rounded-lg text-lg ">
                        {pkg.name}
                      </h2>
                    </div>

                    <div className="flex-shrink-0">
                      <span className="pt-2 text-3xl font-bold text-gray-300">
                        {pkg.price}$
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        /month
                      </span>
                    </div>

                    <ul className="flex-1 space-y-4 text-left">
                      <li
                        className={` text-white dark:text-gray-400 ${
                          pkg.name === "basic" ? "" : "hidden"
                        }`}
                      >
                        Access to gym facilities during regular operating hours.
                      </li>

                      <li
                        className={` text-white dark:text-gray-400 ${
                          pkg.name === "basic" ? "" : "hidden"
                        }`}
                      >
                        Use of cardio and strength training equipment.
                      </li>

                      <li
                        className={` text-white dark:text-gray-400 ${
                          pkg.name === "basic" ? "" : "hidden"
                        }`}
                      >
                        Access to locker rooms and showers.
                      </li>
                      <li
                        className={` text-white dark:text-gray-400 ${
                          pkg.name === "standard" ? "" : "hidden"
                        }`}
                      >
                        All benefits of the basic membership.
                      </li>
                      <li
                        className={` text-white dark:text-gray-400 ${
                          pkg.name === "standard" ? "" : "hidden"
                        }`}
                      >
                        Access to group fitness classes such as yoga, spinning,
                        and Zumba.
                      </li>
                      <li
                        className={` text-white dark:text-gray-400 ${
                          pkg.name === "standard" ? "" : "hidden"
                        }`}
                      >
                        Use of additional amenities like a sauna or steam room.
                      </li>
                      <li
                        className={` text-white dark:text-gray-400 ${
                          pkg.name === "premium" ? "" : "hidden"
                        }`}
                      >
                        All benefits of the standard membership.
                      </li>
                      <li
                        className={` text-white dark:text-gray-400 ${
                          pkg.name === "premium" ? "" : "hidden"
                        }`}
                      >
                        Access to personal training sessions with certified
                        trainers.
                      </li>
                      <li
                        className={` text-white dark:text-gray-400 ${
                          pkg.name === "premium" ? "" : "hidden"
                        }`}
                      >
                        Discounts on additional services such as massage therapy
                        or nutrition counseling.
                      </li>
                    </ul>

                    <button
                      className="inline-flex items-center justify-center px-4 py-2 font-medium text-white uppercase transition-colors bg-orange-500 rounded-lg hover:bg-orange-700 focus:outline-none"
                      onClick={() => hadlePackageSelection(pkg.name, pkg.price)}
                    >
                      Select Plan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-5">
                <button onClick={handleJoin} className="inline-flex items-center justify-center md:px-20 px-10 py-4  font-extrabold text-white uppercase transition-colors bg-sky-700 rounded-lg hover:bg-sky-800 focus:outline-none">Join Now</button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
