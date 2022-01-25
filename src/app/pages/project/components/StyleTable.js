import React, {useState, useEffect, useCallback} from "react";
import 'react-dates/initialize';
import {DateRangePicker} from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import {addImageSuffix, changeDateFormat} from "../../../services/Util";
import APPROVE_ICON from "../../../assets/images/icons/approve-icon.svg";
import ADD_TASK_ICON from "../../../assets/images/icons/add-task-icon.svg";
import AddNewTask from "./AddNewTask";
import Http from "../../../services/Http";
import {toastSuccess, toastError} from "../../../commonComponents/Toast";
import {Link} from "react-router-dom";

const checkStatus = (status) => {
    switch (status) {
        case "PENDING":
            return "pending";
        case "NOT-APPLICABLE":
            return "not-applicable";
        case "EXPIRED":
            return "expired";
        case "APPROVED":
            return "approved";
        case "LATE_APPROVED":
            return "approved";
        default:
            return "";
    }
};

const StyleTable = ({styleData, orderId, getStylesPlan, onClickCell, onStyleCallBack}) => {
    const [focusedInput, setFocusedInput] = useState(null);

    const renderOrderWise = (data) => {
        return (
            <div className="task-table-design style-wise-task-view order-table-view d-flex ">
                <div className="task-left-section">
                    <div className="fixed-tasks text-center style-base-list">
                        <div className="one-box heading-box first-heading right-border">
                            <p>Style</p>
                        </div>
                        {data.stepProductList.map((item) => (
                            <div className="one-box right-border bottom-border" key={item.id}>
                                <img src={addImageSuffix(item.image, "_xicon")} alt={item.name}/>
                                <p>
                                    <a href="#">{item.name}</a>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="task-right-section clearfix">
                    {data.planData.map((item, index) => (
                        <div
                            className="task-full-column first-task-full-column text-center"
                            key={item.id}
                        >
                            <div className="one-box heading-box ">
                                <p>{item.stepName}</p>
                            </div>
                            <div
                                className={`one-full-column ${checkStatus(
                                    item.values[0].formattedTaskStatus
                                )}`}
                                onClick={() => item.values[0].formattedTaskStatus !== 'NOT_APPLICABLE' &&
                                    onClickCell(item.values[0].stepId)}
                            >
                                <p>
                                    {item.values[0].formattedTaskStatus === 'NOT_APPLICABLE'
                                        ? 'N/A'
                                        : changeDateFormat(
                                            item.values[0].actualEndDate
                                                ? item.values[0].actualEndDate
                                                : item.values[0].endDate,
                                            'YYYY-MM-DD',
                                            'MMM-DD'
                                        )}{' '}
                                    {checkStatus(item.values[0].formattedTaskStatus) === 'approved' && (
                                        <img src={APPROVE_ICON} alt=""></img>
                                    )}
                                    {Math.sign(item.values[0].dateOver) === 1 &&
                                        item.values[0].formattedTaskStatus !== 'NOT_APPLICABLE' && (
                                            <span class="due-count">+{item.values[0].dateOver}d</span>
                                        )}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderMaterialWise = (data) => {
        return (
            <div className="task-table-design  order-table-view d-flex ">
                <div className="task-left-section">
                    <div className="fixed-tasks text-center style-base-list">
                        <div className="one-box heading-box first-heading right-border">
                            <p>Style</p>
                        </div>
                        {data.planData[0]?.values?.map((item) => (
                            <div className="one-box right-border bottom-border" key={item.id}>
                                <p>
                                    <Link to={`/designs/view/${item.material.productId}`} target="_blank">{item.material.productReferenceNumber}</Link>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="task-left-section">
                    <div className="fixed-tasks text-center style-base-list">
                        <div className="one-box heading-box first-heading right-border">
                            <p>Material</p>
                        </div>
                        {data.planData[0].values.map((item) => (
                            <div className="one-box right-border bottom-border" key={item.id}>
                                <p>
                                    <a href="#" style={{textDecoration: "none"}}>{item.material.materialName}</a>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="task-right-section clearfix">
                    {data.planData.map((item) => (
                        <div
                            className="task-full-column first-task-full-column text-center"
                            key={item.id}
                        >
                            <div className="one-box heading-box left-no-border">
                                <p>{item.stepName}</p>
                            </div>

                            {item.values.map((val) => {
                                return val.notApplicable === false ? <div
                                    className={`one-box left-no-border ${checkStatus(
                                        val.formattedTaskStatus
                                    )}`}
                                    key={val.id}
                                    onClick={() => onClickCell(val.stepId)}
                                >
                                    <p>
                                        {changeDateFormat(val.endDate, "YYYY-MM-DD", "MMM-DD")}{" "}
                                        {checkStatus(val.formattedTaskStatus) === "approved" && (
                                            <img src={APPROVE_ICON} alt=""></img>
                                        )}
                                        {Math.sign(val.dateOver) === 1 && (
                                            <span className="due-count">+{val.dateOver}d</span>
                                        )}
                                    </p>
                                </div> : <div className="one-box left-no-border"><p>N/A</p></div>
                            })}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderProductWise = (data) => {
        return (
            <div className="task-table-design order-table-view d-flex ">
                <div className="task-left-section">
                    <div className="fixed-tasks text-center style-base-list">
                        <div className="one-box heading-box first-heading right-border">
                            <p>Style</p>
                        </div>
                        {data.planData[0].values.map((item) => (
                            <div className="one-box right-border bottom-border" key={item.id}>
                                <img
                                    src={addImageSuffix(item.product.image, "_xicon")}
                                    alt={item.product.name}
                                />
                                <p>
                                    <Link to={`/designs/view/${item.product.id}`} target="_blank">{item.product.name}</Link>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="task-right-section clearfix">
                    {data.planData.map((item) => (
                        <div
                            className="task-full-column first-task-full-column text-center"
                            key={item.id}
                        >
                            <div className="one-box heading-box left-no-border">
                                <p>{item.stepName}</p>
                            </div>

                            {item.values.map((val) => {
                                return val.notApplicable === false ? <div
                                    className={`one-box left-no-border ${checkStatus(
                                        val.formattedTaskStatus
                                    )}`}
                                    key={val.id}
                                    onClick={() => onClickCell(val.stepId)}
                                >
                                    <p>
                                        {val.formattedTaskStatus === "NOT_APPLICABLE"
                                            ? "N/A"
                                            : changeDateFormat(val.endDate, "YYYY-MM-DD", "MMM-DD")}{" "}
                                        {checkStatus(val.formattedTaskStatus) === "approved" && (
                                            <img src={APPROVE_ICON} alt=""></img>
                                        )}
                                        {Math.sign(val.dateOver) === 1 && (
                                            <span className="due-count">+{val.dateOver}d</span>
                                        )}
                                    </p>
                                </div> : <div className="one-box left-no-border"><p>N/A</p></div>
                            })}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderTable = (data) => {
        switch (data?.stepScope) {
            case "ORDER_WISE":
                return renderOrderWise(data);
            case "MATERIAL_WISE":
                return renderMaterialWise(data);
            case "PRODUCT_WISE":
                return renderProductWise(data);
            default:
                return null;
        }
    };

    const updateDate = async (newStartDate, newEndDate, id) => {
        const body = {
            deliveryDate: newEndDate,
            stageId: id,
            startDate: newStartDate,
        };
        await Http.PUT("updateStage", body, id)
            .then(({data}) => {
                if (data && data.success) {
                    toastSuccess(data.message);
                }
            })
            .catch(({response}) => {
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    // toastError("Something went wrong! Please try again.");
                }
            });
    };

    const completeStage = async (id) => {
        await Http.POST("completeStage", {}, id)
            .then(({data}) => {
                if (data && data.success) {
                    toastSuccess(data.message);
                    onStyleCallBack(data);
                }
            })
            .catch(({response}) => {
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    // toastError("Something went wrong! Please try again.");
                }
            });
    };

    const saveDate = (startDate, endDate) => {
        styleData.startDate = startDate ? startDate.format("YYYY-MM-DD") : null;
        styleData.endDate = endDate ? endDate.format("YYYY-MM-DD") : null;
        updateDate(styleData.startDate, styleData.endDate, styleData.id);
    };

    const onComplete = (id) => {
        completeStage(id);
    };

    return (
        <section className="task-tab-content-section">
            <div className="task-buttons">
                {styleData && (
                    <DateRangePicker
                        daySize={30}
                        displayFormat="MMM DD"
                        isOutsideRange={() => false}
                        startDate={styleData.startDate ? moment(styleData.startDate, "YYYY-MM-DD") : null} // momentPropTypes.momentObj or null,
                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                        endDate={styleData.endDate ? moment(styleData.endDate, "YYYY-MM-DD") : null} // momentPropTypes.momentObj or null,
                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                        onDatesChange={({
                                            startDate,
                                            endDate
                                        }) => saveDate(startDate, endDate)} // PropTypes.func.isRequired,
                        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
                    />
                )}
                {styleData?.status === "COMPLETED" ? (
                    <button type="button btn-completed">
                        Completed
                        <span className="approved-data">
                     {" "}
                            {changeDateFormat(styleData.actualEndDate, "YYYY-MM-DD", "MMM-DD")}{" "}
                            <img src={APPROVE_ICON} alt="Approved"/>{" "}
                  </span>
                    </button>
                ) : (
                    <button type="button" onClick={() => onComplete(styleData.id)}>
                        Complete
                    </button>
                )}

                {/* <button type="button" data-toggle="modal" data-target="#TaskConversation">
               <img src={ADD_TASK_ICON} alt="Task add" /> Task
            </button> */}
            </div>
            <AddNewTask styleData={styleData} orderId={orderId}/>

            {renderTable(styleData)}
        </section>
    );
};

export default StyleTable;
