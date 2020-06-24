import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from "loadjs";

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../../services/Http';
import { toastSuccess, toastError } from '../../../commonComponents/Toast';

import { _storeData } from "../actions";
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT } from '../../../constant';

class NewDevelopmentStep_2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
          deadlineError : '',
          addressError : '',
          paymentTermsError : ''
        };
    }

    componentDidMount = () => {
      loadjs(['/js/script.js']);
    }

    onChange = (e) => {
      console.log(e.target.name,e.target.value)
      this.props._storeData(e.target.name,e.target.value);
    }

    submit = () => {
      let { project } = this.props;
      let flag = true;
      if(project.deadline==''){
        flag = false;
        this.setState({
          deadlineError:'Deadline is required'
        })
      }else{
        this.setState({
          deadlineError:''
        })
      }
      if(project.shippingAddress==''){
        flag = false;
        this.setState({
          addressError:'Shipping Address is required'
        })
      }else{
        this.setState({
          addressError:''
        })
      }
      if(project.paymentTerms==''){
        flag = false;
        this.setState({
          paymentTermsError:'Payment Term is required'
        })
      }else{
        this.setState({
          paymentTermsError:''
        })
      }
      if(flag){
        let body = {
          name : project.title,
          numOfStyles : project.numberOfStyles,
          projectType : project.project_type,
          deliveryDate : project.deadline,
          shippingAddress : project.shippingAddress,
          paymentTerms : project.paymentTerms,
          // notes : 'test',
          productDTOList : project.styles.map((item,i) => {
            let temp = {};
            temp.name = "Style "+(i+1);
            temp.developmentType = item.developmentType;
            temp.note = item.note;
            temp.colorDTOList = item.colorList;
            if(item.techPackFile && item.techPackFile.name){
              temp.productCreationType = 'FROM_TECH_PACK';
              temp.techPackDto = item.techPackFile;
            }
            if(item.nitexDesignList){
              temp.productCreationType = 'FROM_CATALOG';
              temp.id = item.nitexDesignList;
            }
            if(item.myDesignList){
              temp.productCreationType = 'FROM_CATALOG';
              temp.id = item.myDesignList;
            }
            temp.documentDTOList = [...item.designInspirationsFiles,...item.otherFiles]
            return temp;
          })
        }
        console.log("body from project",body);
        this.setState({loading:true})
        Http.POST('addProject',body)
          .then(({data}) => {
            console.log('addProject SUCCESS: ', JSON.stringify(data));
            this.setState({loading:false})
            if(data.success){
              // window.location.reload();
              this.props._goToStep(3);
              toastSuccess(data.message);
            }else{
              toastError(data.message);
            }
          })
          .catch(({response}) => {
              console.log('addProject Error: ', JSON.stringify(response));
              this.setState({loading:false})
              if(response.data && response.data.message){
                toastError(response.data.message);
              }else{
                toastError("Something went wrong! Please try again.");
              }
          });
      }
      // this.props._goToStep(3)

    }

    render() {
        let { deadline, shippingAddress, paymentTerms } = this.props.project;
        let { deadlineError, addressError, paymentTermsError } = this.state;
        return (
          <LoadingOverlay
            active={this.state.loading}
            styles={{
              overlay: (base) => ({
                ...base,
                background: LOADER_OVERLAY_BACKGROUND
              }),
              spinner: (base) => ({
                ...base,
                width: LOADER_WIDTH,
                '& svg circle': {
                  stroke: LOADER_COLOR
                }
              }),
              content: (base) => ({
                ...base,
                color: LOADER_COLOR
              })
            }}
            spinner
            text={LOADER_TEXT}>
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-body">
                        <img src={require("../../../assets/images/cancel.png")} alt="cancel button" className="img-fluid close-btn" data-dismiss="modal" aria-label="Close"/>
                        <section>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-8 offset-md-2">
                                        <div className="section-header text-center">
                                            <h5 className="section-title">New Development Project</h5>
                                            <p className="section-subtitle">
                                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                                                aliquyam erat, sed diam voluptua
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="section-content development-step-1">
                                    <div className="form-steps text-center mb-4 mt-2">
                                        <ul>
                                            <li className="step active">
                                                <img src={require("../../../assets/icons/checked.png")} alt="" className="img-fluid" style={{width: 12}} />
                                            </li>
                                            <li className="step active">2</li>
                                        </ul>
                                    </div>
                                    <form>
                                        <div className="form-row">
                                            <div className="form-group col-md-8 offset-md-2">
                                                <label htmlFor="sampleType">Select Payment Terms</label>
                                                <select className="nice-select" name="paymentTerms" value={paymentTerms} onClick={(e) => this.onChange(e)}>
                                                    <option value="">Select Payment Terms</option>
                                                    <option value="CARD">CARD</option>
                                                    <option value="WIRE_TRANSFER">WIRE TRANSFER</option>
                                                    <option value="LETTER_OF_CREDIT">LETTER OF CREDIT</option>
                                                </select>
                                                {
                                                  paymentTermsError ? <span className="error">{paymentTermsError}</span> : ''
                                                }
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-8 offset-md-2">
                                              <div className="form-group">
                                                <p className="form-text text-muted">
                                                  Expected Deadline
                                                </p>
                                                <input type="date" className="form-control" name="deadline" onChange={this.onChange} value={deadline} placeholder="Select Deadline" style={{background: 'url("./images/icons/date_time.png") 98% center no-repeat'}} />
                                                {
                                                  deadlineError ? <span className="error">{deadlineError}</span> : ''
                                                }
                                              </div>
                                              <div className="form-group">
                                                  <p className="form-text text-muted">
                                                    Shipping Address
                                                  </p>
                                                  <input type="text" className="form-control" name="shippingAddress" onChange={this.onChange} value={shippingAddress} placeholder="Write address...."/>
                                                  {
                                                    addressError ? <span className="error">{addressError}</span> : ''
                                                  }
                                              </div>
                                            </div>
                                        </div>
                                        <br/>
                                    </form>
                                    <div className="form-row mt-3">
                                        <div className="col-md-8 offset-md-2 text-right">
                                            <div className="row justify-content-end">
                                                <div className="col-md-3">
                                                    <button className="btn btn-outline-default btn-block" onClick={(e) => this.props._goToStep(1)}>Back</button>
                                                </div>
                                                <div className="col-md-3">
                                                    <button className="btn btn-nitex-default btn-block" onClick={this.submit}>Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
          </LoadingOverlay>
        );
    }
}

const mapStateToProps = store => {
  return {
		project: store.project
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			_storeData
		},
		dispatch
	);
};


export default connect(mapStateToProps, mapDispatchToProps)(NewDevelopmentStep_2);
