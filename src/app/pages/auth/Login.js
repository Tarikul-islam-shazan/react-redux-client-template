import React, { Component } from 'react';
import ReactDOM from "react-dom";

import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect,Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoadingOverlay from 'react-loading-overlay';

import Recaptcha from 'react-recaptcha';

import { validate } from '../../services/Util';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import Http from '../../services/Http';
import { toastSuccess, toastError } from '../../commonComponents/Toast';

import { GOOGLE_AUTH_URL, LINKEDIN_AUTH_URL } from '../../constant';
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';

// const {
//     TextField
// } = MaterialUI;


class Login extends Component {


  

    constructor(props) {
        super(props);
        this.state = {
          email:'',
          password:'',
          rememberMe:true,
          emailError:'',
          passwordError:'',
          loading:false,
          captchaResponse : '',
          captchaError : ''
        };
     
        // this._handleKeyPress = this._handleKeyPress.bind(this);
        // this._login = this._login.bind(this);
       
    }

    componentDidMount = async() => {
        let { rememberMe } = this.state;
        if (rememberMe) {
          await localStorage.setItem('rememberMe', rememberMe ? 1 : 0);
        }
        // for (let x in this.refs) {
        //   this.refs[x].onkeypress = (e) => 
        //     this._handleKeyPress(e, this.refs[x]);
        // }
        // this.refs.email.focus();
    }

