import React, { useState, useEffect } from "react";
import Workout from "./Workout";

function Plan({ planName, start, workouts }) {
    const [workoutNum, setWorkoutNum] = useState(0);
    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);

    const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const compareDates = (date1, date2) => {
    // return how many days from date1 to date2. If error, console.log and return 0.1
        try {
            date1.setUTCHours(0,0,0,0);
            date2.setUTCHours(0,0,0,0);
            let diff = date2.getTime() - date1.getTime();
            return (diff / (1000 * 60 * 60 * 24));
        } catch(err) {
            console.log('Comparing a non-date!!');
            return 0.1;
        }
    };

    useEffect(() => {
        const today = new Date();
        const diff = compareDates(start, today);
        if(diff >= 0) setStarted(true);
        //if(diff >= workouts.length) setCompleted(true);
        const num = Math.max(0, Math.min(diff, workouts.length - 1));
        setWorkoutNum(num);
    }, []);

    const nextDay = () => {
        if(workoutNum === -1) {
            setStarted(true);
        } else if (workoutNum === workouts.length - 1) {
            setCompleted(true);
        }
        setWorkoutNum(workoutNum + 1);
    };

    const prevDay = () => {
        if(workoutNum === 0) {
            setStarted(false);
        } else if (workoutNum === workouts.length) {
            setCompleted(false);
        }
        setWorkoutNum(workoutNum - 1);
    };

    return(
        <div className="plan">
            <div className="workoutHeader">
                {planName}<br/>
                {start.toLocaleDateString("en-US", dateFormat)}
            </div>
            <button type="button" onClick={prevDay}>&#128896;</button>
            <Workout
                title = {
                    workouts[workoutNum] ? 
                        (!started ? `Plan starts ${start.toLocaleDateString("en-US")}` : 
                        !completed ? workouts[workoutNum].title : `Plan Completed`)
                    : ""
                }
                desc = {(workouts[workoutNum] && started && !completed) ? workouts[workoutNum].description : ""}
                terms = {(workouts[workoutNum] && started && !completed) ? workouts[workoutNum].terms : []}
            />
            <button type="button" onClick={nextDay}>&#128898;</button>
        </div>
    );
}

export default Plan;