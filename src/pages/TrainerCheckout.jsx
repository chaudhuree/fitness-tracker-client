import Layout from "../layout/Layout";
import { useNavigate } from "react-router-dom";
import { useTrainerBooking } from "../context/TrainerBookingContext";
import { getUserDataFromLocalStorage } from "../utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosHook";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
export default function TrainerCheckout() {
  const { bookingData, setBookingData } = useTrainerBooking();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const {mutateAsync} = useMutation({
    mutationFn: async () => {
      const {data} = await axiosSecure.post('/trainerbooking/add', {
        trainer: bookingData.trainer,
        user: getUserDataFromLocalStorage()._id,
        slotTime:{
          slotName: bookingData.slot.slotName,
          scheduleTime: bookingData.slot.scheduleTime
        },
        package: bookingData.packageName,
        paymentStatus:"approved",
        transactionId:"1234567890",
        price: bookingData.price,
        class: bookingData.class.value
      });
      // console.log('data', data);
      
      return data;
    },
    onSuccess: (data) => {
      // queryClient.invalidateQueries('trainerbooking');
      toast.success('Booking confirmed successfully');
    },
    onError: (error) => {
      console.log('error', error);
      
      toast.error('Failed to confirm booking');
    }
  })
  const handleBooking = async() => {
    await mutateAsync();
    setBookingData({
      trainer: "",
      trainerName: "",
      slot: null,
      packageName: "",
      price: "",
      class:null
    });
    navigate('/')
  }
    
  return (
    <Layout>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <section className="text-white font-poppins relative px-2 lg:px-6 py-5 lg:py-10 mx-auto ">
        <span className="bg__blur right-0"></span>
        <div className=" px-6 py-10 mx-auto">
          <h1 className="text-2xl lg:text-4xl font-bold mb-2 md:mb-4 lg:mb-6 text-center">
            <span className="text-amber-500">CHECKOUT</span>
          </h1>
        </div>
        <section className="flex flex-wrap justify-around items-start ">
          <div className="flex flex-col justify-center gap-5 flex-wrap mb-4">
          <h1 className="text-center font-medium text-2xl underline text-sky-500">Booking Details</h1>
            <p className="space-x-2 ">
              <span className="md:text-xl text-lg capitalize">
                trainer name:
              </span>
              <span className="md:text-xl text-lg text-orange-400 capitalize">
                {bookingData.trainerName}
              </span>
            </p>
            <p className="space-x-2">
              <span className="md:text-xl text-lg capitalize">
                selected slot:
              </span>
              <span className="md:text-xl text-lg text-orange-400 capitalize">
                {bookingData.slot.slotName} - {bookingData.slot.scheduleTime}
              </span>
            </p>
            <p className="space-x-2">
              <span className="md:text-xl text-lg capitalize">
                package name:
              </span>
              <span className="md:text-xl text-lg text-orange-400 capitalize">
                {bookingData.packageName}
              </span>
            </p>
            <p className="space-x-2">
              <span className="md:text-xl text-lg capitalize">
                package price:
              </span>
              <span className="md:text-xl text-lg text-orange-400 ">
                {bookingData.price}$<span className="text-sm text-gray-400">/month</span>
              </span>
            </p>
            <p className="space-x-2">
              <span className="md:text-xl text-lg capitalize">
                selected class:
              </span>
              <span className="md:text-xl text-lg text-orange-400 ">
                {bookingData.class.label}
              </span>
            </p>
          </div>
          <div className="flex flex-col  justify-center gap-5 flex-wrap mb-4">
          <h1 className="text-center font-medium text-2xl underline text-sky-500">Your Details</h1>  
          <p className="space-x-2">
              <span className="md:text-xl text-lg capitalize">your name:</span>
              <span className="md:text-xl text-lg text-orange-400 capitalize">
                {getUserDataFromLocalStorage().displayName}
              </span>
            </p>
            <p className="space-x-2">
              <span className="md:text-xl text-lg capitalize">your email:</span>
              <span className="md:text-xl text-lg text-orange-400 ">
                {getUserDataFromLocalStorage().email}
              </span>
            </p>
          </div>
        </section>
        <div className="flex justify-center items-center mt-5">
                <button onClick={handleBooking}  className="inline-flex items-center justify-center md:px-20 px-10 py-4  font-extrabold text-white uppercase transition-colors bg-sky-700 rounded-lg hover:bg-sky-800 focus:outline-none">Confirm Booking</button>
          </div>
      </section>
    </Layout>
  );
}
