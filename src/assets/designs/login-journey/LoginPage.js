import React from 'react'
import nitexLogoDark from "../../images/login/nitexLogoDark.svg"
import rightWhite from "../../images/login/rightWhite.svg"

const LoginPage = () => {
    return (
        <div className="login-container">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-7"/>
                    <div className="col-md-4">
                        <div className="login-form-contents">
                            <div className="form-container">
                                <div className="entry-title">
                                    <img src={nitexLogoDark} alt="nitex"/>
                                    <h2 className="belong-here-text font-bold">Belong Here</h2>
                                </div>
                                <div className="login-register-tab">
                                    <ul>
                                        <li className="active">Login</li>
                                        <li>Register</li>
                                    </ul>
                                </div>
                                <div className="login-input-forms">
                                    <div className="form-group">
                                        <label htmlFor="email">Email address</label>
                                        <input type="email" className="form-control" id="email"
                                               placeholder="Enter email"/>
                                    </div>
                                    <div className="form-group ">
                                        <button className="forget-password">Forget Password</button>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" id="password"
                                               placeholder="Password"/>
                                    </div>
                                    <div className="form-group">
                                        <div className="d-flex align-items-center">
                                            <input type="checkbox"/>
                                            <span className="agree-text">Agree our <a
                                                href="#">Terms &amp; Conditions</a></span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="submit-btn">
                                            Login Now
                                            <img src={rightWhite} alt="right"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1"/>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
