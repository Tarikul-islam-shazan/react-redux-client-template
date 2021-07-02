import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import LoadingOverlay from "react-loading-overlay";
import Http from "../../../services/Http";
import { toastSuccess, toastError } from "../../../commonComponents/Toast";
import {
   LOADER_OVERLAY_BACKGROUND,
   LOADER_COLOR,
   LOADER_WIDTH,
   LOADER_TEXT,
} from "../../../constant";
import { DateRangeComponent } from "../../task/components/TaskManageComponents/DateRangeComponent";

class AddNewTask extends Component {
   constructor(props) {
      super(props);
      this.state = {
         dateRangeOpen: false,
         taskName: null,
         taskDescription: null,
         addedMembers: [],
         startDate: null,
         endDate: null,
         orderId: props.orderId,
         orderMemberList: [],
         showAddMemberDiv: false,
      };
   }

   componentDidMount = async () => {
      document.addEventListener("mousedown", this.handleClickOutside);

      await this.setState({
         loading: true,
      });
      let userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
         userInfo = JSON.parse(userInfo);
         this.setState({
            userInfo,
         });
      }

      this.fetchOrderMembers();
   };

   fetchOrderMembers = async () => {
      let { orderId } = this.state;
      await Http.GET("getProjectMembers", orderId)
         .then(({ data }) => {
            this.setState({
               loading: false,
               orderMemberList: data.memberList,
            });
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

   toggleAddMemberDiv = (e) => {
      this.setState({ showAddMemberDiv: !this.state.showAddMemberDiv });

      console.log(this.state.orderMemberList);
   };

   handleClickOutside = (event) => {
      if (this.AddNewMemberModalRef && !this.AddNewMemberModalRef.contains(event.target)) {
         this.setState({
            showAddMemberDiv: false,
         });
      }
   };

   addMemberToggleHandler = (member) => {
      let newMemberList = [...this.state.addedMembers];
      if (newMemberList.indexOf(member.memberId) > -1)
         newMemberList.splice(newMemberList.indexOf(member.memberId), 1);
      else newMemberList.push(member.memberId);

      this.setState({ addedMembers: newMemberList });
   };

   getMemberImage = (memberid) => {
      let { orderMemberList } = this.state;

      let imageUrl;

      orderMemberList.map((member) => {
         if (member.memberId === memberid) imageUrl = member.memberImage;
      });

      return imageUrl;
   };

   isMemberAdded = (member) => {
      return this.state.addedMembers.indexOf(member.memberId) > -1;
   };

   addNewTask = () => {
      let { taskName, taskDescription, addedMembers } = this.state;

      Http.POST("addNewTask", {
         orderId: this.props.orderId,
         stageId: this.props.styleData.id,
         name: taskName,
         description: taskDescription,
         memberIdList: addedMembers,
      })
         .then(({ data }) => {
            this.setState({
               loading: false,
            });

            toastSuccess("Task added successfully");
            document.getElementById("TaskConversationModalClose").click();
            this.props.getStylesPlan(this.props.orderId);
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

   onChange = async (e) => {
      this.setState({
         [e.target.name]: e.target.value,
      });
   };

   render() {
      let { orderMemberList, addedMembers } = this.state;

      return (
         <div
            className="modal fade task-conversation add-new-task-popup"
            data-backdrop="static"
            id="TaskConversation"
            tabindex="-1"
            role="dialog"
            aria-labelledby="right_modal"
         >
            <div className="modal-dialog" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <button
                        type="button"
                        id="TaskConversationModalClose"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
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
                     <h5 className="modal-title">Add new task</h5>
                  </div>

                  <div className="modal-body">
                     <input
                        type="text"
                        placeholder="Task name"
                        name="taskName"
                        className="w-100 bg-gray-light border-0"
                        onChange={this.onChange}
                     />

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
                                    onClick={this.toggleAddMemberDiv}
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
                                       this.state.showAddMemberDiv ? `open` : ``
                                    }`}
                                    ref={(node) => (this.AddNewMemberModalRef = node)}
                                 >
                                    <div className="title">Assign member</div>
                                    <div className="member-list-container">
                                       {orderMemberList &&
                                          orderMemberList.map((member, i) => {
                                             return (
                                                <div
                                                   className="member-list"
                                                   onClick={() =>
                                                      this.addMemberToggleHandler(member)
                                                   }
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
                                                      {member.memberName}
                                                      <span className="tag">
                                                         {member.designation}
                                                      </span>
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
                                          })}
                                    </div>
                                 </div>
                              </div>
                           </div>

                           {addedMembers.map((memberId, j) => {
                              return (
                                 <div className="item">
                                    {this.getMemberImage(memberId) ? (
                                       <img src={this.getMemberImage(memberId)} alt="" />
                                    ) : (
                                       <img
                                          src={require("../../../assets/images/pro_pic_default.svg")}
                                          alt=""
                                       />
                                    )}
                                 </div>
                              );
                           })}
                        </div>
                        <input type="text" name="dates" className="date-range-picker" />
                     </div>

                     <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="3"
                        placeholder="Description"
                        name="description"
                        onChange={this.onChange}
                     ></textarea>

                     <div className="actions-task">
                        <button
                           className="green-btn bg-white border-color-brand color-brand"
                           onClick={() => this.addNewTask()}
                        >
                           Save
                        </button>
                        <button
                           className="text-white brand-bg-color border-0 font-14"
                           data-dismiss="modal"
                        >
                           Cancel
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (store) => {
   return {};
};

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewTask);
