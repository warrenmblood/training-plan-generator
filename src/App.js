import React, { useState, useEffect } from "react";
import PlanInputs  from "./components/PlanInputs";
import Plan from "./components/Plan";
import Stats from "./components/Stats";
import Sidebar from "./components/Sidebar";
import './App.css';

const App = () => {
  const [plan, setPlan] = useState({});

  useEffect(() => {
    setPlan(samplePlan);
  }, []);
  

  const jargon = [
    {
      term: 'easy pace',
      definition: `a relaxed, "conversational" pace. Under 75% Max HR`
    },
    {
      term: 'tempo pace',
      definition: `a harder effort, but maintainable for 6-10 miles. 85-90% Max HR`
    }
  ];

  const workout1 = {
    title: "5 Mile Run",
    description: "Run 5 miles at easy pace",
    terms: [jargon[0]]
  };

  const workout2 = {
    title: "Off Day",
    description: "",
    terms: [jargon[0]]
  };

  const workout3 = {
    title: "10 Mile Progression Run",
    description: 
      "Start at easy pace for first 2 miles. " +
      "Then, slowly increase your pace each mile until you reach tempo pace with 2 miles left. " +
      "Hold tempo pace for last 2 miles. Adjust pace based on feel.",
    terms: [jargon[0], jargon[1]]
  };

  const samplePlan = {
    name: "Sample Plan",
    startDate: new Date(),
    workouts: [workout1, workout2, workout3]
  };

  return (
    <div className="wrapper">
      <PlanInputs />
      <Plan 
        planName={plan.name ?? "Select a Plan to View Workouts"}
        start={plan.startDate ?? new Date()}
        workouts={plan.workouts ?? []}
      />
      <Stats />
      <Sidebar />
    </div>
  );
}

export default App;
