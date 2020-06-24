import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from 'loadjs';

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../../services/Http';
import { toastSuccess, toastError } from '../../../commonComponents/Toast';

import { _storeData } from "../actions";
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../../constant';

class NewDevelopmentStep_2_Supervision extends Component {

    constructor(props) {
        super(props);
        this.state = {
          deadlineError : '',
          addressError : '',
          paymentTermsError : '',
          noteError : '',
          manuNameError : '',
          conNameError : '',
          conNumError : '',
          manuAddressError : ''
        };
    }

    componentDidMount = () => {
      loadjs(['/js/script.js']);
    }

    onChange = (e) => {
      console.log(e.target.name,e.target.value)
      this.props._storeData(e.target.name,e.target.value);
    }

    onFileUpload = (e,docType) => {
      // console.log("upload",e.target.name);
      // return;
      // let { styles } = this.props.project;
      let file = e.target.files[0];
      let key = e.target.name;
      let data = {
        "name": file.name,
        "docMimeType" : file.type,
        "documentType" : docType,
        "print": false,
        "base64Str":""
      }
      // console.log('data',data)
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        data.base64Str = reader.result;
        console.log(key,data);
        this.props._storeData(key,data)
        // console.log("base64",reader.result)
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      }
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
      if(project.manuName==''){
        flag = false;
        this.setState({
          manuNameError:'Payment Term is required'
        })
      }else{
        this.setState({
          manuNameError:''
        })
      }
      if(project.conName==''){
        flag = false;
        this.setState({
          conNameError:'Payment Term is required'
        })
      }else{
        this.setState({
          conNameError:''
        })
      }
      if(project.conNum==''){
        flag = false;
        this.setState({
          conNumError:'Payment Term is required'
        })
      }else{
        this.setState({
          conNumError:''
        })
      }
      if(project.manuAddress==''){
        flag = false;
        this.setState({
          manuAddressError:'Payment Term is required'
        })
      }else{
        this.setState({
          manuAddressError:''
        })
      }

