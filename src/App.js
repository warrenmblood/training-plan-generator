import React, { useState, useEffect } from "react";
import PlanInputs  from "./components/PlanInputs";
import Plan from "./components/Plan";
import Sidebar from "./components/Sidebar";
import "./App.css";

const App = () => {
  const [plan, setPlan] = useState({});
  const [savedPlans, setSavedPlans] = useState([]);
  const [info, setInfo] = useState({});
  
  // only needs to run once when app first loads
  useEffect(() => {
    fetch("/api/info")
    .then(res => res.json())
    .then(data => {
      setInfo({
        jargon: data.jargon,
        offDay: data.offDay
      });
    });

    fetch("/api/plans")
    .then(res => res.json())
    .then(data => {
      data.forEach((p) => {
        p.goalDate = new Date(p.goalDate);
        p.startDate = new Date(p.startDate);
      });
      setSavedPlans(data);
    });
  }, []);

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
          offDay={info.offDay}
          jargon={info.jargon}
        />
        <Plan 
          planInfo={plan}
        />
      </div>
    </div>
  );
}

export default App;