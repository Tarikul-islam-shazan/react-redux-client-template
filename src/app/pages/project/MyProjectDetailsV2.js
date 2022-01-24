import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import Modal from "react-bootstrap/Modal";
import useDocumentTitle from "../../hooks/useDocumentTitle ";
import { toastSuccess, toastError, toastWarning } from "../../commonComponents/Toast";
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

import Http from "../../services/Http";
import TopBar from "./components/TopBar";
import StyleTable from "./components/StyleTable";
import TaskManage from "../task/components/TaskManage";

const groupByIds = (styleStepBasicInfoList, supplierResponseMap, stageResponse) => {
    const groupedResult = {};
    styleStepBasicInfoList.forEach((item) => {
        item.stepBasicInfoList.forEach((infoItem) => {
            const data = { ...infoItem };
            if (item.stepProduct) {
                data.product = {...item.stepProduct, supplier: supplierResponseMap[item.stepProduct.id]};
            }
            if (item.stepMaterial) {
                data.material = {...item.stepMaterial, supplier: supplierResponseMap[item.stepMaterial.productId]};
            }

            let key = "S" + stageResponse.id + "I" + data.stepSequenceIndex;

            if (!groupedResult[key]) {
                groupedResult[key] = [data];
            } else {
                groupedResult[key].push(data);
            }
        });
    });
    return Object.values(groupedResult);
};

const formatData = (list) => {
    const res = {
        stepId: list[0].id,
        stepName: list[0].stepName,
        values: [],
    };
    list.forEach((item) => {
        const value = {
            ...item,
            durationInDay: item.durationDays,
            stepId: item.id,
        };
        delete value.durationDays;
        if (item.product) {
            value.styleId = item.product.id;
        }
        if (item.material) {
            value.materialId = item.material.id;
        }
        res.values.push(value);
    });
    return res;
};

const formatStagesData = (data) => {
    const result = [];

    data.forEach((stage) => {
        const { styleStepBasicInfoList, stageResponse, supplierResponseMap, startDate, endDate, stepProductList } =
            stage;
        const groupedList = groupByIds(styleStepBasicInfoList, supplierResponseMap, stageResponse);

        const formattedResult = groupedList.map(formatData);

        const stageData = {
            ...stageResponse,
            planData: formattedResult,
            startDate: startDate,
            endDate: endDate,
            stepProductList: stepProductList,
        };
        result.push(stageData);
    });
    return result;
};

const MyProjectDetailsV2 = (props) => {
    const [projectDetails, setProjectDetails] = useState({});
    const [styleData, setStyleData] = useState([]);
    const [stagesData, setStagesData] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState({});
    const { id } = useParams();

    const getProjectDetails = async (orderId) => {
        setLoading(true);
        await Http.GET("getProjectDetails", +orderId)
            .then(({ data }) => {
                setLoading(false);
                setProjectDetails(data);
            })
            .catch(({ response }) => {
                setLoading(false);
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Something went wrong! Please try again.");
                }
            });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getStylesPlan = async (orderId) => {
        await Http.GET("getStepResponseForOrderDetails", "/" + orderId)
            .then(({ data }) => {
                setLoading(false);
                setStyleData(data);
                setStagesData(formatStagesData(data));

                try {
                    let name = "stageId";
                    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
                    let results = regex.exec(props.location.search);
                    let selectedId = null;
                    if (results !== null) {
                        selectedId = decodeURIComponent(results[1].replace(/\+/g, " "));
                    }
                    formatStagesData(data).map((item, i) => {
                        if (item.id === parseInt(selectedId)) {
                            setActiveTab(i);
                        }
                    });
                } catch (e) {}
            })
            .catch(({ response }) => {
                setLoading(false);
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Something went wrong! Please try again.");
                }
            });
    };
    const callback = () => {
        getStylesPlan(id);
    };

    const onStyleCallBack = () => {
        getStylesPlan(id);
    };

    useEffect(() => {
        const setStepData = () => {
            let name2 = "stepId";
            let regex2 = new RegExp("[\\?&]" + name2 + "=([^&#]*)");
            let results2 = regex2.exec(props.location.search);
            if (results2 !== null) {
                setSelectedTask({
                    taskId: decodeURIComponent(results2[1].replace(/\+/g, " ")),
                    orderId: id,
                });
                setShowTaskDetailsModal(true);
            }
        };

        setStepData();
        getProjectDetails(id);
        getStylesPlan(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, props.location.search]);

    const getPercentage = () => {
        return (
            projectDetails.stageCompletenessList &&
            projectDetails.stageCompletenessList[activeTab]?.percentageOfCompleteness
        );
    };

    const onClickCell = (taskId) => {
        setSelectedTask({ taskId, orderId: id });
        setShowTaskDetailsModal(true);
    };

    useDocumentTitle(
        `Order profile ${
            projectDetails.name ? projectDetails.name : ""
        } Nitex - The easiest clothing manufacturing software`
    );

    return (
        <LoadingOverlay
            active={loading}
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
            {!loading && (
                <div className="wraper container-fluid order-admin-profile">
                    <TopBar
                        details={projectDetails}
                        orderId={id}
                        getProjectDetails={getProjectDetails}
                    />
                    <section class="order-style-tab-section">
                        <div class="task-tab-section">
                            <div class="tabs">
                                <ul class="d-flex">
                                    {stagesData
                                        .sort((a, b) => a.sequenceIndex - b.sequenceIndex)
                                        .map((stageData, index) => (
                                            <li
                                                class={activeTab === index ? "active" : ""}
                                                key={stageData.id}
                                                onClick={() => setActiveTab(index)}
                                            >
                                                {getPercentage() == 100 ? (
                                                    <div class="status progress done">
                                                        <span class="progress-left">
                                                            <span class="progress-bar"></span>
                                                        </span>
                                                        <span class="progress-right">
                                                            <span class="progress-bar"></span>
                                                        </span>
                                                        <div class="progress-value">
                                                            <div class="task-value">
                                                                {getPercentage()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div
                                                        class={`status progress`}
                                                        data-percentage={`${getPercentage()}`}
                                                    >
                                                        <span class="progress-left">
                                                            <span class="progress-bar"></span>
                                                        </span>
                                                        <span class="progress-right">
                                                            <span class="progress-bar"></span>
                                                        </span>
                                                        <div class="progress-value">
                                                            <div class="task-value">
                                                                {getPercentage()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                <span class="task-name">{stageData.stageName}</span>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                    <StyleTable
                        styleData={stagesData[activeTab]}
                        orderId={id}
                        getStylesPlan={getStylesPlan}
                        onClickCell={onClickCell}
                        onStyleCallBack={onStyleCallBack}
                    />
                </div>
            )}
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
                    callback={callback}
                />
            </Modal>
        </LoadingOverlay>
    );
};

export default MyProjectDetailsV2;
