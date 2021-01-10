import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import $ from "jquery";
import loadjs from "loadjs";
import Carousel from 'react-elastic-carousel';
import LoadingOverlay from 'react-loading-overlay';

import Http from '../../services/Http';
import { toastSuccess, toastError, toastWarning } from '../../commonComponents/Toast';
import ProductCard from '../../commonComponents/ProductCard';
import ProductCardWithTick from '../../commonComponents/ProductCardWithTick';
import {ProductSkeleton, CreateSkeletons} from '../../commonComponents/ProductSkeleton';

import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';
import { _getKey, formatProductTypeWithGroup } from '../../services/Util';
import {_storeData} from './actions';

class QuoteNowCart extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loading : false,
          designList : [],
          page : 0,
          size : 20,
          search : '',
          hasNext : true, //to check if pagination is available or not
          height: window.innerHeight,
        };
    }

    handleScroll = async() => {
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        let { hasNext, page, loading, designList, size } = this.state
        console.log("message",'bottom reached',hasNext, page, loading)
        if(hasNext && !loading && designList.length){
          let data = await this.renderList(page+1)
          if(data.length>0){
            await this.setState({
              designList : [ ...designList, ...data ],
              page : page+1,
              hasNext : data.length === size ? true : false,
              loading:false
            })
            this.updateProductCard()
          }else{
            this.setState({
              // designList : [],
              hasNext : false,
              loading:false
            })
            // toastWarning("Product List - no data found.");
          }
        }else if(designList.length){
          if(!hasNext){
            // toastWarning("No more data found.")
          }
        }
        // this.setState({
        //     message: 'bottom reached'
        // });
      } else {

        }
    }

    componentDidMount = async() => {
      // document.title = "Explore designs - Nitex - The easiest clothing manufacturing software";
      window.addEventListener("scroll", this.handleScroll);
      // this.setState({loading: true});
      // this.renderList();
    }

    renderList = async(page = 0) => {
      this.setState({loading:true, searching: true})
      let { size, designList, search, sort, productTypeId, filters } = this.state;
      let params = `?page=${page}&size=${size}&searchText=${search}`;
      let result = [];
      await Http.GET('getPickDesign',params)
        .then(({data}) => {
          console.log('PRODUCT LIST SUCCESS: ', data);
          this.setState({loading:false})
          if(data.length>0){
            result = data;
          }
        })
        .catch(response => {
            console.log('PRODUCT LIST ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            toastError("Something went wrong! Please try again.");
        });
        return result;
    }

    onChange = async(e) => {
      this.setState({
        [e.target.name] : e.target.value,
      })
    }

    updateProductCard = () => {

    }

    render() {
        let { designList, groupwiseProductList, search, productTypeId, sort, showFilters, landingData, filterOptions, filters, searching, showSuggestions, suggestions } = this.state;
        return (
          <div className="add-quote d-flex">
              <div className="confirm-quote-request">
                  <div className="header-title d-flex justify-content-between align-items-center">
                      <a href="#">
                          <h3 className="text-black">
                              <svg xmlns="http://www.w3.org/2000/svg" width="13.903" height="25.806" viewBox="0 0 13.903 25.806" className="mr-4">
                                  <path id="Path_27864" data-name="Path 27864" d="M3768.991,1419.1l-11.489-11.489,11.489-11.489" transform="translate(-3756.502 -1394.708)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                              </svg>
                              Confirm quote request
                          </h3>
                      </a>
                      <div className="add-more-design font-14 brand-color text-underline d-block d-xl-none cursor-pointer">Add more designs</div>
                  </div>
                  <div className="mt-3">
                      <input type="text" placeholder="Demo Collection name" className="w-100 bg-gray-light"/>
                  </div>
                  <div className="quote-req-list-container mt-3">

                      <div className="quote-list mb-3 d-flex justify-content-between align-items-center">

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

                          <div className="quote-info d-flex">
                              <a href="#"><img src={require('../../assets/images/product.jpg')} alt="" className="radius-3"/></a>
                              <div className="info-right ml-4">
                                  <a href="#" className="font-weight-bold m-0 mt-2 font-24 ellipse-2-line">Blue Huddie Long Sleeve</a>
                                  <div className="features d-flex flex-column flex-sm-row">
                                      <div className="info-item mr-5">
                                          <label className="font-14 text-muted">Product category</label>
                                          <h5 className="font-16 color-333">Top, Men</h5>
                                      </div>
                                      <div className="info-item">
                                          <label className="font-14 text-muted">MOQ</label>
                                          <h5 className="font-16 color-333">500 pcs</h5>
                                      </div>
                                  </div>
                                  <div className="features d-flex flex-column flex-sm-row">
                                      <div className="info-item mr-5">
                                          <label className="font-14 text-muted">Fabric details</label>
                                          <h5 className="font-16 color-333">Cotton <span className="brand-color ml-3">100 GSM</span></h5>
                                      </div>
                                      <div className="info-item">
                                          <label className="font-14 text-muted">Delivery in</label>
                                          <h5 className="font-16 color-333">16 Days</h5>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="sizes d-flex  align-items-center">
                              <div className="size">
                                  <label className="text-center">XS</label>
                                  <input type="text" placeholder="00" className="bg-gray-light"/>
                              </div>
                              <div className="size">
                                  <label className="text-center">S</label>
                                  <input type="text" placeholder="00" className="bg-gray-light"/>
                              </div>
                              <div className="size">
                                  <label className="text-center">M</label>
                                  <input type="text" placeholder="00" className="bg-gray-light"/>
                              </div>
                              <div className="size">
                                  <label className="text-center">L</label>
                                  <input type="text" placeholder="00" className="bg-gray-light"/>
                              </div>
                              <div className="size">
                                  <label className="text-center">XL</label>
                                  <input type="text" placeholder="00" className="bg-gray-light"/>
                              </div>
                              <div className="size total">
                                  <label className="text-right">Total</label>
                                  <input type="text" placeholder="00" className="bg-blue-light"/>
                              </div>
                          </div>
                      </div>

                      <div className="quote-list mb-3 d-flex justify-content-between align-items-center">

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

                          <div className="quote-info d-flex">
                              <a href="#"><img src={require('../../assets/images/product.jpg')} alt="" className="radius-3"/></a>
                              <div className="info-right ml-4">
                                  <a href="#" className="font-weight-bold m-0 mt-2 font-24 ellipse-2-line">Blue Huddie Long Sleeve</a>
                                  <div className="features d-flex flex-column flex-sm-row">
                                      <div className="info-item mr-5">
                                          <label className="font-14 text-muted">Product category</label>
                                          <h5 className="font-16 color-333">Top, Men</h5>
                                      </div>
                                      <div className="info-item">
                                          <label className="font-14 text-muted">MOQ</label>
                                          <h5 className="font-16 color-333">500 pcs</h5>
                                      </div>
                                  </div>
                                  <div className="features d-flex flex-column flex-sm-row">
                                      <div className="info-item mr-5">
                                          <label className="font-14 text-muted">Fabric details</label>
                                          <h5 className="font-16 color-333">Cotton <span className="brand-color ml-3">100 GSM</span></h5>
                                      </div>
                                      <div className="info-item">
                                          <label className="font-14 text-muted">Delivery in</label>
                                          <h5 className="font-16 color-333">16 Days</h5>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="sizes d-flex  align-items-center">
                              <div className="size">
                                  <label className="text-center">XS</label>
                                  <input type="text" placeholder="00" className="bg-gray-light"/>
                              </div>
                              <div className="size">
                                  <label className="text-center">S</label>
                                  <input type="text" placeholder="00" className="bg-gray-light"/>
                              </div>
                              <div className="size">
                                  <label className="text-center">M</label>
                                  <input type="text" placeholder="00" className="bg-gray-light"/>
                              </div>
                              <div className="size">
                                  <label className="text-center">L</label>
                                  <input type="text" placeholder="00" className="bg-gray-light"/>
                              </div>
                              <div className="size">
                                  <label className="text-center">XL</label>
                                  <input type="text" placeholder="00" className="bg-gray-light"/>
                              </div>
                              <div className="size total">
                                  <label className="text-right">Total</label>
                                  <input type="text" placeholder="00" className="bg-blue-light"/>
                              </div>
                          </div>
                      </div>

                      <div className="quote-list mb-3 d-flex justify-content-between align-items-center">

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

                          <div className="quote-info d-flex">
                              <a href="#"><img src={require('../../assets/images/product.jpg')} alt="" className="radius-3"/></a>
                              <div className="info-right ml-4">
                                  <a href="#" className="font-weight-bold m-0 mt-2 font-24 ellipse-2-line">Blue Huddie Long Sleeve</a>
                                  <div className="features d-flex flex-column flex-sm-row">
                                      <div className="info-item mr-5">
                                          <label className="font-14 text-muted">Product category</label>
                                          <h5 className="font-16 color-333">Top, Men</h5>
                                      </div>
                                      <div className="info-item">
                                          <label className="font-14 text-muted">MOQ</label>
                                          <h5 className="font-16 color-333">500 pcs</h5>
                                      </div>
                                  </div>
                                  <div className="features d-flex flex-column flex-sm-row">
                                      <div className="info-item mr-5">
                                          <label className="font-14 text-muted">Fabric details</label>
                                          <h5 className="font-16 color-333">Cotton <span className="brand-color ml-3">100 GSM</span></h5>
                                      </div>
                                      <div className="info-item">
                                          <label className="font-14 text-muted">Delivery in</label>
                                          <h5 className="font-16 color-333">16 Days</h5>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="sizes d-flex  align-items-center">
                              <div className="size">
                                  <label className="text-center">XS</label>
                                  <input type="text" placeholder="00" className="bg-gray-light"/>
                              </div>
                              <div className="size">
                                  <label className="text-center">S</label>
                                  <input type="text" placeholder="00" className="bg-gray-light"/>
                              </div>
                              <div className="size">
                                  <label className="text-center">M</label>
                                  <input type="text" placeholder="00" className="bg-gray-light"/>
                              </div>
                              <div className="size">
                                  <label className="text-center">L</label>
                                  <input type="text" placeholder="00" className="bg-gray-light"/>
                              </div>
                              <div className="size">
                                  <label className="text-center">XL</label>
                                  <input type="text" placeholder="00" className="bg-gray-light"/>
                              </div>
                              <div className="size total">
                                  <label className="text-right">Total</label>
                                  <input type="text" placeholder="00" className="bg-blue-light"/>
                              </div>
                          </div>
                      </div>

                      <button className="m-0 btn-brand  shadow float-right">Submit to quote</button>
                  </div>
              </div>


              <div className="add-more ml-auto custom-scrollbar">
                  <div id="closeRPop" className="p-3 cursor-pointer d-inline-block d-xl-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20.941" height="20.941" viewBox="0 0 20.941 20.941">
                          <g id="Group_11190" data-name="Group 11190" transform="translate(1110.29 4909.059)">
                              <line id="Line_153" data-name="Line 153" x2="25.615" transform="translate(-1108.875 -4907.645) rotate(45)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-width="2"/>
                              <line id="Line_154" data-name="Line 154" x2="25.615" transform="translate(-1090.763 -4907.645) rotate(135)" fill="none" stroke="#21242b" stroke-linecap="round" stroke-width="2"/>
                          </g>
                      </svg>
                  </div>
                  <div className="header d-flex justify-content-between align-items-center">
                      <h4>Add more designs to quote</h4>
                      <div>
                          <div className="cursor-pointer d-inline-block mr-4">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24.877" height="27.209" viewBox="0 0 24.877 27.209">
                                  <g id="reload" transform="translate(-20.982 0)">
                                      <g id="Group_11184" data-name="Group 11184" transform="translate(20.982 0)">
                                          <path id="Path_27871" data-name="Path 27871" d="M26.048,5.4a10.847,10.847,0,0,1,14.1-.372l-3.228.122a.75.75,0,0,0,.028,1.5h.028l4.956-.183a.749.749,0,0,0,.722-.75V5.623h0l-.183-4.9a.751.751,0,0,0-1.5.056l.117,3.073a12.337,12.337,0,0,0-16.046.433,12.341,12.341,0,0,0-3.712,12.062.747.747,0,0,0,.728.572.65.65,0,0,0,.178-.022.751.751,0,0,0,.55-.906A10.84,10.84,0,0,1,26.048,5.4Z" transform="translate(-20.982 0)" fill="#41487c"/>
                                          <path id="Path_27872" data-name="Path 27872" d="M98.7,185.786a.749.749,0,1,0-1.456.356,10.839,10.839,0,0,1-17.452,10.9l3.267-.294a.751.751,0,0,0-.139-1.495l-4.939.444a.749.749,0,0,0-.678.817l.444,4.939a.749.749,0,0,0,.745.683.27.27,0,0,0,.067-.006.749.749,0,0,0,.678-.817l-.267-3.006a12.254,12.254,0,0,0,7.129,2.717c.211.011.422.017.628.017A12.339,12.339,0,0,0,98.7,185.786Z" transform="translate(-74.167 -174.923)" fill="#41487c"/>
                                      </g>
                                  </g>
                              </svg>
                          </div>
                          <div className="cursor-pointer d-inline-block">
                              <svg xmlns="http://www.w3.org/2000/svg" width="27.615" height="27.615" viewBox="0 0 27.615 27.615">
                                  <g id="Group_11190" data-name="Group 11190" transform="translate(-2672.328 4255.322) rotate(45)">
                                      <line id="Line_153" data-name="Line 153" x2="25.615" transform="translate(-1108.875 -4907.645) rotate(45)" fill="none" stroke="#41487c" stroke-linecap="round" stroke-width="2"/>
                                      <line id="Line_154" data-name="Line 154" x2="25.615" transform="translate(-1090.763 -4907.645) rotate(135)" fill="none" stroke="#41487c" stroke-linecap="round" stroke-width="2"/>
                                  </g>
                              </svg>
                          </div>
                      </div>
                  </div>

                  <div className="added-item">

                      <div className="quote-list mb-3 d-flex justify-content-between align-items-center">
                          <div className="quote-info d-flex justify-content-between w-100">
                              <a href="#"><a href="#"><img src={require('../../assets/images/product.jpg')} alt="" className="radius-3"/></a></a>
                              <div className="info-right ml-3">
                                  <a href="#" className="semibold m-0 mt-1 font-18">Blue Huddie Long Sleeve</a>
                                  <div className="d-flex flex-column flex-sm-row">
                                      <div className="info-item mr-5">
                                          <label className="font-14 text-muted">Product category</label>
                                          <h5 className="font-16 color-333">Top, Men</h5>
                                      </div>
                                      <div className="info-item">
                                          <label className="font-14 text-muted">MOQ</label>
                                          <h5 className="font-16 color-333">500 pcs</h5>
                                      </div>
                                  </div>
                                  <div className="d-flex flex-column flex-sm-row">
                                      <div className="info-item mr-5">
                                          <label className="font-14 text-muted">Fabric details</label>
                                          <h5 className="font-16 color-333">Cotton <span className="brand-color ml-3">100 GSM</span></h5>
                                      </div>
                                      <div className="info-item">
                                          <label className="font-14 text-muted">Delivery in</label>
                                          <h5 className="font-16 color-333">16 Days</h5>
                                      </div>
                                  </div>
                                  <button className="btn-border mt-4">Add to quote</button>
                              </div>
                          </div>
                      </div>

                      <div className="quote-list mb-3 d-flex justify-content-between align-items-center">
                          <div className="quote-info d-flex justify-content-between w-100">
                              <a href="#"><img src={require('../../assets/images/product.jpg')} alt="" className="radius-3"/></a>
                              <div className="info-right ml-3">
                                  <a href="#" className="semibold m-0 mt-1 font-18">Blue Huddie Long Sleeve</a>
                                  <div className="d-flex flex-column flex-sm-row">
                                      <div className="info-item mr-5">
                                          <label className="font-14 text-muted">Product category</label>
                                          <h5 className="font-16 color-333">Top, Men</h5>
                                      </div>
                                      <div className="info-item">
                                          <label className="font-14 text-muted">MOQ</label>
                                          <h5 className="font-16 color-333">500 pcs</h5>
                                      </div>
                                  </div>
                                  <div className="d-flex flex-column flex-sm-row">
                                      <div className="info-item mr-5">
                                          <label className="font-14 text-muted">Fabric details</label>
                                          <h5 className="font-16 color-333">Cotton <span className="brand-color ml-3">100 GSM</span></h5>
                                      </div>
                                      <div className="info-item">
                                          <label className="font-14 text-muted">Delivery in</label>
                                          <h5 className="font-16 color-333">16 Days</h5>
                                      </div>
                                  </div>
                                  <button className="btn-border mt-4">Add to quote</button>
                              </div>
                          </div>
                      </div>

                      <div className="quote-list mb-3 d-flex justify-content-between align-items-center">
                          <div className="quote-info d-flex justify-content-between w-100">
                              <a href="#"><img src={require('../../assets/images/product.jpg')} alt="" className="radius-3"/></a>
                              <div className="info-right ml-3">
                                  <a href="#" className="semibold m-0 mt-1 font-18">Blue Huddie Long Sleeve</a>
                                  <div className="d-flex flex-column flex-sm-row">
                                      <div className="info-item mr-5">
                                          <label className="font-14 text-muted">Product category</label>
                                          <h5 className="font-16 color-333">Top, Men</h5>
                                      </div>
                                      <div className="info-item">
                                          <label className="font-14 text-muted">MOQ</label>
                                          <h5 className="font-16 color-333">500 pcs</h5>
                                      </div>
                                  </div>
                                  <div className="d-flex flex-column flex-sm-row">
                                      <div className="info-item mr-5">
                                          <label className="font-14 text-muted">Fabric details</label>
                                          <h5 className="font-16 color-333">Cotton <span className="brand-color ml-3">100 GSM</span></h5>
                                      </div>
                                      <div className="info-item">
                                          <label className="font-14 text-muted">Delivery in</label>
                                          <h5 className="font-16 color-333">16 Days</h5>
                                      </div>
                                  </div>
                                  <button className="btn-border mt-4">Add to quote</button>
                              </div>
                          </div>
                      </div>

                      <div className="quote-list mb-3 d-flex justify-content-between align-items-center">
                          <div className="quote-info d-flex justify-content-between w-100">
                              <a href="#"><img src={require('../../assets/images/product.jpg')} alt="" className="radius-3"/></a>
                              <div className="info-right ml-3">
                                  <a href="#" className="semibold m-0 mt-1 font-18">Blue Huddie Long Sleeve</a>
                                  <div className="d-flex flex-column flex-sm-row">
                                      <div className="info-item mr-5">
                                          <label className="font-14 text-muted">Product category</label>
                                          <h5 className="font-16 color-333">Top, Men</h5>
                                      </div>
                                      <div className="info-item">
                                          <label className="font-14 text-muted">MOQ</label>
                                          <h5 className="font-16 color-333">500 pcs</h5>
                                      </div>
                                  </div>
                                  <div className="d-flex flex-column flex-sm-row">
                                      <div className="info-item mr-5">
                                          <label className="font-14 text-muted">Fabric details</label>
                                          <h5 className="font-16 color-333">Cotton <span className="brand-color ml-3">100 GSM</span></h5>
                                      </div>
                                      <div className="info-item">
                                          <label className="font-14 text-muted">Delivery in</label>
                                          <h5 className="font-16 color-333">16 Days</h5>
                                      </div>
                                  </div>
                                  <button className="btn-border mt-4">Add to quote</button>
                              </div>
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
    selectedProductIds: store.product.selectedProductIds
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
      _storeData
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(QuoteNowCart);
