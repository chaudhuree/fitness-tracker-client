import Layout from "../layout/Layout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosHook";
import toast from "react-hot-toast";
import { getUserDataFromLocalStorage } from "../utils";
import {
  RiArrowUpCircleFill,
  RiArrowUpCircleLine,
  RiArrowDownCircleLine,
  RiArrowDownCircleFill,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
export default function Forum() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { data: forum, isLoading } = useQuery({
    queryKey: ["forum", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/forum/${id}`);
      return data.data;
    },
  });
  const { mutateAsync } = useMutation({
    mutationFn: async (vote) => {
      const { data } = await axiosSecure.put(`/forum/vote/${forum._id}`, {
        vote,
        userId: getUserDataFromLocalStorage()._id,
      });
      return data;
    },
    onError: (error) => {
      toast.error("Failed to vote");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["forum", id]);
      toast.success("Voted successfully");
    },
  });
  const navigate = useNavigate();
  const handleVote = async (vote) => {
    await mutateAsync(vote);
  };
  if (isLoading) return <Spinner />;
  return (
    <Layout>
      <section className="text-white font-poppins relative px-2 lg:px-6 py-5 lg:py-10 mx-auto ">
        <span className="bg__blur right-0"></span>
        <div className=" px-6 py-5 pb-10 mx-auto">
          <div>
            <h1 className="text-2xl md:text-5xl font-medium md:font-semibold text-ornage text-center">
              {forum.title}
            </h1>
            <h2 className="text-xl md:text-2xl font-medium md:font-semibold text-sky-600 text-center mt-4">
              {forum.subtitle}
            </h2>
            <span className="text-base mt-2  text-center block mx-auto underline">{moment(forum.createdAt).fromNow()}</span>
          </div>
        </div>
        <div className=" w-full md:w-[65%] mx-auto  ">
          <figure>
            <img
              className="rounded-md object-cover"
              src={forum.image}
              alt="forum image"
            />
          </figure>
        </div>
        <p className="text-justify whitespace-pre-wrap my-6 md:my-10 text-lg md:text-xl">
          {forum.description}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              className="size-7 md:size-14 rounded-full"
              src={forum.author.photoURL}
              alt="Bonnie Green avatar"
            />
            <span className="font-medium text-base md:text-lg dark:text-white">
              {forum.author.displayName}
            </span>
          </div>

          <div className="inline-flex gap-4 items-center font-medium text-primary-600 dark:text-primary-500 ">
            <div className="flex items-center space-x-1">
              {forum.upvotes.includes(getUserDataFromLocalStorage()._id) ? (
                <RiArrowUpCircleFill
                  className="text-ornage size-5 md:size-7"
                  onClick={() => toast.error("You have already upvoted")}
                />
              ) : (
                <RiArrowUpCircleLine
                  className="text-ornage size-5 md:size-7"
                  onClick={() => handleVote("upvote")}
                />
              )}
              <span className=" text-lg">{forum.upvotes.length}</span>
            </div>
            <div className="flex items-center space-x-1">
              {forum.downvotes.includes(getUserDataFromLocalStorage()._id) ? (
                <RiArrowDownCircleFill
                  className="text-ornage size-5 md:size-7"
                  onClick={() => toast.error("You have already downvoted")}
                />
              ) : (
                <RiArrowDownCircleLine
                  className="text-ornage size-5 md:size-7"
                  onClick={() => handleVote("downvote")}
                />
              )}
              <span className=" text-lg ">{forum.downvotes.length}</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
