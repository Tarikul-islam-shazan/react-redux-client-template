import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TaskManage from "../../../pages/task/components/TaskManage";
import Modal from "react-bootstrap/Modal";
import { changeDateFormat, getShortName } from "../../../services/Util";
import { Tooltip } from "@material-ui/core";

const AllProductionList = () => {
    const timelineStore = useSelector((store) => store.timelineStore);
    const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const params = useParams();

    const renderStepIcon = (sample) => {
        if (sample.formattedTaskStatus === "EXPIRED") {
            return "/icons/Due icon.svg";
        } else if (
            sample.formattedTaskStatus === "APPROVED" ||
            sample.formattedTaskStatus === "LATE_APPROVED" ||
            sample.status === "SCOPE_OFF"
        ) {
            return "/icons/Completed icon.svg";
        } else {
            return "/icons/Pending icon.svg";
        }
    };

    const renderStepClass = (sample) => {
        if (sample.formattedTaskStatus === "EXPIRED") {
            return "due";
        } else if (
            sample.formattedTaskStatus === "APPROVED" ||
            sample.formattedTaskStatus === "LATE_APPROVED" ||
            sample.status === "SCOPE_OFF"
        ) {
            return "completed";
        } else {
            return "pending";
        }
    };

    const handleTaskManager = (sample) => {
        setSelectedId(sample.id);
        setShowTaskDetailsModal(true);
    };

    const renderTaskDate = (sample) => {
        if (sample.formattedTaskStatus === "EXPIRED") {
            return "+" + sample.dateOver;
        } else if ("actualEndDate" in sample) {
            return changeDateFormat(sample.actualEndDate, "YYYY-MM-DD", "DD-MMM");
        } else {
            return changeDateFormat(sample.endDate, "YYYY-MM-DD", "DD-MMM");
        }
    };

    const renderSamplingStepList = (list) => {
        return list?.map((sample, index) => {
            return (
                <div
                    className={`single-task ${renderStepClass(sample)}`}
                    key={`sample_index_${index}`}
                    onClick={() => handleTaskManager(sample)}
                >
                    <div className="task-name">
                        <img src={renderStepIcon(sample)} alt="complete" />
                        <Tooltip title={sample.stepName} placement={"top"} arrow>
                            <span>{getShortName(sample.stepName, 25)}</span>
                        </Tooltip>
                    </div>
                    <div className="date-details">
                        <span>{renderTaskDate(sample)}</span>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="one-third all-production-details">
            <div className="text-tc">
                <span className="regular-14 gray_dark_02">T&A</span>
            </div>
            <div className="production-accordion">
                <div id="accordion">
                    <div className="card">
                        <div className="card-header" id="headingSampling">
                            <h5 className="mb-0">
                                <button
                                    className="btn btn-link"
                                    data-toggle="collapse"
                                    data-target="#collapseSampling"
                                    aria-expanded="true"
                                    aria-controls="collapseSampling"
                                >
                                    Sampling
                                </button>
                            </h5>
                        </div>
                        <div
                            id="collapseSampling"
                            className="collapse show"
                            aria-labelledby="headingSampling"
                            data-parent="#accordion"
                        >
                            <div className="card-body">
                                <div className="all-task-status">
                                    {renderSamplingStepList(timelineStore?.stepList?.SAMPLING)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingProduction">
                            <h5 className="mb-0">
                                <button
                                    className="btn btn-link collapsed"
                                    data-toggle="collapse"
                                    data-target="#collapseProduction"
                                    aria-expanded="false"
                                    aria-controls="collapseProduction"
                                >
                                    Production
                                </button>
                            </h5>
                        </div>
                        <div
                            id="collapseProduction"
                            className="collapse"
                            aria-labelledby="headingProduction"
                            data-parent="#accordion"
                        >
                            <div className="card-body">
                                <div className="all-task-status">
                                    {renderSamplingStepList(timelineStore?.stepList?.PRODUCTION)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingInspection">
                            <h5 className="mb-0">
                                <button
                                    className="btn btn-link collapsed"
                                    data-toggle="collapse"
                                    data-target="#collapseInspection"
                                    aria-expanded="false"
                                    aria-controls="collapseInspection"
                                >
                                    Inspection
                                </button>
                            </h5>
                        </div>
                        <div
                            id="collapseInspection"
                            className="collapse"
                            aria-labelledby="headingInspection"
                            data-parent="#accordion"
                        >
                            <div className="card-body">
                                <div className="all-task-status">
                                    {renderSamplingStepList(timelineStore?.stepList?.INSPECTION)}
                                </div>
                            </div>
                        </div>
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
                    timelinePanel={true}
                    id={selectedId}
                    orderId={params.orderId}
                    closeModal={() => setShowTaskDetailsModal(false)}
                    callback={() => false}
                />
            </Modal>
        </div>
    );
};

export default AllProductionList;
