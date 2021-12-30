import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";

import * as ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import QuillMention from "quill-mention";
import LoadingOverlay from "react-loading-overlay";

import Http from "../../../services/Http";
import { toastSuccess, toastError } from "../../../commonComponents/Toast";
import { TaskDetailSkeleton, TaskPostSkeleton } from "../../../commonComponents/TaskSkeletons";
import { CreateSkeletons } from "../../../commonComponents/ProductSkeleton";
import { changeDateFormat, addImageSuffix, _getKey } from "../../../services/Util";

import { TaskDescriptionComponent } from "./TaskManageComponents/TaskDescriptionComponent";
import { DateRangeComponent } from "./TaskManageComponents/DateRangeComponent";
import PostWithComments from "./TaskManageComponents/PostWithComments";
import { SelectedFileViewComponent } from "./TaskManageComponents/SelectedFileViewComponent";
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
} from "../../../constant";

import 'react-dates/initialize';
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";

export default class TaskManage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: false,
         loadingPosts: false,
         loadingDetails: false,
         taskId: this.props.id,
         orderId: this.props.orderId,
         task: {},
         tempTask: {},
         showAddNewMemberModal: false,
         orderMemberObj: {},
         orderMemberList: [],
         editDescription: false,
         userInfo: {},
         posts: [],
         createPostFlag: false,
         showSkipFlag: false,
         post: "",
         selectedFiles: [],
         postType: "",
         startDate: null,
         endDate: null,
         focusedInput: null,
         postPageSize: 10,
         postTypeFilter: "",
         postPageNumber: 0,
         postHasNext: true,
      };
   }

   mentionModule = {
      allowedChars: /^[A-Za-z\s]*$/,
      mentionDenotationChars: ["@"],
      source: async (searchTerm, renderList, mentionChar) => {
         let values;
         let { orderMemberList } = this.state;
         if (mentionChar === "@") {
            values = orderMemberList.map((user) => {
               return {
                  id: user.email,
                  value: user.memberName,
               };
            });
         } else {
            values = orderMemberList.map((user) => {
               return {
                  id: user.email,
                  value: user.memberName,
               };
            });
         }

         if (searchTerm.length === 0) {
            renderList(values, searchTerm);
         } else {
            let matches = [];
            // await Http.GET('getUserSuggestions', `?email=${searchTerm}`)
            //   .then(({data}) => {
            //     if(data){
            //       matches = data.map((user) => ({id: user.id, value: user.email}));
            //     }
            //   }).catch(response => {});
            for (let i = 0; i < values.length; i++)
               if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()))
                  matches.push(values[i]);
            renderList(matches, searchTerm);
         }
      },
   };

   handleClickOutside = (event) => {
      if (
         this.AddNewMemberModalRef &&
         !this.AddNewMemberModalRef.contains(event.target) &&
         this.AddNewMemberButtonRef &&
         !this.AddNewMemberButtonRef.contains(event.target)
      ) {
         this.setState({
            showAddNewMemberModal: false,
         });
      }
   };

   handlePostScroll = async () => {
      const wrappedElement = document.getElementById("taskPostScroll");
      if (wrappedElement.scrollHeight - wrappedElement.scrollTop === wrappedElement.clientHeight) {
         let { posts, postPageSize, postTypeFilter, postPageNumber, postHasNext, loadingPosts } =
            this.state;
         if (postHasNext && !loadingPosts && posts.length) {
            this.fetchTaskPosts(postPageNumber + 1);
         }
      }
   };

   componentDidMount = async () => {
      document.addEventListener("mousedown", this.handleClickOutside);
      let { taskId } = this.state;
      await this.setState({
         loadingDetails: true,
         loadingPosts: true,
      });
      let userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
         userInfo = JSON.parse(userInfo);
         this.setState({
            userInfo,
         });
      }
      await Http.GET("task", taskId)
         .then(({ data }) => {
            this.setState({
               loadingDetails: false,
               task: data,
               tempTask: {...data}
            },() => this.fetchTaskPosts());
         })
         .catch(({ response }) => {
            this.setState({ loadingDetails: false });
            if (response && response.data && response.data.message) {
               toastError(response.data.message);
            } else {
               // toastError("Something went wrong! Please try again.");
            }
         });
      this.fetchOrderMembers();
   };

   componentWillUnmount() {
      window.removeEventListener("scroll", this.handleWindowScroll);
      document.removeEventListener("mousedown", this.handleClickOutside);
   }

   fetchTaskPosts = async (page = 0) => {
      let { task, postTypeFilter, postPageSize, posts } = this.state;
      await this.setState({ loadingPosts: true });

      if (page === 0) {
         await this.setState({ posts: [] });
      }

      await Http.GET(
         "getTaskPosts",
         `${task.id}?postType=${postTypeFilter}&page=${page}&size=${postPageSize}`
      )
         .then(({ data }) => {
            this.setState({
               loadingPosts: false,
            });
            if (data) {
               data = data.map((post) => {
                  post.key = _getKey();
                  return post;
               });
            }
            if (data) {
               this.setState({
                  posts: page === 0 ? data : [...posts, ...data],
                  postPageNumber: page,
               });
            }
            if (data) {
               this.setState({
                  postHasNext: data.length && data.length === postPageSize ? true : false,
               });
            }
         })
         .catch(({ response }) => {
            this.setState({ loadingPosts: false });
            if (response && response.data && response.data.message) {
               toastError(response.data.message);
            } else {
               // toastError("Something went wrong! Please try again.");
            }
         });
   };

   fetchOrderMembers = async () => {
      let { orderId } = this.state;
      await Http.GET("getProjectMembers", orderId)
         .then(({ data }) => {
            this.setState({
               orderMemberList: data.memberList,
               orderMemberObj: data,
            });
         })
         .catch(({ response }) => {
            if (response && response.data && response.data.message) {
               toastError(response.data.message);
            } else {
               // toastError("Something went wrong! Please try again.");
            }
         });
   };

   isMemberAdded = (member) => {
      let { task } = this.state;
      let flag = false;
      task.memberList.map((taskMember) => {
         if (taskMember.memberId === member.memberId) {
            flag = true;
         }
      });
      return flag;
   };

   addDeleteMember = async (member) => {
      let { taskId, task } = this.state;
      await this.setState({ loading: true });
      await Http.POST("addDeleteMemberToTask", { stepId: taskId, memberIdList: [member.memberId] })
         .then(({ data }) => {
            this.setState({ loading: false });
            if (data.success) {
               let flag = true;
               task.memberList = task.memberList.filter((memberItem) => {
                  if (memberItem.memberId === member.memberId) {
                     flag = false;
                  }
                  return memberItem.memberId !== member.memberId;
               });
               if (flag) {
                  task.memberList.push(member);
               }
               this.setState({
                  loading: false,
                  task,
               });
            } else {
               this.setState({
                  loading: false,
                  task,
               });
            }
         })
         .catch(({ response }) => {
            this.setState({ loading: false });
            if (response && response.data && response.data.message) {
               toastError(response.data.message);
            } else {
               // toastError("Something went wrong! Please try again.");
            }
         });
   };

   toggleFlag = (flagName) => {
      let flag = this.state[flagName];
      this.setState({
         [flagName]: flag ? false : true,
      });
      console.log("toggleFlag", flagName);
   };

   onChange = async (key, value) => {
      let { task } = this.state;
      task[key] = value;
      await this.setState({
         task,
      });
      if (key === "stepType") {
         this.setState({
            createPostFlag: false,
            showSkipFlag: false,
            postType: "",
         });
         this.postInput.blur();
         this.update("stepType");
      }
   };

   onChangePost = (val) => {
      this.setState({
         post: val,
      });
      // if (!this.state.createPostFlag) {
      //   this.setState({
      //     createPostFlag: true
      //   })
      // }
   };

   setType = async (type) => {
      await this.setState({
         postType: type,
      });
      if (type === "COMPLETE" || type === "REVISE") {
         this.postInput.focus();
      }
      if (type === "APPROVE") {
         this.post();
      }
   };

   cancelDesc = () => {
      this.setState({
         editDescription: false,
         task: {...this.state.tempTask}
      });
   };

   saveDate = async (startDate, endDate) => {
      let { task } = this.state;
      task.startDate = startDate ? startDate.format("YYYY-MM-DD") : null;
      task.endDate = endDate ? endDate.format("YYYY-MM-DD") : null;
      await this.setState({ task });
      if (startDate && endDate) {
         this.update("date");
      }
   };

   update = async (updateType) => {
      let { task } = this.state;
      await this.setState({ loading: true });
      let body = {};
      if (updateType === "stepType") {
         body.stepType = task.stepType;
      } else if (updateType.includes("date")) {
         body.startDate = task.startDate;
         body.endDate = task.endDate;
      } else if (updateType === "editDescription") {
         body.description = task.stepDescription;
      }
      await Http.PUT("task", body, task.id)
         .then(({ data }) => {
            this.setState({ loading: false, tempTask: task });
            this.props.callback(task);
            if (updateType === "editDescription") {
               this.setState({
                  editDescription: false,
               });
            }
         })
         .catch(({ response }) => {
            this.setState({ loading: false });
            if (response && response.data && response.data.message) {
               toastError(response.data.message);
            } else {
               // toastError("Something went wrong! Please try again.");
            }
         });
   };

   onMultipleFileSelect = async (e, docType) => {
      let { selectedFiles } = this.state;
      let files = Array.from(e.target.files);
      let key = e.target.name;
      await files.map((item) => {
         let data = {
            name: item.name,
            docMimeType: item.type,
            documentType: docType,
            print: false,
            base64Str: "",
         };
         let reader = new FileReader();
         reader.readAsDataURL(item);
         reader.onload = () => {
            data.base64Str = reader.result;
            selectedFiles.push(data);
            this.setState({ selectedFiles, createPostFlag: true });
         };
         reader.onerror = function (error) {
            console.log("Error: ", error);
         };
      });
   };

   removeFile = (index) => {
      let { selectedFiles } = this.state;
      this.setState({
         selectedFiles: selectedFiles.filter((file, i) => i !== index),
      });
   };

   getMentionedUserIds = () => {
      let { post, orderMemberList } = this.state;
      let foundEmails = [];
      let emailRegex =
         /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
      let gotcha;
      let match = null;
      let ids = [];
      while ((match = emailRegex.exec(post))) {
         foundEmails.push(match[0]);
         post = post.replace(match[0], "");
      }
      foundEmails.map((email) => {
         orderMemberList.map((member) => {
            if (member.email === email && !ids.includes(member.memberId)) {
               ids.push(member.memberId);
            }
         });
      });
      return ids;
   };

   handlePost = async () => {
      let { showSkipFlag, postType, selectedFiles } = this.state;
      if (postType === "COMPLETE" && !selectedFiles.length) {
         await this.setState({ showSkipFlag: true });
         return;
      }
      this.post();
   };

   post = async () => {
      let { showSkipFlag, postType, selectedFiles, taskId, orderId, post, posts } = this.state;
      let body = {
         documentDTOList: selectedFiles,
         orderId,
         stepId: taskId,
         text: post.replace(/"/g, "'"),
         taggedUserIdList: this.getMentionedUserIds(),
      };
      if (postType === "COMPLETE" || postType === "APPROVE") {
         this.approvePost(body);
      } else if (postType === "REVISE") {
         this.revisePost(body);
      } else {
         await this.setState({ loading: true });
         await Http.POST("postOnTask", body)
            .then(({ data }) => {
               this.setState({ loading: false });
               if (data.success) {
                  if (data.payload) posts.push(data.payload);
                  this.setState({
                     post: "",
                     selectedFiles: [],
                     showSkipFlag: false,
                     createPostFlag: false,
                     postType: "",
                     posts,
                  });
                  this.postInput.blur();
               }
            })
            .catch(({ response }) => {
               this.setState({ loading: false });
               if (response && response.data && response.data.message) {
                  toastError(response.data.message);
               } else {
                  // toastError("Something went wrong! Please try again.");
               }
            });
      }
   };

   approvePost = async (body) => {
      let { taskId, posts, task } = this.state;
      await this.setState({ loading: true });
      await Http.POST("approveTask", body, taskId)
         .then(({ data }) => {
            this.setState({ loading: false });
            if (data.success) {
               if (data.payload && data.payload.postResponse && data.payload.stepDetailsResponse) {
                  posts.push(data.payload.postResponse);
                  task = { ...data.payload.stepDetailsResponse };
                  this.props.callback(data.payload.stepDetailsResponse);
               }
               this.setState({
                  post: "",
                  selectedFiles: [],
                  showSkipFlag: false,
                  createPostFlag: false,
                  postType: "",
                  posts,
                  task,
                  tempTask: {...task}
               });
               this.postInput.blur();
            }
         })
         .catch(({ response }) => {
            this.setState({ loading: false });
            if (response && response.data && response.data.message) {
               toastError(response.data.message);
            } else {
               // toastError("Something went wrong! Please try again.");
            }
         });
   };

   revisePost = async (body) => {
      let { taskId, posts, task } = this.state;
      await this.setState({ loading: true });
      await Http.POST("reviseTask", body, taskId)
         .then(({ data }) => {
            this.setState({ loading: false });
            if (data.success) {
               if (data.payload && data.payload.postResponse && data.payload.stepDetailsResponse) {
                  posts.push(data.payload.postResponse);
                  task = { ...data.payload.stepDetailsResponse };
                  this.props.callback(data.payload.stepDetailsResponse);
               }
               this.setState({
                  post: "",
                  selectedFiles: [],
                  showSkipFlag: false,
                  createPostFlag: false,
                  postType: "",
                  posts,
                  task,
                  tempTask: {...task}
               });
               this.postInput.blur();
            }
         })
         .catch(({ response }) => {
            this.setState({ loading: false });
            if (response && response.data && response.data.message) {
               toastError(response.data.message);
            } else {
               // toastError("Something went wrong! Please try again.");
            }
         });
   };

   toggleLoader = (flag) => {
      this.setState({
         loading: flag,
      });
   };

   render() {
      let {
         task,
         showAddNewMemberModal,
         orderMemberList,
         editDescription,
         orderMemberObj,
         userInfo,
         posts,
         createPostFlag,
         post,
         selectedFiles,
         postType,
         showSkipFlag,
         postTypeFilter,
      } = this.state;
      let { loadingDetails, loadingPosts, loading, postPageNumber } = this.state;
      return (
         <LoadingOverlay
            active={this.state.loading}
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
            <>
               {loadingDetails ? (
                  <TaskDetailSkeleton />
               ) : (
                  <Modal.Header>
                     {task.stepProduct && task.stepProduct.image && (
                        <div className="left-photo-title">
                           <img src={task.stepProduct.image} alt="" />
                        </div>
                     )}
                     <h5 className="modal-title">{task.stepName}</h5>
                     {task.stepProduct && task.stepProduct.id ? (
                        <div className="style-name">
                           of{" "}
                           <a href={`/designs/view/${task.stepProduct.id}`} target="_blank">
                              {task.stepProduct.name}
                           </a>
                        </div>
                     ) : (
                        <></>
                     )}

                     <div className="member-and-date d-flex justify-content-between align-items-center">
                        <div className="member">
                           <div className="item">
                              <div className="add-member-popup cursor-pointer">
                                 <svg
                                    width="28"
                                    height="28"
                                    viewBox="0 0 28 28"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => this.setState({ showAddNewMemberModal: true })}
                                    ref={(node) => (this.AddNewMemberButtonRef = node)}
                                 >
                                    <circle
                                       cx="14"
                                       cy="14"
                                       r="13"
                                       stroke="#616161"
                                       stroke-width="2"
                                    />
                                    <path
                                       d="M21 15H15V21H13V15H7V13H13V7H15V13H21V15Z"
                                       fill="#403C3C"
                                       fill-opacity="0.87"
                                    />
                                 </svg>

                                 <div
                                    className={`assign-member shadow ${
                                       showAddNewMemberModal ? `open` : ``
                                    }`}
                                    ref={(node) => (this.AddNewMemberModalRef = node)}
                                 >
                                    <div className="title">Assign member</div>
                                    <div className="member-list-container">
                                       {orderMemberList && orderMemberList.length ? (
                                          orderMemberList.map((member) => {
                                             return (
                                                <div
                                                   className="member-list"
                                                   onClick={() => this.addDeleteMember(member)}
                                                >
                                                   {member.memberImage ? (
                                                      <img src={member.memberImage} alt="" />
                                                   ) : (
                                                      <img
                                                         src={require("../../../assets/images/pro_pic_default.svg")}
                                                         alt=""
                                                      />
                                                   )}
                                                   <div className="name">
                                                      {member.memberName}{" "}
                                                      {
                                                        member.designation &&
                                                        <span className="tag">
                                                           {member.designation}
                                                        </span>
                                                      }
                                                   </div>
                                                   {this.isMemberAdded(member) ? (
                                                      <div className="checked">
                                                         <div className="d-block">
                                                            <svg
                                                               width="18"
                                                               height="13"
                                                               viewBox="0 0 18 13"
                                                               fill="none"
                                                               xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                               <path
                                                                  d="M5.99914 10.1998L2.49914 6.69982C2.10914 6.30982 1.48914 6.30982 1.09914 6.69982C0.709141 7.08982 0.709141 7.70982 1.09914 8.09982L5.28914 12.2898C5.67914 12.6798 6.30914 12.6798 6.69914 12.2898L17.2991 1.69982C17.6891 1.30982 17.6891 0.689824 17.2991 0.299824C16.9091 -0.0901758 16.2891 -0.0901758 15.8991 0.299824L5.99914 10.1998Z"
                                                                  fill="#452C8E"
                                                               />
                                                            </svg>
                                                         </div>
                                                      </div>
                                                   ) : (
                                                      <></>
                                                   )}
                                                </div>
                                             );
                                          })
                                       ) : (
                                          <></>
                                       )}
                                    </div>
                                 </div>
                              </div>
                           </div>
                           {task.memberList && task.memberList.length ? (
                              task.memberList.map((member) => {
                                 return (
                                    <div className="item">
                                       {member.memberImage ? (
                                          <img
                                             src={member.memberImage}
                                             alt={member.memberName}
                                             data-toggle="tooltip"
                                             data-placement="top"
                                             title={member.memberName}
                                          />
                                       ) : (
                                          <img
                                             src={require("../../../assets/images/pro_pic_default.svg")}
                                             alt={member.memberName}
                                             data-toggle="tooltip"
                                             data-placement="top"
                                             title={member.memberName}
                                          />
                                       )}
                                    </div>
                                 );
                              })
                           ) : (
                              <></>
                           )}
                        </div>
                        <DateRangePicker
                           daySize={30}
                           displayFormat="MMM DD"
                           isOutsideRange={() => false}
                           startDate={task.startDate ? moment(task.startDate, "YYYY-MM-DD") : null} // momentPropTypes.momentObj or null,
                           startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                           endDate={task.endDate ? moment(task.endDate, "YYYY-MM-DD") : null} // momentPropTypes.momentObj or null,
                           endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                           onDatesChange={({ startDate, endDate }) =>
                              this.saveDate(startDate, endDate)
                           } // PropTypes.func.isRequired,
                           focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                           onFocusChange={(focusedInput) => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                        />
                     </div>

                     <TaskDescriptionComponent
                        data={task}
                        flag={editDescription}
                        flagName="editDescription"
                        toggleFlag={this.toggleFlag}
                        onChange={this.onChange}
                        update={this.update}
                        cancel={this.cancelDesc}
                     />

                     <div className="actions-task">
                        {userInfo.id === orderMemberObj.managerId ? (
                           <select
                              name="stepType"
                              value={task.stepType}
                              onChange={(e) => this.onChange(e.target.name, e.target.value)}
                              disabled={task.status === "COMPLETED" || task.status === "APPROVED"}
                           >
                              <option value="REVIEW">Review</option>
                              <option value="TASK">Task</option>
                           </select>
                        ) : (
                           <></>
                        )}
                        {task.stepType === "TASK" && task.status !== "COMPLETED" && (
                           <button className="green-btn" onClick={() => this.setType("COMPLETE")}>
                              Complete
                           </button>
                        )}
                        {task.stepType === "TASK" &&
                           task.actualEndDate &&
                           task.status === "COMPLETED" && (
                              <button className="completed-btn">
                                 Completed
                                 <span>
                                    {" "}
                                    {changeDateFormat(task.actualEndDate, "YYYY-MM-DD", "MMM-DD")}
                                 </span>
                                 <svg
                                    width="18"
                                    height="14"
                                    viewBox="0 0 18 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M6.00039 11.2001L1.80039 7.0001L0.400391 8.4001L6.00039 14.0001L18.0004 2.0001L16.6004 0.600098L6.00039 11.2001Z"
                                       fill="#00C334"
                                    />
                                 </svg>
                              </button>
                           )}

                        {task.stepType === "REVIEW" &&
                           task.actualEndDate &&
                           task.status === "APPROVED" && (
                              <button className="completed-btn">
                                 Approved
                                 <span>
                                    {" "}
                                    {changeDateFormat(task.actualEndDate, "YYYY-MM-DD", "MMM-DD")}
                                 </span>
                                 <svg
                                    width="18"
                                    height="14"
                                    viewBox="0 0 18 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M6.00039 11.2001L1.80039 7.0001L0.400391 8.4001L6.00039 14.0001L18.0004 2.0001L16.6004 0.600098L6.00039 11.2001Z"
                                       fill="#00C334"
                                    />
                                 </svg>
                              </button>
                           )}

                        {task.stepType === "REVIEW" && task.status !== "APPROVED" && (
                           <>
                              <button className="green-btn" onClick={() => this.setType("APPROVE")}>
                                 Approve
                              </button>
                              <button
                                 className="red-light-btn"
                                 onClick={() => this.setType("REVISE")}
                              >
                                 Revise
                              </button>
                           </>
                        )}
                        {task.stepType === "REVIEW" && task.revisionCount && !postTypeFilter && (
                           <span
                              className="revised-times cursor-pointer"
                              onClick={() =>
                                 this.setState({ postTypeFilter: "TASK_REVISION" }, () =>
                                    this.fetchTaskPosts(0)
                                 )
                              }
                           >
                              Revised {task.revisionCount} times
                           </span>
                        )}

                        {task.stepType === "REVIEW" && task.revisionCount && postTypeFilter && (
                           <span
                              className="revised-times cursor-pointer"
                              onClick={() =>
                                 this.setState({ postTypeFilter: "" }, () => this.fetchTaskPosts(0))
                              }
                           >
                              Clear filter
                           </span>
                        )}
                     </div>

                     <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={this.props.closeModal}
                     >
                        <span aria-hidden="true">
                           <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path
                                 d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                                 fill="#222222"
                                 fill-opacity="0.87"
                              />
                           </svg>
                        </span>
                     </button>
                  </Modal.Header>
               )}
            </>
            {postPageNumber === 0 && loadingPosts ? (
               <></>
            ) : (
               <Modal.Body
                  className="custom-scrollbar"
                  id="taskPostScroll"
                  onScroll={this.handlePostScroll}
               >
                  <div className="conversation-container">
                     {posts.map((post, i) => {
                        return (
                           <PostWithComments
                              post={post}
                              key={post.key}
                              orderMemberList={orderMemberList}
                              toggleLoader={this.toggleLoader}
                              userInfo={userInfo}
                           />
                        );
                     })}
                     {!posts.length && !loadingPosts && (
                        <div class="no-comments">No comment found</div>
                     )}
                  </div>
               </Modal.Body>
            )}

            {loadingPosts && <TaskPostSkeleton />}
            <Modal.Footer
               className={`modal-footer-fixed posting-option ${createPostFlag ? `open` : ``}`}
            >
               <div
                  className={`header-info-title ${
                     postType === `COMPLETE` && createPostFlag ? `open` : ``
                  }`}
               >
                  Please attach proof.
               </div>
               <div
                  className={`header-info-title title-warn ${
                     postType === `REVISE` && createPostFlag ? `open` : ``
                  }`}
               >
                  Requesting for revision{" "}
                  <span>
                     <span className="review__on">on</span> {task.stepName}
                  </span>
               </div>

               <div className="user-photo">
                  {userInfo && userInfo.profilePicDocument ? (
                     <img src={addImageSuffix(userInfo.profilePicDocument.docUrl, "_xicon")} />
                  ) : (
                     <img src={require("../../../assets/images/pro_pic_default.png")} />
                  )}
               </div>
               <ReactQuill
                  ref={(input) => {
                     this.postInput = input;
                  }}
                  name="post"
                  value={post}
                  debug="info"
                  theme="bubble"
                  className="custom-scrollbar"
                  placeholder="Write comment…"
                  onChange={this.onChangePost}
                  onFocus={() => this.setState({ createPostFlag: true })}
                  onClick={() => this.setState({ createPostFlag: true })}
                  modules={{ mention: this.mentionModule }}
               />

               {/*<textarea ref={(input) => { this.postInput = input; }}  name="post" value={post} className="custom-scrollbar" placeholder="Write here..." onChange={this.onChangeState} onFocus={() => this.setState({createPostFlag: true})}></textarea>*/}

               <div
                  className={`files-n-photos custom-scrollbar ${
                     selectedFiles.length ? `open` : ``
                  }`}
               >
                  {selectedFiles.map((file, i) => {
                     return (
                        <SelectedFileViewComponent
                           showRemoveOption={true}
                           file={file}
                           key={i}
                           index={i}
                           remove={this.removeFile}
                        />
                     );
                  })}
               </div>

               <div className="post-actions">
                  <div className="attachment cursor-pointer">
                     <label for="input-file">
                        <svg
                           width="24"
                           height="24"
                           viewBox="0 0 24 24"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              d="M12.5 22C9.46 22 7 19.54 7 16.5L7 6C7 3.79 8.79 2 11 2C13.21 2 15 3.79 15 6L15 14.5C15 15.88 13.88 17 12.5 17C11.12 17 10 15.88 10 14.5L10 7L12 7L12 14.59C12 15.14 13 15.14 13 14.59L13 6C13 4.9 12.1 4 11 4C9.9 4 9 4.9 9 6L9 16.5C9 18.43 10.57 20 12.5 20C14.43 20 16 18.43 16 16.5L16 7L18 7L18 16.5C18 19.54 15.54 22 12.5 22Z"
                              fill="#595959"
                           />
                        </svg>
                     </label>
                     <input
                        id="input-file"
                        type="file"
                        name="selectedFiles"
                        onChange={(e) => this.onMultipleFileSelect(e, "ACCESSORIES_DESIGN")}
                        multiple
                     />
                  </div>
                  <div className="save-note">
                     <button
                        className={`text-white ${post.length ? `brand-bg-color` : ``}`}
                        onClick={this.handlePost}
                        disabled={!post.length}
                     >
                        Post
                     </button>
                     <div
                        className="close-note cursor-pointer"
                        onClick={() => {
                           this.setState({
                              post: "",
                              selectedFiles: [],
                              postType: "",
                              createPostFlag: false,
                              showSkipFlag: false,
                           });
                           this.postInput.blur();
                        }}
                     >
                        <svg
                           width="14"
                           height="15"
                           viewBox="0 0 14 15"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              d="M14 1.91L12.59 0.5L7 6.09L1.41 0.5L0 1.91L5.59 7.5L0 13.09L1.41 14.5L7 8.91L12.59 14.5L14 13.09L8.41 7.5L14 1.91Z"
                              fill="#222222"
                           ></path>
                        </svg>
                     </div>
                  </div>
               </div>

               <div className={`skip-and-post ${showSkipFlag ? `open` : ``}`}>
                  <span>No attachment found.</span>
                  <div className="actions">
                     <button className="white-btn" onClick={this.post}>
                        Skip and post
                     </button>
                     <button
                        className="red-light-btn text-white brand-bg-color border-0"
                        onClick={() => this.setState({ showSkipFlag: false })}
                     >
                        Cancel
                     </button>
                  </div>
               </div>

               {/*</div>*/}
            </Modal.Footer>
         </LoadingOverlay>
      );
   }
}
