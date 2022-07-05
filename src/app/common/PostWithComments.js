import React, { Component } from 'react'
import * as ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import moment from 'moment'
import { addImageSuffix, parseHtml } from '../services/Util'
import Http from '../services/Http'
import { SelectedFileViewComponent } from './SelectedFileViewComponent'
import { bindActionCreators } from 'redux'
import { addCommentIndexWise } from '../redux_toolkit/Timeline/TimelineThunks'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'


const renderPostTitleExt = (post) => {
  if (post.postType === 'TASK_APPROVE') {
    return (
      <><span className='mx-2' style={{ color: '#00C334' }}> approved </span> {post.stepName}
        <div
          className='time'>{getTimeCount(getMinsCountFromNow(`${post.postDate} ${post.postTime}`, 'YYYY-MM-DD HH:mm:SS A'))}</div>
      </>
    )
  } else if (post.postType === 'TASK_COMPLETE') {
    return (
      <><span className='mx-2' style={{ color: '#00C334' }}> completed </span> {post.stepName}
        <div
          className='time'>{getTimeCount(getMinsCountFromNow(`${post.postDate} ${post.postTime}`, 'YYYY-MM-DD HH:mm:SS A'))}</div>
      </>
    )
  } else if (post.postType === 'TASK_REVISION') {
    return (
      <><span className='mx-2' style={{ color: '#F82B60' }}> requested for revision</span> <span
        style={{ color: 'rgba(0,0,0,.36)' }}>on</span> {post.stepName}
        <div
          className='time'>{getTimeCount(getMinsCountFromNow(`${post.postDate} ${post.postTime}`, 'YYYY-MM-DD HH:mm:SS A'))}</div>
      </>
    )
  } else {
    return (
      <div
        className='time'>{getTimeCount(getMinsCountFromNow(`${post.postDate} ${post.postTime}`, 'YYYY-MM-DD HH:mm:SS A'))}</div>
    )
  }
}

