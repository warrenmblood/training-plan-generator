import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { generatePlan, compareDates } from "../utils.js";

function PlanInputs({ setPlan, savedPlans, setSavedPlans, offDay, jargon }) {
    const [runsPerWeek, setRunsPerWeek] = useState(4);

    const updateSlider = (e) => setRunsPerWeek(e.target.value);

    const { 
        register,
        getValues,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = (data, e) => {
        const plan = generatePlan(data, offDay, jargon);

        const request = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(plan)
        };

        fetch("/api/plans/put", request)
        .then(res => res.json())
        .then(data => {
            data.goalDate = new Date(data.goalDate);
            data.startDate = new Date(data.startDate);
            setSavedPlans([...savedPlans, data]);
        });

        fetch("/api/currentPlan/put", request)
        .then(res => res.json())
        .then(data => {
            data.goalDate = new Date(data.goalDate);
            data.startDate = new Date(data.startDate);
            setPlan(data);
        });
    
        e.target.reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="plan-inputs">
                <div className="entry">
                    <label htmlFor="unit">Distance Unit</label>
                    <select
                        {...register("unit", {
                            required: "Required field.",
                        })}
                        id="unit">
                        <option value="mi">mi</option>
                        <option value="km">km</option>
                    </select>
                    {errors.unit && (
                        <div className="error">{errors.unit.message}</div>
                    )}
                </div>
                <div className="entry">
                    <label htmlFor="startDistance">Current Distance</label>
                    <input
                        {...register("startDistance", {
                            required: "Required field.",
                            valueAsNumber: true,
                            min: {
                                value: 1,
                                message: "Enter distance of at least 1."
                            },
                            max: {
                                value: 100,
                                message: "Distance cannot exceed 100."
                            },
                        })}
                        id="startDistance"
                        type="number"
                        step="any"
                    />
                    {errors.startDistance && (
                        <div className="error">{errors.startDistance.message}</div>
                    )}
                </div>
                <div className="entry">
                    <label htmlFor="goalDistance">Goal Distance</label>
                    <input 
                        {...register("goalDistance", {
                            required: "Required field.",
                            valueAsNumber: true,
                            min: {
                                value: 0,
                                message: "Enter a valid distance."
                            },
                            max: {
                                value: 100,
                                message: "Distance cannot exceed 100."
                            },
                            validate: (value) => {
                                if(!(value > getValues("startDistance"))) {
                                    return "Goal distance must be greater than start distance.";
                                }
                                return true;
                            },
                        })}
                        id="goalDistance"
                        type="number"
                        step="any"
                    />
                     {errors.goalDistance && (
                        <div className="error">{errors.goalDistance.message}</div>
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
                            required: "Required field.",
                            valueAsDate: true,
                            validate: (value) => {
                                if(compareDates(new Date(), value) < -1) {
                                    return "Start date cannot be in the past.";
                                }
                                return true;
                            },
                        })}
                        id="startDate" 
                        type="date" 
                    />
                    {errors.startDate && (
                        <div className="error">{errors.startDate.message}</div>
                    )}
                </div>
                <div className="entry">
                    <label htmlFor="goalDate">Goal Date</label>
                    <input
                        {...register("goalDate", {
                            required: "Required field.",
                            valueAsDate: true,
                            validate: (value) => {
                                if (compareDates(getValues("startDate"), value) < 56) {
                                    return "Plan must be at least 8 weeks long.";
                                }
                                return true;
                            },
                        })}
                        id="goalDate" 
                        type="date" 
                    />
                    {errors.goalDate && (
                        <div className="error">{errors.goalDate.message}</div>
                    )}
                </div>
                <div className="entry">
                    <label htmlFor="name">Plan Name</label>
                    <input 
                        {...register("name", {
                            required: "Required field.",
                            minLength: {
                                value: 8,
                                message: "Plan name must be at least 8 characters."
                            },
                            maxLength: {
                                value: 30,
                                message: "Plan name cannot exceed 30 characters."
                            },
                        })}
                        id="name"
                        type="text"
                    />
                    {errors.name && (
                        <div className="error">{errors.name.message}</div>
                    )}
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