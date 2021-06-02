import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from 'loadjs';
import { loadStripe } from "@stripe/stripe-js";

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../services/Http';
import { toastSuccess, toastError, toastWarning } from '../../commonComponents/Toast';
import ProductCard from '../../commonComponents/ProductCard';
import { encodeQueryData, _getKey } from '../../services/Util';

import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';

// import {InvoiceItem} from './components/InvoiceItem';
const stripePromise = loadStripe("pk_test_Os37uKWRds5fdZBl7CM95re700gVT1xOKC");

class PayInvoice extends Component {

    constructor(props) {
        super(props);
        this.state = {
          invoice: {},
          loading: false,
          paymentMethod: '',
          paymentMethodError: '',
          bankSlipDoc: '',
          bankSlipDocError: '',
        };
    }

    componentDidMount = async() => {
      document.title = "Invoice Details - Nitex";
      let id = this.props.match.params.id;
      await this.getDetails(id);
    }

    getDetails = async(id) => {
      await this.setState({loading: true});

      await Http.GET('getInvoiceDetails', id)
        .then(({data}) => {
          console.log('invoiceList SUCCESS: ', data);
          data.toAddress = data.toAddress ? JSON.parse(data.toAddress) : data.toAddress;
          data.fromAddress = data.fromAddress ? JSON.parse(data.fromAddress) : data.fromAddress;
          this.setState({loading: false, invoice: data})
        })
        .catch(({response}) => {
            console.log('invoiceList ERROR: ', response);
            this.setState({loading: false})
            if (response && response.data && response.data.message) {
              toastError(response.data.message);
            } else {
              toastError("Something went wrong! Please try again.");
            }
        });
    }

