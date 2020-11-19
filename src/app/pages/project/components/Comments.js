import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../../services/Http';
import { toastSuccess, toastError } from '../../../commonComponents/Toast';
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../../constant';
import { addImageSuffix, convertTimeToLocal } from '../../../services/Util';

class Comments extends Component {

    constructor(props) {
        super(props);
        this.state = {
          id : this.props.deliverableId,
          comments : [],
          comment : '',
          loading : false,
          userInfo : {}
        };
    }

    componentDidMount = async() => {
      let { id } = this.state;
      let userInfo = await JSON.parse(localStorage.getItem('userInfo'));
      this.setState({
        userInfo
      })
      if(id){
        this.loadComments(id);
      }
    }

    onChange = (e) => {
      this.setState({
        [e.target.name] : e.target.value
      })
    }

    keyPressed = async(e) => {
      if(e.key==='Enter'){
        this.setState({
          loading : true
        })
        let { id, comment } = this.state;
        await Http.POST('sendDeliverableMessages',{message:comment},id)
          .then(({data}) => {
            console.log('COMMENT POST SUCCESS: ', data);
            if(data.success){
              this.setState({
                loading:false,
                comment : ''
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

    render() {
        let { comment, comments, userInfo } = this.state;
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
            <div className="messages-popup">
                <div className="production">
                    <h6>Messages</h6>
                    <div className="write">
                      {
                        userInfo && userInfo.profilePicDocument && userInfo.profilePicDocument.docUrl ?
                        <img src={addImageSuffix(userInfo.profilePicDocument.docUrl, '_xicon')} className="user-photo"/> :
                        <img src={require("../../../assets/images/pro_pic_default.png")} alt="" className="user-photo"/>
                      }
                        <textarea
                          name="comment"
                          value={comment}
                          onChange={this.onChange}
                          onKeyPress={this.keyPressed}
                          rows="4"
                          placeholder="Write here.....">
                        </textarea>
                    </div>
                    <h6>Feedbacks</h6>
                    {
                      comments.map((item,i) => {
                        return(
                          <div className="post" key={i}>
                              <div className="post-heading">
                                  <div className="header-title">
                                    {
                                      item.postedBy && item.postedBy.imageUrl ?
                                      <img src={addImageSuffix(item.postedBy.imageUrl, '_xicon')} className="user-photo"/> :
                                      <img src={require("../../../assets/images/pro_pic_default.png")} alt="" className="user-photo"/>
                                    }
                                      <div className="name-n-date">
                                          <h4>{item.postedBy.name}</h4>
                                          <span>{convertTimeToLocal(item.date, item.time, 'MMM DD, YYYY hh:mm a')}</span>
                                      </div>
                                      {/*<div className="post-type">Query</div>*/}
                                  </div>
                              </div>
                              <div className="post-description">
                                  <p>{item.text}</p>
                              </div>
                          </div>
                        )
                      })
                    }
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
