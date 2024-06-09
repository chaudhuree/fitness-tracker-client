import header from "/header.png";
import { useNavigate } from "react-router-dom";


export default function Banner() {
  const navigate = useNavigate()
  return (
    <>
      <div className="grid  grid-cols-12 font-poppins min-h-screen items-center relative header__container ">
      <p className="absolute bottom-[5%] right-[20%] font-bold text-[140px] text-white opacity-[0.05] leading-[70px] max-md:hidden">FITNESS</p>
      <span className="bg__blur"></span>
      <span className="bg__blur bottom__blur"></span>
        <div className="col-span-12 md:col-span-6">
          <p className="mb-4 text-sm lg:text-base font-bold text-ornage ">BEST FITNESS IN THE TOWN</p>
          <h1 className="font-bold lg:font-extrabold text-3xl lg:text-7xl lg:leading-[100px] mb-4">
            <span className="header_span">MAKE</span> YOUR BODY SHAPE
          </h1>
          <p className="text-[#d1d5db] max-lg:text-sm mb-5 lg:mb-4">
            Unleash your potential and embark on a journey towards a stronger,
            fitter, and more confident you. Sign up for 'Make Your Body Shape'
            now and witness the incredible transformation your body is capable
            of!
          </p>
          <button onClick={()=>navigate('/classes')} className="transition-item px-2  py-2 md:py-4 md:px-8 delay-[0.3s] ease-in-out text-sm md:text-base font-medium  bg-orange-400  md:bg-ornage hover:font-medium   hover:bg-orange-400 text-primary rounded-[5px]">JOIN US</button>
        </div>
        <div className="col-span-12 md:col-span-6 grid justify-center items-center">
          <figure className="header__image max-w-[350px] m-auto relative">
            <span className="absolute top-0 left-[50%] transform translate-x-[-50%] text-[500px] md:text-[600px] font-normal leading-[320px] text-ornage opacity-[0.1] z-10">o</span>
            <img  src={header} alt="header image"  className="z-20 relative"/>
          </figure>
        </div>
      </div>
    </>
  );
}
