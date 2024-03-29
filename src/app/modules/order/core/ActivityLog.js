import React, { useEffect, useRef, useState } from 'react'
import {
  addImageSuffix,
  authUserInfo,
  convertDateTimeToLocal,
  getFileType,
  getIconByFileType,
  getMentionedUserIds,
  onErrorImageLoad,
  parseHtml
} from '../../../services/Util'
import { useNavigate, useParams } from 'react-router-dom'
import Http from '../../../services/Http'
// import MoreDesign from './MoreDesign'
import { useDispatch, useSelector } from 'react-redux'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { toast } from 'react-toastify'
import { addCommentIndexWise, downloadInvoice } from '../../../redux_toolkit/Timeline/TimelineThunks'
import TaskManage from '../../../common/TaskManage'
import { SelectedFileViewComponent } from '../../../common/SelectedFileViewComponent'
import MoreDesign from './MoreDesign'

const ActivityLog = ({ activity, setLoader, index }) => {
  const timelineStore = useSelector((store) => store.timeline)
  const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [commentList, setCommentList] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([])
  const [memberList, setMemberList] = useState([])
  const [taskId, setTaskId] = useState(0)
  const [commentError, setCommentError] = useState('')
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const postInputRef = useRef(null)

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

  useEffect(() => {
    if (activity.body?.entityIdTypeMapList) {
      let comment = []
      comment.push(activity.body.entityIdTypeMapList[0].text)
      setCommentList(comment)
    }
    if (activity?.body?.titlePartList) {
      let task = activity?.body?.titlePartList.find(
        (item) =>
          item.entityType === 'STEP' &&
          item.titlePartType === 'ACTED_UPON'
      )
      if (task !== undefined) {
        setTaskId(task.id)
      }
    }
  }, [activity])

  const iconPath = () => {
    switch (activity.actionType) {
      case 'TASK_COMPLETE':
      case 'COMPLETED_ORDER':
        return '/icons/check.svg'
      case 'TASK_APPROVE':
        return '/icons/thumbs-up.svg'
      case 'TASK_REVISION':
        return '/icons/Revision.svg'
      case 'NEW_TASK_ADDED':
      case 'TASK_MEMBER_ASSIGNED':
        return '/icons/plus-square.svg'
      case 'TASK_MEMBER_REMOVED':
        return '/icons/trash-2.svg'
      case 'TASK_DEADLINE_UPDATED':
        return '/icons/calendar.svg'
      case 'TASK_DESCRIPTION_UPDATED':
      case 'UPDATED_MEASUREMENT_CHART':
      case 'UPDATED_MATERIAL_LIST':
      case 'UPDATED_COLOR_SIZEWISE_QTY':
      case 'UPDATED_INCOTERM':
      case 'UPDATED_PRICE':
      case 'UPDATED_PO_NO':
      case 'UPDATED_ETD':
      case 'PI_APPROVAL_ACKNOWLEDGEMENT':
      case 'PI_TERMS_UPDATED':
      case 'PI_SHIPPING_UPDATED':
      case 'PI_BENEFICIARY_DETAILS_UPDATED':
      case 'PI_BUYER_ADDRESS_UPDATED':
      case 'PI_BANK_DETAILS_UPDATED':
        return '/icons/Update.svg'
      case 'STARTED_ORDER':
        return '/icons/start-order.svg'
      case 'PI_SENT':
        return '/icons/send.svg'
      default:
        return '/icons/Update.svg'
    }
  }

  const renderIconOrImage = () => {
    if (
      activity.actionType === 'TASK_REGULAR_POST' ||
      activity.actionType === 'COMMENT'
    ) {
      return (
        <div className='person-profile'>
          <img src={activity.profileImage} alt='' />
        </div>
      )
    } else {
      return (
        <div className='activity-icon'>
          <img src={iconPath()} alt='' />
        </div>
      )
    }
  }

  const renderActivityText = () => {
    let string = []
    let tmpArray = activity?.body?.titlePartList
    tmpArray.map((item) => {
      if (
        item.titlePartType === 'ACTOR' ||
        item.titlePartType === 'ACTED_UPON'
      ) {
        string.push(<span>{item.text} </span>)
      } else {
        string.push(item.text + ' ')
      }
    })
    let timeAdded = activity.createdAt?.split('T')[1]
    let dateAdded = activity.createdAt?.split('T')[0]

    let formattedDate = convertDateTimeToLocal(
      dateAdded,
      timeAdded,
      'DD-MMM hh:mm a'
    )
    return (
      <>
        <p className='regular-12'>{string}</p>
        <p className='regular-12'>{formattedDate}</p>
      </>
    )
  }

  const toggleImageModal = () => {
    setShowImageModal(!showImageModal)
  }

  const renderTimeLineImages = () => {
    let { timelineImages } = activity
    if (!('timelineImages' in activity)) {
      timelineImages = []
    }
    const fileTypeOne = getFileType(timelineImages[0])
    const fileTypeTwo = getFileType(timelineImages[1])
    return (
      <div className='body-style-images-row'>
        {timelineImages[0] && (
          <div className='single-one'>
            {fileTypeOne === 'IMAGE' ||
            fileTypeOne === 'NO_FILE' ? (
              <a
                href={timelineImages[0]}
                target='_blank'
                rel='noreferrer'
              >
                <img src={timelineImages[0]} alt='' />
              </a>
            ) : (
              <a
                href={timelineImages[0]}
                target='_blank'
                rel='noreferrer'
              >
                <img
                  className='timeline-file-icon'
                  src={getIconByFileType(fileTypeOne)}
                  alt=''
                />
              </a>
            )}
          </div>
        )}
        {timelineImages[1] && (
          <div className='single-one'>
            {fileTypeTwo === 'IMAGE' ||
            fileTypeTwo === 'NO_FILE' ? (
              <a
                href={timelineImages[1]}
                target='_blank'
                rel='noreferrer'
              >
                <img src={timelineImages[1]} alt='' />
              </a>
            ) : (
              <a
                href={timelineImages[1]}
                target='_blank'
                rel='noreferrer'
              >
                <img
                  className='timeline-file-icon'
                  src={getIconByFileType(fileTypeTwo)}
                  alt=''
                />
              </a>
            )}
            {timelineImages?.length > 2 && (
              <div
                className='more-style-count'
                onClick={toggleImageModal}
              >
                <div className='count-number'>
                  {timelineImages?.length - 2}+
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderDescription = () => {
    return commentList?.map((comment, index) => {
      return (
        <p
          key={`comment_description_${index}`}
          className={`description regular-12 ${
            index > 0 ? 'pl-2' : ''
          }`}
          dangerouslySetInnerHTML={{
            __html: parseHtml(comment.toString('html'))
          }}
        />
      )
    })
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

  const cancelPost = () => {
    postInputRef.current = null
    setIsReplying(false)
    setSelectedFiles([])
  }

  const handleReply = async () => {
    let newComment =
      postInputRef.current === null
        ? ''
        : postInputRef?.current.toString().replace(/(<([^>]+)>)/gi, '')
    if (!newComment) {
      setCommentError('Comment required')
      return
    }
    setCommentError('')
    setLoader(true)
    let message = postInputRef.current
    let body = {
      documentDTOList: selectedFiles,
      postId: activity?.parentPostId,
      postType: 'COMMENT',
      // text: message.replace(/"/g, "'"),
      taggedUserIdList: timelineStore?.orderInfo?.orderMemberList
        ? getMentionedUserIds(
          message,
          timelineStore?.orderInfo?.orderMemberList
        )
        : []
    }
    await Http.POST('commentOnTask', body, '?fromTimeline=true')
      .then(async ({ data }) => {
        await dispatch(addCommentIndexWise(data.payload, index + 1))
        cancelPost()
        setLoader(false)
        toast.success('Replied Successful!')
      })
      .catch(({ response }) => {
        setLoader(false)
        toast.error(response.data.message)
      })
  }

  const renderReplySection = () => {
    if (isReplying) {
      return (
        <div className='comments-body'>
          <div className='comment-text clicked'>
            <div className='reply-box'>
              <img
                src={addImageSuffix(
                  authUserInfo()?.profilePicDocument?.docUrl,
                  '_xicon'
                )}
                onError={(e) =>
                  onErrorImageLoad(
                    e,
                    authUserInfo()?.profilePicDocument
                      ?.docUrl
                  )
                }
                alt=''
                className='profile-image'
              />
              <ReactQuill
                name='post'
                debug='info'
                theme='bubble'
                onChange={(value) =>
                  (postInputRef.current = value)
                }
                className='custom-scrollbar'
                placeholder='Write comment…'
                // modules={{ mention: mentionModule(memberList) }}
              />
              {commentError && (
                <p className='error'>{commentError}</p>
              )}
            </div>
            <div className='attachment cursor-pointer'>
              <label htmlFor='upload-input-file'>
                <img src='/icons/attachment.svg' alt='attach' />
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
            {renderFilePreview()}
          </div>
          <div className='post-actions'>
            <button className='cancel' onClick={cancelPost}>
              Cancel
            </button>
            <button className='post-btn' onClick={handleReply}>
              Post
            </button>
          </div>
        </div>
      )
    }
  }

  const renderPiShippingUpdateDescription = () => {
    let textObj = JSON.parse(activity?.body?.entityIdTypeMapList[0]?.text)
    return (
      <>
        <p>{textObj['title']}</p>
        <p>{textObj['addressLine1']}</p>
        <p>{textObj['addressLine2']}</p>
        <p>{textObj['city']}</p>
        <p>{textObj['zip']}</p>
        <p>{textObj['state']}</p>
        <p>{textObj['country']}</p>
      </>
    )
  }

  const renderPiBeneficiaryDetails = () => {
    let textObj = JSON.parse(activity?.body?.entityIdTypeMapList[0]?.text)
    return (
      <>
        <p>{textObj['name']}</p>
        <p>{textObj['address']}</p>
        <p>{textObj['website']}</p>
      </>
    )
  }

  const renderBankDetails = () => {
    let textObj = JSON.parse(activity?.body?.entityIdTypeMapList[0]?.text)
    return (
      <>
        <p>Swift: {textObj['swiftCode']}</p>
        <p>A/C: {textObj['accountNumber']}</p>
        <p>{textObj['bankName']}</p>
        <p>{textObj['bankDetails']}</p>
      </>
    )
  }

  const renderActivityBody = () => {
    if (
      activity.actionType === 'TASK_REGULAR_POST' ||
      activity.actionType === 'COMMENT'
    ) {
      return (
        <div className='activity-common-body'>
          {renderDescription()}
          {renderTimeLineImages()}
          <div className='reply-btn '>
            <button
              className='button text __reply-button__'
              onClick={() => setIsReplying(true)}
            >
              Reply
            </button>
          </div>
          <div className='reply-container'>
            {renderReplySection()}
          </div>
        </div>
      )
    } else if (activity.actionType === 'TASK_DESCRIPTION_UPDATED') {
      return (
        <div className='activity-common-body'>
          {renderDescription()}
        </div>
      )
    } else if (activity.actionType === 'PI_SHIPPING_UPDATED') {
      return (
        <div className='activity-common-body'>
          {renderPiShippingUpdateDescription()}
        </div>
      )
    } else if (activity.actionType === 'PI_BENEFICIARY_DETAILS_UPDATED') {
      return (
        <div className='activity-common-body'>
          {renderPiBeneficiaryDetails()}
        </div>
      )
    } else if (activity.actionType === 'PI_BUYER_ADDRESS_UPDATED') {
      return (
        <div className='activity-common-body'>
          {renderPiShippingUpdateDescription()}
        </div>
      )
    } else if (activity.actionType === 'PI_BANK_DETAILS_UPDATED') {
      return (
        <div className='activity-common-body'>
          {renderBankDetails()}
        </div>
      )
    }
  }

  const handePageRoute = (e) => {
    let element = e.target.className
    if (
      isReplying === true ||
      activity.actionType === 'COMPLETED_ORDER' ||
      activity.actionType === 'STARTED_ORDER' ||
      showTaskDetailsModal === true ||
      element === 'button text __reply-button__'
    ) {
      return false
    } else if (activity.activityModule === 'COMMENT') {
      setShowTaskDetailsModal(true)
    } else if (activity.activityModule === 'PROFORMA_INVOICE') {
      setLoader(true)
      downloadInvoice(timelineStore?.orderInfo?.invoiceId)
        .then(() => setLoader(false))
        .catch(() => setLoader(false))
    } else if (activity.activityModule === 'ORDER') {
      navigate(`/purchaseDetails/${params.orderId}`)
    } else if (activity.activityModule === 'PRODUCT') {
      navigate.push(
        `/designs/view/${activity?.secondaryActedUpon?.id}?openModal=true`
      )
    } else if (activity.activityModule === 'TASK') {
      setShowTaskDetailsModal(true)
    }
  }

  return (
    <div
      className='single-activity activity-with-header added-comment'
      onClick={handePageRoute}
    >
      <div className='activity-common-header justify-content-between'>
        <div className='activity-content d-flex'>
          {renderIconOrImage()}
          <div className='activity-text'>{renderActivityText()}</div>
        </div>
      </div>
      {renderActivityBody()}

      {showTaskDetailsModal && (<div
        className='modal custom-modal-backdrop task-conversation fade show fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto'
        id='taskManageModal'
        tabIndex='-1' role='dialog' aria-labelledby='exampleModalLabel' style={{ display: 'block' }} aria-modal='true'
      >
        <div className='modal-dialog max-w-[485px] mr-0 mt-0 modal-dialog-centered relative w-auto pointer-events-none'>
          <div
            className='modal-content h-screen border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding outline-none text-current'>
            <TaskManage
              timelinePanel={true}
              id={taskId}
              orderId={params.orderId}
              closeModal={() =>
                setShowTaskDetailsModal(false)
              }
              callback={() => false}
            />
          </div>
        </div>
      </div>)}
      {showImageModal && (
        <MoreDesign
          toggleModal={toggleImageModal}
          openModal={showImageModal}
          setLoader={setLoader}
          imageList={activity?.timelineImages}
        />
      )}
    </div>
  )
}

export default ActivityLog
