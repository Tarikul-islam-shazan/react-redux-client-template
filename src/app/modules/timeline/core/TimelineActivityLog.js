import React, {useEffect, useState} from "react";
import AddComment from "./AddComment";
import {useSelector, useDispatch} from "react-redux";
import LoaderComponent from "../../../commonComponents/Loader";
import {fetchTimeline} from "../../store/action/Timeline";
import {useParams} from "react-router-dom";
import ActivityLog from "./ActivityLog";

const TimelineActivityLog = () => {

    const [addComment, setAddComment] = useState(false);
    const timelineStore = useSelector(store => store.timelineStore)


    const toggleAddComment = () => {
        setAddComment(!addComment)
    }

    const renderTimeline = () => {
        return timelineStore?.data?.map((item, index) => {
            return <ActivityLog activity={item} key={`timeline_${index}`}/>
        })
    }

    return (
        <>
            <div className="one-third activity-logs">
                <div className="top-write-comments" onClick={toggleAddComment}>
                    <div className="comments-button cursor-pointer">
                        <p className="regular-12 mb-0">
                            <img
                                src="/images/zahinul haque.png"
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
            <AddComment toggleAddComment={toggleAddComment} openModal={addComment}/>
        </>
    )
}

export default TimelineActivityLog