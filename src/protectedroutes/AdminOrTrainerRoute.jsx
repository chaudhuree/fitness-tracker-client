import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "../components/Spinner";
import useAxiosSecure from "../hooks/useAxiosHook";
import toast from "react-hot-toast";
import { getUserDataFromLocalStorage } from "../utils";
const AdminOrTrainerRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  // server side login check
  axiosSecure
    .get("/auth/islogin")
    .then((res) => {
      if (res.data.login === false) {
        <Navigate state={location.pathname} to="/signin" replace={true} />;
      }
    })
    .catch((err) => {
      console.log("err", err);
      !isAuthorized && toast.error("You are not authorized to view this page");
    });
  const isAuthorized = getUserDataFromLocalStorage()?.role === "admin"||getUserDataFromLocalStorage()?.role === "trainer";
  if (checkingStatus) {
    return <Spinner />;
  }
  return loggedIn && isAuthorized ? (
    <Outlet />
  ) : (
    <Navigate state={location.pathname} to="/signin" replace={true} />
  );
};

export default AdminOrTrainerRoute;
