import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Dropdown } from "react-bootstrap";

import {
    productAvailabilityStatus,
    addImageSuffix,
    STATUS_NOT_ALLOWED_FOR_SELECTION,
} from "../services/Util";

import { _storeData } from "../pages/design/actions";
// export class ProductCard = ({ item , showDetails , likeProduct , unlikeProduct }) => {

class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            // likeFlag : this.props.item.liked
        };
    }

    componentDidUpdate = (prevProps, prevState) => {
        // if(prevProps.selectedProductIds !== this.props.selectedProductIds){
        //   console.log('componentDidUpdate selectedProductIds',prevProps.selectedProductIds,this.props.selectedProductIds)
        // }
    };

    componentDidMount = async () => {};

    startProject = (arr) => {
        this.props._storeData("choosenIdsForQuick", arr);
        this.props._storeData("fromRfq", false);
    };

    toggleSelect = async (productId) => {
        let { selectedProductIds } = this.props;
        if (selectedProductIds.includes(productId)) {
            selectedProductIds = selectedProductIds.filter((id) => id !== productId);
        } else {
            selectedProductIds.push(productId);
        }
        await this.props._storeData("selectedProductIds", selectedProductIds);
        this.props.updateProductCard();
    };

    toggleLike = (productId) => {
        let { product, likeProduct, unlikeProduct } = this.props;
        if (product.liked) {
            unlikeProduct(productId);
        } else {
            likeProduct(productId);
        }
    };

    render() {
        let flag = 1;
        let { product, showDetails, likeProduct, unlikeProduct, showEdit } = this.props;
        let disabled = STATUS_NOT_ALLOWED_FOR_SELECTION.includes(product.availabilityStatus);
        return (
            <div className="item">
                <div
                    className={`card product-card new-card ${
                        product.isSelected ? "active" : product.isAddedToList ? "hovered" : ""
                    }`}
                >
                    <div className="thumb">
                        {disabled ? (
                            <div
                                className="favourite-part choose disabled"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Design not available"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="21.137"
                                    height="17.04"
                                    viewBox="0 0 21.137 17.04"
                                >
                                    <path
                                        id="Path_27721"
                                        data-name="Path 27721"
                                        d="M164.573,353.29l3.281,3.949,12.212-12.212"
                                        transform="translate(-161.757 -342.198)"
                                        fill="none"
                                        stroke="#fff"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="4"
                                    />
                                </svg>
                            </div>
                        ) : (
                            <div
                                className={`favourite-part choose ${
                                    product.isSelected ? "active" : ""
                                }`}
                                onClick={() => this.toggleSelect(product.id)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="21.137"
                                    height="17.04"
                                    viewBox="0 0 21.137 17.04"
                                >
                                    <path
                                        id="Path_27721"
                                        data-name="Path 27721"
                                        d="M164.573,353.29l3.281,3.949,12.212-12.212"
                                        transform="translate(-161.757 -342.198)"
                                        fill="none"
                                        stroke="#fff"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="4"
                                    />
                                </svg>
                            </div>
                        )}

                        {/*<div className={`favourite-part ${product.liked ? 'active' : ''}`} onClick={() => this.toggleLike(product.id)}>*/}
                        {/*    <svg xmlns="http://www.w3.org/2000/svg" width="14.521" height="13.594" viewBox="0 0 14.521 13.594">*/}
                        {/*        <path id="like_1_" data-name="like (1)" d="M14.5,5.88a4.13,4.13,0,0,0-3.93-4.053A3.9,3.9,0,0,0,7.221,3.768,3.761,3.761,0,0,0,3.954,1.826,4.13,4.13,0,0,0,.024,5.879,4.207,4.207,0,0,0,.148,7.42,6.615,6.615,0,0,0,2.158,10.8L7.217,15.42,12.363,10.8a6.616,6.616,0,0,0,2.01-3.378A4.217,4.217,0,0,0,14.5,5.88Z" transform="translate(0 -1.826)" fill="#9098ac"/>*/}
                        {/*    </svg>*/}
                        {/*</div>*/}

                        <Dropdown className="card-options">
                            <Dropdown.Toggle variant="default" id="dropdown-basic">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="27"
                                    height="6"
                                    viewBox="0 0 27 6"
                                >
                                    <g
                                        id="Group_10"
                                        data-name="Group 10"
                                        transform="translate(-4045 -1237) rotate(-90)"
                                    >
                                        <path
                                            id="Path_27893"
                                            data-name="Path 27893"
                                            d="M22.5,19.5a3,3,0,1,1-3-3A3,3,0,0,1,22.5,19.5Z"
                                            transform="translate(-1259.5 4039)"
                                            fill="#cbcbcb"
                                        />
                                        <path
                                            id="Path_27894"
                                            data-name="Path 27894"
                                            d="M22.5,9a3,3,0,1,1-3-3A3,3,0,0,1,22.5,9Z"
                                            transform="translate(-1259.5 4039)"
                                            fill="#cbcbcb"
                                        />
                                        <path
                                            id="Path_27895"
                                            data-name="Path 27895"
                                            d="M22.5,30a3,3,0,1,1-3-3A3,3,0,0,1,22.5,30Z"
                                            transform="translate(-1259.5 4039)"
                                            fill="#cbcbcb"
                                        />
                                    </g>
                                </svg>
                            </Dropdown.Toggle>

                            <Dropdown.Menu
                                alignRight
                                className="dropdown-menu dropdown-menu-right shadow-lg mt-2"
                            >
                                {product.liked ? (
                                    <Dropdown.Item
                                        href="#"
                                        className="px-4 pb-3 pt-3 font-weight-normal text-black font-15"
                                        onClick={(e) => this.props.unlikeProduct(product.id)}
                                    >
                                        Remove from favourites
                                    </Dropdown.Item>
                                ) : (
                                    <Dropdown.Item
                                        href="#"
                                        className="px-4 pb-3 pt-3 font-weight-normal text-black font-15"
                                        onClick={(e) => this.props.likeProduct(product.id)}
                                    >
                                        Add to favourites
                                    </Dropdown.Item>
                                )}
                                {disabled ? (
                                    <></>
                                ) : (
                                    <Dropdown.Item
                                        href="#"
                                        className="px-4 pt-0 pb-3 font-weight-normal text-black font-15"
                                        onClick={() => this.props.addToQuote([product.id])}
                                    >
                                        Add to quote
                                    </Dropdown.Item>
                                )}
                                {showEdit ? (
                                    <Dropdown.Item
                                        href={`/designs/edit/${product.id}`}
                                        className="px-4 pt-0 pb-3 font-weight-normal text-black font-15"
                                    >
                                        Edit Design
                                    </Dropdown.Item>
                                ) : (
                                    <></>
                                )}
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
                        {/* <a href={"/designs/view/" + product.id}> */}
                        <Link to={"/designs/view/" + product.id}>
                            {product.designDocuments.length > 0 ? (
                                product.designDocuments.map((doc, i) => {
                                    if (doc.docType == "PRODUCT_DESIGN" && flag) {
                                        flag = 0;
                                        return (
                                            <img
                                                key={i}
                                                src={addImageSuffix(doc.docUrl, "_xthumbnail")}
                                                alt="designer"
                                                className="card-img-top img-fluid d-block mx-auto"
                                            />
                                        );
                                    }
                                    if (product.designDocuments.length == i + 1 && flag) {
                                        return (
                                            <img
                                                key={i}
                                                src={product.designDocuments[0].docUrl}
                                                alt="designer"
                                                className="card-img-top img-fluid d-block mx-auto"
                                            />
                                        );
                                    }
                                })
                            ) : (
                                <img
                                    src={require("../assets/images/default_product.svg")}
                                    alt="designer"
                                    className="card-img-top img-fluid d-block mx-auto"
                                />
                            )}
                        </Link>
                        {/*<button className="btn-brand">Quote Now</button>*/}
                    </div>
                    <div className="card-body">
                        <h5 className="card-title text-capitalize">{product.name}</h5>
                        <div className="card-footer">
                            <div className="quantity">
                                {/* <span className="design-category">
                                    {product.productGroup}, {product.productType}
                                </span> */}
                                {product.minimumOrderQuantity && (
                                    <span>
                                        <strong>{product.minimumOrderQuantity} MOQ </strong>
                                    </span>
                                )}
                                {product.gsm && (
                                    <span
                                        className={`design-category ${
                                            product.minimumOrderQuantity ? "dot" : ""
                                        }`}
                                    >
                                        {product.gsm} GSM
                                    </span>
                                )}

                                {product.composition && (
                                    <span className={`design-category ${product.gsm ? "dot" : ""}`}>
                                        {product.composition}
                                    </span>
                                )}
                            </div>
                            {/*{productAvailabilityStatus(product)}*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        // project_type: store.project.project_type
        selectedProductIds: store.product.selectedProductIds,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            _storeData,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
