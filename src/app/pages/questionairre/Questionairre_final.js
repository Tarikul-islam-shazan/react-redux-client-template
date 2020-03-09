import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';

class Questionairre_1 extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount = async() => {

    }

    _goToFirst = () => {
      this.props.history.push('/questionairre-step-1');
    }

    _submit = () => {
      this.props.history.push('/dashboard');
    }

    render() {
        return (
            <>
              <div className="page-header text-center">
                  <h3 className="page-title">welcome to nitex</h3>
                  <p className="page-subtitle">Thanks for sharing with us</p>
              </div>

              <div className="page-content">
                <section className="questionnaire">
                    <div className="container px-lg-5">
                        <div className="row">
                            <div className="col-md-8 offset-md-2">
                                <div className="section-content">
                                    <div className="row">
                                        <div className="col-md-3 mx-md-auto">
                                            <div className="card">
                                                <img src={require("../../assets/images/questionnaire1_owner.png")} alt="designer" className="card-img-top img-fluid d-block mx-auto"/>
                                            </div>
                                            <p className="text-center">You are
                                                <br />
                                                <span className="text-active">Owner</span>
                                            </p>
                                        </div>
                                        <div className="col-md-3 mx-md-auto">
                                            <div className="card">
                                                <img src={require("../../assets/images/questionnaire_2_4_australia.png")} alt="buyer" className="card-img-top img-fluid d-block mx-auto"/>
                                            </div>
                                            <p className="text-center">You are from
                                                <br />
                                                <span className="text-active">Australia</span>
                                            </p>
                                        </div>
                                        <div className="col-md-3 mx-md-auto">
                                            <div className="card">
                                                <img src={require("../../assets/images/questionnaire_3_1_ecommerce.png")} alt="product manager" className="card-img-top img-fluid d-block mx-auto"/>
                                            </div>
                                            <p className="text-center">Your business is about
                                                <br />
                                                <span className="text-active">E-commerce</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-right mt-5 mr-5">
                            <a href="" className="btn btn-outline-secondary" onClick={this._goToFirst}>Change Information</a>
                            <a href="" className="btn btn-nitex-default" onClick={this._submit}>Get started</a>
                        </div>
                    </div>
                </section>
              </div>
            </>
        );
    }
}

const mapStateToProps = store => {
	return {
		// resources: store.resources.resources
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			// fetchResources
		},
		dispatch
	);
};

// export default ResourceList;
export default connect(mapStateToProps, mapDispatchToProps)(Questionairre_1);
