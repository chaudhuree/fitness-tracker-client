import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import toast from "react-hot-toast";
import {
  RiArrowDownCircleFill,
  RiArrowDownCircleLine,
  RiArrowUpCircleFill,
  RiArrowUpCircleLine,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosHook";
import { getUserDataFromLocalStorage } from "../utils";

export default function ForumCard({ forum }) {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const user = getUserDataFromLocalStorage();
  const userId = user?._id;
  const { mutateAsync } = useMutation({
    mutationFn: async (vote) => {
      if (!userId) {
        toast.error("You need to be logged in to vote");
        return;
      }
      const { data } = await axiosSecure.put(`/forum/vote/${forum._id}`, {
        vote,
        userId,
      });
      return data;
    },
    onError: () => {
      toast.error("Failed to vote");
    },
    onSuccess: () => {
      queryClient.invalidateQueries("forums");
      toast.success("Voted successfully");
    },
  });
  const navigate = useNavigate();

  const handleVote = async (vote) => {
    if (!userId) {
      toast.error("You need to be logged in to vote");
      return;
    }
    await mutateAsync(vote);
  };

  return (
    <article className="p-6 bg-[#1f2125] rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-full md:w-2/3 mx-auto">
      <div className="flex justify-between items-center mb-5 text-white">
        <span
          className={`${
            forum.author.role === "trainer" ? "bg-sky-600" : "bg-orange-600"
          } text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800`}
        >
          <svg
            className="mr-1 w-3 h-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
              clipRule="evenodd"
            ></path>
            <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
          </svg>
          {forum.author.role}
        </span>
        <span className="text-sm">{moment(forum.createdAt).fromNow()}</span>
      </div>
      <div className="mb-2 tracking-tight text-white dark:text-white">
        <h1 className="text-xl font-semibold text-ornage">{forum.title}</h1>
        <h2 className="text-base font-medium text-sky-500">{forum.subtitle}</h2>
      </div>
      <p className="mb-5 font-light text-sm text-white dark:text-gray-400 whitespace-pre-wrap">
        {forum.description.substring(0, 120)}...
        <span
          onClick={() => navigate(`/forum/${forum._id}`)}
          className="text-ornage cursor-pointer"
        >
          Read more
        </span>
      </p>
      <div className="flex justify-center items-center my-4">
        <figure className="w-full flex justify-center items-center">
          <img
            className="w-full rounded-md md:w-[80%] max-h-[200px]"
            src={forum.image}
            alt="Forum"
          />
        </figure>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            className="w-7 h-7 rounded-full"
            src={forum.author.photoURL}
            alt="Author"
          />
          <span className="font-medium dark:text-white">
            {forum.author.displayName}
          </span>
        </div>

        <div className="inline-flex gap-4 items-center font-medium text-primary-600 dark:text-primary-500">
          <div className="flex items-center">
            {forum.upvotes.includes(userId) ? (
              <RiArrowUpCircleFill
                className="text-ornage"
                onClick={() => toast.error("You have already upvoted")}
              />
            ) : (
              <RiArrowUpCircleLine
                className="text-ornage"
                onClick={() => handleVote("upvote")}
              />
            )}
            <span className="text-xs">{forum.upvotes.length}</span>
          </div>
          <div className="flex items-center">
            {forum.downvotes.includes(userId) ? (
              <RiArrowDownCircleFill
                className="text-ornage"
                onClick={() => toast.error("You have already downvoted")}
              />
            ) : (
              <RiArrowDownCircleLine
                className="text-ornage"
                onClick={() => handleVote("downvote")}
              />
            )}
            <span className="text-xs">{forum.downvotes.length}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
