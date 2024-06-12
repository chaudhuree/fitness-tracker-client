import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import Spinner from "./Spinner";
import { axiosDefault } from "../hooks/useAxiosHook";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

export default function TestimonialSlider() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data } = await axiosDefault.get("/review/all?page=1&limit=6");
      return data.data.reviews;
    },
  });
  if (isLoading) {
    return <Spinner />;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // For screens larger than 1024px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600, // For screens between 600px and 1024px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480, // For screens smaller than 600px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="font-poppins my-10">
      <h1 className="text-2xl capitalize lg:text-4xl font-bold mb-10 mb:mb-16 lg:mb-24">
        What our students say
      </h1>
      <section>
        <div className="m-auto">
          <div className="mt-20 slide-container">
          
            <Slider {...settings}>
              {data?.map((d) => (
                <div
                  key={d._id}
                  className="w-full relative min-h-[250px] max-w-md px-8 py-4 mt-16 bg-[#1F2125] rounded-lg shadow-lg dark:bg-gray-800"
                >
                  <div className="flex justify-center -mt-16 md:justify-end">
                    <img
                      className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400"
                      alt="Testimonial avatar"
                      src={d.trainer.photo}
                    />
                  </div>

                  <h2 className="mt-2 text-xl font-semibold text-white dark:text-white md:mt-0">
                    {d.trainer.name}
                  </h2>

                  <p className="my-2 text-sm text-white dark:text-gray-200">
                    {d.review}
                  </p>
                  <Rating
                    value={d.rating}
                    style={{ maxWidth: 100 }}
                    max={5}
                    readOnly
                  />
                  <div className="flex justify-end mt-4 absolute right-[10%] bottom-[10%]">
                    <p
                     
                      className="text-lg font-medium text-orange-300 dark:text-blue-300"
                      tabindex="0"
                      role="link"
                    >
                      John Doe
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
    </div>
  );
}
