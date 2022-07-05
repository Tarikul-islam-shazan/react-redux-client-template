import React, { Component } from 'react'
import * as ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Http from '../services/Http'
import { TaskDetailSkeleton, TaskPostSkeleton } from './TaskSkeletons'
import { _getKey, addImageSuffix, changeDateFormat, onErrorImageLoad } from '../services/Util'
import { TaskDescriptionComponent } from './TaskDescriptionComponent'
import PostWithComments from './PostWithComments'
import { SelectedFileViewComponent } from './SelectedFileViewComponent'
import 'react-dates/initialize'
import { DateRangePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import moment from 'moment'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addCommentIndexWise, fetchProductionDetailsByDesignNumber } from '../redux_toolkit/Timeline/TimelineThunks'
import LoaderComponent from './LoaderComponent'
import { toast } from 'react-toastify'
import { ReactComponent as IconModalClose } from '../../assets/icons/modalClose.svg'
import { ReactComponent as IconMemberAdd } from '../../assets/icons/memberAdd.svg'
import { ReactComponent as IconTick } from '../../assets/icons/tickMemeber.svg'
import { ReactComponent as IconTick2 } from '../../assets/icons/tickTwo.svg'
import { ReactComponent as IconAttachment } from '../../assets/icons/attachment.svg'

class TaskManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      loadingPosts: false,
      loadingDetails: false,
      taskId: this.props.id,
      orderId: this.props.orderId,
      task: {},
      tempTask: {},
      showAddNewMemberModal: false,
      orderMemberObj: {},
      orderMemberList: [],
      editDescription: false,
      userInfo: {},
      posts: [],
      createPostFlag: false,
      showSkipFlag: false,
      post: '',
      selectedFiles: [],
      postType: '',
      startDate: null,
      endDate: null,
      focusedInput: null,
      postPageSize: 10,
      postTypeFilter: '',
      postPageNumber: 0,
      postHasNext: true
    }
  }

  mentionModule = {
    allowedChars: /^[A-Za-z\s]*$/,
    mentionDenotationChars: ['@'],
    source: async (searchTerm, renderList, mentionChar) => {
      let values
      let { orderMemberList } = this.state
      if (mentionChar === '@') {
        values = orderMemberList.map((user) => {
          return {
            id: user.email,
            value: user.memberName
          }
        })
      } else {
        values = orderMemberList.map((user) => {
          return {
            id: user.email,
            value: user.memberName
          }
        })
      }

      if (searchTerm.length === 0) {
        renderList(values, searchTerm)
      } else {
        let matches = []
        for (let i = 0; i < values.length; i++)
          if (
            ~values[i].value
              .toLowerCase()
              .indexOf(searchTerm.toLowerCase())
          )
            matches.push(values[i])
        renderList(matches, searchTerm)
      }
    }
  }

  handleClickOutside = (event) => {
    if (
      this.AddNewMemberModalRef &&
      !this.AddNewMemberModalRef.contains(event.target) &&
      this.AddNewMemberButtonRef &&
      !this.AddNewMemberButtonRef.contains(event.target)
    ) {
      this.setState({
        showAddNewMemberModal: false
      })
    }
  }

  handlePostScroll = async () => {
    const wrappedElement = document.getElementById('taskPostScroll')
    if (
      wrappedElement.scrollHeight - wrappedElement.scrollTop ===
      wrappedElement.clientHeight
    ) {
      let { posts, postPageNumber, postHasNext, loadingPosts } =
        this.state
      if (postHasNext && !loadingPosts && posts.length) {
        this.fetchTaskPosts(postPageNumber + 1)
      }
    }
  }

  componentDidMount = async () => {
    document.addEventListener('mousedown', this.handleClickOutside)
    let { taskId } = this.state
    await this.setState({
      loadingDetails: true,
      loadingPosts: true
    })
    let userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
      this.setState({
        userInfo
      })
    }
    await Http.GET('task', taskId)
      .then(({ data }) => {
        this.setState(
          {
            loadingDetails: false,
            task: data,
            tempTask: { ...data }
          },
          () => this.fetchTaskPosts()
        )
      })
      .catch(({ response }) => {
        this.setState({ loadingDetails: false })
        if (response && response.data && response.data.message) {
          toast.error(response.data.message)
        }
      })
    this.fetchOrderMembers()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll)
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  fetchTaskPosts = async (page = 0) => {
    let { task, postTypeFilter, postPageSize, posts } = this.state
    await this.setState({ loadingPosts: true })

    if (page === 0) {
      await this.setState({ posts: [] })
    }

    await Http.GET(
      'getTaskPosts',
      `${task.id}?postType=${postTypeFilter}&page=${page}&size=${postPageSize}`
    )
      .then(({ data }) => {
        this.setState({
          loadingPosts: false
        })
        if (data) {
          data = data.map((post) => {
            post.key = _getKey()
            return post
          })
        }
        if (data) {
          this.setState({
            posts: page === 0 ? data : [...posts, ...data],
            postPageNumber: page
          })
        }
        if (data) {
          this.setState({
            postHasNext: data.length && data.length === postPageSize
          })
        }
      })
      .catch(({ response }) => {
        this.setState({ loadingPosts: false })
        if (response && response.data && response.data.message) {
          toast.error(response.data.message)
        }
      })
  }

  fetchOrderMembers = async () => {
    let { orderId } = this.state
    await Http.GET('getProjectMembers', orderId)
      .then(({ data }) => {
        this.setState({
          orderMemberList: data.memberList,
          orderMemberObj: data
        })
      })
      .catch(({ response }) => {
        if (response && response.data && response.data.message) {
          toast.error(response.data.message)
        }
      })
  }

  isMemberAdded = (member) => {
    let { task } = this.state
    let flag = false
    task.memberList.map((taskMember) => {
      if (taskMember.memberId === member.memberId) {
        flag = true
      }
    })
    return flag
  }

  addDeleteMember = async (member) => {
    let { taskId, task } = this.state
    await this.setState({ loading: true })
    await Http.POST('addDeleteMemberToTask', {
      stepId: taskId,
      memberIdList: [member.memberId]
    })
      .then(({ data }) => {
        this.setState({ loading: false })
        if (data.success) {
          let flag = true
          task.memberList = task.memberList.filter((memberItem) => {
            if (memberItem.memberId === member.memberId) {
              flag = false
            }
            return memberItem.memberId !== member.memberId
          })
          if (flag) {
            task.memberList.push(member)
          }
          this.setState({
            loading: false,
            task
          })
        } else {
          this.setState({
            loading: false,
            task
          })
        }
      })
      .catch(({ response }) => {
        this.setState({ loading: false })
        if (response && response.data && response.data.message) {
          toast.error(response.data.message)
        }
      })
  }

  toggleFlag = (flagName) => {
    let flag = this.state[flagName]
    this.setState({
      [flagName]: !flag
    })
  }

  onChange = async (key, value) => {
    let { task } = this.state
    task[key] = value
    await this.setState({
      task
    })
    if (key === 'stepType') {
      this.setState({
        createPostFlag: false,
        showSkipFlag: false,
        postType: ''
      })
      this.postInput.blur()
      this.update('stepType')
    }
  }

  onChangePost = (val) => {
    this.setState({
      post: val
    })
  }

  setType = async (type) => {
    await this.setState({
      postType: type
    })
    if (type === 'COMPLETE' || type === 'REVISE') {
      this.postInput.focus()
    }
    if (type === 'APPROVE') {
      this.post()
    }
  }

  cancelDesc = () => {
    this.setState({
      editDescription: false,
      task: { ...this.state.tempTask }
    })
  }

  saveDate = async (startDate, endDate) => {
    let { task } = this.state
    task.startDate = startDate ? startDate.format('YYYY-MM-DD') : null
    task.endDate = endDate ? endDate.format('YYYY-MM-DD') : null
    await this.setState({ task })
    if (startDate && endDate) {
      this.update('date')
    }
  }

  update = async (updateType) => {
    let { task } = this.state
    await this.setState({ loading: true })
    let body = {}
    if (updateType === 'stepType') {
      body.stepType = task.stepType
    } else if (updateType.includes('date')) {
      body.startDate = task.startDate
      body.endDate = task.endDate
    } else if (updateType === 'editDescription') {
      body.description = task.stepDescription
    }
    await Http.PUT('task', body, task.id)
      .then(({ data }) => {
        this.setState({ loading: false, tempTask: task })
        this.props.callback(task)
        if (updateType === 'editDescription') {
          this.setState({
            editDescription: false
          })
        }
      })
      .catch(({ response }) => {
        this.setState({ loading: false })
        if (response && response.data && response.data.message) {
          toast.error(response.data.message)
        }
      })
  }

  onMultipleFileSelect = async (e, docType) => {
    let { selectedFiles } = this.state
    let files = Array.from(e.target.files)
    let key = e.target.name
    files.map((item) => {
      let data = {
        name: item.name,
        docMimeType: item.type,
        documentType: docType,
        print: false,
        base64Str: ''
      }
      let reader = new FileReader()
      reader.readAsDataURL(item)
      reader.onload = () => {
        data.base64Str = reader.result
        selectedFiles.push(data)
        this.setState({ selectedFiles, createPostFlag: true })
      }
      reader.onerror = function(error) {
        console.log('Error: ', error)
      }
    })
  }

  removeFile = (index) => {
    let { selectedFiles } = this.state
    this.setState({
      selectedFiles: selectedFiles.filter((file, i) => i !== index)
    })
  }

  getMentionedUserIds = () => {
    let { post, orderMemberList } = this.state
    let foundEmails = []
    let emailRegex =
      /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/
    let gotcha
    let match = null
    let ids = []
    while ((match = emailRegex.exec(post))) {
      foundEmails.push(match[0])
      post = post.replace(match[0], '')
    }
    foundEmails.map((email) => {
      orderMemberList.map((member) => {
        if (member.email === email && !ids.includes(member.memberId)) {
          ids.push(member.memberId)
        }
      })
    })
    return ids
  }

  handlePost = async () => {
    let { postType, selectedFiles } = this.state
    if (postType === 'COMPLETE' && !selectedFiles.length) {
      await this.setState({ showSkipFlag: true })
      return
    }
    this.post()
  }

  post = async () => {
    let { postType, selectedFiles, taskId, orderId, post, posts } =
      this.state
    let body = {
      documentDTOList: selectedFiles,
      orderId,
      stepId: taskId,
      text: post.replace(/"/g, '\''),
      taggedUserIdList: this.getMentionedUserIds()
    }
    if (postType === 'COMPLETE' || postType === 'APPROVE') {
      this.approvePost(body)
    } else if (postType === 'REVISE') {
      this.revisePost(body)
    } else {
      await this.setState({ loading: true })
      await Http.POST('postOnTask', body, '?fromTimeline=false')
        .then(({ data }) => {
          if (this.props.timelinePanel !== undefined) {
            this.props.addCommentIndexWise(data.payload, 0)
          }
          this.setState({ loading: false })
          if (data.success) {
            if (data.payload?.postResponse)
              posts.push(data.payload.postResponse)
            this.setState({
              post: '',
              selectedFiles: [],
              showSkipFlag: false,
              createPostFlag: false,
              postType: '',
              posts
            })
            this.postInput.blur()
          }
        })
        .catch(({ response }) => {
          this.setState({ loading: false })
          if (response && response.data && response.data.message) {
            toast.error(response.data.message)
          }
        })
    }
  }

  approvePost = async (body) => {
    let { taskId, posts, task } = this.state
    await this.setState({ loading: true })
    await Http.POST('approveTask', body, taskId)
      .then(({ data }) => {
        if (this.props.timelinePanel !== undefined) {
          let selectedDesignNumber =
            this.props.timelineStore?.selectedDesignNumber || null
          this.props.addCommentIndexWise(
            data.payload.timelineResponse
          )
          this.props.fetchProductionDetailsByDesignNumber(
            this.props.orderId,
            selectedDesignNumber
          )
        }
        this.setState({ loading: false })
        if (data.success) {
          if (
            data.payload &&
            data.payload?.timelineResponse?.postResponse &&
            data.payload.stepDetailsResponse
          ) {
            posts.push(data.payload?.timelineResponse?.postResponse)
            task = { ...data.payload.stepDetailsResponse }
            this.props.callback(data.payload.stepDetailsResponse)
          }
          this.setState({
            post: '',
            selectedFiles: [],
            showSkipFlag: false,
            createPostFlag: false,
            postType: '',
            posts,
            task,
            tempTask: { ...task }
          })
          this.postInput.blur()
        }
      })
      .catch(({ response }) => {
        this.setState({ loading: false })
        if (response && response.data && response.data.message) {
          toast.error(response.data.message)
        }
      })
  }

  revisePost = async (body) => {
    let { taskId, posts, task } = this.state
    await this.setState({ loading: true })
    await Http.POST('reviseTask', body, taskId)
      .then(({ data }) => {
        this.setState({ loading: false })
        if (data.success) {
          if (
            data.payload &&
            data.payload.postResponse &&
            data.payload.stepDetailsResponse
          ) {
            posts.push(data.payload.postResponse)
            task = { ...data.payload.stepDetailsResponse }
            this.props.callback(data.payload.stepDetailsResponse)
          }
          this.setState({
            post: '',
            selectedFiles: [],
            showSkipFlag: false,
            createPostFlag: false,
            postType: '',
            posts,
            task,
            tempTask: { ...task }
          })
          this.postInput.blur()
        }
      })
      .catch(({ response }) => {
        this.setState({ loading: false })
        if (response && response.data && response.data.message) {
          toast.error(response.data.message)
        }
      })
  }

  toggleLoader = (flag) => {
    this.setState({
      loading: flag
    })
  }

  render() {
    let {
      task,
      showAddNewMemberModal,
      orderMemberList,
      editDescription,
      orderMemberObj,
      userInfo,
      posts,
      createPostFlag,
      post,
      selectedFiles,
      postType,
      showSkipFlag,
      postTypeFilter
    } = this.state
    let { loadingDetails, loadingPosts, loading, postPageNumber } =
      this.state
    return (
      <LoaderComponent loading={this.state.loading}>
        <div
          className='modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto'
          id='taskManageModal'
          tabIndex='-1'
          aria-labelledby='exampleModalCenterTitle'
          aria-modal='true'
          role='dialog'
        >
          <div className='modal-dialog max-w-[485px] modal-dialog-centered relative w-auto pointer-events-none'>
            <div
              className='modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding outline-none text-current'>
              <>
                {loadingDetails ? (
                  <TaskDetailSkeleton />
                ) : (
                  <div
                    className='modal-header flex flex-shrink-0 items-center justify-between bg-primaryColor-shade-300 p-6'>
                    {task.stepProduct && task.stepProduct.image && (
                      <div className='left-photo-title'>
                        <img src={task.stepProduct.image} alt='' />
                      </div>
                    )}
                    <h5 className='modal-title'>{task.stepName}</h5>
                    {task.stepProduct && task.stepProduct.id ? (
                      <div className='style-name'>
                        of{' '}
                        <a
                          href={`/designs/view/${task.stepProduct.id}`}
                          target='_blank'
                          rel='noreferrer'
                        >
                          {task.stepProduct.name}
                        </a>
                      </div>
                    ) : (
                      <></>
                    )}

                    <div className='member-and-date d-flex justify-content-between align-items-center'>
                      <div className='member'>
                        <div className='item'>
                          <div className='add-member-popup cursor-pointer'>
                      <span
                        onClick={() =>
                          this.setState({
                            showAddNewMemberModal: true
                          })}
                        ref={(node) => (this.AddNewMemberButtonRef =
                          node)}>
                        <IconMemberAdd />
                      </span>
                            <div
                              className={`assign-member shadow ${
                                showAddNewMemberModal
                                  ? 'open'
                                  : ''
                              }`}
                              ref={(node) =>
                                (this.AddNewMemberModalRef =
                                  node)
                              }
                            >
                              <div className='title'>
                                Assign member
                              </div>
                              <div className='member-list-container'>
                                {orderMemberList &&
                                orderMemberList.length ? (
                                  orderMemberList.map(
                                    (member, index) => {
                                      return (
                                        <div
                                          key={`member_list_${index}`}
                                          className='member-list'
                                          onClick={() =>
                                            this.addDeleteMember(
                                              member
                                            )
                                          }
                                        >
                                          {member.memberImage ? (
                                            <img
                                              src={
                                                member.memberImage
                                              }
                                              alt=''
                                            />
                                          ) : (
                                            <img
                                              src={
                                                '/images/pro_pic_default.svg'
                                              }
                                              alt=''
                                            />
                                          )}
                                          <div className='name'>
                                            {
                                              member.memberName
                                            }{' '}
                                            {member.designation && (
                                              <span className='tag'>
                                                                                    {
                                                                                      member.designation
                                                                                    }
                                                                                </span>
                                            )}
                                          </div>
                                          {this.isMemberAdded(
                                            member
                                          ) ? (
                                            <div className='checked'>
                                              <div className='d-block'>
                                                <IconTick />
                                              </div>
                                            </div>
                                          ) : (
                                            <>

                                            </>
                                          )}
                                        </div>
                                      )
                                    }
                                  )
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        {task.memberList &&
                        task.memberList.length ? (
                          task.memberList.map((member, index) => {
                            return (
                              <div
                                className='item'
                                key={`task_member_${index}`}
                              >
                                {member.memberImage ? (
                                  <img
                                    src={
                                      member.memberImage
                                    }
                                    alt={
                                      member.memberName
                                    }
                                    data-toggle='tooltip'
                                    data-placement='top'
                                    title={
                                      member.memberName
                                    }
                                  />
                                ) : (
                                  <img
                                    src={
                                      '/images/pro_pic_default.svg'
                                    }
                                    alt={
                                      member.memberName
                                    }
                                    data-toggle='tooltip'
                                    data-placement='top'
                                    title={
                                      member.memberName
                                    }
                                  />
                                )}
                              </div>
                            )
                          })
                        ) : (
                          <></>
                        )}
                      </div>
                      <DateRangePicker
                        daySize={30}
                        displayFormat='MMM DD'
                        isOutsideRange={() => false}
                        startDate={
                          task.startDate
                            ? moment(
                              task.startDate,
                              'YYYY-MM-DD'
                            )
                            : null
                        } // momentPropTypes.momentObj or null,
                        startDateId='your_unique_start_date_id' // PropTypes.string.isRequired,
                        endDate={
                          task.endDate
                            ? moment(task.endDate, 'YYYY-MM-DD')
                            : null
                        } // momentPropTypes.momentObj or null,
                        endDateId='your_unique_end_date_id' // PropTypes.string.isRequired,
                        onDatesChange={({ startDate, endDate }) =>
                          this.saveDate(startDate, endDate)
                        } // PropTypes.func.isRequired,
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={(focusedInput) =>
                          this.setState({ focusedInput })
                        } // PropTypes.func.isRequired,
                      />
                    </div>

                    <TaskDescriptionComponent
                      data={task}
                      flag={editDescription}
                      flagName='editDescription'
                      toggleFlag={this.toggleFlag}
                      onChange={this.onChange}
                      update={this.update}
                      cancel={this.cancelDesc}
                    />

                    <div className='actions-task'>
                      {userInfo.id === orderMemberObj.managerId ? (
                        <select
                          name='stepType'
                          value={task.stepType}
                          onChange={(e) =>
                            this.onChange(
                              e.target.name,
                              e.target.value
                            )
                          }
                          disabled={
                            task.status === 'COMPLETED' ||
                            task.status === 'APPROVED'
                          }
                        >
                          <option value='REVIEW'>Review</option>
                          <option value='TASK'>Task</option>
                        </select>
                      ) : (
                        <></>
                      )}
                      {task.stepType === 'TASK' &&
                        task.status !== 'SCOPE_OFF' &&
                        task.status !== 'COMPLETED' && (
                          <button
                            className='green-btn'
                            onClick={() =>
                              this.setType('COMPLETE')
                            }
                          >
                            Complete
                          </button>
                        )}
                      {task.stepType === 'TASK' &&
                        ((task.actualEndDate &&
                            task.status === 'COMPLETED') ||
                          task.status === 'SCOPE_OFF') && (
                          <button className='completed-btn'>
                            Completed
                            <span>
                                                {' '}
                              {task.status !== 'SCOPE_OFF' &&
                                changeDateFormat(
                                  task.actualEndDate,
                                  'YYYY-MM-DD',
                                  'MMM-DD'
                                )}
                                            </span>
                            <IconTick2 />
                          </button>
                        )}

                      {task.stepType === 'REVIEW' &&
                        ((task.actualEndDate &&
                            task.status === 'APPROVED') ||
                          task.status === 'SCOPE_OFF') && (
                          <button className='completed-btn'>
                            Approved
                            <span>
                                                {' '}
                              {task.status !== 'SCOPE_OFF' &&
                                changeDateFormat(
                                  task.actualEndDate,
                                  'YYYY-MM-DD',
                                  'MMM-DD'
                                )}
                                            </span>
                            <IconTick2 />
                          </button>
                        )}

                      {task.stepType === 'REVIEW' &&
                        task.status !== 'SCOPE_OFF' &&
                        task.status !== 'APPROVED' && (
                          <>
                            <button
                              className='green-btn'
                              onClick={() =>
                                this.setType('APPROVE')
                              }
                            >
                              Approve
                            </button>
                            <button
                              className='red-light-btn'
                              onClick={() =>
                                this.setType('REVISE')
                              }
                            >
                              Revise
                            </button>
                          </>
                        )}
                      {task.stepType === 'REVIEW' &&
                        task.revisionCount &&
                        !postTypeFilter && (
                          <span
                            className='revised-times cursor-pointer'
                            onClick={() =>
                              this.setState(
                                {
                                  postTypeFilter:
                                    'TASK_REVISION'
                                },
                                () => this.fetchTaskPosts(0)
                              )
                            }
                          >
                                            Revised {task.revisionCount} times
                                        </span>
                        )}

                      {task.stepType === 'REVIEW' &&
                        task.revisionCount &&
                        postTypeFilter && (
                          <span
                            className='revised-times cursor-pointer'
                            onClick={() =>
                              this.setState(
                                { postTypeFilter: '' },
                                () => this.fetchTaskPosts(0)
                              )
                            }
                          >
                                            Clear filter
                                        </span>
                        )}
                    </div>

                    <button
                      type='button'
                      className='close'
                      data-dismiss='modal'
                      aria-label='Close'
                      onClick={this.props.closeModal}
                    >
                                <span aria-hidden='true'>
                                   <IconModalClose />
                                </span>
                    </button>
                  </div>
                )}
              </>
              {postPageNumber === 0 && loadingPosts ? (
                <></>
              ) : (
                <div className='modal-body relative custom-scrollbar' id='taskPostScroll'
                     onScroll={this.handlePostScroll}>
                  <div className='conversation-container'>
                    {posts.map((post, i) => {
                      return (
                        <PostWithComments
                          post={post}
                          key={post.key}
                          orderMemberList={orderMemberList}
                          toggleLoader={this.toggleLoader}
                          userInfo={userInfo}
                          timelinePanel={this.props.timelinePanel}
                        />
                      )
                    })}
                    {!posts.length && !loadingPosts && (
                      <div className='no-comments'>
                        No comment found
                      </div>
                    )}
                  </div>
                </div>
              )}

              {loadingPosts && <TaskPostSkeleton />}
              <div
                className={`modal-footer posting-option ${
                  createPostFlag ? 'open' : ''
                }`}
              >
                <div
                  className={`header-info-title ${
                    postType === 'COMPLETE' && createPostFlag
                      ? 'open'
                      : ''
                  }`}
                >
                  Please attach proof.
                </div>
                <div
                  className={`header-info-title title-warn ${
                    postType === 'REVISE' && createPostFlag
                      ? 'open'
                      : ''
                  }`}
                >
                  Requesting for revision{' '}
                  <span>
                            <span className='review__on'>on</span>{' '}
                    {task.stepName}
                        </span>
                </div>

                <div className='user-photo'>
                  {userInfo && userInfo.profilePicDocument ? (
                    <img
                      src={addImageSuffix(
                        userInfo.profilePicDocument.docUrl,
                        '_xicon'
                      )}
                      onError={(e) =>
                        onErrorImageLoad(
                          e,
                          userInfo.profilePicDocument.docUrl
                        )
                      }
                    />
                  ) : (
                    <img src='/images/pro_pic_default.png' />
                  )}
                </div>
                <ReactQuill
                  ref={(input) => {
                    this.postInput = input
                  }}
                  name='post'
                  value={post}
                  debug='info'
                  theme='bubble'
                  className='custom-scrollbar'
                  placeholder='Write comment…'
                  onChange={this.onChangePost}
                  onFocus={() => this.setState({ createPostFlag: true })}
                  onClick={() => this.setState({ createPostFlag: true })}
                  // modules={{ mention: this.mentionModule }}
                />

                <div
                  className={`files-n-photos custom-scrollbar ${
                    selectedFiles.length ? 'open' : ''
                  }`}
                >
                  {selectedFiles.map((file, i) => {
                    return (
                      <SelectedFileViewComponent
                        showRemoveOption={true}
                        file={file}
                        key={i}
                        index={i}
                        remove={this.removeFile}
                      />
                    )
                  })}
                </div>

                <div className='post-actions'>
                  <div className='attachment cursor-pointer'>
                    <label htmlFor='input-file'>
                      <IconAttachment />
                    </label>
                    <input
                      id='input-file'
                      type='file'
                      name='selectedFiles'
                      onChange={(e) =>
                        this.onMultipleFileSelect(
                          e,
                          'ACCESSORIES_DESIGN'
                        )
                      }
                      multiple
                    />
                  </div>
                  <div className='save-note'>
                    <button
                      className={`text-white ${
                        post.length ? 'brand-bg-color' : ''
                      }`}
                      onClick={this.handlePost}
                      disabled={!post.length}
                    >
                      Post
                    </button>
                    <div
                      className='close-note cursor-pointer'
                      onClick={() => {
                        this.setState({
                          post: '',
                          selectedFiles: [],
                          postType: '',
                          createPostFlag: false,
                          showSkipFlag: false
                        })
                        this.postInput.blur()
                      }}
                    >
                      <IconModalClose />
                    </div>
                  </div>
                </div>

                <div
                  className={`skip-and-post ${
                    showSkipFlag ? 'open' : ''
                  }`}
                >
                  <span>No attachment found.</span>
                  <div className='actions'>
                    <button className='white-btn' onClick={this.post}>
                      Skip and post
                    </button>
                    <button
                      className='red-light-btn text-white brand-bg-color border-0'
                      onClick={() =>
                        this.setState({ showSkipFlag: false })
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LoaderComponent>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    timelineStore: store.timeline
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchProductionDetailsByDesignNumber,
      addCommentIndexWise
    },
    dispatch
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskManage)
