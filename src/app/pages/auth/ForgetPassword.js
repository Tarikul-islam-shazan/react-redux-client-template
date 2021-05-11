import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect,Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';

import { validate } from '../../services/Util';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../services/Http';
import { toastSuccess, toastError } from '../../commonComponents/Toast';
// const {
//     TextField
// } = MaterialUI;

class ForgetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
          email:'',
          emailError:'',
          loading:false,
          showForm: true
        };
    }

    componentDidMount = async() => {

    }

    send = () => {
      if(!this.state.emailError){
        if(this.state.email){
          let body = {
            email: this.state.email
          };
          this.setState({loading:true})
          Http.POST('forgetPassword',body)
            .then(({data}) => {
              console.log('LOGIN SUCCESS: ', JSON.stringify(data));
              this.setState({loading:false})
              if(data.success){
                toastSuccess(data.message);
                this.setState({
                  showForm : false
                })
                // this.props.history.push('/login');
              }else{
                toastError(data.message);
              }
              // this.setState({
              //     redirectTo: '/app/home'
              // });
            })
            .catch(({response}) => {
                console.log('forgetPassword Error: ', JSON.stringify(response));
                this.setState({loading:false})
                if(response.data && response.data.message){
                  toastError(response.data.message);
                }else{
                  toastError("Request wasn't successful.");
                }
            });
        }else{
          this.setState({
            emailError: 'Email is required!'
          })
        }
      }
    }

    onChange = (e) => {
      console.log(e.target.name,e.target.value)
      let err = validate(e);
      this.setState({
        [e.target.name]:e.target.value,
        [err.name]:err.value
      })
    }

    render() {
        if(this.state.showForm){
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
                <section className="">
                    <div className="container auth-page">
                        <div className="row forgot fullscreen justify-content-center align-items-center">
                            <div className="col-lg-6 col-sm-12">
                                <div className="section-header text-center">
                                    <h3 className="section-title">Forgot your password?</h3>
                                    <p className="section-subtitle">Enter your registered email below to receive password reset instruction</p>
                                </div>
                                <form className="mt-5 forgot-pass">
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <div className="input-group">
                                            <input type="email" className="form-control" placeholder="jondoe@nitexid.com"
                                                   name="email"
                                                   value={this.state.email}
                                                   onChange={this.onChange}
                                                   />
                                            <div className="input-group-append lock">
                                                <span>
                                                    <img src={require("../../assets/icons/envelope.png")} alt="email" className="img-fluid"/>
                                                </span>
                                            </div>
                                        </div>
                                        {
                                          this.state.emailError ?
                                          <p className="error">{this.state.emailError}</p>
                                          : <></>
                                        }
                                    </div>
                                    <button type="button" className="btn btn-nitex-default btn-block my-4" onClick={this.send}>Send</button>
                                    <div className="text-center">
                                        <Link to="/login" className="text-active" style={{color: 'initial'}}>Back to Login</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
              </LoadingOverlay>
          );
        }else{
          return(
            <section className="">
                <div className="container auth-page">
                    <div className="row fullscreen justify-content-center align-items-center">
                        <div className="col-8">
                            <div className="section-header text-center">

                                <div className="chek-email mb-5">
                                    <img src={require("../../assets/icons/check-email.png")} alt=""/>
                                </div>
                                <h4 className="section-title">Check your email</h4>
                                <p className="section-subtitle">We have sent a password recovery instruction to your email</p>
                            </div>
                            <a type="button" href="https://mail.google.com/" className="btn btn-nitex-default btn-block my-4" style={{color:'white'}}>Go to email address</a>
                        </div>
                    </div>
                </div>
            </section>
          )
        }
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


export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
