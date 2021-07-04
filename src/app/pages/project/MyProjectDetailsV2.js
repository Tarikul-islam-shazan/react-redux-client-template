import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import Modal from "react-bootstrap/Modal";

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

const groupByIds = (styleStepBasicInfoList) => {
   const groupedResult = {};
   styleStepBasicInfoList.forEach((item) => {
      item.stepBasicInfoList.forEach((infoItem) => {
         const data = { ...infoItem };
         if (item.stepProduct) {
            data.product = item.stepProduct;
         }
         if (item.stepMaterial) {
            data.material = item.stepMaterial;
         }

         if (!groupedResult[data.stepName]) {
            groupedResult[data.stepName] = [data];
         } else {
            groupedResult[data.stepName].push(data);
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
      const { styleStepBasicInfoList, stageResponse, startDate, endDate, stepProductList } = stage;
      const groupedList = groupByIds(styleStepBasicInfoList);

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

const MyProjectDetailsV2 = () => {
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

   const getStylesPlan = async (orderId) => {
      await Http.GET("getStepResponseForOrderDetails", "/" + orderId)
         .then(({ data }) => {
            setLoading(false);
            setStyleData(data);
            setStagesData(formatStagesData(data));
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
   const callback = useCallback(() => {
      getStylesPlan(id);
   }, [id]);

   const onStyleCallBack = useCallback(() => {
      getStylesPlan(id);
   }, [id]);

   useEffect(() => {
      getProjectDetails(id);
      getStylesPlan(id);
   }, [id, callback]);

   const getPercentage = () => {
      return (
         projectDetails.stageCompletenessList &&
         projectDetails.stageCompletenessList[activeTab].percentageOfCompleteness
      );
   };

   const onClickCell = async (taskId) => {
      await setSelectedTask({ taskId, orderId: id });
      await setShowTaskDetailsModal(true);
   };

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
                                             <div class="task-value">{getPercentage()}</div>
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
                                             <div class="task-value">{getPercentage()}</div>
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
