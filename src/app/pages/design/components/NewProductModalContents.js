import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Step_0 from './FillTheForm_1';
import Step_1 from './FillTheForm_2';
import Step_2 from './FillTheForm_3';
import UploadTechPack from './UploadTechPack';

class NewProductModalContents extends Component {

    constructor(props) {
        super(props);
        this.state = {
          step : 0
        };
    }

    componentDidMount = async() => {

    }

    _goToStep = (step) => {
      this.setState({
        step
      })
    }

    _renderFillTheForm = () => {
      let {formStep} = this.props
      if(formStep==0){
        return <Step_0 _goToFormStep={this.props._goToFormStep}/>
      }else if(formStep==1){
        return <Step_1 _goToFormStep={this.props._goToFormStep}/>
      }else if(formStep==2){
        return <Step_2 _goToFormStep={this.props._goToFormStep} _goToStep={this.props._goToStep}/>
      }
    }

    _renderTechPackForm = () => {
      return <UploadTechPack _goToStep={this.props._goToStep} />
    }

    _renderStep = () => {
      // let {step} = this.state
      // if(step==0){
      //   return <Step_0 _goToStep={this._goToStep}/>
      // }else if(step==1){
      //   return <Step_1 _goToStep={this._goToStep}/>
      // }else if(step==2){
      //   return <Step_2 _goToStep={this._goToStep}/>
      // }else if(step==3){
      //   return <Step_3 _goToStep={this._goToStep}/>
      // }
    }

    render() {
        return (
          <>
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-body p-0">
                        <img src={require("../../../assets/images/cancel.png")} alt="cancel button" className="img-fluid close-btn" data-dismiss="modal" aria-label="Close"/>
                        <section className="card-style-1">
                                <div className="row justify-content-center">
                                    <div className="col-md-12 col-lg-6">
                                        <div className="section-header text-center">
                                            <h5 className="section-title">Add new design</h5>
                                            <p className="section-subtitle">Get costing on any designs that you like to manufacture for your label</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="add-new-product">
                                    <ul className="nav nav-tabs nav-justified">
                                        <li><a className="active" data-toggle="tab" href="#FilltheForm">Design details</a></li>
                                        <li><a data-toggle="tab" href="#UploadTechPack">Upload Tech pack</a></li>
                                      </ul>

                                      <div className="tab-content">
                                        <div id="FilltheForm" className="tab-pane active">
                                        {this._renderFillTheForm()}
                                        </div>
                                        <div id="UploadTechPack" className="tab-pane fade">
                                        {this._renderTechPackForm()}
                                        </div>
                                      </div>
                                </div>
                        </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewProductModalContents);
