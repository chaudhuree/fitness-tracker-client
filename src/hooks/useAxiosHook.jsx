import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import {
  deleteUserDataFromLocalStorage,
  getTokenFromLocalStorage,
} from "../utils";
const axiosSecure = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  axiosSecure.interceptors.request.use(
    function (config) {
      // localstorage a access-token dea token ta save kora ache
      const token = getTokenFromLocalStorage();

      // console.log('request stopped by interceptors', token)
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // intercepts 401 and 403 status
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        await logout();
        deleteUserDataFromLocalStorage();
        navigate("/signin");
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};
// default axios function
export const axiosDefault = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export default useAxiosSecure;

/* 
baseURL: "http://localhost:5000/api/v1",
baseURL: "https://fityfits.onrender.com/api/v1"

*/
