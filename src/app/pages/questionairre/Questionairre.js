import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from "loadjs";
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';

import { _storeData } from "./actions";

import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';
import { QuestionnaireOption } from './components/OptionCardComponent';

class Questionairre_1 extends Component {


    constructor(props) {
        super(props);
        this.state = {
          role: '',
          label: '',
          phoneNumber: '',
          countryCode: '',
          roleError: '',
          labelError: '',
          phoneNumberError: '',
          countryCodeError: '',
        };
    }

    componentDidMount = async() => {

    }

    onChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    onChangeNumber = (e, f, g) => {
      console.log("onChangeNumber", e, f, g)
    }

    _validate = async() => {
        let flag = true;
        let { role, label, phoneNumber, countryCode } = this.state;
        if (!role) {
            flag = false;
            await this.setState({
                roleError: 'Role is required!'
            })
        } else {
            await this.setState({
                roleError: ''
            })
        }
        if (!label) {
            flag = false;
            await this.setState({
                labelError: 'Label status is required!'
            })
        } else {
            await this.setState({
                labelError: ''
            })
        }
        if (!phoneNumber) {
            flag = false;
            await this.setState({
                roleError: 'Phone number is required!'
            })
        } else {
            await this.setState({
                roleError: ''
            })
        }
        loadjs(['/js/script.js']);
        return flag;
    }

    _submit = async() => {
        let { role, label, phoneNumber, countryCode, roleError, labelError, phoneNumberError, countryCodeError } = this.state;
        if (this._validate()) {

        }

    }

    render() {
        let { role, label, phoneNumber, countryCode, roleError, labelError, phoneNumberError, countryCodeError } = this.state;
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
                                <label htmlFor="">What is your role in business (Select one)?</label>
                                <select className={labelError ? 'error' : ''} name="role" value={role} onClick={this.onChange}>
                                    <option value="">Please choose one…</option>
                                    <option value="OWNER">Owner</option>
                                    <option value="DIRECTOR">Director</option>
                                    <option value="DESIGNER">Designer</option>
                                    <option value="MANAGER">Manager</option>
                                    <option value="BUYER">Buyer</option>
                                    <option value="OTHER">Others</option>
                                </select>
                                {
                                  roleError ?
                                  <div className="error">{roleError}</div>:<></>
                                }
                            </div>
                            <div className="form-group">
                                <span className="info">We help private labels, wholesalers, & retailers to manufacture in bulk</span>
                                <label htmlFor="">Do you have a private clothing label?</label>
                                <select className={labelError ? 'error' : ''} name="label" value={label} onClick={this.onChange}>
                                    <option value="">Please choose one…</option>
                                    <option value="DONT_HAVE_LABEL_YET">No! Don't have a label yet</option>
                                    <option value="DO_DROPSHIP_ONLY">We do drop-shipping only</option>
                                    <option value="DROPSHIP_NOW_WILL_BUILD_LABEL">We dropship now, will build label</option>
                                    <option value="SELL_WHOLESALE_TO_RETAILERS">We sell wholesale to retailers</option>
                                    <option value="MAKE_PROMOTIONAL_GOODS">We make promotional goods</option>
                                </select>
                                {
                                  labelError ?
                                  <div className="error">{labelError}</div>:<></>
                                }
                            </div>
                            <div className="form-group">
                                <span className="info">Our business evangelist will call you to cater for your needs</span>
                                <label htmlFor="">How can we contact you?</label>
                                <div className="country-phone-code">
                                    <IntlTelInput
                                      containerClassName="intl-tel-input"
                                      inputClassName="form-control"
                                      // value={phoneNumber}
                                      onSelectFlag={this.onChangeNumber}
                                      onPhoneNumberChange={this.onChangeNumber}
                                      // onChange={(e) => this.onChangeNumber(e)}
                                      separateDialCode={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn-brand" onClick={this._submit}>Enter</button>
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
