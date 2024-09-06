import React, { useState, useEffect } from "react";
import { generatePlan } from "./utils.js";
import PlanInputs  from "./components/PlanInputs";
import Plan from "./components/Plan";
import Sidebar from "./components/Sidebar";
import "./App.css";

const App = () => {
  const [plan, setPlan] = useState({});
  const [savedPlans, setSavedPlans] = useState([]);

  // --- pull data below from server ---
  const jargon = {
    easy: {
      term: "easy pace",
      def: 'a relaxed, "conversational" pace. Under 75% Max HR'
    },
    tempo: {
      term: "tempo pace",
      def: "a harder effort, but maintainable for 40-60 minutes. 85-90% Max HR"
    }
  };
  
  const offDay = {
    title: "Off Day",
    description: "Take a day to rest.",
    terms: []
  };

  // only needs to run once when app first loads
  useEffect(() => {
    const today = new Date();

    const sampleInputs1 = {
      goalDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 75),
      startDate: today,
      goalDistance: 13.1,
      name: "Chicago 2024",
      runsPerWeek: 6,
      startDistance: 3,
      unit: "mi"
    };

    const sampleInputs2 = {
      goalDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 90),
      startDate: today,
      goalDistance: 26.2,
      name: "Boston Marathon 2025",
      runsPerWeek: 5,
      startDistance: 9,
      unit: "mi"
    };

    const samplePlan1 = generatePlan(sampleInputs1, offDay, jargon);
    const samplePlan2 = generatePlan(sampleInputs2, offDay, jargon);
    setSavedPlans([samplePlan1, samplePlan2]);
  }, []);
  // --------------------------------------

  return (
    <div className="wrapper">
      <Sidebar
        savedPlans={savedPlans}
        setPlan={setPlan}
      />
      <div className="main-content">
        <PlanInputs
          setPlan={setPlan}
          setSavedPlans={setSavedPlans}
          savedPlans={savedPlans}
          offDay={offDay}
          jargon={jargon}
        />
        <Plan 
          planInfo={plan}
        />
      </div>
    </div>
  );
}

export default App;