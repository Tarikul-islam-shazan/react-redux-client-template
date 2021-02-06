import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from 'loadjs';

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../services/Http';
import { toastSuccess, toastError, toastWarning } from '../../commonComponents/Toast';
import ProductCard from '../../commonComponents/ProductCard';
import { encodeQueryData, _getKey } from '../../services/Util';

import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';
import {ProductSkeleton, CreateSkeletons} from "../../commonComponents/ProductSkeleton";

import {validate} from './actions';

class ConfirmPayment extends Component {

    constructor(props) {
        super(props);
        this.state = {
          order: {},

          billingName: '',
          billingAddress: '',
          billingState: '',
          billingCity: '',
          billingPostCode: '',
          billingPhoneNumber: '',
          shippingName: '',
          shippingAddress: '',
          shippingState: '',
          shippingCity: '',
          shippingPostCode: '',
          shippingPhoneNumber: '',
          sameAsBilling: false,
          paymentMethod: '',
          file: null,
          errors: {
            billingNameError: '',
            billingAddressError: '',
            billingStateError: '',
            billingCityError: '',
            billingPostCodeError: '',
            billingPhoneNumberError: '',
            shippingNameError: '',
            shippingAddressError: '',
            shippingStateError: '',
            shippingCityError: '',
            shippingPostCodeError: '',
            shippingPhoneNumberError: '',
            paymentMethodError: '',
          }
        };
    }

    componentDidMount = () => {
      document.title = "My designs on Nitex - The easiest clothing manufacturing software";
      // this.renderList(0, true, true);
      let id = this.props.match.params.id;
      this.getOrderDetails(id);
      this.getAddressFromProfileSettings()
    }

    getOrderDetails = async(id) => {
      await this.setState({loading: true})
      await Http.GET('order', '/' + id)
        .then(({data}) => {
          console.log('order details SUCCESS: ', data);
          this.setState({loading: false, order: data})
        })
        .catch(response => {
            console.log('order details ERROR: ', JSON.stringify(response));
            this.setState({loading: false})
            toastError("Something went wrong! Please try again.");
        });
    }

    getAddressFromProfileSettings = () => {
      Http.GET('getSettingsData', 'BILLING_AND_SHIPPING_ADDRESS')
        .then(({data}) => {
          if(data && data.value) {
            let val = JSON.parse(data.value);
            console.log("val from BILLING_AND_SHIPPING_ADDRESS", val)
            if (val.billing) {
              this.setState({
                billingName: val.billing.fullname,
                billingAddress: val.billing.address,
                billingState: val.billing.stateOrProvince,
                billingCity: val.billing.city,
                billingPostCode: val.billing.postCode,
                billingPhoneNumber: val.billing.phoneNo,
              })
            }
            if (val.shipping) {
              this.setState({
                shippingName: val.shipping.fullname,
                shippingAddress: val.shipping.address,
                shippingState: val.shipping.stateOrProvince,
                shippingCity: val.shipping.city,
                shippingPostCode: val.shipping.postCode,
                shippingPhoneNumber: val.shipping.phoneNo,
              })
            }
          }
        })
        .catch(({response}) => {
        });
    }

    onChange = (e) => {
      this.setState({
        [e.target.id + e.target.name]: e.target.value
      })
      if (e.target.id === 'billing' && this.state.sameAsBilling) {
        this.setState({
          ['shipping' + e.target.name]: e.target.value
        })
      }
    }

    setPaymentMethod = (paymentMethod) => {
      this.setState({paymentMethod});
    }

    handleSameAsBilling = (e) => {
      let {billingName, billingAddress, billingState, billingCity, billingPostCode, billingPhoneNumber} = this.state;
      this.setState({
        [e.target.name]: e.target.checked
      })
      if (e.target.checked) {
        this.setState({
          shippingName: billingName,
          shippingAddress: billingAddress,
          shippingState: billingState,
          shippingCity: billingCity,
          shippingPostCode: billingPostCode,
          shippingPhoneNumber: billingPhoneNumber
        })
      }
    }

    confirm = async() => {
      let id = this.props.match.params.id;
      let result = validate(this.state, id);
      if (result.isValid) {
        console.log("result", result.reqBody)
        this.setState({loading: true});
        await Http.POST('updateOrderAddress', result.reqBody)
          .then(({data}) => {
            console.log('removeOrderItem SUCCESS: ', JSON.stringify(data));
            if(data.success){
              toastSuccess(data.message);
              this.initiatePayment()
            }else{
              toastError(data.message);
            }
          })
          .catch(({response}) => {
              console.log('removeOrderItem Error: ', JSON.stringify(response));
              this.setState({loading: false});
              if(response!==undefined && response.data && response.data.message){
                toastError(response.data.message);
              }else{
                toastError("Request wasn't successful.");
              }
          });
      } else {
        this.setState({
          errors: {...this.state.errors, ...result.errors}
        })
      }
    }

