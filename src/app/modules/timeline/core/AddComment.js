import React, {useEffect, useRef, useState} from "react";
import Modal from "react-bootstrap/Modal";
import {addImageSuffix, authUserInfo, getMentionedUserIds, mentionModule,} from "../../../services/Util";
import {SelectedFileViewComponent} from "../../../pages/task/components/TaskManageComponents/SelectedFileViewComponent";
import Http from "../../../services/Http";
import {toastError, toastSuccess} from "../../../commonComponents/Toast";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import LoaderComponent from "../../../commonComponents/Loader";
import {addNewCommentOnTimeline} from "../../store/action/Timeline";
import ReactQuill from "react-quill";

const AddComment = ({toggleAddComment, openModal}) => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState({});
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [memberList, setMemberList] = useState([]);
    const params = useParams();
    const timelineStore = useSelector((store) => store.timelineStore);
    const [taskList, setTaskList] = useState([]);
    const [taskListHistory, setTaskListHistory] = useState([]);
    const [taskSearch, setTaskSearch] = useState("");
    const dispatch = useDispatch();
    const postInputRef = useRef(null);
    const [quillDisable, setQuillDisable] = useState(false)

    useEffect(() => {
        if (timelineStore?.selectedDesignList) {
            setLoader(true);
            Http.GET("getDesignWiseTaskList", `${params.orderId}/${timelineStore?.selectedDesignList[0]}`)
                .then((response) => {
                    setTaskList(response.data);
                    setTaskListHistory(response.data);
                    setLoader(false);
                })
                .catch((error) => {
                    setLoader(false);
                });
        }
    }, [timelineStore]);

    useEffect(() => {
        if (timelineStore?.orderInfo?.orderMemberList) {
            let members = [];
            let tmpList = timelineStore?.orderInfo?.orderMemberList;
            tmpList.map((member) => members.push({id: member.email, value: member.memberName}));
            setMemberList(members);
        }
    }, [timelineStore]);

    const handleTask = (task) => {
        let errorObj = {...error};
        errorObj["taskError"] = undefined;
        setError(errorObj);
        setSelectedTask(task);
        setTaskList(taskListHistory);
    };

    const renderTaskList = () => {
        return (
            <>
                <div className="task-search">
                    <input
                        type="text"
                        onChange={handleTaskSearch}
                        value={taskSearch}
                        placeholder="Search task"
                    />
                </div>
                {
                    taskList?.map((task, index) => {
                        return (
                            <li key={`task_${index}`}
                                className={selectedTask?.stepName === task.stepName ? "selected" : ""}
                                onClick={() => handleTask(task)}>
                                <span>{task.stepName}</span>
                            </li>
                        );
                    })
                }
            </>
        )
    };

    const checkValidation = () => {
        let errors = {};
        if (!selectedTask) {
            errors["taskError"] = "Required!";
        }
        let newComment = postInputRef.current === null ? "" : postInputRef?.current.toString().replace( /(<([^>]+)>)/ig, '');
        if (!newComment) {
            errors["commentError"] = "Comment required";
        }
        setError(errors);
        return Object.keys(errors).length > 0;
    };

    const handlePost = async () => {
        if (!checkValidation()) {
            setLoader(true);
            let message = postInputRef.current;
            let body = {
                documentDTOList: selectedFiles,
                orderId: parseInt(params.orderId),
                stepId: selectedTask.id,
                text: message.replace(/"/g, "'"),
                taggedUserIdList: timelineStore?.orderInfo?.orderMemberList
                    ? getMentionedUserIds(message, timelineStore?.orderInfo?.orderMemberList)
                    : [],
            };
            await Http.POST("postOnTask", body, "?fromTimeline=true")
                .then((response) => {
                    dispatch(addNewCommentOnTimeline(response.data.payload));
                    setLoader(false);
                    toggleAddComment();
                    toastSuccess("Comment Add Successful!");
                })
                .catch(({response}) => {
                    setLoader(false);
                    toastError(response.data.message);
                });
        }
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

    const handleTaskSearch = (e) => {
        let tmpArray = taskListHistory;
        if (tmpArray?.length > 0) {
            tmpArray = tmpArray.filter(
                (task) => task.stepName.toLowerCase().indexOf(e.target.value) > -1
            );
        }
        setTaskSearch(e.target.value);
        setTaskList(tmpArray);
    };

    return (
        <Modal
            show={openModal}
            aria-labelledby="example-custom-modal-timeline"
            onHide={toggleAddComment}
            size="lg"
            className="add-comment-popup"
        >
            <Modal.Body>
                <LoaderComponent loading={loader}>
                    <div>
                        <div className="common-popup">
                            <div className="common-popup-body">
                                <div className="top-write-comments">
                                    <div className="comments-header justify-content-between">
                                        <div className="header-contents d-flex align-items-end">
                                            <div className="profile-image">
                                                <img
                                                    src={addImageSuffix(
                                                        authUserInfo().profilePicDocument.docUrl,
                                                        "_xicon"
                                                    )}
                                                    alt="profile"
                                                />
                                            </div>
                                            <div className="design-select">
                                                <p className="comments-hint gray_dark_02 mr-2">
                                                    Comments on:
                                                </p>
                                            </div>
                                            <div
                                                className="tast-select"
                                                onClick={() => setQuillDisable(true)}
                                            >
                                                <div className="dropdown">
                                                    <button
                                                        className="btn dropdown-toggle"
                                                        type="button"
                                                        id="dropdownMenuButton"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                    >
                                                        {selectedTask?.stepName || "Select Task"}
                                                    </button>
                                                    <div
                                                        onBlur={() => setTimeout(() => {
                                                            setTaskList(taskListHistory);
                                                            setTaskSearch("");
                                                        }, 500)}
                                                        className="dropdown-menu shadow-2dp"
                                                        aria-labelledby="dropdownMenuButton"
                                                    >
                                                        <ul className="select-task-list scroll-y-label">
                                                            {renderTaskList()}
                                                        </ul>
                                                    </div>
                                                </div>
                                                {error.taskError && (
                                                    <p className="error">{error.taskError}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="close-icon" onClick={toggleAddComment}>
                                            <img src="/icons/close.svg" alt="close"/>
                                        </div>
                                    </div>
                                    <div className="comments-body">
                                        <div className="comment-text clicked" onClick={() => setQuillDisable(false)}>
                                            <ReactQuill
                                                readOnly={quillDisable}
                                                name="post"
                                                debug="info"
                                                theme="bubble"
                                                onChange={(value) => (postInputRef.current = value)}
                                                className="custom-scrollbar"
                                                placeholder="Write comment…"
                                                modules={{mention: mentionModule(memberList, quillDisable)}}
                                            />
                                            {error.commentError && (
                                                <p className="error">{error.commentError}</p>
                                            )}
                                            {renderFilePreview()}
                                        </div>
                                        <div className="post-actions d-flex justify-content-end">
                                            <div className="attachment cursor-pointer mr-2">
                                                <label htmlFor="upload-input-file">
                                                    <img src="/icons/attachment.svg" alt="attach"/>
                                                </label>
                                                <input
                                                    id="upload-input-file"
                                                    type="file"
                                                    name="selectedFiles"
                                                    onChange={(e) =>
                                                        onMultipleFileSelect(
                                                            e,
                                                            "ACCESSORIES_DESIGN"
                                                        )
                                                    }
                                                    multiple
                                                />
                                            </div>
                                            <button className="post-btn" onClick={handlePost}>
                                                Post
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </LoaderComponent>
            </Modal.Body>
        </Modal>
    );
};

export default AddComment;
