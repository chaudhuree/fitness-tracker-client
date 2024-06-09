import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  useEffect(() => {
    document.title = "Not Found ";
  }, []);

  return (
    <div className="relative">
    <span className="bg__blur"></span>
    <span className="bg__blur bottom__blur"></span>
    <div className="min-h-screen  w-full flex flex-col justify-center items-center  ">
    
      <h1 className="text-white font-poppins text-center font-bold text-[72px]">
        404
      </h1>
      <p className="text-white text-center font-poppins font-normal text-[20px]">
        Sorry, we were unable to find that page
      </p>
      <Link
        to="/"
        className="cursor-pointer text-lg font-poppins text-orange-400 mt-4 hover:text-orange-500 transition-all ease-in-out duration-200"
      >
        Go To Home
      </Link>
    </div>
    </div>
  );
}
