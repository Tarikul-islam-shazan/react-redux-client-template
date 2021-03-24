import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import loadjs from 'loadjs';

import Sidebar from '../partials/Sidebar';
import Notification from '../partials/Notification';

import NewProjectModal from "../pages/dashboard/components/NewProjectModal";
import NewDevelopmentSuccessModal from "../pages/dashboard/components/NewDevelopmentSuccessModal";
import InstantQuotationModal from "../pages/dashboard/components/InstantQuotationModal";
import Modal from "../pages/design/components/Modal";
import AskForQuote from "../commonComponents/modals/AskForQuote";
import StartProject from "../commonComponents/modals/StartProject";

import { _storeData } from "../partials/actions";
import { _storeData as _storeQuoteData } from "../pages/design/actions";
import { addImageSuffix } from '../services/Util';

import {LOCAL_QUOTE_NOW_KEY} from '../constant';

// var stompClient = null;
// const DefaultLayout = ({children, ...rest}) => {
class DefaultLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
          showNotification : false
        };
        this.setWrapperRef = this.setWrapperRef.bind(this);
    }

    setWrapperRef = (node) => {
      this.wrapperRef = node;
    }

    handleClickOutside = (event) => {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        this.setState({
          showNotification : false
        })
      }
    }

    show = () => {
      this.setState({showNotification : true})
      this.props._storeData('notificationIconActive',false)
    }

    // clickDocument = (e) => {
    //   console.log("enterd clickDocument")
    //     var component = React.findDOMNode(this.refs.notification);
    //     if (e.target == component || $(component).has(e.target).length) {
    //         // Inside of the component.
    //         console.log("enterd component")
    //     } else {
    //         // Outside of the component.
    //         console.log("outside component")
    //     }
    //
    // }

    componentDidMount = () => {
      const hostName = window.location.toString();
      if( hostName.indexOf( "https://app.nitex.com" ) > -1 ){
          const script = document.createElement("script");
          script.src = "//js.hs-scripts.com/9310837.js";
          script.async = true;
          script.defer = true;
          document.body.appendChild(script);
      }

      window.addEventListener('mousedown', this.handleClickOutside);

      let quoteObj = localStorage.getItem(LOCAL_QUOTE_NOW_KEY);
      if (quoteObj) {
        quoteObj = JSON.parse(quoteObj);
      }
      this.props._storeQuoteData('quoteObj', quoteObj)
    }

    componentWillUnmount = () => {
      window.removeEventListener('mousedown', this.handleClickOutside);
    }

    render(){
      let userInfo = localStorage.getItem('userInfo');
      if(userInfo) {
        userInfo = JSON.parse(userInfo);
      } else {
        userInfo = {};
      }
      console.log("userInfo from layout", userInfo.businessInfoGiven)
      let { showNotification } = this.state;
      if (!userInfo.phoneVerified) {
          return <Redirect to="info" />
      }
      return (
          <>
              <Sidebar/>

              <div className="content">
                  <nav className="navbar navbar-expand navbar-light bg-white topbar static-top">



                      {/* Sidebar Toggle (Topbar) */}
                      <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                          <i className="fa fa-bars"></i>
                      </button>


                      <ul className="navbar-nav ml-auto align-items-center">

                          <li className="nav-item quote-cart dropdown no-arrow" data-toggle="tooltip" data-placement="top" title="" data-original-title="Request quote">
                              <button className="btn btn-outline-default nav-link" type="button" onClick={() => this.props.history.push('/quote-now')}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="19.372" height="19.372" viewBox="0 0 19.372 19.372">
                                      <g id="Group_11425" data-name="Group 11425" transform="translate(-1580.925 -30.129)">
                                          <g id="search_1_" data-name="search (1)" transform="translate(1580.925 30.129)">
                                              <g id="Group_11422" data-name="Group 11422">
                                                  <g id="Group_11421" data-name="Group 11421">
                                                      <path id="Path_29570" data-name="Path 29570" d="M8.183,0a8.183,8.183,0,1,0,8.183,8.183A8.192,8.192,0,0,0,8.183,0Zm0,14.935a6.752,6.752,0,1,1,6.752-6.752A6.759,6.759,0,0,1,8.183,14.935Z" fill="#21242b"/>
                                                  </g>
                                              </g>
                                              <g id="Group_11424" data-name="Group 11424" transform="translate(12.74 12.74)">
                                                  <g id="Group_11423" data-name="Group 11423">
                                                      <path id="Path_29571" data-name="Path 29571" d="M343.131,342.12l-5.2-5.2a.716.716,0,0,0-1.012,1.012l5.2,5.2a.716.716,0,0,0,1.012-1.012Z" transform="translate(-336.708 -336.709)" fill="#21242b"/>
                                                  </g>
                                              </g>
                                          </g>
                                          <g id="dollar" transform="translate(1586.549 33.297)">
                                              <g id="Group_11395" data-name="Group 11395" transform="translate(0 0)">
                                                  <path id="Path_29558" data-name="Path 29558" d="M112.695,4.116V2.026a2.787,2.787,0,0,1,1.229.534.44.44,0,0,0,.244.077.511.511,0,0,0,.511-.5.453.453,0,0,0-.131-.321,3.134,3.134,0,0,0-1.859-.748v-.7A.362.362,0,0,0,112.327,0h-.012a.368.368,0,0,0-.374.363V1.04A2.152,2.152,0,0,0,109.7,3.059c0,1.348,1.146,1.722,2.245,2.019V7.454a3.083,3.083,0,0,1-1.574-.695.494.494,0,0,0-.3-.107.517.517,0,0,0-.481.523.453.453,0,0,0,.131.321,3.5,3.5,0,0,0,2.227.9v.653s0,.008,0,.012a.368.368,0,0,0,.385.35.362.362,0,0,0,.362-.362V8.38a2.126,2.126,0,0,0,2.275-2.138C114.969,4.841,113.793,4.413,112.695,4.116Zm-.748-.19c-.647-.19-1.152-.386-1.152-.938s.457-.95,1.152-1Zm.748,3.54V5.3c.671.19,1.194.445,1.188,1.069C113.883,6.824,113.574,7.359,112.695,7.466Z" transform="translate(-109.589 0)" fill="#21242b"/>
                                              </g>
                                          </g>
                                      </g>
                                  </svg>

                                  {
                                    (this.props.quoteObj && this.props.quoteObj.products && this.props.quoteObj.products.length) ?
                                    <span className="quote-cart-count">{this.props.quoteObj.products.length}</span>
                                    : <></>
                                  }
                              </button>
                          </li>

                          <li className="nav-item notification-bell dropdown no-arrow mx-3" data-toggle="tooltip" data-placement="top" title="" data-original-title="Notification">
                              <button className="btn btn-outline-default nav-link" type="button" id="dropdownNotification" onClick={this.show}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14.187" height="18.302" viewBox="0 0 14.187 18.302">
                                      <path id="bell" d="M14.829,19a3,3,0,0,1-5.658,0H7.578a2.5,2.5,0,0,1-2.285-3.515L6,13.894V11a6,6,0,0,1,4-5.659V5a2,2,0,1,1,4,0v.341A6,6,0,0,1,18,11v2.894l.707,1.591A2.5,2.5,0,0,1,16.423,19Zm-1.1,0H10.267a2,2,0,0,0,3.466,0ZM13,5.083V5a1,1,0,0,0-2,0v.083A6.068,6.068,0,0,1,13,5.083ZM12,6a5,5,0,0,0-5,5v3l-.043.2-.75,1.688A1.5,1.5,0,0,0,7.578,18h8.845a1.5,1.5,0,0,0,1.371-2.109l-.75-1.688L17,14V11A5,5,0,0,0,12,6Z" transform="translate(-4.907 -2.85)" fill="#21242b" stroke="#21242b" strokeWidth="0.3"/>
                                  </svg>

                                  {
                                    this.props.notificationIconActive ?
                                    <span className="unread-notification"></span>
                                    :<></>
                                  }

                                  {
                                    showNotification ? <div ref={this.setWrapperRef}><Notification /></div> : <></>
                                  }
                                  {/*<span className="notification-count">123</span>*/}

                              </button>
                          </li>

                          <li className="nav-item dropdown no-arrow">
                              <button className="btn btn-outline-default nav-link dropdown-toggle" type="button" id="dropdownProfileButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  {
                                    userInfo && userInfo.profilePicDocument ?
                                    <img className="img-profile rounded-circle" src={addImageSuffix(userInfo.profilePicDocument.docUrl, '_xicon')} />
                                    :
                                    <img className="img-profile rounded-circle" src={require("../assets/images/pro_pic_default.svg")} />
                                  }
                                  <span className="mr-2 d-none d-lg-inline">{userInfo ? userInfo.name : 'Anonymous'}</span>
                              </button>
                              {/* Dropdown - User Information */}
                              <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="dropdownProfileButton">
                                  <Link
                                    className="dropdown-item"
                                    to="/dashboard"
                                    >
                                      <i className="fas fa-tachometer-alt mr-2 text-gray-400 font-12"></i>
                                      Dashboard
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to="/my-profile"
                                    >
                                      <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                      Profile
                                  </Link>
                                  <div className="dropdown-divider"></div>

                                  <a className="dropdown-item" href="/logout">
                                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                      Logout
                                  </a>
                              </div>
                          </li>

                      </ul>

                  </nav>

                  <div className="wraper container-fluid dashboard-container">
                      { this.props.children }
                  </div>
                  <NewProjectModal/>
                  <InstantQuotationModal/>
                  <NewDevelopmentSuccessModal/>
                  <AskForQuote />
                  <StartProject />
                  <Modal type="addNewProduct" id="AddNewProduct" />
              </div>
          </>
      );
    }

};
const mapStateToProps = store => ({
    notificationIconActive : store.notification.notificationIconActive,
    quoteObj: store.product.quoteObj
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
      _storeData, _storeQuoteData
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
