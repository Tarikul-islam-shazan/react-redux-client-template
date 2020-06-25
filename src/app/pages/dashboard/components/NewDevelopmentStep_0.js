import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { _storeData } from "../actions";


import LoadingOverlay from 'react-loading-overlay';
import Http from '../../../services/Http';
import { toastSuccess, toastError } from '../../../commonComponents/Toast';

import { Image } from "../../../commonComponents/Image";

import { NewDevelopmentStep_0_Card as Card } from "./NewDevelopmentStep_0_Card";
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT } from '../../../constant';

class NewDevelopmentStep_0 extends Component {

    constructor(props) {
        super(props);
        this.state = {
          numOfStyles : 1,
          loading : false,
          page : 0,
          size : 50,
          colors : [
            {
              id : 0,
              quantity : 0
            }
          ]
        };
    }

    componentDidMount = () => {

    }

    _setData = (type) => {
      // console.log("clicked",type)
      this.props._storeData("project_type",type)
    }

    render() {
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
                        <section className="card-style-1">
                            <div className="container my-5">
                                <div className="row justify-content-center">
                                    <div className="col-6">
                                        <div className="section-header text-center">
                                            <h5 className="section-title">New project</h5>
                                            <p className="section-subtitle" style={{padding: 0}}>Request for samples or start your production with us</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-lg-9 col-md-12">
                                        <div className="section-content">
                                            <div className="row">
                                                <Card
                                                  image={require("../../../assets/images/development_project.png")}
                                                  title="Sample development"
                                                  description=""
                                                  onClick={this._setData}
                                                  valueToBeChecked={this.props.project_type}
                                                  value="DEVELOPMENT"
                                                 />
                                                 <Card
                                                   image={require("../../../assets/images/supervision_project.png")}
                                                   title="Supervision project"
                                                   description=""
                                                   onClick={this._setData}
                                                   valueToBeChecked={this.props.project_type}
                                                   value="SUPERVISION"
                                                  />
                                                  <Card
                                                    image={require("../../../assets/images/full_fledged_project.png")}
                                                    title="Full-fledged production"
                                                    description=""
                                                    onClick={this._setData}
                                                    valueToBeChecked={this.props.project_type}
                                                    value="FULL_FLEDGED_PRODUCTION"
                                                   />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                  this.props.project_type ?
                                  <div className="row justify-content-center" style={{marginTop: '60px'}}>
                                    <div className="col-md-3 text-center">
                                      <button className="btn btn-nitex-default" onClick={(e) => this.props._goToStep(1)} style={{padding: '12px 70px', fontSize: '16px', letterSpacing: '1px'}}>Start</button>
                                    </div>
                                  </div>
                                  : <></>
                              }
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
		project_type: store.project.project_type
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


export default connect(mapStateToProps, mapDispatchToProps)(NewDevelopmentStep_0);
