import React, { Fragment, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  deleteUserDataFromLocalStorage,
  getUserDataFromLocalStorage,
} from "../../utils";
import {
  AiOutlineCheckCircle,
  AiOutlineEdit,
  AiOutlineLogout,
  AiOutlineMenuUnfold,
  AiOutlineUser,
} from "react-icons/ai";
import { BsHourglass, BsListNested } from "react-icons/bs";
// import { MdOutlineCancelPresentation } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import "./sidebar.css";
import "./dropdownmenu.css";
import { useAuth } from "../../context/AuthProvider";

const MasterLayout = ({ children }) => {
  let contentRef,
    sideNavRef = useRef();
  const { logout, currentUser } = useAuth();
  const userData = getUserDataFromLocalStorage();
  // console.log("userData", userData);

  const onLogout = () => {
    logout();
    deleteUserDataFromLocalStorage();
    navigate("/");
  };

  const MenuBarClickHandler = () => {
    let sideNav = sideNavRef;
    let content = contentRef;
    if (sideNav.classList.contains("side-nav-open")) {
      sideNav.classList.add("side-nav-close");
      sideNav.classList.remove("side-nav-open");
      content.classList.add("content-expand");
      content.classList.remove("content");
    } else {
      sideNav.classList.remove("side-nav-close");
      sideNav.classList.add("side-nav-open");
      content.classList.remove("content-expand");
      content.classList.add("content");
    }
  };

  return (
    <Fragment>
      {/*Navbar*/}
      <nav className="fixed w-full top-0 left-0 z-20 px-0 shadow-sm flex justify-between items-center lg:px-3 !bg-[#F9FAFB]">
        {/*navbar left*/}
        <div className="flex h-20 items-center gap-4">
          <a className="icon-nav m-0 " onClick={MenuBarClickHandler}>
            <AiOutlineMenuUnfold className="text-xl mt-[3px]" />
          </a>
          <Link to="/" className="  flex items-center">
            <span className="  text-[#F97316] text-base md:text-2xl  font-extrabold">
              FityFits
            </span>
          </Link>
        </div>

        {/*dropdown menu*/}
        <div className="h-auto flex">
          <div className="user-dropdown">
            <img
              className="icon-nav-img icon-nav"
              src={userData?.photoURL}
              alt="user image"
            />
            <div className="user-dropdown-content ">
              <div className="mt-4 text-center flex flex-col justify-center items-center  gap-4">
                <img
                  className="icon-nav-img"
                  src={userData?.photoURL}
                  alt="user image"
                />
                <h6 className="text-xl font-semibold">
                  {userData.displayName}
                </h6>
                <hr className="bg-[#a2a2a2] w-full h-[.5px] " />
              </div>
              <NavLink to="/profile" className="side-bar-item">
                <AiOutlineUser className="side-bar-item-icon" />
                <span className="side-bar-item-caption">Profile</span>
              </NavLink>
              <a onClick={onLogout} className="side-bar-item">
                <AiOutlineLogout className="side-bar-item-icon" />
                <span className="side-bar-item-caption">Logout</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/*Sidebar*/}
      <div
        ref={(div) => {
          sideNavRef = div;
        }}
        className="side-nav-open"
      >
        <NavLink
          className={(navData) =>
            navData.isActive
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2 "
          }
          to="/"
        >
          <RiDashboardLine className="side-bar-item-icon inline-block" />
          <span className="side-bar-item-caption inline-block ml-2">
            Dashboard
          </span>
        </NavLink>

        <NavLink
          className={(navData) =>
            navData.isActive
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2"
          }
          to="/addclass"
        >
          <AiOutlineEdit className="side-bar-item-icon inline-block" />
          <span className="side-bar-item-caption inline-block ml-2">
            Add Class
          </span>
        </NavLink>

        <NavLink
          className={(navData) =>
            navData.isActive
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2"
          }
          to="/newslettersubscribers"
        >
          <BsListNested className="side-bar-item-icon inline-block" />
          <span className="side-bar-item-caption inline-block ml-2">
            Subscribers
          </span>
        </NavLink>

        <NavLink
          className={(navData) =>
            navData.isActive
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2"
          }
          to="/alltrainers"
        >
          <BsHourglass className="side-bar-item-icon inline-block" />
          <span className="side-bar-item-caption inline-block ml-2">
            All Trainers
          </span>
        </NavLink>

        <NavLink
          className={(navData) =>
            navData.isActive
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2"
          }
          to="/appliedtrainers"
        >
          <AiOutlineCheckCircle className="side-bar-item-icon inline-block" />
          <span className="side-bar-item-caption inline-block ml-2">
            Applied Trainers
          </span>
        </NavLink>
      </div>

      {/*Content*/}
      <div ref={(div) => (contentRef = div)} className="content p-5 bg-white">
        {children}
      </div>
    </Fragment>
  );
};

export default MasterLayout;
