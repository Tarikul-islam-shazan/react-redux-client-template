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
          userInfo: {},
        };
    }

    componentDidMount = async() => {
        document.title = "Setting you up on Nitex - The easiest clothing manufacturing software";
        let userInfo = localStorage.getItem('userInfo');
        await loadjs(['/js/script.js']);
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
                  let userInfo = localStorage.getItem('userInfo');
                  if(userInfo) {
                    userInfo = JSON.parse(userInfo);
                  } else {
                    userInfo = {};
                  }
                  userInfo.businessInfoGiven = true;
                  localStorage.setItem('userInfo', JSON.stringify(userInfo));
                  let redirection = getUrlParameter('redirect', this.props.location.search)
                  this.props.history.push('/verify-otp?redirect=' + redirection);
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
                <div class="questionnaire-form">
                    <div class="ques-heading">
                        <h2>Verify</h2>
                        <p class="font-20">A code has been sent to +88017120000. Please verify. </p>
                        <a href="#" class="text-underline color-333 font-13">Wrong number?</a>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <div class="country-code">
                                    <input type="text" class="text-center font-weight-bold"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="btn-brand m-0" disabled>Verify</button>
                    <button class="btn-brand m-0">Resend code</button>
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
