import { Outlet, Navigate,useLocation } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";
export default function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();
  const location = useLocation();
  console.log('location', location);
  
  if (checkingStatus) {
    return <Spinner />;
  }
  return loggedIn ? <Outlet /> : <Navigate state={location.pathname} to="/signin" replace={true}/>;
}
