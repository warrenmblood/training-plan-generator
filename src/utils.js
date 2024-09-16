export function convertUTCToLocal(date) {
    // convert date object from UTC to local time
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date;
}

export function compareDates(d1, d2) {
    // return how many days from d1 to d2 (both date objects)
    const d1Start = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()); // remove time of day from d1
    const d2Start = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate()); // remove time of day from d2
    let diff = d2Start.getTime() - d1Start.getTime(); // difference in milliseconds
    diff = Math.round(diff / 86400000) // convert to days and round (daylight savings adjustment)
    return diff;
}

export function planWeeks(start, length) {
    // return # weeks in plan
    // start: start date of plan. date object
    // length: number of days in plan. non-negative integer
    const fullWeeks = Math.floor((length - 1) / 7);
    const daysLeft = (length - 1) % 7;
    const weeks = (daysLeft > 6 - start.getDay()) ? fullWeeks + 2 : fullWeeks + 1;
    return weeks;
}

export function currentWeek(start, workoutNum) {
    // return the plan week number based on a given workout number
    // start: start date of plan. date object
    // workoutNum: number (index) of the given workout in the plan. non-negative integer
    if (workoutNum < 7) {
        const week1Days = 6 - start.getDay();
        return (workoutNum > week1Days) ? 2 : 1;
    }
    return 1 + currentWeek(start, workoutNum - 7);
}

export function generateWorkout(type, distance, unit, jargon) {
    const workout = {}
    let title = `${distance} ${unit} `;
    let desc = '';
    let terms;
    switch (type) {
        case 'long':
            title += 'Long Run';
            desc = `Run ${distance} ${unit} at easy pace. Try to increase pace over the last quarter of the run`;
            terms = [jargon.easy];
            break;
        case 'easy':
            title += 'Easy Run';
            desc = `Run ${distance} ${unit} at easy pace`;
            terms = [jargon.easy]
            break;
        case 'progression':
            title += 'Progression Run';
            desc = `Run ${distance} ${unit} total. Run at easy pace for first and last 10 min of the run. ` +
                `During the middle portion, gradually increase pace from easy pace until you reach tempo pace. ` +
                `Adjust pace based on feel. Aim to reach tempo pace ~10 min before slowing back down to easy pace for final 10 min.`;
            terms = [jargon.easy, jargon.tempo];
            break;
        case 'goal':
            title += 'Goal Run';
            desc = `Today's the day! Run ${distance} ${unit} and base your pace off of your previous long runs. Good luck!`;
            terms = [];
    }
    workout.title = title;
    workout.description = desc;
    workout.terms = terms;

    return workout;
}

export function generatePlan(planInputs, offDay, jargon) {
    // return a plan object based on planInputs
    const plan = {
        name: planInputs.name,
        startDate: convertUTCToLocal(planInputs.startDate),
        goalDate: convertUTCToLocal(planInputs.goalDate),
        workouts: []
    };

    const runsPerWeek = planInputs.runsPerWeek;
    const planLength = compareDates(planInputs.startDate, planInputs.goalDate) + 1;
    const numWeeks = planWeeks(plan.startDate, planLength);
    const startDistance = planInputs.startDistance;
    const goalDistance = planInputs.goalDistance;

    let longest = Math.round(0.75 * goalDistance * 10) / 10;
    const weeklyInc = Math.round(100 * Math.max(0, longest - startDistance) / (numWeeks - 2)) / 100;
    const unit = planInputs.unit;
    
    plan.workouts.push(generateWorkout('goal', Math.round(goalDistance * 10) / 10, unit, jargon));
    
    // work backwards adding workouts in weekly order until first day of plan. replace with "off" workout by lowest priority
    // 1: easy run - short 30% (priority = 7)
    // 2: easy run - medium 40% (priority = 3)
    // 3: progression run 50% (priority = 5)
    // 4: easy run - short (priority = 2)
    // 5: easy run - medium (priority = 6)
    // 6: easy run - short (priority = 4)
    // 7: long run (priority = 1)
    for (let i = 1; i <= planLength - 1; i++) {
        switch (i % 7) {
            case 0: // long run (priority = 1)
                if (i > 7) {
                    longest -= weeklyInc;
                }
                plan.workouts.unshift(generateWorkout('long', Math.round(longest * 10) / 10, unit, jargon));
                break;
            case 1: // short easy run (priority = 4)
                if (runsPerWeek >= 4) {
                    plan.workouts.unshift(generateWorkout('easy', Math.round(0.3 * longest * 10) / 10, unit, jargon));
                } else {
                    plan.workouts.unshift(offDay);
                }
                break;
            case 2: // medium easy run (priority = 6)
                if (runsPerWeek >= 6) {
                    plan.workouts.unshift(generateWorkout('easy', Math.round(0.4 * longest * 10) / 10, unit, jargon));
                } else {
                    plan.workouts.unshift(offDay);
                }
                break;
            case 3: // short easy run (priority = 2)
                if (runsPerWeek >= 2) {
                    plan.workouts.unshift(generateWorkout('easy', Math.round(0.3 * longest * 10) / 10, unit, jargon));
                } else {
                    plan.workouts.unshift(offDay);
                }
                break;
            case 4: // progression run (priority = 5)
                if (runsPerWeek >= 5) {
                    plan.workouts.unshift(generateWorkout('progression', Math.round(0.5 * longest * 10) / 10, unit, jargon));
                } else {
                    plan.workouts.unshift(offDay);
                }
                break;
            case 5: // medium easy run (priority = 3)
                if (runsPerWeek >= 3) {
                    plan.workouts.unshift(generateWorkout('easy', Math.round(0.4 * longest * 10) / 10, unit, jargon));
                } else {
                    plan.workouts.unshift(offDay);
                }
                break;
            case 6: // short easy run (priority = 7)
                if (runsPerWeek >= 7) {
                    plan.workouts.unshift(generateWorkout('easy', Math.round(0.3 * longest * 10) / 10, unit, jargon));
                } else {
                    plan.workouts.unshift(offDay);
                }
        }
    }
    
    return plan;
}