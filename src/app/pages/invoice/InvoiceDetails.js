import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoadingOverlay from 'react-loading-overlay';

import { invoiceStatus, changeDateFormat } from '../../services/Util';
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';
import { getDetails } from './actions';
import InvoiceDownload from './components/InvoiceDownload'

class InvoiceDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
          invoice: {},
          loading: false,
          isDownload: false,
        };
    }

    componentDidMount = async() => {
      document.title = "Invoice Details - Nitex";
      window.addEventListener('afterprint', this.onAfterPrint);
      let id = this.props.match.params.id;
      await this.setState({ loading: true });
      await getDetails(id)
        .then((data) => this.setState({ invoice: data }))
        .finally(() => this.setState({ loading: false }))
    }

    componentWillUnmount = () => {
      window.removeEventListener('afterprint', this.onAfterPrint);
    }

    onAfterPrint = () => {
      this.setState({ isDownload: false });
    }

    onPayInvoice = (id) => {
      this.props.history.push('/invoices/pay/' + id);
    }

    render() {
        let {invoice, isDownload} = this.state;
        let toAddress = invoice.toAddress ? invoice.toAddress.address : {};
        let fromAddress = invoice.fromAddress ? invoice.fromAddress : {};
        
        const onDownload = (id) => {
          return (
            this.setState({
              isDownload: true
            })
          )
        }
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
              position: LOADER_POSITION,
              top: LOADER_TOP,
              left: LOADER_LEFT,
              marginTop: LOADER_MARGIN_TOP,
              marginLeft: LOADER_MARGIN_LEFT,
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
       { !isDownload ?

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
                        <button onClick={() => onDownload(invoice.id)} className="btn-border my-3">Download</button>
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
                                <label class="semibold">Notes</label>
                                <article class="invoice-note">
                                    <p>
                                        {invoice.note}
                                    </p>
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
                </div>
            </div>
           
            </> : <InvoiceDownload invoiceData={invoice} />
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDetails);
