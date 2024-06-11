import moment from "moment";
import { useNavigate } from "react-router-dom";
import { RiArrowUpCircleLine, RiArrowDownCircleLine } from "react-icons/ri";
export default function HomeForumCard({ forum }) {
  const navigate = useNavigate();

  return (
    <article className="p-6 bg-[#1f2125] rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-full  mx-auto">
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
              fill-rule="evenodd"
              d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
              clip-rule="evenodd"
            ></path>
            <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
          </svg>
          {forum.author.role}
        </span>
        <span className="text-sm">{moment(forum.createdAt).fromNow()}</span>
      </div>
      <div className="flex justify-center items-center my-4 max-md:hidden">
        <figure className="w-full flex justify-center items-center">
          <img
            className="w-full rounded-md   max-h-[200px]"
            src={forum.image}
            alt="Bonnie Green avatar"
          />
        </figure>
      </div>
      <div className="mb-2   tracking-tight text-white dark:text-white">
        <h1 className="text-base max-md:text-sm font-medium text-white">
          {forum.title.substring(0, 40)}..
          <span
            onClick={() => navigate(`/forum/${forum._id}`)}
            className="text-ornage cursor-pointer text-sm font-light"
          >
            read more
          </span>
        </h1>
      </div>

      <div className="flex justify-between items-center ">
        <div className="flex items-center space-x-4">
          <img
            className="w-7 h-7 rounded-full"
            src={forum.author.photoURL}
            alt="Bonnie Green avatar"
          />
          <span className="font-medium max-md:text-sm dark:text-white">
            {forum.author.displayName}
          </span>
        </div>

        <div className="inline-flex  gap-4 items-center font-medium text-primary-600 dark:text-primary-500 ">
          <div className="flex items-center">
            <RiArrowUpCircleLine className="text-ornage" />

            <span className=" text-xs">{forum.upvotes.length}</span>
          </div>
          <div className="flex items-center">
            <RiArrowDownCircleLine className="text-ornage" />

            <span className=" text-xs">{forum.downvotes.length}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
