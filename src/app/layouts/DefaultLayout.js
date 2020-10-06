import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import Sidebar from '../partials/Sidebar';
import Notification from '../partials/Notification';

import NewProjectModal from "../pages/dashboard/components/NewProjectModal";
import NewDevelopmentSuccessModal from "../pages/dashboard/components/NewDevelopmentSuccessModal";
import InstantQuotationModal from "../pages/dashboard/components/InstantQuotationModal";
import Modal from "../pages/design/components/Modal";
import AskForQuote from "../commonComponents/modals/AskForQuote";
import StartProject from "../commonComponents/modals/StartProject";

import { _storeData } from "../partials/actions";

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
      window.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount = () => {
      window.removeEventListener('mousedown', this.handleClickOutside);
    }

    render(){
      let userInfo = localStorage.getItem('userInfo');
      if(userInfo){
        userInfo = JSON.parse(userInfo);
      }
      let { showNotification } = this.state;
      // console.log("userInfo from layout",userInfo)
      return (
          <>
              <Sidebar/>

              <div className="content">
                  <nav className="navbar navbar-expand navbar-light bg-white topbar static-top">
                      {/* Sidebar Toggle (Topbar) */}
                      <button id="sidebarToggleTop" className="btn btn-link d-xl-none rounded-circle mr-3">
                          <i className="fa fa-bars"></i>
                      </button>

                      {/* Topbar Search */}
                      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                          <div className="input-group">
                              {/* <div className="input-group-prepend">
                                  <button className="btn p-1">
                                      <i className="fas fa-search fa-sm"></i>
                                  </button>
                              </div> */}
                              <div className="input-group-prepend">
                                  <span className="input-group-text">
                                      <img src={require("../assets/icons/search.png")} alt="search" className="img-fluid" style={{width: '14px'}} />
                                  </span>
                              </div>
                              <input type="text" className="form-control border-0 small" placeholder="Search..." aria-label="Search" aria-describedby="basic-addon2" />
                          </div>
                      </form>
                      {/* Topbar Navbar */}
                      <ul className="navbar-nav ml-auto align-items-center">

                          {/* Nav Item - Search Dropdown (Visible Only XS) */}
                          <li className="nav-item dropdown no-arrow d-sm-none mobile-search">
                              <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <i className="fas fa-search fa-fw"></i>
                              </a>
                              {/* Dropdown - Messages */}
                              <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                                  <form className="form-inline mr-auto w-100 navbar-search">
                                      <div className="input-group">
                                          <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                          <div className="input-group-append">
                                          <button className="btn btn-primary" type="button">
                                              <i className="fas fa-search fa-sm"></i>
                                          </button>
                                          </div>
                                      </div>
                                  </form>
                              </div>
                          </li>

                          <li className="nav-item instantQuotation">
                              <a href="#" className="nav-link text-orange"  data-toggle="modal" data-target="#instantQuotation">
                              <span style={{ marginRight: '3px' }}>
                                  <img src={require("../assets/icons/document.png")} alt="" className="img-fluid" style={{width:10}}/>
                              </span>
                                  Instant Quotation
                              </a>
                          </li>

                          <li className="nav-item notification-bell dropdown no-arrow mx-1 ml-2">
                              <button className="btn btn-outline-default nav-link" type="button" id="dropdownNotification" onClick={this.show}>
                                  <img src={require("../assets/icons/notification-bell.png")} alt="notification"/>
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

                          {/* Nav Item - Add New */}
                          <li className="nav-item dropdown no-arrow mx-1 mr-3">
                             {/* <button className="btn btn-outline-default nav-link dropdown-toggle" type="button" id="dropdownNewButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <img src={require("../assets/icons/plus_circle.png")} alt="" style={{width: '13px', marginRight: '2px'}} /> Add New
                              </button>
                              <div className="dropdown-menu dropdown-menu-override" aria-labelledby="dropdownNewButton">
                                  <a className="dropdown-item" data-toggle="modal" data-target="#newProject_1_4">New Project</a>
                                  <div className="dropdown-divider"></div>
                                  <a className="dropdown-item" data-toggle="modal" data-target="#AddNewProduct">New Product</a>
                              </div>*/}
                          </li>

                          {/* Nav Item - User Information */}
                          <li className="nav-item dropdown no-arrow">
                              <button className="btn btn-outline-default nav-link dropdown-toggle" type="button" id="dropdownProfileButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  {
                                    userInfo && userInfo.profilePicDocument ?
                                    <img className="img-profile rounded-circle" src={userInfo.profilePicDocument.docUrl} />
                                    :
                                    <img className="img-profile rounded-circle" src={require("../assets/images/pro_pic_default.png")} />
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
    notificationIconActive : store.notification.notificationIconActive
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
      _storeData
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
