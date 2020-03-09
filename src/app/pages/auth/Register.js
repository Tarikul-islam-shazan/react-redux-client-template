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
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
          email:'',
          password:'',
          passwordRe:'',
          agreement:'0',
          emailError:'',
          passwordError:''
        };
    }

    componentDidMount = async() => {

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
                  <h3 className="page-title">Welcome to nitex</h3>
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
              <form className="registration-form">
                  {/* <div class="form-group">
                      <div class="input-group">
                          <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.onChange} placeholder="Email Address"/>
                          <div class="input-group-append">
                              <span class="input-group-text">
                                  <img src={require("../../assets/icons/envelope.png")} alt="email" class="img-fluid"/>
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

                  <div class="form-group">
                      <div class="row">
                          <div class="col">
                              {/* <div class="input-group">
                                  <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.onChange} placeholder="Password"/>
                                  <div class="input-group-append">
                                      <span class="input-group-text">
                                          <img src={require("../../assets/icons/lock.png")} alt="password" class="img-fluid"/>
                                      </span>
                                  </div>
                              </div> */}
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
                          </div>
                          <div class="col">
                              {/* <div class="input-group">
                                  <input type="password" name="passwordRe" className="form-control" value={this.state.passwordRe} onChange={this.onChange} placeholder="Confirm Password"/>
                                  <div class="input-group-append">
                                      <span class="input-group-text">
                                          <img src={require("../../assets/icons/lock.png")} alt="password" class="img-fluid"/>
                                      </span>
                                  </div>
                              </div> */}
                              <FormControl>
                                <InputLabel htmlFor="standard-adornment-repassword">Password</InputLabel>
                                <Input
                                    id="standard-adornment-repassword"
                                    type='password'
                                    value={this.state.passwordRe}
                                    onChange={this.onChange}
                                    name="passwordRe"
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <img src={ require('../../assets/icons/lock.png') } alt="confirm password" className="img-fluid"/>
                                    </InputAdornment>
                                    }
                                />
                            </FormControl>
                          </div>
                      </div>
                  </div>

                  <div class="form-group">
                      <div class="row justify-content-between align-items-center">
                          <div class="col-auto">
                              <div class="form-group">
                                  <div class="form-check">
                                      <input class="form-check-input" name="agreement" value="1" onChange={this.onChange} type="checkbox" id="gridCheck"/>
                                      <label class="form-check-label">
                                          I agree to &nbsp;
                                          <a href="#" style={{textDecoration: "underline", color: "inherit"}}>Terms &amp; Conditions</a>
                                      </label>
                                  </div>
                              </div>
                          </div>
                          <div class="col-auto">
                                <div className="g-recaptcha" data-sitekey="6Lf7c98UAAAAAKJk-_47QA_VwkXXwLg4fUiVWjUq"></div>
                          </div>
                      </div>
                  </div>

                  <button type="button" type="submit" className="btn btn-nitex-default btn-block">Sign Up</button>
              </form>
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
                      <p>Already have an account?&nbsp;
                          <Link to="/login" className="text-active" style={{textDecoration: 'underline'}}>Sign In</Link>
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
export default connect(mapStateToProps, mapDispatchToProps)(Register);
