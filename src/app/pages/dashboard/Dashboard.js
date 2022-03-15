import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useHistory} from "react-router-dom";
import moment from "moment";
import {
    addImageSuffix,
    changeDateFormat,
    getDateDifference,
    convertTimeToLocal,
    convertDateTimeToLocal,
    getNumberUnit,
    getShortName,
} from "../../services/Util";
import Http from "../../services/Http";
import { makeStyles } from "@material-ui/core/styles";

import { toastError, toastSuccess, toastWarning } from "../../commonComponents/Toast";
import { fetchDashboardQuotes, fetchDashboardAllTasks } from "../../redux/dashboard/action";
import { getDashboardQuotes, getDashboardAllTasks } from "../../redux/reducers";
import LoadingOverlay from "react-loading-overlay";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "react-bootstrap/Modal";

import TaskManage from "../task/components/TaskManage";

import {
    LOADER_COLOR,
    LOADER_LEFT,
    LOADER_MARGIN_LEFT,
    LOADER_MARGIN_TOP,
    LOADER_OVERLAY_BACKGROUND,
    LOADER_POSITION,
    LOADER_TEXT,
    LOADER_TOP,
    LOADER_WIDTH,
} from "../../constant";
const PRO_PIC_DEFAULT = "/images/pro_pic_default.svg";

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
    const [isTaskLoading, setIsTaskLoading] = useState(false);
    const [isQuoteLoading, setIsQuoteLoading] = useState(false);
    const [userName, setUserName] = useState("");
    const [buyerOverview, setBuyerOverview] = useState([]);
    const [runnigOrders, setRunningOrders] = useState([]);
    const [taskList, setTaskList] = useState(null);
    const [currentQuoutePage, setCurrentQuoutePage] = useState(0);
    const [currentTaskPage, setCurrentTaskPage] = useState(0);
    const [orderFlags, setOrderFlags] = useState({});
    const [selectedTask, setSelectedTask] = useState({});
    const useStyles = makeStyles({
        tooltip: {
            fontSize: "12px",
        },
    });
    const [sort, setSort] = useState("id,desc");
    const dispatch = useDispatch();

    let allQuotes = useSelector(getDashboardQuotes);
    let allTasks = useSelector(getDashboardAllTasks);
    const classes = useStyles();
    const history = useHistory();

    const getOrderSuppliers = async () => {
        setIsLoading(true);
        await Http.GET("getDashboarOverview")
            .then(({ data }) => {
                setIsLoading(false);
                if (data) {
                    setBuyerOverview(data);
                }
            })
            .catch(({ response }) => {
                setIsLoading(false);
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Request was unsuccessful.");
                }
            });
    };

    const getRunningOrders = async () => {
        setIsLoading(true);
        await Http.GET("getRunningOrders")
            .then(({ data }) => {
                setIsLoading(false);
                if (data) {
                    setRunningOrders(data);
                }
            })
            .catch(({ response }) => {
                setIsLoading(false);
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Request was unsuccessful.");
                }
            });
    };
    const getUserInfo = () => {
        let userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            userInfo = JSON.parse(userInfo);
            setUserName(userInfo.name);
        }
    };
    useEffect(() => {
        setIsLoading(true);
        getOrderSuppliers();
        getRunningOrders();
        getUserInfo();
    }, [dispatch]);

    useEffect(() => {
        setIsQuoteLoading(true);
        dispatch(fetchDashboardQuotes(currentQuoutePage, 15, sort)).finally(() => {
            setIsQuoteLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, currentQuoutePage]);

    const onScrollQuotes = (event) => {
        const { scrollHeight, scrollTop, clientHeight } = event.target;
        const scroll = scrollHeight - scrollTop - clientHeight;
        let hasNext = allQuotes?.hasNext;
        if (scroll === 0 && hasNext) {
            setCurrentQuoutePage((page) => page + 1);
        }
    };

    useEffect(() => {
        setIsTaskLoading(true);
        dispatch(fetchDashboardAllTasks(currentTaskPage, 15, sort)).finally(() => {
            setIsTaskLoading(false);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, currentTaskPage]);

    useEffect(() => {
        setTaskList(allTasks);
    }, [allTasks]);

    const onScrollTaskList = (event) => {
        const { scrollHeight, scrollTop, clientHeight } = event.target;
        const scroll = scrollHeight - scrollTop - clientHeight;
        let hasNext = allTasks?.hasNext;
        if (scroll === 0 && hasNext) {
            setCurrentTaskPage((page) => page + 1);
        }
    };

    const getTotalSustainable = () => {
        return (buyerOverview.sustainableProductCount / buyerOverview.totalProductCount) * 100;
    };

    const getTotalQuoteToOrder = () => {
        return (buyerOverview.quoteToOrderCount / buyerOverview.totalQuoteCount) * 100;
    };
    const getAcceptedDesigns = () => {
        return (
            <>
                {buyerOverview.nitexDesignSold}
                <span>/{buyerOverview.totalDesignSold}</span>
            </>
        );
    };

    const getDeliveredOrder = () => {
        return (
            <>
                {buyerOverview.deliveredOrder}
                <span>/{buyerOverview.totalOrder}</span>
            </>
        );
    };
    const getOrderValue = () => {
        return getNumberUnit(buyerOverview.orderValue);
    };
    const getTotalUnits = () => {
        return buyerOverview.noOfSupplier;
    };

    const getParcentage = (overdue, pending, completed, targetNumber) => {
        return Math.round((targetNumber * 100) / (overdue + pending + completed));
    };

    const getPriceDateTime = (dateAdded, dateAddedTime) => {
        let timeDifference = 0;
        let formattedQuoteDate = convertTimeToLocal(dateAdded, dateAddedTime, "DD/MM/YYYY hh:mm A");
        formattedQuoteDate = moment(formattedQuoteDate, "DD/MM/YYYY hh:mm A");
        const currentDate = moment().format("DD/MM/YYYY hh:mm A");
        const formattedCurrentDate = moment(currentDate, "DD/MM/YYYY hh:mm A");
        timeDifference = 24 - formattedCurrentDate.diff(formattedQuoteDate, "hours");
        if (timeDifference >= 0) {
            return timeDifference;
        }
        return 0;
    };

    const getTasksStatus = (endDate) => {
        let timeDifference = 0;
        let formattedEndDate = convertDateTimeToLocal(endDate, "19:00:00", "DD/MM/YYYY hh:mm A");
        formattedEndDate = moment(formattedEndDate, "DD/MM/YYYY hh:mm A");
        const currentDate = moment().format("DD/MM/YYYY hh:mm A");
        const formattedCurrentDate = moment(currentDate, "DD/MM/YYYY hh:mm A");
        timeDifference = formattedCurrentDate.diff(formattedEndDate, "hours");
        if (timeDifference >= 0) {
            return (
                <div className="task-status red">
                    <span className="status-btn">Overdue</span>
                </div>
            );
        }
        return (
            <div className="task-status yellow">
                <span className="status-btn">Running</span>
            </div>
        );
    };

    const onSortCLicked = (type) => {
        orderFlags[type] = orderFlags[type] ? false : true;
        setOrderFlags(orderFlags);
        let newTaskList = taskList?.data?.sort((o1, o2) => {
            let a = null;
            let b = null;
            if (type === "STYLE") {
                a = o1.stepName ? o1.stepName.toUpperCase() : "";
                b = o2.stepName ? o2.stepName.toUpperCase() : "";
            }
            if (type === "ORDER") {
                a = o1.orderName.toUpperCase();
                b = o2.orderName.toUpperCase();
            }
            if (type === "ORDER_NUMBER") {
                a = o1.orderRefNumber ? o1.orderRefNumber.toUpperCase() : "";
                b = o2.orderRefNumber ? o2.orderRefNumber.toUpperCase() : "";
            }
            return orderFlags[type] ? (a >= b ? 1 : -1) : b >= a ? 1 : -1;
        });
        setTaskList({ ...taskList, data: newTaskList });
    };

    const getGreetingMsg = () => {
        var d = new Date();
        var time = d.getHours();

        if (time >= 5 && time < 12) {
            return "Good Morning";
        } else if (time >= 12 && time < 17) {
            return "Good Afternoon";
        }
        // if (time >= 17 && time < 5) {
        else {
            return "Good Evening";
        }
    };

    const taskImageStyle = {
        height: "62px",
        width: "56px",
        textAlign: "center",
        background: "#EDF0F2",
        borderRadius: "2px",
        marginRight: "5px",
    };

    const clicked = {
        transform: "rotate(180deg)",
    };

    const onClickCell = (taskId, orderId) => {
        setSelectedTask({ taskId, orderId });
        setShowTaskDetailsModal(true);
    };

    const getQuotationQuantity = (product) => {
        return product.quotationQuantity || product.quantity || 0;
    };

    return (
        <LoadingOverlay
            active={isLoading || isTaskLoading || isQuoteLoading}
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
            <div className="buyer-dashboard-container">
                <div className="welcome-message">
                    <h3>
                        Hi <span>{userName}</span>, {getGreetingMsg()}!
                    </h3>
                </div>
                {/* Order journey status */}
                {buyerOverview.length !== 0 && (
                    <div className="full-journey-status">
                        <div className="one-sixth sustainable-box">
                            <div className="status-details">
                                <h3>
                                    {isNaN(getTotalSustainable().toFixed(2))
                                        ? 0
                                        : getTotalSustainable().toFixed(2)}
                                    %
                                </h3>
                                <span>Sustainable</span>
                            </div>
                            <div className="status-icon">
                                <img src="/icons/sustainable.svg" alt="sustainable" />
                            </div>
                        </div>
                        <div className="one-sixth quote-order-box">
                            <div className="status-details">
                                <h3>
                                    {isNaN(getTotalQuoteToOrder().toFixed(2))
                                        ? 0
                                        : getTotalQuoteToOrder().toFixed(2)}
                                    %
                                </h3>
                                <span>Quote to order</span>
                            </div>
                            <div className="status-icon">
                                <img src="/icons/quote-order.svg" alt="quote" />
                            </div>
                        </div>
                        <div className="one-sixth design-box">
                            <div className="status-details">
                                <h3>{getAcceptedDesigns()}</h3>
                                <span>Designs accepted</span>
                            </div>
                            <div className="status-icon">
                                <img src="/icons/Design.svg" alt="Design" />
                            </div>
                        </div>
                        <div className="one-sixth delivered-box">
                            <div className="status-details">
                                <h3>{getDeliveredOrder()}</h3>
                                <span>Orders deliverd</span>
                            </div>
                            <div className="status-icon">
                                <img src="/icons/shipment.svg" alt="shipment" />
                            </div>
                        </div>
                        <div className="one-sixth order-value-box">
                            <div className="status-details">
                                <h3>${getOrderValue()}</h3>
                                <span>Order value</span>
                            </div>
                            <div className="status-icon">
                                <img src="/icons/order-value.svg" alt="order-value" />
                            </div>
                        </div>
                        <div className="one-sixth supplier-box">
                            <div className="status-details">
                                <h3>{getTotalUnits()}</h3>
                                <span>Manufacturing units</span>
                            </div>
                            <div className="status-icon">
                                <img src="/icons/Supplier.svg" alt="Supplier" />
                            </div>
                        </div>
                    </div>
                )}
                {/* Orders and quotes status */}
                <div className="orders-and-quotes-status">
                    <div className="one-half my-orders">
                        <div className="state-title d-flex align-items-center">
                            <h3>
                                My orders <span className="count">({runnigOrders.length})</span>
                            </h3>
                            <Link to="/orders/my-orders"> View all</Link>
                        </div>
                        <div className="running-orders-info-section progress-info-team-brand">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12 px-0">
                                        <div className="team-performance-top">
                                            <div className="status-filter">
                                                <div className="performence-status">
                                                    <ul className="order-status d-flex">
                                                        <li className="mini-fonts">
                                                            <span className="progress-identifier green" />
                                                            Completed on time
                                                        </li>
                                                        <li className="mini-fonts">
                                                            <span className="progress-identifier blue" />
                                                            Pending
                                                        </li>
                                                        <li className="mini-fonts">
                                                            <span className="progress-identifier red" />
                                                            Overdue
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="progress-section">
                                            {runnigOrders?.length > 0 && !isLoading ? (
                                                <div className="progress-section">
                                                    {runnigOrders?.map((item) => (
                                                        <div
                                                            className="single-person-progress d-flex align-items-center"
                                                            key={item.orderId}
                                                            onClick={() => history.push(`/timeline/${item.orderId}`)}
                                                        >
                                                            <div className="person-info d-flex align-items-center">
                                                                <div className="four-images d-flex">
                                                                    {item.productDesignPaths
                                                                        .length &&
                                                                        item.productDesignPaths.map(
                                                                            (value, index) => (
                                                                                <div
                                                                                    className="single-one"
                                                                                    key={index}
                                                                                >
                                                                                    <img
                                                                                        src={
                                                                                            value
                                                                                                ? addImageSuffix(
                                                                                                      value,
                                                                                                      "_xicon"
                                                                                                  )
                                                                                                : PRO_PIC_DEFAULT
                                                                                        }
                                                                                        alt={
                                                                                            item.name
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        )}
                                                                    {item.productDesignPaths
                                                                        .length < 1 && (
                                                                        <div className="single-one"></div>
                                                                    )}
                                                                    {item.productDesignPaths
                                                                        .length < 2 && (
                                                                        <div className="single-one"></div>
                                                                    )}
                                                                    {item.productDesignPaths
                                                                        .length < 3 && (
                                                                        <div className="single-one"></div>
                                                                    )}
                                                                    {item.productDesignPaths
                                                                        .length < 4 && (
                                                                        <div className="single-one"></div>
                                                                    )}
                                                                </div>

                                                                <div className="order-name">
                                                                    <p>
                                                                        <Tooltip
                                                                            title={item.orderName}
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <span>
                                                                                {getShortName(
                                                                                    item.orderName,
                                                                                    35
                                                                                )}
                                                                            </span>
                                                                        </Tooltip>
                                                                    </p>
                                                                </div>
                                                                <div className="assigned-person">
                                                                    <p>{item.projectManagerName}</p>
                                                                </div>
                                                                <div className="date-info">
                                                                    <p>
                                                                        {changeDateFormat(
                                                                            item.deliveryDate,
                                                                            "",
                                                                            "MMM DD"
                                                                        )}
                                                                        <span className="date-count">
                                                                            {" "}
                                                                            (
                                                                            {getDateDifference(
                                                                                undefined,
                                                                                item.deliveryDate
                                                                            ) + "d"}
                                                                            )
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="progress-info">
                                                                <div className="progress">
                                                                    <Tooltip
                                                                        classes={{
                                                                            tooltip:
                                                                                classes.tooltip,
                                                                        }}
                                                                        title={`${item.completedCount} Completed`}
                                                                        placement="top"
                                                                        arrow
                                                                    >
                                                                        <div
                                                                            className="progress-bar completed"
                                                                            role="progressbar"
                                                                            style={{
                                                                                width:
                                                                                    getParcentage(
                                                                                        item.overdueCount,
                                                                                        item.pendingCount,
                                                                                        item.completedCount,
                                                                                        item.completedCount
                                                                                    ) + "%",
                                                                            }}
                                                                            aria-valuemin={0}
                                                                            aria-valuemax={100}
                                                                        />
                                                                    </Tooltip>

                                                                    <Tooltip
                                                                        classes={{
                                                                            tooltip:
                                                                                classes.tooltip,
                                                                        }}
                                                                        title={`${item.pendingCount} Pending`}
                                                                        placement="top"
                                                                        arrow
                                                                    >
                                                                        <div
                                                                            className="progress-bar pending"
                                                                            role="progressbar"
                                                                            style={{
                                                                                width:
                                                                                    getParcentage(
                                                                                        item.overdueCount,
                                                                                        item.pendingCount,
                                                                                        item.completedCount,
                                                                                        item.pendingCount
                                                                                    ) + "%",
                                                                            }}
                                                                            aria-valuemin={0}
                                                                            aria-valuemax={100}
                                                                        />
                                                                    </Tooltip>
                                                                    <Tooltip
                                                                        classes={{
                                                                            tooltip:
                                                                                classes.tooltip,
                                                                        }}
                                                                        title={`${item.overdueCount} Overdue`}
                                                                        placement="top"
                                                                        arrow
                                                                    >
                                                                        <div
                                                                            className="progress-bar overdue"
                                                                            role="progressbar"
                                                                            style={{
                                                                                width:
                                                                                    getParcentage(
                                                                                        item.overdueCount,
                                                                                        item.pendingCount,
                                                                                        item.completedCount,
                                                                                        item.overdueCount
                                                                                    ) + "%",
                                                                            }}
                                                                            aria-valuemin={0}
                                                                            aria-valuemax={100}
                                                                        />
                                                                    </Tooltip>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="nothing-found text-center">
                                                    <img
                                                        src="/icons/Nothing found.svg"
                                                        alt="nothing found"
                                                    />
                                                    <p>No order created yet</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="one-half my-quotes">
                        <div className="state-title d-flex align-items-center">
                            <h3>My quotes</h3>
                            <Link to="/quotes/list">View all</Link>
                        </div>
                        <div className="orders-table" onScroll={(e) => onScrollQuotes(e)}>
                            <table className="table table-responsive-sm">
                                <thead>
                                    <tr>
                                        <th>Design</th>
                                        <th>Quanity</th>
                                        <th>Status</th>
                                        <th>Price/ Unit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allQuotes?.data?.length > 0 && !isLoading ? (
                                        allQuotes?.data?.map((item) => (
                                            <tr kwy={item.id}>
                                                <td>
                                                    <span className="image-with-title">
                                                        <img
                                                            src={addImageSuffix(
                                                                item.docUrl,
                                                                "_xthumbnail"
                                                            )}
                                                            alt={addImageSuffix(
                                                                item.docUrl,
                                                                "_xthumbnail"
                                                            )}
                                                            className="cell-img pr-2"
                                                        />
                                                        <span className="d-inline-block align-middle">
                                                            <Tooltip
                                                                title={item.productName}
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <Link
                                                                    to={`/quotes/list?title=${item.productName}`}
                                                                >
                                                                    {getShortName(
                                                                        item.productName,
                                                                        35
                                                                    )}
                                                                </Link>
                                                            </Tooltip>
                                                        </span>
                                                    </span>
                                                </td>
                                                <td>
                                                    <span>{getQuotationQuantity(item)} pcs</span>{" "}
                                                </td>
                                                <td>
                                                    {item.status === "PRICE_GIVEN" ? (
                                                        <div className="task-status yellow">
                                                            <span className="status-btn">
                                                                Quoted
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div className="task-status purple">
                                                            <span className="status-btn">
                                                                Offer pending
                                                            </span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td>
                                                    {item.status === "PRICE_GIVEN" ? (
                                                        item.unitPrice && (
                                                            <span>${item.unitPrice}</span>
                                                        )
                                                    ) : (
                                                        <span>
                                                            {" "}
                                                            Price in{" "}
                                                            {getPriceDateTime(
                                                                item.dateAdded,
                                                                item.dateAddedTime
                                                            )}{" "}
                                                            hours
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colspan="4">
                                                <div className="nothing-found text-center">
                                                    <img
                                                        src="/icons/Nothing found.svg"
                                                        alt="nothing found"
                                                    />
                                                    <p>No qoutes added yet</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* Quict actions table */}
                <div className="quick-actions">
                    <div className="state-title d-flex align-items-center">
                        <h3>Quick actions</h3>
                        <Link to="/tasks">View all</Link>
                    </div>
                    <div className="quick-actions-table" onScroll={(e) => onScrollTaskList(e)}>
                        <table className="table table-responsive-sm">
                            <thead>
                                <tr>
                                    <th>Task</th>
                                    <th>
                                        <span>
                                            Style{" "}
                                            <img
                                                style={orderFlags["STYLE"] ? clicked : {}}
                                                src="/icons/down-arrow.svg"
                                                alt="arrow"
                                                onClick={() => onSortCLicked("STYLE")}
                                            />
                                        </span>
                                    </th>
                                    <th>
                                        <span>
                                            Order title{" "}
                                            <img
                                                style={orderFlags["ORDER"] ? clicked : {}}
                                                src="/icons/down-arrow.svg"
                                                alt="arrow"
                                                onClick={() => onSortCLicked("ORDER")}
                                            />
                                        </span>
                                    </th>
                                    <th>
                                        <span>
                                            Order number{" "}
                                            <img
                                                style={orderFlags["ORDER_NUMBER"] ? clicked : {}}
                                                src="/icons/down-arrow.svg"
                                                alt="arrow"
                                                onClick={() => onSortCLicked("ORDER_NUMBER")}
                                            />
                                        </span>
                                    </th>
                                    <th>
                                        <span>Status </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {taskList?.data?.length > 0 && !isLoading ? (
                                    taskList?.data.map((item) => (
                                        <tr onClick={() => onClickCell(item.id, item.orderId)}>
                                            <td>
                                                <span className="image-with-title">
                                                    {item?.stepProduct?.image ? (
                                                        <img
                                                            src={item?.stepProduct?.image}
                                                            alt="image"
                                                            className="cell-img pr-2"
                                                        />
                                                    ) : (
                                                        <div
                                                            className="task-image"
                                                            style={taskImageStyle}
                                                        ></div>
                                                    )}
                                                    <span className="d-inline-block align-middle">
                                                        <Tooltip
                                                            title={item.stepName}
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <span>
                                                                {getShortName(item.stepName, 35)}
                                                            </span>
                                                        </Tooltip>
                                                    </span>
                                                </span>
                                            </td>
                                            <td>
                                                <span>{item?.stepProduct?.name}</span>{" "}
                                            </td>
                                            <td
                                                className="cursor-pointer"
                                            >
                                                <Link to={`/timeline/${item.orderId}`}>
                                                    {item.orderName}
                                                </Link>{" "}
                                            </td>
                                            <td>
                                                <span>{item.orderRefNumber}</span>{" "}
                                            </td>
                                            <td>{getTasksStatus(item?.endDate)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colspan="5">
                                            <div className="nothing-found text-center">
                                                <img
                                                    src="/icons/Nothing found.svg"
                                                    alt="nothing found"
                                                />
                                                <p>You have completed all tasks. Great job!</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal
                show={showTaskDetailsModal}
                onHide={() => setShowTaskDetailsModal(false)}
                className="modal-right task-conversation"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <TaskManage
                    id={selectedTask.taskId}
                    orderId={selectedTask.orderId}
                    closeModal={() => setShowTaskDetailsModal(false)}
                    callback={() => {}}
                />
            </Modal>
        </LoadingOverlay>
    );
};

export default Dashboard;
