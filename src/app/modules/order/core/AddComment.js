import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import {
    addImageSuffix,
    authUserInfo,
    getMentionedUserIds,
    mentionModule,
    onErrorImageLoad
} from '../../../services/Util'
import Http from '../../../services/Http'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ReactQuill from 'react-quill'
import { addNewCommentOnTimeline } from '../../../redux_toolkit/Timeline/TimelineThunks'
import LoaderComponent from '../../../common/LoaderComponent'
import { toast } from 'react-toastify'
import { SelectedFileViewComponent } from '../../../common/SelectedFileViewComponent'

const AddComment = ({ toggleAddComment, openModal }) => {
    const [selectedTask, setSelectedTask] = useState(null)
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState({})
    const [selectedFiles, setSelectedFiles] = useState([])
    const [memberList, setMemberList] = useState([])
    const params = useParams()
    const timelineStore = useSelector((store) => store.timeline)
    const [taskList, setTaskList] = useState([])
    const [taskListHistory, setTaskListHistory] = useState([])
    const [taskSearch, setTaskSearch] = useState('')
    const dispatch = useDispatch()
    const postInputRef = useRef(null)
    const [quillDisable, setQuillDisable] = useState(false)
    const [openTask, setOpenTask] = useState(false)

    useEffect(() => {
        if (timelineStore?.selectedDesignList) {
            setLoader(true)
            Http.GET(
                'getDesignWiseTaskList',
                `${params.orderId}/${timelineStore?.selectedDesignList[0]}`
            )
                .then((response) => {
                    setTaskList(response.data)
                    setTaskListHistory(response.data)
                    setLoader(false)
                })
                .catch((error) => {
                    setLoader(false)
                })
        }
    }, [params.orderId, timelineStore])

    useEffect(() => {
        if (timelineStore?.orderInfo?.orderMemberList) {
            let members = []
            let tmpList = timelineStore?.orderInfo?.orderMemberList
            tmpList.map((member) =>
                members.push({ id: member.email, value: member.memberName })
            )
            setMemberList(members)
        }
    }, [timelineStore])

    const handleTask = (task) => {
        let errorObj = { ...error }
        errorObj['taskError'] = undefined
        setError(errorObj)
        setSelectedTask(task)
        setTaskList(taskListHistory)
        setOpenTask(false)
    }

    const renderTaskList = () => {
        return (
            <>
                <div className='task-search'>
                    <input
                        type='text'
                        onChange={handleTaskSearch}
                        value={taskSearch}
                        placeholder='Search task'
                        className='form-field'
                    />
                </div>
                {taskList?.map((task, index) => {
                    return (
                        <li
                            key={`task_${index}`}
                            className={
                                selectedTask?.stepName === task.stepName
                                    ? 'text-sm selected'
                                    : 'text-sm'
                            }
                            onClick={() => handleTask(task)}
                        >
                            <span>{task.stepName}</span>
                        </li>
                    )
                })}
            </>
        )
    }

    const checkValidation = () => {
        let errors = {}
        if (!selectedTask) {
            errors['taskError'] = 'Required!'
        }
        let newComment =
            postInputRef.current === null
                ? ''
                : postInputRef?.current.toString().replace(/(<([^>]+)>)/gi, '')
        if (!newComment) {
            errors['commentError'] = 'Comment required'
        }
        setError(errors)
        return Object.keys(errors).length > 0
    }

    const handlePost = async () => {
        if (!checkValidation()) {
            setLoader(true)
            let message = postInputRef.current
            let body = {
                documentDTOList: selectedFiles,
                orderId: parseInt(params.orderId),
                stepId: selectedTask.id,
                // text: message.replace(/"/g, "'"),
                taggedUserIdList: timelineStore?.orderInfo?.orderMemberList
                    ? getMentionedUserIds(
                          message,
                          timelineStore?.orderInfo?.orderMemberList
                      )
                    : []
            }
            await Http.POST('postOnTask', body, '?fromTimeline=true')
                .then((response) => {
                    dispatch(addNewCommentOnTimeline(response.data.payload))
                    setLoader(false)
                    toggleAddComment()
                    toast.success('Comment Add Successful!')
                })
                .catch(({ response }) => {
                    setLoader(false)
                    toast.error(response.data.message)
                })
        }
    }

    const onMultipleFileSelect = (e, docType) => {
        let files = Array.from(e.target.files)
        let fileList = [...selectedFiles]
        files.map((item) => {
            let data = {
                name: item.name,
                docMimeType: item.type,
                documentType: docType,
                print: false
            }
            let reader = new FileReader()
            reader.readAsDataURL(item)
            reader.onload = async () => {
                data.base64Str = reader.result
                fileList.push(data)
            }
        })
        setTimeout(() => {
            setSelectedFiles(fileList)
        }, 500)
    }

    const removeFile = (index) => {
        let fileList = selectedFiles.filter((file, i) => i !== index)
        setSelectedFiles(fileList)
    }

    const renderFilePreview = () => {
        return (
            <div
                className={`files-n-photos custom-scrollbar ${
                    selectedFiles.length ? 'open' : ''
                }`}
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
                    )
                })}
            </div>
        )
    }

    const handleTaskSearch = (e) => {
        let tmpArray = taskListHistory
        if (tmpArray?.length > 0) {
            tmpArray = tmpArray.filter(
                (task) =>
                    task.stepName.toLowerCase().indexOf(e.target.value) > -1
            )
        }
        setTaskSearch(e.target.value)
        setTaskList(tmpArray)
    }

    return (
        <>
            <div
                className='modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto'
                id='addCommentModal'
                tabIndex='-1'
                aria-labelledby='exampleModalCenterTitle'
                aria-modal='true'
                role='dialog'
            >
                <div className='modal-dialog max-w-[800px] modal-dialog-centered relative w-auto pointer-events-none'>
                    <div className='modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding outline-none text-current'>
                        <div className='modal-body relative'>
                            <LoaderComponent loading={loader}>
                                <div>
                                    <div className='common-popup'>
                                        <div className='common-popup-body'>
                                            <div className='top-write-comments'>
                                                <div className='comments-header justify-between'>
                                                    <div className='header-contents flex items-center'>
                                                        <div className='profile-image'>
                                                            <img
                                                                src={addImageSuffix(
                                                                    authUserInfo()
                                                                        ?.profilePicDocument
                                                                        ?.docUrl,
                                                                    '_xicon'
                                                                )}
                                                                onError={(e) =>
                                                                    onErrorImageLoad(
                                                                        e,
                                                                        authUserInfo()
                                                                            ?.profilePicDocument
                                                                            ?.docUrl
                                                                    )
                                                                }
                                                                alt='profile'
                                                            />
                                                        </div>
                                                        <div className='design-select'>
                                                            <p className='comments-hint gray_dark_02 mr-2'>
                                                                Comments on:
                                                            </p>
                                                        </div>
                                                        <div
                                                            className='tast-select'
                                                            onClick={() =>
                                                                setQuillDisable(
                                                                    true
                                                                )
                                                            }
                                                        >
                                                            <div className='dropdown'>
                                                                <button
                                                                    className='dropdown-toggle bg-transparent h-[24px]'
                                                                    type='button'
                                                                    id='dropdownDefault'
                                                                    data-dropdown-toggle='dropdown'
                                                                    onClick={() => setOpenTask(true)}
                                                                >
                                                                    {selectedTask?.stepName ||
                                                                        'Select Task'}
                                                                </button>
                                                                <div
                                                                    onBlur={() =>
                                                                        setTimeout(
                                                                            () => {
                                                                                setTaskList(
                                                                                    taskListHistory
                                                                                )
                                                                                setTaskSearch(
                                                                                    ''
                                                                                )
                                                                            },
                                                                            500
                                                                        )
                                                                    }
                                                                    className={`absolute bg-white z-10 top-11 shadow-md ${openTask ? 'open' : 'hidden'}`}
                                                                    aria-labelledby='dropdownMenuButton'
                                                                    id='dropdown'
                                                                >
                                                                    <ul className='select-task-list scroll-y-label' onBlur={() => setOpenTask(false)}>
                                                                        {renderTaskList()}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            {error.taskError && (
                                                                <p className='error'>
                                                                    {
                                                                        error.taskError
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className='close-icon cursor-pointer'
                                                        data-bs-dismiss='modal'
                                                        aria-label='Close'
                                                    >
                                                        <img
                                                            src='/icons/close.svg'
                                                            alt='close'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='comments-body'>
                                                    <div
                                                        className='comment-text clicked'
                                                        onClick={() =>
                                                            setQuillDisable(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        <ReactQuill
                                                            readOnly={
                                                                quillDisable
                                                            }
                                                            name='post'
                                                            debug='info'
                                                            theme='bubble'
                                                            onChange={(value) =>
                                                                (postInputRef.current =
                                                                    value)
                                                            }
                                                            className='custom-scrollbar'
                                                            placeholder='Write comment…'
                                                            // modules={{ mention: mentionModule(memberList, quillDisable) }}
                                                        />
                                                        {error.commentError && (
                                                            <p className='error'>
                                                                {
                                                                    error.commentError
                                                                }
                                                            </p>
                                                        )}
                                                        {renderFilePreview()}
                                                    </div>
                                                    <div className='post-actions flex justify-end items-center h-[60px]'>
                                                        <div className='attachment cursor-pointer mr-2'>
                                                            <label htmlFor='upload-input-file'>
                                                                <img
                                                                    src='/icons/attachment.svg'
                                                                    alt='attach'
                                                                />
                                                            </label>
                                                            <input
                                                                id='upload-input-file'
                                                                type='file'
                                                                name='selectedFiles'
                                                                onChange={(e) =>
                                                                    onMultipleFileSelect(
                                                                        e,
                                                                        'ACCESSORIES_DESIGN'
                                                                    )
                                                                }
                                                                multiple
                                                            />
                                                        </div>
                                                        <button
                                                            className='post-btn'
                                                            onClick={handlePost}
                                                        >
                                                            Post
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </LoaderComponent>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddComment
