import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect,Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoadingOverlay from 'react-loading-overlay';

import Recaptcha from 'react-recaptcha';

import { validate } from '../../services/Util';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import Http from '../../services/Http';
import { toastSuccess, toastError } from '../../commonComponents/Toast';
import { GOOGLE_AUTH_URL, LINKEDIN_AUTH_URL } from '../../constant';
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
          email:'',
          password:'',
          passwordRe:'',
          agreement:false,
          emailError:'',
          passwordError:'',
          passwordReError:'',
          loading:false,
          agreementError:'',
          captchaResponse : '',
          captchaError : ''
        };
    }

    componentDidMount = async() => {

    }

    register = () => {
      const { emailError, passwordError, passwordReError, email, password, passwordRe, agreement, agreementError, captchaResponse } = this.state;
      if(!emailError && !passwordError && !passwordReError){
        if(email && password && passwordRe && agreement && captchaResponse){
          this.setState({loading:true})
          let body = {
            email,
            password,
            captchaResponse,
            approveTC : agreement
          };
          // console.log("register body",body)
          // return;
          Http.POST('signup',body)
            .then(({data}) => {
              if(data.success){
                toastSuccess(data.message+". Please login to continue.");
                this.props.history.push('/login');
                // Http.POST('login',body)
                //   .then(({data}) => {
                //     console.log('LOGIN SUCCESS: ', JSON.stringify(data));
                //     this.setState({loading:false})
                //     if(data.accessToken){
                //       this.props.history.push('/questionairre-step-1');
                //     }else{
                //       this.props.history.push('/login');
                //     }
                //   })
                //   .catch(({response}) => {
                //       console.log('LOGIN Error: ', JSON.stringify(response));
                //       if(response.data && response.data.message){
                //         toastError(response.data.message);
                //       }else{
                //         toastError("Request wasn't successful");
                //       }
                //       this.setState({loading:false})
                //       // this.props.history.push('/login');
                //   });
              }else{
                this.recaptcha.reset()
                this.setState({
                  loading : false,
                  captchaResponse : ''
                })
              }

            })
            .catch(({response}) => {
                // console.log('LOGIN Error: ', JSON.stringify(response));
                if(response.data && response.data.message){
                  toastError(response.data.message);
                }else{
                  toastError("Request wasn't successful");
                }
                this.setState({loading:false})
            });
        }else{
          if(!email){
            this.setState({
              emailError : 'Email is required!'
            })
          }
          if(!password){
            this.setState({
              passwordError : 'Password is required!'
            })
          }else if(!passwordRe){
            console.log("entered",passwordRe);
            this.setState({
              passwordReError : 'Please enter your password again!'
            })
          }
          if(!agreement){
            console.log("entered",agreement);
            this.setState({
              agreementError : 'Please accept terms & conditions first!'
            })
          }
          if(!captchaResponse){
            console.log("entered",captchaResponse);
            this.setState({
              captchaError : 'Captcha is required!'
            })
          }
        }
      }
      // this.props.history.push('/questionairre-step-1');
    }

    onChange = (e) => {
      // console.log(e.target.name,e.target.checked)
      let err = validate(e,this.state.password,true);
      if(e.target.name=='agreement'){
        this.setState({
          [e.target.name] : e.target.checked,
          [err.name]:err.value
        })
      }else{
        this.setState({
          [e.target.name]:e.target.value,
          [err.name]:err.value
        })
      }
    }

    handleRecaptcha = (token) => {
      console.log("clicked",token)
      this.setState({
        captchaResponse : token,
        captchaError : ''
      })
    }

    showTC = () => {
      window.open("https://nitex.com/terms-and-conditions", "_blank")
    }

    handleKeyPress = (event) => {
      if(event.key === 'Enter'){
        console.log('enter press here! ')
        this.register();
      }
    }

    render() {
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
              <div className="page-header text-center">
                  <h2 className="page-title">Welcome to nitex</h2>
                  <p className="page-subtitle">Sign up to access exclusive product designs and manage your bulk orders</p>
              </div>
              <div className="text-center">
                  <a href="#" className="btn btn-google btn-social" style={{marginBottom:10}} href={GOOGLE_AUTH_URL}>
                      <span>
                          <img src={ require('../../assets/icons/google.png') } alt="google"/>
                      </span>
                      Signup with Google
                  </a>
                  <a href="#" className="btn btn-linkedin btn-social" style={{marginBottom:10}} href={LINKEDIN_AUTH_URL}>
                      <span>
                          <img src={ require('../../assets/icons/linkedin_white.png') } alt="linkedin"/>
                      </span>
                      Signup with Linkedin
                  </a>
              </div>
              <form className="registration-form">
                <FormControl>
                      <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
                      <Input
                          id="standard-adornment-email"
                          label="Email"
                          type="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChange}
                          onKeyPress={this.handleKeyPress}
                          ref="email"
                          endAdornment= {
                              <InputAdornment position="end">
                                  <img src={ require('../../assets/icons/envelope.png') } alt="email" className="img-fluid" style={{width: 18}}/>
                              </InputAdornment>
                          }
                      />
                      {
                        this.state.emailError ?
                        <p className="error">{this.state.emailError}</p>
                        : <></>
                      }
                  </FormControl>

                  <div className="form-group">
                      <div className="row">
                          <div className="col">
                              <FormControl>
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type='password'
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    name="password"
                                    onKeyPress={this.handleKeyPress}
                                    ref="password"
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <img src={ require('../../assets/icons/lock.png') } alt="password" className="img-fluid"/>
                                    </InputAdornment>
                                    }
                                />
                                {
                                  this.state.passwordError ?
                                  <p className="error">{this.state.passwordError}</p>
                                  : <></>
                                }
                            </FormControl>
                          </div>
                          <div className="col">
                              <FormControl>
                                <InputLabel htmlFor="standard-adornment-repassword">Confirm Password</InputLabel>
                                <Input
                                    id="standard-adornment-repassword"
                                    type='password'
                                    value={this.state.passwordRe}
                                    onChange={this.onChange}
                                    name="passwordRe"
                                    onKeyPress={this.handleKeyPress}
                                    ref="passwordRe"
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <img src={ require('../../assets/icons/lock.png') } alt="confirm password" className="img-fluid"/>
                                    </InputAdornment>
                                    }
                                />
                                {
                                  this.state.passwordReError ?
                                  <p className="error">{this.state.passwordReError}</p>
                                  : <></>
                                }
                            </FormControl>
                          </div>
                      </div>
                  </div>

                  <div className="form-group">
                      <div className="row justify-content-between align-items-center">
                          <div className="col-auto">
                              <div className="form-group">
                                  <div className="custom-control custom-checkbox">
                                      <input className="custom-control-input" name="agreement" value="1" onChange={this.onChange} onKeyPress={this.handleKeyPress} ref="agreement" type="checkbox" id="gridCheck"/>
                                      <label className="custom-control-label" for="gridCheck">
                                          I agree to &nbsp;
                                          <a href="#" style={{textDecoration: "underline", color: "inherit"}} onClick={this.showTC}>Terms &amp; Conditions</a>
                                      </label>
                                  </div>
                                  {
                                    this.state.agreementError ?
                                    <p className="error">{this.state.agreementError}</p>
                                    : <></>
                                  }
                              </div>
                          </div>
                          <div className="float-right" style={{marginBottom: '20px'}}>
                              {/*<div className="g-recaptcha" data-sitekey="6LfaKewUAAAAAKeR1r8M41FVTovsWmEpUt12lNrj" onClick={this.handleRecaptcha}></div>*/}
                              <Recaptcha
                                ref={ref => this.recaptcha = ref}
                                sitekey="6LfaKewUAAAAAKeR1r8M41FVTovsWmEpUt12lNrj"
                                render="explicit"
                                verifyCallback={this.handleRecaptcha}
                                onloadCallback={this.handleRecaptcha}
                              />
                              {
                                this.state.captchaError ?
                                <p className="error">{this.state.captchaError}</p>
                                : <></>
                              }
                          </div>
                      </div>
                  </div>
                  <button type="button" className="btn btn-nitex-default btn-block" onClick={this.register}>Sign up</button>
              </form>
              <div className="row justify-content-between">
                  <div className="col-auto">
                      <ul className="social-share">
                          <li>
                              <a href="https://www.facebook.com/officialnitex/" target="_blank">
                                  <img src={ require('../../assets/icons/facebook.png') } alt="facebook"/>
                              </a>
                          </li>
                          <li>
                              <a href="https://twitter.com/nitexofficial" target="_blank">
                                  <img src={ require('../../assets/icons/twitter.png') } alt="twitter"/>
                              </a>
                          </li>
                          <li>
                              <a href="https://www.linkedin.com/company/nitexofficial/" target="_blank">
                                  <img src={ require('../../assets/icons/linkedin.png') } alt="linkedin"/>
                              </a>
                          </li>
                      </ul>
                  </div>
                  <div className="col-auto">
                      <p>Already have an account?&nbsp;
                          <Link to="/login" className="text-active" style={{textDecoration: 'underline'}}>Sign In</Link>
                      </p>
                  </div>
              </div>
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = store => {
	return {
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
		},
		dispatch
	);
};


export default connect(mapStateToProps, mapDispatchToProps)(Register);