    onFileUpload = (e,docType) => {
      let file = e.target.files[0];
      let key = e.target.name;
      let data = {
        "name": file.name,
  			"docMimeType" : file.type,
  			"documentType" : docType,
  			"print": false,
  			"base64Str":""
      }
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        data.base64Str = reader.result;
        this.setState({[key]:data})
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      }
    }

    setPaymentMethod = (paymentMethod) => {
      this.setState({paymentMethod});
    }

    initiatePayment = async() => {
      const stripe = await stripePromise;
      let {paymentMethod, invoice} = this.state;
      // let invoice = order.invoiceResponse;
      this.setState({loading: false})
      let body = {
        invoiceId: this.props.match.params.id,
        paymentTerms: 'GATEWAY',
        paymentGateway: paymentMethod,
        amount: invoice.priceBreakDown ? invoice.priceBreakDown.grandTotal : 0
      }
      await Http.POST('getPaymentSession', body)
        .then(({data}) => {
          console.log('getPaymentSession SUCCESS: ', JSON.stringify(data));
          if(data.id){
            stripe.redirectToCheckout({
              sessionId: data.id,
            });
          }else{
            toastError(data.message);
          }
        })
        .catch(({response}) => {
            console.log('getPaymentSession Error: ', JSON.stringify(response));
            this.setState({loading: false});
            if(response!==undefined && response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Request wasn't successful.");
            }
        });
    }

    uploadBankSlip = async() => {
      let {order, paymentMethod, bankSlipDoc} = this.state;
      let body = {
        invoiceId: this.props.match.params.id,
        paymentTerms: 'WIRE_TRANSFER',
        documentDTOList : [bankSlipDoc]
      }
      await Http.POST('payForInvoice',body)
        .then(({data}) => {
          console.log('payForInvoice SUCCESS: ', data);
          if(data.success){
            toastSuccess(data.message);
            this.props.history.push('/orders/my-orders')
          }else{
            this.setState({
              loading:false
            })
            toastError(data.message);
          }
        })
        .catch(({response}) => {
            console.log('payForInvoice ERROR: ',response);
            this.setState({loading:false})
            if(response && response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Something went wrong! Please try again.");
            }
        });
    }

    submit = () => {
      let {paymentMethod} = this.state;
      if (paymentMethod === 'BANK_SLIP') {
        this.uploadBankSlip()
      } else {
        this.initiatePayment()
      }
    }

    render() {
        let {invoice, paymentMethod, paymentMethodError, bankSlipDoc, bankSlipDocError} = this.state;
        return (
          <>
            <div class="back cursor-pointer"> Back  </div>
            <div class="add-quote d-flex">
                <div class="buyer-payment-methods">
                    <div class="title">Select payment method</div>
                    <div className="stepper">
                        <h3 className="font-22 semibold mb-4">Select payment method</h3>
                        <div className="payment-method-type">
                            <div className={`type strip ${paymentMethod === 'STRIPE' ? 'active' : ''}`} onClick={() => this.setPaymentMethod('STRIPE')}>
                                <svg id="stripe-seeklogo.com" xmlns="http://www.w3.org/2000/svg" width="50" height="20.806" viewBox="0 0 50 20.806">
                                    <path id="Path_3" data-name="Path 3" d="M3.514,8.153c0-.542.444-.75,1.181-.75a7.747,7.747,0,0,1,3.444.889V5.028a9.159,9.159,0,0,0-3.444-.639C1.875,4.389,0,5.861,0,8.319c0,3.833,5.278,3.222,5.278,4.875,0,.639-.556.847-1.333.847A8.645,8.645,0,0,1,.153,12.931v3.306a9.628,9.628,0,0,0,3.792.792c2.889,0,4.875-1.431,4.875-3.917C8.806,8.972,3.514,9.708,3.514,8.153ZM12.9,1.611l-3.389.722L9.5,13.458a3.49,3.49,0,0,0,3.6,3.569,5.364,5.364,0,0,0,2.431-.458V13.75c-.444.181-2.639.819-2.639-1.236V7.583h2.639V4.625H12.889Zm6.944,4.042-.222-1.028h-3V16.778H20.1V8.542a2.449,2.449,0,0,1,2.639-.722V4.625A2.357,2.357,0,0,0,19.847,5.653Zm3.736-1.028h3.486V16.778H23.583Zm0-1.056,3.486-.75V0L23.583.736Zm10.736.819A3.924,3.924,0,0,0,31.6,5.472l-.181-.861H28.361V20.806l3.472-.736.014-3.931a3.911,3.911,0,0,0,2.458.875c2.486,0,4.75-2,4.75-6.4C39.042,6.583,36.75,4.389,34.319,4.389Zm-.833,9.569a2.076,2.076,0,0,1-1.639-.653l-.014-5.153a2.067,2.067,0,0,1,1.653-.681c1.264,0,2.139,1.417,2.139,3.236C35.625,12.569,34.764,13.958,33.486,13.958ZM50,10.75c0-3.556-1.722-6.361-5.014-6.361s-5.306,2.806-5.306,6.333c0,4.181,2.361,6.292,5.75,6.292a7.744,7.744,0,0,0,3.847-.9V13.333a7.375,7.375,0,0,1-3.4.764c-1.347,0-2.542-.472-2.694-2.111h6.792C49.972,11.806,50,11.083,50,10.75ZM43.139,9.431c0-1.569.958-2.222,1.833-2.222.847,0,1.75.653,1.75,2.222Z" fill="#472f91"/>
                                </svg>
                            </div>

                            {/*<div className={`type credit-card ${paymentMethod === 'CARD' ? 'active' : ''}`} onClick={() => this.setPaymentMethod('CARD')}>*/}
                            {/*    <svg xmlns="http://www.w3.org/2000/svg" width="17.238" height="11.609" viewBox="0 0 17.238 11.609">*/}
                            {/*        <g id="credit-card_copy" data-name="credit-card copy" transform="translate(0.175 -85.158)">*/}
                            {/*            <g id="Group_11210" data-name="Group 11210" transform="translate(0 85.333)">*/}
                            {/*                <g id="Group_11209" data-name="Group 11209" transform="translate(0 0)">*/}
                            {/*                    <path id="Path_27886" data-name="Path 27886" d="M15.129,85.333H1.759A1.762,1.762,0,0,0,0,87.092v7.74a1.762,1.762,0,0,0,1.759,1.759H15.128a1.762,1.762,0,0,0,1.759-1.759v-7.74A1.762,1.762,0,0,0,15.129,85.333Zm1.055,9.5a1.057,1.057,0,0,1-1.055,1.055H1.759A1.057,1.057,0,0,1,.7,94.832v-7.74a1.057,1.057,0,0,1,1.055-1.055H15.128a1.057,1.057,0,0,1,1.055,1.055v7.74Z" transform="translate(0 -85.333)" fill="#472f91" stroke="#472f91" stroke-width="0.35"/>*/}
                            {/*                </g>*/}
                            {/*            </g>*/}
                            {/*            <g id="Group_11212" data-name="Group 11212" transform="translate(0 87.444)">*/}
                            {/*                <g id="Group_11211" data-name="Group 11211" transform="translate(0 0)">*/}
                            {/*                    <path id="Path_27887" data-name="Path 27887" d="M16.536,149.333H.352a.352.352,0,0,0-.352.352V151.8a.352.352,0,0,0,.352.352H16.536a.352.352,0,0,0,.352-.352v-2.111A.352.352,0,0,0,16.536,149.333Zm-.352,2.111H.7v-1.407h15.48v1.407Z" transform="translate(0 -149.333)" fill="#472f91" stroke="#472f91" stroke-width="0.35"/>*/}
                            {/*                </g>*/}
                            {/*            </g>*/}
                            {/*            <g id="Group_11214" data-name="Group 11214" transform="translate(2.111 92.37)">*/}
                            {/*                <g id="Group_11213" data-name="Group 11213" transform="translate(0 0)">*/}
                            {/*                    <path id="Path_27888" data-name="Path 27888" d="M68.574,298.667H64.352a.352.352,0,1,0,0,.7h4.222a.352.352,0,1,0,0-.7Z" transform="translate(-64 -298.667)" fill="#472f91" stroke="#472f91" stroke-width="0.35"/>*/}
                            {/*                </g>*/}
                            {/*            </g>*/}
                            {/*            <g id="Group_11216" data-name="Group 11216" transform="translate(2.111 93.777)">*/}
                            {/*                <g id="Group_11215" data-name="Group 11215" transform="translate(0 0)">*/}
                            {/*                    <path id="Path_27889" data-name="Path 27889" d="M68.574,341.333H64.352a.352.352,0,1,0,0,.7h4.222a.352.352,0,1,0,0-.7Z" transform="translate(-64 -341.333)" fill="#472f91" stroke="#472f91" stroke-width="0.35"/>*/}
                            {/*                </g>*/}
                            {/*            </g>*/}
                            {/*            <g id="Group_11218" data-name="Group 11218" transform="translate(11.962 91.666)">*/}
                            {/*                <g id="Group_11217" data-name="Group 11217" transform="translate(0 0)">*/}
                            {/*                    <path id="Path_27890" data-name="Path 27890" d="M364.426,277.333h-.7a1.057,1.057,0,0,0-1.055,1.055v.7a1.057,1.057,0,0,0,1.055,1.055h.7a1.057,1.057,0,0,0,1.055-1.055v-.7A1.057,1.057,0,0,0,364.426,277.333Zm.352,1.759a.352.352,0,0,1-.352.352h-.7a.352.352,0,0,1-.352-.352v-.7a.352.352,0,0,1,.352-.352h.7a.352.352,0,0,1,.352.352Z" transform="translate(-362.667 -277.333)" fill="#472f91" stroke="#472f91" stroke-width="0.35"/>*/}
                            {/*                </g>*/}
                            {/*            </g>*/}
                            {/*        </g>*/}
                            {/*    </svg>*/}
                            {/*   &nbsp; Credit Card*/}
                            {/*</div>*/}

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
                                &nbsp; Bank Slipt
                            </div>
                        </div>
                        {
                          paymentMethodError ? <span className="error">{paymentMethodError}</span> : ''
                        }
                        {
                          paymentMethod === 'BANK_SLIP' ?
                          <div className="credit-card-container">
                              <div className="row">
                                  <div className="col-md-6">
                                      <div className="form-group">
                                          <label>Upload bank slip</label>
                                          <input type="file" placeholder="Full name" name="bankSlipDoc" onChange={(e) => this.onFileUpload(e,'BANK_SLIP')} className="w-100 bg-gray-light border-0"/>
                                          {
                                            bankSlipDocError ? <span className="error">{bankSlipDocError}</span> : ''
                                          }
                                      </div>
                                  </div>
                              </div>
                          </div> : <></>
                        }

                    </div>
                </div>

            </div>
            <div class="invoice-summary">
                <div class="title">
                    Invoice Summary
                    <div class="toggle-up-down">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="9" viewBox="0 0 18 9">
                            <path id="Icon_ionic-md-arrow-dropdown" data-name="Icon ionic-md-arrow-dropdown" d="M9,22.5l9-9,9,9Z" transform="translate(-9 -13.5)" fill="#21242b"/>
                        </svg>
                    </div>
                    <div class="tab-price font-weight-bold">${invoice.amount}</div>
                </div>
                <div class="details">
                    <h4 class="mb-4 font-weight-normal color-333 font-22">Invoice No:  <strong>IVN{invoice.id}</strong></h4>
                    <div class="ordered-container">
                    {
                      invoice.itemWisePrice ?
                      invoice.itemWisePrice.map((item, i) => {
                        return(
                          <div key={i} class="mb-2 font-weight-normal color-333 font-18 d-flex align-items-center justify-content-between">
                              {item.itemName}
                              <strong class="font-weight-bold font-24">${item.price}</strong>
                          </div>
                        )
                      }) : <></>
                    }
                        <div class="sub-total pt-2 mt-4 border-top">
                            <div class="mb-2 font-weight-normal color-333 font-18 d-flex align-items-center justify-content-between">
                                Sub total
                                <strong class="font-weight-bold font-24">${invoice.amount}</strong>
                            </div>
                        </div>

                        <div class="mt-5 shipping-info">
                            <div class="mb-2 font-weight-normal color-333 font-18">
                                Shipping <br/>
                                <div class="mt-4 color-gray font-16 info-text">Shipping charges and duties might be extra
                                    and will be confirmed before your order is
                                    processed.</div>
                            </div>
                        </div>

                        <div class="grand-total pt-2 mt-4 border-top">
                            <div class="mb-2 font-weight-normal color-333 font-18 d-flex align-items-center justify-content-between">
                                Grand total
                                <strong class="font-weight-bold font-24">${invoice.amount}</strong>
                            </div>
                        </div>

                        <div class="submit-for-payment d-flex flex-column align-items-center justify-content-center">
                            <button class="btn-brand brand-bg-color shadow m-0 mt-5" onClick={this.submit}>Pay</button>
                        </div>
                    </div>
                </div>
            </div>
          </>
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

export default connect(mapStateToProps, mapDispatchToProps)(PayInvoice);
