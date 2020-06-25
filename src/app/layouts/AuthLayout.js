import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';

const AuthLayout = ({children, ...rest}) => {
    return (
        <>
          <div className="auth-page container-fluid">
              <div className="row fullscreen">
                  <div className="col-lg-5 col-sm-12 col-md-12" style={{padding:0}}>
                      <div className="bg-wrapper">
                          <div className="logo-wrapper">
                              <img src={ require('../assets/images/logo.png') } alt="logo" className="img-fluid d-block mx-auto" width="125px"/>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-7 col-sm-12 col-md-12" style={{padding:0}}>
                      <div className="content-wrapper content-wrapper-override">
                          <a href="https://nitex.info" className="back-link back-link-override">
                              <span>
                                  <img src={ require('../assets/icons/home.png') } alt="back"/>
                              </span> Back to Home</a>
                              <br/>
                              <br/>
                              {children}
                      </div>
                  </div>
              </div>
          </div>
        </>
    );
};

export default AuthLayout;
