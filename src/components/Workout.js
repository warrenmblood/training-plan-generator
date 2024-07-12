import React from "react";

function Workout({ title, desc, terms }) {
    return(
        <div className="workout">
            <div className="title">{title}</div>
            <div className="description">{desc}</div>
            <div className="definitions">
                {Object.keys(terms).map(key => (
                    <div className="definition">
                        <span>{terms[key].term}: </span>{terms[key].def}
                    </div>
                ))}
            </div>
        </div>

    );
}

export default Workout;