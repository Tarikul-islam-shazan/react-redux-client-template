import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { _storeData } from "./actions";

import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';
import { QuestionnaireOption } from './components/OptionCardComponent';

class Questionairre_2 extends Component {

    componentDidMount = async() => {

    }

    _setData = (area) => {
      console.log("clicked",area)
      this.props._storeData("area",area)
    }

    onChange = (e) => {
      this.props._storeData(e.target.name,e.target.value)
    }

    _next = () => {
      this.props.history.push('/questionairre-step-3');
    }
    _back = () => {
      this.props.history.push('/questionairre-step-1');
    }

    render() {
        let { areaText } = this.props;
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
                                                  About Your Business
                                              </b>
                                          </div>
                                          <div className="col text-center">
                                              My Business Market is in{this.props.area ? <b className="text-active"> {this.props.area.replace(/_/gi, " ")}</b> : '_____'}
                                          </div>
                                          <div className="col-auto">
                                              <b className="text-active">2</b>/3
                                          </div>
                                      </div>
                                  </div>
                                  <div className="section-content">
                                      <div className="row">
                                          <QuestionnaireOption
                                            image={require("../../assets/images/questionnaire_2_4_european_union.png")}
                                            title="European Union"
                                            onClick={this._setData}
                                            valueToBeChecked={this.props.area}
                                            value="European_Union"
                                           />
                                           <QuestionnaireOption
                                             image={require("../../assets/images/questionnaire_2_4_america.png")}
                                             title="America"
                                             onClick={this._setData}
                                             valueToBeChecked={this.props.area}
                                             value="America"
                                            />
                                          <QuestionnaireOption
                                            image={require("../../assets/images/questionnaire_2_4_africa.png")}
                                            title="Africa"
                                            onClick={this._setData}
                                            valueToBeChecked={this.props.area}
                                            value="Africa"
                                           />
                                          <QuestionnaireOption
                                            image={require("../../assets/images/questionnaire_2_4_asia.png")}
                                            title="Asia"
                                            onClick={this._setData}
                                            valueToBeChecked={this.props.area}
                                            value="Asia"
                                           />
                                          <QuestionnaireOption
                                            image={require("../../assets/images/questionnaire_2_4_australia.png")}
                                            title="Australia"
                                            onClick={this._setData}
                                            valueToBeChecked={this.props.area}
                                            value="Australia"
                                           />
                                          <QuestionnaireOption
                                            image={require("../../assets/images/questionnaire_2_4_other.png")}
                                            title="Other"
                                            onClick={this._setData}
                                            valueToBeChecked={this.props.area}
                                            value="Other"
                                           />
                                      </div>
                                      {
                                        this.props.area == 'Other' ?
                                        <div className="row justify-content-end">
                                            <div className="col-md-4">
                                                <div className="form-group my-2">
                                                    <input type="text" className="form-control" name="areaText" value={areaText} onChange={this.onChange} placeholder="Enter Your Business Location" />
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
                                      {
                                        this.props.area ?
                                        <div className="row justify-content-end mb-2" style={{marginTop: '40px'}}>
                                            <div className="col-md-2">
                                                <button className="btn btn-outline-default btn-block" onClick={this._back}>Back</button>
                                            </div>
                                            <div className="col-md-2">
                                                <button className="btn btn-nitex-default btn-block" onClick={this._next}>Next</button>
                                            </div>
                                        </div> :
                                        <></>
                                      }


                                  </div>
                              </div>
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
		area: store.questionairre.area,
    areaText: store.questionairre.areaText
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


export default connect(mapStateToProps, mapDispatchToProps)(Questionairre_2);
