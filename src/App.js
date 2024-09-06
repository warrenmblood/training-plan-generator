import React, { useState, useEffect } from "react";
import PlanInputs  from "./components/PlanInputs";
import Plan from "./components/Plan";
import Sidebar from "./components/Sidebar";
import './App.css';
import { generatePlan } from "./utils.js";

const App = () => {
  const [plan, setPlan] = useState({});
  const [savedPlans, setSavedPlans] = useState([]);

  // --- pull data below from server ---
  const jargon = {};

  jargon.easy = {
    term: 'easy pace',
    def: `a relaxed, "conversational" pace. Under 75% Max HR`
  };

  jargon.tempo = {
    term: 'tempo pace',
    def: `a harder effort, but maintainable for 40-60 minutes. 85-90% Max HR`
  };
  
  const offDay = {
    title: "Off Day",
    description: "Take a day to rest.",
    terms: []
  };

  useEffect(() => {
    const today = new Date();
    const sampleInputs1 = {};
    sampleInputs1.goalDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 98);
    sampleInputs1.startDate = today;
    sampleInputs1.goalDistance = 26;
    sampleInputs1.name = "Chicago 2024";
    sampleInputs1.runsPerWeek = 6;
    sampleInputs1.startDistance = 9;
    sampleInputs1.unit = "mi";

    const sampleInputs2 = {};
    sampleInputs2.goalDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 91);
    sampleInputs2.startDate = today;
    sampleInputs2.goalDistance = 26;
    sampleInputs2.name = "Boston Marathon 2025";
    sampleInputs2.runsPerWeek = 6;
    sampleInputs2.startDistance = 9;
    sampleInputs2.unit = "mi";

    const samplePlan1 = generatePlan(sampleInputs1, offDay, jargon);
    const samplePlan2 = generatePlan(sampleInputs2, offDay, jargon);

    const saved = [];
    saved.push(samplePlan1);
    saved.push(samplePlan2);
    setSavedPlans(saved);
  }, []);

  // --------------------------------------

  return (
    <div className="wrapper">
      <Sidebar
        savedPlans={savedPlans ?? []}
        setPlan={setPlan}
      />
      <div className="main-content">
        <PlanInputs
          setPlan={setPlan}
          setSavedPlans={setSavedPlans}
          savedPlans={savedPlans}
          offDay={offDay ?? {}}
          jargon={jargon ?? {}}
        />
        <Plan 
          planInfo={plan ?? {}}
        />
      </div>
    </div>
  );
}

export default App;
