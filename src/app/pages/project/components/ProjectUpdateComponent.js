import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from "loadjs";
import ImageViewer from 'react-simple-image-viewer';
import Modal from 'react-bootstrap/Modal'

import { encodeQueryData, addImageSuffix, convertTimeToLocal } from '../../../services/Util';

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../../services/Http';
import { toastSuccess, toastError, toastWarning } from '../../../commonComponents/Toast';
import { CancellableImage } from '../../../commonComponents/CancellableImage';
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../../constant';

import PostWithFeedback from './PostWithFeedback';

class ProjectUpdateComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
          project : this.props.project,
          comments : [],
          comment : '',
          taggedTopics : [],
          upcomingDeadlines : [],
          productDetails : {},
          posts : [],
          userInfo : this.props.userInfo,
          selectedProduct : '',
          selectedDeliverable : '',
          selectedDeliverableText : '',
          deliverableFlag : false,
          sort : 'datePosted,desc',
          filterByProductId : this.props.project.productResponseList ? this.props.project.productResponseList.map((item)=>{
            return item.productNo
          }) : [],
          documentDTOList : [],
          imageViewerFlag : false,
          imageViewerData : [],
          imageViewerCurrentIndex : 0,
          fromDate : '',
          uptoDate : '',
          loading : false,
          page : 0,
          size : 10,
          hasNext : true,
          filterablePostId : this.props.filterablePostId,
          postModal: false
        };
    }

    handleScroll = () => {
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        let { hasNext, page, loading } = this.state
        console.log("message",'bottom reached',hasNext, page, loading)
        if(hasNext && !loading){
          this.fetchPosts(this.props.projectId,page+1,true)
        }else{
          if(!hasNext){
            // toastWarning("No more data found.")
          }
        }
      }
    }

    componentDidMount = () => {
      // let id = this.props.match.params.id;
      window.addEventListener("scroll", this.handleScroll);
      this.fetchPosts(this.props.projectId,0,true);
      this.updateTopicAndDeadlinesData(this.props.projectId);
    }

    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
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

    fetchPosts = async(projectId,page = 0,merge=true) => {
      let { sort, filterByProductId, fromDate, uptoDate, size, posts, filterablePostId } = this.state;
      let filterByProductIdText = '';
      await filterByProductId.map((item,i)=>{
        filterByProductIdText+='&productId='+item;
      })
      let queryParams = {
        sort,
        fromDate,
        uptoDate,
        size,
        page,
        id : filterablePostId ? filterablePostId : ''
      }

      let paramData = encodeQueryData(queryParams);
      console.log("filterByProductIdText",paramData+filterByProductIdText,filterByProductId)
      await Http.GET_WITH_ID_PARAM('getPostsForProject',paramData+filterByProductIdText,projectId)
        .then(({data}) => {
          console.log('getPostsForProject SUCCESS calling: ', data);
          if(data.length){
            if(merge){
              this.setState({
                posts : [ ...posts, ...data ],
                page : page,
                hasNext : data.length === size ? true : false,
                loading : false
              })
            }else{
              this.setState({
                posts : data,
                page : page,
                hasNext : data.length === size ? true : false,
                loading : false
              })
            }
          }else{
            this.setState({
              posts : [],
              hasNext : false,
              loading:false
            })
            // toastWarning("Product List - no data found.");
          }
        })
        .catch(response => {
            console.log('COMMENT ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            toastError("Something went wrong! Please try again.");
        });
    }

    onChangeCheckbox = async(e) => {
      let { filterByProductId } = this.state;
      let str = e.target.value;
      console.log(e.target.name,e.target.checked);
      if(e.target.checked==false){
        await this.setState({
          filterByProductId : filterByProductId.filter((item)=>str!=item)
        })
      }else{
        filterByProductId.push(str);
        await this.setState({
          filterByProductId
        })
      }
      this.fetchPosts(this.props.projectId,0,false);
    }

    sendPost = async(validate = false) => {
      let { selectedProduct, selectedDeliverable, post, documentDTOList } = this.state;
      console.log("body for post","entered");

      if(validate && (!selectedProduct || !selectedDeliverable)){
        toastError("Please select product and deliverable");
        return;
      }
      let body ={
        projectId : this.props.projectId,
        productId : selectedProduct,
        deliverableId : selectedDeliverable,
        text : post,
        postType : 'QUERY',
        documentDTOList : documentDTOList
      }
      this.setState({
        loading : true
      })
      // console.log("body",body)
      // return;
      await Http.POST('sendPost',body)
        .then(({data}) => {
          console.log('COMMENT POST SUCCESS: ', data);
          if(data.success){
            this.setState({
              loading:false,
              post : '',
              documentDTOList : [],
              postModal: false
            })
            toastSuccess(data.message);
            this.fetchPosts(this.props.projectId,0,false);
          }else{
            this.setState({
              loading:false,
            })
            toastError(data.message);
          }
        })
        .catch(({response}) => {
            console.log('COMMENT ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            toastError("Something went wrong! Please try again.");
        });
        // this.fetchPosts(this.props.projectId);

    }

    loadComments = async(id) => {
      this.setState({
        loading : true
      })
      await Http.GET('getDeliverableMessages',id)
        .then(({data}) => {
          console.log('COMMENT SUCCESS: ', data);
          if(data){
            this.setState({
              loading:false,
              comments : data
            })
          }else{
            this.setState({
              loading:false
            })
            toastError(data.message);
          }
        })
        .catch(({response}) => {
            console.log('COMMENT ERROR: ', JSON.stringify(response));
            this.setState({loading:false});
            if(response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Something went wrong! Please try again.");
            }
        });
    }

    componentDidUpdate = (prevProps, prevState) => {
      if(prevProps.project!=this.props.project){
        this.setState({project: this.props.project});
        this.updateTopicAndDeadlinesData(this.props.projectId);
      }
      if(prevProps.userInfo!=this.props.userInfo){
        console.log("userInfo",this.props.userInfo)
        this.setState({userInfo: this.props.userInfo});
      }

    }

    updateTopicAndDeadlinesData = async(projectId) => {
      await Http.GET('getMostTaggedTopics',projectId)
        .then(({data}) => {
          console.log('getMostTaggedTopics SUCCESS: ', data);
          if(data){
            this.setState({
              taggedTopics : data
            })
          }else{
            toastError("Request wasn't successful.");
          }
        })
        .catch(response => {
            console.log('getMostTaggedTopics ERROR: ', JSON.stringify(response));
            toastError("Something went wrong! Please try again.");
        });

      await Http.GET('getUpcomingDeadlines',projectId)
        .then(({data}) => {
          console.log('upcomingDeadlines SUCCESS: ', data);
          if(data){
            this.setState({
              upcomingDeadlines : data
            })
          }else{
            toastError("Request wasn't successful.");
          }
        })
        .catch(response => {
            console.log('upcomingDeadlines ERROR: ', JSON.stringify(response));
            toastError("Something went wrong! Please try again.");
        });
    }

    loadProductDeliverables = async(productId) => {
      await Http.GET('getProjectProductDetails',productId)
        .then(({data}) => {
          console.log('getProjectProductDetails SUCCESS: ', data);
          if(data){
            this.setState({
              productDetails : data
            })
          }else{
            toastError("Request wasn't successful.");
          }
        })
        .catch(response => {
            console.log('upcomingDeadlines ERROR: ', JSON.stringify(response));
            toastError("Something went wrong! Please try again.");
        });
    }

    onChangeFromPost = (e) => {
      // console.log("entered")
      this.setState({
        [e.target.name] : e.target.value
      });
      if(e.target.name=='selectedProduct'){
        this.setState({
          selectedDeliverable : '',
          selectedDeliverableText : ''
        })
        this.loadProductDeliverables(e.target.value);
      }
    }

    onSetDeliverable = (id,name) => {
      this.setState({
        selectedDeliverable : id,
        selectedDeliverableText : name,
        deliverableFlag : false
      })
    }

    loadDeliverableList = () => {
      let { productDetails, selectedDeliverable } = this.state;
      let result = [];
      productDetails.phaseResponseList && productDetails.phaseResponseList.map((item,i)=>{
        // console.log("loadDeliverableList",item.phaseName)
        let temp = item.deliverableResponseList.map((item2,j)=> {
          if(item2.id==selectedDeliverable){
            return(
              <li style={{color:'green',fontWeight:'bold'}} key={item2.id} onClick={() => this.onSetDeliverable(item2.id,item2.deliverableText)}>{item2.deliverableText}</li>
            )
          }
          return(
            <li key={item2.id} onClick={() => this.onSetDeliverable(item2.id,item2.deliverableText)}>{item2.deliverableText}</li>
          )
        })
        result.push(
          <ul className="list">
              <div className="title">{item.phaseName}</div>
              {temp}
          </ul>
        )
      })
      return result;
    }
    loadJsFiles = () => {
      loadjs(['/js/script.js','/js/custom.js','/js/datepicker.js']);
    }

    showImageViewer = (docs,index) => {
      console.log("docs",docs)
      this.setState({
        imageViewerFlag : true,
        imageViewerCurrentIndex : index,
        imageViewerData : docs.map((item)=>(item.docUrl))
      })
    }

    remove = (index) => {
      this.setState({
        documentDTOList : this.state.documentDTOList.filter((item,i)=>i!=index)
      })
    }

    onChange = async(e) => {
      if(e.target.name=='fromDate' || e.target.name == 'uptoDate'){
        let date = e.target.value.split("-")
        await this.setState({
          [e.target.name]: date.length==3 ? (date[2]+'/'+date[1]+'/'+date[0]) : e.target.value
        })
      }else{
        await this.setState({
          [e.target.name]:e.target.value
        })
      }
      await this.fetchPosts(this.props.projectId,0,false);
    }

    render() {
        let {
              project, taggedTopics, upcomingDeadlines, productDetails, posts, userInfo, post,
              documentDTOList, selectedDeliverable, selectedDeliverableText,
              deliverableFlag, imageViewerFlag, imageViewerData, imageViewerCurrentIndex,
              fromDate, uptoDate, filterablePostId, postModal, selectedProduct
            } = this.state;
        console.log("userInfo from update",userInfo)
        return (
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
              {imageViewerFlag && (
                  <ImageViewer
                    backgroundStyle={{backgroundColor:'rgba(0,0,0,.5)',zIndex:999}}
                    src={ imageViewerData }
                    currentIndex={ imageViewerCurrentIndex }
                    onClose={ () => {
                      this.setState({
                        imageViewerFlag : false,
                        imageViewerCurrentIndex : 0
                      })
                    } }
                  />
                )
              }
              <div className="pp-timeline">
                  <div className="filter">
                      <div className="production">
                          <h6 className="filter-icon">Filter</h6>
                          <div className="checklist-item">
                              <label className="mb-3">Date</label>
                              <div className="date-range">
                                  <input className="input-field" type="date" name="fromDate" onChange={this.onChange} placeholder="dd.mm.yyyy"/>
                                  <span>to</span>
                                  <input className="input-field" type="date" name="uptoDate" onChange={this.onChange} placeholder="dd.mm.yyyy"/>
                              </div>
                              <label className="mb-3">Products</label>
                              {
                                project.productResponseList &&
                                project.productResponseList.map((item,i)=>{
                                  return(
                                    <div className="item" key={i}>
                                        <div className="check">
                                            <div className="custom-chekbox">
                                                <div className="form-group">
                                                    <input type="checkbox" id={item.productNo} name={item.productNo} value={item.productNo} onChange={this.onChangeCheckbox} defaultChecked/>
                                                    <label for={item.productNo}>{item.name}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                  )
                                })
                              }

                          </div>
                      </div>
                      <div className="tag-n-deadline responsive-show">
                          <div className="production">
                              <h6 className="hashtag-ico">Topics</h6>
                              <div className="checklist-item">
                                  <div className="sample">
                                      {
                                          taggedTopics.map((item,i)=>{
                                              return(
                                                  <a href="#" key={i}>#{item.name}</a>
                                              )
                                          })
                                      }
                                  </div>
                              </div>
                          </div>
                          <div className="production">
                              <h6 className="hashtag-ico upcoming-ico">Upcoming deadlines</h6>
                              <div className="checklist-item">
                                  <div className="sample-deadline">
                                      {
                                          upcomingDeadlines.map((item,i)=>{
                                              return(
                                                  <div className="list" key={i}>
                                                      <span>{item.productName}</span>
                                                      <a href="#">{item.deliverableText}</a>
                                                      <span>{item.deadline}</span>
                                                  </div>
                                              )
                                          })
                                      }
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="timeline">
                      <div className="editor">
                          {/*<div className="header-tab">
                              <div className="query">Query</div>
                              <div className="note">Note</div>
                          </div>*/}
                          <div className="write">
                              {
                                userInfo.profilePicDocument && userInfo.profilePicDocument.docUrl ?
                                <img src={addImageSuffix(userInfo.profilePicDocument.docUrl, '_xicon')} alt="" className="user-photo"/> :
                                <img src={require("../../../assets/images/pro_pic_default.svg")} className="user-photo" alt=""/>
                              }
                              <textarea name="post" onChange={this.onChangeFromPost} rows="5" value={post} placeholder="Write here....."/>
                          </div>
                          <div className="footer-tab">
                              <div className="file btn">
                                  Photo/Video
                                  <input type="file" name="documentDTOList" onChange={(e) => this.onMultipleFileSelect(e,'PRODUCT_DESIGN')} multiple/>
                              </div>
                              {/*<button className="send-feed main-editor" onClick={()=>this.sendPost()}>
                              </button>*/}
                              <button className="send-feed main-editor" onClick={()=>this.setState({postModal: true})}>Submit</button>
                          </div>
                          {
                            documentDTOList.length > 0 &&
                            <div className="uploaded-photo">
                            {
                              documentDTOList.map((item,i)=>{
                                return <CancellableImage key={i} src={item.base64Str} close={() => this.remove(i)} />
                                // return(<img key={i} src={item.base64Str} style={{height:50,width:50,margin:5,border:'solid 1px black'}} />)
                              })
                            }
                            </div>
                          }
                      </div>
                      {
                        filterablePostId ? <a href={"/my-project-details/" + this.props.projectId + '?tab=2'}><p  style={{marginTop:10,marginBottom:10,borderWidth:1,padding:10,backgroundColor:'#eeecf6',borderRadius:5}}>Reload Posts</p></a>:<></>
                      }
                      {
                        posts.map((item,i)=><PostWithFeedback key={item.id} post={item} userInfo={userInfo} imageViewer={this.showImageViewer} />)
                      }

                  </div>
                  <div className="tag-n-deadline responsive-off">
                      <div className="production">
                          <h6 className="hashtag-ico">Topics</h6>
                          <div className="checklist-item">
                              <div className="sample">
                                {
                                  taggedTopics.map((item,i)=>{
                                    return(
                                      <a href="#" key={i}>#{item.name}</a>
                                    )
                                  })
                                }
                              </div>
                          </div>
                      </div>
                      <div className="production">
                          <h6 className="hashtag-ico upcoming-ico">Upcoming deadlines</h6>
                          <div className="checklist-item">
                              <div className="sample-deadline">
                              {
                                upcomingDeadlines.map((item,i)=>{
                                  return(
                                    <div className="list" key={i}>
                                        <span>{item.productName}</span>
                                        <a href="#">{item.deliverableText}</a>
                                        <span>{convertTimeToLocal(item.deadline, '', 'DD.MM.YYYY')}</span>
                                    </div>
                                  )
                                })
                              }
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              {
                this.loadJsFiles()
              }
              <Modal
                show={postModal}
                onHide={() => this.setState({postModal: false})}
                dialogClassName="modal-lg"
                aria-labelledby="example-custom-modal-styling-title"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-custom-modal-styling-title">
                    Your post
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                      <div className="project-update-modal">
                          <div className="editor">
                              <div className="write">
                                {
                                  userInfo.profilePicDocument && userInfo.profilePicDocument.docUrl ?
                                  <img src={addImageSuffix(userInfo.profilePicDocument.docUrl, '_xicon')} alt="" className="user-photo"/> :
                                  <img src={require("../../../assets/images/pro_pic_default.svg")} className="user-photo" alt=""/>
                                }
                                      <div className="input-text">
                                          <p>{post}</p>
                                      </div>
                                      <div className="uploaded-photo">
                                      {
                                        documentDTOList.map((item,i)=>{
                                          return <img src={item.base64Str} alt=""/>
                                          // return(<img key={i} src={item.base64Str} style={{height:50,width:50,margin:5,border:'solid 1px black'}} />)
                                        })
                                      }

                                      </div>
                              </div>
                              <div className="footer-tab">
                                  <h6>Please select the style and deliverable:</h6>
                                  <select name="selectedProduct" onClick={this.onChangeFromPost}>
                                      <option value="">Style</option>
                                      {
                                        project.productResponseList &&
                                        project.productResponseList.map((item,i)=>{
                                          return(
                                            <option value={item.productNo} key={i}>{item.name}</option>
                                          )
                                        })
                                      }
                                  </select>
                                  <div className="stage"><span onClick={() => this.setState({deliverableFlag : !deliverableFlag})}>{ !selectedDeliverableText ? 'Deliverables' : selectedDeliverableText }</span>
                                    {
                                      deliverableFlag ?
                                      <div className="sub-stage">
                                      {
                                        this.loadDeliverableList()
                                      }
                                      </div>
                                      :
                                      <></>
                                    }

                                  </div>

                              </div>
                              <div className="submit-option">
                                  {/*<button className="btn-brand" disabled onClick={() => this.sendPost(true)}>Post</button>*/}
                                  {
                                    !selectedProduct && !selectedDeliverable ?
                                    <button className="btn-brand" onClick={() => this.sendPost()}>Skip & Post</button>:
                                    (
                                      !selectedProduct || !selectedDeliverable ?
                                      <button className="btn-brand" disabled>Post</button>:
                                      <button className="btn-brand" onClick={() => this.sendPost(1)}>Post</button>
                                    )
                                  }
                              </div>
                          </div>
                      </div>
                  </LoadingOverlay>
                </Modal.Body>
              </Modal>
          </LoadingOverlay>
        );
    }
}

const mapStateToProps = store => {
	return {
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUpdateComponent);
