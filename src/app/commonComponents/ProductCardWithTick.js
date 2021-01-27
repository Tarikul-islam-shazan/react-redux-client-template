import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {Dropdown} from 'react-bootstrap';

import { productAvailabilityStatus, addImageSuffix } from '../services/Util';

import { _storeData } from "../pages/design/actions";
// export class ProductCard = ({ item , showDetails , likeProduct , unlikeProduct }) => {

class ProductCard extends Component {

  constructor(props) {
      super(props);
      this.state = {
        step : 1,
        // likeFlag : this.props.item.liked
      };
  }

  componentDidUpdate = (prevProps, prevState) => {
    // if(prevProps.selectedProductIds !== this.props.selectedProductIds){
    //   console.log('componentDidUpdate selectedProductIds',prevProps.selectedProductIds,this.props.selectedProductIds)
    // }
  }

  componentDidMount = async() => {

  }

  startProject = (arr) => {
      this.props._storeData('choosenIdsForQuick',arr)
      this.props._storeData('fromRfq',false)
  }

  toggleSelect = async(productId) => {
    let {selectedProductIds} = this.props;
    if (selectedProductIds.includes(productId)) {
      selectedProductIds = selectedProductIds.filter((id) => id !== productId);
    } else {
      selectedProductIds.push(productId)
    }
    await this.props._storeData('selectedProductIds', selectedProductIds);
    this.props.updateProductCard()
  }

  toggleLike = (productId) => {
    let {product, likeProduct, unlikeProduct} = this.props;
    if (product.liked) {
      unlikeProduct(productId);
    } else {
      likeProduct(productId);
    }
  }

