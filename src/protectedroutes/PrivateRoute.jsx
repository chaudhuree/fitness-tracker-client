import toast from "react-hot-toast";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useAuthStatus } from "../hooks/useAuthStatus";
import useAxiosSecure from "../hooks/useAxiosHook";

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();

  axiosSecure
    .get("/auth/islogin")
    .then((res) => {
      if (res.data.login === false) {
        <Navigate state={location.pathname} to="/signin" replace={true} />;
      }
    })
    .catch((err) => {
      console.log("err", err);

      // Dismiss any existing toast messages
      toast.dismiss();
      
      // Show new error message
      toast.error("Please login");
    });

  if (checkingStatus) {
    return <Spinner />;
  }
  
  return loggedIn ? (
    <Outlet />
  ) : (
    <Navigate state={location.pathname} to="/signin" replace={true} />
  );
};

export default PrivateRoute;
