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

import {OrderItem} from './components/OrderItem';

class ConfirmOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
          order: {}
        };
    }

    componentDidMount = () => {
      document.title = "My designs on Nitex - The easiest clothing manufacturing software";
      // this.renderList(0, true, true);
      let id = this.props.match.params.id;
      this.getOrderDetails(id);
    }

    getOrderDetails = async(id) => {
      await this.setState({loading: true})
      await Http.GET('order', '/' + id)
        .then(({data}) => {
          console.log('order details SUCCESS: ', data);
          this.setState({loading: false, order: data})
        })
        .catch(({response}) => {
            console.log('order details ERROR: ', response);
            this.setState({loading: false})
            if (response && response.data && response.data.message) {
              toastError(response.data.message);
            } else {
              toastError("Something went wrong! Please try again.");
            }
        });
    }

    onChange = (e) => {
      let {order} = this.state;
      order[e.target.name] = e.target.value;
      this.setState({
        order
      })
    }

    delete = async(id) => {
      let orderId = this.props.match.params.id;
      let {order} = this.state;
      let body = {
        orderId: parseInt(orderId),
        invoiceId: order.invoiceResponse.id,
        productInfoForRfqId: id
      }
      this.setState({loading: true});
      await Http.DELETE('removeOrderItem', body)
        .then(({data}) => {
          console.log('removeOrderItem SUCCESS: ', JSON.stringify(data));
          this.setState({loading:false});
          if(data.success){
            toastSuccess(data.message);
            this.getOrderDetails(orderId);
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
    }

    cancel = async() => {
      let orderId = this.props.match.params.id;
      await Http.DELETE('cancelOrder', {} , orderId)
        .then(({data}) => {
          console.log('cancelOrder SUCCESS: ', JSON.stringify(data));
          this.setState({loading:false});
          if(data.success){
            toastSuccess(data.message);
            this.props.history.push('/orders/my-orders')
          }else{
            toastError(data.message);
          }
        })
        .catch(({response}) => {
            console.log('cancelOrder Error: ', JSON.stringify(response));
            this.setState({loading: false});
            if(response!==undefined && response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Request wasn't successful.");
            }
        });
    }

    render() {
        let {order} = this.state;
        let invoice = order.invoiceResponse ? order.invoiceResponse : {};
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
                  {
                    order.productResponseList ?
                    order.productResponseList.map((product, i) => {
                      return <OrderItem product={product} key={i} remove={this.delete} />
                    }) : <></>
                  }
              </div>

              <div className="invoice-summary">
                  <div className="title">
                      Invoice Summary
                      <div className="toggle-up-down">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="9" viewBox="0 0 18 9">
                              <path id="Icon_ionic-md-arrow-dropdown" data-name="Icon ionic-md-arrow-dropdown" d="M9,22.5l9-9,9,9Z" transform="translate(-9 -13.5)" fill="#21242b"/>
                          </svg>
                      </div>
                      <div className="tab-price font-weight-bold">${invoice.priceBreakDown ? invoice.priceBreakDown.grandTotal : ''}</div>
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
                              <button className="btn-brand brand-bg-color shadow m-0 mt-5" onClick={() => this.props.history.push('/orders/confirm-payment/' + this.props.match.params.id)}>Confirm order</button>
                              <a href="#" className="text-underline font-16" onClick={this.cancel}>Cancel order</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmOrder);
