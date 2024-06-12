import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Trainers from "./pages/Trainers";
import Trainer from "./pages/Trainer";
import AddTrainer from "./pages/AddTrainer";
import TrainerBooking from "./pages/TrainerBooking";
import TrainerCheckout from "./pages/TrainerCheckout";
import Classes from "./pages/Classes";
import Forums from "./pages/Forums";
import Forum from "./pages/Forum";
import PrivateRoute from "./protectedroutes/PrivateRoute";
import ClassItem from "./pages/ClassItem";
import NewsletterSubscribers from "./pages/NewsletterSubscribers";
import AllTrainer from "./pages/AllTrainer";
import AppliedTrainers from "./pages/AppliedTrainers";
import AppliedTrainer from "./pages/AppliedTrainer";
import AddClass from "./pages/AddClass";
import AddForum from "./pages/AddForum";
import AllForums from "./pages/AllForums";
import AllClasses from "./pages/AllClasses";
import ActiveLog from "./pages/ActiveLog";
import UserProfile from "./pages/UserProfile";
import AdminPrivateRoute from "./protectedroutes/AdminPrivateRoute";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route index element={<Profile />} />
        </Route>
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/addtrainer" element={<PrivateRoute />}>
          <Route path="/addtrainer" element={<AddTrainer />} />
        </Route>
        <Route ptha="/trainercheckout" element={<PrivateRoute />}>
          <Route path="/trainercheckout" element={<TrainerCheckout />} />
        </Route>
        <Route
          path="/trainerbooking/:trainer/:slot"
          element={<TrainerBooking />}
        />
        <Route path="/classes" element={<Classes />} />
        <Route path="/forums" element={<Forums />} />

        <Route
          path="/newslettersubscribers"
          element={<NewsletterSubscribers />}
        />
        <Route path="/activelog" element={<ActiveLog />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/alltrainers" element={<AllTrainer />} />
        <Route path="/allforums" element={<AllForums />} />
        <Route path="/allclasses" element={<AllClasses />} />
        <Route path="/appliedtrainers" element={<AppliedTrainers />} />
        <Route path="/addclass" element={<AddClass />} />
        <Route path="/addforum" element={<AddForum />} />

        <Route path="/class/:id" element={<PrivateRoute />}>
          <Route path="/class/:id" element={<ClassItem />} />
        </Route>
        <Route path="/trainer/:id" element={<Trainer />} />
        <Route path="/appliedtrainer/:id" element={<AppliedTrainer />} />
        <Route path="/forum/:id" element={<PrivateRoute />}>
          <Route path="/forum/:id" element={<Forum />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
