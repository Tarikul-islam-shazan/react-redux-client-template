import React, {useState} from "react";
import AddComment from "./AddComment";

const TimelineActivityLog = () => {
    const [addComment, setAddComment] = useState(false);

    const toggleAddComment = () => {
        setAddComment(!addComment)
    }


    return (
        <>
            <div className="one-third activity-logs">
                <div className="top-write-comments">
                    <div className="comments-button cursor-pointer" onClick={toggleAddComment}>
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
                    <div className="single-activity activity-with-header added-comment">
                        <div className="activity-common-header justify-content-between">
                            <div className="activity-content d-flex">
                                <div className="person-profile"><img src="/images/zahinul haque.png" alt=""/>
                                </div>
                                <div className="activity-text">
                                    <p className="regular-12"><span>Rakib</span> added comment on<span> Sample requisition to sampling department</span> 25-Apr
                                        12:16 pm</p>
                                </div>
                            </div>
                            <div className="design-image">
                                <img src="/images/design2.png" alt="design image"/>
                            </div>
                        </div>
                        <div className="activity-common-body">
                            <p className="description regular-12">Lorem Ipsum is simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since
                                the...</p>
                            <div className="body-style-images-row">
                                <div className="single-one">
                                    <img src="/images/HBD-014_  F.png" alt=""/>
                                </div>
                                <div className="single-one">
                                    <img src="/images/HBD-014_  F.png" alt=""/>
                                    <div className="more-style-count">
                                        <div className="count-number">5+</div>
                                    </div>
                                </div>
                            </div>
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
                    </div>
                </div>
            </div>
            {addComment && <AddComment toggleAddComment={toggleAddComment}/>}
        </>
    )
}

export default TimelineActivityLog