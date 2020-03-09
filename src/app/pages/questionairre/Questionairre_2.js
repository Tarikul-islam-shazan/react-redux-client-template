import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';

class Questionairre_1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
          area:''
        };
    }

    componentDidMount = async() => {

    }
    _setData = (area) => {
      this.setState({
        area
      });
    }

    _next = () => {
      this.props.history.push('/questionairre-step-3');
    }

    render() {
        return (
            <>
              <div className="page-header text-center">
                  <h3 className="page-title">welcome to nitex</h3>
                  <p className="page-subtitle">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</p>
              </div>

              <div className="page-content">
                  <section className="questionnaire">
                      <div className="container">
                          <div className="section-header">
                              <div className="row">
                                  <div className="col-auto">
                                      <b className="text-active pb-1" style={{borderBottom: "1px solid"}}>
                                          About Your Business
                                      </b>
                                  </div>
                                  <div className="col text-center">
                                      My Business Market is in {this.state.area ? <span style={{color:'blue'}}>{this.state.area}</span> : '_____'}
                                  </div>
                                  <div className="col-auto">
                                      <b className="text-active">2</b>/3
                                  </div>
                              </div>
                          </div>
                          <div className="section-content">
                              <div className="row">
                                  <div className="col">
                                      <div className="card" onClick={() => this._setData('European Union')}>
                                          <img src={require("../../assets/images/questionnaire_2_4_european_union.png")} alt="designer" className="card-img-top img-fluid d-block mx-auto"/>
                                          <div className="card-body">
                                              <p className="card-text">European Union</p>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="col">
                                      <div className="card" onClick={() => this._setData('America')}>
                                          <img src={require("../../assets/images/questionnaire_2_4_america.png")} alt="buyer" className="card-img-top img-fluid d-block mx-auto"/>
                                          <div className="card-body">
                                              <p className="card-text">America</p>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="col">
                                      <div className="card" onClick={() => this._setData('Africa')}>
                                          <img src={require("../../assets/images/questionnaire_2_4_africa.png")} alt="product manager" className="card-img-top img-fluid d-block mx-auto"/>
                                          <div className="card-body">
                                              <p className="card-text">Africa</p>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="col">
                                      <div className="card" onClick={() => this._setData('Asia')}>
                                          <img src={require("../../assets/images/questionnaire_2_4_asia.png")} alt="sourcing manager" className="card-img-top img-fluid d-block mx-auto"/>
                                          <div className="card-body">
                                              <p className="card-text">Asia</p>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="col">
                                      <div className="card" onClick={() => this._setData('Australia')}>
                                          <img src={require("../../assets/images/questionnaire_2_4_australia.png")} alt="owner" className="card-img-top img-fluid d-block mx-auto"/>
                                          <div className="card-body">
                                              <p className="card-text">Australia</p>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="col">
                                      <div className="card" onClick={() => this._setData('Other')}>
                                          <img src={require("../../assets/images/questionnaire_2_4_other.png")} alt="other" className="card-img-top img-fluid d-block mx-auto"/>
                                          <div className="card-body">
                                              <p className="card-text">Other</p>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              {this.state.area ? <div className="row" style={{textAlign:'right',marginTop:20}}>
                                <div className="col">
                                  <button class="btn btn-success" onClick={this._next}> Next </button>
                                </div>
                              </div> : ''}
                          </div>
                      </div>
                  </section>
              </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Questionairre_1);
