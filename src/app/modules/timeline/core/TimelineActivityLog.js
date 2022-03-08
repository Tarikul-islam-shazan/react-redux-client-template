import React from "react";

const TimelineActivityLog = () => {
    return (
        <div className="one-third activity-logs">
            <div className="top-write-comments">
                <div className="comments-button cursor-pointer">
                    <p className="regular-12 mb-0"><img src="/images/zahinul haque.png" alt="profile"
                                                        className="profile-image"/> Write comment...</p>
                    <img src="/icons/attachment.svg" alt="attach"/>
                </div>
            </div>
            <div className="activity-list">
                {/* Step */}
                {/* Added new task */}
                <div className="single-activity added-new-task">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="activity-icon"><img src="/icons/plus-square.svg" alt=""/></div>
                            <div className="activity-text">
                                <p className="regular-12"><span>Rakib</span> added new task<span> Technical Specifications</span>
                                </p>
                                <p className="time">25-Apr 12:16 pm</p>
                            </div>
                        </div>
                        <div className="design-image">
                            <img src="/images/design2.png" alt="design image"/>
                        </div>
                    </div>
                </div>
                {/* Assigned to task */}
                <div className="single-activity assigned-to-task">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="activity-icon"><img src="/icons/plus-square.svg" alt=""/></div>
                            <div className="activity-text">
                                <p className="regular-12"><span>Rakib</span> assigned<span> Imran to Technical Specifications</span>
                                </p>
                                <p className="time">25-Apr 12:16 pm</p>
                            </div>
                        </div>
                        <div className="design-image">
                            <img src="/images/design2.png" alt="design image"/>
                        </div>
                    </div>
                </div>
                {/* Removed member from task */}
                <div className="single-activity  removed-member">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="activity-icon"><img src="/icons/trash-2.svg" alt=""/></div>
                            <div className="activity-text">
                                <p className="regular-12"><span>Rakib</span> removed<span> Imran from Technical Specifications</span>
                                </p>
                                <p className="time">25-Apr 12:16 pm</p>
                            </div>
                        </div>
                        <div className="design-image">
                            <img src="/images/design2.png" alt="design image"/>
                        </div>
                    </div>
                </div>
                {/* Updated due date */}
                <div className="single-activity updated-due-date">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="activity-icon"><img src="/icons/calendar.svg" alt=""/></div>
                            <div className="activity-text">
                                <p className="regular-12"><span>Rakib</span> updated due date of <span> Technical Specifications</span>
                                </p>
                                <p className="regular-12">to <span>25-Apr 12:16 pm</span></p>
                                <p className="time">25-Apr 12:16 pm</p>
                            </div>
                        </div>
                        <div className="design-image">
                            <img src="/images/design2.png" alt="design image"/>
                        </div>
                    </div>
                </div>
                {/* Updated description date */}
                <div className="single-activity activity-with-header updated-description">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="activity-icon"><img src="/icons/Update.svg " alt=""/></div>
                            <div className="activity-text">
                                <p className="regular-12"><span>Rakib</span> updated description of <span> Technical Specifications</span>
                                </p>
                                <p className="time">25-Apr 12:16 pm</p>
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
                    </div>
                </div>
                {/* Action on step */}
                {/* Approved task  */}
                <div className="single-activity appoved-task">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="activity-icon"><img src="/icons/thumbs-up.svg" alt=""/></div>
                            <div className="activity-text">
                                <p className="regular-12">
                                    <span>Rakib</span> approved <span> Technical Specifications</span></p>
                                <p className="time">25-Apr 12:16 pm</p>
                            </div>
                        </div>
                        <div className="design-image">
                            <img src="/images/design2.png" alt="design image"/>
                        </div>
                    </div>
                </div>
                {/* Completed task  */}
                <div className="single-activity completed-task">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="activity-icon"><img src="/icons/check.svg" alt=""/></div>
                            <div className="activity-text">
                                <p className="regular-12">
                                    <span>Rakib</span> completed <span> Technical Specifications</span></p>
                                <p className="time">25-Apr 12:16 pm</p>
                            </div>
                        </div>
                        <div className="design-image">
                            <img src="/images/design2.png" alt="design image"/>
                        </div>
                    </div>
                </div>
                {/* Revision task  */}
                <div className="single-activity revision-task">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="activity-icon"><img src="/icons/Revision.svg" alt=""/></div>
                            <div className="activity-text">
                                <p className="regular-12"><span>Rakib</span> requested for revision on <span> Technical Specifications</span>
                                </p>
                                <p className="time">25-Apr 12:16 pm</p>
                            </div>
                        </div>
                        <div className="design-image">
                            <img src="/images/design2.png" alt="design image"/>
                        </div>
                    </div>
                </div>
                {/* Stage */}
                {/* Completed task  */}
                <div className="single-activity completed-stage">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="activity-icon"><img src="/icons/check.svg" alt=""/></div>
                            <div className="activity-text">
                                <p className="regular-12"><span>Rakib</span> completed <span> sampling</span></p>
                                <p className="time">25-Apr 12:16 pm</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Update stage due date  */}
                <div className="single-activity updated-stage">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="activity-icon"><img src="/icons/calendar.svg" alt=""/></div>
                            <div className="activity-text">
                                <p className="regular-12"><span>Rakib</span> updated due date
                                    of<span> sampling</span> to <span>25-Apr 12:16 pm</span></p>
                                <p className="time">25-Apr 12:16 pm</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Conversation */}
                {/* Added comment*/}
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
                {/* Replied */}
                <div className="single-activity activity-with-header replied-comment">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="person-profile"><img src="/images/zahinul haque.png" alt=""/>
                            </div>
                            <div className="activity-text">
                                <p className="regular-12"><span>Rakib</span> replied on<span> Sample requisition to sampling department</span> 25-Apr
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
                        <div className="reply-btn ">
                            <button className="button text">Reply</button>
                        </div>
                        <div className="details-btn">
                            <button className="button text">View details <img
                                src="/icons/comments-btn-arrow.svg" alt="arrow"/></button>
                        </div>
                    </div>
                </div>
                {/* Edit comment */}
                <div className="single-activity activity-with-header edit-comment">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="person-profile"><img src="/images/zahinul haque.png" alt=""/>
                            </div>
                            <div className="activity-text">
                                <p className="regular-12"><span>Rakib</span> edited comment on<span> Sample requisition to sampling department</span> 25-Apr
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
                            </div>
                        </div>
                        <div className="details-btn">
                            <button className="button text">View details <img
                                src="/icons/comments-btn-arrow.svg" alt="arrow"/></button>
                        </div>
                    </div>
                </div>
                {/* Deleted comment */}
                <div className="single-activity activity-with-header deleted-comment">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="person-profile"><img src="/images/zahinul haque.png" alt=""/>
                            </div>
                            <div className="activity-text">
                                <p className="regular-12"><span>Rakib</span> deleted comment on <span> Sample requisition to sampling department</span> 25-Apr
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
                            </div>
                        </div>
                        <div className="details-btn">
                            <button className="button text">View details <img
                                src="/icons/comments-btn-arrow.svg" alt="arrow"/></button>
                        </div>
                    </div>
                </div>
                {/* Style */}
                {/* Update stage   */}
                <div className="single-activity updated-stage">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="activity-icon"><img src="/icons/Update.svg " alt=""/></div>
                            <div className="activity-text">
                                <p className="regular-12"><span>Rakib</span> updated measurment chart</p>
                                <p className="time">25-Apr 12:16 pm</p>
                            </div>
                        </div>
                        <div className="design-image">
                            <img src="/images/design2.png" alt="design image"/>
                        </div>
                    </div>
                </div>
                {/* Order  */}
                {/* Update stage   */}
                <div className="single-activity updated-stage">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="activity-icon"><img src="/icons/Update.svg" alt=""/></div>
                            <div className="activity-text">
                                <p className="regular-12"><span>Rakib</span> updated color &amp; sizewise quantity </p>
                                <p className="time">25-Apr 12:16 pm</p>
                            </div>
                        </div>
                        <div className="design-image">
                            <img src="/images/design2.png" alt="design image"/>
                        </div>
                    </div>
                </div>
                {/* Update ETD   */}
                <div className="single-activity updated-etd">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="activity-icon"><img src="/icons/Update.svg" alt=""/></div>
                            <div className="activity-text">
                                <p className="regular-12"><span>Rakib</span> updated
                                    ETD<span> to 25-Apr 12:16 pm </span></p>
                                <p className="time">25-Apr 12:16 pm</p>
                            </div>
                        </div>
                        <div className="design-image">
                            <img src="/images/design2.png" alt="design image"/>
                        </div>
                    </div>
                </div>
                {/* Started order   */}
                <div className="single-activity start-order ">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="activity-icon"><img src="/icons/start-order.svg " alt=""/></div>
                            <div className="activity-text">
                                <p className="regular-12"><span>Rakib</span> started this order</p>
                                <p className="time">25-Apr 12:16 pm</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Completed order   */}
                <div className="single-activity complete-order">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="activity-icon"><img src="/icons/check.svg" alt=""/></div>
                            <div className="activity-text">
                                <p className="regular-12"><span>Rakib</span> completed this order</p>
                                <p className="time">25-Apr 12:16 pm</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Updated incoterm   */}
                <div className="single-activity updated-incoterm">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="activity-icon"><img src="/icons/Update.svg " alt=""/></div>
                            <div className="activity-text">
                                <p className="regular-12"><span>Rakib</span> updated incoterm <span>to FOB</span></p>
                                <p className="time">25-Apr 12:16 pm</p>
                            </div>
                        </div>
                        <div className="design-image">
                            <img src="/images/design2.png" alt="design image"/>
                        </div>
                    </div>
                </div>
                {/* Updated price   */}
                <div className="single-activity updated-price">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="activity-icon"><img src="/icons/Update.svg " alt=""/></div>
                            <div className="activity-text">
                                <p className="regular-12"><span>Rakib</span> updated price</p>
                                <p className="time">25-Apr 12:16 pm</p>
                            </div>
                        </div>
                        <div className="design-image">
                            <img src="/images/design2.png" alt="design image"/>
                        </div>
                    </div>
                </div>
                {/* Updated po   */}
                <div className="single-activity updated-po">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="activity-icon"><img src="/icons/Update.svg " alt=""/></div>
                            <div className="activity-text">
                                <p className="regular-12"><span>Rakib</span> updated PO# to <span
                                    className="pi-title"> NTX/22/01/0027</span></p>
                                <p className="time">25-Apr 12:16 pm</p>
                            </div>
                        </div>
                        <div className="design-image">
                            <img src="/images/design2.png" alt="design image"/>
                        </div>
                    </div>
                </div>
                {/* Proforma Invoice */}
                {/* Updated po   */}
                <div className="single-activity send-po">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="activity-icon"><img src="/icons/send.svg" alt=""/></div>
                            <div className="activity-text">
                                <p className="regular-12"><span>Rakib</span> sent you an PI: <span
                                    className="pi-title"> NTX/22/01/0027</span></p>
                                <p className="time">25-Apr 12:16 pm</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* acknowldeged approval  */}
                <div className="single-activity acknowldeged">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="activity-icon"><img src="/icons/Update.svg" alt=""/></div>
                            <div className="activity-text">
                                <p className="regular-12"><span>Rakib</span> acknowldeged approval of PI: <span
                                    className="pi-title"> NTX/22/01/0027</span></p>
                                <p className="time">25-Apr 12:16 pm</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* updated terms  */}
                <div className="single-activity updated-terms">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="activity-icon"><img src="/icons/Update.svg" alt=""/></div>
                            <div className="activity-text">
                                <p className="regular-12"><span>Rakib</span> updated terms &amp; conditions of PI: <span
                                    className="pi-title"> NTX/22/01/0027</span></p>
                                <p className="time">25-Apr 12:16 pm</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Beneficiary details  */}
                <div className="single-activity activity-with-header address-update">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="activity-icon"><img src="/icons/Update.svg" alt=""/></div>
                            <div className="activity-text">
                                <p className="regular-12"><span>Rakib</span> updated shiping details in PI:<span
                                    className="pi-title"> NTX/22/01/0027</span></p>
                                <p className="time">25-Apr 12:16 pm</p>
                            </div>
                        </div>
                    </div>
                    <div className="activity-common-body">
                        <div className="info-details">
                            <p>TEDDY SMITH</p>
                            <p>ZONE INDUSTRIELLE ALBI SAINT JUERY 205 ROUTE DE MILLAU 81000, ALBI, OCCITANIE</p>
                            <p>New York</p>
                            <p>Northeastern U.S</p>
                            <p>USA</p>
                        </div>
                    </div>
                </div>
                {/* Beneficiary bank details  */}
                <div className="single-activity activity-with-header address-update ">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="activity-icon"><img src="/icons/Update.svg" alt=""/></div>
                            <div className="activity-text">
                                <p className="regular-12"><span>Rakib</span> updated buyer address in PI:<span
                                    className="pi-title"> NTX/22/01/0027</span></p>
                                <p className="time">25-Apr 12:16 pm</p>
                            </div>
                        </div>
                    </div>
                    <div className="activity-common-body">
                        <div className="info-details">
                            <p>TEDDY SMITH</p>
                            <p>ZONE INDUSTRIELLE ALBI SAINT JUERY 205 ROUTE DE MILLAU 81000, ALBI, OCCITANIE</p>
                            <p>New York</p>
                            <p>Northeastern U.S</p>
                            <p>USA</p>
                        </div>
                    </div>
                </div>
                {/* Beneficiary details */}
                <div className="single-activity activity-with-header address-update ">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="activity-icon"><img src="/icons/Update.svg" alt=""/></div>
                            <div className="activity-text">
                                <p className="regular-12"><span>Rakib</span> updated Nitex Beneficiary details in
                                    PI: <span className="pi-title"> NTX/22/01/0027</span></p>
                                <p className="time">25-Apr 12:16 pm</p>
                            </div>
                        </div>
                    </div>
                    <div className="activity-common-body">
                        <div className="info-details">
                            <p>NITEX PTE. LTD.</p>
                            <p>20 Collyer Quay, #09-01 Singapore 049319, Singapore</p>
                            <p>www.nitex.com</p>
                        </div>
                    </div>
                </div>
                {/* Beneficiary bank details */}
                <div className="single-activity activity-with-header address-update ">
                    <div className="activity-common-header justify-content-between">
                        <div className="activity-content d-flex">
                            <div className="activity-icon"><img src="/icons/Update.svg" alt=""/></div>
                            <div className="activity-text">
                                <p className="regular-12"><span>Rakib</span> updated Nitex Beneficiary details in
                                    PI: <span className="pi-title"> NTX/22/01/0027</span></p>
                                <p className="time">25-Apr 12:16 pm</p>
                            </div>
                        </div>
                    </div>
                    <div className="activity-common-body">
                        <div className="info-details">
                            <p>NITEX PTE. LTD.</p>
                            <p>20 Collyer Quay, #09-01 Singapore 049319, Singapore</p>
                            <p>www.nitex.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimelineActivityLog