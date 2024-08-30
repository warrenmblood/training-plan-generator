import React, { useState } from "react";

function Sidebar({ savedPlans }) {
    const [active, setActive] = useState(false);

    const activateSidebar = () => setActive(!active);
    
    return(
        <div className={`sidebar${active ? " active" : ""}`}>
            <div className="header" onClick={activateSidebar}>
                <span></span>
                <span>&#9776;</span>
            </div>
            <div className="plan-list">
                {savedPlans.map(plan => (
                    <div className="saved-plan">
                        {plan.name}
                    </div>
                ))}
            </div>
        </div>
    );

}

export default Sidebar;