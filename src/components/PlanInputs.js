import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { generatePlan, compareDates } from "../utils.js";

function PlanInputs({ setPlan, setSavedPlans, savedPlans, offDay, jargon }) {
    const [runsPerWeek, setRunsPerWeek] = useState(4);

    const updateSlider = (e) => setRunsPerWeek(e.target.value);

    const { 
        register,
        getValues,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = (data) => {
        const plan = generatePlan(data, offDay, jargon);
        setPlan(plan);
        const saved = [ ...savedPlans ];
        saved.push(plan);
        setSavedPlans(saved);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="plan-inputs">
                <div className="entry">
                    <label htmlFor="unit">Distance Unit</label>
                    <select
                        {...register("unit", {
                            required: "Unit is required",
                        })}
                        id="unit">
                        <option value="km">km</option>
                        <option value="mi">mi</option>
                    </select>
                    {errors.unit && (
                        <div className="error">errors.unit.message</div>
                    )}
                </div>
                <div className="entry">
                    <label htmlFor="startDistance">Current Distance</label>
                    <input
                        {...register("startDistance", {
                            required: "Current furthest distance is required",
                            valueAsNumber: true,
                        })}
                        id="startDistance"
                        type="number"
                        step="any"
                    />
                    {errors.startDistance && (
                        <div className="error">errors.startDistance.message</div>
                    )}
                </div>
                <div className="entry">
                    <label htmlFor="goalDistance">Goal Distance</label>
                    <input 
                        {...register("goalDistance", {
                            required: "Goal distance is required",
                            valueAsNumber: true,
                        })}
                        id="goalDistance"
                        type="number"
                        step="any"
                    />
                     {errors.goalDistance && (
                        <div className="error">errors.goalDistance.message</div>
                    )}
                </div>
                <div className="entry">
                    <label htmlFor="runsPerWeek">Runs per Week</label>
                    <input 
                        {...register("runsPerWeek", {
                            valueAsNumber: true,
                        })}
                        type="range"
                        id="runsPerWeek"
                        value={runsPerWeek}
                        min="1"
                        max="7"
                        onChange={(e) => updateSlider(e)}
                    />
                    <output>{runsPerWeek}</output>
                </div>
                <div className="entry">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                        {...register("startDate", {
                            required: "Start date is required",
                            valueAsDate: true,
                        })}
                        id="startDate" 
                        type="date" 
                    />
                </div>
                <div className="entry">
                    <label htmlFor="goalDate">Goal Date</label>
                    <input
                        {...register("goalDate", {
                            required: "Goal date is required",
                            valueAsDate: true,
                            validate: (value) => {
                                if(compareDates(getValues("startDate"), value) < 56) {
                                    return "Plan must be at least 8 weeks long";
                                }
                                return true;
                            },
                        })}
                        id="goalDate" 
                        type="date" 
                    />
                    {errors.goalDate && (
                        <div className="error">errors.goalDate.message</div>
                    )}
                </div>
                <div className="entry">
                    <label htmlFor="name">Plan Name</label>
                    <input {...register("name")} id="name" type="text" />
                </div>
                <div className="submit entry">
                    <button disabled={isSubmitting} type="submit" value="Generate Plan">
                        {isSubmitting ? "Loading..." : "Generate Plan"}
                    </button>
                </div>
            </fieldset>
        </form>
    );
}

export default PlanInputs;