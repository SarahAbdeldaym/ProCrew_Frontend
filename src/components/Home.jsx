import * as React from "react";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-75 mx-4" style={{ left: "250px", position: "relative" }}>
      <Outlet />
    </div>
  );
}
