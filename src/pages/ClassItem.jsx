import Layout from "../layout/Layout";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import useAxiosSecure from "../hooks/useAxiosHook";
import { useParams } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import TrainersAvatar from "../components/TrainersAvatar";
import ModalItem from "../components/Modal";
import moment from "moment/moment";

export default function ClassItem() {
  const { id } = useParams();
  const { checkingStatus } = useAuthStatus();
  const axiosSecure = useAxiosSecure();
  const { data: classData, isLoading,refetch } = useQuery({
    queryKey: ["class", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/class/${id}`);
      return data.data;
    },
  });

  if (isLoading || checkingStatus) {
    return <Spinner />;
  }
  return (
    <Layout>
      <section className="text-white font-poppins py-5 lg:py-10 mx-auto relative">
        <span className="bg__blur"></span>
        <span className="bg__blur bottom__blur__two"></span>
        <div className=" px-2 lg:px-6 py-5 ">
          <h1 className="text-2xl lg:text-4xl font-bold mb-2 md:mb-4 lg:mb-6 text-center">
            Class - <span className="text-amber-500">{classData.name}</span>
          </h1>
        </div>
        {/*
          class data starts here
        */}
        <div className="bg-[#111317] text-white">
          <div className="container flex gap-10 flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
            <div className="w-full lg:w-1/2  ">
              <div className="flex items-center gap-x-2 mb-4">
                <img
                  className="object-cover w-full rounded-lg"
                  src={classData.image}
                  alt="class photo"
                />
              </div>
              
            </div>

            <div className="flex flex-col  w-full lg:w-1/2 h-full">
              <div className="lg:max-w-lg">
                <h1 className="text-lg whitespace-pre-wrap font-semibold tracking-wide text-sky-100 dark:text-white lg:text-xl mb-10">
                  {classData.description}
                </h1>
                {/*
                 <p className="my-4 text-white dark:text-gray-300">
                   <span className="text-ornage mr-2">Class Booking Price :</span>
                   {classData.price}$
                 </p> 
                */}
                <p className="my-4 text-white dark:text-gray-300">
                  <span className="text-ornage mr-2">Total Booked By :</span>
                  {classData.bookingCount}
                </p>
                
                <p className="mt-4 flex gap-4 items-center text-white dark:text-gray-300">
                  <span className="text-ornage mr-2">Trainers List :</span>
                  <TrainersAvatar
                    class={"true"}
                    trainers={classData.trainers}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
       
      </section>
    </Layout>
  );
}
