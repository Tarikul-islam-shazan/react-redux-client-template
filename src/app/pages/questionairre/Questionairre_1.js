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

    _setData = (profession) => {
      console.log("clicked",profession)
      this.props._storeData("profession",profession)
    }

    _next = (profession) => {
      this.props.history.push('/questionairre-step-2');
    }

    onChange = (e) => {
      this.props._storeData(e.target.name,e.target.value)
    }

    render() {
        let { professionText } = this.props;
        return (
            <>
              <div className="page-header text-center mt-1">
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
                                                  About You
                                              </b>
                                          </div>
                                          <div className="col text-center">
                                              As a professional, I am a {this.props.profession ? <b className="text-active">{this.props.profession.replace(/_/gi, " ")}</b> : '_____'}
                                          </div>
                                          <div className="col-auto">
                                              <b className="text-active">1</b>/3
                                          </div>
                                      </div>
                                  </div>
                                  <div className="section-content">
                                      <div className="row">
                                          <QuestionnaireOption
                                            image={require("../../assets/images/questionnaire1_designer.png")}
                                            title="Designer"
                                            onClick={this._setData}
                                            valueToBeChecked={this.props.profession}
                                            value="Designer"
                                           />
                                          <QuestionnaireOption
                                            image={require("../../assets/images/questionnaire1_buyer.png")}
                                            title="Buyer"
                                            onClick={this._setData}
                                            valueToBeChecked={this.props.profession}
                                            value="Buyer"
                                           />
                                          <QuestionnaireOption
                                            image={require("../../assets/images/questionnaire1_product_manager.png")}
                                            title="Product Manager"
                                            onClick={this._setData}
                                            valueToBeChecked={this.props.profession}
                                            value="Product_Manager"
                                           />
                                          <QuestionnaireOption
                                            image={require("../../assets/images/questionnaire1_sourcing_manager.png")}
                                            title="Sourcing Manager"
                                            onClick={this._setData}
                                            valueToBeChecked={this.props.profession}
                                            value="Sourcing_Manager"
                                           />
                                          <QuestionnaireOption
                                            image={require("../../assets/images/questionnaire1_owner.png")}
                                            title="Owner"
                                            onClick={this._setData}
                                            valueToBeChecked={this.props.profession}
                                            value="Owner"
                                           />
                                          <QuestionnaireOption
                                            image={require("../../assets/images/questionnaire1_other.png")}
                                            title="Other"
                                            onClick={this._setData}
                                            valueToBeChecked={this.props.profession}
                                            value="Other"
                                           />
                                      </div>
                                      {
                                        this.props.profession == 'Other' ?
                                        <div className="row justify-content-end">
                                            <div className="col-md-4">
                                                <div className="form-group my-2">
                                                    <input type="text" className="form-control" name="professionText" value={professionText} onChange={this.onChange} placeholder="Enter Your Profession" />
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
                                        this.props.profession ?
                                        <div className="row justify-content-end mb-2" style={{marginTop: '40px'}}>
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
  // const { profession } = store.questionnaire
  // console.log("store",store.questionairre.profession)
	return {
		profession: store.questionairre.profession,
    professionText: store.questionairre.professionText
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
