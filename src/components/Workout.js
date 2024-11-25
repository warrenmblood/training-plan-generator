import React from "react";

function Workout({ planDate, title, desc, terms }) {

    const dateFormat = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    
    return(
        <div className="workout">
            <div className="date">{planDate.toLocaleDateString("en-US", dateFormat)}</div>
            <div className="title">{title}</div>
            <div className="description">{desc}</div>
            <div className="definitions">
                {terms.map(item => (
                    <div className="definition">
                        <span>{item.term}: </span>{item.def}
                    </div>
                ))}
            </div>
        </div>

    );
}

export default Workout;