import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import {addImageSuffix, authUserInfo} from "../../../services/Util";
import {SelectedFileViewComponent} from "../../../pages/task/components/TaskManageComponents/SelectedFileViewComponent";
import Http from "../../../services/Http";
import {toastError, toastSuccess} from "../../../commonComponents/Toast";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const AddComment = ({toggleAddComment, openModal, setLoader, activity}) => {
    const [selectedTask, setSelectedTask] = useState("")
    const [selectedDesign, setSelectedDesign] = useState("")
    const [error, setError] = useState({})
    const [message, setMessage] = useState("")
    const [selectedFiles, setSelectedFiles] = useState([])
    const [memberList, setMemberList] = useState([])
    const params = useParams()
    const timelineStore = useSelector(store => store.timelineStore)

    useEffect(() => {
        if (timelineStore?.memberList) {
            setMemberList(timelineStore.memberList.memberList)
        }
    }, [timelineStore])

    const renderTaskList = () => {
        return (
            <li
                onClick={() => setSelectedTask("Arrange materials for sampling")}
            >
                <span>Arrange materials for sampling</span>
            </li>
        )
    }

    const renderDesignList = () => {
        return (
            <li onClick={() => setSelectedDesign("NTX/A22/0001")}>
                <img src="/images/design5.png" alt="img"/>
                <span>NTX/A22/0001</span>
            </li>
        )
    }

    const checkValidation = () => {
        let errors = {}
        if (!selectedTask) {
            errors["taskError"] = "Required!"
        }
        if (!selectedDesign) {
            errors["designError"] = "Required!"
        }
        setError(errors)
        return Object.keys(errors).length > 0;
    }

    const handlePost = async () => {
        if (!checkValidation()) {
            setLoader(true)
            let body = {
                documentDTOList: selectedFiles,
                orderId: params.orderId,
                text: message.replace(/"/g, "'"),
                taggedUserIdList: [],
            };
            await Http.POST('commentOnTask', body)
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

    return (
        <Modal
            show={openModal}
            aria-labelledby="example-custom-modal-timeline"
            onHide={toggleAddComment}
            centered
        >
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
                                                {selectedDesign || "Select Design"}
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
                                                {selectedTask || "Task"}
                                            </button>
                                            <div className="dropdown-menu shadow-2dp"
                                                 aria-labelledby="dropdownMenuButton">
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
        </Modal>
    )
}

export default AddComment