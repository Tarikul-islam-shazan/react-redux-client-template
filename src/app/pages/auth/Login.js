import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect,Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import Loader from '../../commonComponents/Loader';
// import { Alert } from '../../commonComponents/Alert';
// import Title from '../../partials/Title';
// import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';
import { validate } from '../../services/Util';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
// const {
//     TextField
// } = MaterialUI;


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
          email:'',
          password:'',
          rememberMe:'0',
          emailError:'',
          passwordError:''
        };
    }

    componentDidMount = async() => {

    }

    login = () => {
      if(!this.state.emailError && !this.state.passwordError){
        if(this.state.email && this.state.password){
          this.props.history.push('/questionairre-step-1');
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
        return (
            <>
              <div className="page-header text-center">
                  <h3 className="page-title">Welcome Back</h3>
                  <p className="page-subtitle">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</p>
              </div>
              <div className="text-center">
                  <a href="#" className="btn btn-google btn-social" style={{marginBottom:10}}>
                      <span>
                          <img src={ require('../../assets/icons/google.png') } alt="google"/>
                      </span>
                      Sign up with Google
                  </a>
                  <a href="#" className="btn btn-linkedin btn-social" style={{marginBottom:10}}>
                      <span>
                          <img src={ require('../../assets/icons/linkedin_white.png') } alt="linkedin"/>
                      </span>
                      Sign up with Linkedin
                  </a>
              </div>
              <form className="registration-form" autoComplete="off">
                  {/* <div className="form-group">
                      <div className="input-group">
                          <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.onChange} placeholder="Email Address"/>
                          <div className="input-group-append">
                              <span className="input-group-text">
                                  <img src={ require('../../assets/icons/envelope.png') } alt="email" className="img-fluid"/>
                              </span>
                          </div>
                      </div>
                  </div>
                  <div className="form-group">
                      <div className="input-group">
                          <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.onChange} placeholder="Password"/>
                          <div className="input-group-append">
                              <span className="input-group-text">
                                  <img src={ require('../../assets/icons/lock.png') } alt="password" className="img-fluid"/>
                              </span>
                          </div>
                      </div>
                  </div> */}
                    <FormControl>
                        <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
                        <Input
                            id="standard-adornment-email"
                            label="Email"
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            endAdornment= {
                                <InputAdornment position="end">
                                    <img src={ require('../../assets/icons/envelope.png') } alt="email" className="img-fluid"/>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <FormControl>
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type='password'
                            value={this.state.password}
                            onChange={this.onChange}
                            name="password"
                            endAdornment={
                            <InputAdornment position="end">
                                <img src={ require('../../assets/icons/lock.png') } alt="password" className="img-fluid"/>
                            </InputAdornment>
                            }
                        />
                    </FormControl>

                  <div className="form-group">
                      <div className="row justify-content-between">
                          <div className="col-auto">
                              <div className="form-group">
                                  <div className="form-check">
                                      <input className="form-check-input" name="rememberMe" value="1" onChange={this.onChange} type="checkbox" id="gridCheck"/>
                                      <label className="form-check-label">
                                          Remember me
                                      </label>
                                  </div>
                              </div>
                          </div>
                          <div className="col-auto">
                              <a href="#" style={{color: 'inherit'}}>Forgot password?</a>
                          </div>
                      </div>
                      <div className="float-right" style={{marginBottom: '20px'}}>
                          <div className="g-recaptcha" data-sitekey="6Lf7c98UAAAAAKJk-_47QA_VwkXXwLg4fUiVWjUq"></div>
                      </div>
                  </div>
                </form>

                <button type="button" className="btn btn-nitex-default btn-block" onClick={this.login}>Sign In</button>
              <div className="row justify-content-between">
                  <div className="col-auto">
                      <ul className="social-share">
                          <li>
                              <a href="#">
                                  <img src={ require('../../assets/icons/facebook.png') } alt="facebook"/>
                              </a>
                          </li>
                          <li>
                              <a href="#">
                                  <img src={ require('../../assets/icons/twitter.png') } alt="twitter"/>
                              </a>
                          </li>
                          <li>
                              <a href="#">
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
            </>
        );
    }
}

const mapStateToProps = store => {
	return {
		resources: store.resources.resources
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			// fetchResources
		},
		dispatch
	);
};

// export default ResourceList;
export default connect(mapStateToProps, mapDispatchToProps)(Login);
