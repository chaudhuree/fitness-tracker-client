import { useQuery } from "@tanstack/react-query";
import { axiosDefault } from "../hooks/useAxiosHook";
import { shuffleArray } from "../utils";
import { RiFacebookBoxFill,RiFacebookCircleFill,RiInstagramFill,RiWhatsappFill } from "react-icons/ri";
import { Link } from "react-router-dom";
export default function Teams() {
  const {
    isLoading,
    isError,
    data: trainers,
  } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const { data } = await axiosDefault.get(`/trainer?page=1&limit=10`);
      return data.data.trainers;
    },
  });
  // if(!isLoading){console.log('instructors', shuffleArray([...trainers]).slice(0,3));}
  const shuffledTrainers = trainers
    ? shuffleArray([...trainers]).slice(0, 3)
    : [];
  return (
    <div className="font-poppins my-10 relative">
      <span className="bg__blur--two right-[40%] top-[30%]"></span>
      <h1 className="text-2xl lg:text-4xl font-bold mb-10 mb:mb-16 lg:mb-24">
        Meet Out Instructors
      </h1>
      <section>
        <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {shuffledTrainers.map((trainer) => (
            <div className="text-center text-gray-500 dark:text-gray-400">
              <img
                className="mx-auto mb-4 w-36 h-36 rounded-full"
                src={trainer.photo}
                alt={trainer.name}
              />
              <h3 className="mb-1 text-2xl font-bold tracking-tight text-white hover:text-sky-200">
                <Link to={`/trainer/${trainer._id}`}>{trainer.name} </Link>
              </h3>
              <p className="text-orange-200 text-sm">
                {shuffleArray(trainer.areaOfExpertise)
                  .slice(0, 1)
                  .map((item) => (
                    <span className="text-amber-500">{item}</span>
                  ))}/trainer
              </p>
              <ul className="flex justify-center mt-4 space-x-4">
                <li>
                  <p className="text-[#3a69d7] hover:text-[#4e7ff2]  text-2xl">
                    <RiFacebookCircleFill />
                  </p>
                </li>
                <li>
                  <p className="text-[#ee004b] hover:text-[#dd4374] text-2xl">
                    <RiInstagramFill />
                  </p>
                </li>
                <li>
                  <p className="text-green-600 hover:text-green-400 text-2xl ">
                    <RiWhatsappFill />
                  </p>
                </li>
                
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
