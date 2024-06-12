import MasterLayout from "../layout/masterLayout/MasterLayout";
import FullscreenLoader from "../layout/fullscreenLoader/FullscreenLoader";
import React from "react";

export default function Dashboard() {
  return (
    <MasterLayout>
      <h2 className="text-3xl font-bold text-center capitalize dark:text-white mb-4">
        Dashboard
      </h2>
      <section className="mx-auto"></section>
    </MasterLayout>
  );
}
