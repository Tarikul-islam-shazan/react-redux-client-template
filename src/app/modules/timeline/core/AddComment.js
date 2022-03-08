import React, {useState} from "react";

const AddComment = ({toggleAddComment}) => {
    const [selectedTask, setSelectedTask] = useState("")
    const [selectedDesign, setSelectedDesign] = useState("")
    const [error, setError] = useState({})

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

    const handlePost = () => {
        if (!checkValidation()) {
            toggleAddComment()
        }
    }

    return (
        <div className="popup-wrapper">
            <div className="common-popup">
                <div className="common-popup-body">
                    <div className="top-write-comments">
                        <div className="comments-header justify-content-between">
                            <div className="header-contents d-flex align-items-end">
                                <div className="profile-image">
                                    <img src="/images/jobaidu.png" alt="profile"/>
                                </div>
                                <div className="design-select">
                                    <p className="comments-hint gray_dark_02 mr-2">Comments on:</p>
                                    <div className="dropdown">
                                        <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {selectedDesign || "Select Design"}
                                        </button>
                                        <div className="dropdown-menu shadow-2dp" aria-labelledby="dropdownMenuButton">
                                            <ul className="select-design-list">
                                                {renderDesignList()}
                                            </ul>
                                        </div>
                                        {error.designError && <p className="error">{error.designError}</p>}
                                    </div>
                                </div>
                                <div className="tast-select">
                                    <div className="dropdown">
                                        <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {selectedTask || "Task"}
                                        </button>
                                        <div className="dropdown-menu shadow-2dp" aria-labelledby="dropdownMenuButton">
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
                                <textarea name id placeholder="Write comment..." defaultValue={""}/>
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
                                        <a target="_blank">
                                            <img src="/images/design3.png" alt="photo"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="post-actions d-flex justify-content-end">
                                <div className="attachment cursor-pointer mr-2">
                                    <label htmlFor="upload-input-file">
                                        <img src="/icons/attachment.svg" alt="attach"/>
                                    </label>
                                    <input id="upload-input-file" type="file" name="selectedFiles" multiple/>
                                </div>
                                <button className="post-btn" onClick={handlePost}>Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddComment