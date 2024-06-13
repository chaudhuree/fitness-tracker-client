import React from "react";

export default function note() {
  return (
    <div className="font-poppins my-10 ">
    <span className="  text-primary text-base md:text-2xl  font-extrabold">FityFits</span>
      {/*
      section heading
    */}
      <h1 className="text-2xl lg:text-4xl font-bold mb-10 mg:mb-16 lg:mb-24">
        EXPLORE OUR PROGRAM
      </h1>
      {/* 
      features
    */}
      <h2 className="text-lg font-semibold mb-4">Strength</h2>
      {/*
        footer
      */}
      <h2 className="text-xl font-semibold mb-6">Company</h2>
      <p className="mb-4 max-lg:text-sm">
        Embrace the essence of strength as we delve into its various dimensions
        physical, mental, and emotional.
      </p>
      {/*
        footer link
      */}
      <li className="transition-item hover:text-ornage delay-150 ease-in-out">
        Network
      </li>
      {/*
      features icons
    */}
      <span class="py-2 px-2 inline-block mb-4 text-[25px] text-white bg-ornageDark rounded-[5px]">
        feture icons
      </span>
      {/*
        footer icons
      */}
      <li className="transition-item px-[10px] py-[10px] text-[18px] text-ornage border border-ornage rounded-full delay-100 hover:text-white hover:bg-ornage">
        <RiTwitterFill />
      </li>
      {/*
        buttons
      */}
      <NavLink
        to="/signin"
        className={`transition-item px-2 py-2 md:py-4 md:px-8 delay-100 text-sm md:text-base font-medium  bg-orange-400  md:bg-ornage hover:font-medium   hover:bg-orange-400 text-primary rounded-[5px]   `}
      >
        Login
      </NavLink>
      {/*
        bg-[#111317]
        bg-[#1f2125]
      */}

      {/*
        <Route path="" element={<PrivateRoute />}></Route>
        <Route path="" element={<AdminPrivateRoute />}></Route>
        <Route path="" element={<TrainerPrivateRoute />}></Route>
        <Route path="" element={<AdminOrTrainerRoute />}></Route>
      */}
    </div>
  );
}
