import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';

const QuestionairreLayout = ({children, ...rest}) => {
    return (
        <>
          <div className="auth-page container-fluid">
              <div className="row fullscreen">
                  <div className="col-md-4" style={{padding:0}}>
                      <div className="bg-wrapper">
                          <div className="logo-wrapper">
                              <img src={ require('../assets/images/logo.png') } alt="logo" className="img-fluid d-block mx-auto" width="125px"/>
                          </div>
                      </div>

                  </div>
                  <div className="col-md-8" style={{padding:0}}>
                      <div className="content-wrapper">
                          <a href="https://nitex.info" className="back-link">
                              <span>
                                  <img src={ require('../assets/icons/home.png') } alt="back"/>
                              </span> Back to Home</a>
                              <br/>
                              <br/>
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

export default QuestionairreLayout;
