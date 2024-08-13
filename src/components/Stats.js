import React from "react";

function Stats({ onPlan, currentWeek, planWeeks }) {
    return (
        <div className="stats">
            <p>{onPlan ? `Week ${currentWeek} of ${planWeeks}` : ""}</p>
        </div>
    );
}

export default Stats;