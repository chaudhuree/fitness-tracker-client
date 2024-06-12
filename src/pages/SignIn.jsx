import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import OAuth from "../components/OAuth";
import Spinner from "../components/Spinner";
import { Helmet } from "react-helmet";
import useAxiosSecure, { axiosDefault } from "../hooks/useAxiosHook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setUserDataToLocalStorage } from "../utils";
import moment from "moment/moment";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const { email, password } = formData;
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  const { mutateAsync } = useMutation({
    mutationFn: async ({ data }) => await axiosDefault.post("/login", data),
    onSuccess: async ({ data }) => {
      let { token, user } = data.data;

      setUserDataToLocalStorage(token, user);
    },
  });
  async function onSubmit(e) {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!passwordRegex.test(password)) {
      toast.error(
        "password must contain at least 6 characters, including UPPER/lowercase and numbers"
      );
      return;
    }
    try {
      const auth = getAuth();
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("userCredential", userCredential);

      if (userCredential.user) {
        const data = await mutateAsync({
          data: {
            email: userCredential.user.email,
            displayName: userCredential.user.displayName,
            photoURL: userCredential.user.photoURL,
          },
        });
        if (data.data.data.token) {
          // save last login time to the database
          await axiosSecure.put("/auth/lastlogin", {
            email: userCredential.user.email,
            lastLogin: moment(
              userCredential.user.metadata.lastSignInTime
            ).format("YYYY-MM-DD HH:mm:ss"),
          });
          toast.success("You have successfully signed in with email");
        }
        navigate(from, { replace: true });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Bad user credentials");
    }
  }
  if (loading) return <Spinner />;
  return (
    <div className="relative">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <span className="bg__blur"></span>
      <span className="bg__blur left-[90%] "></span>
      <section className=" container mx-auto font-poppins min-h-screen flex justify-center items-center bg-[#111317] ">
        <div className="flex w-full  mx-auto overflow-hidden  rounded-lg shadow-lg bg-[#1f2125] lg:max-w-4xl max-w-sm">
          <div className="hidden bg-cover w-full lg:block lg:w-1/2 bg-[url('https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zml0bmVzc3xlbnwwfHwwfHx8MA%3D%3D')]"></div>

          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <div className="flex justify-center mx-auto -mb-6">
              <span className="  text-primary hover:text-sky-200 text-base md:text-2xl  mb-5 font-extrabold">
                <Link to="/">FityFits</Link>
              </span>
            </div>

            <p className="mt-3 text-sm text-center text-white dark:text-gray-200">
              Push Your Boundaries, Reach New Heights
            </p>

            <OAuth />

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

              <p className="text-xs text-center text-white uppercase dark:text-gray-400 ">
                or login with email
              </p>

              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
            </div>

            <form onSubmit={onSubmit}>
              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium text-white dark:text-gray-200"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  value={email}
                  onChange={onChange}
                  placeholder="Email address"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="email"
                />
              </div>

              <div className="mt-4">
                <div className="flex justify-between">
                  <label
                    className="block mb-2 text-sm font-medium text-white dark:text-gray-200"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgotpassword"
                    className="text-xs text-white dark:text-gray-300 hover:underline"
                  >
                    Forget Password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="off"
                    value={password}
                    onChange={onChange}
                    placeholder="Password"
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  />
                  {showPassword ? (
                    <AiFillEyeInvisible
                      className="absolute right-3 top-3 text-xl cursor-pointer text-ornageDark"
                      onClick={() => setShowPassword((prevState) => !prevState)}
                    />
                  ) : (
                    <AiFillEye
                      className="absolute right-3 top-3 text-xl cursor-pointer text-ornageDark"
                      onClick={() => setShowPassword((prevState) => !prevState)}
                    />
                  )}
                </div>
              </div>

              <div className="mt-6">
                <button className="transition-item w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-ornage rounded-lg hover:bg-orange-500 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                  Sign In
                </button>
              </div>
            </form>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

              <Link
                to="/register"
                className="text-xs text-white uppercase dark:text-gray-400 hover:underline"
              >
                or sign up
              </Link>

              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
