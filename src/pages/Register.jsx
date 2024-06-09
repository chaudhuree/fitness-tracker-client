import { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import logo from "/2.svg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useAuth } from "../context/AuthProvider";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setAuthSuccess, setCurrentUser } = useAuth();

  const signup = async (email, password, name, photoURL) => {
    const auth = getAuth();
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });
      const user = auth.currentUser;
      setCurrentUser({
        ...user,
      });
      setAuthSuccess(true);
      setLoading(false);
      toast.success("Sign up was successful");
      auth.signOut();
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setAuthSuccess(false);
      toast.error(error?.message);
    }
  };
  useEffect(() => {
    errors.password && toast.error(errors.password.message);
  }, [errors.password]);
  const onSubmit = async (data) => {
    if (errors.password) return toast.error(errors.password.message);
    await signup(data.email, data.password, data.name, data.photoURL);
  };

  if (loading) return <Spinner />;
  return (
    <section className="container mx-auto">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        <div className="hidden bg-cover lg:block lg:w-1/2 bg-[url('https://i.ibb.co/HCGZhzd/thom-milkovic-Fp-XTdv4-W2w-unsplash-2.jpg')]"></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto -mb-6">
            <img className=" size-[150px] " src={logo} alt="logo" />
          </div>

          <p className="mt-3 text-xl text-center text-primary dark:text-gray-200 font-bold ">
            Register to Jobs
          </p>
          <p className="mt-3 text-sm text-center text-gray-400 dark:text-gray-200">
            Now you can apply for your dream jobs from here
          </p>

          <OAuth />

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <p className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 ">
              or register with email
            </p>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                for="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "name is required",
                  },
                })}
                placeholder="Full name"
                className=" block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
              {<p className="text-red-500 mb-6 ">{errors.name?.message}</p>}
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                for="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "invalid email address",
                  },
                  required: {
                    value: true,
                    message: "email is required",
                  },
                })}
                placeholder="Email address"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
              {<p className="text-red-500 mb-6">{errors.email?.message}</p>}
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  for="password"
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

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  className=" block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  {...register("password", {
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
                      message:
                        "Password must contain at least 6 characters, including at least one uppercase and lowercase letter and one number",
                    },
                    required: {
                      value: true,
                      message: "password is required",
                    },
                  })}
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
                )}
                {
                  <p className="text-red-500 mb-6">
                    {errors.password?.message}
                  </p>
                }
              </div>
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                for="photoURL"
              >
                Photo URL
              </label>
              <input
                type="url"
                id="photoURL"
                {...register("photoURL", {
                  required: true,
                  pattern: {
                    value: /^https?:\/\//,
                    message: "invalid URL",
                  },
                })}
                placeholder="PhotoURL : https://example.com"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
              {<p className="text-red-500">{errors.photoURL?.message}</p>}
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
              to="/signin"
              className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or Sign in
            </Link>

            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
