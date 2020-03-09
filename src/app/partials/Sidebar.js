import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggle } from '../actions/sidebar';

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: window.location.pathname,
            parentTab: ''
        };
    }

    componentDidMount = () =>{
      console.log("route",this.state.activeTab)
    }

    render() {
        return (
          <aside className="left-panel">
              <div className="logo">
                  <a href="#" className="logo-expanded">
                    <img src={require("../assets/images/logo.png")} alt="logo" className="img-fluid d-block mx-auto" />
                </a>
              </div>
              <nav className="navigation">
                  <ul className="list-unstyled">
                      <li className="active">
                          <a href="#">
                              <img src="" alt=""/>
                              <span className="nav-label">Dashboard</span>
                          </a>
                      </li>
                      <li className="">
                          <a href="#">
                              <img src="" alt=""/>
                              <span className="nav-label">Request for Quotes</span>
                          </a>
                      </li>
                      <li className="">
                          <a href="#">
                              <img src="" alt=""/>
                              <span className="nav-label">Pick Designs</span>
                          </a>
                      </li>
                      <li className="">
                          <a href="#">
                              <img src="" alt=""/>
                              <span className="nav-label">My Products</span>
                          </a>
                      </li>
                      <li className="">
                          <a href="#">
                              <img src="" alt=""/>
                              <span className="nav-label">My RFQ's</span>
                          </a>
                      </li>
                      <li className="">
                          <a href="#">
                              <img src="" alt=""/>
                              <span className="nav-label">My Projects</span>
                          </a>
                      </li>
                  </ul>
              </nav>
          </aside>

        );
    }
}

Sidebar.propTypes = {
    toggle: PropTypes.func.isRequired,
    isCollapsed: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isCollapsed: state.sidebar.isCollapsed
});

export default connect(mapStateToProps, {toggle})(Sidebar);
