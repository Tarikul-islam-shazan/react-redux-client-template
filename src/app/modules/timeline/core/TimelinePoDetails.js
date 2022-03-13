import React from "react";
import AllDesignList from "./AllDesignList";
import MemberList from "./MemberList";
import Http from "../../../services/Http";
import {storeMemberList} from "../../store/action/Timeline";
import {Link, useParams} from "react-router-dom";
import {toastError} from "../../../commonComponents/Toast";
import {useSelector} from "react-redux";
import {changeDateFormat, toOrdinalSuffix} from "../../../services/Util";

const TimelinePoDetails = ({setLoader}) => {
    const timelineStore = useSelector((store) => store.timelineStore);
    const {orderInfo} = timelineStore;
    const params = useParams();

    const downloadPI = () => {
        setLoader(true);
        Http.GET("downloadInvoice", params.orderId)
            .then((response) => {
                window.open(response.data, "_parent");
            })
            .catch((error) => toastError(error.response.data.message))
            .finally(() => setLoader(false));
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
                    <span>
                        <span className="order-number">{orderInfo?.orderRefNumber}</span>
                        <span className="etd-status">
                            <span className="regular-12 gray_dark_02">
                                {changeDateFormat(
                                    orderInfo?.deliveryDateList[0],
                                    "YYYY-MM-DD",
                                    "DD-MMM"
                                )}
                            </span>
                            <img src="/icons/info.svg" alt=""/>
                            <div className="etd-dates shadow-2dp">{renderETD()}</div>
                        </span>
                    </span>
                    <div className="untis-price">
                        <span>{orderInfo?.orderQuantity} UNITS</span>
                        <span>${orderInfo?.orderValue}</span>
                    </div>
                    <div className="progress-with-count">
                        <div className="progress">
                            <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                style={{width: orderInfo?.percentageOfCompleteness + "%"}}
                                aria-valuenow={orderInfo?.percentageOfCompleteness}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            />
                        </div>
                        <div>
                            <span className="count">{orderInfo?.percentageOfCompleteness}%</span>
                        </div>
                    </div>
                    <MemberList/>

                    <div className="all-po-list">
                        <span className="po-names">
                            {orderInfo?.poNumberList?.join(", ")}
                            <a href className="button text">
                                <Link to={`/purchaseDetails/${params.orderId}`} className="pr-1">PO Details</Link>
                                <img src="/icons/arrow-right-no-padding.svg" alt=""/>
                            </a>
                        </span>
                    </div>
                    <div className="pi-download">
                        <button className="button text" onClick={downloadPI}>
                            <img src="/icons/download.svg" alt="download" className="mr-1"/>
                            Download PI
                        </button>
                    </div>
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
                                checked={timelineStore?.orderInfo?.orderProductList?.length === timelineStore?.selectedDesignList?.length}
                                disabled
                            />
                            <label htmlFor>
                                <span>
                                    ALL DESIGN ({timelineStore?.selectedDesignList?.length})<img
                                    src="/icons/Right-arrow.svg" alt=""/>
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
                <AllDesignList setLoader={setLoader}/>
            </div>
        </div>
    );
};

export default TimelinePoDetails;
