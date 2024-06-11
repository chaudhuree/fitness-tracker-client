import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// firebase
import { getAuth, updateProfile } from "firebase/auth";
import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/AuthProvider";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../hooks/useAxiosHook";
import { deleteUserDataFromLocalStorage } from "../utils";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { logout, setUpdateCount } = useAuth();

  const [loading, setLoading] = useState(false);
  // for updating profile details(button action)
  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser?.displayName,
    email: auth.currentUser?.email,
    photoURL: auth.currentUser?.photoURL,
  });
  const { name, email, photoURL } = formData;

  // logout function
  async function onLogout() {
    logout();
    deleteUserDataFromLocalStorage();
    toast.success("Logged out successfully");
    navigate("/");
  }

  // update form data
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  // update profile details
  async function onSubmit() {
    try {
      setLoading(true);
      //update display name in firebase auth
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });
      setUpdateCount((prevState) => prevState + 1);
      // update profile details in the database
      await updateProfileMutation.mutateAsync();
      setLoading(false);
      toast.success("Profile details updated");
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error("Could not update the profile details");
    }
  }
  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      await axiosSecure.put("/auth/update", {
        email: auth.currentUser.email,
        displayName: name,
        photoURL: photoURL,
      });
    },
  });
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="relative">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <span className="bg__blur"></span>
      <span className="bg__blur left-[90%] "></span>
      <section className=" container mx-auto font-poppins min-h-screen flex justify-center items-center bg-[#111317] ">
        <div className="flex w-full  mx-auto overflow-hidden  rounded-lg shadow-lg bg-[#1f2125] lg:max-w-4xl max-w-sm">
          <div className="hidden bg-cover w-full lg:block lg:w-1/2 bg-[url('https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMwfHxib2R5YnVpbGRpbmd8ZW58MHx8MHx8fDA%3D')]"></div>

          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <div className="flex justify-center mx-auto -mb-6">
              <span className="  text-primary hover:text-sky-200 text-base md:text-2xl  font-extrabold">
                <Link to="/">FityFits</Link>
              </span>
            </div>

            <p className="mt-8 text-base text-center text-white dark:text-gray-200 ">
              Update Profile
            </p>

            <form>
              {/* Name Input */}
              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium text-white dark:text-gray-200"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  disabled={!changeDetail}
                  onChange={onChange}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              {/* Email Input */}
              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium text-white dark:text-gray-200"
                  htmlFor="email"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  value={email || "not available"}
                  disabled
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 cursor-not-allowed"
                />
              </div>
              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium text-white dark:text-gray-200"
                  htmlFor="photoURL"
                >
                  Photo URL
                </label>
                <input
                  type="url"
                  id="photoURL"
                  value={photoURL}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  onChange={onChange}
                  disabled={!changeDetail}
                />
              </div>

              <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6 my-2 ">
                <p className="flex items-center text-zinc-300 dark:text-gray-300">
                  {changeDetail
                    ? "If everything ok then ➜ "
                    : "Do you want to update your profile?"}
                  <span
                    onClick={() => {
                      changeDetail && onSubmit();
                      setChangeDetail((prevState) => !prevState);
                    }}
                    className="text-amber-600  hover:text-orange-700 transition ease-in-out duration-200 ml-2 cursor-pointer  border-[#4f1410c8] font-semibold"
                  >
                    {changeDetail ? "Apply change" : "Edit"}
                  </span>
                </p>
              </div>
              <div className="mt-6">
                <button
                  onClick={onLogout}
                  className="transition-item w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-ornage rounded-lg hover:bg-orange-500 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 w-full"
                >
                  Log out
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
