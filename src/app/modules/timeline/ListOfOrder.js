import React from "react";
import { changeDateFormat, getShortName, toOrdinalSuffix } from "../../services/Util";
import { useHistory } from "react-router-dom";
import { toastWarning } from "../../commonComponents/Toast";

const ListOfOrder = ({ orderStore, activeTab }) => {
    const history = useHistory();

    const renderOrderImage = (imageSrc) => {
        if (imageSrc) {
            return <img src={imageSrc} alt="design" />;
        } else {
            return <img src="/images/default_product.svg" alt="design" />;
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
            history.push(`/timeline/${id}`);
        }
    };

    const renderOrderStatus = (item) => {
        if (Math.sign(item.timeLeft) === -1) {
            return <span className="overdue-time">Overdue&nbsp;</span>;
        } else if (activeTab === "COMPLETED") {
            return <span>DELIVERED IN </span>;
        } else {
            return <span>DELIVERY ON </span>;
        }
    };

    const renderOrderStatusWiseDate = (item) => {
        if (Math.sign(item.timeLeft) === -1) {
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
        } else if (activeTab === "COMPLETED") {
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
                        <div className="po-numbers">
                            <div className="pos">
                                <span className="regular-14">
                                    {getShortName(item?.poNumberList?.join(","), 32)}
                                </span>
                                <span className="regular-14 gray_dark_02">
                                    &nbsp;({item.orderRefNumber})
                                </span>
                            </div>
                        </div>
                        <ul className="order-quantity-details d-flex">
                            <li>{item.totalStyles}</li>
                            <li>{item.orderQuantity} units</li>
                            <li>${item.orderValue}</li>
                        </ul>
                        {renderDeliveryStatus(item)}
                        <div className="progress-with-count d-flex align-items-center">
                            <div className="progress">
                                <div
                                    className="progress-bar bg-success"
                                    role="progressbar"
                                    style={{ width: item?.percentageOfCompleteness + "%" }}
                                    aria-valuenow={item?.percentageOfCompleteness}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                />
                            </div>
                            <div>
                                <span className="count regular-14">
                                    {item?.percentageOfCompleteness}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return <div className="order-card-items">{renderOrderList()}</div>;
};

export default ListOfOrder;
