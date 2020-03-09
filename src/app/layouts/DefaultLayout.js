import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';

const DefaultLayout = ({children, ...rest}) => {
    return (
        <>
            <Sidebar/>

            <div className="content">
                <nav className="navbar navbar-expand navbar-light bg-white topbar static-top shadow">
                    {/* Sidebar Toggle (Topbar) */}
                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                        <i className="fa fa-bars"></i>
                    </button>

                    {/* Topbar Search */}
                    <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <button className="btn p-1">
                                    <i className="fas fa-search fa-sm"></i>
                                </button>
                            </div>
                            <input type="text" className="form-control border-0 small" placeholder="Search..." aria-label="Search" aria-describedby="basic-addon2" />
                        </div>
                    </form>

                    {/* Topbar Navbar */}
                    <ul className="navbar-nav ml-auto align-items-center">

                        {/* Nav Item - Search Dropdown (Visible Only XS) */}
                        <li className="nav-item dropdown no-arrow d-sm-none">
                            <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-search fa-fw"></i>
                            </a>
                            {/* Dropdown - Messages */}
                            <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                                <form className="form-inline mr-auto w-100 navbar-search">
                                    <div className="input-group">
                                        <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                        <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fas fa-search fa-sm"></i>
                                        </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>

                        <li className="nav-item">
                            <a href="#" className="nav-link"  data-toggle="modal" data-target="#instantQuotation">
                            <span style={{ marginRight: '5px' }}>
                                <img src={require("../assets/icons/document.png")} alt="" className="img-fluid" />
                            </span>
                                Instant Quotation
                            </a>
                        </li>
                        <li className="nav-item dropdown no-arrow mx-1">
                            <button class="btn btn-outline-default nav-link" type="button" id="dropdownNotification">
                                <span><img src={require("../assets/icons/notification-bell.png")} alt="notification"/></span>
                            </button>
                        </li>

                        {/* Nav Item - Add New */}
                        <li className="nav-item dropdown no-arrow mx-1">
                            <button class="btn btn-outline-default nav-link dropdown-toggle" type="button" id="dropdownNewButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-plus-circle"></i> Add New
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownNewButton">
                                <a class="dropdown-item" data-toggle="modal" data-target="#newProject_1_4">New Project</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#newDevSuccess_1">New Development Success</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">New Product</a>
                            </div>
                        </li>

                        {/* Nav Item - User Information */}
                        <li className="nav-item dropdown no-arrow">
                            <button class="btn btn-outline-default nav-link dropdown-toggle" type="button" id="dropdownProfileButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
                                <span className="mr-2 d-none d-lg-inline">Trevor Beilis</span>
                            </button>
                            {/* Dropdown - User Information */}
                            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="dropdownProfileButton">
                                <a className="dropdown-item" href="#">
                                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Profile
                                </a>

                                <a className="dropdown-item" href="#">
                                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Settings
                                </a>

                                <a className="dropdown-item" href="#">
                                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Activity Log
                                </a>

                                <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Logout
                                </a>
                            </div>
                        </li>

                    </ul>

                </nav>
                {/* <header className="top-head container-fluid" style={{height:58}}>
                    <nav className=" navbar-default" role="navigation">
                        <ul className="nav navbar-nav navbar-right top-menu top-right-menu">
                            <div class="row" style={{paddingTop:12}}>
                              <div class="col-md-9">
                              </div>
                              <div class="col-md-1" style={{textAlign:'right'}}>
                                <div class="dropdown">
                                  <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
                                    New
                                  </button>
                                  <div class="dropdown-menu">
                                    <a class="dropdown-item"  data-toggle="modal" data-target="#newProject_1_4">New Project</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#">New Product</a>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-2" style={{textAlign:'right',paddingTop:5}}>
                                <span data-toggle="modal" data-target="#instantQuotation">Instant Quotation</span>
                              </div>
                            </div>
                        </ul>

                    </nav>
                </header> */}

                <div className="wraper container-fluid">
                    { children }
                </div>
            </div>
        </>
    );
};

export default DefaultLayout;
