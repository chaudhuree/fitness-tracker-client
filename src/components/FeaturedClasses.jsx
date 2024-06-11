import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { axiosDefault } from "../hooks/useAxiosHook";
import ClassCard from "./ClassCard";
export default function FeaturedClasses() {
  const { data, isLoading } = useQuery({
    queryKey: "featuredClasses",
    queryFn: async () => {
      const { data } = await axiosDefault.get(
        "/class?sort=bookingCount&page=1&limit=6"
      );
      return data.data.classes;
    },
  });

  return (
    <div className="font-poppins my-10 relative">
      <span className="bg__blur--two right-[20%] top-[60%]"></span>
      <h1 className="text-2xl lg:text-4xl font-bold mb-10 mb:mb-16 lg:mb-24">
        Our Top Classes
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-6 ">
        {data && data?.map((item) => <ClassCard key={item._id} classItem={item} />)}
      </section>
    </div>
  );
}
