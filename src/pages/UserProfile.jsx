import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import MasterLayout from "../layout/masterLayout/MasterLayout";
import FullscreenLoader from "../layout/fullscreenLoader/FullscreenLoader";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosHook";
import toast from "react-hot-toast";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useAuth } from "../context/AuthProvider";
import moment from "moment";
import { Helmet } from "react-helmet";

export default function UserProfile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { checkingStatus } = useAuthStatus();
  const { logout, setUpdateCount } = useAuth();

  const [loading, setLoading] = useState(false);
  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
  });

  // Initialize formData when auth.currentUser changes
  useEffect(() => {
    if (auth.currentUser) {
      setFormData({
        name: auth.currentUser.displayName || "",
        email: auth.currentUser.email || "",
        photoURL: auth.currentUser.photoURL || "",
      });
    }
  }, [auth.currentUser]);

  const { name, email, photoURL } = formData;

  // Update form data
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  // Update profile details
  async function onSubmit() {
    try {
      setLoading(true);
      // Update display name in Firebase auth
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });
      setUpdateCount((prevState) => prevState + 1);
      // Update profile details in the database
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

  if (loading || checkingStatus) {
    return <FullscreenLoader />;
  }

  return (
    <MasterLayout>
    <Helmet>
      <title>Profile</title>
    </Helmet>
      <h2 className="text-3xl font-bold text-center capitalize dark:text-white mb-4">
        User Profile
      </h2>
      <section className=" flex w-full justify-center mx-auto">
        <div className="w-full px-6  md:px-8 lg:w-3/4">
          <form onSubmit={(e) => e.preventDefault()}>
            {/* Name Input */}
            <div className="">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                disabled={!changeDetail}
                onChange={onChange}
                className="block w-full px-4 shadow-sm py-2 mt-2 text-[#111317] bg-[#F9FAFB] border border-blue-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            {/* Email Input */}
            <div className="mt-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email || "not available"}
                disabled
                className="block w-full px-4 shadow-sm py-2 mt-2 text-[#111317] bg-[#F9FAFB] border border-blue-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring cursor-not-allowed"
              />
            </div>

            {/* Photo URL Input */}
            <div className="mt-4">
              <label htmlFor="photoURL">Photo URL</label>
              <input
                type="url"
                id="photoURL"
                value={photoURL}
                disabled={!changeDetail}
                onChange={onChange}
                className="block w-full px-4 shadow-sm py-2 mt-2 text-[#111317] bg-[#F9FAFB] border border-blue-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            {/* Last Login Time */}
            <div className="mt-4">
              <label htmlFor="lastlogin">Last Login</label>
              <input
                type="text"
                id="lastlogin"
                value={
                  moment(auth.currentUser.metadata.lastSignInTime).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  ) || "not available"
                }
                disabled
                className="block w-full px-4 shadow-sm py-2 mt-2 text-[#111317] bg-[#F9FAFB] border border-blue-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring cursor-not-allowed"
              />
            </div>
          </form>
          <div className="mt-6 flex justify-end items-center">
            <button
              onClick={() => {
                changeDetail && onSubmit();
                setChangeDetail((prevState) => !prevState);
              }}
              className="transition-item px-6 py-3 text-sm md:text-base  font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-orange-600 rounded-lg hover:bg-orange-500 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 w-[30%]"
            >
              {changeDetail ? "Apply change" : "Edit"}
            </button>
          </div>
        </div>
      </section>
    </MasterLayout>
  );
}
