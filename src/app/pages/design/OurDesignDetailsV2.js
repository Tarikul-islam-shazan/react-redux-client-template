import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from 'loadjs';
import LoadingOverlay from 'react-loading-overlay';
import Slider from 'react-slick';
import ImageViewer from 'react-simple-image-viewer';

import Http from '../../services/Http';
import { toastSuccess, toastError } from '../../commonComponents/Toast';
import { _storeData } from "../design/actions";

import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';
import { MeasurementTable } from './components/MeasurementTable'
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';
import { productAvailabilityStatus, addImageSuffix } from '../../services/Util';

import {ProductThumbsSkeleton, ProductHeroImageSkeleton, ProductDetailsSkeleton} from '../../commonComponents/ProductSkeleton';
import {ProductDetailsImgThumb} from '../../commonComponents/ProductDetailsImgThumb'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class OurDesignDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
          product : {},
          loading : false,
          selectedImage : '',
          imageViewerFlag : false,
          imageViewerData : [],
          imageViewerCurrentIndex : 0,
        };
    }

    componentDidMount = async() => {
      document.title = "Product details on Nitex - The easiest clothing manufacturing software";
      let id = this.props.match.params.id;
      // loadjs(['/js/design-details.js']);
      this.setState({
        loading : true
      })
      let selectedImage = '';
      let flag = 1;

      await Http.GET('getProductDetails',id)
        .then(({data}) => {
          console.log('getProductDetails SUCCESS: ', data);
          if(data){
            document.title = data.name;
            data.documentResponseList.map((doc,i) => {
              if(doc.docType=='PRODUCT_DESIGN' && flag){
                flag = 0;
                selectedImage = doc.docUrl;
              }
              if(data.documentResponseList.length==i+1 && flag){
                  selectedImage = data.documentResponseList[0].docUrl;
              }
            })
            this.setState({
              loading:false,
              product : data,
              selectedImage
            })
          }else{
            this.setState({loading:false})
            // toastError(data.message);
          }
          // loadjs(['/js/script.js','/js/custom.js']);
        })
        .catch(({response}) => {
            console.log('PRODUCT LIST ERROR: ', JSON.stringify(response));
            this.setState({loading:false})
            if(response && response.data && response.data.message){
              toastError(response.data.message);
            }else{
              toastError("Something went wrong! Please try again.");
            }
        });
    }

    getImageByType = (typeList = ['PRODUCT_DESIGN', 'REFERENCE_IMAGE'], included = true) => {
      let {product} = this.state;
      let result = [];
      if (product.documentResponseList) {
        product.documentResponseList.map((doc) => {
          if (included) {
            if (typeList.includes(doc.docType)) {
              result.push(doc);
            }
          }
          if (!included) {
            if (!typeList.includes(doc.docType)) {
              result.push(doc);
            }
          }
        });
        return result;
      }
      return [];
    }

    renderSizes = () => {
      let {product} = this.state;
      let result = '';
      if (product.sizeTable && product.sizeTable.sizeTableRows && product.sizeTable.sizeTableRows.length) {
        product.sizeTable.sizeTableRows.map((sizeObj, i) => {
          result += sizeObj.code + ((i !== product.sizeTable.sizeTableRows.length - 1) ? ' / ' : '');
        })
      }
      return result;
    }

    setSelectedImage = async(index) => {
      let { product } = this.state;
      await this.setState({
              selectedImage : product.documentResponseList[index].docUrl
            })
      // loadjs(['/js/design-details.js']);
    }

    showImageViewer = (docs,index) => {
      this.setState({
        imageViewerFlag : true,
        imageViewerCurrentIndex : index,
        imageViewerData : docs.map((item)=>(item.docUrl))
      })
    }

    goTo = (index) => {
      this.sliderMain.slickGoTo(index);
      this.sliderNav.slickGoTo(index);
    }

    render() {
        let { product , selectedImage, loading, imageViewerFlag, imageViewerData, imageViewerCurrentIndex } = this.state;

        const settingsSliderMain = {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            // asNavFor: '.slider-nav',
            beforeChange: (prev, next) => {this.sliderNav.slickGoTo(next);}
        };
        const settingsSliderNav = {
            slidesToShow: 6,
            slidesToScroll: 1,
            vertical:true,
            // asNavFor: '.slider-for',
            dots: false,
            focusOnSelect: true,
            verticalSwiping:true,
            arrows: false,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        vertical: false,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        vertical: false,
                    }
                },
                {
                    breakpoint: 580,
                    settings: {
                        vertical: false,
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 380,
                    settings: {
                        vertical: false,
                        slidesToShow: 2,
                    }
                }
            ]
        };
        return (
          <div className="product-details-slider-container">
          {
            imageViewerFlag && (
              <ImageViewer
                backgroundStyle={{backgroundColor:'rgba(0,0,0,.5)', zIndex:999}}
                src={ imageViewerData }
                currentIndex={ imageViewerCurrentIndex }
                onClose={ () => {
                  this.setState({
                    imageViewerFlag : false,
                    imageViewerCurrentIndex : 0
                  })
                } }
              />
            )
          }
              <div className="row">
                  <div className="col-lg-7">
                      <div className="product-detail-gallery sticky-96">
                          <div className="thumbnail-prev">
                              <section className="banner-section">
                                      <div className="vehicle-detail-banner banner-content clearfix">
                                          <div className="banner-slider">
                                              {/*<div className="slider slider-nav thumb-image">*/}
                                              <Slider ref={slider => (this.sliderNav = slider)} {...settingsSliderNav} className="slider slider-nav thumb-image">
                                              {
                                                this.getImageByType().map((item, i) => {
                                                  return(
                                                    <a href="#" onClick={() => this.goTo(i)} className="thumbnail-image" key={i}>
                                                        <div className="thumbImg">
                                                            <img src={item.docUrl} alt={item.name}/>
                                                        </div>
                                                    </a>
                                                  )
                                                })
                                              }
                                              </Slider>
                                              {/*</div>*/}

                                              <Slider ref={slider => (this.sliderMain = slider)} {...settingsSliderMain} className="slider slider-for">
                                              {/*<div className="slider slider-for">*/}
                                              {
                                                this.getImageByType().map((item, i) => {
                                                  return(
                                                    <div className="slider-banner-image" key={i}>
                                                        <a className="item-slick" onClick={() => this.showImageViewer(this.getImageByType(), i)}>
                                                            <img src={item.docUrl} alt={item.name}/>
                                                        </a>
                                                    </div>
                                                  )
                                                })
                                              }
                                              {/*</div>*/}
                                              </Slider>
                                          </div>
                                      </div>
                              </section>
                          </div>
                      </div>

                  </div>
                  <div className="col-lg-5">
                      <div className="produt-details-description explore-product-details-info">
                          <div className="head-title">
                              <h3 className="text-uppercase font-26">{product.name}</h3>
                          </div>
                          {productAvailabilityStatus(product)}
                          <div className="d-flex flex-column flex-sm-row">
                              <div className="info-item mr-5">
                                  <label className="font-14 text-muted">Product type</label>
                                  <h5 className="font-16 color-333">{product.productType ? product.productType.name : ''}</h5>
                              </div>
                              <div className="info-item">
                                  <label className="font-14 text-muted">Fabric details</label>
                                  <h5 className="font-16 color-333">{product.fabricComposition}</h5>
                              </div>
                          </div>

                          <div className="info-item">
                              <div className="d-flex align-items-center mb-3">
                                  <label className="w-auto m-0">Default sizes</label>
                                  <a href="javascript:void(0)">
                                      <span className="font-14 brand-color ml-3" data-toggle="modal" data-target="#Mchart">Measurement Guide</span>
                                  </a>
                              </div>
                              <span className="font-16 color-333 text-uppercase">
                              {
                                this.renderSizes()
                              }
                              </span>
                          </div>

                          <div className="info-item">
                              <div className="d-flex align-items-center mb-3">
                                  <label className="w-auto m-0">Color</label>
                              </div>
                              <div className="color-picker">
                                  <ul>
                                  {
                                    product.colorResponseList && product.colorResponseList.length ?
                                    product.colorResponseList.map((color) => {
                                      return(
                                        <li className="d-flex align-items-center">
                                            <span style={{backgroundColor: color.hexCode}}></span>
                                            <div className="font-18 color-333 ml-2">{color.name}</div>
                                        </li>
                                      )
                                    }) : <></>
                                  }
                                  </ul>
                              </div>
                          </div>
                          {
                            this.getImageByType(['EMBELISHMENT', 'PRINT_DESIGN', 'EMBROIDERY_DESIGN']).length ?
                            <div className="info-item">
                                <label className="font-14 text-muted mb-3">Embellishment</label>
                                <div className="d-flex">
                                {
                                  this.getImageByType(['EMBELISHMENT', 'PRINT_DESIGN', 'EMBROIDERY_DESIGN']).map((item, i) => {
                                    return(
                                      <ProductDetailsImgThumb key={i} docs={this.getImageByType(['EMBELISHMENT', 'PRINT_DESIGN', 'EMBROIDERY_DESIGN'])} item={item} index={i} showGallery={this.showImageViewer}/>
                                    )
                                  })
                                }
                                </div>
                            </div> : <></>
                          }

                          {
                            this.getImageByType(['ACCESSORIES_DESIGN']).length ?
                            <div className="info-item">
                                <label className="font-14 text-muted mb-3">Accessories</label>
                                <div className="d-flex">
                                {
                                  this.getImageByType(['ACCESSORIES_DESIGN']).map((item, i) => {
                                    return(
                                      <ProductDetailsImgThumb key={i} item={item} docs={this.getImageByType(['ACCESSORIES_DESIGN'])} index={i} showGallery={this.showImageViewer}/>
                                    )
                                  })
                                }
                                </div>
                            </div> : <></>
                          }

                          {
                            this.getImageByType(['PRODUCT_DESIGN', 'REFERENCE_IMAGE', 'EMBELISHMENT', 'PRINT_DESIGN', 'EMBROIDERY_DESIGN'], false).length ?
                            <div className="info-item">
                                <label className="font-14 text-muted mb-3">Other</label>
                                <div className="d-flex">
                                {
                                  this.getImageByType(['PRODUCT_DESIGN', 'REFERENCE_IMAGE', 'EMBELISHMENT', 'PRINT_DESIGN', 'EMBROIDERY_DESIGN', 'ACCESSORIES_DESIGN'], false).map((item, i) => {
                                    return(
                                      <ProductDetailsImgThumb key={i} item={item} docs={this.getImageByType(['PRODUCT_DESIGN', 'REFERENCE_IMAGE', 'EMBELISHMENT', 'PRINT_DESIGN', 'EMBROIDERY_DESIGN'], false)} index={i} showGallery={this.showImageViewer}/>
                                    )
                                  })
                                }
                                </div>
                            </div> : <></>
                          }

                          <div className="info-item">
                              <label className="font-14 text-muted mb-3">Minimum order quantity</label>
                              <h5 className="font-16 font-weight-bold">Starts from 50 pcs (up to 12000)
                                  <span className="ml-2" title="info.........">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16.091" height="16.091" viewBox="0 0 16.091 16.091">
                                        <path id="information" d="M8.045,0a8.045,8.045,0,1,0,8.045,8.045A8.055,8.055,0,0,0,8.045,0Zm.523,12.819c-.382.064-1.143.223-1.529.255a.941.941,0,0,1-.823-.429,1,1,0,0,1-.122-.921L7.615,7.543H6.034A1.89,1.89,0,0,1,7.522,5.785a5.822,5.822,0,0,1,1.529-.253,1.213,1.213,0,0,1,.823.429A1,1,0,0,1,10,6.881L8.476,11.062h1.581a1.78,1.78,0,0,1-1.488,1.756Zm.482-7.791a1.006,1.006,0,1,1,1.006-1.006A1.006,1.006,0,0,1,9.051,5.028Z" fill="#8f95a2"/>
                                      </svg>
                                  </span>
                              </h5>
                          </div>
                          <div className="info-item">
                              <label className="font-14 text-muted mb-3">Turn around time</label>
                              <h5 className="font-16 font-weight-bold">As fast as 12 days
                                  <span className="ml-2" title="info.........">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16.091" height="16.091" viewBox="0 0 16.091 16.091">
                                        <path id="information" d="M8.045,0a8.045,8.045,0,1,0,8.045,8.045A8.055,8.055,0,0,0,8.045,0Zm.523,12.819c-.382.064-1.143.223-1.529.255a.941.941,0,0,1-.823-.429,1,1,0,0,1-.122-.921L7.615,7.543H6.034A1.89,1.89,0,0,1,7.522,5.785a5.822,5.822,0,0,1,1.529-.253,1.213,1.213,0,0,1,.823.429A1,1,0,0,1,10,6.881L8.476,11.062h1.581a1.78,1.78,0,0,1-1.488,1.756Zm.482-7.791a1.006,1.006,0,1,1,1.006-1.006A1.006,1.006,0,0,1,9.051,5.028Z" fill="#8f95a2"/>
                                      </svg>
                                  </span>
                              </h5>
                          </div>
                          <div className="info-item">
                              <label className="font-14 text-muted mb-3">Notes</label>
                              <p className="font-16 color-333">{product.note}</p>
                          </div>

                          <div className="info-item">
                              <div className="text-left mt-4">
                                  <a href="" className="btn btn-outline-secondary mr-3 border-gray-light">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="23.677" height="23.396" viewBox="0 0 23.677 23.396">
                                          <g id="edit" transform="translate(0.1 -0.161)">
                                              <path id="Path_23189" data-name="Path 23189" d="M21.517,51.47a.581.581,0,0,0-.581.581v5.155a1.744,1.744,0,0,1-1.742,1.742H2.9a1.744,1.744,0,0,1-1.742-1.742V42.075A1.744,1.744,0,0,1,2.9,40.333H8.058a.581.581,0,1,0,0-1.161H2.9a2.906,2.906,0,0,0-2.9,2.9v15.13a2.906,2.906,0,0,0,2.9,2.9H19.194a2.906,2.906,0,0,0,2.9-2.9V52.05a.581.581,0,0,0-.581-.581Zm0,0" transform="translate(0 -36.652)" fill="#707a8b" stroke="#707a8b" stroke-width="0.2"/>
                                              <path id="Path_23190" data-name="Path 23190" d="M123.776,1.026a2.613,2.613,0,0,0-3.7,0L109.723,11.385a.58.58,0,0,0-.149.256l-1.362,4.918a.581.581,0,0,0,.714.715l4.918-1.362a.58.58,0,0,0,.256-.149L124.457,5.4a2.616,2.616,0,0,0,0-3.7ZM110.988,11.762l8.478-8.478L122.2,6.018,113.721,14.5Zm-.546,1.1,2.184,2.185-3.021.837Zm13.195-8.276-.616.616-2.734-2.734.616-.616a1.451,1.451,0,0,1,2.053,0l.682.681A1.454,1.454,0,0,1,123.636,4.581Zm0,0" transform="translate(-101.909)" fill="#707a8b" stroke="#707a8b" stroke-width="0.2"/>
                                          </g>
                                      </svg>
                                  </a>
                                  <a href="" className="btn btn-outline-secondary mr-3 border-gray-light favourite favourite-active">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="26.474" height="24.783" viewBox="0 0 26.474 24.783">
                                          <path id="like_1_" data-name="like (1)" d="M26.43,9.216c-.386-4.283-3.4-7.39-7.165-7.39a7.113,7.113,0,0,0-6.1,3.54,6.856,6.856,0,0,0-5.955-3.54C3.441,1.826.43,4.933.044,9.216a7.67,7.67,0,0,0,.225,2.808,12.061,12.061,0,0,0,3.665,6.158l9.223,8.427,9.382-8.427A12.062,12.062,0,0,0,26.2,12.024,7.688,7.688,0,0,0,26.43,9.216Z" transform="translate(0 -1.826)" fill="#8f95a2"/>
                                      </svg>
                                  </a>
                                  <a href="" className="btn btn-outline-secondary mr-3  border-gray-light">Add to collection</a>
                                  <a href="" className="btn btn-outline-secondary mr-3  border-0 brand-bg-color-secondary text-white quote-now">Quote Now</a>
                              </div>
                          </div>


                      </div>
                  </div>
              </div>
              <div className="other-description p-0 pt-5 mt-4">


                  <div className="product-slider designs">
                      <h4 className="mb-4">Similar Designs</h4>
                      <div className="explore-design-carasoul owl-carousel owl-theme">

                          <div className="item">
                              <div className="card product-card new-card active">
                                  <div className="thumb">
                                      <div className="favourite-part choose active">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="21.137" height="17.04" viewBox="0 0 21.137 17.04">
                                              <path id="Path_27721" data-name="Path 27721" d="M164.573,353.29l3.281,3.949,12.212-12.212" transform="translate(-161.757 -342.198)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                                          </svg>
                                      </div>
                                      <div className="favourite-part active">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="14.521" height="13.594" viewBox="0 0 14.521 13.594">
                                              <path id="like_1_" data-name="like (1)" d="M14.5,5.88a4.13,4.13,0,0,0-3.93-4.053A3.9,3.9,0,0,0,7.221,3.768,3.761,3.761,0,0,0,3.954,1.826,4.13,4.13,0,0,0,.024,5.879,4.207,4.207,0,0,0,.148,7.42,6.615,6.615,0,0,0,2.158,10.8L7.217,15.42,12.363,10.8a6.616,6.616,0,0,0,2.01-3.378A4.217,4.217,0,0,0,14.5,5.88Z" transform="translate(0 -1.826)" fill="#9098ac"/>
                                          </svg>
                                      </div>
                                      <img src={require('../../assets/images/design5.png')} alt="designer" className="card-img-top img-fluid d-block mx-auto"/>
                                      <button className="btn-brand">Quote Now</button>
                                  </div>
                                  <div className="card-body">
                                      <h5 className="card-title text-capitalize">Blue Huddie Long Sleeve</h5>
                                      <span className="design-category">Men</span>
                                      <div className="card-footer">
                                          <div className="quantity">
                                              <span>MOQ <strong>500 Pcs</strong></span>
                                              <svg xmlns="http://www.w3.org/2000/svg" width="10.814" height="14.581" viewBox="0 0 10.814 14.581">
                                                  <line id="Line_116" data-name="Line 116" y1="14" x2="10" transform="translate(0.407 0.291)" fill="none" stroke="#c1c7d5" stroke-width="1"/>
                                              </svg>
                                              <span>
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="17.912" height="13.094" viewBox="0 0 17.912 13.094">
                                                    <g id="delivery-truck" transform="translate(0 -68.867)">
                                                      <g id="Group_10719" data-name="Group 10719" transform="translate(0 68.867)">
                                                        <g id="Group_10718" data-name="Group 10718" transform="translate(0 0)">
                                                          <path id="Path_27717" data-name="Path 27717" d="M14.5,73.053H13.373l.34-3.9c0-.007,0-.014,0-.021v0h0a.262.262,0,0,0-.158-.24h0l-.018-.007-.007,0-.015,0-.011,0-.014,0-.013,0H8.082a.262.262,0,1,0,0,.525h5.084l-.522,6h0L12.511,76.9H3.394l.152-1.574H5.283a.262.262,0,0,0,0-.525H3.6l.322-3.323H6.682a.262.262,0,0,0,0-.525H3.97l.151-1.562h2.91a.262.262,0,1,0,0-.525H3.883a.262.262,0,0,0-.256.207v0c0,.007,0,.013,0,.02V69.1h0l-.179,1.85H.262a.262.262,0,0,0,0,.525h3.13L3.07,74.8H2.134a.262.262,0,0,0,0,.525h.885l-.175,1.809h0l-.271,2.8h0s0,.007,0,.011,0,.01,0,.014h0c0,.007,0,.013,0,.02s0,0,0,.006,0,.013,0,.02v.006c0,.005,0,.01,0,.015l0,.01v0a.262.262,0,0,0,.062.1v0l.009.008a.26.26,0,0,0,.061.042l.014.007,0,0,.02.007h0l.024.006h0l.023,0H4a2,2,0,0,0,3.96,0h4.209a2,2,0,0,0,3.96,0h1.2l.02,0,.008,0,.015,0,.01,0,.013,0,.011,0,.011-.006.01-.006.011-.007.01-.006.01-.008.009-.007.01-.009.007-.007.011-.012.006-.006.011-.015,0-.005.012-.02h0l.011-.022,0-.007.006-.016,0-.011,0-.013s0-.008,0-.012l0-.011c.011-.089.217-1.738.308-2.8v0c.026-.307.043-.566.043-.724A3.415,3.415,0,0,0,14.5,73.053Zm-1.173.525H14.4l-.137,1.574H13.191ZM5.983,81.436a1.473,1.473,0,1,1,1.473-1.473A1.475,1.475,0,0,1,5.983,81.436Zm8.169,0a1.473,1.473,0,1,1,1.473-1.473A1.475,1.475,0,0,1,14.151,81.436ZM17.068,79.7h-.936a2,2,0,0,0-3.96,0H7.963A2,2,0,0,0,4,79.7h-.88l.22-2.274h9.44l.02,0,.009,0,.016,0,.01,0,.013,0,.011,0,.012-.006.011-.006.011-.006.01-.007.01-.008.009-.007.01-.009.008-.008.009-.01.007-.008.008-.011.006-.009.007-.012.005-.009.006-.013,0-.01,0-.013,0-.011,0-.012,0-.013s0-.008,0-.013,0-.009,0-.013v0l.132-1.51H14.5a1.879,1.879,0,0,1,1.55.858,2.153,2.153,0,0,0,1.271.869C17.246,78.21,17.123,79.246,17.068,79.7Zm.3-2.823a1.717,1.717,0,0,1-.92-.687,2.464,2.464,0,0,0-1.658-1.022l.136-1.558a2.891,2.891,0,0,1,2.462,2.855C17.387,76.563,17.38,76.705,17.368,76.877Z" transform="translate(0 -68.867)" fill="#7e8597"/>
                                                        </g>
                                                      </g>
                                                      <g id="Group_10721" data-name="Group 10721" transform="translate(5.021 79.001)">
                                                        <g id="Group_10720" data-name="Group 10720" transform="translate(0 0)">
                                                          <path id="Path_27718" data-name="Path 27718" d="M144.47,358.524a.962.962,0,1,0,.962.962A.963.963,0,0,0,144.47,358.524Zm0,1.4a.437.437,0,1,1,.437-.437A.438.438,0,0,1,144.47,359.923Z" transform="translate(-143.508 -358.524)" fill="#7e8597"/>
                                                        </g>
                                                      </g>
                                                      <g id="Group_10723" data-name="Group 10723" transform="translate(13.189 79.001)">
                                                        <g id="Group_10722" data-name="Group 10722" transform="translate(0 0)">
                                                          <path id="Path_27719" data-name="Path 27719" d="M377.958,358.524a.962.962,0,1,0,.962.962A.963.963,0,0,0,377.958,358.524Zm0,1.4a.437.437,0,1,1,.437-.437A.438.438,0,0,1,377.958,359.923Z" transform="translate(-376.996 -358.524)" fill="#7e8597"/>
                                                        </g>
                                                      </g>
                                                      <g id="Group_10725" data-name="Group 10725" transform="translate(0.939 73.053)">
                                                        <g id="Group_10724" data-name="Group 10724">
                                                          <path id="Path_27720" data-name="Path 27720" d="M28.379,188.527H27.1a.262.262,0,0,0,0,.525h1.283a.262.262,0,1,0,0-.525Z" transform="translate(-26.834 -188.527)" fill="#7e8597"/>
                                                        </g>
                                                      </g>
                                                    </g>
                                                  </svg>

                                                  <strong>15 Days</strong>
                                              </span>
                                          </div>
                                          <span className="badge design-badge" style={{backgroundColor: '#F7F5E5', color: '#CD930C'}}>In Project</span>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <div className="item">
                              <div className="card product-card new-card">
                                  <div className="thumb">
                                      <div className="favourite-part choose">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="21.137" height="17.04" viewBox="0 0 21.137 17.04">
                                              <path id="Path_27721" data-name="Path 27721" d="M164.573,353.29l3.281,3.949,12.212-12.212" transform="translate(-161.757 -342.198)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                                          </svg>
                                      </div>
                                      <div className="favourite-part">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="14.521" height="13.594" viewBox="0 0 14.521 13.594">
                                              <path id="like_1_" data-name="like (1)" d="M14.5,5.88a4.13,4.13,0,0,0-3.93-4.053A3.9,3.9,0,0,0,7.221,3.768,3.761,3.761,0,0,0,3.954,1.826,4.13,4.13,0,0,0,.024,5.879,4.207,4.207,0,0,0,.148,7.42,6.615,6.615,0,0,0,2.158,10.8L7.217,15.42,12.363,10.8a6.616,6.616,0,0,0,2.01-3.378A4.217,4.217,0,0,0,14.5,5.88Z" transform="translate(0 -1.826)" fill="#9098ac"/>
                                          </svg>
                                      </div>
                                      <img src={require('../../assets/images/design5.png')} alt="designer" className="card-img-top img-fluid d-block mx-auto"/>
                                      <button className="btn-brand">Quote Now</button>
                                  </div>
                                  <div className="card-body">
                                      <h5 className="card-title text-capitalize">Blue Huddie Long Sleeve</h5>
                                      <span className="design-category">Men</span>
                                      <div className="card-footer">
                                          <div className="quantity">
                                              <span>MOQ <strong>500 Pcs</strong></span>
                                              <svg xmlns="http://www.w3.org/2000/svg" width="10.814" height="14.581" viewBox="0 0 10.814 14.581">
                                                  <line id="Line_116" data-name="Line 116" y1="14" x2="10" transform="translate(0.407 0.291)" fill="none" stroke="#c1c7d5" stroke-width="1"/>
                                              </svg>
                                              <span>
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="17.912" height="13.094" viewBox="0 0 17.912 13.094">
                                                    <g id="delivery-truck" transform="translate(0 -68.867)">
                                                      <g id="Group_10719" data-name="Group 10719" transform="translate(0 68.867)">
                                                        <g id="Group_10718" data-name="Group 10718" transform="translate(0 0)">
                                                          <path id="Path_27717" data-name="Path 27717" d="M14.5,73.053H13.373l.34-3.9c0-.007,0-.014,0-.021v0h0a.262.262,0,0,0-.158-.24h0l-.018-.007-.007,0-.015,0-.011,0-.014,0-.013,0H8.082a.262.262,0,1,0,0,.525h5.084l-.522,6h0L12.511,76.9H3.394l.152-1.574H5.283a.262.262,0,0,0,0-.525H3.6l.322-3.323H6.682a.262.262,0,0,0,0-.525H3.97l.151-1.562h2.91a.262.262,0,1,0,0-.525H3.883a.262.262,0,0,0-.256.207v0c0,.007,0,.013,0,.02V69.1h0l-.179,1.85H.262a.262.262,0,0,0,0,.525h3.13L3.07,74.8H2.134a.262.262,0,0,0,0,.525h.885l-.175,1.809h0l-.271,2.8h0s0,.007,0,.011,0,.01,0,.014h0c0,.007,0,.013,0,.02s0,0,0,.006,0,.013,0,.02v.006c0,.005,0,.01,0,.015l0,.01v0a.262.262,0,0,0,.062.1v0l.009.008a.26.26,0,0,0,.061.042l.014.007,0,0,.02.007h0l.024.006h0l.023,0H4a2,2,0,0,0,3.96,0h4.209a2,2,0,0,0,3.96,0h1.2l.02,0,.008,0,.015,0,.01,0,.013,0,.011,0,.011-.006.01-.006.011-.007.01-.006.01-.008.009-.007.01-.009.007-.007.011-.012.006-.006.011-.015,0-.005.012-.02h0l.011-.022,0-.007.006-.016,0-.011,0-.013s0-.008,0-.012l0-.011c.011-.089.217-1.738.308-2.8v0c.026-.307.043-.566.043-.724A3.415,3.415,0,0,0,14.5,73.053Zm-1.173.525H14.4l-.137,1.574H13.191ZM5.983,81.436a1.473,1.473,0,1,1,1.473-1.473A1.475,1.475,0,0,1,5.983,81.436Zm8.169,0a1.473,1.473,0,1,1,1.473-1.473A1.475,1.475,0,0,1,14.151,81.436ZM17.068,79.7h-.936a2,2,0,0,0-3.96,0H7.963A2,2,0,0,0,4,79.7h-.88l.22-2.274h9.44l.02,0,.009,0,.016,0,.01,0,.013,0,.011,0,.012-.006.011-.006.011-.006.01-.007.01-.008.009-.007.01-.009.008-.008.009-.01.007-.008.008-.011.006-.009.007-.012.005-.009.006-.013,0-.01,0-.013,0-.011,0-.012,0-.013s0-.008,0-.013,0-.009,0-.013v0l.132-1.51H14.5a1.879,1.879,0,0,1,1.55.858,2.153,2.153,0,0,0,1.271.869C17.246,78.21,17.123,79.246,17.068,79.7Zm.3-2.823a1.717,1.717,0,0,1-.92-.687,2.464,2.464,0,0,0-1.658-1.022l.136-1.558a2.891,2.891,0,0,1,2.462,2.855C17.387,76.563,17.38,76.705,17.368,76.877Z" transform="translate(0 -68.867)" fill="#7e8597"/>
                                                        </g>
                                                      </g>
                                                      <g id="Group_10721" data-name="Group 10721" transform="translate(5.021 79.001)">
                                                        <g id="Group_10720" data-name="Group 10720" transform="translate(0 0)">
                                                          <path id="Path_27718" data-name="Path 27718" d="M144.47,358.524a.962.962,0,1,0,.962.962A.963.963,0,0,0,144.47,358.524Zm0,1.4a.437.437,0,1,1,.437-.437A.438.438,0,0,1,144.47,359.923Z" transform="translate(-143.508 -358.524)" fill="#7e8597"/>
                                                        </g>
                                                      </g>
                                                      <g id="Group_10723" data-name="Group 10723" transform="translate(13.189 79.001)">
                                                        <g id="Group_10722" data-name="Group 10722" transform="translate(0 0)">
                                                          <path id="Path_27719" data-name="Path 27719" d="M377.958,358.524a.962.962,0,1,0,.962.962A.963.963,0,0,0,377.958,358.524Zm0,1.4a.437.437,0,1,1,.437-.437A.438.438,0,0,1,377.958,359.923Z" transform="translate(-376.996 -358.524)" fill="#7e8597"/>
                                                        </g>
                                                      </g>
                                                      <g id="Group_10725" data-name="Group 10725" transform="translate(0.939 73.053)">
                                                        <g id="Group_10724" data-name="Group 10724">
                                                          <path id="Path_27720" data-name="Path 27720" d="M28.379,188.527H27.1a.262.262,0,0,0,0,.525h1.283a.262.262,0,1,0,0-.525Z" transform="translate(-26.834 -188.527)" fill="#7e8597"/>
                                                        </g>
                                                      </g>
                                                    </g>
                                                  </svg>

                                                  <strong>15 Days</strong>
                                              </span>
                                          </div>
                                          <span className="badge design-badge"  style={{backgroundColor: '#F7F5E5', color: '#CD930C'}}>In Project</span>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <div className="item">
                              <div className="card product-card new-card">
                                  <div className="thumb">
                                      <div className="favourite-part choose">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="21.137" height="17.04" viewBox="0 0 21.137 17.04">
                                              <path id="Path_27721" data-name="Path 27721" d="M164.573,353.29l3.281,3.949,12.212-12.212" transform="translate(-161.757 -342.198)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                                          </svg>
                                      </div>
                                      <div className="favourite-part">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="14.521" height="13.594" viewBox="0 0 14.521 13.594">
                                              <path id="like_1_" data-name="like (1)" d="M14.5,5.88a4.13,4.13,0,0,0-3.93-4.053A3.9,3.9,0,0,0,7.221,3.768,3.761,3.761,0,0,0,3.954,1.826,4.13,4.13,0,0,0,.024,5.879,4.207,4.207,0,0,0,.148,7.42,6.615,6.615,0,0,0,2.158,10.8L7.217,15.42,12.363,10.8a6.616,6.616,0,0,0,2.01-3.378A4.217,4.217,0,0,0,14.5,5.88Z" transform="translate(0 -1.826)" fill="#9098ac"/>
                                          </svg>
                                      </div>
                                      <img src={require('../../assets/images/design5.png')} alt="designer" className="card-img-top img-fluid d-block mx-auto"/>
                                      <button className="btn-brand">Quote Now</button>
                                  </div>
                                  <div className="card-body">
                                      <h5 className="card-title text-capitalize">Blue Huddie Long Sleeve</h5>
                                      <span className="design-category">Men</span>
                                      <div className="card-footer">
                                          <div className="quantity">
                                              <span>MOQ <strong>500 Pcs</strong></span>
                                              <svg xmlns="http://www.w3.org/2000/svg" width="10.814" height="14.581" viewBox="0 0 10.814 14.581">
                                                  <line id="Line_116" data-name="Line 116" y1="14" x2="10" transform="translate(0.407 0.291)" fill="none" stroke="#c1c7d5" stroke-width="1"/>
                                              </svg>
                                              <span>
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="17.912" height="13.094" viewBox="0 0 17.912 13.094">
                                                    <g id="delivery-truck" transform="translate(0 -68.867)">
                                                      <g id="Group_10719" data-name="Group 10719" transform="translate(0 68.867)">
                                                        <g id="Group_10718" data-name="Group 10718" transform="translate(0 0)">
                                                          <path id="Path_27717" data-name="Path 27717" d="M14.5,73.053H13.373l.34-3.9c0-.007,0-.014,0-.021v0h0a.262.262,0,0,0-.158-.24h0l-.018-.007-.007,0-.015,0-.011,0-.014,0-.013,0H8.082a.262.262,0,1,0,0,.525h5.084l-.522,6h0L12.511,76.9H3.394l.152-1.574H5.283a.262.262,0,0,0,0-.525H3.6l.322-3.323H6.682a.262.262,0,0,0,0-.525H3.97l.151-1.562h2.91a.262.262,0,1,0,0-.525H3.883a.262.262,0,0,0-.256.207v0c0,.007,0,.013,0,.02V69.1h0l-.179,1.85H.262a.262.262,0,0,0,0,.525h3.13L3.07,74.8H2.134a.262.262,0,0,0,0,.525h.885l-.175,1.809h0l-.271,2.8h0s0,.007,0,.011,0,.01,0,.014h0c0,.007,0,.013,0,.02s0,0,0,.006,0,.013,0,.02v.006c0,.005,0,.01,0,.015l0,.01v0a.262.262,0,0,0,.062.1v0l.009.008a.26.26,0,0,0,.061.042l.014.007,0,0,.02.007h0l.024.006h0l.023,0H4a2,2,0,0,0,3.96,0h4.209a2,2,0,0,0,3.96,0h1.2l.02,0,.008,0,.015,0,.01,0,.013,0,.011,0,.011-.006.01-.006.011-.007.01-.006.01-.008.009-.007.01-.009.007-.007.011-.012.006-.006.011-.015,0-.005.012-.02h0l.011-.022,0-.007.006-.016,0-.011,0-.013s0-.008,0-.012l0-.011c.011-.089.217-1.738.308-2.8v0c.026-.307.043-.566.043-.724A3.415,3.415,0,0,0,14.5,73.053Zm-1.173.525H14.4l-.137,1.574H13.191ZM5.983,81.436a1.473,1.473,0,1,1,1.473-1.473A1.475,1.475,0,0,1,5.983,81.436Zm8.169,0a1.473,1.473,0,1,1,1.473-1.473A1.475,1.475,0,0,1,14.151,81.436ZM17.068,79.7h-.936a2,2,0,0,0-3.96,0H7.963A2,2,0,0,0,4,79.7h-.88l.22-2.274h9.44l.02,0,.009,0,.016,0,.01,0,.013,0,.011,0,.012-.006.011-.006.011-.006.01-.007.01-.008.009-.007.01-.009.008-.008.009-.01.007-.008.008-.011.006-.009.007-.012.005-.009.006-.013,0-.01,0-.013,0-.011,0-.012,0-.013s0-.008,0-.013,0-.009,0-.013v0l.132-1.51H14.5a1.879,1.879,0,0,1,1.55.858,2.153,2.153,0,0,0,1.271.869C17.246,78.21,17.123,79.246,17.068,79.7Zm.3-2.823a1.717,1.717,0,0,1-.92-.687,2.464,2.464,0,0,0-1.658-1.022l.136-1.558a2.891,2.891,0,0,1,2.462,2.855C17.387,76.563,17.38,76.705,17.368,76.877Z" transform="translate(0 -68.867)" fill="#7e8597"/>
                                                        </g>
                                                      </g>
                                                      <g id="Group_10721" data-name="Group 10721" transform="translate(5.021 79.001)">
                                                        <g id="Group_10720" data-name="Group 10720" transform="translate(0 0)">
                                                          <path id="Path_27718" data-name="Path 27718" d="M144.47,358.524a.962.962,0,1,0,.962.962A.963.963,0,0,0,144.47,358.524Zm0,1.4a.437.437,0,1,1,.437-.437A.438.438,0,0,1,144.47,359.923Z" transform="translate(-143.508 -358.524)" fill="#7e8597"/>
                                                        </g>
                                                      </g>
                                                      <g id="Group_10723" data-name="Group 10723" transform="translate(13.189 79.001)">
                                                        <g id="Group_10722" data-name="Group 10722" transform="translate(0 0)">
                                                          <path id="Path_27719" data-name="Path 27719" d="M377.958,358.524a.962.962,0,1,0,.962.962A.963.963,0,0,0,377.958,358.524Zm0,1.4a.437.437,0,1,1,.437-.437A.438.438,0,0,1,377.958,359.923Z" transform="translate(-376.996 -358.524)" fill="#7e8597"/>
                                                        </g>
                                                      </g>
                                                      <g id="Group_10725" data-name="Group 10725" transform="translate(0.939 73.053)">
                                                        <g id="Group_10724" data-name="Group 10724">
                                                          <path id="Path_27720" data-name="Path 27720" d="M28.379,188.527H27.1a.262.262,0,0,0,0,.525h1.283a.262.262,0,1,0,0-.525Z" transform="translate(-26.834 -188.527)" fill="#7e8597"/>
                                                        </g>
                                                      </g>
                                                    </g>
                                                  </svg>

                                                  <strong>15 Days</strong>
                                              </span>
                                          </div>
                                          <span className="badge design-badge"  style={{backgroundColor: '#F7F5E5', color: '#CD930C'}}>In Project</span>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <div className="item">
                              <div className="card product-card new-card">
                                  <div className="thumb">
                                      <div className="favourite-part choose">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="21.137" height="17.04" viewBox="0 0 21.137 17.04">
                                              <path id="Path_27721" data-name="Path 27721" d="M164.573,353.29l3.281,3.949,12.212-12.212" transform="translate(-161.757 -342.198)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                                          </svg>
                                      </div>
                                      <div className="favourite-part">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="14.521" height="13.594" viewBox="0 0 14.521 13.594">
                                              <path id="like_1_" data-name="like (1)" d="M14.5,5.88a4.13,4.13,0,0,0-3.93-4.053A3.9,3.9,0,0,0,7.221,3.768,3.761,3.761,0,0,0,3.954,1.826,4.13,4.13,0,0,0,.024,5.879,4.207,4.207,0,0,0,.148,7.42,6.615,6.615,0,0,0,2.158,10.8L7.217,15.42,12.363,10.8a6.616,6.616,0,0,0,2.01-3.378A4.217,4.217,0,0,0,14.5,5.88Z" transform="translate(0 -1.826)" fill="#9098ac"/>
                                          </svg>
                                      </div>
                                      <img src={require('../../assets/images/design5.png')} alt="designer" className="card-img-top img-fluid d-block mx-auto"/>
                                      <button className="btn-brand">Quote Now</button>
                                  </div>
                                  <div className="card-body">
                                      <h5 className="card-title text-capitalize">Blue Huddie Long Sleeve</h5>
                                      <span className="design-category">Men</span>
                                      <div className="card-footer">
                                          <div className="quantity">
                                              <span>MOQ <strong>500 Pcs</strong></span>
                                              <svg xmlns="http://www.w3.org/2000/svg" width="10.814" height="14.581" viewBox="0 0 10.814 14.581">
                                                  <line id="Line_116" data-name="Line 116" y1="14" x2="10" transform="translate(0.407 0.291)" fill="none" stroke="#c1c7d5" stroke-width="1"/>
                                              </svg>
                                              <span>
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="17.912" height="13.094" viewBox="0 0 17.912 13.094">
                                                    <g id="delivery-truck" transform="translate(0 -68.867)">
                                                      <g id="Group_10719" data-name="Group 10719" transform="translate(0 68.867)">
                                                        <g id="Group_10718" data-name="Group 10718" transform="translate(0 0)">
                                                          <path id="Path_27717" data-name="Path 27717" d="M14.5,73.053H13.373l.34-3.9c0-.007,0-.014,0-.021v0h0a.262.262,0,0,0-.158-.24h0l-.018-.007-.007,0-.015,0-.011,0-.014,0-.013,0H8.082a.262.262,0,1,0,0,.525h5.084l-.522,6h0L12.511,76.9H3.394l.152-1.574H5.283a.262.262,0,0,0,0-.525H3.6l.322-3.323H6.682a.262.262,0,0,0,0-.525H3.97l.151-1.562h2.91a.262.262,0,1,0,0-.525H3.883a.262.262,0,0,0-.256.207v0c0,.007,0,.013,0,.02V69.1h0l-.179,1.85H.262a.262.262,0,0,0,0,.525h3.13L3.07,74.8H2.134a.262.262,0,0,0,0,.525h.885l-.175,1.809h0l-.271,2.8h0s0,.007,0,.011,0,.01,0,.014h0c0,.007,0,.013,0,.02s0,0,0,.006,0,.013,0,.02v.006c0,.005,0,.01,0,.015l0,.01v0a.262.262,0,0,0,.062.1v0l.009.008a.26.26,0,0,0,.061.042l.014.007,0,0,.02.007h0l.024.006h0l.023,0H4a2,2,0,0,0,3.96,0h4.209a2,2,0,0,0,3.96,0h1.2l.02,0,.008,0,.015,0,.01,0,.013,0,.011,0,.011-.006.01-.006.011-.007.01-.006.01-.008.009-.007.01-.009.007-.007.011-.012.006-.006.011-.015,0-.005.012-.02h0l.011-.022,0-.007.006-.016,0-.011,0-.013s0-.008,0-.012l0-.011c.011-.089.217-1.738.308-2.8v0c.026-.307.043-.566.043-.724A3.415,3.415,0,0,0,14.5,73.053Zm-1.173.525H14.4l-.137,1.574H13.191ZM5.983,81.436a1.473,1.473,0,1,1,1.473-1.473A1.475,1.475,0,0,1,5.983,81.436Zm8.169,0a1.473,1.473,0,1,1,1.473-1.473A1.475,1.475,0,0,1,14.151,81.436ZM17.068,79.7h-.936a2,2,0,0,0-3.96,0H7.963A2,2,0,0,0,4,79.7h-.88l.22-2.274h9.44l.02,0,.009,0,.016,0,.01,0,.013,0,.011,0,.012-.006.011-.006.011-.006.01-.007.01-.008.009-.007.01-.009.008-.008.009-.01.007-.008.008-.011.006-.009.007-.012.005-.009.006-.013,0-.01,0-.013,0-.011,0-.012,0-.013s0-.008,0-.013,0-.009,0-.013v0l.132-1.51H14.5a1.879,1.879,0,0,1,1.55.858,2.153,2.153,0,0,0,1.271.869C17.246,78.21,17.123,79.246,17.068,79.7Zm.3-2.823a1.717,1.717,0,0,1-.92-.687,2.464,2.464,0,0,0-1.658-1.022l.136-1.558a2.891,2.891,0,0,1,2.462,2.855C17.387,76.563,17.38,76.705,17.368,76.877Z" transform="translate(0 -68.867)" fill="#7e8597"/>
                                                        </g>
                                                      </g>
                                                      <g id="Group_10721" data-name="Group 10721" transform="translate(5.021 79.001)">
                                                        <g id="Group_10720" data-name="Group 10720" transform="translate(0 0)">
                                                          <path id="Path_27718" data-name="Path 27718" d="M144.47,358.524a.962.962,0,1,0,.962.962A.963.963,0,0,0,144.47,358.524Zm0,1.4a.437.437,0,1,1,.437-.437A.438.438,0,0,1,144.47,359.923Z" transform="translate(-143.508 -358.524)" fill="#7e8597"/>
                                                        </g>
                                                      </g>
                                                      <g id="Group_10723" data-name="Group 10723" transform="translate(13.189 79.001)">
                                                        <g id="Group_10722" data-name="Group 10722" transform="translate(0 0)">
                                                          <path id="Path_27719" data-name="Path 27719" d="M377.958,358.524a.962.962,0,1,0,.962.962A.963.963,0,0,0,377.958,358.524Zm0,1.4a.437.437,0,1,1,.437-.437A.438.438,0,0,1,377.958,359.923Z" transform="translate(-376.996 -358.524)" fill="#7e8597"/>
                                                        </g>
                                                      </g>
                                                      <g id="Group_10725" data-name="Group 10725" transform="translate(0.939 73.053)">
                                                        <g id="Group_10724" data-name="Group 10724">
                                                          <path id="Path_27720" data-name="Path 27720" d="M28.379,188.527H27.1a.262.262,0,0,0,0,.525h1.283a.262.262,0,1,0,0-.525Z" transform="translate(-26.834 -188.527)" fill="#7e8597"/>
                                                        </g>
                                                      </g>
                                                    </g>
                                                  </svg>

                                                  <strong>15 Days</strong>
                                              </span>
                                          </div>
                                          <span className="badge design-badge"  style={{backgroundColor: '#F7F5E5', color: '#CD930C'}}>In Project</span>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <div className="item">
                              <div className="card product-card new-card">
                                  <div className="thumb">
                                      <div className="favourite-part choose">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="21.137" height="17.04" viewBox="0 0 21.137 17.04">
                                              <path id="Path_27721" data-name="Path 27721" d="M164.573,353.29l3.281,3.949,12.212-12.212" transform="translate(-161.757 -342.198)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                                          </svg>
                                      </div>
                                      <div className="favourite-part">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="14.521" height="13.594" viewBox="0 0 14.521 13.594">
                                              <path id="like_1_" data-name="like (1)" d="M14.5,5.88a4.13,4.13,0,0,0-3.93-4.053A3.9,3.9,0,0,0,7.221,3.768,3.761,3.761,0,0,0,3.954,1.826,4.13,4.13,0,0,0,.024,5.879,4.207,4.207,0,0,0,.148,7.42,6.615,6.615,0,0,0,2.158,10.8L7.217,15.42,12.363,10.8a6.616,6.616,0,0,0,2.01-3.378A4.217,4.217,0,0,0,14.5,5.88Z" transform="translate(0 -1.826)" fill="#9098ac"/>
                                          </svg>
                                      </div>
                                      <img src={require('../../assets/images/design5.png')} alt="designer" className="card-img-top img-fluid d-block mx-auto"/>
                                      <button className="btn-brand">Quote Now</button>
                                  </div>
                                  <div className="card-body">
                                      <h5 className="card-title text-capitalize">Blue Huddie Long Sleeve</h5>
                                      <span className="design-category">Men</span>
                                      <div className="card-footer">
                                          <div className="quantity">
                                              <span>MOQ <strong>500 Pcs</strong></span>
                                              <svg xmlns="http://www.w3.org/2000/svg" width="10.814" height="14.581" viewBox="0 0 10.814 14.581">
                                                  <line id="Line_116" data-name="Line 116" y1="14" x2="10" transform="translate(0.407 0.291)" fill="none" stroke="#c1c7d5" stroke-width="1"/>
                                              </svg>
                                              <span>
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="17.912" height="13.094" viewBox="0 0 17.912 13.094">
                                                    <g id="delivery-truck" transform="translate(0 -68.867)">
                                                      <g id="Group_10719" data-name="Group 10719" transform="translate(0 68.867)">
                                                        <g id="Group_10718" data-name="Group 10718" transform="translate(0 0)">
                                                          <path id="Path_27717" data-name="Path 27717" d="M14.5,73.053H13.373l.34-3.9c0-.007,0-.014,0-.021v0h0a.262.262,0,0,0-.158-.24h0l-.018-.007-.007,0-.015,0-.011,0-.014,0-.013,0H8.082a.262.262,0,1,0,0,.525h5.084l-.522,6h0L12.511,76.9H3.394l.152-1.574H5.283a.262.262,0,0,0,0-.525H3.6l.322-3.323H6.682a.262.262,0,0,0,0-.525H3.97l.151-1.562h2.91a.262.262,0,1,0,0-.525H3.883a.262.262,0,0,0-.256.207v0c0,.007,0,.013,0,.02V69.1h0l-.179,1.85H.262a.262.262,0,0,0,0,.525h3.13L3.07,74.8H2.134a.262.262,0,0,0,0,.525h.885l-.175,1.809h0l-.271,2.8h0s0,.007,0,.011,0,.01,0,.014h0c0,.007,0,.013,0,.02s0,0,0,.006,0,.013,0,.02v.006c0,.005,0,.01,0,.015l0,.01v0a.262.262,0,0,0,.062.1v0l.009.008a.26.26,0,0,0,.061.042l.014.007,0,0,.02.007h0l.024.006h0l.023,0H4a2,2,0,0,0,3.96,0h4.209a2,2,0,0,0,3.96,0h1.2l.02,0,.008,0,.015,0,.01,0,.013,0,.011,0,.011-.006.01-.006.011-.007.01-.006.01-.008.009-.007.01-.009.007-.007.011-.012.006-.006.011-.015,0-.005.012-.02h0l.011-.022,0-.007.006-.016,0-.011,0-.013s0-.008,0-.012l0-.011c.011-.089.217-1.738.308-2.8v0c.026-.307.043-.566.043-.724A3.415,3.415,0,0,0,14.5,73.053Zm-1.173.525H14.4l-.137,1.574H13.191ZM5.983,81.436a1.473,1.473,0,1,1,1.473-1.473A1.475,1.475,0,0,1,5.983,81.436Zm8.169,0a1.473,1.473,0,1,1,1.473-1.473A1.475,1.475,0,0,1,14.151,81.436ZM17.068,79.7h-.936a2,2,0,0,0-3.96,0H7.963A2,2,0,0,0,4,79.7h-.88l.22-2.274h9.44l.02,0,.009,0,.016,0,.01,0,.013,0,.011,0,.012-.006.011-.006.011-.006.01-.007.01-.008.009-.007.01-.009.008-.008.009-.01.007-.008.008-.011.006-.009.007-.012.005-.009.006-.013,0-.01,0-.013,0-.011,0-.012,0-.013s0-.008,0-.013,0-.009,0-.013v0l.132-1.51H14.5a1.879,1.879,0,0,1,1.55.858,2.153,2.153,0,0,0,1.271.869C17.246,78.21,17.123,79.246,17.068,79.7Zm.3-2.823a1.717,1.717,0,0,1-.92-.687,2.464,2.464,0,0,0-1.658-1.022l.136-1.558a2.891,2.891,0,0,1,2.462,2.855C17.387,76.563,17.38,76.705,17.368,76.877Z" transform="translate(0 -68.867)" fill="#7e8597"/>
                                                        </g>
                                                      </g>
                                                      <g id="Group_10721" data-name="Group 10721" transform="translate(5.021 79.001)">
                                                        <g id="Group_10720" data-name="Group 10720" transform="translate(0 0)">
                                                          <path id="Path_27718" data-name="Path 27718" d="M144.47,358.524a.962.962,0,1,0,.962.962A.963.963,0,0,0,144.47,358.524Zm0,1.4a.437.437,0,1,1,.437-.437A.438.438,0,0,1,144.47,359.923Z" transform="translate(-143.508 -358.524)" fill="#7e8597"/>
                                                        </g>
                                                      </g>
                                                      <g id="Group_10723" data-name="Group 10723" transform="translate(13.189 79.001)">
                                                        <g id="Group_10722" data-name="Group 10722" transform="translate(0 0)">
                                                          <path id="Path_27719" data-name="Path 27719" d="M377.958,358.524a.962.962,0,1,0,.962.962A.963.963,0,0,0,377.958,358.524Zm0,1.4a.437.437,0,1,1,.437-.437A.438.438,0,0,1,377.958,359.923Z" transform="translate(-376.996 -358.524)" fill="#7e8597"/>
                                                        </g>
                                                      </g>
                                                      <g id="Group_10725" data-name="Group 10725" transform="translate(0.939 73.053)">
                                                        <g id="Group_10724" data-name="Group 10724">
                                                          <path id="Path_27720" data-name="Path 27720" d="M28.379,188.527H27.1a.262.262,0,0,0,0,.525h1.283a.262.262,0,1,0,0-.525Z" transform="translate(-26.834 -188.527)" fill="#7e8597"/>
                                                        </g>
                                                      </g>
                                                    </g>
                                                  </svg>

                                                  <strong>15 Days</strong>
                                              </span>
                                          </div>
                                          <span className="badge design-badge"  style={{backgroundColor: '#F7F5E5', color: '#CD930C'}}>In Project</span>
                                      </div>
                                  </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OurDesignDetails);
