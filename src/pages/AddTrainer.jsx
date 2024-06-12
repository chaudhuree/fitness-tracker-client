import Layout from "../layout/Layout";
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
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
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

export default function AddTrainer() {
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
  const [selectedDaysOptions, setSelectedDaysOptions] = useState([]);
  const [selectedExpertiseOptions, setSelectedExpertiseOptions] = useState([]);
  const [selectedClassOptions, setSelectedClassOptions] = useState([]);
  // mutation function to add trainer request
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.post("/trainer/add", {
        userInfo: loggedInUser._id,
        email: trainerData.email,
        name: trainerData.name,
        photo: trainerData.photo,
        age: trainerData.age,
        description: trainerData.description,
        yearsOfexperience: trainerData.yearsOfExperience,
        social: {
          facebook: trainerData.facebook,
          whatsapp: trainerData.whatsapp,
          instagram: trainerData.instagram,
        },
        availableTimeSlot: availableTimeSlot,
        slotTime: slotTime,
        availableDays,
        areaOfExpertise,
        classes,
        status: "pending",
        packages: [
          {
            name: "basic",
            price: trainerData.basic,
          },
          {
            name: "standard",
            price: trainerData.standard,
          },
          {
            name: "premium",
            price: trainerData.premium,
          },
        ],
      });
      return data;
    },
    onSuccess: (data) => {
      toast.success("Trainer request submitted successfully");
    },
    onError: (error) => {
      console.log("error", error);
      toast.error("Failed to submit trainer request");
    },
  });
  // format data getting from react select
  let availableDays = selectedDaysOptions.map((item) => item.value);
  let areaOfExpertise = selectedExpertiseOptions.map((item) => item.value);
  let classes = selectedClassOptions.map((item) => item.value);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const loggedInUser = getUserDataFromLocalStorage();
  // get classes
  const { data: classesData, isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/class");
      return data.data.classes;
    },
  });

  const classesOption = classesData?.filter((item) => item.trainers.length <=5).map((item) => ({
    value: item._id,
    label: item.name,
  }))

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
  const formattedStartTime =
    value && value[0] ? formatTimeTo12Hour(value[0]) : "";
  const formattedEndTime =
    value && value[1] ? formatTimeTo12Hour(value[1]) : "";
  let availableTimeSlot = `${formattedStartTime} - ${formattedEndTime}`;

  const handleChange = (e) => {
    setTrainerData({ ...trainerData, [e.target.name]: e.target.value });
  };
  // form submission function
  const handleApply = async (e) => {
    e.preventDefault();

    // Input body object
    const inputBody = {
      userInfo: loggedInUser._id,
      email: trainerData.email,
      name: trainerData.name,
      photo: trainerData.photo,
      age: trainerData.age,
      description: trainerData.description,
      yearsOfExperience: trainerData.yearsOfExperience,
      social: {
        facebook: trainerData.facebook,
        whatsapp: trainerData.whatsapp,
        instagram: trainerData.instagram,
      },
      availableTimeSlot: availableTimeSlot,
      slotTime: slotTime,
      availableDays: availableDays,
      areaOfExpertise: areaOfExpertise,
      classes: classes,
      status: "pending",
      packages: [
        {
          name: "basic",
          price: trainerData.basic,
        },
        {
          name: "standard",
          price: trainerData.standard,
        },
        {
          name: "premium",
          price: trainerData.premium,
        },
      ],
    };
    console.log('inputBody', inputBody);
    
    // Function to check if any field is null or empty
    const isFieldEmpty = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          if (isFieldEmpty(obj[key])) {
            return true;
          }
        } else if (obj[key] === null || obj[key] === "") {
          return true;
        }
      }
      return false;
    };

    // Check if any field in the input body is empty
    if (isFieldEmpty(inputBody)) {
      toast.error("Please fill all fields.");
      return;
    }

    await mutateAsync();
    navigate("/");
  };

  if (isLoading) return <Spinner />;
  return (
    <Layout>
      <section className="text-white font-poppins relative px-2 lg:px-6 py-5 lg:py-10 mx-auto ">
        <span className="bg__blur left-[60%]"></span>
        <div className=" px-6 py-10 mx-auto">
          <h1 className="text-2xl lg:text-4xl font-bold mb-2 md:mb-4 lg:mb-6 text-center">
            Be A - <span className="text-amber-500">Trainer</span>
          </h1>
        </div>
        {/*
      form starts here
    */}
        <section className="max-w-4xl p-6 mx-auto bg-[#1f2125] rounded-md shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-white capitalize dark:text-white">
            Submit Details
          </h2>

          <form onSubmit={handleApply}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-white dark:text-gray-200" for="name">
                  Trainer Name
                </label>
                <input
                  onChange={handleChange}
                  id="name"
                  name="name"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-[#111317] bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label
                  className="text-white dark:text-gray-200"
                  for="emailAddress"
                >
                  Email Address
                </label>
                <input
                  id="emailAddress"
                  name="email"
                  onChange={handleChange}
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-[#111317] bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label className="text-white dark:text-gray-200" for="photo">
                  Photo URL
                </label>
                <input
                  onChange={handleChange}
                  name="photo"
                  id="photo"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-[#111317] bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label className="text-white dark:text-gray-200" for="age">
                  Age
                </label>
                <input
                  id="age"
                  name="age"
                  onChange={handleChange}
                  type="number"
                  className="block w-full px-4 py-2 mt-2 text-[#111317] bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label
                  className="text-white dark:text-gray-200"
                  for="experience"
                >
                  Years of Experience
                </label>
                <input
                  id="experience"
                  name="yearsOfExperience"
                  onChange={handleChange}
                  type="number"
                  className="block w-full px-4 py-2 mt-2 text-[#111317] bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label
                  className="text-white dark:text-gray-200"
                  for="experience"
                >
                  Available Time
                </label>

                <TimeRangePicker
                  className="block mt-2 bg-white text-[#111317] "
                  onChange={handleTimeChange}
                  value={value}
                />
              </div>
            </div>
            {/*
              social
            */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3  gap-6">
              <div>
                <label className="text-white dark:text-gray-200" for="facebook">
                  Facebook Url
                </label>
                <input
                  id="facebook"
                  name="facebook"
                  onChange={handleChange}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-[#111317] bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label
                  className="text-white dark:text-gray-200"
                  for="instagram"
                >
                  Instagram Url
                </label>
                <input
                  id="instagram"
                  name="instagram"
                  onChange={handleChange}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-[#111317] bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="text-white dark:text-gray-200" for="whatsapp">
                  Whtasapp Url
                </label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  onChange={handleChange}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-[#111317] bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
            </div>
            {/*
              package price
            */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3  gap-6">
              <div>
                <label className="text-white dark:text-gray-200" for="basic">
                  Basic Package Price
                </label>
                <input
                  id="basic"
                  name="basic"
                  onChange={handleChange}
                  type="number"
                  className="block w-full px-4 py-2 mt-2 text-[#111317] bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="text-white dark:text-gray-200" for="standard">
                  Standard Package Price
                </label>
                <input
                  id="standard"
                  name="standard"
                  onChange={handleChange}
                  type="number"
                  className="block w-full px-4 py-2 mt-2 text-[#111317] bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="text-white dark:text-gray-200" for="premium">
                  Premium Package Price
                </label>
                <input
                  id="premium"
                  name="premium"
                  onChange={handleChange}
                  type="number"
                  className="block w-full px-4 py-2 mt-2 text-[#111317] bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
            </div>
            {/*
              react select
            */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2  gap-6">
              <div>
                <label className="text-white dark:text-gray-200">
                  Available Days
                </label>
                <Select
                  className="text-[#111317] mt-2 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  defaultValue={selectedDaysOptions}
                  isMulti
                  options={daysOption}
                  onChange={handleDaysChange}
                />
              </div>
              <div>
                <label className="text-white dark:text-gray-200">
                  Area Of Expertise
                </label>
                <Select
                  className="text-[#111317] mt-2 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  defaultValue={selectedExpertiseOptions}
                  isMulti
                  options={expertiseOption}
                  onChange={handleExpertiseChange}
                />
              </div>
            </div>
            {/*
              class
            */}
            <div className="mt-6">
              <div>
                <label className="text-white dark:text-gray-200">
                  Select Classes
                </label>
                <Select
                  className="text-[#111317] mt-2 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  defaultValue={selectedClassOptions}
                  isMulti
                  options={classesOption}
                  onChange={handleClassChange}
                />
              </div>
            </div>
            {/*
              description
            */}
            <div className="mt-6">
              <label
                className="text-white dark:text-gray-200"
                for="description"
              >
                Description
              </label>
              <textarea
                id="description"
                type="textarea"
                name="description"
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-[#111317] bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div className="flex justify-end mt-6">
              <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-sky-700 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-gray-600">
                Apply
              </button>
            </div>
          </form>
        </section>
      </section>
    </Layout>
  );
}
