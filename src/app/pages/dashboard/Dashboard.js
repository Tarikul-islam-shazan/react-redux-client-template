import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import NewProjectModal from "./components/NewProjectModal";
import NewDevelopmentSuccessModal from "./components/NewDevelopmentSuccessModal";
import InstantQuotationModal from "./components/InstantQuotationModal";

import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount = async() => {

    }

    render() {
        return (
          <>
              <section className="section">
                  <div className="row">
                      <div className="col">
                          <div className="dashboard-card">
                              <div className="row align items-center">
                                  <div className="col mr-auto">
                                      <h2 className="card-number">21</h2>
                                      <span className="card-topics">RFQ's</span>
                                  </div>
                                  <div className="col-auto">
                                      <div className="icon-box icon-box-rocket">
                                          <img src={require("../../assets/icons/rocket.png")} alt="start"/>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="col">
                          <div className="dashboard-card">
                              <div className="row align items-center">
                                  <div className="col mr-auto">
                                      <h2 className="card-number">33</h2>
                                      <span className="card-topics">Developments Projects</span>
                                  </div>
                                  <div className="col-auto">
                                      <div className="icon-box icon-box-settings">
                                          <img src={require("../../assets/icons/settings.png")} alt="start"/>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="col">
                          <div className="dashboard-card">
                              <div className="row align items-center">
                                  <div className="col mr-auto">
                                      <h2 className="card-number">134</h2>
                                      <span className="card-topics">Buks Projects</span>
                                  </div>
                                  <div className="col-auto">
                                      <div className="icon-box icon-box-savings">
                                          <img src={require("../../assets/icons/savings.png")} alt="start"/>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="col">
                          <div className="dashboard-card">
                              <div className="row align items-center">
                                  <div className="col mr-auto">
                                      <h2 className="card-number">35</h2>
                                      <span className="card-topics">Supervisions Projects</span>
                                  </div>
                                  <div className="col-auto">
                                      <div className="icon-box icon-box-research">
                                          <img src={require("../../assets/icons/research.png")} alt="start"/>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>

              <section className="section my-rfq-project">
                  <div className="row">
                      <div className="col">
                          <div className="card">
                              <div className="card-header">
                                  My RFQ's
                              </div>
                              <div className="card-body">
                                  <p className="card-text">You don't have any RFQ's</p>
                                  <a href="#" className="btn btn-nitex-default">Share your Design</a>
                              </div>
                          </div>
                      </div>
                      <div className="col">
                          <div className="card">
                              <div className="card-header">
                                  My Projects
                              </div>
                              <div className="card-body">
                                  <p className="card-text">You don't have any Projects</p>
                                  <a href="#" className="btn btn-nitex-default">Start a Project</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>

              <section className="section designs">
                  <h4 className="section-title">Browse Designs by Nitex</h4>
                  <div className="row">
                      <div className="col">
                          <div className="card">
                              <img src={require("../../assets/images/design1.png")} alt="designer" className="card-img-top img-fluid d-block mx-auto"/>
                              <div className="card-body">
                                  <h5 className="card-title text-capitalize">blue huddie long sleeve</h5>
                                  <span className="design-category">Man</span>
                                  <div className="card-footer">
                                      <span className="badge design-badge" style={{backgroundColor: '#F7F5E5', color: '#CD930C'}}>In Project</span>
                                      <div className="btn-group">
                                          <button type="button" className="btn btn-action dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true"
                                              aria-expanded="false">
                                              Action
                                          </button>
                                          <div className="dropdown-menu dropdown-menu-lg-right">
                                              <button className="dropdown-item" type="button">Action</button>
                                              <button className="dropdown-item" type="button">Another action</button>
                                              <button className="dropdown-item" type="button">Something else here</button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="col">
                          <div className="card">
                              <img src={require("../../assets/images/design1.png")} alt="designer" className="card-img-top img-fluid d-block mx-auto"/>
                              <div className="card-body">
                                  <h5 className="card-title text-capitalize">blue huddie long sleeve</h5>
                                  <span className="design-category">Man</span>
                                  <div className="card-footer">
                                      <span className="badge design-badge" style={{backgroundColor: '#F7F5E5', color: '#CD930C'}}>In Project</span>
                                      <div className="btn-group">
                                          <button type="button" className="btn btn-action dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true"
                                              aria-expanded="false">
                                              Action
                                          </button>
                                          <div className="dropdown-menu dropdown-menu-lg-right">
                                              <button className="dropdown-item" type="button">Action</button>
                                              <button className="dropdown-item" type="button">Another action</button>
                                              <button className="dropdown-item" type="button">Something else here</button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="col">
                          <div className="card">
                              <img src={require("../../assets/images/design1.png")} alt="designer" className="card-img-top img-fluid d-block mx-auto"/>
                              <div className="card-body">
                                  <h5 className="card-title text-capitalize">blue huddie long sleeve</h5>
                                  <span className="design-category">Man</span>
                                  <div className="card-footer">
                                      <span className="badge design-badge" style={{backgroundColor: '#F7F5E5', color: '#CD930C'}}>In Project</span>
                                      <div className="btn-group">
                                          <button type="button" className="btn btn-action dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true"
                                              aria-expanded="false">
                                              Action
                                          </button>
                                          <div className="dropdown-menu dropdown-menu-lg-right">
                                              <button className="dropdown-item" type="button">Action</button>
                                              <button className="dropdown-item" type="button">Another action</button>
                                              <button className="dropdown-item" type="button">Something else here</button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="col">
                          <div className="card">
                              <img src={require("../../assets/images/design1.png")} alt="designer" className="card-img-top img-fluid d-block mx-auto"/>
                              <div className="card-body">
                                  <h5 className="card-title text-capitalize">blue huddie long sleeve</h5>
                                  <span className="design-category">Man</span>
                                  <div className="card-footer">
                                      <span className="badge design-badge" style={{backgroundColor: '#F7F5E5', color: '#CD930C'}}>In Project</span>
                                      <div className="btn-group">
                                          <button type="button" className="btn btn-action dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true"
                                              aria-expanded="false">
                                              Action
                                          </button>
                                          <div className="dropdown-menu dropdown-menu-lg-right">
                                              <button className="dropdown-item" type="button">Action</button>
                                              <button className="dropdown-item" type="button">Another action</button>
                                              <button className="dropdown-item" type="button">Something else here</button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="col">
                          <div className="card">
                              <img src={require("../../assets/images/design1.png")} alt="designer" className="card-img-top img-fluid d-block mx-auto"/>
                              <div className="card-body">
                                  <h5 className="card-title text-capitalize">blue huddie long sleeve</h5>
                                  <span className="design-category">Man</span>
                                  <div className="card-footer">
                                      <span className="badge design-badge" style={{backgroundColor: '#F7F5E5', color: '#CD930C'}}>In Project</span>
                                      <div className="btn-group">
                                          <button type="button" className="btn btn-action dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true"
                                              aria-expanded="false">
                                              Action
                                          </button>
                                          <div className="dropdown-menu dropdown-menu-lg-right">
                                              <button className="dropdown-item" type="button">Action</button>
                                              <button className="dropdown-item" type="button">Another action</button>
                                              <button className="dropdown-item" type="button">Something else here</button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>
              <NewProjectModal/>
              <InstantQuotationModal/>
              <NewDevelopmentSuccessModal/>
          </>
        );
    }
}

const mapStateToProps = store => {
	return {
		// resources: store.resources.resources
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
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
