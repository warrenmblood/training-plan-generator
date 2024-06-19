import React, { useState, useEffect } from "react";

function PlanInputs() {
    const [daysPerWeek, setDaysPerWeek] = useState(4);

    const updateSlider = (e) => {
        setDaysPerWeek(e.target.value);
    }

    return (
        <form className="planInputs">
            <fieldset>
                <label for="unit">Distance Unit</label>
                <select id="unit">
                    <option value="km">km</option>
                    <option value="miles">miles</option>
                </select>

                <label for="currentDistance">Current Furthest Distance</label>
                <input id="currentDistance" type="number" />

                <label for="goalDistance">Goal Distance</label>
                <input id="goalDistance" type="number" />
               
                <label for="daysPerWeek">Training Days per Week</label>
                <input type="range" id="daysPerWeek" value={daysPerWeek} min="1" max="7" onChange={(e) => updateSlider(e)} />
                <output>{daysPerWeek}</output>

                <label for="startDate">Start Date</label>
                <input id="startDate" type="date" />

                <label for="goalDate">Goal Date</label>
                <input id="goalDate" type="date" />
            </fieldset>
        </form>
    );
}

export default PlanInputs;