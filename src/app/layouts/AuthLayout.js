import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';

const AuthLayout = ({children, ...rest}) => {
    const [isShow, setisShow] = useState(false);
    const [islogin, setisShow1] = useState(true);
    const login =()=>{
       
        setisShow(!isShow)
        setisShow1(!islogin)
    }
    const register =()=>{
        setisShow(!isShow)
        setisShow1(!islogin)
    }
    return (
        <>
        <div className="bg_color_custom">

        
          <div className="auth-page container">
              <div class="layout_headers">
                    <a href="https://nitex.com" className="back-link back-link-override custom_l_a">
                              <span>
                                  <img src={ require('../assets/icons/home.png') } alt="back"/>
                              </span> Back to Home</a>
                              
                                  {isShow &&
                                 <p> Already have an account?                        
                                     <Link to="/login" onClick={login} className="text-active text-color_orange" style={{textDecoration: 'underline'}}>Sign in</Link>
                                 </p>
                               }

                               
                               {islogin &&
                                 <p>Don't have an account?
                                <Link to="/register" onClick={register} className="text-active text-color_orange" style={{textDecoration: 'underline'}}>Sign up</Link>
                                 </p>
                               }
                                  
                       
                   
              </div>
              <div className="row fullscreen">
                  <div className="col-lg-7 col-sm-12 col-md-12 bg_white_auth" style={{padding:0}}>
                      <div className="bg-wrapper">
                          <div className="logo-wrapper">
                              <img src={ require('../assets/images/logo.png') } alt="logo" className="img-fluid d-block mx-auto" width="125px"/>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-5 col-sm-12 col-md-12 bg_white_auth" style={{padding:0}}>
                      <div className="content-wrapper content-wrapper-override">
                          {/* <a href="https://nitex.com" className="back-link back-link-override">
                              <span>
                                  <img src={ require('../assets/icons/home.png') } alt="back"/>
                              </span> Back to Home</a> */}
                              <br/>
                              <br/>
                              {children}
                      </div>
                  </div>
              </div>
          </div>
          </div>
        </>
    );
};

export default AuthLayout;
