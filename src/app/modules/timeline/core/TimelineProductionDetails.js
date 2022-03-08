import React from "react";
import AllProductionList from "./AllProductionList";

const TimelineProductionDetails = () => {
    return (
        <>
            <div className="tab-none">
                <AllProductionList/>
            </div>
            <div className="modal modal-right fade " id="all-production-details" tabIndex={-1} role="dialog"
                 aria-labelledby="right_modal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <img src="/icons/close.svg"/>
                            </button>
                        </div>
                        <div className="modal-body custom-scrollbar">
                            <AllProductionList/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TimelineProductionDetails