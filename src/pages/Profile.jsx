import { useState } from "react";
import { useNavigate } from "react-router-dom";
// firebase
import { getAuth, updateProfile } from "firebase/auth";
import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/AuthProvider";
import { Helmet } from "react-helmet";
import logo from "/2.svg";
import axiosSecure from "../hooks/useAxiosHook";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();

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
    await axiosSecure.get("/auth/logout");
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
    <>
      <section className="max-w-6xl font-poppins flex justify-center items-center flex-col container mx-auto">
        <Helmet>
          <title>Profile</title>
        </Helmet>
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
          <div className="hidden bg-cover lg:block lg:w-1/2 bg-[url('https://i.ibb.co/HCGZhzd/thom-milkovic-Fp-XTdv4-W2w-unsplash-2.jpg')]"></div>

          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <div className="flex justify-center mx-auto -mb-6">
              <img className=" size-[150px] " src={logo} alt="logo" />
            </div>

            <p className="mt-3 text-xl text-center text-primary dark:text-gray-200 font-bold ">
              Update Profile
            </p>

            <form>
              {/* Name Input */}
              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
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
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
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
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
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

              <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6 my-2 underline">
                <p className="flex items-center text-sky-800 dark:text-gray-300">
                  {changeDetail
                    ? "If everything ok then ➜ "
                    : "Do you want to update your profile?"}
                  <span
                    onClick={() => {
                      changeDetail && onSubmit();
                      setChangeDetail((prevState) => !prevState);
                    }}
                    className="text-amber-600 dark:text-sky-600 dark:hover:text-sky-800 hover:text-[#1b0a0a] transition ease-in-out duration-200 ml-2 cursor-pointer  border-[#4f1410c8] font-semibold"
                  >
                    {changeDetail ? "Apply change" : "Edit"}
                  </span>
                </p>
              </div>
              <div className="mt-6">
                <button
                  onClick={onLogout}
                  className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:bg-sky-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                >
                  Log out
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
