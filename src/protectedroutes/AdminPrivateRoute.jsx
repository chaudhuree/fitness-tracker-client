import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "../components/Spinner";
import useAxiosSecure from "../hooks/useAxiosHook";
import toast from "react-hot-toast";
import { getUserDataFromLocalStorage } from "../utils";
const AdminPrivateRoute = () => {
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
      toast.dismiss();
      // console.log("err", err);
      toast.error("something went wrong, please login again");
    });
  const isAdmin = getUserDataFromLocalStorage()?.role === "admin";
  if (checkingStatus) {
    return <Spinner />;
  }
  return loggedIn && isAdmin ? (
    <Outlet />
  ) : (
    <Navigate state={location.pathname} to="/signin" replace={true} />
  );
};

export default AdminPrivateRoute;
