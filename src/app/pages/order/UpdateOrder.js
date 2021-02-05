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

class UpdateOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {

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
      await Http.GET('order')
        .then(({data}) => {
          console.log('order details SUCCESS: ', data);
          this.setState({loading: false})
        })
        .catch(response => {
            console.log('order details ERROR: ', JSON.stringify(response));
            this.setState({loading: false})
            toastError("Something went wrong! Please try again.");
        });
    }

    render() {
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
                      <input type="text" placeholder="Order title" className="w-100 bg-gray-light"/>
                  </div>

                  <h4 className="mb-4 mt-4 font-weight-normal color-333 order-id">Order ID: <strong>ID234567</strong> <span className="result d-flex font-18">Delivery date <div className="text-black ml-2 semibold"> Jan 27, 2020</div></span></h4>
                  <h4 className="mb-4 font-weight-normal pc-step">Product confirmation(Step 1 of 2) <span className="result font-18">You have 3 items in your order</span></h4>

                  <div className="quote-req-list-container mt-3">
                      <div className="quote-list mb-3 p-4 d-flex justify-content-between align-items-center">
                          <div className="dlt">
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                  <g id="Group_11204" data-name="Group 11204" transform="translate(-1233 -282)">
                                      <rect id="Rectangle_6032" data-name="Rectangle 6032" width="32" height="32" rx="4" transform="translate(1265 282) rotate(90)" fill="rgba(253,39,39,0.05)"/>
                                      <g id="delete" transform="translate(1242.358 289.001)">
                                          <path id="Path_27867" data-name="Path 27867" d="M222.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,222.791,154.7Zm0,0" transform="translate(-213.682 -148.639)" fill="#fd2727"/>
                                          <path id="Path_27868" data-name="Path 27868" d="M104.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,104.791,154.7Zm0,0" transform="translate(-100.308 -148.639)" fill="#fd2727"/>
                                          <path id="Path_27869" data-name="Path 27869" d="M1.11,4.983v9.66a2.163,2.163,0,0,0,.575,1.492,1.931,1.931,0,0,0,1.4.606H10.5a1.93,1.93,0,0,0,1.4-.606,2.163,2.163,0,0,0,.575-1.492V4.983A1.5,1.5,0,0,0,12.1,2.038H10.089v-.49A1.54,1.54,0,0,0,8.536,0H5.055A1.54,1.54,0,0,0,3.5,1.547v.49H1.495A1.5,1.5,0,0,0,1.11,4.983ZM10.5,15.956H3.086a1.242,1.242,0,0,1-1.192-1.313V5.017h9.8v9.625A1.242,1.242,0,0,1,10.5,15.956ZM4.286,1.547A.755.755,0,0,1,5.055.783H8.536a.755.755,0,0,1,.769.765v.49H4.286ZM1.495,2.822H12.1a.706.706,0,0,1,0,1.411H1.495a.706.706,0,0,1,0-1.411Zm0,0" transform="translate(0 0)" fill="#fd2727"/>
                                          <path id="Path_27870" data-name="Path 27870" d="M163.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,163.791,154.7Zm0,0" transform="translate(-156.995 -148.639)" fill="#fd2727"/>
                                      </g>
                                  </g>
                              </svg>
                          </div>
                          <div className="quote-info">
                              <div className="info-right w-100 d-flex justify-content-between">
                                  <div className="features d-flex flex-md-column">
                                      <a href="#"><img src={require('../../assets/images/product.jpg')} alt="" className="radius-3"/></a>
                                  </div>
                                  <div className="features d-flex flex-md-column">
                                      <div className="info-item mt-1 ellipse-2-line product-title">
                                          <a href="#" className="font-weight-bold m-0 font-24 ellipse-2-line">Blue Huddie Long Sleeve Blue</a>
                                          <span className="cat">Men</span>
                                      </div>
                                      <div className="info-item">
                                          <label className="font-16 text-muted">Color</label>
                                          <div className="color-picker">
                                              <ul>
                                                  <li className="d-flex align-items-center">
                                                      <span className="ash"></span>
                                                  </li>
                                              </ul>
                                          </div>
                                      </div>
                                      <div className="info-item">
                                          <label className="font-16 text-muted">Fabric composition</label>
                                          <h5 className="font-20 color-333 font-weight-normal">Cotton 100 GSM</h5>
                                      </div>
                                  </div>

                                  <div className="features d-flex flex-md-column">
                                      <div className="info-item mt-2">
                                          <label className="font-16 text-muted">Quantity</label>
                                          <h5 className="font-20 color-333 font-weight-bold">500 pc</h5>
                                      </div>

                                      <div className="info-item pr-2 d-flex">
                                          <div className="mr-3">
                                              <label className="font-16 text-muted">XS</label>
                                              <h5 className="font-20 color-333">20</h5>
                                          </div>
                                          <div className="mr-3">
                                              <label className="font-16 text-muted">S</label>
                                              <h5 className="font-20 color-333">20</h5>
                                          </div>
                                          <div className="mr-3">
                                              <label className="font-16 text-muted">M</label>
                                              <h5 className="font-20 color-333">20</h5>
                                          </div>
                                          <div className="mr-3">
                                              <label className="font-16 text-muted">L</label>
                                              <h5 className="font-20 color-333">20</h5>
                                          </div>
                                          <div className="mr-3">
                                              <label className="font-16 text-muted">XL</label>
                                              <h5 className="font-20 color-333">20</h5>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="features d-flex flex-md-column">
                                      <div className="info-item mt-2">
                                          <label className="font-16 text-muted">(Per Piece)</label>
                                          <h5 className="font-20 color-333 font-weight-bold">$10.57</h5>

                                      </div>
                                      <div className="info-item">
                                          <label className="font-16 text-muted">Total price</label>
                                          <h5 className="font-20 color-333 font-weight-bold">$5285</h5>
                                      </div>
                                  </div>
                              </div>
                          </div>

                      </div>
                  </div>
                  <div className="quote-req-list-container mt-3">
                      <div className="quote-list mb-3 p-4 d-flex justify-content-between align-items-center">
                          <div className="dlt">
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                  <g id="Group_11204" data-name="Group 11204" transform="translate(-1233 -282)">
                                      <rect id="Rectangle_6032" data-name="Rectangle 6032" width="32" height="32" rx="4" transform="translate(1265 282) rotate(90)" fill="rgba(253,39,39,0.05)"/>
                                      <g id="delete" transform="translate(1242.358 289.001)">
                                          <path id="Path_27867" data-name="Path 27867" d="M222.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,222.791,154.7Zm0,0" transform="translate(-213.682 -148.639)" fill="#fd2727"/>
                                          <path id="Path_27868" data-name="Path 27868" d="M104.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,104.791,154.7Zm0,0" transform="translate(-100.308 -148.639)" fill="#fd2727"/>
                                          <path id="Path_27869" data-name="Path 27869" d="M1.11,4.983v9.66a2.163,2.163,0,0,0,.575,1.492,1.931,1.931,0,0,0,1.4.606H10.5a1.93,1.93,0,0,0,1.4-.606,2.163,2.163,0,0,0,.575-1.492V4.983A1.5,1.5,0,0,0,12.1,2.038H10.089v-.49A1.54,1.54,0,0,0,8.536,0H5.055A1.54,1.54,0,0,0,3.5,1.547v.49H1.495A1.5,1.5,0,0,0,1.11,4.983ZM10.5,15.956H3.086a1.242,1.242,0,0,1-1.192-1.313V5.017h9.8v9.625A1.242,1.242,0,0,1,10.5,15.956ZM4.286,1.547A.755.755,0,0,1,5.055.783H8.536a.755.755,0,0,1,.769.765v.49H4.286ZM1.495,2.822H12.1a.706.706,0,0,1,0,1.411H1.495a.706.706,0,0,1,0-1.411Zm0,0" transform="translate(0 0)" fill="#fd2727"/>
                                          <path id="Path_27870" data-name="Path 27870" d="M163.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,163.791,154.7Zm0,0" transform="translate(-156.995 -148.639)" fill="#fd2727"/>
                                      </g>
                                  </g>
                              </svg>
                          </div>
                          <div className="quote-info">
                              <div className="info-right w-100 d-flex justify-content-between">
                                  <div className="features d-flex flex-md-column">
                                      <a href="#"><img src={require('../../assets/images/product.jpg')} alt="" className="radius-3"/></a>
                                  </div>
                                  <div className="features d-flex flex-md-column">
                                      <div className="info-item mt-1 ellipse-2-line product-title">
                                          <a href="#" className="font-weight-bold m-0 font-24 ellipse-2-line">Blue Huddie Long Sleeve Blue</a>
                                          <span className="cat">Men</span>
                                      </div>
                                      <div className="info-item">
                                          <label className="font-16 text-muted">Color</label>
                                          <div className="color-picker">
                                              <ul>
                                                  <li className="d-flex align-items-center">
                                                      <span className="ash"></span>
                                                  </li>
                                              </ul>
                                          </div>
                                      </div>
                                      <div className="info-item">
                                          <label className="font-16 text-muted">Fabric composition</label>
                                          <h5 className="font-20 color-333 font-weight-normal">Cotton 100 GSM</h5>
                                      </div>
                                  </div>

                                  <div className="features d-flex flex-md-column">
                                      <div className="info-item mt-2">
                                          <label className="font-16 text-muted">Quantity</label>
                                          <h5 className="font-20 color-333 font-weight-bold">500 pc</h5>
                                      </div>

                                      <div className="info-item pr-2 d-flex">
                                          <div className="mr-3">
                                              <label className="font-16 text-muted">XS</label>
                                              <h5 className="font-20 color-333">20</h5>
                                          </div>
                                          <div className="mr-3">
                                              <label className="font-16 text-muted">S</label>
                                              <h5 className="font-20 color-333">20</h5>
                                          </div>
                                          <div className="mr-3">
                                              <label className="font-16 text-muted">M</label>
                                              <h5 className="font-20 color-333">20</h5>
                                          </div>
                                          <div className="mr-3">
                                              <label className="font-16 text-muted">L</label>
                                              <h5 className="font-20 color-333">20</h5>
                                          </div>
                                          <div className="mr-3">
                                              <label className="font-16 text-muted">XL</label>
                                              <h5 className="font-20 color-333">20</h5>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="features d-flex flex-md-column">
                                      <div className="info-item mt-2">
                                          <label className="font-16 text-muted">(Per Piece)</label>
                                          <h5 className="font-20 color-333 font-weight-bold">$10.57</h5>

                                      </div>
                                      <div className="info-item">
                                          <label className="font-16 text-muted">Total price</label>
                                          <h5 className="font-20 color-333 font-weight-bold">$5285</h5>
                                      </div>
                                  </div>
                              </div>
                          </div>

                      </div>
                  </div>
                  <div className="quote-req-list-container mt-3">
                      <div className="quote-list mb-3 p-4 d-flex justify-content-between align-items-center">
                          <div className="dlt">
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                  <g id="Group_11204" data-name="Group 11204" transform="translate(-1233 -282)">
                                      <rect id="Rectangle_6032" data-name="Rectangle 6032" width="32" height="32" rx="4" transform="translate(1265 282) rotate(90)" fill="rgba(253,39,39,0.05)"/>
                                      <g id="delete" transform="translate(1242.358 289.001)">
                                          <path id="Path_27867" data-name="Path 27867" d="M222.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,222.791,154.7Zm0,0" transform="translate(-213.682 -148.639)" fill="#fd2727"/>
                                          <path id="Path_27868" data-name="Path 27868" d="M104.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,104.791,154.7Zm0,0" transform="translate(-100.308 -148.639)" fill="#fd2727"/>
                                          <path id="Path_27869" data-name="Path 27869" d="M1.11,4.983v9.66a2.163,2.163,0,0,0,.575,1.492,1.931,1.931,0,0,0,1.4.606H10.5a1.93,1.93,0,0,0,1.4-.606,2.163,2.163,0,0,0,.575-1.492V4.983A1.5,1.5,0,0,0,12.1,2.038H10.089v-.49A1.54,1.54,0,0,0,8.536,0H5.055A1.54,1.54,0,0,0,3.5,1.547v.49H1.495A1.5,1.5,0,0,0,1.11,4.983ZM10.5,15.956H3.086a1.242,1.242,0,0,1-1.192-1.313V5.017h9.8v9.625A1.242,1.242,0,0,1,10.5,15.956ZM4.286,1.547A.755.755,0,0,1,5.055.783H8.536a.755.755,0,0,1,.769.765v.49H4.286ZM1.495,2.822H12.1a.706.706,0,0,1,0,1.411H1.495a.706.706,0,0,1,0-1.411Zm0,0" transform="translate(0 0)" fill="#fd2727"/>
                                          <path id="Path_27870" data-name="Path 27870" d="M163.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,163.791,154.7Zm0,0" transform="translate(-156.995 -148.639)" fill="#fd2727"/>
                                      </g>
                                  </g>
                              </svg>
                          </div>
                          <div className="quote-info">
                              <div className="info-right w-100 d-flex justify-content-between">
                                  <div className="features d-flex flex-md-column">
                                      <a href="#"><img src={require('../../assets/images/product.jpg')} alt="" className="radius-3"/></a>
                                  </div>
                                  <div className="features d-flex flex-md-column">
                                      <div className="info-item mt-1 ellipse-2-line product-title">
                                          <a href="#" className="font-weight-bold m-0 font-24 ellipse-2-line">Blue Huddie Long Sleeve Blue</a>
                                          <span className="cat">Men</span>
                                      </div>
                                      <div className="info-item">
                                          <label className="font-16 text-muted">Color</label>
                                          <div className="color-picker">
                                              <ul>
                                                  <li className="d-flex align-items-center">
                                                      <span className="ash"></span>
                                                  </li>
                                              </ul>
                                          </div>
                                      </div>
                                      <div className="info-item">
                                          <label className="font-16 text-muted">Fabric composition</label>
                                          <h5 className="font-20 color-333 font-weight-normal">Cotton 100 GSM</h5>
                                      </div>
                                  </div>

                                  <div className="features d-flex flex-md-column">
                                      <div className="info-item mt-2">
                                          <label className="font-16 text-muted">Quantity</label>
                                          <h5 className="font-20 color-333 font-weight-bold">500 pc</h5>
                                      </div>

                                      <div className="info-item pr-2 d-flex">
                                          <div className="mr-3">
                                              <label className="font-16 text-muted">XS</label>
                                              <h5 className="font-20 color-333">20</h5>
                                          </div>
                                          <div className="mr-3">
                                              <label className="font-16 text-muted">S</label>
                                              <h5 className="font-20 color-333">20</h5>
                                          </div>
                                          <div className="mr-3">
                                              <label className="font-16 text-muted">M</label>
                                              <h5 className="font-20 color-333">20</h5>
                                          </div>
                                          <div className="mr-3">
                                              <label className="font-16 text-muted">L</label>
                                              <h5 className="font-20 color-333">20</h5>
                                          </div>
                                          <div className="mr-3">
                                              <label className="font-16 text-muted">XL</label>
                                              <h5 className="font-20 color-333">20</h5>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="features d-flex flex-md-column">
                                      <div className="info-item mt-2">
                                          <label className="font-16 text-muted">(Per Piece)</label>
                                          <h5 className="font-20 color-333 font-weight-bold">$10.57</h5>

                                      </div>
                                      <div className="info-item">
                                          <label className="font-16 text-muted">Total price</label>
                                          <h5 className="font-20 color-333 font-weight-bold">$5285</h5>
                                      </div>
                                  </div>
                              </div>
                          </div>

                      </div>
                  </div>
                  <div className="quote-req-list-container mt-3">
                      <div className="quote-list mb-3 p-4 d-flex justify-content-between align-items-center">
                          <div className="dlt">
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                  <g id="Group_11204" data-name="Group 11204" transform="translate(-1233 -282)">
                                      <rect id="Rectangle_6032" data-name="Rectangle 6032" width="32" height="32" rx="4" transform="translate(1265 282) rotate(90)" fill="rgba(253,39,39,0.05)"/>
                                      <g id="delete" transform="translate(1242.358 289.001)">
                                          <path id="Path_27867" data-name="Path 27867" d="M222.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,222.791,154.7Zm0,0" transform="translate(-213.682 -148.639)" fill="#fd2727"/>
                                          <path id="Path_27868" data-name="Path 27868" d="M104.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,104.791,154.7Zm0,0" transform="translate(-100.308 -148.639)" fill="#fd2727"/>
                                          <path id="Path_27869" data-name="Path 27869" d="M1.11,4.983v9.66a2.163,2.163,0,0,0,.575,1.492,1.931,1.931,0,0,0,1.4.606H10.5a1.93,1.93,0,0,0,1.4-.606,2.163,2.163,0,0,0,.575-1.492V4.983A1.5,1.5,0,0,0,12.1,2.038H10.089v-.49A1.54,1.54,0,0,0,8.536,0H5.055A1.54,1.54,0,0,0,3.5,1.547v.49H1.495A1.5,1.5,0,0,0,1.11,4.983ZM10.5,15.956H3.086a1.242,1.242,0,0,1-1.192-1.313V5.017h9.8v9.625A1.242,1.242,0,0,1,10.5,15.956ZM4.286,1.547A.755.755,0,0,1,5.055.783H8.536a.755.755,0,0,1,.769.765v.49H4.286ZM1.495,2.822H12.1a.706.706,0,0,1,0,1.411H1.495a.706.706,0,0,1,0-1.411Zm0,0" transform="translate(0 0)" fill="#fd2727"/>
                                          <path id="Path_27870" data-name="Path 27870" d="M163.791,154.7a.392.392,0,0,0-.392.392v7.41a.392.392,0,0,0,.784,0V155.1A.392.392,0,0,0,163.791,154.7Zm0,0" transform="translate(-156.995 -148.639)" fill="#fd2727"/>
                                      </g>
                                  </g>
                              </svg>
                          </div>
                          <div className="quote-info">
                              <div className="info-right w-100 d-flex justify-content-between">
                                  <div className="features d-flex flex-md-column">
                                      <a href="#"><img src={require('../../assets/images/product.jpg')} alt="" className="radius-3"/></a>
                                  </div>
                                  <div className="features d-flex flex-md-column">
                                      <div className="info-item mt-1 ellipse-2-line product-title">
                                          <a href="#" className="font-weight-bold m-0 font-24 ellipse-2-line">Blue Huddie Long Sleeve Blue</a>
                                          <span className="cat">Men</span>
                                      </div>
                                      <div className="info-item">
                                          <label className="font-16 text-muted">Color</label>
                                          <div className="color-picker">
                                              <ul>
                                                  <li className="d-flex align-items-center">
                                                      <span className="ash"></span>
                                                  </li>
                                              </ul>
                                          </div>
                                      </div>
                                      <div className="info-item">
                                          <label className="font-16 text-muted">Fabric composition</label>
                                          <h5 className="font-20 color-333 font-weight-normal">Cotton 100 GSM</h5>
                                      </div>
                                  </div>

                                  <div className="features d-flex flex-md-column">
                                      <div className="info-item mt-2">
                                          <label className="font-16 text-muted">Quantity</label>
                                          <h5 className="font-20 color-333 font-weight-bold">500 pc</h5>
                                      </div>

                                      <div className="info-item pr-2 d-flex">
                                          <div className="mr-3">
                                              <label className="font-16 text-muted">XS</label>
                                              <h5 className="font-20 color-333">20</h5>
                                          </div>
                                          <div className="mr-3">
                                              <label className="font-16 text-muted">S</label>
                                              <h5 className="font-20 color-333">20</h5>
                                          </div>
                                          <div className="mr-3">
                                              <label className="font-16 text-muted">M</label>
                                              <h5 className="font-20 color-333">20</h5>
                                          </div>
                                          <div className="mr-3">
                                              <label className="font-16 text-muted">L</label>
                                              <h5 className="font-20 color-333">20</h5>
                                          </div>
                                          <div className="mr-3">
                                              <label className="font-16 text-muted">XL</label>
                                              <h5 className="font-20 color-333">20</h5>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="features d-flex flex-md-column">
                                      <div className="info-item mt-2">
                                          <label className="font-16 text-muted">(Per Piece)</label>
                                          <h5 className="font-20 color-333 font-weight-bold">$10.57</h5>

                                      </div>
                                      <div className="info-item">
                                          <label className="font-16 text-muted">Total price</label>
                                          <h5 className="font-20 color-333 font-weight-bold">$5285</h5>
                                      </div>
                                  </div>
                              </div>
                          </div>

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
                      <h4 className="mb-4 font-weight-normal color-333 font-22">Invoice No:  <strong>IVN234567</strong></h4>
                      <div className="ordered-container">
                          <div className="mb-2 font-weight-normal color-333 font-18 d-flex align-items-center justify-content-between">
                              Nitex Demo-002
                              <strong className="font-weight-bold font-24">$5285</strong>
                          </div>
                          <div className="mb-2 font-weight-normal color-333 font-18 d-flex align-items-center justify-content-between">
                              Nitex Demo-002
                              <strong className="font-weight-bold font-24">$5285</strong>
                          </div>
                          <div className="mb-2 font-weight-normal color-333 font-18 d-flex align-items-center justify-content-between">
                              Nitex Demo-002
                              <strong className="font-weight-bold font-24">$5285</strong>
                          </div>

                          <div className="sub-total pt-2 mt-4 border-top">
                              <div className="mb-2 font-weight-normal color-333 font-18 d-flex align-items-center justify-content-between">
                                  Sub total
                                  <strong className="font-weight-bold font-24">$5285</strong>
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
                                  <strong className="font-weight-bold font-24">$5285</strong>
                              </div>
                          </div>

                          <div className="submit-for-payment d-flex flex-column align-items-center justify-content-center">
                              <button className="btn-brand brand-bg-color shadow m-0 mt-5">Submit for payment</button>
                              <a href="#" className="text-underline font-16">Save the order</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateOrder);
