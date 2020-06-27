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
import { productAvailabilityStatus } from '../../services/Util';

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
      let id = this.props.match.params.id;
      // loadjs(['/js/script.js','/js/custom.js']);
      // return;
      this.setState({
        loading : true
      })

      await Http.GET('getProductDetails',id)
        .then(({data}) => {
          console.log('getProductDetails SUCCESS: ', data);
          // localStorage.removeItem('token');
          if(data){
            this.setState({
              loading:false,
              product : data,
              selectedImage : data.documentResponseList.length ? data.documentResponseList[0].docUrl : ''
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
        let { product , selectedImage } = this.state;
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
              <div className="product-details-slider-container">
                  <div className="row">
                      <div className="col-lg-7">
                          <div className="product-detail-gallery">
                              <div className="thumbnail-slider">
                                  <div className="inner">
                                      <ul>
                                          {
                                            product.documentResponseList &&
                                            product.documentResponseList.map((item,i) => {
                                              // if(item.docType == 'PRODUCT_DESIGN' || item.docType == 'REFERENCE_IMAGE' || item.docType == 'PRINT_DESIGN'){
                                                return(
                                                  <li key={i} onClick={() => this.setSelectedImage(i)}>
                                                    <img src={item.docUrl} alt=""/>
                                                  </li>
                                                );
                                              // }
                                            })
                                          }
                                      </ul>
                                  </div>
                              </div>
                              <div className="thumbnail-prev">
                                     <span className='zoom' id='zoom' style={{width:'100%'}}>
                                           <img src={selectedImage} width="100%"/>
                                       </span>
                              </div>
                          </div>

                      </div>
                      <div className="col-lg-5">
                          <div className="produt-details-description">
                              <div className="head-title">
                                  <h3>{product.name}</h3>
                                  {
                                    product.liked ? <div className="fav"></div> : <div style={{margin:10}}></div>
                                  }
                                  {/*<button className="btn btn-edit">Edit</button>*/}
                              </div>
                              { productAvailabilityStatus(product) }

                              <div className="info-item">
                                  <label>Product Type</label>
                                  <h5>{product.productType ? product.productType.name : ''}</h5>
                              </div>
                              <div className="info-item">
                                  <label>Fabric Composition</label>
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
                              <div className="info-item">
                                  <div className="text-left mt-5 mr-5">
                                      <a href="" className="btn btn-outline-secondary mr-3" data-toggle="modal" data-target="#quickQuoteModal" onClick={() => this.props._storeData('choosenIdsForQuick',[this.props.match.params.id])}>Ask for quotation</a>
                                      <a href="" className="btn btn-nitex-default" data-toggle="modal" data-target="#quickProjectModal" onClick={() => this.props._storeData('choosenIdsForQuick',[this.props.match.params.id])}>Start Project</a>
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
      _storeData
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(OurDesignDetails);
