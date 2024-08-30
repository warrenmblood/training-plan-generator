import React, { useState, useEffect } from "react";
import PlanInputs  from "./components/PlanInputs";
import Plan from "./components/Plan";
import Sidebar from "./components/Sidebar";
import './App.css';

const App = () => {
  const [plan, setPlan] = useState({});
  const [savedPlans, setSavedPlans] = useState([{name:"Chicago Marathon 2018"},{name:"New York City Marathon 2024"}]);

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
  // --------------------------------------

  return (
    <div className="wrapper">
      <Sidebar
        savedPlans={savedPlans ?? []}
      />
      <div className="main-content">
        <PlanInputs
          setPlan={setPlan}
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