    initiatePayment = () => {
      this.setState({loading: false})
    }

    cancel = () => {

    }

    render() {
        let {order} = this.state;
        let invoice = order.invoiceResponse ? order.invoiceResponse : {};
        let {
          billingName, billingAddress, billingState, billingCity, billingPostCode, billingPhoneNumber,
          shippingName, shippingAddress, shippingState, shippingCity, shippingPostCode, shippingPhoneNumber,
          sameAsBilling, paymentMethod, file
        } = this.state;
        let {
          billingNameError, billingAddressError, billingStateError, billingCityError, billingPostCodeError, billingPhoneNumberError,
          shippingNameError, shippingAddressError, shippingStateError, shippingCityError, shippingPostCodeError, shippingPhoneNumberError,
          paymentMethodError
        } = this.state.errors;
        return (
          <div className="add-quote d-flex">
              <div className="confirm-quote-request placing-order">
                  <div className="header-title d-flex justify-content-between align-items-center">
                      <a href="#">
                          <h3 className="text-black">
                              Placing order
                          </h3>
                      </a>
                  </div>
                  <div className="mt-3">
                      <input type="text" placeholder="Order title" name="name" value={order.name} onChange={this.onChange} className="w-100 bg-gray-light"/>
                  </div>

                  <h4 className="mb-4 mt-4 font-weight-normal color-333 order-id">Order ID: <strong>{order.orderId}</strong> <span className="result d-flex font-18">Delivery date <div className="text-black ml-2 semibold"> {order.deliveryDate}</div></span></h4>
                  <h4 className="mb-4 font-weight-normal pc-step">Product confirmation(Step 1 of 2) <span className="result font-18">You have {order.productResponseList ? order.productResponseList.length : '-'} items in your order</span></h4>

                  <div className="order-step2">

                      <div className="stepper">
                          <h3 className="font-22 semibold mb-4">Billing Address</h3>
                          <div className="row">
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label>Full name</label>
                                      <input type="text" placeholder="Full name" id="billing" name="Name" value={billingName} onChange={this.onChange} className="w-100 bg-gray-light border-0"/>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label>Address</label>
                                      <input type="text" placeholder="Address" id="billing" name="Address" value={billingAddress} onChange={this.onChange} className="w-100 bg-gray-light border-0"/>
                                  </div>
                              </div>
                          </div>
                          <div className="row">
                              <div className="col-sm-6 col-md-6 col-lg-3">
                                  <div className="form-group">
                                      <label>State/Province</label>
                                      <input type="text" placeholder="State/Province" id="billing" name="State" value={billingState} onChange={this.onChange} className="w-100 bg-gray-light border-0"/>
                                  </div>
                              </div>
                              <div className="col-sm-6 col-md-6 col-lg-3">
                                  <div className="form-group">
                                      <label>City</label>
                                      <input type="text" placeholder="City" id="billing" name="City" value={billingCity} onChange={this.onChange} className="w-100 bg-gray-light border-0"/>
                                  </div>
                              </div>
                              <div className="col-sm-6 col-md-6 col-lg-3">
                                  <div className="form-group">
                                      <label>Postal code</label>
                                      <input type="text" placeholder="Postal code" id="billing" name="PostCode" value={billingPostCode} onChange={this.onChange} className="w-100 bg-gray-light border-0"/>
                                  </div>
                              </div>
                              <div className="col-sm-6 col-md-6 col-lg-3">
                                  <div className="form-group">
                                      <label>Phone number</label>
                                      <input type="text" placeholder="Phone number" id="billing" name="PhoneNumber" value={billingPhoneNumber} onChange={this.onChange} className="w-100 bg-gray-light border-0"/>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="stepper">
                          <h3 className="font-22 semibold mb-3">Shipping address</h3>

                          <div className="row mb-3">
                              <div className="col-md-6 col-lg-5">
                                  <div className="custom-chekbox">
                                      <div className="form-group">
                                          <input type="checkbox" id="1" name="sameAsBilling" onChange={this.handleSameAsBilling} checked={sameAsBilling}/>
                                          <label for="1" className="font-16 color-gray font-weight-normal">Same as Billing address</label>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <div className="row">
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label>Full name</label>
                                      <input type="text" placeholder="Full name" id="shipping" name="Name" value={shippingName} onChange={this.onChange} className="w-100 bg-gray-light border-0" disabled={sameAsBilling}/>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label>Address</label>
                                      <input type="text" placeholder="Address" id="shipping" name="Address" value={shippingAddress} onChange={this.onChange} className="w-100 bg-gray-light border-0" disabled={sameAsBilling}/>
                                  </div>
                              </div>
                          </div>

                          <div className="row">
                              <div className="col-sm-6 col-md-6 col-lg-3">
                                  <div className="form-group">
                                      <label>State/Province</label>
                                      <input type="text" placeholder="State/Province" id="shipping" name="State" value={shippingState} onChange={this.onChange} className="w-100 bg-gray-light border-0" disabled={sameAsBilling}/>
                                  </div>
                              </div>
                              <div className="col-sm-6 col-md-6 col-lg-3">
                                  <div className="form-group">
                                      <label>City</label>
                                      <input type="text" placeholder="City" id="shipping" name="City" value={shippingCity} onChange={this.onChange} className="w-100 bg-gray-light border-0" disabled={sameAsBilling}/>
                                  </div>
                              </div>
                              <div className="col-sm-6 col-md-6 col-lg-3">
                                  <div className="form-group">
                                      <label>Postal code</label>
                                      <input type="text" placeholder="Postal code" id="shipping" name="PostCode" value={shippingPostCode} onChange={this.onChange} className="w-100 bg-gray-light border-0" disabled={sameAsBilling}/>
                                  </div>
                              </div>
                              <div className="col-sm-6 col-md-6 col-lg-3">
                                  <div className="form-group">
                                      <label>Phone number</label>
                                      <input type="text" placeholder="Phone number" id="shipping" name="PhoneNumber" value={shippingPhoneNumber} onChange={this.onChange} className="w-100 bg-gray-light border-0" disabled={sameAsBilling}/>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="stepper">
                          <h3 className="font-22 semibold mb-4">Select payment method</h3>
                          <div className="payment-method-type">
                              <div className={`type strip ${paymentMethod === 'STRIPE' ? 'active' : ''}`} onClick={() => this.setPaymentMethod('STRIPE')}>
                                  <svg id="stripe-seeklogo.com" xmlns="http://www.w3.org/2000/svg" width="50" height="20.806" viewBox="0 0 50 20.806">
                                      <path id="Path_3" data-name="Path 3" d="M3.514,8.153c0-.542.444-.75,1.181-.75a7.747,7.747,0,0,1,3.444.889V5.028a9.159,9.159,0,0,0-3.444-.639C1.875,4.389,0,5.861,0,8.319c0,3.833,5.278,3.222,5.278,4.875,0,.639-.556.847-1.333.847A8.645,8.645,0,0,1,.153,12.931v3.306a9.628,9.628,0,0,0,3.792.792c2.889,0,4.875-1.431,4.875-3.917C8.806,8.972,3.514,9.708,3.514,8.153ZM12.9,1.611l-3.389.722L9.5,13.458a3.49,3.49,0,0,0,3.6,3.569,5.364,5.364,0,0,0,2.431-.458V13.75c-.444.181-2.639.819-2.639-1.236V7.583h2.639V4.625H12.889Zm6.944,4.042-.222-1.028h-3V16.778H20.1V8.542a2.449,2.449,0,0,1,2.639-.722V4.625A2.357,2.357,0,0,0,19.847,5.653Zm3.736-1.028h3.486V16.778H23.583Zm0-1.056,3.486-.75V0L23.583.736Zm10.736.819A3.924,3.924,0,0,0,31.6,5.472l-.181-.861H28.361V20.806l3.472-.736.014-3.931a3.911,3.911,0,0,0,2.458.875c2.486,0,4.75-2,4.75-6.4C39.042,6.583,36.75,4.389,34.319,4.389Zm-.833,9.569a2.076,2.076,0,0,1-1.639-.653l-.014-5.153a2.067,2.067,0,0,1,1.653-.681c1.264,0,2.139,1.417,2.139,3.236C35.625,12.569,34.764,13.958,33.486,13.958ZM50,10.75c0-3.556-1.722-6.361-5.014-6.361s-5.306,2.806-5.306,6.333c0,4.181,2.361,6.292,5.75,6.292a7.744,7.744,0,0,0,3.847-.9V13.333a7.375,7.375,0,0,1-3.4.764c-1.347,0-2.542-.472-2.694-2.111h6.792C49.972,11.806,50,11.083,50,10.75ZM43.139,9.431c0-1.569.958-2.222,1.833-2.222.847,0,1.75.653,1.75,2.222Z" fill="#472f91"/>
                                  </svg>
                              </div>
                              <div className={`type credit-card ${paymentMethod === 'CARD' ? 'active' : ''}`} onClick={() => this.setPaymentMethod('CARD')}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="17.238" height="11.609" viewBox="0 0 17.238 11.609">
                                      <g id="credit-card_copy" data-name="credit-card copy" transform="translate(0.175 -85.158)">
                                          <g id="Group_11210" data-name="Group 11210" transform="translate(0 85.333)">
                                              <g id="Group_11209" data-name="Group 11209" transform="translate(0 0)">
                                                  <path id="Path_27886" data-name="Path 27886" d="M15.129,85.333H1.759A1.762,1.762,0,0,0,0,87.092v7.74a1.762,1.762,0,0,0,1.759,1.759H15.128a1.762,1.762,0,0,0,1.759-1.759v-7.74A1.762,1.762,0,0,0,15.129,85.333Zm1.055,9.5a1.057,1.057,0,0,1-1.055,1.055H1.759A1.057,1.057,0,0,1,.7,94.832v-7.74a1.057,1.057,0,0,1,1.055-1.055H15.128a1.057,1.057,0,0,1,1.055,1.055v7.74Z" transform="translate(0 -85.333)" fill="#472f91" stroke="#472f91" stroke-width="0.35"/>
                                              </g>
                                          </g>
                                          <g id="Group_11212" data-name="Group 11212" transform="translate(0 87.444)">
                                              <g id="Group_11211" data-name="Group 11211" transform="translate(0 0)">
                                                  <path id="Path_27887" data-name="Path 27887" d="M16.536,149.333H.352a.352.352,0,0,0-.352.352V151.8a.352.352,0,0,0,.352.352H16.536a.352.352,0,0,0,.352-.352v-2.111A.352.352,0,0,0,16.536,149.333Zm-.352,2.111H.7v-1.407h15.48v1.407Z" transform="translate(0 -149.333)" fill="#472f91" stroke="#472f91" stroke-width="0.35"/>
                                              </g>
                                          </g>
                                          <g id="Group_11214" data-name="Group 11214" transform="translate(2.111 92.37)">
                                              <g id="Group_11213" data-name="Group 11213" transform="translate(0 0)">
                                                  <path id="Path_27888" data-name="Path 27888" d="M68.574,298.667H64.352a.352.352,0,1,0,0,.7h4.222a.352.352,0,1,0,0-.7Z" transform="translate(-64 -298.667)" fill="#472f91" stroke="#472f91" stroke-width="0.35"/>
                                              </g>
                                          </g>
                                          <g id="Group_11216" data-name="Group 11216" transform="translate(2.111 93.777)">
                                              <g id="Group_11215" data-name="Group 11215" transform="translate(0 0)">
                                                  <path id="Path_27889" data-name="Path 27889" d="M68.574,341.333H64.352a.352.352,0,1,0,0,.7h4.222a.352.352,0,1,0,0-.7Z" transform="translate(-64 -341.333)" fill="#472f91" stroke="#472f91" stroke-width="0.35"/>
                                              </g>
                                          </g>
                                          <g id="Group_11218" data-name="Group 11218" transform="translate(11.962 91.666)">
                                              <g id="Group_11217" data-name="Group 11217" transform="translate(0 0)">
                                                  <path id="Path_27890" data-name="Path 27890" d="M364.426,277.333h-.7a1.057,1.057,0,0,0-1.055,1.055v.7a1.057,1.057,0,0,0,1.055,1.055h.7a1.057,1.057,0,0,0,1.055-1.055v-.7A1.057,1.057,0,0,0,364.426,277.333Zm.352,1.759a.352.352,0,0,1-.352.352h-.7a.352.352,0,0,1-.352-.352v-.7a.352.352,0,0,1,.352-.352h.7a.352.352,0,0,1,.352.352Z" transform="translate(-362.667 -277.333)" fill="#472f91" stroke="#472f91" stroke-width="0.35"/>
                                              </g>
                                          </g>
                                      </g>
                                  </svg>
                                  Credit Card
                              </div>
                              <div className={`type bank-slipt ${paymentMethod === 'BANK_SLIP' ? 'active' : ''}`} onClick={() => this.setPaymentMethod('BANK_SLIP')}>
                                  <svg id="bank" xmlns="http://www.w3.org/2000/svg" width="14.998" height="14.881" viewBox="0 0 14.998 14.881">
                                      <g id="Group_11133" data-name="Group 11133" transform="translate(0 0)">
                                          <g id="Group_11132" data-name="Group 11132">
                                              <ellipse id="Ellipse_1" data-name="Ellipse 1" cx="0.843" rx="0.843" transform="translate(6.506 3.227)" fill="#472f91"/>
                                              <path id="Path_4" data-name="Path 4" d="M14.412,470H.586a.586.586,0,0,0,0,1.172H14.412a.586.586,0,0,0,0-1.172Z" transform="translate(0 -456.291)" fill="#472f91"/>
                                              <path id="Path_5" data-name="Path 5" d="M15,5.661a.586.586,0,0,0-.348-.535L7.722,2.05a.586.586,0,0,0-.476,0L.347,5.126A.586.586,0,0,0,0,5.661V7.213s0,.01,0,.015,0,.01,0,.015a.586.586,0,0,0,.586.586.522.522,0,0,1,.5.586v5.464c0,.012,0,.024,0,.036s0,.024,0,.036a.586.586,0,0,0,.586.586H13.387a.586.586,0,1,0,0-1.172H11.629V8.414a.586.586,0,1,1,1.172,0v2.593a.586.586,0,0,0,1.172,0V8.414c0-.137.032-.586.439-.586A.586.586,0,0,0,15,7.243s0-.01,0-.015,0-.01,0-.015Zm-11.571,7.7H2.256V8.414a.586.586,0,1,1,1.172,0Zm2.343,0H4.6V8.414a.586.586,0,1,1,1.172,0Zm2.343,0H6.942V8.414a.586.586,0,0,1,1.172,0Zm2.343,0H9.286V8.414a.586.586,0,1,1,1.172,0Zm3.369-6.737H1.172V6.041L7.485,3.226l6.341,2.815Z" transform="translate(0 -1.999)" fill="#472f91"/>
                                          </g>
                                      </g>
                                  </svg>
                                  Bank Slipt
                              </div>
                          </div>
                          {
                            paymentMethod === 'BANK_SLIP' ?
                            <div className="credit-card-container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Upload bank slip</label>
                                            <input type="file" placeholder="Full name" className="w-100 bg-gray-light border-0"/>
                                        </div>
                                    </div>
                                </div>
                            </div> : <></>
                          }

                      </div>


                  </div>
              </div>

              <div className="invoice-summary">
                  <div className="title">
                      Invoice Summary
                      <div className="toggle-up-down">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="9" viewBox="0 0 18 9">
                              <path id="Icon_ionic-md-arrow-dropdown" data-name="Icon ionic-md-arrow-dropdown" d="M9,22.5l9-9,9,9Z" transform="translate(-9 -13.5)" fill="#21242b"/>
                          </svg>
                      </div>
                      <div className="tab-price font-weight-bold">$14285</div>
                  </div>
                  <div className="details">
                      <h4 className="mb-4 font-weight-normal color-333 font-22">Invoice No:  <strong>{invoice.invoiceNo}</strong></h4>
                      <div className="ordered-container">
                      {
                        invoice.priceBreakDown && invoice.priceBreakDown.itemWisePriceList ?
                        invoice.priceBreakDown.itemWisePriceList.map((item, i) => {
                          return(
                            <div key={i} className="mb-2 font-weight-normal color-333 font-18 d-flex align-items-center justify-content-between">
                                {item.itemName}
                                <strong className="font-weight-bold font-24">${item.price}</strong>
                            </div>
                          )
                        }) : <></>
                      }


                          <div className="sub-total pt-2 mt-4 border-top">
                              <div className="mb-2 font-weight-normal color-333 font-18 d-flex align-items-center justify-content-between">
                                  Sub total
                                  <strong className="font-weight-bold font-24">${invoice.priceBreakDown ? invoice.priceBreakDown.subTotal : ''}</strong>
                              </div>
                          </div>

                          <div className="mt-5 shipping-info">
                              <div className="mb-2 font-weight-normal color-333 font-18">
                                  Shipping <br/>
                                  <div className="mt-4 color-gray font-16 info-text">Shipping charges and duties might be extra
                                  and will be confirmed before your order is
                                  processed.</div>
                              </div>
                          </div>

                          <div className="grand-total pt-2 mt-4 border-top">
                              <div className="mb-2 font-weight-normal color-333 font-18 d-flex align-items-center justify-content-between">
                                  Grand total
                                  <strong className="font-weight-bold font-24">${invoice.priceBreakDown ? invoice.priceBreakDown.grandTotal : ''}</strong>
                              </div>
                          </div>

                          <div className="submit-for-payment d-flex flex-column align-items-center justify-content-center">
                              <button className="btn-brand brand-bg-color shadow m-0 mt-5" onClick={this.confirm}>Confirm payment</button>
                              <a href="#" className="text-underline font-16">Cancel order</a>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPayment);
