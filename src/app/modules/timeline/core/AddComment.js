import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import {addImageSuffix, authUserInfo} from "../../../services/Util";
import {SelectedFileViewComponent} from "../../../pages/task/components/TaskManageComponents/SelectedFileViewComponent";
import Http from "../../../services/Http";
import {toastError, toastSuccess} from "../../../commonComponents/Toast";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import LoaderComponent from "../../../commonComponents/Loader";

const AddComment = ({toggleAddComment, openModal, activity}) => {
    const [selectedTask, setSelectedTask] = useState(null)
    const [loader, setLoader] = useState(false)
    const [selectedDesign, setSelectedDesign] = useState(null)
    const [error, setError] = useState({})
    const [message, setMessage] = useState("")
    const [selectedFiles, setSelectedFiles] = useState([])
    const [memberList, setMemberList] = useState([])
    const params = useParams()
    const timelineStore = useSelector(store => store.timelineStore)
    const [designList, setDesignList] = useState([])
    const [taskList, setTaskList] = useState([])
    const [taskListHistory, setTaskListHistory] = useState([])

    useEffect(() => {
        if (selectedDesign !== null) {
            setLoader(true)
            Http.GET('getDesignWiseTaskList', `${params.orderId}/${selectedDesign.id}`)
                .then(response => {
                    setTaskList(response.data)
                    setTaskListHistory(response.data)
                    setLoader(false)
                }).catch(error => {
                setLoader(false)
            })
        }
    }, [selectedDesign])

    useEffect(() => {
        if (timelineStore?.memberList) {
            setMemberList(timelineStore.memberList.memberList)
        }
        if (timelineStore?.orderInfo?.orderProductList) {
            let productList = timelineStore?.orderInfo?.orderProductList;
            let tmpDesignList = []
            productList.map((design) => {
                tmpDesignList.push(design)
            })
            setDesignList(tmpDesignList)
        }
    }, [timelineStore])

    const renderTaskList = () => {
        return taskList?.map((task, index) => {
            return (
                <li
                    key={`task_${index}`}
                    onClick={() => setSelectedTask(task)}
                >
                    <span>{task.stepName}</span>
                </li>
            )
        })
    }

    const renderDesignList = () => {
        return designList?.map((design, index) => {
            return (
                <li key={`add_comment_design_${index}`} onClick={() => setSelectedDesign(design)}>
                    <img src={design.image} alt="img"/>
                    <span>{design.referenceNumber}</span>
                </li>
            )
        })
    }


    const checkValidation = () => {
        let errors = {}
        if (!selectedTask) {
            errors["taskError"] = "Required!"
        }
        if (!selectedDesign) {
            errors["designError"] = "Required!"
        }
        if (!message && selectedFiles.length === 0) {
            errors["commentError"] = "Message or attachment required"
        }
        setError(errors)
        return Object.keys(errors).length > 0;
    }

    const handlePost = async () => {
        if (!checkValidation()) {
            setLoader(true)
            let body = {
                documentDTOList: selectedFiles,
                orderId: parseInt(params.orderId),
                stepId: selectedTask.id,
                text: message.replace(/"/g, "'"),
                taggedUserIdList: [],
            };
            await Http.POST('postOnTask', body)
                .then(({data}) => {
                    setLoader(false)
                    toggleAddComment()
                    toastSuccess("Comment Add Successful!")
                })
                .catch(({response}) => {
                    setLoader(false)
                    toastError(response.data.message);
                });
        }
    }

    const onMultipleFileSelect = (e, docType) => {
        let files = Array.from(e.target.files);
        let fileList = [...selectedFiles]
        files.map((item) => {
            let data = {
                name: item.name, docMimeType: item.type, documentType: docType, print: false,
            };
            let reader = new FileReader();
            reader.readAsDataURL(item);
            reader.onload = async () => {
                data.base64Str = reader.result;
                fileList.push(data);
            };
        });
        setTimeout(() => {
            setSelectedFiles(fileList)
        }, 500)
    };

    const removeFile = (index) => {
        let fileList = selectedFiles.filter((file, i) => i !== index)
        setSelectedFiles(fileList)
    };

    const renderFilePreview = () => {
        return (<div
            className={`files-n-photos custom-scrollbar ${selectedFiles.length ? `open` : ``}`}
            key={selectedFiles.length}
        >
            {selectedFiles.map((file, i) => {
                return (<SelectedFileViewComponent
                    showRemoveOption={true}
                    file={file}
                    key={i}
                    index={i}
                    remove={removeFile}
                />);
            })}
        </div>)
    }

    const handleTaskSearch = (e) => {
        let tmpArray = taskListHistory;
        if (tmpArray?.length > 0) {
            tmpArray = tmpArray.filter(task => task.stepName.toLowerCase().indexOf(e.target.value) > -1)
        }
        setTaskList(tmpArray)
    }

    return (
        <Modal
            show={openModal}
            aria-labelledby="example-custom-modal-timeline"
            onHide={toggleAddComment}
            centered
        >
            <Modal.Body>
                <LoaderComponent loading={loader}>
                    <div className="popup-wrapper">
                        <div className="common-popup">
                            <div className="common-popup-body">
                                <div className="top-write-comments">
                                    <div className="comments-header justify-content-between">
                                        <div className="header-contents d-flex align-items-end">
                                            <div className="profile-image">
                                                <img
                                                    src={addImageSuffix(authUserInfo().profilePicDocument.docUrl, "_xicon")}
                                                    alt="profile"
                                                />
                                            </div>
                                            <div className="design-select">
                                                <p className="comments-hint gray_dark_02 mr-2">Comments on:</p>
                                                <div className="dropdown">
                                                    <button className="btn dropdown-toggle" type="button"
                                                            id="dropdownMenuButton"
                                                            data-toggle="dropdown" aria-haspopup="true"
                                                            aria-expanded="false">
                                                        {selectedDesign?.referenceNumber || "Select Design"}
                                                    </button>
                                                    <div className="dropdown-menu shadow-2dp"
                                                         aria-labelledby="dropdownMenuButton">
                                                        <ul className="select-design-list">
                                                            {renderDesignList()}
                                                        </ul>
                                                    </div>
                                                    {error.designError && <p className="error">{error.designError}</p>}
                                                </div>
                                            </div>
                                            <div className="tast-select">
                                                <div className="dropdown">
                                                    <button className="btn dropdown-toggle" type="button"
                                                            id="dropdownMenuButton"
                                                            data-toggle="dropdown" aria-haspopup="true"
                                                            aria-expanded="false">
                                                        {selectedTask?.stepName || "Task"}
                                                    </button>
                                                    <div className="dropdown-menu shadow-2dp"
                                                         aria-labelledby="dropdownMenuButton">
                                                        <input type="text" onChange={handleTaskSearch}/>
                                                        <ul className="select-task-list">
                                                            {renderTaskList()}
                                                        </ul>
                                                    </div>
                                                </div>
                                                {error.taskError && <p className="error">{error.taskError}</p>}
                                            </div>
                                        </div>
                                        <div className="close-icon" onClick={toggleAddComment}>
                                            <img src="/icons/close.svg" alt="close"/>
                                        </div>
                                    </div>
                                    <div className="comments-body">
                                        <div className="comment-text clicked">
                                    <textarea
                                        name
                                        id
                                        value={message}
                                        placeholder="Write comment..."
                                        defaultValue={""}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                            {error.commentError && <p className="error">{error.commentError}</p>}
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
                                                    onChange={(e) => onMultipleFileSelect(e, "ACCESSORIES_DESIGN")}
                                                    multiple
                                                />
                                            </div>
                                            <button className="post-btn" onClick={handlePost}>Post</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </LoaderComponent>
            </Modal.Body>
        </Modal>
    )
}

export default AddComment