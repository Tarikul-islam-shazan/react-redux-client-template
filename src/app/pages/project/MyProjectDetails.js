import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from "loadjs";
import $ from 'jquery';

import ProjectModal from './components/ProjectModal';
import ProjectUpdate from './components/ProjectUpdateComponent';

import PaymentList from './components/PaymentList';
import GivePayment from './components/GivePayment';
import ViewInvoice from './components/ViewInvoice';
import Comments from './components/Comments';
import { ProjectStatus } from './components/ProjectStatus';

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../services/Http';
import { toastSuccess, toastError } from '../../commonComponents/Toast';

import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';
import { deliverableStatus, convertTimeToLocal } from '../../services/Util';

class MyProjectDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modalView:0,
          selectedProductId:0,
          paymentTab:0,
          showComment:0,
          data : {},
          modalData : {},
          userInfo : {},
          tabFlag : 1,
          selectedInvoice : 0,
          tabIndex : 1,
          filterablePostId : 0
        };
        this.setWrapperRef = this.setWrapperRef.bind(this);
    }

    setWrapperRef = (node) => {
      this.wrapperRef = node;
    }

    handleClickOutside = (event) => {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        // alert('You clicked outside of me!');
        let { data } = this.state;
        data.productResponseList = data.productResponseList.map((item)=>{
          item.commentModal = false;
          return item;
        })
        this.setState({data})
      }
    }

    componentWillUnmount() {
      // document.removeEventListener('mousedown', this.handleClickOutside);
    }

    componentDidMount = async() => {
      document.title = "Project details on Nitex - The easiest clothing manufacturing software";
      document.addEventListener('mousedown', this.handleClickOutside);
      let id = this.props.match.params.id;
      let name = 'tab';
      let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      let results = regex.exec(this.props.location.search);
      let name2 = 'postId';
      let regex2 = new RegExp('[\\?&]' + name2 + '=([^&#]*)');
      let results2 = regex2.exec(this.props.location.search);

      let userInfo = await JSON.parse(localStorage.getItem('userInfo'));
      this.setState({userInfo});
      await Http.GET('getProjectDetails',id)
        .then(({data}) => {
          console.log('PROJECT DETAILS SUCCESS: ', data);
          if(data){
            document.title = data.name;
            let result = data;
            if(result.productResponseList){
              result.productResponseList = result.productResponseList.map((item) => {
                item.commentModal = false;
                return item;
              })
            }
            // console.log("result",result)
            this.setState({
              loading:false,
              data : result
            })
          }else{
            this.setState({
              loading:false
            })
            toastError(data.message);
          }
          loadjs(['/js/script.js','/js/custom.js']);
        })
        .catch(response => {
            console.log('PRODUCT DETAILS ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            toastError("Something went wrong! Please try again.");
        });


        await this.setState({
          tabFlag : results === null ? '1' : decodeURIComponent(results[1].replace(/\+/g, ' ')),
          filterablePostId : results2 === null ? 0 : decodeURIComponent(results2[1].replace(/\+/g, ' '))
        });

      // loadjs(['/js/script.js','/js/custom.js']);
    }

    back = () => {
      this.props.history.push('/orders/my-orders');
    }

    setModalData = async(selectedProductId) => {
      console.log("show modal",selectedProductId);
      await this.setState({
        selectedProductId,
        loading : true
      });
      await Http.GET('getProjectProductDetails',selectedProductId)
        .then(({data}) => {
          console.log('PROJECT PRODUCT DETAILS SUCCESS: ', data);
          if(data){
            this.setState({
              loading:false,
              modalData : data
            })
          }else{
            this.setState({
              loading:false
            })
            toastError(data.message);
          }
          // loadjs(['/js/script.js','/js/custom.js']);
        })
        .catch(response => {
            console.log('PROJECT PRODUCT DETAILS ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            toastError("Something went wrong! Please try again.");
        });
    }

    changePaymentTab = (tab,invoiceId = 0) => {
      this.setState({
        paymentTab:tab,
        selectedInvoice : invoiceId
      })
    }

    showCommentModal = (i) => {
      let { data } = this.state;
      data.productResponseList[i].commentModal = true;
      this.setState({data})
    }

    renderPaymentTab = () =>{
      if(this.state.paymentTab==0){
        return (<PaymentList switchTab={this.changePaymentTab} projectId={this.props.match.params.id} />)
      }else if(this.state.paymentTab==1){
        return (<GivePayment switchTab={this.changePaymentTab} invoiceId={this.state.selectedInvoice} setModal={this.setModal} />)
      } else if (this.state.paymentTab==3) {
        return (<ViewInvoice switchTab={this.changePaymentTab} invoiceId={this.state.selectedInvoice} projectId={this.props.match.params.id} />)
      }
    }

    render() {
        let { data, modalView, modalData, userInfo, tabFlag, filterablePostId } = this.state;
        // console.log("data from render",data)
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
                <section className="project-profile">
                    <a className="back" onClick={this.back}>Back</a>
                    <div className="quote-tab">
                        <ul className="nav nav-tabs justify-content-center">
                            <li><a className={"ps-ico "+(tabFlag==1 ? 'active':'')} data-toggle="tab" href="#ProjectSummary" onClick={()=>this.setState({tabFlag:1})}>Order summary</a></li>
                            <li><a className={"pu-ico "+(tabFlag==2 ? 'active':'')} data-toggle="tab" href="#ProjectUpdates" onClick={()=>this.setState({tabFlag:2})}>Order updates</a></li>
                            <li><a className={"payment-ico "+(tabFlag==3 ? 'active':'')} data-toggle="tab" href="#Payments" onClick={()=>this.setState({tabFlag:3})}>Payments</a></li>
                        </ul>
                        <div className="tab-content">
                            <div id="ProjectSummary" className={"tab-pane "+(tabFlag==1 ? 'active':'fade')}>
                                <ProjectStatus data={data}/>
                                <h6 className="style-overview">Design overview</h6>
                                <div className="style-overview">
                                {
                                  data.productResponseList &&
                                  data.productResponseList.map((item,i)=>{
                                    return(
                                      <div className="overview" key={i}>
                                          <div className="style-info" data-toggle="modal" data-target="#project-common" onClick={(e) => this.setModalData(item.productNo)}>
                                              <div className="info">
                                                  <label className="font-16 text-muted">Design No</label>
                                                  <h6>{item.productNo}</h6>
                                              </div>
                                              <div className="info">
                                                  <label className="font-16 text-muted">Design title</label>
                                                  <h6>{item.name}</h6>
                                              </div>
                                          </div>
                                          <div className="project-status checklist-status" data-toggle="modal" data-target="#project-common" onClick={(e) => this.setModalData(item.productNo)}>
                                              <div className="head">
                                                  <label className="font-16 text-muted">Checklist Status</label>
                                                  <div className="percentage">{`${item.percentageComplete}%`}</div>
                                              </div>
                                              <div className="progress">
                                                  <div className="progress-bar" role="progressbar"  style={{width: `${item.percentageComplete}%`}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                              </div>
                                          </div>
                                          <div className="style-status">
                                              <div className="badge-list" data-toggle="modal" data-target="#project-common" onClick={(e) => this.setModalData(item.productNo)}>
                                                  <span className="badge table-badge" style={{backgroundColor: '#fff', color: '#21242B', border: '1px solid #D1D5DF'}}>{item.deliverableResponse ? item.deliverableResponse.deliverableText : 'n/A'}</span>
                                                  {
                                                    item.deliverableResponse ? deliverableStatus(item.deliverableResponse) : ''
                                                  }
                                              </div>
                                              <div className="comment-status active" onClick={() => this.showCommentModal(i)}>
                                                {item.commentModal ? <div ref={this.setWrapperRef}>
                                                                        <Comments
                                                                          deliverableId={item.deliverableResponse=={} ? 0 : item.deliverableResponse.id} />
                                                                     </div> : <></>}
                                              </div>
                                          </div>
                                          <div className="due-date" data-toggle="modal" data-target="#project-common" onClick={(e) => this.setModalData(item.productNo)}>
                                              <span>Due date</span>
                                              <strong>{item.deliverableResponse ? convertTimeToLocal(item.deliverableResponse.deadline, '', 'MMM DD, YYYY') : 'N/A'}</strong>
                                          </div>
                                      </div>
                                    )
                                  })
                                }
                                </div>
                            </div>
                            <div id="ProjectUpdates" className={"tab-pane "+(tabFlag==2 ? 'active':'fade')}>
                                {
                                  tabFlag == 2 &&
                                  <ProjectUpdate project={data} projectId={this.props.match.params.id} userInfo={userInfo} tabIndex={this.state.tabIndex} history={this.props.history} filterablePostId={filterablePostId} />
                                }
                            </div>
                            <div id="Payments" className={"tab-pane "+(tabFlag==3 ? 'active':'fade')}>
                                { tabFlag == 3 &&
                                  this.renderPaymentTab()
                                }
                            </div>
                        </div>
                    </div>
                </section>
                <ProjectModal view={modalView} data={modalData} userInfo={userInfo}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyProjectDetails);
