import { RiFacebookFill, RiTwitterFill, RiInstagramLine } from "react-icons/ri";
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="container text-white relative  mx-auto px-5 md:px-10   py-[18px]  font-poppins ">
      <span className="bg__blur top-4 left-[200px]"></span>
      <div className="grid grid-cols-12 gap-4 lg:gap-2">
        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <h1 className="  text-primary text-base md:text-2xl  font-extrabold mb-6">
            FityFits
          </h1>
          <p className="text-[#d1d5db] max-lg:text-sm mb-5 lg:mb-4">
            Take the first step towards a healthier, stronger you with our
            unbeatable pricing plans. Let's sweat, achieve, and conquer
            together!
          </p>
          <div>
            <ul className="flex items-center gap-4">
              <li className="transition-item px-[10px] py-[10px] text-[18px] text-ornage border border-ornage rounded-full delay-100 hover:text-white hover:bg-ornage">
                <RiFacebookFill />
              </li >
              <li className="transition-item px-[10px] py-[10px] text-[18px] text-ornage border border-ornage rounded-full delay-100 hover:text-white hover:bg-ornage">
                <RiTwitterFill />
              </li>
              <li className="transition-item px-[10px] py-[10px] text-[18px] text-ornage border border-ornage rounded-full delay-100 hover:text-white hover:bg-ornage" >
                <RiInstagramLine />
              </li>
            </ul>
          </div>
        </div>
        <div className="hidden lg:flex lg:col-span-2  justify-center">
          <div>
            <h2 className="text-xl mb-6 font-semibold">Company</h2>
            <ul className="flex flex-col gap-3">
              <li className="transition-item hover:text-ornage delay-150 ease-in-out">
                Business
              </li>
              <li className="transition-item hover:text-ornage delay-150 ease-in-out">
                Franchise
              </li>
              <li className="transition-item hover:text-ornage delay-150 ease-in-out">
                Partnership
              </li>
              <li className="transition-item hover:text-ornage delay-150 ease-in-out">
                Network
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-3 hidden lg:flex justify-center">
          <div>
            <h2 className="text-xl mb-6 font-semibold">About Us</h2>
            <ul className="flex flex-col gap-3">
              <li className="transition-item hover:text-ornage delay-150 ease-in-out">Blog</li>
              <li className="transition-item hover:text-ornage delay-150 ease-in-out">
                Security
              </li>
              <li className="transition-item hover:text-ornage delay-150 ease-in-out">
                Careers
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3 flex md:justify-end lg:justify-center">
          <div>
            <h2 className="text-base lg:text-xl mb-4 lg:mb-6 font-medium lg:font-semibold">
              Contact
            </h2>
            <ul className="flex flex-col gap-2 lg:gap-3 text-sm md:text-base  ">
              <li className="transition-item hover:text-ornage delay-150 ease-in-out">
                Contact Us
              </li>
              <li className="transition-item hover:text-ornage delay-150 ease-in-out">
                Privacy Policy
              </li>
              <li className="transition-item hover:text-ornage delay-150 ease-in-out">
                Terms & Conditions
              </li>
              <li className="transition-item hover:text-ornage delay-150 ease-in-out">
                BMI Calculator
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="mt-10 lg:mt-20 text-sm">Copyright © {currentYear} chaudhuree. All rights reserved.</p>
    </div>
  );
}
