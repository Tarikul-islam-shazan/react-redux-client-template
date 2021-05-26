import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from "loadjs";
import RichTextEditor from 'react-rte';

import Http from '../../../services/Http';
import { toastSuccess, toastError } from '../../../commonComponents/Toast';
import { addImageSuffix, convertTimeToLocal, parseHtml } from '../../../services/Util';

let toolbarConfig = {display: []};

class FitSampleEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
          id: this.props.deliverableId,
          deliverableText: this.props.deliverableText,
          comments: [],
          comment: RichTextEditor.createEmptyValue(),
          loading: false,
          date: '',
          status: ''
        };
    }

    componentDidMount = async() => {
      let { id } = this.state;
      let userInfo = await JSON.parse(localStorage.getItem('userInfo'));
      this.setState({
        userInfo
      })
      loadjs(['/js/script.js','/js/custom.js']);
      if(id){
        this.loadComments(id);
      }
    }

    onChange = (e) => {
      this.setState({
        [e.target.name] : e.target.value
      })
    }

    onChangeRT = (val, key) => {
      this.setState({
        [key]: val
      })
    }

    handleReturn = async(event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        this.setState({
          loading : true
        })
        let { id, comment } = this.state;
        await Http.POST('sendDeliverableMessages', {message: comment.toString('html')}, id)
          .then(({data}) => {
            console.log('COMMENT POST SUCCESS: ', data);
            // localStorage.removeItem('token');
            if(data.success){
              this.setState({
                loading: false,
                comment: RichTextEditor.createEmptyValue()
              })
              toastSuccess(data.message);
              this.loadComments(id)
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
    }

    loadComments = async(id) => {
      this.setState({
        loading : true
      })
      let param = id + '/?sort=datePosted,desc'
      await Http.GET('getDeliverableMessages',param)
        .then(({data}) => {
          console.log('COMMENT SUCCESS: ', data);
          // localStorage.removeItem('token');
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
        .catch(response => {
            console.log('COMMENT ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            toastError("Something went wrong! Please try again.");
        });
    }

    updateDeliverable = async() => {
      let { status, date } = this.state;
      if(!date && !status){
        toastError("Select status or deadline");
      }
      let body = {};
      if(date){
        let res = date.split("-");
        // console.log
        if(res.length==3){
          date = res[2]+'/'+res[1]+'/'+res[0];
        }
        body['date'] = date;
      }
      if(status){
        body['status'] = status
      }
      await Http.POST('updateDeliverables',body,this.state.id)
        .then(({data}) => {
          console.log('updateDeliverables SUCCESS: ', data);
          // localStorage.removeItem('token');
          if(data.success){
            toastSuccess(data.message);
            this.setState({
              status:'',
              date:''
            })
            window.location.reload()
            // loadjs(['/js/script.js','/js/custom.js']);
          }else{
            toastError("Request wasn't successful.");
          }
        })
        .catch(response => {
            console.log('updateDeliverables: ', JSON.stringify(response));
            this.setState({loading:false})
            toastError("Something went wrong! Please try again.");
        });
    }

    render() {
        let { comment, comments, userInfo, id, deliverableText } = this.state;
        return (
            <div className="messages-popup custom-scrollbar">
                <div className="production">
                    <h6>{`#${id}`} <span className="float-right">{deliverableText}</span></h6>
                    <div className="status-n-date-container">
                        <div className="comment-n-action">
                            <div style={{width:'unset'}}>
                                <label>Status</label>
                                <select name="status" onClick={this.onChange}>
                                  <option value="">Select</option>
                                  {
                                    this.props.statusList.map((item, i) => {
                                      return <option key={i} value={item}>{item}</option>
                                    })
                                  }
                                </select>
                            </div>
                            <div className="date-select">
                                <label>Date</label>
                                <input type="date" name="date" onChange={this.onChange} placeholder="dd.mm.yyyy"/>
                            </div>
                            <button className="btn-brand btn-sm" onClick={this.updateDeliverable}>Submit</button>
                        </div>
                    </div>
                    <h6 className="font-14 py-2 border-0">Feedback</h6>
                    <div className="write">
                        <div className="rich-text-editor">
                        {
                          userInfo && userInfo.profilePicDocument && userInfo.profilePicDocument.docUrl ?
                          <img src={addImageSuffix(userInfo.profilePicDocument.docUrl, '_xicon')} className="user-photo"/> :
                          <img src={require("../../../assets/images/pro_pic_default.svg")} alt="" className="user-photo"/>
                        }
                        <RichTextEditor
                          className="rich-text"
                          toolbarConfig={toolbarConfig}
                          value={comment}
                          placeholder="Write here....."
                          onChange={(val) => this.onChangeRT(val, 'comment')}
                          handleReturn={this.handleReturn}
                          toolbarStyle={{display: 'none'}}
                        />
                    </div>
                    </div>
                    {
                      comments.map((item,i)=>{
                        return(
                          <div className="post" key={item.id}>
                              <div className="post-heading">
                                  <div className="header-title">
                                    {
                                      item.postedBy && item.postedBy.imageUrl ?
                                      <img src={addImageSuffix(item.postedBy.imageUrl, '_xicon')} className="user-photo"/> :
                                      <img src={require("../../../assets/images/pro_pic_default.svg")} alt="" className="user-photo"/>
                                    }
                                      <div className="name-n-date">
                                          <h4>{item.postedBy.name}</h4>
                                          <span className="dot">{convertTimeToLocal(item.date, item.time, 'MMM DD, YYYY hh:mm a')}</span>
                                      </div>
                                      {/*<div className="post-type">Query</div>*/}
                                  </div>
                              </div>
                              <div className="post-description">
                                  <div dangerouslySetInnerHTML={{ __html: parseHtml(item.text) }}/>
                                  {/*<p>{item.text}</p>*/}
                              </div>
                          </div>
                        )
                      })
                    }
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FitSampleEdit);
