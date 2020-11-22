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
            <div className="questionnaire">
                <div className="questionnaire-form">
                    <div className="ques-heading">
                        <h2>Congratulations Muhammad!</h2>
                        <p>We are almost done! Just tell us a little about yourself so we can help you get started.</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group">
                                <label for="">What is your role in business (Select one)?</label>
                                <select>
                                    <option value="">Please choose one…</option>
                                    <option value="OWNER">Owner</option>
                                    <option value="DIRECTOR">Director</option>
                                    <option value="DESIGNER">Designer</option>
                                    <option value="MANAGER">Manager</option>
                                    <option value="BUYER">Buyer</option>
                                    <option value="OTHER">Others</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <span className="info">We help private labels, wholesalers, & retailers to manufacture in bulk</span>
                                <label for="">Do you have a private clothing label?</label>
                                <select className="error">
                                    <option value="">Please choose one…</option>
                                    <option value="DONT_HAVE_LABEL_YET">No! Don't have a label yet</option>
                                    <option value="DO_DROPSHIP_ONLY">We do drop-shipping only</option>
                                    <option value="DROPSHIP_NOW_WILL_BUILD_LABEL">We dropship now, will build label</option>
                                    <option value="SELL_WHOLESALE_TO_RETAILERS">We sell wholesale to retailers</option>
                                    <option value="MAKE_PROMOTIONAL_GOODS">We make promotional goods</option>
                                </select>
                                <div className="error">Please fill out this information related demo content</div>
                            </div>
                            <div className="form-group">
                                <span className="info">Our business evangelist will call you to cater for your needs</span>
                                <label for="">How can we contact you?</label>
                                <div className="country-code">
                                    <input id="phone" type="tel"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn-brand">Enter</button>
                </div>
            </div>
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
