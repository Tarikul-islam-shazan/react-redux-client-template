import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ImageViewer from 'react-simple-image-viewer';

import { renderPaymentStatus } from '../../../services/Util';

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../../services/Http';
import { toastSuccess, toastError } from '../../../commonComponents/Toast';
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT, BASE_URL } from '../../../constant';
import Invoice from './Invoice';

class ViewInvoice extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loading : false,
          amount : '',
          invoiceDate : '',
          amountError : '',
          invoiceDateError : '',
          invoiceDetails : {},
          selectedSlip : '',
          imageViewerFlag : false,
          imageViewerData : [],
          toggleInvoice : false
        };
    }

    componentDidMount = () => {
      Http.GET('getInvoiceDetails',this.props.invoiceId)
        .then(({data}) => {
          console.log('getInvoiceDetails SUCCESS: ', data);
          this.setState({
            invoiceDetails : data
          })
        })
        .catch(({response}) => {
            console.log('getInvoiceDetails ERROR: ', JSON.stringify(response));

        });
    }

    _goToStep = (step) => {
      this.setState({
        step
      })
    }

    downloadInvoice = (src) => {
      let url = src;
      console.log("url",url)
      window.open(url);

    }

    render() {
        let { invoiceDetails, name, email, address, amount, invoiceDate, dueDate, note, nameError, emailError, addressError, amountError, invoiceDateError, dueDateError, noteError, imageViewerFlag, imageViewerData, toggleInvoice } = this.state;
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
            {imageViewerFlag && (
                <ImageViewer
                  backgroundStyle={{backgroundColor:'rgba(0,0,0,.5)',zIndex:999}}
                  src={ imageViewerData }
                  currentIndex={ 0 }
                  onClose={ () => {
                    this.setState({
                      imageViewerFlag : false
                    })
                  } }
                />
              )
            }
            <div className="add-invoice">
                <div>
                    <a href="#" onClick={() => this.props.switchTab(0)} className="back" style={{position:'relative'}}>Back</a>
                    <br />
                    <br />
                    <div className="action-invoice">
                    {/*<a href="#" className="btn btn-nitex-default" onClick={() => this.setState({toggleInvoice:!toggleInvoice})}> { toggleInvoice ? 'Hide invoice' : 'Show invoice' } </a>
                    <a href="#" data-toggle="modal" data-target="#makeInvoicePayment" className="btn btn-info" style={{marginLeft:10}}> Pay for the invoice </a>*/}
                    {/*<a href="#" data-toggle="modal" data-target="#confirmModal" className="btn btn-primary" style={{marginLeft:10}}> Mark as paid </a>*/}
                    {renderPaymentStatus(invoiceDetails)}
                    </div>
                    <br />
                    <br />
                    <Invoice invoice={invoiceDetails} />

                    <h4 className="details-title">Payment slips</h4>
                    <table className="table table-striped mt-4 invoice-bottom-table" style={{borderWidth:1}}>
                        <tbody>
                        {
                          invoiceDetails.paymentList ?
                          invoiceDetails.paymentList.map((item,i) => {
                            return(
                              <tr key={i}>
                                  <td><a className="link-invoice" href="#" onClick={() => this.downloadInvoice(item.docUrl)}>{item.name}</a></td>
                              </tr>
                            )
                          }) : <></>
                        }

                        </tbody>
                    </table>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewInvoice);
