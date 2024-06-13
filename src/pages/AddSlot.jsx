import MasterLayout from "../layout/masterLayout/MasterLayout";
import { useState, useEffect } from "react";
import { getUserDataFromLocalStorage } from "../utils";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosHook";
import { useNavigate } from "react-router-dom";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "react-clock/dist/Clock.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
import toast from "react-hot-toast";
import FullscreenLoader from "../layout/fullscreenLoader/FullscreenLoader";
import moment from "moment";
import { Helmet } from "react-helmet";

// react time picker related code
function formatTimeTo12Hour(time) {
  if (!time) return "";
  let [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${period}`;
}

function getTimeSlotsWithLabels(startTime, endTime) {
  

  const slots = [];
  let current = new Date(`1970-01-01T${startTime}:00`);
  const end = new Date(`1970-01-01T${endTime}:00`);

  while (current < end) {
    let next = new Date(current.getTime());
    next.setHours(current.getHours() + 1);

    let hours = current.getHours();
    let label;
    if (hours < 12) {
      label = "morning";
    } else if (hours < 16) {
      label = "noon";
    } else if (hours < 18) {
      label = "afternoon";
    } else {
      label = "night";
    }

    slots.push({
      scheduleTime: formatTimeTo12Hour(current.toTimeString().slice(0, 5)),
      slotName: label,
      seatCapacity: 10,
    });

    current = next;
  }

  return slots;
}
// react select related code
const daysOption = [
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
];
const expertiseOption = [
  { value: "Weight Loss", label: "Weight Loss" },
  { value: "Body Building", label: "Body Building" },
  { value: "Cardiovascular Fitness", label: "Cardiovascular Fitness" },
  { value: "Yoga", label: "Yoga" },
  { value: "Senior Fitness", label: "Senior Fitness" },
];
export default function AddSlot() {
  const [trainerData, setTrainerData] = useState({
    name: "",
    email: "",
    photo: "",
    age: 0,
    yearsOfExperience: 0,
    facebook: "",
    instagram: "",
    whatsapp: "",
    basic: 0,
    standard: 0,
    premium: 0,
    description: "",
  });
  const [value, onChange] = useState([null, null]);
  const [slotTime, setSlotTime] = useState([]);
  const [newSlotTime, setNewSlotTime] = useState(null);
  const [selectedDaysOptions, setSelectedDaysOptions] = useState([]);
  const [selectedExpertiseOptions, setSelectedExpertiseOptions] = useState([]);
  const [selectedClassOptions, setSelectedClassOptions] = useState([]);
  const userId = getUserDataFromLocalStorage()._id;
  let unModifiedData = [];
  // get trainer using userid
  const { data: trainerDataServer, isLoading: trainerDataServerLoading } =
    useQuery({
      queryKey: ["trainer", userId],
      queryFn: async () => {
        const { data } = await axiosSecure.get(`/trainer/user/${userId}`);
        return data.data;
      },
    });

  useEffect(() => {
    if (trainerDataServer) {
      console.log("trainerDataServer", trainerDataServer);
      const {
        name,
        email,
        photo,
        age,
        yearsOfexperience,
        social,
        packages,
        description,
        availableTimeSlot,
      } = trainerDataServer;

      // Parse availableTimeSlot
      const [startTime, endTime] = availableTimeSlot
        .split(" - ")
        .map((time) => {
          return moment(time, ["h:mm A"]).format("HH:mm");
        });

      setTrainerData({
        name,
        email,
        photo,
        age,
        yearsOfExperience: yearsOfexperience,
        facebook: social?.facebook || "",
        instagram: social?.instagram || "",
        whatsapp: social?.whatsapp || "",
        basic: packages[0]?.price || 0,
        standard: packages[1]?.price || 0,
        premium: packages[2]?.price || 0,
        description,
      });

      onChange([startTime, endTime]); // Set TimeRangePicker value
    }
  }, [trainerDataServer]);

  // mutation function to add trainer request
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.put(`/trainer/slot/add/${trainerDataServer._id}`, {
        slotTime: newSlotTime,
        classes,
        availableDays,
      });
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("trainer");
      toast.success("Trainer request submitted successfully");
      navigate("/manageslot")
    },
    onError: (error) => {
      console.log("error", error);
      toast.error("Failed to submit trainer request");
    },
  });
  // format data getting from react select
  let availableDays = selectedDaysOptions.map((item) => item.value);
  // let areaOfExpertise = selectedExpertiseOptions.map((item) => item.value);
  let classes = selectedClassOptions.map((item) => item.value);
  // after getting data from query of trainerDataServer, change availableDays, areaOfExpertise, classes
  useEffect(() => {
    if (trainerDataServer) {
      const { availableDays, areaOfExpertise, classes } = trainerDataServer;
      setSelectedDaysOptions(
        availableDays.map((item) => ({
          value: item,
          label: item,
        }))
      );
      setSelectedExpertiseOptions(
        areaOfExpertise.map((item) => ({
          value: item,
          label: item,
        }))
      );
      setSelectedClassOptions(
        classes.map((item) => ({
          value: item._id,
          label: item.name,
        }))
      );
    }
  }, [trainerDataServer]);

  // now set slotTime
  useEffect(() => {
    if (trainerDataServer) {
      const { slotTime } = trainerDataServer;
      setSlotTime(slotTime);
    }
  }, [trainerDataServer]);

  const [originalSlotTime, setOriginalSlotTime] = useState([]);
  useEffect(() => {
    if (trainerDataServer) {
      const { availableTimeSlot } = trainerDataServer;

      if (availableTimeSlot) {
        const [startTime, endTime] = availableTimeSlot
          .split(" - ")
          .map((time) => {
            return moment(time, ["h:mm A"]).format("HH:mm").toString();
          });

        const unModifiedData = getTimeSlotsWithLabels(startTime, endTime);
        if (unModifiedData.length > 0) {
          setOriginalSlotTime(unModifiedData);
        }
      }
    }
  }, [trainerDataServer]);

  const filteredData = originalSlotTime.filter((originalSlot) => {
    return !slotTime.some((slot) => {
      return (
        slot.slotName === originalSlot.slotName &&
        slot.scheduleTime === originalSlot.scheduleTime
      );
    });
  });

  const newDataArray = filteredData.map((item) => {
    return {
      value: item.slotName,
      label: item.scheduleTime,
    };
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  // const loggedInUser = getUserDataFromLocalStorage();
  // get classes
  const { data: classesData, isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/class");
      return data.data.classes;
    },
  });

  const classesOption = classesData
    ?.filter((item) => item.trainers.length <= 5)
    .map((item) => ({
      value: item._id,
      label: item.name,
    }));

  const handleTimeChange = (newValue) => {
    onChange(newValue);
    if (newValue && newValue[0] && newValue[1]) {
      const slots = getTimeSlotsWithLabels(newValue[0], newValue[1]);
      setSlotTime(slots);
    } else {
      setSlotTime([]);
    }
  };
  // handle daysSelect
  const handleDaysChange = (selected) => {
    setSelectedDaysOptions(selected);
  };
  const handleExpertiseChange = (selected) => {
    setSelectedExpertiseOptions(selected);
  };
  const handleClassChange = (selected) => {
    setSelectedClassOptions(selected);
  };
 
  // form submission function
  const handleApply = async (e) => {
    e.preventDefault();
   if(newSlotTime === null){
      return toast.error("Please select a slot");
    }
    // calling mutateAsync function
    await mutateAsync();
  };

  const handleSlotChange = (selected) => {
    const formatTime = {
      slotName: selected.value,
      scheduleTime: selected.label,
    };
    setNewSlotTime(formatTime);
  };

  return (
    <MasterLayout>
      <Helmet>
        <title>Update Trainer Profile</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center capitalize dark:text-white mb-4">
        Update Trainer Profile
      </h2>
      <section className="mx-auto">
        <form
          className=" p-6 mx-auto bg-white rounded-md shadow-md"
          onSubmit={handleApply}
        >
          {/* Render loading spinner */}
          {trainerDataServerLoading && <FullscreenLoader />}
          {/* email */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              disabled
              className="w-full px-3 py-2 mt-1 border rounded-md"
              value={trainerData.email}
              // onChange={handleChange}
              // required
            />
          </div>
          {/* name */}
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              disabled
              className="w-full px-3 py-2 mt-1 border rounded-md"
              value={trainerData.name}
              // onChange={handleChange}
              required
            />
          </div>
          {/* photo */}
          <div className="mb-4">
            <label className="block text-gray-700">Photo URL</label>
            <input
              type="text"
              name="photo"
              disabled
              className="w-full px-3 py-2 mt-1 border rounded-md"
              value={trainerData.photo}
              // onChange={handleChange}
              required
            />
          </div>
          {/* age */}
          <div className="mb-4">
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              disabled
              name="age"
              className="w-full px-3 py-2 mt-1 border rounded-md"
              value={trainerData.age}
              // onChange={handleChange}
              required
            />
          </div>
          {/* yearsOfExperience */}
          <div className="mb-4">
            <label className="block text-gray-700">Years of Experience</label>
            <input
              type="number"
              name="yearsOfExperience"
              disabled
              className="w-full px-3 py-2 mt-1 border rounded-md"
              value={trainerData.yearsOfExperience}
              // onChange={handleChange}
              required
            />
          </div>
          {/* social */}
          <div className="mb-4">
            <label className="block text-gray-700">Facebook</label>
            <input
              type="text"
              name="facebook"
              disabled
              className="w-full px-3 py-2 mt-1 border rounded-md"
              value={trainerData.facebook}
              // onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Instagram</label>
            <input
              type="text"
              name="instagram"
              className="w-full px-3 py-2 mt-1 border rounded-md"
              value={trainerData.instagram}
              disabled
              // onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Whatsapp</label>
            <input
              type="text"
              name="whatsapp"
              className="w-full px-3 py-2 mt-1 border rounded-md"
              disabled
              value={trainerData.whatsapp}
              // onChange={handleChange}
            />
          </div>
          {/* packages */}
          <div className="mb-4">
            <label className="block text-gray-700">Basic Package</label>
            <input
              type="number"
              name="basic"
              disabled
              className="w-full px-3 py-2 mt-1 border rounded-md"
              value={trainerData.basic}
              // onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Standard Package</label>
            <input
              type="number"
              name="standard"
              disabled
              className="w-full px-3 py-2 mt-1 border rounded-md"
              value={trainerData.standard}
              // onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Premium Package</label>
            <input
              type="number"
              name="premium"
              disabled
              className="w-full px-3 py-2 mt-1 border rounded-md"
              value={trainerData.premium}
              // onChange={handleChange}
            />
          </div>
          {/* description */}
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              disabled
              className="w-full px-3 py-2 mt-1 border rounded-md"
              value={trainerData.description}
              // onChange={handleChange}
              required
            ></textarea>
          </div>
          {/* time picker */}
          <div className="mb-4">
            <label className="block text-gray-700">Available Time Slot</label>
            <TimeRangePicker
              disabled
              onChange={handleTimeChange}
              value={value}
            />
          </div>
          {/* react select */}
          <div className="mb-4">
            <label className="block text-gray-700">Available Days</label>
            <Select
              isMulti
              options={daysOption}
              components={animatedComponents}
              value={selectedDaysOptions}
              onChange={handleDaysChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Area of Expertise</label>
            <Select
              isMulti
              isDisabled={true}
              options={expertiseOption}
              components={animatedComponents}
              value={selectedExpertiseOptions}
              onChange={handleExpertiseChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Add Slot</label>
            <Select
              options={newDataArray}
              components={animatedComponents}
              onChange={handleSlotChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Classes</label>
            <Select
              isMulti
              options={classesOption}
              components={animatedComponents}
              value={selectedClassOptions}
              onChange={handleClassChange}
              isLoading={isLoading}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 text-white bg-blue-600 rounded-md"
            >
              Update
            </button>
          </div>
        </form>
      </section>
    </MasterLayout>
  );
}
