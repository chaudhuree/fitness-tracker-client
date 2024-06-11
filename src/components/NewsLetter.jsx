import { useMutation } from "@tanstack/react-query";
import { axiosDefault } from "../hooks/useAxiosHook";
import toast from "react-hot-toast";
export default function NewsLetter() {
  const { mutateAsync } = useMutation({
    mutationFn: async ({ email, name }) => {
      const { data } = await axiosDefault.post("/newsletter/subscribe", {
        email,
        name,
      });
      return data;
    },
    onError: (error) => {
      if(error.response.data.message==="Subscriber already exists"){
        return toast.error("You already subscribed to our newsletter");
      }
      
      toast.error("Failed to subscribe to newsletter");
    },
    onSuccess: (data) => {
      toast.success("Subscribed to newsletter");
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    if (!email || !name) return toast.error("Email and Name is required");
    await mutateAsync({ email, name });
    e.target.reset();
  };
  return (
    <div className="font-poppins my-10 relative mb-10 mb:mb-16 lg:mb-24 bg-[#1f2125] rounded-xl">
      <section className=" dark:bg-gray-900">
        <div className="container px-4 py-16 mx-auto lg:flex lg:items-center lg:justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-white xl:text-3xl dark:text-white">
            Join us and get the update from anywhere
          </h2>

          <div className="mt-8 lg:mt-0">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:-mx-2"
            >
              <input
                id="name"
                type="text"
                className="px-4  py-2 text-gray-700 bg-white border border-gray-200 rounded-lg sm:mx-2 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Name"
              />

              <input
                id="email"
                type="email"
                className="px-4  py-2 text-gray-700 bg-white border border-gray-200 rounded-lg sm:mx-2 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Email Address"
              />

              <button className="px-6  py-2 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg focus:ring focus:ring-blue-300 focus:ring-opacity-80 fo sm:mx-2 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                Subscribe
              </button>
            </form>

            <p className="mt-3 text-sm text-sky-100 dark:text-gray-300">
              No worries, we don't spam.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
