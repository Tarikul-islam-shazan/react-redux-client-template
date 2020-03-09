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
          profession: ''
        };
    }

    componentDidMount = async() => {

    }

    _setData = (profession) => {
      this.setState({
        profession
      });
    }

    _next = (profession) => {
      this.props.history.push('/questionairre-step-2');
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
                                          About You
                                      </b>
                                  </div>
                                  <div className="col text-center">
                                      As a professional, I am a {this.state.profession ? <span style={{color:'blue'}}>{this.state.profession}</span> : '_____'}
                                  </div>
                                  <div className="col-auto">
                                      <b className="text-active">1</b>/3
                                  </div>
                              </div>
                          </div>
                          <div className="section-content">
                              <div className="row">
                                  <div className="col">
                                      <div className="card" onClick={() => this._setData('Designer')}>
                                          <img src={require("../../assets/images/questionnaire1_designer.png")} alt="designer" className="card-img-top img-fluid d-block mx-auto"/>
                                          <div className="card-body">
                                              <p className="card-text">designer</p>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="col">
                                      <div className="card" onClick={() => this._setData('Buyer')}>
                                          <img src={require("../../assets/images/questionnaire1_buyer.png")} alt="buyer" className="card-img-top img-fluid d-block mx-auto"/>
                                          <div className="card-body">
                                              <p className="card-text">buyer</p>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="col">
                                      <div className="card" onClick={() => this._setData('Product Manager')}>
                                          <img src={require("../../assets/images/questionnaire1_product_manager.png")} alt="product manager" className="card-img-top img-fluid d-block mx-auto"/>
                                          <div className="card-body">
                                              <p className="card-text">product manager</p>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="col">
                                      <div className="card" onClick={() => this._setData('Sourcing Manager')}>
                                          <img src={require("../../assets/images/questionnaire1_sourcing_manager.png")} alt="sourcing manager" className="card-img-top img-fluid d-block mx-auto"/>
                                          <div className="card-body">
                                              <p className="card-text">sourcing manager</p>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="col">
                                      <div className="card" onClick={() => this._setData('Owner')}>
                                          <img src={require("../../assets/images/questionnaire1_owner.png")} alt="owner" className="card-img-top img-fluid d-block mx-auto"/>
                                          <div className="card-body">
                                              <p className="card-text">owner</p>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="col">
                                      <div className="card" onClick={() => this._setData('Other')}>
                                          <img src={require("../../assets/images/questionnaire1_other.png")} alt="other" className="card-img-top img-fluid d-block mx-auto"/>
                                          <div className="card-body">
                                              <p className="card-text">other</p>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              {this.state.profession ? <div className="row" style={{textAlign:'right',marginTop:20}}>
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
