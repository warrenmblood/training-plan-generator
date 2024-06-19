import React, { useState, useEffect } from "react";
import PlanInputs  from "./components/PlanInputs";
import Workout from "./components/Workout";
import Stats from "./components/Stats";
import Sidebar from "./components/Sidebar";
import './App.css';

const App = () => {
  return (
    <div className="wrapper">
      <PlanInputs />
      <Workout />
      <Stats />
      <Sidebar />
    </div>
  );
}

export default App;
