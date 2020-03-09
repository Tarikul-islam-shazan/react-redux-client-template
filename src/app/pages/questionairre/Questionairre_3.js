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
          purpose:''
        };
    }

    componentDidMount = async() => {

    }

    _setData = (purpose) => {
      this.setState({
        purpose
      });
    }

    _next = () => {
      this.props.history.push('/questionairre-final');
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
                                          About my Business
                                      </b>
                                  </div>
                                  <div className="col text-center">
                                      I need product for {this.state.purpose ? <span style={{color:'blue'}}>{this.state.purpose}</span> : '_____'}
                                  </div>
                                  <div className="col-auto">
                                      <b className="text-active">3</b>/3
                                  </div>
                              </div>
                          </div>
                          <div className="section-content">
                              <div className="row">
                                  <div className="col">
                                      <div className="card" onClick={() => this._setData('Events')}>
                                          <img src={require("../../assets/images/questionnaire_3_1_events.png")} alt="designer" className="card-img-top img-fluid d-block mx-auto"/>
                                          <div className="card-body">
                                              <p className="card-text">Events</p>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="col">
                                      <div className="card" onClick={() => this._setData('Wholesales')}>
                                          <img src={require("../../assets/images/questionnaire_3_1_wholesales.png")} alt="buyer" className="card-img-top img-fluid d-block mx-auto"/>
                                          <div className="card-body">
                                              <p className="card-text">Wholesales</p>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="col">
                                      <div className="card" onClick={() => this._setData('Tenders')}>
                                          <img src={require("../../assets/images/questionnaire_3_1_tenders.png")} alt="product manager" className="card-img-top img-fluid d-block mx-auto"/>
                                          <div className="card-body">
                                              <p className="card-text">Tenders</p>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="col">
                                      <div className="card" onClick={() => this._setData('Retailers')}>
                                          <img src={require("../../assets/images/questionnaire_3_1_retailers.png")} alt="sourcing manager" className="card-img-top img-fluid d-block mx-auto"/>
                                          <div className="card-body">
                                              <p className="card-text">Retailers</p>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="col">
                                      <div className="card" onClick={() => this._setData('E-Commerce')}>
                                          <img src={require("../../assets/images/questionnaire_3_1_ecommerce.png")} alt="owner" className="card-img-top img-fluid d-block mx-auto"/>
                                          <div className="card-body">
                                              <p className="card-text">E-commerce</p>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="col">
                                      <div className="card" onClick={() => this._setData('Other')}>
                                          <img src={require("../../assets/images/questionnaire_3_1_others.png")} alt="other" className="card-img-top img-fluid d-block mx-auto"/>
                                          <div className="card-body">
                                              <p className="card-text">Other</p>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              {this.state.purpose ? <div className="row" style={{textAlign:'right',marginTop:20}}>
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