      if(flag){
        let docArray = [];
        if(project.summaryFile && project.summaryFile.name){
          docArray.push(project.summaryFile);
        }
        if(project.authorizationLetter && project.authorizationLetter.name){
          docArray.push(project.authorizationLetter);
        }
        let body = {
          name : project.title,
          numOfStyles : project.numberOfStyles,
          projectType : project.project_type,
          deliveryDate : project.deadline,
          shippingAddress : project.shippingAddress,
          notes : project.note,
          productDTOList : project.styles.map((item,i) => {
            let temp = {};
            temp.name = "Style "+(i+1);
            // temp.developmentType = item.developmentType;
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
          }),
          documentDTOList : docArray,
          paymentTerms : project.paymentTerms,
          manufacturer : {
        		manufacturerName: project.manuName,
        		contactPersonName: project.conName,
        		contactPhone: project.conNum,
        		manufacturerAddress: project.manuAddress
        	}
        }
        console.log("body from project",body);
        this.setState({loading:true})
        Http.POST('addProject',body)
          .then(({data}) => {
            console.log('RFQ ADD SUCCESS: ', JSON.stringify(data));
            this.setState({loading:false})
            if(data.success){
              // window.location.reload();
              this.props._goToStep(3);
              toastSuccess(data.message);
            }else{
              toastError(data.message);
            }
          })
          .catch(response => {
              console.log('LOGIN Error: ', JSON.stringify(response));
              this.setState({loading:false})
              toastError("Something went wrong! Please try again.");
          });
      }
      // this.props._goToStep(3)

    }

    render() {
        let { deadline, shippingAddress, paymentTerms, note, summaryFile, manuName, conName, conNum, manuAddress, authorizationLetter } = this.props.project;
        let { deadlineError, addressError, paymentTermsError, noteError, manuNameError, conNameError, conNumError, manuAddressError } = this.state;
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
                position: LOADER_POSITION,
                top: LOADER_TOP,
                left: LOADER_LEFT,
                marginTop: LOADER_MARGIN_TOP,
                marginLeft: LOADER_MARGIN_LEFT,
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
                                            <h5 className="section-title">New Supervision Project</h5>
                                            <p className="section-subtitle">
                                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                                                eirmod tempor invidunt ut labore et dolore magna
                                                aliquyam erat, sed diam voluptua
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="section-content new-full-fledge-project">
                                    <div className="steps step2 mt-4">
                                        <div className="stepwizard">
                                            <div className="stepwizard-row setup-panel">
                                                <div className="stepwizard-step col-xs-3">
                                                    <a href="#step-1" type="button" className="btn btn-circle btn-default done"  disabled="disabled">1</a>
                                                </div>
                                                <div className="stepwizard-step col-xs-3">
                                                    <a href="#step-2" type="button" className="btn btn-default btn-circle btn-success active-line">2</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <form>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label for="">Project Estimated Time of Delivery</label>
                                                    <input className="input-field date-picker" type="date" name="deadline" onChange={this.onChange} value={deadline}  placeholder="Enter delivery date"/>
                                                    {
                                                      deadlineError ? <span className="error">{deadlineError}</span> : ''
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        <hr/>

                                        <h4>Manufacturer Details</h4>
                                        <p className="form-text text-muted">Note: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</p>

                                        <div className="form-row">
                                          <div className="form-group col-md-12">
                                              <label for="quantity">Manufacturer Name</label>
                                              <input type="text" className="form-control" name="manuName" onChange={this.onChange} value={manuName} placeholder="Enter Manufacturer Name"/>
                                              {
                                                manuNameError ? <span className="error">{manuNameError}</span> : ''
                                              }
                                          </div>
                                        </div>

                                        <div className="form-row">
                                          <div className="form-group col-md-6">
                                              <label for="quantity">Contact Person Name</label>
                                              <input type="text" className="form-control" name="conName" onChange={this.onChange} value={conName} placeholder="Enter Person Name"/>
                                              {
                                                conNameError ? <span className="error">{conNameError}</span> : ''
                                              }
                                          </div>
                                          <div className="form-group col-md-6">
                                              <label for="quantity">Contact Number</label>
                                              <input type="text" className="form-control" name="conNum" onChange={this.onChange} value={conNum} placeholder="Enter Phone Number"/>
                                              {
                                                conNumError ? <span className="error">{conNumError}</span> : ''
                                              }
                                          </div>
                                        </div>

                                        <div className="form-row">
                                          <div className="form-group col-md-12">
                                              <label for="quantity">Manufacturer Address</label>
                                              <input type="text" className="form-control" name="manuAddress" onChange={this.onChange} value={manuAddress} placeholder="Enter Manufacturer Address"/>
                                              {
                                                manuAddressError ? <span className="error">{manuAddressError}</span> : ''
                                              }
                                          </div>
                                        </div>

                                        <div className="row mb-3">
                                            <div className="col-lg-12">
                                                <div className="line-block">
                                                    <label>Upload Summary File</label>
                                                    <p className="form-text text-muted">Note: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</p>
                                                    <div className="form-group">
                                                        <div className="file file-style-2 btn">
                                                            Choose file
                                                            <input type="file" name="summaryFile" onChange={(e) => this.onFileUpload(e,'SUMMARY_FILE')}/>
                                                        </div>
                                                        {
                                                          summaryFile ? summaryFile.name : ''
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <div className="col-lg-12">
                                                <div className="">
                                                    <label>Upload Authorization Letter</label>
                                                    <div className="form-group">
                                                        <div className="file file-style-2 btn">
                                                            Choose file
                                                            <input type="file" name="authorizationLetter" onChange={(e) => this.onFileUpload(e,'AUTHORIZATION_LETTER')}/>
                                                        </div>
                                                        {
                                                          authorizationLetter ? authorizationLetter.name : ''
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                      <hr />

                                      <div className="row">
                                          <div className="col-lg-12">
                                            <div className="form-group">
                                                <label for="styleQuantity">Select Payment terms*</label>
                                                <p>Note: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</p>
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
                                      </div>
                                      <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label for="quantity">Shipping Address</label>
                                            <input type="text" className="form-control" name="shippingAddress" onChange={this.onChange} value={shippingAddress} placeholder="Write address...."/>
                                            {
                                              addressError ? <span className="error">{addressError}</span> : ''
                                            }
                                        </div>
                                      </div>
                                      <div className="form-group">
                                          <label for="productDescription">Add Some Special Notes</label>
                                          <textarea className="form-control" name="note" onChange={this.onChange} value={note}
                                              rows="4"
                                              placeholder="Enter Notes"/>
                                          {
                                            noteError ? <span className="error">{noteError}</span> : ''
                                          }
                                      </div>
                                    </form>
                                    <div className="form-row">
                                        <div className="col-lg-12">
                                            <button className="btn-brand float-right mt-4" onClick={this.submit}>Next</button>
                                            <button className="btn-brand btn-outline-secondary float-right mt-4 mr-4" onClick={(e) => this.props._goToStep(1)}>Back</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(NewDevelopmentStep_2_Supervision);