    login = async() => {
      // const { addToast } = useToasts();
      const { emailError,
        passwordError,
        email,
        password,
        rememberMe
        // captchaResponse
      } = this.state;
      if(!emailError && !passwordError){
        if(email && password){ //previously captchaResponse
          this.setState({loading:true})
          let body = {
            email,
            password
            // captchaResponse
          };
          console.log("login body",body)
          Http.POST('login',body)
            .then(({data}) => {
              console.log('LOGIN SUCCESS: ', JSON.stringify(data));
              this.setState({loading:false})
              if(data.accessToken){
                if (rememberMe) {
                  console.log("entered localStorage", rememberMe)
                  localStorage.setItem('token',data.tokenType+' '+data.accessToken);
                } else {
                  // console.log("entered sessionStorage", localStorage.getItem('rememberMe'))
                  sessionStorage.setItem('token',data.tokenType+' '+data.accessToken);
                }
                localStorage.setItem('email',email);
                toastSuccess("Successfully Logged In.");
                Http.GET('userInfo')
                  .then(({data}) => {
                    console.log('userInfo SUCCESS: ', JSON.stringify(data));
                    localStorage.setItem('userInfo',JSON.stringify(data));
                      if(data.businessInfoGiven){
                        this.props.history.push({
                          pathname: '/dashboard',
                          state: { from: 'login' }
                        });
                      }else{
                        this.props.history.push('/questionairre-step-1');
                      }
                  })
                  .catch(({response}) => {
                    if(response.data && response.data.message){
                      toastError(response.data.message);
                    }else{
                      toastError("Couldn't fetch user info.");
                    }
                    this.props.history.push('/dashboard');
                  });
              }else{
                toastError(data.message);
                // this.recaptcha.reset()
                // this.setState({
                //   captchaResponse : ''
                // })
              }
              // this.setState({
              //     redirectTo: '/app/home'
              // });
            })
            .catch(({response}) => {
                console.log('LOGIN Error: ', JSON.stringify(response));
                this.setState({loading:false})
                if(response.data && response.data.message){
                  toastError(response.data.message);
                }else{
                  toastError("Request wasn't successful");
                }
            });
          // this.props.history.push('/dashboard');
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
          }
          // if(!captchaResponse){
          //   this.setState({
          //     captchaError : 'Captcha is required!'
          //   })
          // }
        }
      }
    }

    onChange = (e) => {
      // console.log(e.target.name,e.target.value)
      let err = validate(e);
      this.setState({
        [e.target.name]:e.target.value,
        [err.name]:err.value
      })
    }

    onChangeRemember = (e) => {
      console.log("checked", e.target.checked);
      localStorage.setItem('rememberMe', e.target.checked ? 1 : 2);
      this.setState({
        rememberMe: e.target.checked
      })
    }
 
 
    
    // _handleKeyPress(e, field) {
    //   // If enter key is pressed, focus next input field.
    //   if (e.keyCode === 13) {
    //     e.preventDefault();
    //     let next = this.refs[field.email].nextSibling;
    //     if (next && next.tagName === "INPUT") {
    //       this.refs[field.email].nextSibling.focus();
       
    //     }
    //   }
    // }
  
    // handleRecaptcha = (token) => {
    //   console.log("clicked",token)
    //   this.setState({
    //     captchaResponse : token,
    //     captchaError : ''
    //   })
    // }
    // _login=(e)=> {
    //   e.preventDefault();
    //   console.log('buttonClicked!');
    // }
    handleKeyPress = (event) => {
      if(event.key === 'Enter'){
        console.log('enter press here! ')
        this.login();
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
                  <h2 className="page-title">Welcome back!</h2>
                  <p className="page-subtitle">Log in to visualize your production progress in real time</p>
              </div>
              <div className="text-center">
                  <a href="#" className="btn btn-google btn-social" style={{marginBottom:10}} href={GOOGLE_AUTH_URL}>
                      <span>
                          <img src={ require('../../assets/icons/google.png') } alt="google"/>
                      </span>
                      Login with Google
                  </a>
                  <a href="#" className="btn btn-linkedin btn-social" style={{marginBottom:10}} href={LINKEDIN_AUTH_URL}>
                      <span>
                          <img src={ require('../../assets/icons/linkedin_white.png') } alt="linkedin"/>
                      </span>
                      Login with Linkedin
                  </a>
              </div>
              <form className="registration-form" autoComplete="off">
                    <FormControl>
                        <InputLabel htmlFor="standard-adornment-email">Email Address</InputLabel>
                        <Input
                            id="standard-adornment-email"
                            label="Email Address"
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            onKeyPress={this.handleKeyPress}
                            ref="email"
                            endAdornment= {
                                <InputAdornment position="end">
                                    <img src={ require('../../assets/icons/envelope.png') } alt="email" className="img-fluid" style={{width:18}}/>
                                </InputAdornment>
                            }
                        />
                        {
                          this.state.emailError ?
                          <p className="error">{this.state.emailError}</p>
                          : <></>
                        }
                    </FormControl>

                    <FormControl>
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type='password'
                            value={this.state.password}
                            onChange={this.onChange}
                            onKeyPress={this.handleKeyPress}
                            name="password"
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

                  <div className="form-group">
                      <div className="row justify-content-between">
                          <div className="col-auto">
                              <div className="form-group">
                                  <div className="custom-control custom-checkbox">
                                    
                                      <input className="custom-control-input" name="rememberMe"   onChange={this.onChangeRemember} type="checkbox" id="gridCheck" checked={this.state.rememberMe}/>
                                      <label className="custom-control-label" htmlFor="gridCheck">
                                          Remember me
                                      </label>
                                  </div>
                              </div>
                          </div>
                          <div className="col-auto">
                              <Link to="/forget-password" style={{color: 'inherit'}}>Forgot password?</Link>
                          </div>
                      </div>
                      {/*<div className="float-right" style={{marginBottom: '20px'}}>
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
                      </div>*/}
                  </div>
                  <button type="button" className="btn btn-nitex-default btn-block" onClick={this.login}>Log in</button>
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
                      <p>Don't have an account?&nbsp;
                          <Link to="/register" className="text-active" style={{textDecoration: 'underline'}}>Sign Up</Link>
                      </p>
                  </div>
              </div>
              {/*<LoadingOverlay
                active={this.state.loading}
                spinner
                text='Loading your content...'
                >
              </LoadingOverlay>*/}
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


export default connect(mapStateToProps, mapDispatchToProps)(Login);
