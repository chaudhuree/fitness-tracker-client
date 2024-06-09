import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";
import Spinner from "../components/Spinner";
import logo from "/2.svg";
import { Helmet } from "react-helmet";
import axiosSecure from "../hooks/useAxiosHook";
import { useMutation,useQueryClient } from "@tanstack/react-query";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || '/'
  
  const { email, password } = formData;
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
 const {mutateAsync} = useMutation({
   mutationFn:async ({data})=>await axiosSecure.post("/auth",data),
 })
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
      if (userCredential.user) {
      
        await mutateAsync({data:{ email: userCredential.user.email,displayName:userCredential.user.displayName,photoURL:userCredential.user.photoURL}});
        navigate(from, { replace: true })
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Bad user credentials");
    }
  }
  if (loading) return <Spinner />;
  return (
    <section className="container mx-auto font-poppins">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        <div className="hidden bg-cover lg:block lg:w-1/2 bg-[url('https://i.ibb.co/HCGZhzd/thom-milkovic-Fp-XTdv4-W2w-unsplash-2.jpg')]"></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto -mb-6">
            <img className=" size-[150px] " src={logo} alt="logo" />
          </div>

          <p className="mt-3 text-xl text-center text-primary dark:text-gray-200 font-bold ">
            Login to Jobs
          </p>
          <p className="mt-3 text-sm text-center text-gray-400 dark:text-gray-200">
            Now you can apply for your dream jobs from here
          </p>

          <OAuth />

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <p className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 ">
              or login with email
            </p>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

          <form onSubmit={onSubmit}>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
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
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                 to="/forgotpassword"
                  className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
                >
                  Forget Password?
                </Link>
              </div>

              <div className="relative"><input
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
                  className="absolute right-3 top-3 text-xl cursor-pointer text-primary"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl cursor-pointer text-primary"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}</div>
            </div>

            <div className="mt-6">
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:bg-sky-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                Sign In
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

            <Link
              to="/register"
              className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or sign up
            </Link>

            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
