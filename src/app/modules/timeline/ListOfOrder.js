import React from "react";
import {changeDateFormat, getShortName, toOrdinalSuffix} from "../../services/Util";
import {useHistory} from "react-router-dom";
import {toastWarning} from "../../commonComponents/Toast";
import {Tooltip} from "@material-ui/core";

const ListOfOrder = ({orderStore, activeTab}) => {
    const history = useHistory();

    const renderOrderImage = (imageSrc) => {
        if (imageSrc) {
            return <img src={imageSrc} alt="design"/>;
        } else {
            return <img src="/images/default_product.svg" alt="design"/>;
        }
    };

    const renderETD = (item) => {
        return item?.deliveryDateList?.map((etd, index) => {
            return (
                <ul className="start">
                    <li>{toOrdinalSuffix(index + 1)} ETD:</li>
                    <li>{changeDateFormat(etd, "YYYY-MM-DD", "DD MMM, YYYY")}</li>
                </ul>
            );
        });
    };

    const handleRoute = (id) => {
        if (orderStore.activeTab === "PENDING") {
            toastWarning("The order is under review. Please wait till it gets to running");
        } else {
            history.push(`/orders/view/${id}`);
        }
    };

    const renderOrderStatus = (item) => {
        if (activeTab === "COMPLETED") {
            return <span>DELIVERED ON </span>;
        } else if (Math.sign(item.timeLeft) === -1) {
            return <span className="overdue-time">Overdue&nbsp;</span>;
        } else {
            return <span>DELIVERY IN </span>;
        }
    };

    const renderOrderStatusWiseDate = (item) => {
        if (activeTab === "COMPLETED") {
            return (
                <span className="completed-days">
                    {item.actualDeliveryDate
                        ? changeDateFormat(item.actualDeliveryDate, "YYYY-MM-DD", "DD-MMM")
                        : "--"}
                    <img
                        src={process.env.PUBLIC_URL + "/icons/status-completed.svg"}
                        className="ml-1"
                        alt=""
                    />
                </span>
            );
        } else if (Math.sign(item.timeLeft) === -1) {
            return (
                <span className="overdue-days">
                    {Math.abs(item.timeLeft) + " Days"}
                    <img
                        src={process.env.PUBLIC_URL + "/icons/status-overdue.svg"}
                        className="ml-1"
                        alt=""
                    />
                </span>
            );
        } else {
            return (
                <span className="remaining-days">
                    {changeDateFormat(item.deliveryDateList[0], "YYYY-MM-DD", "DD-MMM")}
                    <img
                        src={process.env.PUBLIC_URL + "/icons/info-primary.svg"}
                        className="ml-1"
                        alt=""
                    />
                </span>
            );
        }
    };

    const renderDeliveryStatus = (item) => {
        return (
            <div className="delivery-date-status">
                {renderOrderStatus(item)}
                <span className="date-info">
                    {renderOrderStatusWiseDate(item)}
                    <div className="etd-dates shadow-2dp">{renderETD(item)}</div>
                </span>
            </div>
        );
    };

    const renderOrderList = () => {
        if (orderStore?.orderResponse?.data?.length > 0) {
            return orderStore?.orderResponse?.data?.map((item, index) => {
                return (
                    <div
                        className="single-order-card"
                        key={`order_response_${index}`}
                        onClick={() => handleRoute(item.orderId)}
                    >
                        <div className="design-images">
                            {renderOrderImage(item.orderProductList[0]?.image)}
                            {renderOrderImage(item.orderProductList[1]?.image)}
                            {renderOrderImage(item.orderProductList[2]?.image)}
                            {renderOrderImage(item.orderProductList[3]?.image)}
                        </div>
                        <div className="order-details">
                            <Tooltip title={item?.name} placement={"top"} arrow>
                                <span className="order-title">{getShortName(item?.name, 20)}</span>
                            </Tooltip>

                            <div className="po-numbers">
                                <div className="pos">
                                    <Tooltip
                                        title={item?.poNumberList?.join(",")}
                                        placement={"top"}
                                        arrow
                                    >
                                    <span className="regular-14">
                                        {getShortName(item?.poNumberList?.join(","), 20)}
                                    </span>
                                    </Tooltip>
                                    <span className="regular-14 gray_dark_02">
                                    &nbsp;({item.orderRefNumber})
                                </span>
                                </div>
                            </div>
                            <ul className="order-quantity-details d-flex">
                                <li>
                                    {item.totalStyles}&nbsp;
                                    {item.totalStyles > 1 ? "Styles" : "Style"}
                                </li>
                                <li>{item.orderQuantity} units</li>
                                <li>${item.orderValue}</li>
                            </ul>
                            {renderDeliveryStatus(item)}
                            {orderStore.activeTab !== "PENDING" && (
                                <div className="round-progress-68">
                                    <div
                                        className="status pending progress"
                                        data-percentage={item?.percentageOfCompleteness}
                                    >
                                    <span className="progress-left">
                                        <span className="progress-bar"/>
                                    </span>
                                        <span className="progress-right">
                                        <span className="progress-bar"/>
                                    </span>
                                        <div className="progress-value">
                                            <div className="task-value">
                                                {item?.percentageOfCompleteness}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {orderStore.activeTab === "PENDING" && (
                                <div className="order-pending-state">
                                    <div className="state-details d-flex align-items-center">
                                        <div className="state-content ml-1">
                                            {item.workflowResponseList.map(
                                                (item) =>
                                                    item?.memberResponseList && (
                                                        <>
                                                            <img
                                                                src={
                                                                    item?.memberResponseList[0]
                                                                        ?.profilePicDocument?.docUrl
                                                                }
                                                                alt="profile"
                                                            />
                                                            <span className="state-title regular-14 gray_dark_02 mb--1">
                                                            {item.stepName}
                                                        </span>
                                                        </>
                                                    )
                                            )}
                                            <div className="four-states">
                                                {item.workflowResponseList.map((step) => (
                                                    <span
                                                        key={step.workflowStep}
                                                        className={`${
                                                            step.status === "COMPLETED"
                                                                ? "complete-state"
                                                                : step.status === "PENDING" &&
                                                                step?.memberResponseList
                                                                    ? "pending-state"
                                                                    : ""
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            });
        } else {
            return (
                <div>
                    <p>No order found</p>
                </div>
            )
        }
    };

    return <div className="order-card-items">{renderOrderList()}</div>;
};

export default ListOfOrder;
