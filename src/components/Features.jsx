import {
  RiBoxingFill,
  RiHeartPulseFill,
  RiRunLine,
  RiShoppingBasketFill,
  RiArrowRightLine,
} from "react-icons/ri";
export default function Features() {
  return (
    <div className="font-poppins my-10 ">
      <h1 className="text-2xl lg:text-4xl font-bold mb-10 mg:mb-16 lg:mb-24">EXPLORE OUR PROGRAM</h1>
      <div className="flex flex-wrap justify-between">
        <div className="rounded-lg mb-4 border-2 border-transparent w-full md:w-[32%] lg:w-[23%] p-4 bg-[#1f2125] hover:bg-[#35373b] hover:border-ornage transition-item">
          <span className="py-2 px-2 inline-block mb-4 text-[25px] text-white bg-ornageDark rounded-[5px]">
            <RiBoxingFill />
          </span>
          <h2 className="text-lg font-semibold mb-4">Strength</h2>
          <p className="mb-4 max-lg:text-sm">
            Embrace the essence of strength as we delve into its various
            dimensions physical, mental, and emotional.
          </p>
          <span className="flex gap-2 items-center hover:text-ornage hover:ease-in-out transition-item">
            Join Now <RiArrowRightLine />
          </span>
        </div>

        <div className="rounded-lg mb-4 border-2 border-transparent w-full md:w-[32%] lg:w-[23%] p-4 bg-[#1f2125] hover:bg-[#35373b] hover:border-ornage transition-item">
          <span className="py-2 px-2 inline-block mb-4 text-[25px] text-white bg-ornageDark rounded-[5px]">
            <RiHeartPulseFill />
          </span>
          <h2 className="text-lg font-semibold mb-4">Physical Fitness</h2>
          <p className="mb-4 max-lg:text-sm">
            It encompasses a range of activities that improve health, strength,
            flexibility, and overall well-being.
          </p>
          <span className="flex gap-2 items-center hover:text-ornage hover:ease-in-out transition-item">
            Join Now <RiArrowRightLine />
          </span>
        </div>

        <div className="rounded-lg mb-4 border-2 border-transparent w-full md:w-[32%] lg:w-[23%] p-4 bg-[#1f2125] hover:bg-[#35373b] hover:border-ornage transition-item">
          <span className="py-2 px-2 inline-block mb-4 text-[25px] text-white bg-ornageDark rounded-[5px]">
            <RiRunLine />
          </span>
          <h2 className="text-lg font-semibold mb-4">Fat Lose</h2>
          <p className="mb-4 max-lg:text-sm">
            Through a combination of workout routines and expert guidance, we'll
            empower you to reach your goals.
          </p>
          <span className="flex gap-2 items-center hover:text-ornage hover:ease-in-out transition-item">
            Join Now <RiArrowRightLine />
          </span>
        </div>

        <div className="rounded-lg mb-4 border-2 border-transparent w-full md:w-[32%] lg:w-[23%] p-4 bg-[#1f2125] hover:bg-[#35373b] hover:border-ornage transition-item">
          <span className="py-2 px-2 inline-block mb-4 text-[25px] text-white bg-ornageDark rounded-[5px]">
            <RiShoppingBasketFill />
          </span>
          <h2 className="text-lg font-semibold mb-4">Weight Gain</h2>
          <p className="mb-4 max-lg:text-sm">
            Designed for individuals, our program offers an effective approach
            to gaining weight in a sustainable manner.
          </p>
          <span className="flex gap-2 items-center hover:text-ornage hover:ease-in-out transition-item">
            Join Now <RiArrowRightLine />
          </span>
        </div>
      </div>
    </div>
  );
}
