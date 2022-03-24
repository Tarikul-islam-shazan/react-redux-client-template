import React from "react";
import AllDesignList from "./AllDesignList";
import MemberList from "./MemberList";
import { downloadInvoice } from "../../store/action/Timeline";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { changeDateFormat, toOrdinalSuffix } from "../../../services/Util";

const TimelinePoDetails = ({ setLoader }) => {
    const timelineStore = useSelector((store) => store.timelineStore);
    const { orderInfo } = timelineStore;
    const params = useParams();

    const downloadPI = () => {
        setLoader(true);
        downloadInvoice(timelineStore?.orderInfo?.invoiceId)
            .then(() => setLoader(false))
            .catch(() => setLoader(false));
    };

    const renderETD = () => {
        return orderInfo?.deliveryDateList?.map((etd, index) => {
            return (
                <ul className="start">
                    <li>{toOrdinalSuffix(index + 1)} ETD:</li>
                    <li>{changeDateFormat(etd, "YYYY-MM-DD", "DD MMM, YYYY")}</li>
                </ul>
            );
        });
    };

    return (
        <div className="one-third all-designs-destails">
            <div className="design-info-with-po common-blocks">
                <div className="design-title-with-date">
                    <div className="data-with-round-progress d-flex justify-content-between">
                        <div className="style-text-view mt-2">
                            <a href="/orders/my-orders">
                                <img src="/icons/Left arrwo.svg" alt="back" />
                            </a>
                            <span className="order-number">{orderInfo?.orderRefNumber}</span>
                            <div className="untis-price">
                                <span>{orderInfo?.orderQuantity} UNITS</span>
                                <span>${orderInfo?.orderValue}</span>
                            </div>
                        </div>
                        <div className="round-progress-68">
                            <div
                                className="status pending progress"
                                data-percentage={orderInfo?.percentageOfCompleteness}
                            >
                                <span className="progress-left">
                                    <span className="progress-bar" />
                                </span>
                                <span className="progress-right">
                                    <span className="progress-bar" />
                                </span>
                                <div className="progress-value">
                                    <div className="task-value">
                                        {orderInfo?.percentageOfCompleteness}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="etd-with-po-details d-flex justify-content-between">
                        <span className="etd-status">
                            <span className="gray_dark_02 regular-14">ETD </span>
                            <span className="regular-12 gray_dark_02 date">
                                {changeDateFormat(
                                    orderInfo?.deliveryDateList[0],
                                    "YYYY-MM-DD",
                                    "DD-MMM"
                                )}
                            </span>
                            <img src="/icons/info.svg" alt="" />
                            <div className="etd-dates shadow-2dp">{renderETD()}</div>
                        </span>
                        <a href>
                            <Link
                                to={`/purchaseDetails/${params.orderId}`}
                                className="regular-14 primary_bright_02"
                            >
                                PO Details
                            </Link>
                        </a>
                    </div>

                    <div className="all-po-list">
                        <span className="po-names"></span>
                    </div>
                    <MemberList />
                </div>
            </div>
            <div className="tab-design-task-buttons">
                <div className="one-half all-designs-with-status">
                    <div className="custom-chekbox" data-toggle="modal" data-target="#all-designs">
                        <div className="form-group">
                            <input
                                type="checkbox"
                                id
                                name
                                defaultValue
                                checked={
                                    timelineStore?.orderInfo?.orderProductList?.length ===
                                    timelineStore?.selectedDesignList?.length
                                }
                                disabled
                            />
                            <label htmlFor>
                                <span>
                                    ALL DESIGN ({timelineStore?.selectedDesignList?.length})
                                    <img src="/icons/Right-arrow.svg" alt="" />
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="one-half">
                    <p
                        className="regular-12 mb-0 cursor-pointer"
                        data-toggle="modal"
                        data-target="#all-production-details"
                    >
                        TASK STATUS
                    </p>
                </div>
            </div>
            <div className="tab-none">
                <AllDesignList setLoader={setLoader} />
            </div>
        </div>
    );
};

export default TimelinePoDetails;
