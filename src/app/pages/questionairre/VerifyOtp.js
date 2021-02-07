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

const TIME_LIMIT = 180;
const TIME_INTERVAL = 1000;

class Questionairre_1 extends Component {


    constructor(props) {
        super(props);
        this.state = {
          code: '',
          loading: false,
          phoneInfo: {},
          codeError: '',
          timeLimit: TIME_LIMIT
        };
    }

    timerJob = () => {
      let {timeLimit} = this.state;
      if (timeLimit === 0) {
        clearInterval(this.timer);
      } else {
        this.setState({
          timeLimit: timeLimit - 1
        })
      }
    }

    renderNumber = () => {
      let {phoneInfo} = this.state;
      let result = '';
      if (phoneInfo.phoneNumber) {
        let n = phoneInfo.phoneNumber;
        for(let i = 0; i < n.length; i++) {
          if (i > 1 && i < n.length - 2) {
            result += '*';
          } else {
            result += n[i];
          }
        }
      }
      return result;
    }

    componentWillUnmount = () => {
      clearInterval(this.timer);
    }

    componentDidMount = async() => {
        document.title = "Setting you up on Nitex - The easiest clothing manufacturing software";
        // await loadjs(['/js/script.js']);
        let phoneInfo = localStorage.getItem('nitex@phoneInfo');
        if (phoneInfo) {
          phoneInfo = JSON.parse(phoneInfo)
          this.setState({
            phoneInfo
          })
        } else {
          phoneInfo = {};
        }
        console.log("phoneInfo", phoneInfo);
        this.setTimer()
    }

    setTimer = async() => {
      await this.setState({timeLimit: TIME_LIMIT});
      this.timer = setInterval(this.timerJob, TIME_INTERVAL);
    }

    onChange = (e) => {
        if (e.target.value.length > 5) {
          return;
        }
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    handleKeyPress = (event) => {
      if(event.key === 'Enter'){
        this._submit();
      }
    }

    back = () => {
      // localStorage.setItem('nitex@phoneInfo', "");
      let redirection = getUrlParameter('redirect', this.props.location.search)
      if (redirection) {
        this.props.history.push('/info?redirect=' + redirection);
      } else {
        this.props.history.push('/info');
      }
    }

    validateData = async() => {
        let flag = true;
        let { code } = this.state;
        if (!code) {
            flag = false;
            await this.setState({
                codeError: 'Please enter 5 digit code'
            })
        }
        return flag;
    }

    resend = async() => {
      await this.setState({loading: true})
      Http.GET('sendOtpRe')
        .then(({data}) => {
          console.log('sendOtpRe SUCCESS: ', data);
          if (data.success) {
            this.setTimer()
            toastSuccess(data.message);
          }
          this.setState({loading: false})
        })
        .catch(response => {
            console.log('sendOtpRe ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            toastError("Something went wrong! Please try again.");
        });
    }

    _submit = async() => {
        let validation = await this.validateData();
        if (validation) {
            await this.setState({loading: true})
            let { code } = this.state;

            Http.POST('verifyOtp', {} ,code)
              .then(({data}) => {
                console.log('updateBusinessInfo SUCCESS: ', JSON.stringify(data));
                this.setState({loading:false})
                if(data.success){
                  localStorage.setItem('nitex@phoneInfo', "");
                  toastSuccess(data.message);

                  let userInfo = localStorage.getItem('userInfo');
                  if(userInfo) {
                    userInfo = JSON.parse(userInfo);
                  } else {
                    userInfo = {};
                  }
                  userInfo.phoneVerified = true;
                  localStorage.setItem('userInfo', JSON.stringify(userInfo));

                  let redirection = getUrlParameter('redirect', this.props.location.search)
                  if (redirection) {
                    this.props.history.push('/explore-design?redirect=' + redirection);
                  } else {
                    this.props.history.push('/explore-design');
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
        let { code, codeError, phoneInfo, timeLimit } = this.state;
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
                        <h2>Verify</h2>
                        <p className="font-20 my-2">A code has been sent to {this.renderNumber()}. Please verify. </p>
                        <a href="#" className="text-underline color-333 font-13" onClick={this.back}>Wrong number?</a>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group">
                                <div className="country-code">
                                    <input onChange={this.onChange} value={code} onKeyPress={this.handleKeyPress} name="code" type="text" className="text-center bg-gray-light border-0 font-weight-bold"/>
                                </div>
                                {
                                  codeError ?
                                  <div className="error">{codeError}</div>:<></>
                                }
                            </div>
                        </div>
                    </div>
                    <button className="btn-brand m-0" onClick={this._submit}>Verify</button>
                    {
                      timeLimit ?
                      <button className="btn-brand font-16 brand-color bg-gray-light m-0" disabled>Resend code after {`${Math.floor(timeLimit/60)}:${(timeLimit - (Math.floor(timeLimit/60) * 60))}`} mins</button> :
                      <button className="btn-brand m-0" onClick={this.resend}>Resend code</button>
                    }
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
