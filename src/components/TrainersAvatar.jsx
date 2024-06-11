import React from "react";
import { useNavigate } from "react-router-dom";

export default function TrainersAvatar({trainers, class: isClass = false}) {
  const navigate = useNavigate();
  return (
    <div class="flex items-center">
      {
        trainers.map((trainer, index) => (
          <img
          title={trainer.name}
          key={trainer._id}
        class={`object-cover ${isClass ? "size-10 mx-[10px]":"size-6 -mx-[2px]"}  hover:ring-ornage rounded-full ring ring-white dark:ring-gray-900`}
        src={trainer.photo}
        alt="trainer avatar"
        onClick={()=>navigate(`/trainer/${trainer._id}`)}
      />
        ))
      }
      
    </div>
  );
}
