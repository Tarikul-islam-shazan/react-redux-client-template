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
import { encodeQueryData, _getKey, invoiceStatus, changeDateFormat } from '../../services/Util';
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';
import { getDetails } from './actions';


// import {InvoiceItem} from './components/InvoiceItem';

class InvoiceDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
          invoice: {},
          loading: false,
          isDownload: false
        };
    }

    componentDidMount = async() => {
      document.title = "Invoice Details - Nitex";
      window.addEventListener('afterprint', this.onAfterPrint)
      let id = this.props.match.params.id;
      await this.setState({ loading: true });
      await getDetails(id)
        .then((data) => this.setState({ invoice: data }))
        .finally(() => this.setState({ loading: false }))
    //   let id = this.props.match.params.id;
    //   await this.getDetails(id);
    // }

    // getDetails = async(id) => {
    //   await this.setState({loading: true});

    //   await Http.GET('getInvoiceDetails', id)
    //     .then(({data}) => {
    //       console.log('invoiceList SUCCESS: ', data);
    //       data.toAddress = data.toAddress ? JSON.parse(data.toAddress) : data.toAddress;
    //       data.fromAddress = data.fromAddress ? JSON.parse(data.fromAddress) : data.fromAddress;
    //       this.setState({loading: false, invoice: data})
    //     })
    //     .catch(({response}) => {
    //         console.log('invoiceList ERROR: ', response);
    //         this.setState({loading: false})
    //         if (response && response.data && response.data.message) {
    //           toastError(response.data.message);
    //         } else {
    //           toastError("Something went wrong! Please try again.");
    //         }
    //     });
    }

    componentWillUnmount = () => {
      window.removeEventListener('afterprint', this.onAfterPrint)
    }

    onAfterPrint = () => {
      this.setState({ isDownload: false })
    }

    onPayInvoice = (id) => {
      this.props.history.push('/invoices/pay/' + id)
    }

    render() {
        let {invoice} = this.state;
        let toAddress = invoice.toAddress ? invoice.toAddress.address : {};
        let fromAddress = invoice.fromAddress ? invoice.fromAddress.address : {};
        console.log('---->', invoice);
        return (
          <>
            <div class="back cursor-pointer" onClick={() => this.props.history.push('/invoices/list')}></div>

            <div class="admin-view-invoice mt-4">

                <div class="d-flex flex-column flex-xl-row align-items-center justify-content-between header-sec">
                    <div>
                        <div class="header-title mb-4">Invoice No: <strong class="text-black">{invoice.invoiceNo}</strong></div>
                        <div class="d-flex terms">
                            <span class="color-gray term"><span>Invoice Date:</span> <strong class="semibold text-black"> {invoice.date ? changeDateFormat(invoice.date) : 'N/A'}</strong></span>
                            <span class="color-gray term"><span>Due date:</span> <strong class="semibold text-black"> {invoice.dueDate ? changeDateFormat(invoice.dueDate) : 'N/A'}</strong></span>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between flex-column flex-sm-row">
                        <div class="text-center mr-0 mr-sm-5">
                            {invoiceStatus(invoice)}
                        </div>
                        <button class="btn-border my-3">Download</button>
                        <button onClick={() => this.onPayInvoice(invoice.id)}class="btn-border brand-bg-color text-white border-0 px-5 ml-0 ml-sm-3">Pay</button>
                    </div>
                </div>

                <div class="stepper">
                <div className="recipient-from d-flex flex-column flex-sm-row justify-content-between ">
                    <div>
                      <div className="font-15 semibold mb-2">Bill Form</div>
                      {
                         fromAddress &&
                         <address>
                           <div className="name">{fromAddress.name}</div>
                           <span className="address">{fromAddress.invoiceAddress}</span>
                           <span className="address">{fromAddress.country} {fromAddress.postalCode}</span>
                           <span>{fromAddress.email}</span>
                           <span className="phone">{fromAddress.phoneNumber}</span>
                         </address>
                      }

                    </div>
                    <div>
                      <div className="font-15 semibold mb-2">Bill To</div>
                      {
                         toAddress &&
                         <address>
                           <div className="name">{toAddress.fullName}</div>
                           <span className="address">{toAddress.address} {toAddress.city} {toAddress.stateOrProvince}</span>
                           <span className="mail">{toAddress.email}</span>
                           <span className="phone">{toAddress.phoneNo}</span>
                         </address>
                      }

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

                    {/* <div class="row mt-2 mt-sm-5">
                        <div class="col-md-12">
                            <div class="text-right">
                                <button class="btn-brand m-0">Approve</button>
                            </div>
                        </div>
                    </div> */}
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
