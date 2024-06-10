import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const TrainerBookingContext = createContext();

export default function TrainerBookingProvider({ children }) {
  const [bookingData, setBookingData] = useState({
    trainer: "",
    trainerName: "",
    slot: null,
    packageName: "",
    price: "",
  });

  useEffect(() => {
    console.log('bookingData', bookingData);
    
  }, [bookingData]);

  const trainerBookingValue = {
    bookingData,
    setBookingData,
  };

  return (
    <TrainerBookingContext.Provider value={trainerBookingValue}>
      {children}
    </TrainerBookingContext.Provider>
  );
}

export const useTrainerBooking = () => {
  return useContext(TrainerBookingContext);
};