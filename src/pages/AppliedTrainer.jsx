import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MasterLayout from "../layout/masterLayout/MasterLayout";
import FullscreenLoader from "../layout/fullscreenLoader/FullscreenLoader";
import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiWhatsappFill,
} from "react-icons/ri";
import { Link, useParams, useNavigate } from "react-router-dom";
import { axiosDefault } from "../hooks/useAxiosHook";
import toast from "react-hot-toast";
import ValidateTrainerModal from "../components/ValidateTrainerModal";
export default function AppliedTrainer() {
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

  const queryClient = useQueryClient();
  const { mutateAsync: validateTrainer,isLoading:validateTrainerLoading } = useMutation({
    mutationFn: async ({ status }) => {
      const response = await axiosDefault.put(`/trainer/validate/${id}`, {
        status: status,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Trainer validated successfully");
      queryClient.invalidateQueries(["trainer", id, "trainers"]);
      navigate("/appliedtrainers");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to validate trainer");
    },
  });

  const handleValidate = async (status) => {
    try {
      await validateTrainer({ status });
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading || validateTrainerLoading) return <FullscreenLoader />;
  return (
    <MasterLayout>
    <h2 className="text-3xl font-bold text-center capitalize dark:text-white mb-4">
        Applied Trainer
      </h2>
      <section className="text-[#111317] font-poppins mx-auto ">
        {/*
          template starts here
        */}
        <div className="bg-[#F9FAFB] text-[#111317]">
          <div className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
            <div className="w-full lg:w-1/2  ">
              <div className="flex items-center gap-x-2 mb-4">
                <img
                  className="object-cover w-16 h-16 rounded-lg"
                  src={trainer.photo}
                  alt="trainer photo"
                />

                <div>
                  <h1 className="text-xl font-semibold text-[#111317] capitalize dark:text-[#111317]">
                    {trainer.name}
                  </h1>

                  <p className="text-base text-[#111317] dark:text-gray-400">
                    {trainer.yearsOfexperience} years of experience
                  </p>
                </div>
              </div>
              <div className="lg:max-w-lg">
                <h1 className="text-xl font-semibold tracking-wide text-[#111317] dark:text-[#111317] lg:text-xl">
                  {trainer.description}
                </h1>
                <p className="mt-4 text-[#111317] dark:text-gray-300">
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
                <p className="mt-4 text-[#111317] dark:text-gray-300">
                  <span className="text-ornage mr-2">Available Days :</span>{" "}
                  {trainer.availableDays.map((day, index) => (
                    <span key={index} className="mr-2">
                      {day}

                      {index < trainer.availableDays.length - 1 ? "," : ""}
                    </span>
                  ))}
                </p>
                <p className="mt-4 text-[#111317] dark:text-gray-300">
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
                    <div className="flex items-center text-[#111317] -px-3 dark:text-gray-200">
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
                  <span
                    className="mx-2   text-[#111317] dark:hover:text-gray-300 hover:text-blue-600"
                    aria-label="Facebook"
                  >
                    <RiFacebookCircleFill className="text-2xl" />
                  </span>
                  <span
                    className="mx-2  dark:text-gray-300 text-[#111317] dark:hover:text-gray-300 hover:text-[#F70F43]"
                    aria-label="Instagram"
                  >
                    <RiInstagramFill className="text-2xl" />
                  </span>
                  <span
                    className="mx-2  dark:text-gray-300 text-[#111317] dark:hover:text-gray-300 hover:text-green-600"
                    aria-label="Whatsapp"
                  >
                    <RiWhatsappFill className="text-2xl" />
                  </span>
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
                    className="transition-item px-4 py-2 md:py-2 md:px-6 delay-100 text-sm md:text-base font-medium  bg-amber-600  md:bg-amber-600 hover:font-medium   hover:bg-orange-600 text-primary rounded-[5px] "
                    key={slot._id}
                  >
                    {slot.scheduleTime}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <section className="mx-auto lg:-mt-10  bg-[#F9FAFB] py-4 max-w-full md:max-w-[60%] flex flex-wrap gap-6 justify-center items-center">
            <button
              className="lg:px-10 px-6 lg:py-2 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-700 rounded-lg"
              onClick={() => handleValidate("active")}
            >
              Accept
            </button>
            <ValidateTrainerModal trainerData={trainer}/>
          </section>
        </div>
      </section>
    </MasterLayout>
  );
}
