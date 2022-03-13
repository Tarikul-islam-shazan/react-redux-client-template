import React from "react";
import AllProductionList from "./AllProductionList";

const TimelineProductionDetails = ({setLoader}) => {
    return (
        <>
            <div className="tab-none">
                <AllProductionList setLoader={setLoader}/>
            </div>
        </>
    )
}

export default TimelineProductionDetails