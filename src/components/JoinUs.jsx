import joinImage from "/join.jpg";
import { RiUserStarFill, RiVidiconFill, RiBuildingLine } from "react-icons/ri";
export default function JoinUs() {
  return (
    <div className="font-poppins my-10 mb-10 mb:mb-16 lg:mb-24">
      <div className="flex justify-center items-center flex-col gap-3">
        <h1 className="text-2xl lg:text-4xl font-bold">WHY JOIN US ?</h1>
        <p className="text-center max-md:text-sm max-w-lg">
          Our diverse membership base creates a friendly and supportive
          atmosphere, where you can make friends and stay motivated.
        </p>
      </div>
      <figure className="mt-10 lg:mt-20 rounded-lg">
        <img
          src={joinImage}
          alt="join image"
          className="rounded-lg shadow-xl"
        />
      </figure>
      <div className="bg-[#1F2125] max-md:hidden w-[90%] mx-auto flex flex-wrap gap-8 xl:gap-4 justify-between p-8 rounded-2xl md:-translate-y-12 ">
        <div className="flex  gap-3 justify-center items-center w-full  lg:w-[30%] xl:w-[32%]">
          <span className="py-[10px] px-[10px] bg-ornage rounded-lg">
            <RiUserStarFill className="text-3xl text-white " />
          </span>
          <div className="space-y-2">
            <h2 className="text-lg md:text-xl  font-medium">Personal Trainer</h2>
            <p className="max-md:text-sm md:text-base text-[#d1d5db]">
              Unlock your potential with our expert Personal Trainers.
            </p>
          </div>
        </div>
        
        <div className="flex   gap-3 justify-center items-center w-full  lg:w-[30%] xl:w-[32%]">
          <span className="py-[10px] px-[10px] bg-ornage rounded-lg">
            <RiUserStarFill className="text-3xl text-white " />
          </span>
          <div className="space-y-2">
            <h2 className="text-lg md:text-xl  font-medium">Personal Trainer</h2>
            <p className="max-md:text-sm md:text-base text-[#d1d5db]">
              Unlock your potential with our expert Personal Trainers.
            </p>
          </div>
        </div>
        <div className="flex  gap-3 justify-center items-center w-full  lg:w-[30%] xl:w-[32%]">
          <span className="py-[10px] px-[10px] bg-ornage rounded-lg">
            <RiUserStarFill className="text-3xl text-white " />
          </span>
          <div className="space-y-2">
            <h2 className="text-lg md:text-xl  font-medium">Personal Trainer</h2>
            <p className="max-md:text-sm md:text-base text-[#d1d5db]">
              Unlock your potential with our expert Personal Trainers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
