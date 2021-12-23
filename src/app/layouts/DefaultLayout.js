import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import $ from "jquery";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from "loadjs";

import Sidebar from "../partials/Sidebar";
import Notification from "../partials/Notification";

// import NewProjectModal from "../pages/dashboard/components/NewProjectModal";
// import NewDevelopmentSuccessModal from "../pages/dashboard/components/NewDevelopmentSuccessModal";
// import InstantQuotationModal from "../pages/dashboard/components/InstantQuotationModal";
import Modal from "../pages/design/components/Modal";
import AskForQuote from "../commonComponents/modals/AskForQuote";
import StartProject from "../commonComponents/modals/StartProject";

import { _storeData } from "../partials/actions";
import { _storeData as _storeQuoteData } from "../pages/design/actions";
import {addImageSuffix, isValidJSON} from "../services/Util";

import {getOneSignalAppId, LOCAL_QUOTE_NOW_KEY} from "../constant";
import Http from '../services/Http';

// var stompClient = null;
// const DefaultLayout = ({children, ...rest}) => {
class DefaultLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNotification: false,
        };
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.OneSignal = window.OneSignal || [];
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    };

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                showNotification: false,
            });
        }
    };

    getUnseenNotificationCount = async () => {
        await Http.GET('getUnseenNotificationCount')
            .then(({ data }) => {
                this.props._storeData('unseenCount', data);
            })
            .catch(({ response }) => {});
    };


    show = () => {
        this.setState({ showNotification: true });
        this.props._storeData("notificationIconActive", false);
    };

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

    setupOneSignal = async () => {
        try {
            // this.OneSignal = window.OneSignal || [];
            // if (this.OneSignal.installServiceWorker) {
            //   this.OneSignal.installServiceWorker();
            // } else {
            //   if (navigator.serviceWorker) {
            //     navigator.serviceWorker.register(`./OneSignalSDKWorker.js?appId=${getOneSignalAppId()}`);
            //   }
            // }
            let userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                userInfo = JSON.parse(userInfo);
            } else {
                userInfo = {};
            }
            this.OneSignal.push(() => {
                this.OneSignal.init({
                    appId: getOneSignalAppId()
                });
            });
            console.log(this.OneSignal)
            let userId = null;
            await this.OneSignal.getExternalUserId().then((res) => {
                //console.log('res from getExternalUserId', res);
                userId = parseInt(res);
            });
            //console.log('getExternalUserId', userId);
            if (parseInt(userId) !== userInfo.id) {
                //console.log('entered condition setExternalUserId');
                this.OneSignal.setExternalUserId(userInfo.id.toString());
            }
            this.OneSignal.log.setLevel('trace');
            this.OneSignal.on('notificationDisplay', (event) => {
                let { data } = event;
                if (
                    data &&
                    data.category &&
                    ['COLLECTION', 'INVOICE', 'ORDER', 'POST', 'PRODUCT', 'RFQ', 'STEP'].includes(
                        data.category
                    )
                ) {
                    data.body = data.body && isValidJSON(data.body) ? JSON.parse(data.body) : {};
                    this.props._storeData('notifications', [data, ...this.props.notifications]);
                    this.props._storeData('unseenCount', parseInt(this.props.unseenCount) + 1);
                }
            });
            this.OneSignal.log.setLevel('trace');
            this.OneSignal.on('notificationDisplay', (event) => {
                let { data } = event;
                if (
                    data &&
                    data.category &&
                    ['COLLECTION', 'INVOICE', 'ORDER', 'POST', 'PRODUCT', 'RFQ', 'STEP'].includes(
                        data.category
                    )
                ) {
                    data.body = data.body && isValidJSON(data.body) ? JSON.parse(data.body) : {};
                    this.props._storeData('notifications', [data, ...this.props.notifications]);
                    this.props._storeData('unseenCount', parseInt(this.props.unseenCount) + 1);
                }
            });
            this.OneSignal.on('notificationDismiss', (event) => {
                console.warn('OneSignal notification dismissed:', event);
            });
            this.OneSignal.on('addListenerForNotificationOpened', (event) => {
                console.warn('OneSignal notification dismissed:', event);
            });
            this.OneSignal.on('subscriptionChange', (isSubscribed) => {
                console.warn('OneSignal subscriptionChange:', isSubscribed);
                localStorage.setItem('subscriptionStatus', isSubscribed ? 'subscribed' : 'notSubscribed');
                if (isSubscribed && parseInt(userId) !== userInfo.id) {
                    //console.log('entered condition setExternalUserId');
                    this.OneSignal.setExternalUserId(userInfo.id.toString());
                }
            });
        } catch (e) {
            //console.log('error', e.message);
        }
    };

    componentDidMount = () => {
        const hostName = window.location.toString();
        if (hostName.indexOf("https://app.nitex.com") > -1) {
            const script = document.createElement("script");
            script.src = "//js.hs-scripts.com/9310837.js";
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
        }

        window.addEventListener("mousedown", this.handleClickOutside);
        this.getUnseenNotificationCount();
        let quoteObj = localStorage.getItem(LOCAL_QUOTE_NOW_KEY);
        if (quoteObj) {
            quoteObj = JSON.parse(quoteObj);
        }
        this.props._storeQuoteData("quoteObj", quoteObj);
        this.setupOneSignal()
    };

    componentWillUnmount = () => {
        window.removeEventListener("mousedown", this.handleClickOutside);
    };

    logout = async () => {
        try {
            this.OneSignal.removeExternalUserId();
        } catch (e) {
            //console.log(e.message);
        }
        this.props.history.push('/logout');
    };

    render() {
        let { pathname } = this.props.history.location;
        let userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            userInfo = JSON.parse(userInfo);
        } else {
            userInfo = {};
        }
        let { showNotification } = this.state;
        if (!userInfo.phoneVerified) {
            return <Redirect to="info" />;
        }

        return (
            <>
                <Sidebar activePath={pathname} />

                <div className="content">
                    <nav className="navbar navbar-expand navbar-light bg-white topbar static-top">
                        {/* Sidebar Toggle (Topbar) */}
                        <button
                            id="sidebarToggleTop"
                            className="btn btn-link d-md-none rounded-circle mr-3"
                        >
                            <i className="fa fa-bars"></i>
                        </button>

                        <ul className="navbar-nav ml-auto align-items-center">
                            <li className={pathname === "/tasks" ? "active" : ""}>
                                {/* <Link className="dropdown-item my-task-btn" to="/tasks">
                              
                            </Link> */}
                                <button
                                    className="btn my-task-btn"
                                    onClick={() => this.props.history.push("/tasks")}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                    >
                                        <path
                                            d="M5 5H15.8333"
                                            stroke="#21242B"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M5 10H15.8333"
                                            stroke="#21242B"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M5 15H15.8333"
                                            stroke="#21242B"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M2.5 5H2.50833"
                                            stroke="white"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M2.5 15H2.50833"
                                            stroke="white"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    <span>My tasks</span>
                                </button>
                            </li>
                            <li
                                className={
                                    pathname === "/quote-now"
                                        ? "nav-item quote-cart dropdown no-arrow active"
                                        : "nav-item quote-cart dropdown no-arrow"
                                }
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Request quote"
                            >
                                <button
                                    className="btn btn-outline-default nav-link"
                                    type="button"
                                    onClick={() => this.props.history.push("/quote-now")}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                                            stroke="#21242B"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M20.9999 20.9999L16.6499 16.6499"
                                            stroke="#21242B"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M13.1776 8.81279C13.0367 8.58373 12.832 8.39488 12.5854 8.26648C12.3388 8.13807 12.0596 8.07494 11.7776 8.08383H10.2221C9.8095 8.08383 9.41384 8.23744 9.12212 8.51085C8.83039 8.78426 8.6665 9.15509 8.6665 9.54175C8.6665 9.92842 8.83039 10.2992 9.12212 10.5727C9.41384 10.8461 9.8095 10.9997 10.2221 10.9997H11.7776C12.1902 10.9997 12.5858 11.1533 12.8776 11.4267C13.1693 11.7001 13.3332 12.0709 13.3332 12.4576C13.3332 12.8443 13.1693 13.2151 12.8776 13.4885C12.5858 13.7619 12.1902 13.9155 11.7776 13.9155H10.2221C9.94011 13.9244 9.66088 13.8613 9.41427 13.7329C9.16766 13.6045 8.96296 13.4156 8.82206 13.1866"
                                            stroke="#21242B"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M11 14.1113V15.6668M11 6.3335V7.88905V6.3335Z"
                                            stroke="#21242B"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    <span>RFQ</span>

                                    {this.props.quoteObj &&
                                    this.props.quoteObj.products &&
                                    this.props.quoteObj.products.length ? (
                                        <span className="quote-cart-count">
                                            {this.props.quoteObj.products.length}
                                        </span>
                                    ) : (
                                        <></>
                                    )}
                                </button>
                            </li>

                            <li
                                className="nav-item notification-bell dropdown no-arrow mx-3"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Notification"
                            >
                                <button
                                    className="btn btn-outline-default nav-link"
                                    type="button"
                                    id="dropdownNotification"
                                    onClick={this.show}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14.187"
                                        height="18.302"
                                        viewBox="0 0 14.187 18.302"
                                    >
                                        <path
                                            id="bell"
                                            d="M14.829,19a3,3,0,0,1-5.658,0H7.578a2.5,2.5,0,0,1-2.285-3.515L6,13.894V11a6,6,0,0,1,4-5.659V5a2,2,0,1,1,4,0v.341A6,6,0,0,1,18,11v2.894l.707,1.591A2.5,2.5,0,0,1,16.423,19Zm-1.1,0H10.267a2,2,0,0,0,3.466,0ZM13,5.083V5a1,1,0,0,0-2,0v.083A6.068,6.068,0,0,1,13,5.083ZM12,6a5,5,0,0,0-5,5v3l-.043.2-.75,1.688A1.5,1.5,0,0,0,7.578,18h8.845a1.5,1.5,0,0,0,1.371-2.109l-.75-1.688L17,14V11A5,5,0,0,0,12,6Z"
                                            transform="translate(-4.907 -2.85)"
                                            fill="#21242b"
                                            stroke="#21242b"
                                            strokeWidth="0.3"
                                        />
                                    </svg>

                                    {this.props.notificationIconActive ? (
                                        <span className="unread-notification"></span>
                                    ) : (
                                        <></>
                                    )}

                                    {showNotification ? (
                                        <div ref={this.setWrapperRef}>
                                            <Notification />
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    {this.props.unseenCount ? (
                                        <span className="notification-count">{this.props.unseenCount}</span>
                                    ) : (
                                        <></>
                                    )}
                                </button>
                            </li>

                            <li className="nav-item dropdown no-arrow">
                                <button
                                    className="btn btn-outline-default nav-link dropdown-toggle"
                                    type="button"
                                    id="dropdownProfileButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    {userInfo && userInfo.profilePicDocument ? (
                                        <img
                                            className="img-profile rounded-circle"
                                            src={addImageSuffix(
                                                userInfo.profilePicDocument.docUrl,
                                                "_xicon"
                                            )}
                                            alt="profile-pic"
                                        />
                                    ) : (
                                        <img
                                            className="img-profile rounded-circle"
                                            src={require("../assets/images/pro_pic_default.svg")}
                                            alt="profile-pic"
                                        />
                                    )}
                                    <span className="mr-2 d-none d-lg-inline">
                                        {userInfo ? userInfo.name : "Anonymous"}
                                    </span>
                                </button>
                                {/* Dropdown - User Information */}
                                <div
                                    className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                    aria-labelledby="dropdownProfileButton"
                                >
                                    <Link className="dropdown-item" to="/tasks">
                                        <i className="fas fa-tachometer-alt mr-2 text-gray-400 font-12"></i>
                                        My task
                                    </Link>
                                    <Link className="dropdown-item" to="/my-profile">
                                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                        My profile
                                    </Link>
                                    <div className="dropdown-divider"></div>

                                    <a className="dropdown-item" onClick={() => this.logout()}>
                                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Logout
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </nav>

                    <div className="wraper container-fluid dashboard-container">
                        {this.props.children}
                    </div>
                    {/* <NewProjectModal /> */}
                    {/* <InstantQuotationModal/> */}
                    {/* <NewDevelopmentSuccessModal /> */}
                    <AskForQuote />
                    <StartProject />
                    <Modal type="addNewProduct" id="AddNewProduct" />
                </div>
            </>
        );
    }
}
const mapStateToProps = (store) => ({
    notificationIconActive: store.notification.notificationIconActive,
    unseenCount: store.notification.unseenCount,
    quoteObj: store.product.quoteObj,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            _storeData,
            _storeQuoteData,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