  render() {
    let flag = 1;
    let { product , showDetails , likeProduct , unlikeProduct } = this.props;
    return(
      <div className="item">
          <div className={`card product-card new-card ${product.isSelected ? 'active' : (product.isAddedToList ? 'hovered' : '')}`}>
              <div className="thumb">
                  <div className={`favourite-part choose ${product.isSelected ? 'active' : ''}`} onClick={() => this.toggleSelect(product.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="21.137" height="17.04" viewBox="0 0 21.137 17.04">
                          <path id="Path_27721" data-name="Path 27721" d="M164.573,353.29l3.281,3.949,12.212-12.212" transform="translate(-161.757 -342.198)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"/>
                      </svg>
                  </div>
                  {/*<div className={`favourite-part ${product.liked ? 'active' : ''}`} onClick={() => this.toggleLike(product.id)}>*/}
                  {/*    <svg xmlns="http://www.w3.org/2000/svg" width="14.521" height="13.594" viewBox="0 0 14.521 13.594">*/}
                  {/*        <path id="like_1_" data-name="like (1)" d="M14.5,5.88a4.13,4.13,0,0,0-3.93-4.053A3.9,3.9,0,0,0,7.221,3.768,3.761,3.761,0,0,0,3.954,1.826,4.13,4.13,0,0,0,.024,5.879,4.207,4.207,0,0,0,.148,7.42,6.615,6.615,0,0,0,2.158,10.8L7.217,15.42,12.363,10.8a6.616,6.616,0,0,0,2.01-3.378A4.217,4.217,0,0,0,14.5,5.88Z" transform="translate(0 -1.826)" fill="#9098ac"/>*/}
                  {/*    </svg>*/}
                  {/*</div>*/}

                  <Dropdown className="card-options">
                    <Dropdown.Toggle variant="default" id="dropdown-basic">
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="6" viewBox="0 0 27 6">
                            <g id="Group_10" data-name="Group 10" transform="translate(-4045 -1237) rotate(-90)">
                                <path id="Path_27893" data-name="Path 27893" d="M22.5,19.5a3,3,0,1,1-3-3A3,3,0,0,1,22.5,19.5Z" transform="translate(-1259.5 4039)" fill="#cbcbcb"/>
                                <path id="Path_27894" data-name="Path 27894" d="M22.5,9a3,3,0,1,1-3-3A3,3,0,0,1,22.5,9Z" transform="translate(-1259.5 4039)" fill="#cbcbcb"/>
                                <path id="Path_27895" data-name="Path 27895" d="M22.5,30a3,3,0,1,1-3-3A3,3,0,0,1,22.5,30Z" transform="translate(-1259.5 4039)" fill="#cbcbcb"/>
                            </g>
                        </svg>
                    </Dropdown.Toggle>

                    <Dropdown.Menu alignRight className="dropdown-menu dropdown-menu-right shadow-lg mt-3">
                    {
                      product.liked ?
                      <Dropdown.Item href="#" className="px-4 pb-3 pt-3 font-weight-normal text-black font-15" onClick={(e) => this.props.unlikeProduct(product.id)}>Add to favourites</Dropdown.Item>
                      :
                      <Dropdown.Item href="#" className="px-4 pb-3 pt-3 font-weight-normal text-black font-15" onClick={(e) => this.props.likeProduct(product.id)}>Remove from favourites</Dropdown.Item>
                    }
                      <Dropdown.Item href="#" className="px-4 pt-0 pb-3 font-weight-normal text-black font-15" onClick={() => this.props.addToQuote([product.id])}>Add to quote</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  {/*<div className="card-options dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">
                      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="6" viewBox="0 0 27 6">
                          <g id="Group_10" data-name="Group 10" transform="translate(-4045 -1237) rotate(-90)">
                              <path id="Path_27893" data-name="Path 27893" d="M22.5,19.5a3,3,0,1,1-3-3A3,3,0,0,1,22.5,19.5Z" transform="translate(-1259.5 4039)" fill="#cbcbcb"/>
                              <path id="Path_27894" data-name="Path 27894" d="M22.5,9a3,3,0,1,1-3-3A3,3,0,0,1,22.5,9Z" transform="translate(-1259.5 4039)" fill="#cbcbcb"/>
                              <path id="Path_27895" data-name="Path 27895" d="M22.5,30a3,3,0,1,1-3-3A3,3,0,0,1,22.5,30Z" transform="translate(-1259.5 4039)" fill="#cbcbcb"/>
                          </g>
                      </svg>

                      <div>
                          <ul className="dropdown-menu dropdown-menu-right shadow-lg mt-3" role="menu"
                              aria-labelledby="menu1">
                              <li role="presentation" className="px-4 pb-3 pt-3">
                              {
                                product.liked ?
                                <a role="menuitem" tabIndex="-1" href="#" className="font-weight-normal  text-black" onClick={(e) => this.props.unlikeProduct(product.id)}>Remove from favourites</a>
                                :
                                <a role="menuitem" tabIndex="-1" href="#" className="font-weight-normal  text-black" onClick={(e) => this.props.likeProduct(product.id)}>Add to favourites</a>
                              }
                              </li>
                              <li role="presentation" className="px-4 pb-3" onClick={() => console.log("presentation called")}>
                                  <a role="menuitem" tabIndex="-1" href="#" className="font-weight-normal  text-black" onClick={() => this.props.addToQuote([product.id])}>Add to quote</a>
                              </li>
                              <li role="presentation" className="px-4 pb-3">
                                  <a role="menuitem" tabIndex="-1" href="#" className="font-weight-normal  text-black">Add to collection</a>
                              </li>
                          </ul>
                      </div>
                  </div>*/}
                  <a href={"/products/" + product.id}>
                  {
                    product.designDocuments.length > 0 ?
                    product.designDocuments.map((doc,i) => {
                      if(doc.docType=='PRODUCT_DESIGN' && flag){
                        flag = 0;
                        return (
                          <img key={i} src={addImageSuffix(doc.docUrl, '_xthumbnail')} alt="designer" className="card-img-top img-fluid d-block mx-auto"/>
                        )
                      }
                      if(product.designDocuments.length==i+1 && flag){
                        return(
                          <img key={i} src={product.designDocuments[0].docUrl} alt="designer" className="card-img-top img-fluid d-block mx-auto"/>
                        )
                      }
                    })
                    :
                    <img src={require("../assets/images/default_product.svg")} alt="designer" className="card-img-top img-fluid d-block mx-auto"/>
                  }
                  </a>
                  {/*<button className="btn-brand">Quote Now</button>*/}
              </div>
              <div className="card-body">
                  <h5 className="card-title text-capitalize">{product.name}</h5>
                  <span className="design-category">{product.productGroup}</span>
                  <div className="card-footer">
                      <div className="quantity">
                          <span>MOQ <strong>{product.minimumOrderQuantity ? `${product.minimumOrderQuantity} Pcs` : `-- Pcs`}</strong></span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="10.814" height="14.581" viewBox="0 0 10.814 14.581">
                              <line id="Line_116" data-name="Line 116" y1="14" x2="10" transform="translate(0.407 0.291)" fill="none" stroke="#c1c7d5" strokeWidth="1"/>
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

                              <strong> {product.turnAroundTime ? `${product.turnAroundTime} Days` : `-- Days`}</strong>
                          </span>
                      </div>
                      {productAvailabilityStatus(product)}
                  </div>
              </div>
          </div>
      </div>
    )
  }

}

const mapStateToProps = store => {
  return {
		// project_type: store.project.project_type
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



export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
