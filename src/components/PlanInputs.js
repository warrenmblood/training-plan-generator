import React, { useState } from "react";

function PlanInputs() {
    const [daysPerWeek, setDaysPerWeek] = useState(4);

    const updateSlider = (e) => {
        setDaysPerWeek(e.target.value);
    }

    return (
        <form>
            <fieldset className="planInputs">
                <label htmlFor="unit" className="entry">
                    Distance Unit
                    <select id="unit">
                        <option value="km">km</option>
                        <option value="miles">miles</option>
                    </select>
                </label>

                <label htmlFor="currentDistance" className="entry">
                    Current Furthest Distance
                    <input id="currentDistance" type="number" step="any" min="0" />
                </label>

                <label htmlFor="goalDistance" className="entry">
                    Goal Distance
                    <input id="goalDistance" type="number" step="any" min="0"/>
                </label>
               
                <label htmlFor="daysPerWeek" className="entry">
                    Runs per Week
                    <input type="range" id="daysPerWeek" value={daysPerWeek} min="1" max="7" onChange={(e) => updateSlider(e)} />
                    <output>{daysPerWeek}</output>
                </label>

                <label htmlFor="startDate" className="entry">
                    Start Date
                    <input id="startDate" type="date" />
                </label>

                <label htmlFor="goalDate" className="entry">
                    Goal Date
                    <input id="goalDate" type="date" />
                </label>

                <label htmlFor="name" className="entry">
                    Plan Name
                    <input id="name" type="text" />
                </label>

                <div className="submit entry">
                    <button type="submit" value="Generate Plan">Generate Plan</button>
                </div>
            </fieldset>
        </form>
    );
}

export default PlanInputs;