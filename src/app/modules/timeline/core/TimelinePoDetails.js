import React from "react";
import AllDesignList from "./AllDesignList";
import MemberList from "./MemberList";
import Http from "../../../services/Http";
import {storeMemberList} from "../../store/action/Timeline";
import {useParams} from "react-router-dom";
import {toastError} from "../../../commonComponents/Toast";

const TimelinePoDetails = ({setLoader}) => {
    const params = useParams();

    const downloadPI = () => {
        setLoader(true)
        Http.GET('downloadInvoice', params.orderId)
            .then((response) => {
                window.open(response.data, '_parent');
            })
            .catch((error) => toastError(error.response.data.message))
            .finally(() => setLoader(false));
    }

    return (
        <div className="one-third all-designs-destails">
            <div className="design-info-with-po common-blocks">
                <div className="design-title-with-date">
                <span><span>NITEX/B1/2021</span>
                  <span className="etd-status">
                    <span className="regular-12 gray_dark_02">25-Aug</span>
                      <img
                          src="/icons/info.svg"
                          alt=""
                      />
                    <div className="etd-dates shadow-2dp">
                      <ul className="start"><li>1st ETD:</li><li>06 Apr, 2022</li></ul>
                      <ul className="start"><li>1st ETD:</li><li>06 Apr, 2022</li></ul>
                      <ul className="start"><li>1st ETD:</li><li>06 Apr, 2022</li></ul>
                    </div>
                  </span>
                </span>
                    <div className="untis-price">
                        <span>4500 UNITS</span>
                        <span>$85,00</span>
                    </div>
                    <div className="progress-with-count">
                        <div className="progress">
                            <div className="progress-bar bg-success" role="progressbar" style={{width: '25%'}}
                                 aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}/>
                        </div>
                        <div><span className="count">100%</span></div>
                    </div>
                    <MemberList/>

                    <div className="all-po-list">
                  <span className="po-names">PO/12/NTR/2021, PO/12/NTR/2021, PO/12/NTR/2021
                    <a href className="button text">
                      <span>PO Details</span>
                      <img src="/icons/arrow-right-no-padding.svg" alt=""/>
                    </a>
                  </span>
                    </div>
                    <div className="pi-download">
                        <button className="button text" onClick={downloadPI}>
                            <img
                                src="/icons/download.svg"
                                alt="download"
                            />
                            Download PI
                        </button>
                    </div>
                </div>
            </div>
            <div className="tab-design-task-buttons">
                <div className="one-half all-designs-with-status">
                    <div className="custom-chekbox" data-toggle="modal" data-target="#all-designs">
                        <div className="form-group">
                            <input type="checkbox" id name defaultValue/>
                            <label htmlFor><span>ALL DESIGN (4) <img src="/icons/Right-arrow.svg"
                                                                     alt=""/></span></label>
                        </div>
                    </div>
                </div>
                <div className="one-half">
                    <p className="regular-12 mb-0 cursor-pointer" data-toggle="modal"
                       data-target="#all-production-details">TASK STATUS</p>
                </div>
            </div>
            <div className="tab-none">
                <AllDesignList/>
            </div>
        </div>
    )
}

export default TimelinePoDetails