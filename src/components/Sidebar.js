import React, { useState } from "react";

function Sidebar({ savedPlans }) {
    const [active, setActive] = useState(false);

    const activateSidebar = () => setActive(!active);
    
    return(
        <div className={`sidebar${active ? " active" : ""}`}>
            <div className="header">
                <span className="title">Saved Plans</span>
                <button onClick={activateSidebar}>&#9776;</button>
            </div>
            <ol className="plan-list">
                {savedPlans.map(plan => (
                    <li className="saved-plan">
                        {plan.name}
                    </li>
                ))}
            </ol>
        </div>
    );

}

export default Sidebar;