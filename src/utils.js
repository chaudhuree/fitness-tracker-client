export const routeLists = [
  {
    path: "/",
    routeName: "Home",
  },
  {
    path: "/trainers",
    routeName: "Trainers",
  },
  {
    path: "/classes",
    routeName: "Classes",
  },
  {
    path: "/forums",
    routeName: "Forums",
  },
];

export const setUserDataToLocalStorage = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const setTrainerDataToLocalStorage = async (trainer) => {
  localStorage.setItem("trainer", JSON.stringify(trainer));
};

export const deleteUserDataFromLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
export const deleteTrainerDataFromLocalStorage = () => {
  localStorage.removeItem("trainer");
};

export const getUserDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user"));
};
export const getTrainerDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("trainer"));
};
export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const shuffleArray=(array)=> {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}