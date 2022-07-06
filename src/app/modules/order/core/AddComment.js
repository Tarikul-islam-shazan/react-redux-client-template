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
import SelectComponent from '../../../common/SelectComponent'

const AddComment = ({ toggleAddComment, openModal }) => {
    const [selectedTask, setSelectedTask] = useState(null)
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState({})
    const [selectedFiles, setSelectedFiles] = useState([])
    const [memberList, setMemberList] = useState([])
    const params = useParams()
    const timelineStore = useSelector((store) => store.timeline)
    const [taskList, setTaskList] = useState([])
    const dispatch = useDispatch()
    const postInputRef = useRef(null)
    const [quillDisable, setQuillDisable] = useState(false)

    useEffect(() => {
        return () => console.log('==================')
    },[])

    useEffect(() => {
        if (timelineStore?.selectedDesignList) {
            setLoader(true)
            Http.GET(
                'getDesignWiseTaskList',
                `${params.orderId}/${timelineStore?.selectedDesignList[0]}`
            )
                .then((response) => {
                  let tmpList = []
                  for(let item of response.data){
                    tmpList.push({ label: item.stepName, value: item.id })
                  }

                    setTaskList(tmpList)
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

    return (
        <>
            <div
              className='modal custom-modal-backdrop fade show fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto' id='exampleModal' tabIndex='-1' role='dialog' aria-labelledby='exampleModalLabel' style={{ display: 'block' }} aria-modal='true'
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
                                                          <SelectComponent
                                                            options={taskList}
                                                            onChange={handleTask}
                                                          />
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
                                                        onClick={toggleAddComment}
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
