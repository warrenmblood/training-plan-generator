import React, { useState } from "react";

function Sidebar({ savedPlans, setPlan }) {
    const [active, setActive] = useState(false);

    const activateSidebar = () => setActive(!active);

    const selectPlan = (plan) => {
        const request = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(plan)
        };

        fetch("/api/currentPlan/put", request)
        .then(res => res.json())
        .then(data => {
            data.goalDate = new Date(data.goalDate);
            data.startDate = new Date(data.startDate);
            setPlan(data);
        });
    };

    return(
        <div className={`sidebar${active ? " active" : ""}`}>
            <div className="header">
                <span className="title">Saved Plans</span>
                <button onClick={activateSidebar}>&#9776;</button>
            </div>
            <ol className="plan-list">
                {savedPlans.map(plan => (
                    <li className="saved-plan">
                        <button type="submit" onClick={() => selectPlan(plan)}>{plan.name}</button>
                    </li>
                ))}
            </ol>
        </div>
    );

}

export default Sidebar;