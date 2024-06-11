import { useQuery } from "@tanstack/react-query";
import { axiosDefault } from "../hooks/useAxiosHook";
import HomeForumCard from "./HomeForumCard";
export default function LatestForums() {
  const {
    isLoading,
    isError,
    data: forums,
  } = useQuery({
    queryKey: ["forums"],
    queryFn: async () => {
      const { data } = await axiosDefault.get(`/forums?page=1&limit=6`);
      return data.data;
    },
  });
  return (
    <>
      
        <div className="font-poppins my-10 relative">
          <span className="bg__blur--two right-[40%] top-[30%]"></span>
          <h1 className="text-2xl lg:text-4xl font-bold mb-10 mb:mb-16 lg:mb-24">
            Latest Forums
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {forums?.forums.map((forum) => (
            <HomeForumCard key={forum._id} forum={forum} />
          ))}
          </div>
        </div>
     
    </>
  );
}
