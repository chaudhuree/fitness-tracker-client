import { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  function onChange(e) {
    setEmail(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (error) {
      toast.error("Could not send reset password");
    }
  }

  return (
    <div className="relative ">
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <span className="bg__blur"></span>
    <span className="bg__blur bottom__blur__two "></span>
      <section className="container mx-auto font-poppins min-h-screen flex justify-center items-center bg-[#111317] ">
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-[#1f2125] rounded-lg shadow-lg lg:max-w-4xl">
          <div className="hidden bg-cover lg:block lg:w-1/2 bg-[url('https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGZpdG5lc3N8ZW58MHx8MHx8fDA%3D')]"></div>

          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <div className="flex justify-center mx-auto -mb-6">
              <span className="  text-primary hover:text-sky-200 text-base md:text-2xl  mb-5 font-extrabold">
              <Link to="/">FityFits</Link>
              </span>
            </div>

            <p className="mt-3 text-xl text-center text-primary dark:text-gray-200 font-bold ">
              Reset your password
            </p>
            <p className="mt-3 text-sm text-center text-white dark:text-gray-200">
              Now you can apply for your dream jobs from here
            </p>

            <OAuth />

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

              <p className="text-xs text-center text-white uppercase dark:text-white ">
                or reset your password
              </p>

              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
            </div>
            <form onSubmit={onSubmit}>
              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium text-white dark:text-gray-200"
                  for="email"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={onChange}
                  placeholder="Email address"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="mt-6">
                <button className="transition-item w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-ornage rounded-lg hover:bg-orange-500 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                  Send Reset Password
                </button>
              </div>
            </form>
            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

              <Link
                to="/register"
                className="text-xs text-white uppercase dark:text-white hover:underline"
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
