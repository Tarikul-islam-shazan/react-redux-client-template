import React, { Component } from 'react';

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../../services/Http';
import { toastSuccess, toastError } from '../../../commonComponents/Toast';
import { CancellableImage } from '../../../commonComponents/CancellableImage';
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../../constant';
import { addImageSuffix, convertTimeToLocal } from '../../../services/Util';

class PostWithFeedback extends Component {
  constructor(props) {
      super(props);
      this.state = {
        loading : false,
        post : this.props.post,
        feedbacks : [],
        userInfo : this.props.userInfo,
        feedback : '',
        documentDTOList : []
      };
  }

  componentDidMount = () => {
    // console.log("userInfo from feedback did mount",this.props.userInfo);
    this.loadFeedbacks()
  }

  onMultipleFileSelect = async(e,docType) => {
    // console.log("index",i)
    let { documentDTOList } = this.state;
    // let arr = [];
    let files = Array.from(e.target.files);
    let key = e.target.name;
    // console.log(Array.from(e.target.files));
    // return;
    await files.map((item) => {
      let data = {
        "name": item.name,
        "docMimeType" : item.type,
        "documentType" : docType,
        "print": false,
        "base64Str":""
      }
      // console.log('data',data)
      let reader = new FileReader()
      reader.readAsDataURL(item)
      reader.onload = () => {
        data.base64Str = reader.result;
        documentDTOList.push(data);
        // console.log("styles from multi",styles);
        this.setState({documentDTOList})
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      }
    })
    // console.log("data multiple",arr[0])
  }

  loadFeedbacks = () => {
    Http.GET('getFeedbackForPost',this.props.post.id)
      .then(({data}) => {
        console.log('getFeedbackForPost SUCCESS: ', data);
        if(data){
          this.setState({
            feedbacks : data
          })
        }else{
          toastError("Request wasn't successful.");
        }
      })
      .catch(response => {
          console.log('getFeedbackForPost ERROR: ', JSON.stringify(response));
          this.setState({loading:false})
          toastError("Something went wrong! Please try again.");
      });
  }

  sendFeedback = async() => {
    let { post, feedback, documentDTOList } = this.state;
    if(feedback==''){
      toastError("Feedback text required.");
      return;
    }
    let body ={
      postId : post.id,
      text : feedback,
      documentDTOList : documentDTOList
    }
    this.setState({
      loading : true
    })
    console.log("body",body)
    // return;
    await Http.POST('sendFeedback',body)
      .then(({data}) => {
        console.log('COMMENT POST SUCCESS: ', data);
        if(data.success){
          this.setState({
            loading:false,
            feedback : '',
            documentDTOList : []
          })
          toastSuccess(data.message);
          this.loadFeedbacks();
          // this.loadComments(id)
        }else{
          this.setState({
            loading:false
          })
          toastError(data.message);
        }
      })
      .catch(response => {
          console.log('COMMENT ERROR: ', JSON.stringify(response));
          this.setState({loading:false})
          toastError("Something went wrong! Please try again.");
      });
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(prevProps.userInfo!=this.props.userInfo){
      console.log("userInfo from feedback",this.props.userInfo)
      this.setState({userInfo: this.props.userInfo});
    }

  }

  onChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  remove = (index) => {
    this.setState({
      documentDTOList : this.state.documentDTOList.filter((item,i)=>i!=index)
    })
  }