class PostWithComments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: this.props.post,
      showSingleReply: true,
      enableReplyOption: false,
      comment: '',
      selectedFiles: [],
      orderMemberList: this.props.orderMemberList ? this.props.orderMemberList : []
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.orderMemberList !== prevProps.orderMemberList) {
      this.setState({
        orderMemberList: this.props.orderMemberList
      })
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
          return ({
            id: user.email,
            value: user.memberName
          })
        })
      } else {
        values = orderMemberList.map((user) => {
          return ({
            id: user.email,
            value: user.memberName
          })
        })
      }

      if (searchTerm.length === 0) {
        renderList(values, searchTerm)
      } else {
        let matches = []
        for (let i = 0; i < values.length; i++)
          if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) matches.push(values[i])
        renderList(matches, searchTerm)
      }
    }
  }

  filterComments = (comments) => {
    let { showSingleReply } = this.state
    if (showSingleReply && comments.length) {
      return [comments[0]]
    }
    return comments
  }

  onChange = (val) => {
    this.setState({
      comment: val
    })
  }

  onMultipleFileSelect = async (e, docType) => {
    let { selectedFiles } = this.state
    let files = Array.from(e.target.files)
    let key = e.target.name
    files.map((item) => {
      let data = {
        'name': item.name,
        'docMimeType': item.type,
        'documentType': docType,
        'print': false,
        'base64Str': ''
      }
      let reader = new FileReader()
      reader.readAsDataURL(item)
      reader.onload = () => {
        data.base64Str = reader.result
        selectedFiles.push(data)
        this.setState({ selectedFiles })
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
    let { comment, orderMemberList } = this.state
    let foundEmails = []
    let emailRegex = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/
    let gotcha
    let match = emailRegex.exec(comment)
    let ids = []
    while (match) {
      foundEmails.push(match[0])
      comment = comment.replace(match[0], '')
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

  submitComment = async () => {
    let { selectedFiles, comment, post } = this.state
    await this.props.toggleLoader(true)
    let body = {
      documentDTOList: selectedFiles,
      postId: post.id,
      postType: 'COMMENT',
      text: comment.replace(/"/g, '\''),
      taggedUserIdList: this.getMentionedUserIds()
    }
    await Http.POST('commentOnTask', body, '?fromTimeline=false')
      .then(({ data }) => {
        if (this.props.timelinePanel !== undefined) {
          this.props.addCommentIndexWise(data.payload, 0)
        }
        this.props.toggleLoader(false)
        if (data.success) {
          if (data.payload?.postResponse) {
            post.commentList.push(data.payload.postResponse)
          }
          this.setState({
            comment: '',
            selectedFiles: [],
            post
          })
        }
      })
      .catch(({ response }) => {
        this.props.toggleLoader(false)
        if (response && response.data && response.data.message) {
          toast.error(response.data.message)
        }
      })

  }

  render() {
    let { post, showSingleReply, comment, enableReplyOption, selectedFiles } = this.state
    let postedBy = post.postedBy ? post.postedBy : {}
    let { userInfo } = this.props
    return (
      <>
        <div className='conversation'>
          <div className='conv-header'>
            {
              postedBy.imageUrl ?
                <img src={postedBy.imageUrl} alt='' />
                :
                <img src='/images/pro_pic_default.svg' alt='default_image' />
            }
            <div className='name'>{postedBy.name} {postedBy.designation &&
              <span className='tag'>{postedBy.designation}</span>}</div>
            {renderPostTitleExt(post)}
          </div>
          <div className='messages'>
            <div dangerouslySetInnerHTML={{ __html: parseHtml(post.text) }} />
            {
              post.docList && post.docList.length ?
                <div className='files-n-photos custom-scrollbar open'>
                  {
                    post.docList.map((file, i) => {
                      return (
                        <SelectedFileViewComponent showRemoveOption={false} file={file} key={i} index={i} />
                      )
                    })
                  }
                </div> : <></>
            }
            {
              !enableReplyOption &&
              <div className='reply-container'>
                <button className='reply' onClick={() => this.setState({ enableReplyOption: true })}>Reply</button>
              </div>
            }
          </div>

        </div>

        <div className='conversation conv-reply'>
          {
            this.filterComments(post.commentList).map((comment) => {
              let commentPostedBy = comment.postedBy ? comment.postedBy : {}
              return (
                <>
                  <div className='conv-header'>
                    {
                      commentPostedBy.imageUrl ?
                        <img src={commentPostedBy.imageUrl} alt='' />
                        :
                        <img src={'/images/pro_pic_default.svg'} alt='' />
                    }
                    <div className='name'>{commentPostedBy.name} {commentPostedBy.designation &&
                      <span className='tag'>{commentPostedBy.designation}</span>}</div>
                    <div
                      className='time'>{getTimeCount(getMinsCountFromNow(`${comment.postDate} ${comment.postTime}`, 'YYYY-MM-DD HH:mm:SS A'))}</div>
                  </div>
                  <div className='messages'>
                    <p dangerouslySetInnerHTML={{ __html: parseHtml(comment.text) }} />
                    {
                      showSingleReply && post.commentList.length > 1 &&
                      <div className='reply-container'>
                        <button className='view-reply'
                                onClick={() => this.setState({ showSingleReply: false })}>View {post.commentList.length - 1} replies
                        </button>
                      </div>
                    }
                    {
                      comment.docList && comment.docList.length ?
                        <div className='files-n-photos custom-scrollbar open'>
                          {
                            comment.docList.map((file, i) => {
                              return (
                                <SelectedFileViewComponent showRemoveOption={false} file={file} key={i} index={i}
                                                           remove={this.removeFile} />
                              )
                            })
                          }
                        </div> : <></>
                    }
                  </div>
                </>
              )
            })
          }
          {
            enableReplyOption ?
              <div className='reply-option'>

                <div className='user-photo'>
                  {
                    userInfo && userInfo.profilePicDocument ?
                      <img
                        src={addImageSuffix(userInfo.profilePicDocument.docUrl, '_xicon')}
                        onError={(e) => this.onErrorImageLoad(e, userInfo.profilePicDocument.docUrl)}
                      />
                      :
                      <img src={'/images/pro_pic_default.png'} />
                  }
                </div>
                <ReactQuill
                  name='comment'
                  value={comment}
                  debug='info'
                  theme='bubble'
                  placeholder='Write reply…'
                  onChange={this.onChange}
                  // modules={{ mention: this.mentionModule }}
                />
                <div className={`files-n-photos custom-scrollbar ${selectedFiles.length ? 'open' : ''}`}>
                  {
                    selectedFiles.map((file, i) => {
                      return (
                        <SelectedFileViewComponent showRemoveOption={true} file={file} key={i} index={i}
                                                   remove={this.removeFile} />
                      )
                    })
                  }
                </div>

                <div className='post-actions'>
                  <div className='attachment cursor-pointer'>
                    <label htmlFor='input-file-reply'>
                      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M12.5 22C9.46 22 7 19.54 7 16.5L7 6C7 3.79 8.79 2 11 2C13.21 2 15 3.79 15 6L15 14.5C15 15.88 13.88 17 12.5 17C11.12 17 10 15.88 10 14.5L10 7L12 7L12 14.59C12 15.14 13 15.14 13 14.59L13 6C13 4.9 12.1 4 11 4C9.9 4 9 4.9 9 6L9 16.5C9 18.43 10.57 20 12.5 20C14.43 20 16 18.43 16 16.5L16 7L18 7L18 16.5C18 19.54 15.54 22 12.5 22Z'
                          fill='#595959'></path>
                      </svg>
                    </label>
                    <input id='input-file-reply' type='file' name='selectedFiles'
                           onChange={(e) => this.onMultipleFileSelect(e, 'ACCESSORIES_DESIGN')} multiple />
                  </div>
                  <div className='save-note'>
                    <button className={`text-white ${comment.length ? 'brand-bg-color' : ''}`}
                            onClick={this.submitComment} disabled={!comment.length}>Reply
                    </button>
                    <div className='close-note cursor-pointer'
                         onClick={() => this.setState({ comment: '', selectedFiles: [], enableReplyOption: false })}>
                      <svg width='14' height='15' viewBox='0 0 14 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M14 1.91L12.59 0.5L7 6.09L1.41 0.5L0 1.91L5.59 7.5L0 13.09L1.41 14.5L7 8.91L12.59 14.5L14 13.09L8.41 7.5L14 1.91Z'
                          fill='#222222'></path>
                      </svg>
                    </div>
                  </div>
                </div>

              </div> : <></>
          }
        </div>
      </>
    )
  }
}

const mapStateToProps = store => {
  return {
    timelineStore: store.timelineStore
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addCommentIndexWise
    },
    dispatch
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(PostWithComments)

const getMinsCountFromNow = (dateTime, format) => {
  let res = moment().diff(moment.utc(dateTime, format))
  if (res) {
    return parseInt(res / (1000 * 60))
  }
  return 0
}

const getTimeCount = (mins) => {
  if (mins < 60) {
    return `${mins} m`
  }

  let hrs = parseInt(mins / 60)

  if (hrs < 24) {
    return `${hrs}h`
  } else if (hrs < (24 * 7)) {
    return `${parseInt(hrs / 24)}d`
  } else {
    return `${parseInt(hrs / (24 * 7))}w`
  }
}
