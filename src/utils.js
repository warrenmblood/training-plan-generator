export function compareDates(d1, d2) {
    // return how many days from d1 to d2
    const d1Start = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()); // remove time of day from d1
    const d2Start = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate()); // remove time of day from d2
    const diff = d2Start.getTime() - d1Start.getTime(); // difference in milliseconds
    return (diff / 86400000); // convert to days
}

export function planWeeks(start, length) {
    // return how many weeks (partial or full weeks sat through sun) in plan
    // start: start date of plan. date object
    // length: number of days in plan. non-negative integer
    const fullWeeks = Math.floor(length / 7);
    const daysLeft = length % 7;
    const weeks = (daysLeft > 6 - start.getDay()) ? fullWeeks + 2 : fullWeeks + 1;
    return weeks;
}

export function currentWeek(start, workoutNum) {
    // return the plan week number based on a given workout number
    // start: start date of plan. date object
    // workout: number (index) of the given workout in the plan. non-negative integer
    if(workoutNum < 7) {
        const week1Days = 6 - start.getDay();
        return (workoutNum > week1Days) ? 2 : 1;
    }
    return 1 + currentWeek(start, workoutNum - 7);
}

export function generateLongRun(distance, unit, jargon) {
    const workout = {
        title: `${distance} ${unit} Long Run`,
        description: `Run ${distance} ${unit} at easy pace. Try to increase pace over the last quarter of the run`,
        terms: jargon
    };
    return workout;
}

export function generateEasyRun(distance, unit, jargon) {
    const workout = {
        title: `${distance} ${unit} Easy Run`,
        description: `Run ${distance} ${unit} at easy pace`,
        terms: jargon
    };
    return workout;
}

export function generateProgressionRun(distance, unit, jargon) {
    const workout = {
        title: `${distance} ${unit} Progression Run`,
        description: `Run ${distance} ${unit} total. ` +
            `Run at easy pace for first and last 10 min of the run (decrease if total run time shorter than 40 min). ` +
            `During the middle portion, gradually increase pace from easy pace until you reach tempo pace. ` +
            `Adjust pace based on feel. Aim to reach tempo pace ~10 min before slowing back down to easy pace for final 10 min.`,
        terms: jargon
    };
    return workout;
}

export function generateGoalRun(distance, unit) {
    const workout = {
        title: `${distance} ${unit} Goal Run`,
        description: `Today's the day! Run ${distance} ${unit} and base your pace off of your previous long runs. Good luck!`,
        terms: []
    };
    return workout;
}

