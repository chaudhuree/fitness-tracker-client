import aboutImageOne from '/about-1.jpg';
import aboutImageTwo from '/about-2.jpg';
export default function About() {
  return (
    <div className="font-poppins my-10 relative">
      <span className="bg__blur--two right-[40%] top-[30%]"></span>
      <h1 className="text-2xl lg:text-4xl font-bold mb-10 mb:mb-16 lg:mb-24">
        About Us
      </h1>
      <div className="grid grid-cols-1 max-lg:gap-6 lg:gap-8 xl:gap-6 lg:grid-cols-2 lg:min-h-[420px]">
        <div className="relative flex  justify-center md:px-4 ">
          <img
            src={aboutImageOne}
            alt="about"
            className="md:max-w-[500px] shadow-lg xl:absolute top-0 right-0 rounded-xl z-10 object-cover"
          />
          <img
            src={aboutImageTwo}
            alt="about"
            className="max-w-[300px] max-xl:hidden absolute rounded-xl z-20 left-0 bottom-0 object-cover shadow-xl"
          />

        </div>

        <div className='flex flex-col justify-center items-center mx-auto md:max-w-md'>
          <h1 className='text-xl  lg:text-4xl font-bold mb-10 '>THE CLASS YOU WILL GET HERE</h1>
          <p className='max-md:text-sm'>
          Led by our team of expert and motivational instructors, "The Class You Will Get Here" is a high-energy, results-driven session that combines a perfect blend of cardio, strength training, and functional exercises. Each class is carefully curated to keep you engaged and challenged, ensuring you never hit a plateau in your fitness endeavors.
          </p>
        </div>
      </div>
    </div>
  );
}
