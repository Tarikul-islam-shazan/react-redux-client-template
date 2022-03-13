import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductionDetailsByDesignNumber} from "../../store/action/Timeline";
import {useParams} from "react-router-dom";
import TaskManage from "../../../pages/task/components/TaskManage";
import Modal from "react-bootstrap/Modal";
import {changeDateFormat, getShortName} from "../../../services/Util";
import {Tooltip} from "@material-ui/core";

const AllProductionList = ({setLoader}) => {
    const timelineStore = useSelector(store => store.timelineStore);
    const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false)
    const [selectedDesign, setSelectedDesign] = useState(null)
    const [selectedId, setSelectedId] = useState(null)
    const [designList, setDesignList] = useState([])
    const dispatch = useDispatch()
    const params = useParams();

    useEffect(() => {
        if (timelineStore?.orderInfo?.orderProductList) {
            if (!selectedDesign) {
                setSelectedDesign(timelineStore?.orderInfo?.orderProductList[0])
            }
            let productList = timelineStore?.orderInfo?.orderProductList;
            let tmpDesignList = []
            productList.map((design) => {
                tmpDesignList.push(design)
            })
            setDesignList(tmpDesignList)
        }
    }, [timelineStore])

    useEffect(() => {
        if (selectedDesign?.id) {
            dispatch(fetchProductionDetailsByDesignNumber(params.orderId, selectedDesign.id))
        }
    }, [selectedDesign])

    const renderDesignList = () => {
        return designList?.map((design, index) => {
            return (
                <li key={`po_design_${index}`} onClick={() => {
                    setLoader(true)
                    setSelectedDesign(design)
                    setLoader(false)
                }}>
                    <img src={design.image} alt="img"/>
                    <span>{design.referenceNumber}</span>
                </li>
            )
        })
    }


    const renderStepIcon = (sample) => {
        if (sample.formattedTaskStatus === "EXPIRED") {
            return "/icons/Due icon.svg"
        } else if (sample.formattedTaskStatus === "APPROVED" || sample.formattedTaskStatus === "LATE_APPROVED") {
            return "/icons/Completed icon.svg"
        } else {
            return "/icons/Pending icon.svg"
        }
    }

    const renderStepClass = (sample) => {
        if (sample.formattedTaskStatus === "EXPIRED") {
            return "due"
        } else if (sample.formattedTaskStatus === "APPROVED" || sample.formattedTaskStatus === "LATE_APPROVED") {
            return "completed"
        } else {
            return "pending"
        }
    }

    const handleTaskManager = (sample) => {
        setSelectedId(sample.id)
        setShowTaskDetailsModal(true)
    }

    const renderSamplingStepList = (list) => {
        return list?.map((sample, index) => {
            return (
                <div className={`single-task ${renderStepClass(sample)}`} key={`sample_index_${index}`}
                     onClick={() => handleTaskManager(sample)}>
                    <div className="task-name">
                        <img
                            src={renderStepIcon(sample)}
                            alt="complete"
                        />
                        <Tooltip
                            title={sample.stepName}
                            placement={"top"}
                            arrow
                        >

                            <span>{getShortName(sample.stepName, 25)}</span>
                        </Tooltip>
                    </div>
                    <div className="date-details">
                        <span>
                            {sample.formattedTaskStatus === "EXPIRED" ? "+" + sample.dateOver : changeDateFormat(sample.startDate, "YYYY-MM-DD", "DD-MMM")}
                        </span>
                    </div>
                </div>
            )
        })
    }


    return (
        <div className="one-third all-production-details">
            <div className="design-select">
                <div className="dropdown">
                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {selectedDesign?.image && <img
                            src={selectedDesign?.image}
                            alt="img"
                        />}
                        <span>{selectedDesign?.referenceNumber}</span>
                    </button>
                    <div className="dropdown-menu shadow-2dp" aria-labelledby="dropdownMenuButton">
                        <ul className="select-design-list">
                            {renderDesignList()}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="production-accordion">
                <div id="accordion">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <h5 className="mb-0">
                                <button className="btn btn-link" data-toggle="collapse"
                                        data-target="#collapseOne" aria-expanded="true"
                                        aria-controls="collapseOne">
                                    Sampling
                                </button>
                            </h5>
                        </div>
                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne"
                             data-parent="#accordion">
                            <div className="card-body">
                                <div className="all-task-status">
                                    {renderSamplingStepList(timelineStore?.stepList?.SAMPLING)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingTwo">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed" data-toggle="collapse"
                                        data-target="#collapseTwo" aria-expanded="false"
                                        aria-controls="collapseTwo">
                                    Production
                                </button>
                            </h5>
                        </div>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo"
                             data-parent="#accordion">
                            <div className="card-body">
                                <div className="all-task-status">
                                    {renderSamplingStepList(timelineStore?.stepList?.PRODUCTION)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingThree">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed" data-toggle="collapse"
                                        data-target="#collapseThree" aria-expanded="false"
                                        aria-controls="collapseThree">
                                    Inspection
                                </button>
                            </h5>
                        </div>
                        <div id="collapseThree" className="collapse" aria-labelledby="headingThree"
                             data-parent="#accordion">
                            <div className="card-body">
                                <div className="all-task-status">
                                    {renderSamplingStepList(timelineStore?.stepList?.inspection)}
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
                    id={selectedId}
                    orderId={params.orderId}
                    closeModal={() => setShowTaskDetailsModal(false)}
                    callback={() => false}
                />
            </Modal>
        </div>
    )
}

export default AllProductionList