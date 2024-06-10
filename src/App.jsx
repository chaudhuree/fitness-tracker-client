import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Trainers from "./pages/Trainers";
import Trainer from "./pages/Trainer";
import AddTrainer from "./pages/AddTrainer";
import TrainerBooking from "./pages/TrainerBooking";
import TrainerCheckout from "./pages/TrainerCheckout";
import PrivateRoute from "./protectedroutes/PrivateRoute";
import AdminPrivateRoute from "./protectedroutes/AdminPrivateRoute";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route index element={<Profile />} />
        </Route>
        <Route path="/trainers" element={<Trainers />}/>
        <Route path="/addtrainer" element={<AddTrainer />} />
        <Route path="/trainercheckout" element={<TrainerCheckout />} />
        <Route path="/trainerbooking/:trainer/:slot" element={<TrainerBooking />} />
        <Route path="/trainer/:id" element={<Trainer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
