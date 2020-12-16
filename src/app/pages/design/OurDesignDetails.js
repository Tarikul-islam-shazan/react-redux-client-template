import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from 'loadjs';

import LoadingOverlay from 'react-loading-overlay';
import Http from '../../services/Http';
import { toastSuccess, toastError } from '../../commonComponents/Toast';
import { _storeData } from "../design/actions";

import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';
import { MeasurementTable } from './components/MeasurementTable'
import { LOADER_OVERLAY_BACKGROUND, LOADER_COLOR, LOADER_WIDTH, LOADER_TEXT, LOADER_POSITION, LOADER_TOP, LOADER_LEFT, LOADER_MARGIN_TOP, LOADER_MARGIN_LEFT } from '../../constant';
import { productAvailabilityStatus, addImageSuffix } from '../../services/Util';

import {ProductThumbsSkeleton, ProductHeroImageSkeleton, ProductDetailsSkeleton} from '../../commonComponents/ProductSkeleton';

class OurDesignDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
          product : {},
          loading : false,
          selectedImage : ''
        };
    }

    componentDidMount = async() => {
      document.title = "Product details Nitex";
      let id = this.props.match.params.id;
      // loadjs(['/js/script.js','/js/custom.js']);
      // return;
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
          loadjs(['/js/script.js','/js/custom.js']);
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

    setSelectedImage = async(index) => {
      let { product } = this.state;
      await this.setState({
              selectedImage : product.documentResponseList[index].docUrl
            })
      loadjs(['/js/script.js','/js/custom.js']);
    }

    render() {
        let { product , selectedImage, loading } = this.state;
        return (
          <div className="product-details-slider-container">
              <div className="row">
                  <div className="col-lg-7">
                      <div className="product-detail-gallery">
                          <div className="thumbnail-slider">
                              <div className="inner">
                                  {/*Skeleton Start*/}
                                  {loading && <ProductThumbsSkeleton />}
                                  {/*Skeleton End*/}
                                  <ul>
                                      {
                                        product.documentResponseList &&
                                        product.documentResponseList.map((item,i) => {
                                          // if(item.docType == 'PRODUCT_DESIGN' || item.docType == 'REFERENCE_IMAGE' || item.docType == 'PRINT_DESIGN'){
                                            return(
                                              <li key={i} onClick={() => this.setSelectedImage(i)}>
                                                <img src={addImageSuffix(item.docUrl, '_xicon')} alt=""/>
                                              </li>
                                            );
                                          // }
                                        })
                                      }
                                  </ul>
                              </div>
                          </div>
                          <div className="thumbnail-prev">
                              {
                                loading ?
                                <ProductHeroImageSkeleton /> :
                                <span className='zoom' id='zoom' style={{width:'100%'}}>
                                   <img src={addImageSuffix(selectedImage, '_xlarge')} width="100%"/>
                                </span>
                              }
                          </div>
                      </div>

                  </div>
                  <div className="col-lg-5">
                      <div className="produt-details-description">

                          {
                            loading ?
                            <ProductDetailsSkeleton />:
                            <>
                              <div className="head-title">
                                  <h3>{product.name}</h3>
                                  {
                                    product.liked ? <div className="fav"></div> : <div style={{margin:10}}></div>
                                  }
                                  {/*<button className="btn btn-edit">Edit</button>*/}
                              </div>
                              { productAvailabilityStatus(product) }

                              <div className="info-item">
                                  <label>Product type</label>
                                  <h5>{product.productType ? product.productType.name : ''}</h5>
                              </div>
                              <div className="info-item">
                                  <label>Fabric composition</label>
                                  <h5>{product.fabricComposition}</h5>
                              </div>
                              <div className="info-item">
                                  <label>Fabric weight (GSM)</label>
                                  <h5>{product.fabricWeight}</h5>
                              </div>
                              <div className="info-item">
                                  <label>Color</label>
                                  <div className="color-picker">
                                      <ul>
                                        {
                                          product.colorResponseList &&
                                          product.colorResponseList.map((item,i) => (
                                            <li key={i}><span style={{backgroundColor : item.hexCode}}></span></li>
                                          ))
                                        }
                                      </ul>
                                  </div>
                              </div>
                              <div className="info-item">
                                  <label>Accessories</label>
                                  {
                                    product.accessoriesResponseList &&
                                    product.accessoriesResponseList.map((item,i) => (
                                      <h5 key={i}>{item.name}</h5>
                                    ))
                                  }

                              </div>
                            </>
                          }

                          <div className="info-item">
                              <div className="text-left mt-5">
                                {
                                  (product.availabilityStatus === 'AVAILABLE' || product.availabilityStatus === 'CHECKED') ?
                                  <a href="" className="btn btn-nitex-default" data-toggle="modal" data-target="#quickQuoteModal" onClick={() => this.props._storeData('choosenIdsForQuick',[this.props.match.params.id])}>Quote now</a>:
                                  <button className="btn btn-outline-secondary" disabled={true}>Quote now</button>
                                }
                                  {/*<a href="" className="btn btn-nitex-default" data-toggle="modal" data-target="#quickProjectModal" onClick={() => this.props._storeData('choosenIdsForQuick',[this.props.match.params.id])}>Start Project</a>*/}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="other-description">
                {
                  product.sizeTable && product.sizeTable.sizeTableRows.length ?
                  <div className="row">
                      <div className="col-lg-12">
                          <h4  className="mb-4">Measurement Chart</h4>
                          {
                            <MeasurementTable data={product.sizeTable.sizeTableRows} />
                          }
                      </div>
                  </div>
                  :
                  <div className="row">
                      <div className="col-lg-12">
                        <p style={{textAlign:'center',fontWeight:'bold',color:'#452D8D'}}>Measurement table not available</p>
                      </div>
                  </div>
                }

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
