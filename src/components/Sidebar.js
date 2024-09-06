import React, { useEffect, useState } from "react";

function Sidebar({ savedPlans, setPlan }) {
    const [active, setActive] = useState(false);
    const [selected, setSelected] = useState({});

    const activateSidebar = () => setActive(!active);

    useEffect(() => {
        setPlan(selected);
    }, [selected]);

    return(
        <div className={`sidebar${active ? " active" : ""}`}>
            <div className="header">
                <span className="title">Saved Plans</span>
                <button onClick={activateSidebar}>&#9776;</button>
            </div>
            <ol className="plan-list">
                {savedPlans.map(plan => (
                    <li className="saved-plan">
                        <button type="submit" onClick={() => setSelected(plan)}>{plan.name}</button>
                    </li>
                ))}
            </ol>
        </div>
    );

}

export default Sidebar;