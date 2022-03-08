import React, {useEffect, useState} from "react";
import {parseHtml} from "../../../services/Util";

const ActivityLog = ({activity}) => {

    const [commentList, setCommentList] = useState([])

    useEffect(() => {
        console.log(activity)
        if (activity.body?.entityIdTypeMapList) {
            setCommentList(activity.body.entityIdTypeMapList)
        }
    }, [activity])

    const iconPath = () => {
        switch (activity.actionType) {
            case "TASK_COMPLETE":
                return "/icons/plus-square.svg"
            default:
                return ""
        }
    }

    const renderIconOrImage = () => {
        if (activity.actionType === "TASK_REGULAR_POST" || activity.actionType === "COMMENT") {
            return (
                <div className="person-profile">
                    <img src={activity.profileImage} alt=""/>
                </div>
            )
        } else {
            return (
                <div className="activity-icon">
                    <img src={iconPath()} alt=""/>
                </div>
            )
        }
    }

    const renderActivityText = () => {
        let string = [];
        let tmpArray = activity?.body?.titlePartList;
        tmpArray.map((item) => {
            if (item.titlePartType === "ACTOR" || item.titlePartType === "ACTED_UPON") {
                string.push(<span>{item.text} </span>)
            } else {
                string.push(item.text + " ")
            }
        })
        return (
            <p className="regular-12">{string}</p>
        )
    }

    const renderTimeLineImages = () => {
        let {timelineImages} = activity
        return <div className="body-style-images-row">
            {timelineImages[0] && <div className="single-one">
                <img src={timelineImages[0]} alt=""/>
            </div>}
            {timelineImages[1] && <div className="single-one">
                <img src={timelineImages[1]} alt=""/>
                {timelineImages?.length > 2 && <div className="more-style-count">
                    <div className="count-number">{timelineImages?.length - 2}+</div>
                </div>}
            </div>}
        </div>
    }

    const renderDescription = () => {
        return commentList?.map((comment, index) => {
            return <p className="description regular-12"
                      dangerouslySetInnerHTML={{__html: parseHtml(comment.text.toString('html'))}}
            />
        })
    }

    const renderActivityBody = () => {
        if (activity.actionType === "TASK_REGULAR_POST" || activity.actionType === "COMMENT") {
            return (
                <div className="activity-common-body">
                    {renderDescription()}
                    {renderTimeLineImages()}
                    <div className="reply-btn ">
                        <button className="button text">Reply</button>
                    </div>
                    <div className="reply-container">
                        <div className="comments-body">
                            <div className="comment-text clicked">
                                <div className="reply-box">
                                    <img src="/images/zahinul haque.png" alt=""
                                         className="profile-image"/>
                                    <input type="text" placeholder="Write reply......"/>
                                </div>
                                <div className="attachment cursor-pointer">
                                    <label htmlFor="upload-input-file"><img src="/icons/attachment.svg"
                                                                            alt="attach"/></label>
                                    <input id="upload-input-file" type="file" name="selectedFiles" multiple/>
                                </div>
                                <div className="files-n-photos custom-scrollbar open">
                                    <div className="item">
                                        <div className="close">
                                            <svg width={16} height={16} viewBox="0 0 16 16" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <circle cx={8} cy={8} r={8} fill="#8B8B8B"/>
                                                <path
                                                    d="M11.5 5.205L10.795 4.5L8 7.295L5.205 4.5L4.5 5.205L7.295 8L4.5 10.795L5.205 11.5L8 8.705L10.795 11.5L11.5 10.795L8.705 8L11.5 5.205Z"
                                                    fill="white"/>
                                            </svg>
                                        </div>
                                        <a target="_blank"><img src="/images/design3.png" alt="photo"/></a>
                                    </div>
                                    <div className="item">
                                        <div className="close">
                                            <svg width={16} height={16} viewBox="0 0 16 16" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <circle cx={8} cy={8} r={8} fill="#8B8B8B"/>
                                                <path
                                                    d="M11.5 5.205L10.795 4.5L8 7.295L5.205 4.5L4.5 5.205L7.295 8L4.5 10.795L5.205 11.5L8 8.705L10.795 11.5L11.5 10.795L8.705 8L11.5 5.205Z"
                                                    fill="white"/>
                                            </svg>
                                        </div>
                                        <a target="_blank"><img src="/images/design3.png" alt="photo"/></a>
                                    </div>
                                </div>
                            </div>
                            <div className="post-actions">
                                <button className="cancel">Cancel</button>
                                <button className="post-btn">Post</button>
                            </div>
                        </div>
                        <div className="details-btn">
                            <button className="button text">View details <img
                                src="/icons/comments-btn-arrow.svg" alt="arrow"/></button>
                        </div>
                    </div>
                </div>
            )
        }
    }


    return (
        <div className="single-activity activity-with-header added-comment">
            <div className="activity-common-header justify-content-between">
                <div className="activity-content d-flex">
                    {renderIconOrImage()}
                    <div className="activity-text">
                        {renderActivityText()}
                    </div>
                </div>
                <div className="design-image">
                    <img src="/images/design2.png" alt="design image"/>
                </div>
            </div>
            {renderActivityBody()}
        </div>
    )
}

export default ActivityLog