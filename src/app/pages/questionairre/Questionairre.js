import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from "loadjs";
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import LoadingOverlay from 'react-loading-overlay';

import { _storeData } from "./actions";

import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';
import Http from '../../services/Http';
import { toastSuccess, toastError } from '../../commonComponents/Toast';
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';

class Questionairre_1 extends Component {


    constructor(props) {
        super(props);
        this.state = {
          role: '',
          roleStr: '',
          label: '',
          phoneNumber: '',
          countryCode: '+1',
          iso2: 'us',
          roleError: '',
          roleStrError: '',
          labelError: '',
          phoneNumberError: '',
          numberValidation: false,
          countryCodeError: '',
          userInfo: {}
        };
    }

    componentDidMount = async() => {
      let userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        userInfo = JSON.parse(userInfo)
        this.setState({
          userInfo
        })
      }
    }

    onChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
        if (e.target.value) {
          this.setState({
            [e.target.name + 'Error']: ''
          })
          loadjs(['/js/script.js']);
        }
    }

    onChangeNumber = (numberValidation, phoneNumber) => {
      this.setState({
        numberValidation,
        phoneNumber
      })
    }

    onChangeFlag = (e, f) => {
      this.setState({
        iso2: f.iso2,
        countryCode: f.dialCode
      })
    }

    validateData = async() => {
        let flag = true;
        let { role, roleStr, label, phoneNumber, numberValidation, countryCode } = this.state;
        if (!role) {
            flag = false;
            await this.setState({
                roleError: 'Please fill out this information'
            })
        } else {
            await this.setState({
                roleError: ''
            })
        }
        if (role === 'OTHER' && roleStr === '') {
            flag = false;
            await this.setState({
                roleStrError: 'Please fill out this information'
            })
        } else {
            await this.setState({
                roleStrError: ''
            })
        }
        if (!label) {
            flag = false;
            await this.setState({
                labelError: 'Please fill out this information'
            })
        } else {
            await this.setState({
                labelError: ''
            })
        }
        if (!phoneNumber) {
            flag = false;
            await this.setState({
                phoneNumberError: 'Please fill out this information'
            })
        } else if (!numberValidation) {
            flag = false;
            await this.setState({
                phoneNumberError: 'Invalid phone number format!'
            })
        } else {
            await this.setState({
                phoneNumberError: ''
            })
        }
        await loadjs(['/js/script.js']);
        return flag;
    }

    _submit = async() => {
        let validation = await this.validateData();
        if (validation) {
            await this.setState({loading: true})
            let { role, roleStr, label, phoneNumber, countryCode, iso2, roleError, labelError, phoneNumberError, countryCodeError } = this.state;
            const email = localStorage.getItem('email');
            console.log("email",email)
            let body = {
                email: email,
                roleInBusiness: role,
                clothingLabelStatus: label,
                phoneNumber: countryCode + phoneNumber,
                countryCode,
                iso2
              };
              if(role === 'OTHER'){
                body.roleInBusinessStr = roleStr;
              }

            Http.POST('updateBusinessInfo', body)
              .then(({data}) => {
                console.log('LOGIN SUCCESS: ', JSON.stringify(data));
                this.setState({loading:false})
                if(data.success){
                  toastSuccess(data.message);
                  this.props.history.push('/pick-design');
                }else{
                  toastError(data.message);
                }
              })
              .catch(({response}) => {
                  this.setState({loading:false})
                  if(response.data && response.data.message){
                    toastError(response.data.message);
                  }else{
                    toastError("Request wasn't successful.");
                  }
              });
        }

    }

    render() {
        let { userInfo, role, roleStr, label, phoneNumber, countryCode, roleError, roleStrError, labelError, phoneNumberError, countryCodeError } = this.state;
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
            <div className="questionnaire">
                <div className="questionnaire-form">
                    <div className="ques-heading">
                        {
                          userInfo.name ?
                          <h2>Hey, {userInfo.name}!</h2>
                          :
                          <h2>Hey!</h2>
                        }
                        <p>Kindly tell us a little about yourself so we can optimize your experience with us</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group">
                                <label htmlFor="">What is your role in business (Select one)?</label>
                                <select className={roleError ? 'error' : ''} name="role" value={role} onClick={this.onChange}>
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
                            {
                              role === 'OTHER' ?
                              <div className="form-group">
                                  <input type="text" className="form-control" name="roleStr" value={roleStr} onChange={this.onChange} placeholder="Role name" />
                                  {
                                    roleStrError ?
                                    <div className="error">{roleStrError}</div>:<></>
                                  }
                              </div> : <></>
                            }

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
                                      onSelectFlag={this.onChangeFlag}
                                      onPhoneNumberChange={this.onChangeNumber}
                                      separateDialCode={true}
                                    />
                                </div>
                                {
                                  phoneNumberError ?
                                  <div className="error">{phoneNumberError}</div>:<></>
                                }
                            </div>
                        </div>
                    </div>
                    <button className="btn-brand" onClick={this._submit}>Enter</button>
                </div>
            </div>
          </LoadingOverlay>
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
