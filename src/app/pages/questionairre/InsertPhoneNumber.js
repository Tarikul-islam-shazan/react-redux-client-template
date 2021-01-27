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
import { getUrlParameter } from '../../services/Util';

import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';
import Http from '../../services/Http';
import { toastSuccess, toastError } from '../../commonComponents/Toast';
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';

class InsertPhoneNumber extends Component {


    constructor(props) {
        super(props);
        let phoneInfo = localStorage.getItem('nitex@phoneInfo');
        if (phoneInfo) {
          phoneInfo = JSON.parse(phoneInfo);
          console.log("phoneInfo", phoneInfo)
          // this.setState({
          //   defaultCountry: phoneInfo.iso2 ? phoneInfo.iso2 : '',
          //   telInputValue: phoneInfo.number ? phoneInfo.number : ''
          // })
        }
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
          userInfo: {},
          telInputValue: phoneInfo && phoneInfo.number ? phoneInfo.number : '',
          defaultCountry: phoneInfo && phoneInfo.iso2 ? phoneInfo.iso2 : ''
          // phoneNumberValue: '+8801758339722'
        };
    }

    componentDidMount = async() => {
        document.title = "Setting you up on Nitex - The easiest clothing manufacturing software";
        let userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
          userInfo = JSON.parse(userInfo)
          this.setState({
            userInfo
          })
        } else {
          userInfo = {};
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
        let { phoneNumber, numberValidation, countryCode } = this.state;
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
            let { phoneNumber, countryCode, iso2, phoneNumberError, countryCodeError } = this.state;
            const email = localStorage.getItem('email');
            console.log("email",email)
            let body = {
                email: email,
                phoneNumber: countryCode + phoneNumber,
                countryCode,
                iso2
              };

            Http.POST('updateBusinessInfo', body)
              .then(({data}) => {
                console.log('updateBusinessInfo SUCCESS: ', JSON.stringify(data));
                this.setState({loading:false})
                if(data.success){
                  toastSuccess(data.message);
                  localStorage.setItem('nitex@phoneInfo', JSON.stringify({phoneNumber: countryCode + phoneNumber, countryCode, number: phoneNumber, iso2}));
                  let redirection = getUrlParameter('redirect', this.props.location.search);
                  if (redirection) {
                    this.props.history.push('/verify-otp?redirect=' + redirection);
                  } else {
                    this.props.history.push('/verify-otp');
                  }
                }else{
                  toastError(data.message);
                }
              })
              .catch(({response}) => {
                  this.setState({loading:false})
                  if(response && response.data && response.data.message){
                    toastError(response.data.message);
                  }else{
                    toastError("Request wasn't successful.");
                  }
              });
        }

    }

    render() {
        let { userInfo, role, roleStr, label, phoneNumber, countryCode, defaultCountry, roleError, roleStrError, labelError, phoneNumberError, countryCodeError, telInputValue } = this.state;
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
            <div className="questionnaire otp">
                <div className="questionnaire-form">
                    <div className="ques-heading">
                        {
                          userInfo.name ?
                          <h2>Congratulations {userInfo.name}!</h2>
                          :
                          <h2>Congratulations!</h2>
                        }
                        <p className="font-20">We’re almost done. Kindly share your cell number so that a dedicated business
                            strategist can call you to cater for your needs.
                        </p>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group">
                                <div className="country-phone-code mt-4">
                                    <IntlTelInput
                                      containerClassName="intl-tel-input"
                                      inputClassName={`form-control ${phoneNumberError ? 'error' : ''}`}
                                      onSelectFlag={this.onChangeFlag}
                                      onPhoneNumberChange={this.onChangeNumber}
                                      separateDialCode={true}
                                      defaultValue={telInputValue}
                                      defaultCountry={defaultCountry}
                                    />
                                </div>
                                {
                                  phoneNumberError ?
                                  <div className="error">{phoneNumberError}</div>:<></>
                                }
                            </div>
                        </div>
                    </div>
                    <button className="btn-brand m-0" onClick={this._submit}>Submit for code</button>
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


export default connect(mapStateToProps, mapDispatchToProps)(InsertPhoneNumber);