  render(){
    let { post, feedbacks, userInfo, documentDTOList, feedback } = this.state;
    return(
      <LoadingOverlay
        active={this.state.loading}
        styles={{
          overlay: (base) => ({
            ...base,
            background: LOADER_OVERLAY_BACKGROUND
          }),
          spinner: (base) => ({
            ...base,
            width: LOADER_WIDTH,
            position: LOADER_POSITION,
            top: LOADER_TOP,
            left: LOADER_LEFT,
            marginTop: LOADER_MARGIN_TOP,
            marginLeft: LOADER_MARGIN_LEFT,
            '& svg circle': {
              stroke: LOADER_COLOR
            }
          }),
          content: (base) => ({
            ...base,
            color: LOADER_COLOR
          })
        }}
        spinner
        text={LOADER_TEXT}>
        <div className="post">
            <div className="post-heading">
                <div className="header-title">
                {
                  post.postedBy.imageUrl ?
                  <img src={addImageSuffix(post.postedBy.imageUrl, '_xicon')} alt="" className="user-photo"/>:
                  <img src={require("../../../assets/images/pro_pic_default.svg")} className="user-photo" alt=""/>
                }
                    <div className="name-n-date">
                        <h4>{post.postedBy.name}</h4>
                        <span>{post.postDate ? convertTimeToLocal(post.postDate, post.postTime, 'MMM DD, YYYY hh:mm a') : 'N/A'}</span>
                    </div>
                    {/*<div className="post-type">Query</div>*/}
                </div>
                {/*<div className="post-status">
                    <div className="badge table-badge" style={{backgroundColor: '#E4F6EA', color: '#00CC52', width: 'auto'}}>Approved</div>
                </div>*/}
            </div>
            <div className="post-description">
                <p>{post.text}</p>
                {
                  post.docList &&
                  post.docList.map((item,i)=> {
                    return <img key={i} src={item.docUrl} style={{height:50,width:50,margin:5,border:'solid 1px black'}} onClick={() => this.props.imageViewer(post.docList,i)} />
                  })
                }
            </div>
            <div className="post-tag">
                <div className="badge-list">
                    <span className="badge table-badge" style={{backgroundColor: '#EDE4F3', color: '#9A2EE1'}}>{post.projectName}</span>
                    <span className="badge table-badge" style={{backgroundColor: '#F8F6E6',color: '#CB8E00'}}>{post.productName}</span>
                    <span className="badge table-badge" style={{backgroundColor: '#E7E9EF',color: '#3E4148'}}>{post.deliverableName}</span>
                    {/*<span className="badge table-badge" style={{backgroundColor: '#E4F6EA',color: '#00CC52'}}>Knitting</span>*/}
                </div>
            </div>
        </div>
        <div className="feedback">
            <h5>Feedback</h5>
            <div className="editor">
                <div className="write">
                  {
                    userInfo.profilePicDocument && userInfo.profilePicDocument.docUrl ?
                    <img src={addImageSuffix(userInfo.profilePicDocument.docUrl, '_xicon')} alt="" className="user-photo"/> :
                    <img src={require("../../../assets/images/pro_pic_default.svg")} className="user-photo" alt=""/>
                  }
                    <div className="feedback-editor">
                        <textarea name="feedback"  rows="3" value={feedback} onChange={this.onChange} placeholder="Write your feedback here....."></textarea>
                        <div style={{marginTop:20}}>
                        {
                          documentDTOList.map((item,i)=>{
                            return <CancellableImage key={i} src={item.base64Str} close={() => this.remove(i)} />
                          })
                        }
                        </div>
                        <div className="footer-tab">
                            {/*<select>
                                <option value="Accept">Note</option>
                                <option value="Reject">Query</option>
                            </select>*/}
                            <div className="file btn">
                                Photo/Video
                                <input type="file" name="documentDTOList" onChange={(e) => this.onMultipleFileSelect(e,'PRODUCT_DESIGN')} multiple/>
                            </div>
                            <button  className="send-feed" onClick={()=>this.sendFeedback()}>
                            </button>
                            {/*<button className="deliverable-deadline">Deliverable Deadline</button>*/}
                        </div>
                    </div>
                </div>
            </div>

            <div className="feedback-post">
            {
              feedbacks.map((item,i) => {
                return(
                  <div className="post" key={i}>
                      <div className="post-heading">
                          <span className="date-time">{convertTimeToLocal(item.postDate, item.postTime, 'hh:mm a')}<br/>{convertTimeToLocal(item.postDate, item.postTime, 'MMM DD, YYYY')}</span>
                          <div className="header-title">
                          {
                            item.postedBy.imageUrl ?
                            <img src={addImageSuffix(item.postedBy.imageUrl, '_xicon')} alt="" className="user-photo"/> :
                            <img src={require("../../../assets/images/pro_pic_default.svg")} className="user-photo" alt=""/>
                          }
                              <div className="description" style={{width:'100%'}}>
                                  <h4>{item.postedBy.name}
                                    {/*<div className="post-type">Query</div>*/}
                                  </h4>
                                  <div className="comments">
                                      <p>{item.text}</p>
                                      <div style={{display:'flex'}}>
                                      {
                                        item.docList &&
                                        item.docList.map((item2,i)=>{
                                          return(<img key={i} src={item2.docUrl} style={{height:30,width:30}} onClick={() => this.props.imageViewer(item.docList,i)} />)
                                        })
                                      }
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                )
              })
            }
            </div>
        </div>
      </LoadingOverlay>
    )
  }
}

export default PostWithFeedback;
