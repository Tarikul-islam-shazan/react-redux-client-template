import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ActivityLog from "./ActivityLog";
import {addImageSuffix, authUserInfo, isPageReachBottom, onErrorImageLoad} from "../../../services/Util";
import { fetchTimeline } from "../../store/action/Timeline";
import { useParams } from "react-router-dom";

const TimelineActivityLog = ({ toggleAddComment, setLoader }) => {
    const timelineStore = useSelector((store) => store.timelineStore);
    const dispatch = useDispatch();
    const myStateRef = useRef({});
    const params = useParams();

    const setMyState = (data) => {
        myStateRef.current = data;
    };

    useEffect(() => {
        setMyState(timelineStore);
    }, [timelineStore]);

    useEffect(() => {
        document.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (isPageReachBottom()) {
            let { totalElements, totalPages, currentPage, selectedDesignList } = myStateRef.current;
            if (totalElements > 0 && totalPages > currentPage) {
                let paramString;
                if (selectedDesignList?.length > 0) {
                    paramString = `${params.orderId}?page=${
                        currentPage + 1
                    }&size=15&productIds=${selectedDesignList?.join(",")}`;
                } else {
                    paramString = `${params.orderId}?page=${currentPage + 1}&size=15`;
                }
                setLoader(true);
                dispatch(fetchTimeline(paramString, true)).finally(() => setLoader(false));
            }
        }
    };

    const renderTimeline = () => {
        if (timelineStore?.data?.length > 0) {
            return timelineStore?.data?.map((item, index) => {
                return (
                    <ActivityLog
                        index={index}
                        activity={item}
                        key={`timeline_${index}`}
                        setLoader={setLoader}
                    />
                );
            });
        } else {
            return <p className="no-activity-text"> No activity found for this style</p>;
        }
    };

    return (
        <>
            <div className="one-third activity-logs">
                <div className="top-write-comments" onClick={toggleAddComment}>
                    <div className="comments-button cursor-pointer">
                        <p className="regular-12 mb-0">
                            <img
                                src={addImageSuffix(
                                    authUserInfo()?.profilePicDocument?.docUrl,
                                    "_xicon"
                                )}
                                onError={(e) => onErrorImageLoad(e, authUserInfo()?.profilePicDocument?.docUrl)}
                                alt="profile"
                                className="profile-image"
                            />
                            Write comment...
                        </p>
                        <img src="/icons/attachment.svg" alt="attach" />
                    </div>
                </div>
                <div className="activity-list">{renderTimeline()}</div>
            </div>
        </>
    );
};

export default TimelineActivityLog;
