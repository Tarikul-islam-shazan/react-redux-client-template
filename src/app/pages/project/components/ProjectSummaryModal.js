import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { deliverableStatus, convertTimeToLocal } from '../../../services/Util';
import FitSampleEdit from './FitSampleEdit';

class ProjectSummaryModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
          step : 0,
          showEdit:0,
          // id : this.props.productId
          data : {}
        };
        console.log("entered");
        this.setWrapperRef = this.setWrapperRef.bind(this);
    }

    setWrapperRef = (node) => {
      this.wrapperRef = node;
    }

    handleClickOutside = (event) => {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        // alert('You clicked outside of me!');
        let { data } = this.state;
        data.phaseResponseList = data.phaseResponseList.map((item)=>{
          item.deliverableResponseList = item.deliverableResponseList.map((item2)=>{
            item2.showEdit = false;
            return item2;
          })
          return item;
        })
        this.setState({data})
      }
    }

    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }

    componentDidMount = () => {
      document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentDidUpdate = (prevProps, prevState) => {
      if(prevProps.data!=this.props.data){
        this.setState({data: this.props.data});
      }
    }

    _goToStep = (step) => {
      this.setState({
        step
      })
    }

    toggleEdit = () => {
      this.setState({
        showEdit:!this.state.showEdit
      })
    }

    showEditPanel = (i,j) => {
      let { data } = this.state;
      data.phaseResponseList[i].deliverableResponseList[j].showEdit = true;
      console.log("edit clicked",data);
      this.setState({data})
    }

    renderCheckListItems = () => {
      let { data } = this.state;
      // let
      if(data.phaseResponseList){
        return data.phaseResponseList.map((item,i) => {
          let deliverables = [];
          item.deliverableResponseList.map((item2,j) => {
                deliverables.push(
                  <div className="item" key={j}>
                    <div className="item-name">{item2.deliverableText}</div>
                    <button type="button" className="action action-edit-2" onClick={()=>this.showEditPanel(i,j)}></button>
                    {
                      item2.showEdit ?
                      <div ref={this.setWrapperRef}>
                        <FitSampleEdit deliverableId={item2.id} statusList={data.availableDeliverableStatusList ? data.availableDeliverableStatusList : []} deliverableText={item2.deliverableText} />
                      </div>
                      : <></>
                    }
                    {
                      item2.status ? deliverableStatus(item2) : <span className="badge table-badge">&nbsp;</span>
                    }
                  </div>
                )
          })
          return(
            <div className="production" key={i}>
                <h6>{item.phaseName}</h6>
                <div className="checklist-item  item-edit">
                    {deliverables}
                </div>
            </div>
          )
        })
      }



    }

    render() {
      console.log("from ProjectSummaryModal",this.props.data);
        let { data } = this.props;
        // if(data == {}){
        //   return (
        //     <></>
        //   )
        // }
        return (
          <>
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-body p-0">
                        <img src={require("../../../assets/images/cancel.png")} alt="cancel button" className="img-fluid close-btn" data-dismiss="modal" aria-label="Close"/>
                        <div className="summery-popup">
                            <div className="project-status-container" style={{borderWidth:0}}>
                                <div className="project-statistic">
                                    <div className="ps-item">
                                        <label>Style No.</label>
                                        <h6>{data.productNo}</h6>
                                    </div>
                                    <div className="ps-item">
                                        <label>Style Name</label>
                                        <h6>{data.name}</h6>
                                    </div>
                                    <div className="ps-item">
                                        <label>Product category</label>
                                        <h6>{data.productType && data.productType.name}</h6>
                                    </div>
                                    <div className="ps-item">
                                        <label>Due Date</label>
                                        <h6>{data.deliverableResponse && convertTimeToLocal(data.deliverableResponse.deadline, '', 'MMM DD, YYYY')}</h6>
                                    </div>
                                    {/*<div className="ps-item">
                                        <label>Color</label>
                                        <h6>Blue</h6>
                                    </div>*/}
                                </div>
                                <div className="project-status">
                                    <div className="head">
                                        <label>Checklist Status</label>
                                        <div className="percentage">{data.percentageComplete}%</div>
                                    </div>
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{width: data.percentageComplete+'%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="checklist">
                              { this.renderCheckListItems() }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </>
        );
    }
}

const mapStateToProps = store => {
	return {
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSummaryModal);
