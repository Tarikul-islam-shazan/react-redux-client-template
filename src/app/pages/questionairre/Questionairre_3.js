import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { _storeData } from "./actions";

import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';
import { QuestionnaireOption } from './components/OptionCardComponent';

class Questionairre_1 extends Component {

    componentDidMount = async() => {

    }

    _setData = (purpose) => {
      console.log("clicked",purpose)
      this.props._storeData("purpose",purpose)
    }

    onChange = (e) => {
      this.props._storeData(e.target.name,e.target.value)
    }

    _next = () => {
      this.props.history.push('/questionairre-final');
    }
    _back = () => {
      this.props.history.push('/questionairre-step-2');
    }
    render() {
        let { purposeText } = this.props;
        return (
            <>
              <div className="page-header text-center">
                  <h3 className="page-title">welcome to nitex</h3>
                  {/*<p className="page-subtitle">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</p>*/}
              </div>

              <div className="page-content">
                  <section className="questionnaire">
                      <div className="container">
                          <div className="row justify-content-center">
                              <div className="col-lg-12">
                                  <div className="section-header">
                                      <div className="row">
                                          <div className="col-auto">
                                              <b className="text-active pb-1" style={{borderBottom: '2px solid'}}>
                                                  About my Business
                                              </b>
                                          </div>
                                          <div className="col text-center">
                                              I need product for{this.props.purpose ? <b className="text-active"> {this.props.purpose.replace(/_/gi, " ")}</b> : '_____'}
                                          </div>
                                          <div className="col-auto">
                                              <b className="text-active">3</b>/3
                                          </div>
                                      </div>
                                  </div>
                                  <div className="section-content">
                                      <div className="row">
                                        <QuestionnaireOption
                                          image={require("../../assets/images/questionnaire_3_1_events.png")}
                                          title="Events"
                                          onClick={this._setData}
                                          valueToBeChecked={this.props.purpose}
                                          value="Events"
                                         />
                                        <QuestionnaireOption
                                          image={require("../../assets/images/questionnaire_3_1_wholesales.png")}
                                          title="Wholesales"
                                          onClick={this._setData}
                                          valueToBeChecked={this.props.purpose}
                                          value="Wholesales"
                                          />
                                        <QuestionnaireOption
                                          image={require("../../assets/images/questionnaire_3_1_tenders.png")}
                                          title="Tenders"
                                          onClick={this._setData}
                                          valueToBeChecked={this.props.purpose}
                                          value="Tenders"
                                         />
                                        <QuestionnaireOption
                                          image={require("../../assets/images/questionnaire_3_1_retailers.png")}
                                          title="Retailers"
                                          onClick={this._setData}
                                          valueToBeChecked={this.props.purpose}
                                          value="Retailers"
                                          />
                                        <QuestionnaireOption
                                          image={require("../../assets/images/questionnaire_3_1_ecommerce.png")}
                                          title="E-commerce"
                                          onClick={this._setData}
                                          valueToBeChecked={this.props.purpose}
                                          value="E_commerce"
                                          />
                                        <QuestionnaireOption
                                          image={require("../../assets/images/questionnaire_3_1_others.png")}
                                          title="Other"
                                          onClick={this._setData}
                                          valueToBeChecked={this.props.purpose}
                                          value="Other"
                                          />
                                      </div>
                                  </div>
                              </div>
                          </div>
                          {
                            this.props.purpose == 'Other' ?
                            <div className="row justify-content-end">
                                <div className="col-md-4">
                                    <div className="form-group my-2">
                                        <input type="text" className="form-control" name="purposeText" value={purposeText} onChange={this.onChange} placeholder="Enter Your Purpose" />
                                    </div>
                                </div>
                            </div> :
                            <div className="row justify-content-end">
                                <div className="col-md-4">
                                    <div className="form-group my-2" style={{visibility:'hidden'}}>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>
                          }
                          {this.props.purpose ?
                            <div className="row justify-content-end" style={{marginTop: '40px'}}>
                                <div className="col-md-2">
                                    <button className="btn btn-outline-default btn-block" onClick={this._back}>Back</button>
                                </div>
                                <div className="col-md-2">
                                    <button className="btn btn-nitex-default btn-block" onClick={this._next}>Next</button>
                                </div>
                            </div>
                          : ''}
                      </div>
                  </section>
              </div>
            </>
        );
    }
}

const mapStateToProps = store => {
	return {
    purpose: store.questionairre.purpose,
    purposeText: store.questionairre.purposeText
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


export default connect(mapStateToProps, mapDispatchToProps)(Questionairre_1);
