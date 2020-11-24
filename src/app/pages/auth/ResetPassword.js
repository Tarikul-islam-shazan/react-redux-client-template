import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect,Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { validate } from '../../services/Util';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../services/Http';
import { toastSuccess, toastError } from '../../commonComponents/Toast';
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';

class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
          password:'',
          passwordRe:'',
          passwordError:'',
          passwordReError:'',
          token:'',
          loading:false
        };
    }

    componentDidMount = () => {
      console.log("token from componentDidMount",this.props.location.search)
      let str = this.props.location.search;
      str = str.split("=");
      if(str.length>1){
        this.setState({
          token: str[1]
        })
      }
    }

    onChange = (e) => {
      console.log(e.target.name,e.target.value)
      let err = validate(e,this.state.password);
      this.setState({
        [e.target.name]:e.target.value,
        [err.name]:err.value
      })
    }

    reset = () => {
      const { passwordError, passwordReError, password, passwordRe, token } = this.state;
      if(!passwordError && !passwordReError){
        if(password && passwordRe){
          this.setState({loading:true})
          let body = {
            token: token,
            password,
            retypePassword: passwordRe
          };
          console.log("body from reset",body)
          Http.POST('completeForgotPassword',body)
            .then(({data}) => {
              this.setState({loading:false})
              if(data.success){
                toastSuccess(data.message+". Please login again with new password.");
                this.props.history.push('/login');
              }
            })
            .catch(({response}) => {
                console.log('completeForgotPassword Error: ', response.data);
                if(response.data && response.data.message){
                  toastError(response.data.message);
                }else{
                  toastError("Request wasn't successful.");
                }
                this.setState({loading:false})
            });
        }else{
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
        }
      }
    }

    render() {
        let { password, passwordRe, passwordError, passwordReError } = this.state;
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
                    <div className="row fullscreen justify-content-center align-items-center">
                        <div className="col-7">
                            <div className="section-header text-center">
                                <h4 className="section-title">Create new password</h4>
                                <p className="section-subtitle">Your password must be different from previously used passwords.</p>
                            </div>
                            <form className="registration-form mt-5 reset-pass">
                                <div className="form-group">
                                    <div className="input-group">
                                        <input type="password" className="form-control" name="password" onChange={this.onChange} value={password} placeholder="New password" />
                                        <div className="input-group-append">
                                            <span className="input-group-text">
                                                <img src={require("../../assets/icons/lock.png")} alt="password" className="img-fluid"/>
                                            </span>
                                        </div>
                                    </div>
                                    {
                                      passwordError ?
                                      <p className="error">{passwordError}</p>
                                      : <></>
                                    }
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input type="password" className="form-control" name="passwordRe" onChange={this.onChange} value={passwordRe} placeholder="Re-enter new password" />
                                        <div className="input-group-append">
                                            <span className="input-group-text">
                                                <img src={require("../../assets/icons/lock.png")} alt="password" className="img-fluid"/>
                                            </span>
                                        </div>
                                    </div>
                                    {
                                      passwordReError ?
                                      <p className="error">{passwordReError}</p>
                                      : <></>
                                    }
                                </div>
                                <button type="button" className="btn btn-nitex-default btn-block  mt-6" onClick={this.reset}>Create</button>
                            </form>
                        </div>
                    </div>
                </div>
              </section>
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


export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
