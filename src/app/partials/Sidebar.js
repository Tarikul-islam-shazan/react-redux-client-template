import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import loadjs from "loadjs";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import ReactGA from "react-ga";
import { hotjar } from "react-hotjar";

import { _storeData } from "./actions";
import { toggle, setActiveTab } from "../redux/actions/sidebar";
import { NavLink } from "./NavLink";

import { BASE_URL, GA_ID, hjid, hjsv } from "../constant";
import { toastSuccess, toastError, toastWarning } from "../commonComponents/Toast";
import { _storeData as _storeDesignData } from "../pages/design/actions";
import {clearTimelineData} from "../modules/store/action/Timeline";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // activeTab: window.location.pathname,
            // parentTab: ''
            permissions: [],
            // activeTab: "",
        };
    }

    componentDidMount = () => {
        loadjs(["/js/script.js", "/js/custom.js"]);
        let userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            userInfo = JSON.parse(userInfo);
        } else {
            userInfo = {};
        }
        this.setState({
            permissions: userInfo.permissions ? userInfo.permissions : [],
        });
        // this.connect(userInfo);
        this.initiateHotjarGA();
    };

    // connect = async (userInfo) => {
    //   // var socket = new SockJS( 'http://nitex-env.eba-bj9qc7tu.eu-central-1.elasticbeanstalk.com/ws' );
    //   try {
    //     let socket = await new SockJS(BASE_URL + "/ws", undefined);
    //     this.stompClient = await Stomp.over(socket);

    //     let token = localStorage.getItem("token").split(" ")[1];

    //     // console.log("sidebar notification",token,userInfo)
    //     let headers = {
    //       jwt: token,
    //     };
    //     this.stompClient.connect(
    //       headers,
    //       (frame) => {
    //         // setConnected(true);
    //         // console.log('Connected: ' , frame,'/topic/private/'+(userInfo ? userInfo.id : null));
    //         //topic/private/1 , here 1 is logged in user's id
    //         this.stompClient.subscribe(
    //           "/topic/private/" + (userInfo ? userInfo.id : null),
    //           (response) => {
    //             if (response.body) {
    //               let notifications = this.props.notifications;
    //               console.log(
    //                 "successfully received notification",
    //                 JSON.parse(response.body),
    //                 notifications
    //               );
    //               let item = JSON.parse(response.body);
    //               if (!item.id) {
    //                 item.id = Math.random() * 10000;
    //               }
    //               if (notifications[item.createdAt]) {
    //                 notifications[item.createdAt] = [
    //                   item,
    //                   ...notifications[item.createdAt],
    //                 ];
    //               } else {
    //                 notifications[item.createdAt] = [item];
    //               }
    //               this.props._storeData("notifications", notifications);
    //               this.props._storeData("notificationIconActive", true);
    //             }
    //             toastSuccess("successfully received notification.");

    //             // showGreeting(JSON.parse(greeting.body));
    //           }
    //         );
    //       },
    //       (frame) => {
    //         console.log("disconnected: ", frame);
    //         // this.stompClient = null;
    //         setTimeout(this.connect, 10000);
    //         console.log("STOMP: Reconecting in 10 seconds");
    //       }
    //     );
    //   } catch (err) {
    //     console.log("from try catch", err);
    //   }
    // };

    componentDidUpdate = (prevProps, prevState) => {
        if (window.location.pathname !== prevProps.activeTab) {
            loadjs(["/js/script.js", "/js/custom.js"]);
            this.props._storeDesignData("selectedProductIds", []);
            this.setTabToStore(window.location.pathname);
            this.initiateHotjarGA();
        }
    };

    setTabToStore = (path) => {
        this.props.setActiveTab(path);
    };

    initiateHotjarGA = () => {
        ReactGA.initialize(GA_ID);
        ReactGA.pageview(window.location.pathname + window.location.search);
        hotjar.initialize(hjid, hjsv);
    };

    handleClickNav = () => {
        this.props.clearTimelineData()
        this.props.setActiveTab(window.location.pathname)
    }

    render() {
        let { permissions } = this.state;
        const pathname = this.props.activeTab;

        return (
            <aside className="left-panel" id="side-menu">
                <div className="logo">
                    <a href="/dashboard" className="logo-expanded">
                        <img
                            src={require("../assets/images/logo_final.png")}
                            alt="logo"
                            className="img-fluid d-block mx-auto img_logo_expand"
                        />
                    </a>
                </div>
                <nav className="navigation">
                    <ul className="list-unstyled list_sidebar">
                        <NavLink
                            to="/dashboard"
                            classes={`${pathname.match("/dashboard") ? "active" : ""}`}
                            activeIcon={require("../assets/icons/Dashboard-active.svg")}
                            inactiveIcon={require("../assets/icons/Dashboard-default.svg")}
                            title="Dashboard"
                            onClick={this.handleClickNav}
                        />
                        {
                            <NavLink
                                to="/collections/list"
                                classes={`${pathname.match("collections") ? "active" : ""}`}
                                activeIcon={require("../assets/icons/collections-active.svg")}
                                inactiveIcon={require("../assets/icons/collections-default.svg")}
                                title="Collections"
                                onClick={this.handleClickNav}
                            />
                        }

                        {/* {permissions.includes("RFQ_ADD") ? (
                            <NavLink
                                to="/designs/add"
                                classes={`${pathname.match("/designs/add") ? "active" : ""}`}
                                activeIcon={require("../assets/icons/explore-design-active.svg")}
                                inactiveIcon={require("../assets/icons/explore-design-default.svg")}
                                title="Share Designs"
                                onClick={this.props.setActiveTab}
                            />
                        ) : (
                            <></>
                        )} */}
                        {permissions.includes("RFQ_MY_RFQ") ? (
                            <NavLink
                                to="/quotes/list"
                                classes={`${pathname.match("quotes") ? "active" : ""}`}
                                activeIcon={require("../assets/icons/quotes-active.svg")}
                                inactiveIcon={require("../assets/icons/quotes-default.svg")}
                                title="Quotes"
                                onClick={this.handleClickNav}
                            />
                        ) : (
                            <></>
                        )}
                        {permissions.includes("ORDER_MY_ORDER") ? (
                            <NavLink
                                to="/orders/my-orders"
                                classes={`${(pathname.match("orders") || pathname.match("timeline") || pathname.match("purchaseDetails") )? "active" : ""}`}
                                activeIcon={require("../assets/icons/orders-active.svg")}
                                inactiveIcon={require("../assets/icons/orders-default.svg")}
                                title="Orders"
                                onClick={this.handleClickNav}
                            />
                        ) : (
                            <></>
                        )}
                        {/*permissions.includes('RFQ_ADD') ?
                        <NavLink
                          to="/my-products"
                          classes={this.props.activeTab === '/my-products' ? 'active' : ''}
                          activeIcon={require("../assets/icons/my-prd-active.png")}
                          inactiveIcon={require("../assets/icons/design_new.svg")}
                          title="Designs"
                          onClick={this.props.setActiveTab}
                        />
                        : <></>*/}
                        {
                            <NavLink
                                to="/invoices/list"
                                classes={`${pathname.match("invoices") ? "active" : ""}`}
                                activeIcon={require("../assets/icons/payments-active.svg")}
                                inactiveIcon={require("../assets/icons/payments-deafult.svg")}
                                title="Payments"
                                onClick={this.handleClickNav}
                            />
                        }
                        {permissions.includes("PRODUCT_FOR_PICK_DESIGN") ? (
                            <NavLink
                                to="/designs/explore"
                                classes={`${
                                    pathname.includes("/designs/explore" || "/designs/view/")
                                        ? "active"
                                        : ""
                                }`}
                                activeIcon={require("../assets/icons/explore-design-active.svg")}
                                inactiveIcon={require("../assets/icons/explore-design-default.svg")}
                                title="Explore Designs"
                                onClick={this.handleClickNav}
                            />
                        ) : (
                            <></>
                        )}

                        {/* {
                        permissions.includes('PRODUCT_MY_PRODUCT') ?
                        <NavLink
                          to="/my-products"
                          classes={this.props.activeTab == '/my-products' ? 'active' : ''}
                          activeIcon={require("../assets/icons/my-prd-active.png")}
                          inactiveIcon={require("../assets/icons/tshirt.png")}
                          title="My products"
                          onClick={this.setTabToStore}
                        />
                        : <></>
                      } */}
                    </ul>
                </nav>
            </aside>
        );
    }
}

Sidebar.propTypes = {
    toggle: PropTypes.func.isRequired,
    // isCollapsed: PropTypes.bool.isRequired,
    // activeTab: PropTypes.string.activeTab
};

const mapStateToProps = (store) => ({
    isCollapsed: store.sidebar.isCollapsed,
    activeTab: store.sidebar.activeTab,
    notifications: store.notification.notifications,
});

export default connect(mapStateToProps, {
    toggle,
    setActiveTab,
    _storeData,
    _storeDesignData,
    clearTimelineData
})(Sidebar);
