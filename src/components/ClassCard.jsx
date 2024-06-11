import moment from "moment";
import TrainersAvatar from "./TrainersAvatar";
import { useNavigate } from "react-router-dom";
export default function ClassCard({ classItem }) {
  const navigate = useNavigate();
  return (
    <div className="flex transition-colors transform duration-150 border-2 border-transparent hover:border-orange-500 max-w-md overflow-hidden bg-gray-800 hover:bg-[#1f2125] rounded-lg shadow-lg dark:bg-gray-800">
      <div
        className="w-1/3 bg-cover"
        style={{ backgroundImage: `url(${classItem.image})` }}
      ></div>

      <div className="w-2/3 p-4 md:p-4">
        <h1 className="text-xl truncate font-bold text-ornage dark:text-white">
          {classItem.name}
        </h1>

        <p className="mt-2 text-sm max-xl:truncate text-gray-200 dark:text-gray-400">
          {classItem.description}
        </p>
        <div className="my-4 ml-2">
        <TrainersAvatar trainers={classItem.trainers}/>
        </div>
       
         <div className="flex  justify-between mt-4 items-center">
           <h1 className="text-xs max-xl:hidden font-bold text-gray-300 dark:text-gray-200">
             {moment(classItem.startDate).format("MMMM/YYYY")}
           </h1>
           <button onClick={()=>navigate(`/class/${classItem._id}`)} className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-sky-600 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
             View Details
           </button>
         </div> 
       
      </div>
    </div>
  );
}
