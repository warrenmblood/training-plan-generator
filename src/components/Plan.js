import React, { useState, useEffect } from "react";
import Workout from "./Workout";
import Stats from "./Stats";
import { compareDates, planWeeks, currentWeek } from "../utils.js";

function Plan({ planInfo }) {
    const [planDate, setPlanDate] = useState(new Date()); // date selected
    const [workoutNum, setWorkoutNum] = useState(0); // index of workout in planInfo.workouts that is displayed
    const [started, setStarted] = useState(false); // whether planDate is before planInfo.startDate
    const [completed, setCompleted] = useState(false); // whether planDate is after planInfo.goalDate
    const [onPlan, setOnPlan] = useState(false); // whether planDate falls within planInfo.startDate and planInfo.goalDate
    const [offPlanMsg, setOffPlanMsg] = useState(''); // message displayed in workout when planDate falls outside of planInfo.startDate and planInfo.goalDate

    const dateFormat = { year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
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
    }, []);
    
    useEffect(() => {
        const diff = compareDates(planInfo.startDate, planDate); // days from first day of plan until planDate
        setWorkoutNum(Math.max(0, Math.min(diff, planInfo.workouts.length - 1))); // workout # in plan
        setStarted(diff >= 0);
        setCompleted(diff >= planInfo.workouts.length);
        console.log(planInfo);
    }, [planDate]);

    useEffect(() => {
        setOnPlan(started && !completed);
        setOffPlanMsg(
            completed ? 
            `Plan completed ${planInfo.goalDate.toLocaleDateString("en-US")}` : 
            `Plan starts ${planInfo.startDate.toLocaleDateString("en-US")}`
        );
        console.log(`started: ${started}`);
        console.log(`completed: ${completed}`);
    }, [started, completed]);

    const nextDay = () => {
        setPlanDate(new Date(planDate.getFullYear(), planDate.getMonth(), planDate.getDate() + 1));
    };

    const prevDay = () => {
        setPlanDate(new Date(planDate.getFullYear(), planDate.getMonth(), planDate.getDate() - 1));
    };

    return(
        <div className="plan">
            <div className="workoutHeader">
                <p>{ planInfo.name ?? "" }</p>
                <p>{ `Goal Date:
                        ${planInfo.goalDate.toLocaleDateString("en-US", dateFormat) ?? new Date().toLocaleDateString("en-US", dateFormat)}
                    `}
                </p>
            </div>
            <button type="button" onClick={prevDay}>&#128896;</button>
            <Workout
                planDate = {planDate}
                title = {onPlan ? planInfo.workouts[workoutNum].title : offPlanMsg}
                desc = {onPlan ? planInfo.workouts[workoutNum].description : ""}
                terms = {onPlan ? planInfo.workouts[workoutNum].terms : []}
            />
            <button type="button" onClick={nextDay}>&#128898;</button>
            <Stats
                onPlan = {onPlan}
                currentWeek = {currentWeek(planInfo.startDate, workoutNum)}
                planWeeks = {planWeeks(planInfo.startDate, planInfo.workouts.length)}
            />
        </div>
    );
}

export default Plan;