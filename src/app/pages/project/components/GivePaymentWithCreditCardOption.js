import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../../services/Http';
import { toastSuccess, toastError } from '../../../commonComponents/Toast';
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT } from '../../../constant';

class GivePayment extends Component {

    constructor(props) {
        super(props);
        this.state = {
          step : 0,
          loading : false,
          invoiceId : this.props.invoiceId,
          paymentTerms : ''
        };
    }

    componentDidMount = () => {

    }

    _goToStep = (step) => {
      this.setState({
        step
      })
    }

    render() {
        return (
          <LoadingOverlay
            active={this.state.loading}
            styles={{
              overlay: (base) => ({
                ...base,
                background: LOADER_OVERLAY_BACKGROUND
              }),
              spinner: (base) => ({
                ...base,
                width: LOADER_WIDTH,
                '& svg circle': {
                  stroke: LOADER_COLOR
                }
              }),
              content: (base) => ({
                ...base,
                color: LOADER_COLOR
              })
            }}
            spinner
            text={LOADER_TEXT}>
              <table className="table mt-4 project-profile-table payment-checkout">
                  <tbody>
                      <tr>
                          <td>
                              <div className="custom-radio">
                                  <div className="form-group">
                                      <input type="radio" id="card" name="chekout-payment"/>
                                      <label for="card">Credit card \Dabit card</label>
                                  </div>
                              </div>
                          </td>
                          <td align="right">
                              <img src={require("../../../assets/images/payment-getway.png")} alt=""/>
                          </td>
                      </tr>
                      <tr>
                          <td colSpan="2">
                              <div className="custom-radio">
                                  <div className="form-group">
                                      <input type="radio" id="bank" name="chekout-payment"/>
                                      <label for="bank">Bank Slip</label>
                                  </div>
                              </div>
                          </td>
                      </tr>
                      <tr>
                          <td colSpan="2">
                              <div className="custom-radio">
                                  <div className="form-group">
                                      <input type="radio" id="paypal" name="chekout-payment"/>
                                      <label for="paypal"> <img src={require("../../../assets/images/paypal.png")} alt=""/></label>
                                  </div>
                              </div>
                          </td>
                      </tr>
                  <tr>
                      <td colSpan="2">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Card Number</label>
                                    <div className="card-number-field">
                                        <input type="text" maxLength="4" placeholder="****"/>
                                        <input type="text" maxLength="4" placeholder="****"/>
                                        <input type="text" maxLength="4" placeholder="****"/>
                                        <input type="text" maxLength="4" placeholder="****"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                         <div className="row">
                             <div className="col-lg-8">
                                 <div className="form-group input-default">
                                     <label>Card Holder</label>
                                     <input type="text" placeholder="NAME"/>
                                 </div>
                             </div>
                             <div className="col-lg-2">
                                 <div className="form-group input-default">
                                     <label>Exp. Date</label>
                                     <input type="text" placeholder="DD/MM"/>
                                 </div>
                             </div>
                             <div className="col-lg-2">
                                 <div className="form-group input-default">
                                     <label>Cvv</label>
                                     <input type="password" placeholder="****"/>
                                 </div>
                             </div>
                         </div>
                          <button className="btn-brand float-right mt-4 mb-5" data-toggle="modal" data-target="#project-common" onClick={(e) => this.props.setModal(1)}>Payment</button>
                      </td>
                  </tr>
                  </tbody>
              </table>
          </LoadingOverlay>

        );
    }
}

const mapStateToProps = store => {
	return {
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(GivePayment);
