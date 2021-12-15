import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from "loadjs";

import LoadingOverlay from "react-loading-overlay";
import Http from "../../services/Http";
import { toastSuccess, toastError, toastWarning } from "../../commonComponents/Toast";
import { ProjectCard } from "./components/ProjectCard";
import { encodeQueryData, changeDateFormat } from "../../services/Util";
import DELIVERY_ICON from "../../assets/images/icons/delivery-status-icon.svg";

import {
    LOADER_OVERLAY_BACKGROUND,
    LOADER_COLOR,
    LOADER_WIDTH,
    LOADER_TEXT,
    LOADER_POSITION,
    LOADER_TOP,
    LOADER_LEFT,
    LOADER_MARGIN_TOP,
    LOADER_MARGIN_LEFT,
} from "../../constant";
import product from "../../redux/reducers/product";
import { isEmptyObject } from "jquery";

const tabFilterMap = {
    "Pending Order": "PENDING",
    "Running Order": "RUNNING",
    Completed: "COMPLETED",
};

class MyOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectList: [],
            page: 0,
            size: 15,
            loading: false,
            search: "",
            activeTab: "Running Order",
            filterBy: "",
            sort: ["RUNNING", "PENDING", "COMPLETED"],
            project_type: ["BULK", "DEVELOPMENT", "SUPERVISION"],
            sortOrder: "id,desc",
            hasNext: true, //to check if pagination is available or not
            height: window.innerHeight,
            userInfo: {},
        };
    }

    handleScroll = () => {
        const windowHeight =
            "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            let { hasNext, page, loading } = this.state;
            console.log("message", "bottom reached", hasNext, page, loading);
            if (hasNext && !loading) {
                this.renderList(page + 1, this.state.activeTab, true);
            } else {
                if (!hasNext) {
                    // toastWarning("No more data found.")
                }
            }
            // this.setState({
            //     message: 'bottom reached'
            // });
        } else {
        }
    };

    componentDidMount = async () => {
        document.title = "My orders with Nitex - The easiest clothing";
        const query = new URLSearchParams(this.props.location.search);
        const tab = query.get('tab');
        if (tab === 'pending') {
            const tabName = 'Pending Order';
            this.setState({ activeTab: tabName, isPendingTab: true });
            this.renderList(0, tabName);
        } else {
            this.renderList(0, this.state.activeTab);
        }
        window.addEventListener("scroll", this.handleScroll);
        this.renderList(0, this.state.activeTab);
        let userInfo = await localStorage.getItem("userInfo");
        await this.setState({
            userInfo: userInfo ? JSON.parse(userInfo) : {},
        });
        console.log("userInfo", JSON.parse(userInfo));
    };

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    renderList = (page = 0, activeTab, merge = true) => {
        this.setState({ loading: true });
        let { size, projectList, search, filterBy, sortOrder } = this.state;
        console.log(activeTab);
        let statusFilter_text = "&filterBy=" + tabFilterMap[activeTab];

        let params = {
            page: page,
            size: size,
            search: search,
            sort: sortOrder,
        };
        let paramData = encodeQueryData(params);

        Http.GET("getOrderList", paramData + statusFilter_text)
            .then(({ data }) => {
                if (data.length > 0) {
                    if (merge) {
                        this.setState({
                            projectList: [...projectList, ...data],
                            page: page,
                            hasNext: data.length === size ? true : false,
                            loading: false,
                        });
                    } else {
                        this.setState({
                            projectList: data,
                            page: page,
                            hasNext: data.length === size ? true : false,
                            loading: false,
                        });
                    }
                } else {
                    this.setState({
                        projectList: merge ? projectList : [],
                        hasNext: false,
                        loading: false,
                    });
                    // toastWarning("Project List - no data found.");
                }
                loadjs(["/js/script.js", "/js/custom.js"]);
            })
            .catch((response) => {
                console.log("PROJECT LIST ERROR: ", JSON.stringify(response));
                this.setState({ loading: false });
                toastError("Something went wrong! Please try again.");
            });
    };

    details = (id) => {
        let { activeTab } = this.state;
		if ( activeTab === 'Pending Order') {
			return toastWarning('The order is under review. Please wait till it gets to running');
		}
        this.props.history.push("/orders/view/" + id);
    };

    changeTab = (tabName) => {
        this.setState({ activeTab: tabName });
        this.renderList(0, tabName, false);
    };

    render() {
        let { projectList } = this.state;
        return (
            <LoadingOverlay
                active={this.state.loading}
                styles={{
                    overlay: (base) => ({
                        ...base,
                        background: LOADER_OVERLAY_BACKGROUND,
                    }),
                    spinner: (base) => ({
                        ...base,
                        width: LOADER_WIDTH,
                        position: LOADER_POSITION,
                        top: LOADER_TOP,
                        left: LOADER_LEFT,
                        marginTop: LOADER_MARGIN_TOP,
                        marginLeft: LOADER_MARGIN_LEFT,
                        "& svg circle": {
                            stroke: LOADER_COLOR,
                        },
                    }),
                    content: (base) => ({
                        ...base,
                        color: LOADER_COLOR,
                    }),
                }}
                spinner
                text={LOADER_TEXT}
            >
                <div className="top-header">
                    <div class="main-task-heading">
                        <h2>Order list</h2>
                    </div>
                    <div class="tabs">
                        <ul class="order-tabs d-flex pb-4">
                            <li
                                class={this.state.activeTab === "Running Order" ? "active" : ""}
                                onClick={() => this.changeTab("Running Order")}
                            >
                                Running
                            </li>
                            <li
                                class={this.state.activeTab === "Pending Order" ? "active" : ""}
                                onClick={() => this.changeTab("Pending Order")}
                            >
                                Pending
                            </li>
                            <li
                                class={this.state.activeTab === "Completed" ? "active" : ""}
                                onClick={() => this.changeTab("Completed")}
                            >
                                Completed
                            </li>
                        </ul>
                    </div>
                </div>
                <section class="buyer-tasks-section">
                    <div class="task-tab-section order-tab">
                        <div class="all-orders">
                            {projectList.length ? (
                                projectList.map((item, i) => {
                                    let productList = item.orderProductList;
                                    let brandResponse = item.brandResponse;
                                    if (brandResponse == null) brandResponse = {};
                                    let brandLogoUrl = brandResponse.brandLogoDocResponse
                                        ? brandResponse.brandLogoDocResponse.docUrl
                                        : "";
                                    let stageCompletenessList = item.stageCompletenessList;
                                    let startDate = item.startDate
                                        ? changeDateFormat(
                                              item.startDate,
                                              "YYYY-MM-DD",
                                              "Do MMM, YY"
                                          )
                                        : "";
                                    let endDate = item.endDate
                                        ? changeDateFormat(item.endDate, "YYYY-MM-DD", "Do MMM, YY")
                                        : "";

                                    return (
                                        <div
                                            class="single-order d-flex"
                                            onClick={() => this.details(item.orderId)}
                                        >
                                            <div class="order-images d-flex">
                                                {productList && productList.length ? (
                                                    productList.map((product, j) => {
                                                        return (
                                                            <div class="single-image">
                                                                <img src={product.image} />
                                                            </div>
                                                        );
                                                    })
                                                ) : (
                                                    <div></div>
                                                )}

                                                {productList.length < 1 && (
                                                    <div class="single-image"></div>
                                                )}

                                                {productList.length < 2 && (
                                                    <div class="single-image"></div>
                                                )}

                                                {productList.length < 3 && (
                                                    <div class="single-image"></div>
                                                )}

                                                {productList.length < 4 && (
                                                    <div class="single-image"></div>
                                                )}
                                            </div>
                                            <div class="single-order-details">
                                                <div class="order-details-section">
                                                    <div class="container-fluid">
                                                        <div class="row align-items-center py-3">
                                                            <div class="col-6 pl-0">
                                                                <div class="order-title">
                                                                    <h3 class="">{item.name}</h3>{" "}
                                                                    <span class="order-number">
                                                                        ({item.orderRefNumber})
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="col-2">
                                                                <span className="brand-logo">
                                                                    {brandResponse.name && (
                                                                        <img
                                                                            src={brandLogoUrl}
                                                                            alt={brandResponse.name}
                                                                        />
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <div class="col-4 text-right pr-0">
                                                                <div class="delivery-status mr-5">
                                                                    <button>
                                                                        {" "}
                                                                        Delivery in{" "}
                                                                        <span>
                                                                            {item.timeLeft} days{" "}
                                                                            <img
                                                                                src={DELIVERY_ICON}
                                                                                alt="delivery-icon"
                                                                            />
                                                                        </span>
                                                                    </button>
                                                                    <div class="date-details delivery-date-details text-left">
                                                                        <ul class="start">
                                                                            <li>Start:</li>
                                                                            <li>{startDate}</li>
                                                                        </ul>
                                                                        <ul class="end">
                                                                            <li>End:</li>
                                                                            <li>{endDate}</li>
                                                                        </ul>
                                                                        <ul class="spent-status">
                                                                            <li>Days spent:</li>
                                                                            <li>
                                                                                <span class="time-spent">
                                                                                    {item.daySpent}
                                                                                </span>{" "}
                                                                                Days
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="order-style-info">
                                                    <div class="container-fluid">
                                                        <div class="row align-items-center">
                                                            <div class="col-12 pl-0">
                                                                <ul class="d-flex py-4">
                                                                    <li class="active">
                                                                        {item.totalStyles} styles
                                                                    </li>
                                                                    <li>
                                                                        {item.orderQuantity} units
                                                                    </li>
                                                                    <li>${item.orderValue}</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="order-style-tab-section py-2">
                                                    <div class="container-fluid">
                                                        <div class="row align-items-center">
                                                            <div class="col-12 pl-0">
                                                                <ul class="order-stepper">
                                                                    {stageCompletenessList.length ? (
                                                                        stageCompletenessList.map(
                                                                            (stage, k) => {
                                                                                let statusDivClassName =
                                                                                    "status done progress";
                                                                                if (
                                                                                    stage.percentageOfCompleteness ===
                                                                                    0
                                                                                )
                                                                                    statusDivClassName =
                                                                                        "status not-started progress";
                                                                                else if (
                                                                                    stage.percentageOfCompleteness <
                                                                                    100
                                                                                )
                                                                                    statusDivClassName =
                                                                                        "status progress";

                                                                                return (
                                                                                    <li>
                                                                                        <div
                                                                                            class={
                                                                                                statusDivClassName
                                                                                            }
                                                                                            data-percentage={
                                                                                                stage.percentageOfCompleteness
                                                                                            }
                                                                                        >
                                                                                            <span class="progress-left">
                                                                                                <span class="progress-bar"></span>
                                                                                            </span>
                                                                                            <span class="progress-right">
                                                                                                <span class="progress-bar"></span>
                                                                                            </span>
                                                                                            <div class="progress-value">
                                                                                                <div class="task-value">
                                                                                                    {
                                                                                                        stage.percentageOfCompleteness
                                                                                                    }
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <span>
                                                                                            {
                                                                                                stage.stageName
                                                                                            }
                                                                                        </span>
                                                                                    </li>
                                                                                );
                                                                            }
                                                                        )
                                                                    ) : (
                                                                        <div></div>
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div class="no-order">No order available</div>
                            )}
                        </div>
                    </div>
                </section>
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = (store) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MyOrder);
