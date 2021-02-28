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

// import {InvoiceItem} from './components/InvoiceItem';

class InvoiceDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
          invoice: {},
          loading: false,
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

    render() {
        let {invoice} = this.state;
        let to = invoice.toAddress ? invoice.toAddress.address : {};
        let from = invoice.fromAddress ? invoice.fromAddress.address : {};
        return (
          <>
            <div class="back cursor-pointer"> Back </div>

            <div class="admin-view-invoice mt-4">

                <div class="d-flex flex-column flex-xl-row align-items-center justify-content-between header-sec">
                    <div>
                        <div class="header-title mb-4">Invoice No: <strong class="text-black">IVN{invoice.id}</strong></div>
                        <div class="d-flex terms">
                            <span class="color-gray term"><span>Invoice Date:</span> <strong class="semibold text-black"> {invoice.invoiceDate}</strong></span>
                            <span class="color-gray term"><span>Due date:</span> <strong class="semibold text-black"> {invoice.dueDate}</strong></span>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between flex-column flex-sm-row">
                        <div class="text-center mr-0 mr-sm-5">
                            <span class="white-space-nowrap">Payment status</span> <br/>
                            <span class="badge-custom mt-2 d-inline-block" style={{backgroundColor: '#ECFAEB', color: '#47CB3C'}}>Paid</span>
                        </div>
                        <button class="btn-border my-3">Download</button>
                        <button class="btn-border brand-bg-color text-white border-0 px-5 ml-0 ml-sm-3">Pay</button>
                    </div>
                </div>

                <div class="stepper">

                    <div class="recipient-from d-flex flex-column flex-sm-row justify-content-between ">
                        <div>
                            <div class="font-15 semibold mb-3">RECIPIENT</div>
                            <address>
                                <div class="name">{to.fullname}</div>
                                <span class="address">{to.address}</span>
                                {/*<span class="vat">VAT No.: 12345678</span>*/}
                                <span class="mail">{to.email}</span>
                                <span class="phone">{to.phoneNo}</span>
                            </address>
                        </div>
                        <div>
                            <div class="font-15 semibold mb-3">RECIPIENT</div>
                            <address>
                                <div class="name">{from.fullname}</div>
                                <span class="address">{from.address}</span>
                                {/*<span class="vat">VAT No.: 12345678</span>*/}
                                <span class="mail">{from.email}</span>
                                <span class="phone">{from.phoneNo}</span>
                            </address>
                        </div>
                    </div>

                    <h3 class="font-28 semibold mb-3">List of items</h3>

                    <div class="row">
                        <div class="col-sm-12">
                            <table class="table invoice-table table-responsive-xl">
                                <tbody>
                                {
                                  invoice.itemWisePrice ?
                                  invoice.itemWisePrice.map((item, i) => {
                                    return(
                                      <tr key={i}>
                                          <td>{item.itemName}</td>
                                          <td>
                                              <span>Quantity</span> <br/>
                                              <strong>{item.quantity} pc</strong>
                                          </td>
                                          <td>
                                              <span>Unit price</span> <br/>
                                              <strong>${item.unitPrice}</strong>
                                          </td>
                                          <td>
                                              <span>Total price</span> <br/>
                                              <strong>${item.price}</strong>
                                          </td>
                                          {/*<td>
                                              <span class="cursor-pointer">
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="20.27" height="24.962" viewBox="0 0 20.27 24.962">
                                                    <g id="delete" transform="translate(0)">
                                                      <path id="Path_27884" data-name="Path 27884" d="M222.983,154.7a.585.585,0,0,0-.585.585v11.051a.585.585,0,0,0,1.169,0V155.288a.585.585,0,0,0-.584-.588Zm0,0" transform="translate(-209.397 -145.659)" fill="red"/>
                                                      <path id="Path_27885" data-name="Path 27885" d="M104.983,154.7a.585.585,0,0,0-.585.585v11.051a.585.585,0,0,0,1.169,0V155.288a.585.585,0,0,0-.584-.588Zm0,0" transform="translate(-98.297 -145.659)" fill="red"/>
                                                      <path id="Path_27886" data-name="Path 27886" d="M1.657,7.431V21.837a3.226,3.226,0,0,0,.858,2.225,2.879,2.879,0,0,0,2.089.9H15.667a2.879,2.879,0,0,0,2.089-.9,3.226,3.226,0,0,0,.858-2.225V7.431a2.234,2.234,0,0,0-.573-4.392H15.047V2.308A2.3,2.3,0,0,0,12.732,0H7.54A2.3,2.3,0,0,0,5.224,2.31v.731H2.23a2.234,2.234,0,0,0-.573,4.392ZM15.667,23.8H4.6a1.852,1.852,0,0,1-1.777-1.959V7.483H17.444V21.837A1.852,1.852,0,0,1,15.667,23.8ZM6.393,2.308A1.126,1.126,0,0,1,7.54,1.168h5.192a1.126,1.126,0,0,1,1.146,1.14v.731H6.393ZM2.23,4.208H18.04a1.052,1.052,0,0,1,0,2.1H2.23a1.052,1.052,0,1,1,0-2.1Zm0,0" transform="translate(0 0)" fill="red"/>
                                                      <path id="Path_27887" data-name="Path 27887" d="M163.983,154.7a.585.585,0,0,0-.585.585v11.051a.585.585,0,1,0,1.169,0V155.288a.585.585,0,0,0-.584-.588Zm0,0" transform="translate(-153.847 -145.659)" fill="red"/>
                                                    </g>
                                                  </svg>
                                              </span>
                                          </td>*/}
                                      </tr>
                                    )
                                  }) : <></>
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="row mt-5">
                        <div class="col-sm-12 col-lg-6">
                            <div class="form-group">
                                <label class="semibold">NOTES</label>
                                <article class="invoice-note">
                                    <div dangerouslySetInnerHTML={{__html: invoice.note}}>

                                    </div>
                                </article>
                            </div>
                            {/*<div class="form-group">
                                <label class="semibold mb-4 mt-2 mt-sm-5">Payment Slips</label>
                                <ul class="attachment">
                                    <li>
                                        <a href="#">
                                            <span class="pdf">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                                                  <g id="Group_11228" data-name="Group 11228" transform="translate(-233 -1348)">
                                                    <rect id="Rectangle_6312" data-name="Rectangle 6312" width="50" height="50" rx="11" transform="translate(233 1348)" fill="#eff0f2"/>
                                                    <g id="pdf" transform="translate(235.231 1364)">
                                                      <g id="Group_11085" data-name="Group 11085" transform="translate(14.769)">
                                                        <g id="Group_11084" data-name="Group 11084">
                                                          <path id="Path_27881" data-name="Path 27881" d="M31.011,4.691,26.594.1a.334.334,0,0,0-.24-.1H19.772a1.337,1.337,0,0,0-1.336,1.335V6H15.768a1,1,0,0,0-1,1v5a1,1,0,0,0,1,1h2.667v3a1.336,1.336,0,0,0,1.336,1.333h10A1.336,1.336,0,0,0,31.1,16V4.922A.334.334,0,0,0,31.011,4.691ZM26.437.9l3.625,3.767H26.437ZM15.768,12.334A.333.333,0,0,1,15.436,12V7a.333.333,0,0,1,.333-.333h9A.333.333,0,0,1,25.1,7v5a.333.333,0,0,1-.333.332ZM30.437,16a.668.668,0,0,1-.669.666h-10A.669.669,0,0,1,19.1,16V13H24.77a1,1,0,0,0,1-1V7a1,1,0,0,0-1-1H19.1V1.335a.67.67,0,0,1,.669-.669h6V5a.333.333,0,0,0,.333.333h4.334Z" transform="translate(-14.769)" fill="#032b88"/>
                                                        </g>
                                                      </g>
                                                      <g id="Group_11087" data-name="Group 11087" transform="translate(16.727 8.137)">
                                                        <g id="Group_11086" data-name="Group 11086">
                                                          <path id="Path_27882" data-name="Path 27882" d="M74.624,240.669a.751.751,0,0,0-.412-.28,3.365,3.365,0,0,0-.688-.043H72.6v2.864h.578v-1.08h.377a3.3,3.3,0,0,0,.6-.041.838.838,0,0,0,.3-.136.785.785,0,0,0,.243-.282.934.934,0,0,0,.1-.443A.889.889,0,0,0,74.624,240.669Zm-.5.788a.379.379,0,0,1-.181.141,1.5,1.5,0,0,1-.457.045h-.316v-.813h.279a2.778,2.778,0,0,1,.416.02.4.4,0,0,1,.232.127.37.37,0,0,1,.092.258A.385.385,0,0,1,74.128,241.457Z" transform="translate(-72.596 -240.346)" fill="#032b88"/>
                                                        </g>
                                                      </g>
                                                      <g id="Group_11089" data-name="Group 11089" transform="translate(19.393 8.137)">
                                                        <g id="Group_11088" data-name="Group 11088">
                                                          <path id="Path_27883" data-name="Path 27883" d="M153.653,241.128a1.252,1.252,0,0,0-.273-.464.958.958,0,0,0-.432-.264,2.063,2.063,0,0,0-.545-.055h-1.057v2.864h1.088a1.748,1.748,0,0,0,.512-.061,1.016,1.016,0,0,0,.406-.229,1.263,1.263,0,0,0,.307-.506,1.882,1.882,0,0,0,.088-.609A2.114,2.114,0,0,0,153.653,241.128Zm-.563,1.176a.606.606,0,0,1-.151.276.533.533,0,0,1-.233.119,1.574,1.574,0,0,1-.35.027h-.432v-1.9h.26a2.617,2.617,0,0,1,.475.027.55.55,0,0,1,.268.135.655.655,0,0,1,.164.277,1.71,1.71,0,0,1,.059.51A1.868,1.868,0,0,1,153.09,242.3Z" transform="translate(-151.346 -240.346)" fill="#032b88"/>
                                                        </g>
                                                      </g>
                                                      <g id="Group_11091" data-name="Group 11091" transform="translate(22.288 8.137)">
                                                        <g id="Group_11090" data-name="Group 11090">
                                                          <path id="Path_27884" data-name="Path 27884" d="M238.809,240.83v-.484h-1.963v2.864h.578v-1.217h1.2v-.484h-1.2v-.678Z" transform="translate(-236.846 -240.346)" fill="#032b88"/>
                                                        </g>
                                                      </g>
                                                    </g>
                                                  </g>
                                                </svg>
                                            </span>
                                            <span class="title">Documents Name.pdf</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span class="pdf">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                                                  <g id="Group_11228" data-name="Group 11228" transform="translate(-233 -1348)">
                                                    <rect id="Rectangle_6312" data-name="Rectangle 6312" width="50" height="50" rx="11" transform="translate(233 1348)" fill="#eff0f2"/>
                                                    <g id="pdf" transform="translate(235.231 1364)">
                                                      <g id="Group_11085" data-name="Group 11085" transform="translate(14.769)">
                                                        <g id="Group_11084" data-name="Group 11084">
                                                          <path id="Path_27881" data-name="Path 27881" d="M31.011,4.691,26.594.1a.334.334,0,0,0-.24-.1H19.772a1.337,1.337,0,0,0-1.336,1.335V6H15.768a1,1,0,0,0-1,1v5a1,1,0,0,0,1,1h2.667v3a1.336,1.336,0,0,0,1.336,1.333h10A1.336,1.336,0,0,0,31.1,16V4.922A.334.334,0,0,0,31.011,4.691ZM26.437.9l3.625,3.767H26.437ZM15.768,12.334A.333.333,0,0,1,15.436,12V7a.333.333,0,0,1,.333-.333h9A.333.333,0,0,1,25.1,7v5a.333.333,0,0,1-.333.332ZM30.437,16a.668.668,0,0,1-.669.666h-10A.669.669,0,0,1,19.1,16V13H24.77a1,1,0,0,0,1-1V7a1,1,0,0,0-1-1H19.1V1.335a.67.67,0,0,1,.669-.669h6V5a.333.333,0,0,0,.333.333h4.334Z" transform="translate(-14.769)" fill="#032b88"/>
                                                        </g>
                                                      </g>
                                                      <g id="Group_11087" data-name="Group 11087" transform="translate(16.727 8.137)">
                                                        <g id="Group_11086" data-name="Group 11086">
                                                          <path id="Path_27882" data-name="Path 27882" d="M74.624,240.669a.751.751,0,0,0-.412-.28,3.365,3.365,0,0,0-.688-.043H72.6v2.864h.578v-1.08h.377a3.3,3.3,0,0,0,.6-.041.838.838,0,0,0,.3-.136.785.785,0,0,0,.243-.282.934.934,0,0,0,.1-.443A.889.889,0,0,0,74.624,240.669Zm-.5.788a.379.379,0,0,1-.181.141,1.5,1.5,0,0,1-.457.045h-.316v-.813h.279a2.778,2.778,0,0,1,.416.02.4.4,0,0,1,.232.127.37.37,0,0,1,.092.258A.385.385,0,0,1,74.128,241.457Z" transform="translate(-72.596 -240.346)" fill="#032b88"/>
                                                        </g>
                                                      </g>
                                                      <g id="Group_11089" data-name="Group 11089" transform="translate(19.393 8.137)">
                                                        <g id="Group_11088" data-name="Group 11088">
                                                          <path id="Path_27883" data-name="Path 27883" d="M153.653,241.128a1.252,1.252,0,0,0-.273-.464.958.958,0,0,0-.432-.264,2.063,2.063,0,0,0-.545-.055h-1.057v2.864h1.088a1.748,1.748,0,0,0,.512-.061,1.016,1.016,0,0,0,.406-.229,1.263,1.263,0,0,0,.307-.506,1.882,1.882,0,0,0,.088-.609A2.114,2.114,0,0,0,153.653,241.128Zm-.563,1.176a.606.606,0,0,1-.151.276.533.533,0,0,1-.233.119,1.574,1.574,0,0,1-.35.027h-.432v-1.9h.26a2.617,2.617,0,0,1,.475.027.55.55,0,0,1,.268.135.655.655,0,0,1,.164.277,1.71,1.71,0,0,1,.059.51A1.868,1.868,0,0,1,153.09,242.3Z" transform="translate(-151.346 -240.346)" fill="#032b88"/>
                                                        </g>
                                                      </g>
                                                      <g id="Group_11091" data-name="Group 11091" transform="translate(22.288 8.137)">
                                                        <g id="Group_11090" data-name="Group 11090">
                                                          <path id="Path_27884" data-name="Path 27884" d="M238.809,240.83v-.484h-1.963v2.864h.578v-1.217h1.2v-.484h-1.2v-.678Z" transform="translate(-236.846 -240.346)" fill="#032b88"/>
                                                        </g>
                                                      </g>
                                                    </g>
                                                  </g>
                                                </svg>
                                            </span>
                                            <span class="title">Documents Name.pdf</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span class="img">
                                                <img src={require('../../assets/images/auth_bg.png')} alt=""/>
                                            </span>
                                            <span class="title">Documents Name.jpg</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>*/}
                        </div>
                        <div class="col-lg-2 d-none d-sm-block">
                        </div>
                        <div class="col-sm-12 col-lg-4">
                            <table class="table mt-0 mt-xl-4 invoice-table sub-total">
                                <tbody>
                                <tr>
                                    <td class="font-18">Sub total</td>
                                    <td  class="text-right"><strong>${invoice.amount}</strong></td>
                                </tr>
                                <tr>
                                    <td class="semibold color-gray font-18">Tax</td>
                                    <td class="text-right">0.00</td>
                                </tr>
                                <tr>
                                    <td class="semibold font-18">TOTAL</td>
                                    <td class="text-right"><strong>${invoice.amount}</strong></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="row mt-2 mt-sm-5">
                        <div class="col-md-12">
                            <div class="text-right">
                                <button class="btn-brand m-0">Approve</button>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDetails);
