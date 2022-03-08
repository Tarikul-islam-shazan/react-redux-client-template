import React from "react";
import TimelinePoDetails from "./core/TimelinePoDetails";
import TimelineActivityLog from "./core/TimelineActivityLog";
import TimelineProductionDetails from "./core/TimelineProductionDetails";

const Timeline = () => {
    return (
        <div className="buyer-timeline-container">
            <div className="timeline-row">
                <TimelinePoDetails/>
                <TimelineActivityLog/>
                <TimelineProductionDetails/>
            </div>
        </div>
    )
}

export default Timeline