import { useQuery } from "@tanstack/react-query";
import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiWhatsappFill,
} from "react-icons/ri";
import { Link, useParams,useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { axiosDefault } from "../hooks/useAxiosHook";
import Layout from "../layout/Layout";
import { Helmet } from "react-helmet";

export default function Trainer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    error,
    data: trainer,
  } = useQuery({
    queryKey: ["trainer", id],
    queryFn: async () => {
      const { data } = await axiosDefault.get(`/trainer/${id}`);
      return data.data;
    },
  });

  if (isLoading) return <Spinner />;
  return (
    <Layout>
      <Helmet>
        <title>{trainer.name}</title>
      </Helmet>
      <section className="text-white font-poppins relative px-2 lg:px-6 py-5 lg:py-10 mx-auto ">
        <span className="bg__blur bottom__blur"></span>
        <div className=" px-6 py-10 mx-auto">
          <h1 className="text-2xl lg:text-4xl font-bold mb-2 md:mb-4 lg:mb-6 text-center">
            Trainer - <span className="text-amber-500">{trainer.name}</span>
          </h1>
        </div>
        {/*
          template starts here
        */}
        <div className="bg-[#111317] text-white">
          <div className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
            <div className="w-full lg:w-1/2  ">
              <div className="flex items-center gap-x-2 mb-4">
                <img
                  className="object-cover w-16 h-16 rounded-lg"
                  src={trainer.photo}
                  alt="trainer photo"
                />

                <div>
                  <h1 className="text-xl font-semibold text-white capitalize dark:text-white">
                    {trainer.name}
                  </h1>

                  <p className="text-base text-white dark:text-gray-400">
                    {trainer.yearsOfexperience} years of experience
                  </p>
                </div>
              </div>
              <div className="lg:max-w-lg">
                <h1 className="text-xl font-semibold tracking-wide text-white dark:text-white lg:text-xl">
                  {trainer.description}
                </h1>
                <p className="mt-4 text-white dark:text-gray-300">
                  <span className="text-ornage mr-2">Area of expertise :</span>{" "}
                  {trainer.areaOfExpertise.map((area, index) => (
                    <span key={index} className="mr-2">
                      {" "}
                      {area}
                      {index < trainer.areaOfExpertise.length - 1
                        ? ","
                        : ""}{" "}
                    </span>
                  ))}
                </p>
                <p className="mt-4 text-white dark:text-gray-300">
                  <span className="text-ornage mr-2">Available Days :</span>{" "}
                  {trainer.availableDays.map((day, index) => (
                    <span key={index} className="mr-2">
                      {day}

                      {index < trainer.availableDays.length - 1 ? "," : ""}
                    </span>
                  ))}
                </p>
                <p className="mt-4 text-white dark:text-gray-300">
                  <span className="text-ornage mr-2">Classess :</span>{" "}
                  {trainer.classes.map((cls, index) => (
                    <span key={index} className="mr-2">
                      {cls.name}
                      {index < trainer.classes.length - 1 ? "," : ""}
                    </span>
                  ))}
                </p>

                <div className="grid gap-6 mt-8 sm:grid-cols-2">
                  {trainer.packages.map((pack, index) => (
                    <div className="flex items-center text-white -px-3 dark:text-gray-200">
                      <svg
                        className="w-5 h-5 mx-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>

                      <span className="mx-3 uppercase">
                        {pack.name} - {pack.price}$
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex mt-4 -mx-2">
                  <Link
                    to={trainer.social.facebook}
                    className="mx-2   text-white dark:hover:text-gray-300 hover:text-blue-600"
                    aria-label="Facebook"
                  >
                    <RiFacebookCircleFill className="text-2xl" />
                  </Link>
                  <Link
                    to={trainer.social.instagram}
                    className="mx-2  dark:text-gray-300 text-white dark:hover:text-gray-300 hover:text-[#F70F43]"
                    aria-label="Instagram"
                  >
                    <RiInstagramFill className="text-2xl" />
                  </Link>
                  <Link
                    to={trainer.social.whatsapp}
                    className="mx-2  dark:text-gray-300 text-white dark:hover:text-gray-300 hover:text-green-600"
                    aria-label="Whatsapp"
                  >
                    <RiWhatsappFill className="text-2xl" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col  w-full lg:w-1/2 h-full">
              <h1 className="text-xl text-center lg:text-2xl font-bold mb-6 mg:mb-8 lg:mb-10 text-sky-400">
                AVAILABLE SLOTS
              </h1>
              <div className="flex flex-wrap justify-around gap-8">
                {trainer.slotTime.map((slot) => (
                  <button
                  onClick={()=>navigate(`/trainerbooking/${id}/${slot._id}`)}
                    className="transition-item px-4 py-2 md:py-2 md:px-6 delay-100 text-sm md:text-base font-medium  bg-amber-600  md:bg-amber-600 hover:font-medium   hover:bg-orange-600 text-primary rounded-[5px] "
                    key={slot._id}
                  >
                    {slot.scheduleTime}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/*
          cta
        */}
        <section className="bg-[#1f2125]">
          <div className="container px-4 py-16 mx-auto lg:flex lg:items-center lg:justify-between">
            <h2 className="text-2xl font-semibold tracking-tight text-white xl:text-3xl dark:text-white text-center mx-auto w-1/2">
              Become A Trainer
            </h2>

            <div className="mt-8 lg:mt-0 w-1/2 mx-auto">
              <div className="flex justify-center items-center text-center">
                <button onClick={()=>navigate('/addtrainer')} className="md:px-10 px-7 py-4 md:py-6 font-medium max-md:text-sm md:font-bold text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-sky-600 rounded-lg focus:ring focus:ring-blue-300 focus:ring-opacity-80 fo sm:mx-2 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                  Apply Now
                </button>
              </div>

             
            </div>
          </div>
        </section>
      </section>
    </Layout>
  );
}
