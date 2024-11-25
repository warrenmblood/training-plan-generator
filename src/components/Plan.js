import React, { useState, useEffect } from "react";
import { compareDates, planWeeks, currentWeek } from "../utils.js";
import Workout from "./Workout";
import Stats from "./Stats";

function Plan({ planInfo }) {
    const [planDate, setPlanDate] = useState(new Date()); // date selected
    const [workoutNum, setWorkoutNum] = useState(0); // index of workout in planInfo.workouts that is displayed
    const [onPlan, setOnPlan] = useState(false); // whether planDate falls within planInfo.startDate and planInfo.goalDate
    const [offPlanMsg, setOffPlanMsg] = useState(""); // workout message displayed when planDate falls outside of planInfo.startDate and planInfo.goalDate

    const dateFormat = { year: "numeric", month: "numeric", day: "numeric" };

    useEffect(() => {
        if (!planInfo.startDate) {
            return;
        }
        setOnPlan(true);
        const start = planInfo.startDate; // first day of plan
        const end = planInfo.goalDate; // last day of plan
        const today = new Date(); // today's date
        if (compareDates(start, today) < 0) {
            // first day of plan is in future. set planDate to first day of plan
            setPlanDate(start);
        } else if (compareDates(today, end) < 0) {
            // plan has ended. set planDate to last day of plan
            setPlanDate(end);
        }
    }, [planInfo]);
    
    useEffect(() => {
        if (!planInfo.startDate) {
            return;
        }
        const diff = compareDates(planInfo.startDate, planDate); // days from first day of plan until planDate
        setWorkoutNum(Math.max(0, Math.min(diff, planInfo.workouts.length - 1))); // workout # in plan
        const completed = (diff >=  planInfo.workouts.length);
        setOnPlan(diff >= 0 && !completed);
        setOffPlanMsg(
            completed ? 
            `Plan completed ${planInfo.goalDate.toLocaleDateString("en-US")}` : 
            `Plan starts ${planInfo.startDate.toLocaleDateString("en-US")}`
        );
    }, [planDate]);

    const nextDay = () => {
        setPlanDate(new Date(planDate.getFullYear(), planDate.getMonth(), planDate.getDate() + 1));
    };

    const prevDay = () => {
        setPlanDate(new Date(planDate.getFullYear(), planDate.getMonth(), planDate.getDate() - 1));
    };

    let workoutExists = onPlan && planInfo.workouts;
    let goalDateText = planInfo.goalDate ? planInfo.goalDate.toLocaleDateString("en-US", dateFormat) : "";

    return(
        <div className="plan">
            <div className="workout-header">
                <p>{planInfo.name ? `${planInfo.name} (Goal Date: ${goalDateText})` : "Select a Plan to View Workouts"}</p>
            </div>
            <div className="workout-body">
                <button type="button" onClick={prevDay}>&#128896;</button>
                <Workout
                    planDate = {planDate}
                    title = {workoutExists ? planInfo.workouts[workoutNum].title : offPlanMsg}
                    desc = {workoutExists ? planInfo.workouts[workoutNum].description : ""}
                    terms = {workoutExists ? planInfo.workouts[workoutNum].terms : []}
                />
                <button type="button" onClick={nextDay}>&#128898;</button>
            </div>
            <Stats
                onPlan = {onPlan}
                currentWeek = {planInfo.startDate ? currentWeek(planInfo.startDate, workoutNum) : 0}
                planWeeks = {planInfo.startDate ? planWeeks(planInfo.startDate, planInfo.workouts.length) : 0}
            />
        </div>
    );
}

export default Plan;