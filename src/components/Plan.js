import React, { useState, useEffect } from "react";
import Workout from "./Workout";
import { compareDates } from "../utils.js";

function Plan({ planInfo }) {
    const [planDate, setPlanDate] = useState(new Date());
    const [workoutNum, setWorkoutNum] = useState(0);
    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);

    let onPlan = started && !completed;
    let offPlanMessage = completed ? `Plan Completed` : `Plan starts ${planInfo.startDate.toLocaleDateString("en-US")}`;

    const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
        const today = new Date();
        const diff = compareDates(planInfo.startDate, today);
        const planLength = planInfo.workouts.length;
        if (diff < 0) {
            // first day of plan is in future
            setPlanDate(planInfo.startDate);
        } else if (diff >= planLength) {
            // plan has ended
            setPlanDate(today.setDate(today.getDate() + planLength - 1));
        }
    }, []);
    
    useEffect(() => {
        const diff = compareDates(planInfo.startDate, planDate);
        setWorkoutNum(Math.max(0, Math.min(diff, planInfo.workouts.length - 1)));
        setStarted(diff >= 0);
        setCompleted(diff >= planInfo.workouts.length);
    }, [planDate]);

    const nextDay = () => {
        const newDate = new Date(planDate.getFullYear(), planDate.getMonth(), planDate.getDate() + 1);
        setPlanDate(newDate);
    };

    const prevDay = () => {
        const newDate = new Date(planDate.getFullYear(), planDate.getMonth(), planDate.getDate() - 1);
        setPlanDate(newDate);
    };

    return(
        <div className="plan">
            <div className="workoutHeader">
                <p>{ planInfo.name ?? "" }</p>
                <p>{ planDate.toLocaleDateString("en-US", dateFormat) ?? new Date().toLocaleDateString("en-US", dateFormat) }</p>
            </div>
            <button type="button" onClick={prevDay}>&#128896;</button>
            <Workout
                title = { onPlan ? planInfo.workouts[workoutNum].title : offPlanMessage }
                desc = {onPlan ? planInfo.workouts[workoutNum].description : ""}
                terms = {onPlan ? planInfo.workouts[workoutNum].terms : []}
            />
            <button type="button" onClick={nextDay}>&#128898;</button>
        </div>
    );
}

export default Plan;