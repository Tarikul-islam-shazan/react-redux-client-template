import React, { useEffect, useState } from "react";
import { addImageSuffix, authUserInfo, parseHtml } from "../../../services/Util";
import Modal from "react-bootstrap/Modal";
import TaskManage from "../../../pages/task/components/TaskManage";
import { useParams } from "react-router-dom";
import { SelectedFileViewComponent } from "../../../pages/task/components/TaskManageComponents/SelectedFileViewComponent";
import Http from "../../../services/Http";
import { toastError, toastSuccess } from "../../../commonComponents/Toast";
import MoreDesign from "./MoreDesign";
import {useSelector} from "react-redux";

const ActivityLog = ({ activity, setLoader }) => {
    const timelineStore = useSelector((store) => store.timelineStore);
    const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [message, setMessage] = useState("");
    const [memberList, setMemberList] = useState([]);

    const params = useParams();

    useEffect(() => {
        if (timelineStore?.memberList) {
            setMemberList(timelineStore.memberList.memberList);
        }
    }, [timelineStore]);

    useEffect(() => {
        if (activity.body?.entityIdTypeMapList) {
            let comment = [];
            comment.push(activity.body.entityIdTypeMapList[0].text);
            setCommentList(comment);
        }
    }, [activity]);

    const iconPath = () => {
        switch (activity.actionType) {
            case "TASK_COMPLETE":
                return "/icons/plus-square.svg";
            default:
                return "";
        }
    };

    const renderIconOrImage = () => {
        if (activity.actionType === "TASK_REGULAR_POST" || activity.actionType === "COMMENT") {
            return (
                <div className="person-profile">
                    <img src={activity.profileImage} alt="" />
                </div>
            );
        } else {
            return (
                <div className="activity-icon">
                    <img src={iconPath()} alt="" />
                </div>
            );
        }
    };

    const renderActivityText = () => {
        let string = [];
        let tmpArray = activity?.body?.titlePartList;
        tmpArray.map((item) => {
            if (item.titlePartType === "ACTOR" || item.titlePartType === "ACTED_UPON") {
                string.push(<span>{item.text} </span>);
            } else {
                string.push(item.text + " ");
            }
        });
        return <p className="regular-12">{string}</p>;
    };

    const toggleImageModal = () => {
        setShowImageModal(!showImageModal);
    };

    const renderTimeLineImages = () => {
        let { timelineImages } = activity;
        return (
            <div className="body-style-images-row">
                {timelineImages[0] && (
                    <div className="single-one">
                        <img src={timelineImages[0]} alt="" />
                    </div>
                )}
                {timelineImages[1] && (
                    <div className="single-one">
                        <img src={timelineImages[1]} alt="" />
                        {timelineImages?.length > 2 && (
                            <div className="more-style-count" onClick={toggleImageModal}>
                                <div className="count-number">{timelineImages?.length - 2}+</div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    const renderDescription = () => {
        return commentList?.map((comment, index) => {
            return (
                <p
                    className={`description regular-12 ${index > 0 ? "pl-2" : ""}`}
                    dangerouslySetInnerHTML={{ __html: parseHtml(comment.toString("html")) }}
                />
            );
        });
    };

    const onMultipleFileSelect = (e, docType) => {
        let files = Array.from(e.target.files);
        let fileList = [...selectedFiles];
        files.map((item) => {
            let data = {
                name: item.name,
                docMimeType: item.type,
                documentType: docType,
                print: false,
            };
            let reader = new FileReader();
            reader.readAsDataURL(item);
            reader.onload = async () => {
                data.base64Str = reader.result;
                fileList.push(data);
            };
        });
        setTimeout(() => {
            setSelectedFiles(fileList);
        }, 500);
    };

    const removeFile = (index) => {
        let fileList = selectedFiles.filter((file, i) => i !== index);
        setSelectedFiles(fileList);
    };

    const renderFilePreview = () => {
        return (
            <div
                className={`files-n-photos custom-scrollbar ${selectedFiles.length ? `open` : ``}`}
                key={selectedFiles.length}
            >
                {selectedFiles.map((file, i) => {
                    return (
                        <SelectedFileViewComponent
                            showRemoveOption={true}
                            file={file}
                            key={i}
                            index={i}
                            remove={removeFile}
                        />
                    );
                })}
            </div>
        );
    };

    const cancelPost = () => {
        setIsReplying(false);
        setMessage("");
        setSelectedFiles([]);
    };

    const handleReply = async () => {
        setLoader(true);
        let body = {
            documentDTOList: selectedFiles,
            postId: activity?.body?.entityIdTypeMapList[0]?.id,
            postType: "COMMENT",
            text: message.replace(/"/g, "'"),
            taggedUserIdList: [],
        };
        await Http.POST("commentOnTask", body, "?fromTimeline=true")
            .then(({ data }) => {
                let tempCommentList = [...commentList];
                tempCommentList.push(message);
                setCommentList(tempCommentList);
                cancelPost();
                setLoader(false);
                toastSuccess("Replied Successful!");
            })
            .catch(({ response }) => {
                setLoader(false);
                toastError(response.data.message);
            });
    };

    const renderReplySection = () => {
        if (isReplying) {
            return (
                <div className="comments-body">
                    <div className="comment-text clicked">
                        <div className="reply-box">
                            <img
                                src={addImageSuffix(
                                    authUserInfo().profilePicDocument.docUrl,
                                    "_xicon"
                                )}
                                alt=""
                                className="profile-image"
                            />
                            <input
                                type="text"
                                value={message}
                                placeholder="Write reply......"
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                        <div className="attachment cursor-pointer">
                            <label htmlFor="upload-input-file">
                                <img src="/icons/attachment.svg" alt="attach" />
                            </label>
                            <input
                                id="upload-input-file"
                                type="file"
                                name="selectedFiles"
                                onChange={(e) => onMultipleFileSelect(e, "ACCESSORIES_DESIGN")}
                                multiple
                            />
                        </div>
                        {renderFilePreview()}
                    </div>
                    <div className="post-actions">
                        <button className="cancel" onClick={cancelPost}>
                            Cancel
                        </button>
                        <button className="post-btn" onClick={handleReply}>
                            Post
                        </button>
                    </div>
                </div>
            );
        }
    };

    const renderActivityBody = () => {
        if (activity.actionType === "TASK_REGULAR_POST" || activity.actionType === "COMMENT") {
            return (
                <div className="activity-common-body">
                    {renderDescription()}
                    {renderTimeLineImages()}
                    <div className="reply-btn ">
                        <button className="button text" onClick={() => setIsReplying(true)}>
                            Reply
                        </button>
                    </div>
                    <div className="reply-container">
                        {renderReplySection()}
                        <div className="details-btn">
                            <button
                                className="button text"
                                onClick={() => setShowTaskDetailsModal(true)}
                            >
                                View details
                                <img
                                    src="/icons/comments-btn-arrow.svg"
                                    alt="arrow"
                                    className="ml-1"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="single-activity activity-with-header added-comment">
            <div className="activity-common-header justify-content-between">
                <div className="activity-content d-flex">
                    {renderIconOrImage()}
                    <div className="activity-text">{renderActivityText()}</div>
                </div>
                <div className="design-image">
                    <img src={activity?.secondaryActedUpon?.docUrlList[0]} alt="design image" />
                </div>
            </div>
            {renderActivityBody()}
            <Modal
                show={showTaskDetailsModal}
                onHide={() => setShowTaskDetailsModal(false)}
                className="modal-right task-conversation"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <TaskManage
                    id={activity.id}
                    orderId={params.orderId}
                    closeModal={() => setShowTaskDetailsModal(false)}
                    callback={() => false}
                />
            </Modal>
            {showImageModal && (
                <MoreDesign
                    toggleModal={toggleImageModal}
                    openModal={showImageModal}
                    setLoader={setLoader}
                    imageList={activity?.timelineImages}
                />
            )}
        </div>
    );
};

export default ActivityLog;
