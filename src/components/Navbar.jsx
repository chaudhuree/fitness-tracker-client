import { NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
// import DarkModeToggler from "./DarkModeToggler";
import { routeLists } from "../utils";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import axiosSecure from "../hooks/useAxiosHook";

export default function Navbar() {
  const { logout, currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    logout();
    // await axiosSecure.get("/auth/logout");
    navigate("/");
  };
  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  return (
    <div className="navbar container  mx-auto px-5 md:px-10  py-[18px]  font-poppins ">
      <Tooltip id="avatar" />
      <div className="navbar-start">
        <div className="dropdown z-50">
          <div
            tabIndex={0}
            role="button"
            className="pl-0 btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {routeLists?.map((route) => (
              <li key={route.path}>
                <NavLink
                  to={route.path}
                  className={` flex items-center justify-center mb-2  ${
                    !currentUser &&
                    (route.path === "/addjob" ||
                      route.path === "/myjobs" ||
                      route.path === "/appliedjobs") &&
                    "hidden"
                  }`}
                >
                  {route.routeName}
                </NavLink>
              </li>
            ))}
            {currentUser ? (
              <li>
                <button
                  onClick={logoutHandler}
                  className="w-full py-2 px-[13px] bg-primary text-white rounded-[8px] font-semibold text-base flext justify-center mt-3"
                >
                  Logout
                </button>
              </li>
            ) : null}
          </ul>
        </div>
        <Link to="/" className=" text-xl ml-0 flex items-center">
          <span className="  text-primary text-base md:text-2xl  font-extrabold">FityFits</span>
      
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex items-center  ">
        <div className="flex flex-row gap-8 px-1">
          {routeLists?.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              className={`relative navlink pb-1 ${
                pathMatchRoute(route.path) ? "text-primary active" : ""
              }  leading-[120%] text-gray-100`}
            >
              {route.routeName}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="navbar-end">
        {currentUser ? (
          <div className="flex items-center gap-2">
            <div className="avatar dropdown dropdown-end">
              <div
                className="w-10 rounded-full ring-2 ring-[#FEFEFF] "
                tabIndex={0}
                data-tooltip-id="avatar"
                data-tooltip-content={currentUser?.displayName}
                data-tooltip-place="left-start"
                data-tooltip-class-name="custom-tooltip"
              >
                <img src={currentUser?.photoURL} />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[99999] menu py-2 px-8 shadow bg-base-100 rounded-box  mt-4 flex flex-col gap-2 font-poppins"
              >
                <li className="font-bold whitespace-nowrap">
                  {currentUser?.displayName}
                </li>
                <Link
                  to="/profile"
                  className="py-2 px-[13px] bg-primary text-white rounded-[8px] font-semibold flex items-center justify-center "
                >
                  Profile
                </Link>
                <button
                  onClick={logoutHandler}
                  className="px-2 py-2 md:py-4 md:px-8 delay-100 text-sm md:text-base font-medium  bg-orange-400  md:bg-ornage hover:font-medium   hover:bg-orange-400 text-primary rounded-[5px]max-md:hidden"
                >
                  Logout
                </button>
              </ul>
            </div>
            {/*
             <DarkModeToggler /> 
            */}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/*
             <DarkModeToggler /> 
            */}
            <NavLink
              to="/signin"
              className={`px-2 py-2 md:py-4 md:px-8 delay-100 text-sm md:text-base font-medium  bg-orange-400  md:bg-ornage hover:font-medium   hover:bg-orange-400 text-primary rounded-[5px]   `}
            >
              Login
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