export function generatePlan(planInputs) {
    // return a plan object based on planInputs
    const plan = {};
    plan.name = planInputs.name;
    plan.startDate = planInputs.startDate;
    plan.goalDate = planInputs.goalDate;
    plan.workouts = [];

    const runsPerWeek = planInputs.runsPerWeek;
    const planLength = compareDates(planInputs.startDate, planInputs.goalDate);
    const numWeeks = planWeeks(plan.startDate, planLength);
    const startDist = planInputs.startDist;
    const goalDist = planInputs.goalDist;
    const weeklyInc = Math.round(100 * Math.max(0, Math.round(0.75*goalDist) - startDist) / (numWeeks - 2)) / 100;
    const unit = planInputs.unit;
    let longest;
    let distance;
    
    const offDay = {
        title: "Off Day",
        description: "Take a day to rest.",
        terms: []
    };
    const jargon = {};
    jargon.easy = {
        term: 'easy pace',
        def: `a relaxed, "conversational" pace. Under 75% Max HR`
    };
    jargon.tempo = {
        term: 'tempo pace',
        def: `a harder effort, but maintainable for 40-60 minutes. 85-90% Max HR`
    };

    for (let i = 0; i < planLength; i++) {
        plan.workouts.push(offDay);
    }
    
    // priority 1 workout (long runs)
    plan.workouts[planLength - 1] = generateGoalRun(goalDist, unit);
    longest = Math.round(0.75*goalDist);
    for (let i = planLength - 8; i >= 0; i -= 7) {
        if((i < 7) && (runsPerWeek <= 1 )) {
            // If this is the last workout to be added to first week, fill workout on first day of plan
            plan.workouts[0] = generateLongRun(longest, unit, [jargon.easy]);
        } else {
            plan.workouts[i] = generateLongRun(longest, unit, [jargon.easy]);
        }
        longest -= weeklyInc;
    }

    // priority 2 workout (short easy runs)
    plan.workouts[planLength - 4] = generateEasyRun(Math.round(0.3*goalDist), unit, [jargon.easy]);
    longest = Math.round(0.75*goalDist);
    for (let i = planLength - 11; i >= 0; i -= 7) {
        distance = Math.round(0.3*longest);
        if((i < 7) && (runsPerWeek <= 2)) {
            // If this is the last workout to be added to first week, fill workout on first day of plan
            plan.workouts[0] = generateEasyRun(distance, unit, [jargon.easy]);
        } else {
            plan.workouts[i] = generateEasyRun(distance, unit, [jargon.easy]);
        }
        longest -= weeklyInc;
    }

    // priority 3 workout (medium easy runs)
    plan.workouts[planLength - 6] = generateEasyRun(Math.round(0.4*goalDist), unit, [jargon.easy]);
    longest = Math.round(0.75*goalDist);
    for (let i = planLength - 13; i >= 0; i -= 7) {
        distance = Math.round(0.4*longest);
        if((i < 7) && (runsPerWeek <= 3)) {
            // If this is the last workout to be added to first week, fill workout on first day of plan
            plan.workouts[0] = generateEasyRun(distance, unit, [jargon.easy]);
        } else {
            plan.workouts[i] = generateEasyRun(distance, unit, [jargon.easy]);
        }
        longest -= weeklyInc;
    }

    // priority 4 workout (short easy runs)
    plan.workouts[planLength - 2] = generateEasyRun(Math.round(0.3*goalDist), unit, [jargon.easy]);
    longest = Math.round(0.75*goalDist);
    for (let i = planLength - 9; i >= 0; i -= 7) {
        distance = Math.round(0.3*longest);
        if((i < 7) && (runsPerWeek <= 4)) {
            // If this is the last workout to be added to first week, fill workout on first day of plan
            plan.workouts[0] = generateEasyRun(distance, unit, [jargon.easy]);
        } else {
            plan.workouts[i] = generateEasyRun(distance, unit, [jargon.easy]);
        }
        longest -= weeklyInc;
    }

    // priority 5 workout (progression run)
    plan.workouts[planLength - 5] = generateProgressionRun(Math.round(0.5*goalDist), unit, [jargon.easy, jargon.tempo]);
    longest = Math.round(0.75*goalDist);
    for (let i = planLength - 12; i >= 0; i -= 7) {
        distance = Math.round(0.5*longest);
        if((i < 7) && (runsPerWeek <= 5)) {
            // If this is the last workout to be added to first week, fill workout on first day of plan
            plan.workouts[0] = generateProgressionRun(distance, unit, [jargon.easy, jargon.tempo]);
        } else {
            plan.workouts[i] = generateProgressionRun(distance, unit, [jargon.easy, jargon.tempo]);
        }
        longest -= weeklyInc;
    }

    // priority 6 workout (medium easy runs)
    plan.workouts[planLength - 3] = generateEasyRun(Math.round(0.4*goalDist), unit, [jargon.easy]);
    longest = Math.round(0.75*goalDist);
    for (let i = planLength - 10; i >= 0; i -= 7) {
        distance = Math.round(0.4*longest);
        if((i < 7) && (runsPerWeek <= 6)) {
            // If this is the last workout to be added to first week, fill workout on first day of plan
            plan.workouts[0] = generateEasyRun(distance, unit, [jargon.easy]);
        } else {
            plan.workouts[i] = generateEasyRun(distance, unit, [jargon.easy]);
        }
        longest -= weeklyInc;
    }

    // priority 7 workout (short easy runs)
    plan.workouts[planLength - 7] = generateEasyRun(Math.round(0.3*goalDist), unit, [jargon.easy]);
    longest = Math.round(0.75*goalDist);
    for (let i = planLength - 14; i >= 0; i -= 7) {
        distance = Math.round(0.3*longest);
        if(i < 7) {
            // If this is the last workout to be added to first week, fill workout on first day of plan
            plan.workouts[0] = generateEasyRun(distance, unit, [jargon.easy]);
        } else {
            plan.workouts[i] = generateEasyRun(distance, unit, [jargon.easy]);
        }
        longest -= weeklyInc;
    }

    return plan;
}



// algorithm - assume plan is at least 8 weeks
// workouts in order. replace with off by (lowest priority)
// 1 - easy run - short 30% (7)
// 2 - easy run - medium 40% (3)
// 3 - progression run 50% (5)
// 4 - easy run - short (2)
// 5 - easy run - medium (6)
// 6 - easy run - short (4)
// 7 - long run (1)
