import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosHook";
import { axiosDefault } from "../hooks/useAxiosHook";
import { useMutation } from "@tanstack/react-query";
import { setUserDataToLocalStorage } from "../utils";
import moment from "moment/moment";
export default function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const from = location.state || "/";
  const { mutateAsync } = useMutation({
    mutationFn: async ({ data }) => await axiosDefault.post("/login", data),
    onSuccess: async ({ data }) => {
      let { token, user } = data.data;
      setUserDataToLocalStorage(token, user);
    },
  });
  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const data = await mutateAsync({
        data: {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
      });

      if (data.data.data.token) {
        // save last login time to the database
        await axiosSecure.put("/auth/lastlogin", {
          email: user.email,
          lastLogin: moment(user.metadata.lastSignInTime).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
        });

        toast.success("You have successfully signed in with Google");
      }
      navigate(from, { replace: true });
    } catch (error) {
      console.log("oauth error", error);

      toast.error("Could not authorize with Google");
    }
  }

  return (
    <>
      <button
        onClick={onGoogleClick}
        className="flex items-center w-full justify-center mt-4 text-gray-300 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200  hover:bg-gray-600"
      >
        <div className="px-4 py-2">
          <svg className="w-6 h-6" viewBox="0 0 40 40">
            <path
              d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
              fill="#FFC107"
            />
            <path
              d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
              fill="#FF3D00"
            />
            <path
              d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
              fill="#4CAF50"
            />
            <path
              d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
              fill="#1976D2"
            />
          </svg>
        </div>

        <span className="w-5/6 px-4 py-3 font-bold text-center">
          Sign in with Google
        </span>
      </button>
    </>
  );
}
