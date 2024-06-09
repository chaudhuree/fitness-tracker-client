import toast from "react-hot-toast";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useAuthStatus } from "../hooks/useAuthStatus";
import useAxiosSecure from "../hooks/useAxiosHook";
const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  // console.log('location', location);
  axiosSecure
    .get("/auth/islogin")
    .then((res) => {
      if (res.data.login === false) {
        <Navigate state={location.pathname} to="/signin" replace={true} />;
      }
    })
    .catch((err) => {
      console.log("err", err);
      toast.error("something went wrong, please login again");
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
