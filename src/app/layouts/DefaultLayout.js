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
      console.log("entered outside")
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        console.log("entered inside")
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

                     <Link to="/dashboard" className="btn_dash_menu">
                         <Link to="/dashboard">
                             <img src={require("../assets/icons/dashboard.png")} alt="notification"/>
                             Dashboard
                         </Link>
                     </Link>

                      {/* Sidebar Toggle (Topbar) */}
                      <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                          <i className="fa fa-bars"></i>
                      </button>

                      {/* Topbar Search */}
                      {/*<form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">*/}
                      {/*    <div className="input-group">*/}
                      {/*        /!* <div className="input-group-prepend">*/}
                      {/*            <button className="btn p-1">*/}
                      {/*                <i className="fas fa-search fa-sm"></i>*/}
                      {/*            </button>*/}
                      {/*        </div> *!/*/}
                      {/*        <div className="input-group-prepend">*/}
                      {/*            <span className="input-group-text">*/}
                      {/*                <img src={require("../assets/icons/search.png")} alt="search" className="img-fluid" style={{width: '14px'}} />*/}
                      {/*            </span>*/}
                      {/*        </div>*/}
                      {/*        <input type="text" className="form-control border-0 small" placeholder="Search..." aria-label="Search" aria-describedby="basic-addon2" />*/}
                      {/*    </div>*/}
                      {/*</form>*/}
                      {/* Topbar Navbar */}
                      <ul className="navbar-nav ml-auto align-items-center">

                          {/* Nav Item - Search Dropdown (Visible Only XS) */}
                          {/*<li className="nav-item dropdown no-arrow d-sm-none mobile-search">*/}
                          {/*    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
                          {/*        <i className="fas fa-search fa-fw"></i>*/}
                          {/*    </a>*/}
                          {/*    /!* Dropdown - Messages *!/*/}
                          {/*    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">*/}
                          {/*        <form className="form-inline mr-auto w-100 navbar-search">*/}
                          {/*            <div className="input-group">*/}
                          {/*                <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />*/}
                          {/*                <div className="input-group-append">*/}
                          {/*                <button className="btn btn-primary" type="button">*/}
                          {/*                    <i className="fas fa-search fa-sm"></i>*/}
                          {/*                </button>*/}
                          {/*                </div>*/}
                          {/*            </div>*/}
                          {/*        </form>*/}
                          {/*    </div>*/}
                          {/*</li>*/}

                          {/*<li className="nav-item instantQuotation">*/}
                          {/*    <a href="#" className="nav-link text-orange"  data-toggle="modal" data-target="#instantQuotation">*/}
                          {/*    <span style={{ marginRight: '3px' }}>*/}
                          {/*        <img src={require("../assets/icons/document.png")} alt="" className="img-fluid" style={{width:10}}/>*/}
                          {/*    </span>*/}

                          {/*    </a>*/}
                          {/*</li>*/}

                          <li className="nav-item notification-bell dropdown no-arrow ml-2">
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

                              </button>
                          </li>
                          <li className="nav-item quote-cart dropdown no-arrow mx-2 ml-2">
                              <button className="btn btn-outline-default nav-link" type="button" onClick={() => this.props.history.push('/quote-now')}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="19.021" height="19.082" viewBox="0 0 19.021 19.082">
                                      <g id="noun_shopping-cart_web_icon_854336" data-name="noun_shopping-cart web icon_854336" transform="translate(49.889 -80.016)">
                                          <path id="Path_27864" data-name="Path 27864" d="M42.864,39.978c-3.207-.245-6.422.018-9.63-.209-1.543-.109-.958-1.6-1.008-2.814-.006-.158-.024-.315-.035-.472a24.241,24.241,0,0,0,8.837-.683c.859-.23,1.422-2.431,1.74-3.149A12.44,12.44,0,0,0,43.881,28.2a.3.3,0,0,0-.292-.353c-4.327-.115-8.836.975-13.063-.294a7.13,7.13,0,0,0-.647-1.262c-.941-1.435-2.7-1.106-4.072-.629-.443.154-.693,1.127-.08.914,1.121-.389,2.242-.694,3.2.2a3.184,3.184,0,0,1,.733,1.147c-.088.2-.07.414.154.485l.021.006a21.583,21.583,0,0,1,.492,2.347c.588,3.109,1.331,6.261.914,9.44a.3.3,0,0,0,.292.353c.083.011.167.015.25.025-.049.065-.1.13-.144.2a1.856,1.856,0,0,0-.255.2c-.17.157-.351.43-.221.668,0,.005.007.008.01.013a2.079,2.079,0,0,0-.131.724c.011.791.669,1.181,1.364,1.348a.613.613,0,0,0,.672-.455,3.273,3.273,0,0,0-.155-2.337.8.8,0,0,0-.237-.262c2.854.239,5.719.064,8.58.177-.014.012-.03.023-.043.036-.341-.191-.925.414-.7.767.026.04.054.079.08.118A4.034,4.034,0,0,0,40.3,43.6a.3.3,0,0,0,.4.227c.638-.216,1.291-.561,1.379-1.3a1.585,1.585,0,0,0-.384-1.037,1.412,1.412,0,0,1,.426-.279.571.571,0,0,0,.295-.3c.051,0,.1,0,.153.008C43.027,40.958,43.462,40.023,42.864,39.978ZM30.905,28.7a20.367,20.367,0,0,0,4.938.387c.7-.016,7.148-.588,7.12-.03a12.612,12.612,0,0,1-1.447,4.495c-.6,1.28-.716,1.372-2.062,1.567a24.729,24.729,0,0,1-7.024.412.417.417,0,0,0-.313.1c-.113-1-.289-2-.467-2.984C31.424,31.385,31.26,30,30.905,28.7ZM31.922,42.04a1.145,1.145,0,0,1,.119-.492c.2.09.248.6.245,1.043A.635.635,0,0,1,31.922,42.04Zm9.253.723c0-.014,0-.027,0-.041a.262.262,0,0,1,.008.047S41.18,42.764,41.175,42.763Z" transform="translate(-75 55)" fill="#21242b" stroke="#21242b" strokeWidth="0.5"/>
                                      </g>
                                  </svg>
                                  <span className="quote-cart-count">{(this.props.quoteObj && this.props.quoteObj.products) ? this.props.quoteObj.products.length : 0}</span>
                              </button>
                          </li>

                          {/* Nav Item - Add New */}
                          {/*<li className="nav-item dropdown no-arrow mx-1 mr-3">*/}
                          {/*     <button className="btn btn-outline-default nav-link dropdown-toggle" type="button" id="dropdownNewButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
                          {/*        <img src={require("../assets/icons/plus_circle.png")} alt="" style={{width: '13px', marginRight: '2px'}} /> Add New*/}
                          {/*    </button>*/}
                          {/*    <div className="dropdown-menu dropdown-menu-override" aria-labelledby="dropdownNewButton">*/}
                          {/*        <a className="dropdown-item" data-toggle="modal" data-target="#newProject_1_4">New Project</a>*/}
                          {/*        <div className="dropdown-divider"></div>*/}
                          {/*        <a className="dropdown-item" data-toggle="modal" data-target="#AddNewProduct">New Product</a>*/}
                          {/*    </div> */}
                          {/*</li>*/}

                          {/* Nav Item - User Information */}
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
                                    to="/my-profile"
                                    >
                                      <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                      Profile
                                  </Link>
                                  <div className="dropdown-divider"></div>
                                  {/*<Link
                                    className="dropdown-item"
                                    to="/my-products"
                                    >
                                      <img src={require("../assets/icons/product-icon-black.png")} style={{marginRight:5,marginTop: -2}} alt=""/>
                                      My products
                                  </Link>
                                  <div className="dropdown-divider"></div>*/}
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
