import React, { useState, useEffect } from "react";
import PlanInputs  from "../components/PlanInputs";
import Plan from "../components/Plan";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Home = () => {
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
        
        fetch("/api/currentPlan")
        .then(res => res.json())
        .then(data => {
            if(data.goalDate) {
                data.goalDate = new Date(data.goalDate);
                data.startDate = new Date(data.startDate);
            }
            setPlan(data);
        });
    }, []);

    const navigate = useNavigate();
    
    const handleSubmit = async() => {
        try {
            await signOut(auth);
            localStorage.removeItem('token');
            localStorage.removeItem('user');  
            navigate("/login");
        } catch(error) {
            console.error(error);
        }
    };

    return(
        <div className="home">
            <Sidebar
                savedPlans={savedPlans}
                setPlan={setPlan}
            />
            <div className="main-content">
                <PlanInputs
                    setPlan={setPlan}
                    savedPlans={savedPlans}
                    setSavedPlans={setSavedPlans}
                    offDay={info.offDay}
                    jargon={info.jargon}
                />
                <div className="logout">
                    <button onClick={handleSubmit}>Log out</button>
                </div>
                <Plan 
                    planInfo={plan}
                />
            </div>
        </div>
    );
}

export default Home;