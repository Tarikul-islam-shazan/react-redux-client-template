import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import ActivityLog from "./ActivityLog";
import {addImageSuffix, authUserInfo} from "../../../services/Util";

const TimelineActivityLog = ({toggleAddComment, setLoader}) => {
    const timelineStore = useSelector(store => store.timelineStore)

    const renderTimeline = () => {
        return timelineStore?.data?.map((item, index) => {
            return <ActivityLog activity={item} key={`timeline_${index}`} setLoader={setLoader}/>
        })
    }

    return (
        <>
            <div className="one-third activity-logs">
                <div className="top-write-comments" onClick={toggleAddComment}>
                    <div className="comments-button cursor-pointer">
                        <p className="regular-12 mb-0">
                            <img
                                src={addImageSuffix(
                                    authUserInfo().profilePicDocument.docUrl,
                                    "_xicon"
                                )}
                                alt="profile"
                                className="profile-image"
                            />
                            Write comment...
                        </p>
                        <img src="/icons/attachment.svg" alt="attach"/>
                    </div>
                </div>
                <div className="activity-list">
                    {renderTimeline()}
                </div>
            </div>
        </>
    )
}

export default TimelineActivityLog