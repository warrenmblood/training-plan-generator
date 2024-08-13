import React, { useState, useEffect } from "react";
import PlanInputs  from "./components/PlanInputs";
import Plan from "./components/Plan";
import Sidebar from "./components/Sidebar";
import './App.css';

const App = () => {
  const [plan, setPlan] = useState(
    {
      name: "Select a Plan to View Workouts",
      startDate: new Date(),
      goalDate: new Date(),
      workouts: [],
    }
  );

  useEffect(() => {
    const jargon = {};

    jargon.easy = {
      term: 'easy pace',
      def: `a relaxed, "conversational" pace. Under 75% Max HR`
    };
  
    jargon.tempo = {
      term: 'tempo pace',
      def: `a harder effort, but maintainable for 6-10 miles. 85-90% Max HR`
    };

    const workout1 = {
      title: "5 Mile Run",
      description: "Run 5 miles at easy pace",
      terms: [jargon.easy]
    };

    const workout2 = {
      title: "Off Day",
      description: "",
      terms: []
    };

    const workout3 = {
      title: "10 Mile Progression Run",
      description: 
        "Start at easy pace for first 2 miles. " +
        "Then, slowly increase your pace each mile until you reach tempo pace with 2 miles left. " +
        "Hold tempo pace for last 2 miles. Adjust pace based on feel.",
      terms: [jargon.easy, jargon.tempo]
    };

    const samplePlan = {
      name: "Sample Plan",
      startDate: new Date(),
      goalDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2), 
      workouts: [workout1, workout2, workout3]
    };
    
    setPlan(samplePlan);
  }, []);
  

  return (
    <div className="wrapper">
      <PlanInputs 
        setPlan={setPlan}
      />
      <Plan 
        planInfo={plan}
      />
      <Sidebar />
    </div>
  );
}

export default App;
