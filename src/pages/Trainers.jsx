import Layout from "../layout/Layout";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import { axiosDefault } from "../hooks/useAxiosHook";
import {
  RiFacebookCircleFill,
  RiWhatsappFill,
  RiInstagramFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";
export default function Trainers() {
  const {
    isLoading,
    isError,
    error,
    data: allTrainers,
  } = useQuery({
    queryKey: "allTrainers",
    queryFn: async () => {
      const { data } = await axiosDefault.get("/trainer");

      return data.data;
    },
  });
  console.log("allTrainers", allTrainers);

  if(isLoading) return <Spinner />
  return (
    <Layout>
      <section className="text-white font-poppins">
        <div className=" px-6 py-10 mx-auto">
          <h1 className="text-2xl lg:text-4xl font-bold mb-2 md:mb-4 lg:mb-6 text-center">
            Our <span className="text-amber-500">Dedicated Trainers</span>
          </h1>

          <p className="max-w-2xl mx-auto my-2 text-center text-white dark:text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
            incidunt ex placeat modi magni quia error alias, adipisci rem
            similique, at omnis eligendi optio eos harum.
          </p>

          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-2">
            {allTrainers?.trainers?.map((trainer) => (
              <div className="px-12 py-8 transition-colors duration-300 transform border  rounded-xl hover:border-transparent group hover:bg-[#35373b] dark:border-gray-700 dark:hover:border-transparent">
                <div className="flex flex-col sm:-mx-4 sm:flex-row">
                  <img
                    className="flex-shrink-0 object-cover w-24 h-24 rounded-full sm:mx-4 ring-4 ring-gray-300"
                    src={trainer.photo}
                    alt=""
                  />

                  <div className="mt-4 sm:mx-4 sm:mt-0">
                    <h1 className="text-xl font-semibold text-white capitalize md:text-2xl dark:text-white group-hover:text-orange-500">
                      {trainer.name}
                    </h1>

                    <p className="mt-2 text-white capitalize dark:text-gray-300 group-hover:text-gray-300 max-md:text-sm">
                      {trainer.yearsOfexperience} years of experience
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-white capitalize dark:text-gray-300 group-hover:text-gray-300 max-md:text-sm">
                  {trainer.description}
                </p>

                <div className="flex mt-4 -mx-2">
                  <Link
                    to={trainer.social.facebook}
                    className="mx-2  dark:text-gray-300 text-white dark:hover:text-gray-300  group-hover:text-blue-600"
                    aria-label="Facebook"
                  >
                    <RiFacebookCircleFill className="text-2xl" />
                  </Link>
                  <Link
                    to={trainer.social.instagram}
                    className="mx-2  dark:text-gray-300 text-white dark:hover:text-gray-300 group-hover:text-[#F70F43]"
                    aria-label="Instagram"
                  >
                    <RiInstagramFill className="text-2xl" />
                  </Link>
                  <Link
                    to={trainer.social.whatsapp}
                    className="mx-2  dark:text-gray-300 text-white dark:hover:text-gray-300 group-hover:text-green-600"
                    aria-label="Whatsapp"
                  >
                    <RiWhatsappFill className="text-2xl" />
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2 justify-between mt-4 max-md:text-sm">
                  <p className="group-hover:text-gray-300  "><span className="underline mr-2">Available Slot:</span> <span className="text-orange-200 font-medium ">{trainer.availableTimeSlot}</span></p>
                  <Link className="relative navlink hover:text-blue-400">See More</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
