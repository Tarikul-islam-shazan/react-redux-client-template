import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import $ from "jquery";
import loadjs from "loadjs";
import Carousel from "react-elastic-carousel";
import LoadingOverlay from "react-loading-overlay";

import Http from "../../services/Http";
import { toastSuccess, toastError, toastWarning } from "../../commonComponents/Toast";
import ProductCard from "../../commonComponents/ProductCard";
import ProductCardWithTick from "../../commonComponents/ProductCardWithTick";
import { ProductSkeleton, CreateSkeletons } from "../../commonComponents/ProductSkeleton";

import {
    LOADER_OVERLAY_BACKGROUND,
    LOADER_COLOR,
    LOADER_WIDTH,
    LOADER_TEXT,
    LOADER_POSITION,
    LOADER_TOP,
    LOADER_LEFT,
    LOADER_MARGIN_TOP,
    LOADER_MARGIN_LEFT,
} from "../../constant";
import { _getKey, formatProductTypeWithGroup } from "../../services/Util";
import { _storeData } from "./actions";

const isSelected = (filters, type, id) => {
    let flag = false;
    filters.map((filter) => {
        if (filter.type === type && filter.id === id) {
            flag = true;
        }
    });
    return flag;
};

class ShowProductCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupwiseProductList: [],
            loading: false,
            designList: [],
            page: 0,
            size: 20,
            search: "",
            hasNext: true, //to check if pagination is available or not
            height: window.innerHeight,
            suggestions: [],
            showSuggestions: false,
            collection: {},
        };
    }

    handleScroll = async () => {
        const windowHeight =
            "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            let { hasNext, page, loading, designList, size } = this.state;
            console.log("message", "bottom reached", hasNext, page, loading);
            if (hasNext && !loading && designList.length) {
                let data = await this.renderList(page + 1);
                if (data.length > 0) {
                    await this.setState({
                        designList: [...designList, ...data],
                        page: page + 1,
                        hasNext: data.length === size ? true : false,
                        loading: false,
                    });
                    this.updateProductCard();
                } else {
                    this.setState({
                        // designList : [],
                        hasNext: false,
                        loading: false,
                    });
                    // toastWarning("Product List - no data found.");
                }
            } else if (designList.length) {
                if (!hasNext) {
                    // toastWarning("No more data found.")
                }
            }
            // this.setState({
            //     message: 'bottom reached'
            // });
        } else {
        }
    };

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    componentDidMount = async () => {
        document.title = "Explore designs - Nitex - The easiest clothing manufacturing software";
        window.addEventListener("scroll", this.handleScroll);
        this.setState({ loading: true });
        let id = this.props.match.params.id;

        await this.getCollectionDetails(id);

        let designList = await this.renderList(0);
        await this.setState({
            designList,
            hasNext: designList.length === this.state.size ? true : false,
            loading: false,
        });
        await this.updateProductCard();
        this.setState({ loading: false });
    };

    getCollectionDetails = (collectionId) => {
        this.setState({ loading: true });
        let { size, name } = this.state;
        Http.GET("getCollectionDetails", collectionId)
            .then(({ data }) => {
                console.log("getCollectionDetails SUCCESS: ", data);
                if (data) {
                    this.setState({ collection: data });
                }
            })
            .catch(({ response }) => {
                console.log("getCollectionDetails ERROR: ", JSON.stringify(response));
                this.setState({ loading: false });
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Something went wrong! Please try again.");
                }
            });
    };

    renderList = async (page = 0) => {
        this.setState({ loading: true, searching: true });
        let { size, designList, search, sort, productTypeId, filters } = this.state;
        let params = `?page=${page}&size=${size}&searchText=${search}`;
        let result = [];
        let id = this.props.match.params.id;
        await Http.GET("getProductCollectionList", id + params)
            .then(({ data }) => {
                console.log("PRODUCT LIST SUCCESS: ", data);
                this.setState({ loading: false });
                if (data.data) {
                    result = data.data;
                }
            })
            .catch(({ response }) => {
                console.log("PRODUCT LIST ERROR: ", JSON.stringify(response));
                this.setState({ loading: false });
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Something went wrong! Please try again.");
                }
            });
        return result;
    };

    onChange = async (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value,
                page: 0,
                hasNext: true,
                productTypeId: "",
                // size : 100
            },
            async (name) => {
                //this.fetchSuggestions();
            }
        );
    };

    onChangeSrchText = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    keyPressed = async (e) => {
        // console.log("entered")
        if (e.key === "Enter") {
            this._search();
        }
    };

    _search = async () => {
        await this.setState({
            page: 0,
            hasNext: true,
            productTypeId: "",
            showFilters: false,
            showSuggestions: false,
            designList: [],
            loading: true,
        });
        let designList = await this.renderList();
        await this.setState({
            designList,
            hasNext: designList.length === this.state.size ? true : false,
            loading: false,
        });
        this.updateProductCard();
    };

    details = (id = 0) => {
        window.open("/my-products/" + id, "_blank");
    };

    likeProduct = (id) => {
        this.setState({
            loading: true,
        });

        Http.POST("likeProduct", {}, id)
            .then(({ data }) => {
                console.log("likeProduct SUCCESS: ", JSON.stringify(data));
                this.setState({ loading: false });
                if (data.success) {
                    // toastSuccess(data.message);
                    let { designList, landingData } = this.state;
                    designList = designList.map((item, i) => {
                        if (item.id == id) {
                            item.liked = true;
                            return item;
                        }
                        return item;
                    });
                    this.setState({
                        designList,
                    });
                } else {
                    toastError(data.message);
                }
            })
            .catch(({ response }) => {
                console.log("LOGIN Error: ", JSON.stringify(response));
                this.setState({ loading: false });
                if (response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Request wasn't successful.");
                }
            });
    };

    unlikeProduct = (id) => {
        this.setState({
            loading: true,
        });

        Http.POST("unlikeProduct", {}, id)
            .then(({ data }) => {
                console.log("unlikeProduct SUCCESS: ", JSON.stringify(data));
                if (data.success) {
                    // toastSuccess(data.message);
                    let { designList, landingData } = this.state;
                    designList = designList.map((item, i) => {
                        if (item.id == id) {
                            item.liked = false;
                            return item;
                        }
                        return item;
                    });
                    this.setState({
                        designList,
                    });
                } else {
                    toastError(data.message);
                }
                this.setState({ loading: false });
            })
            .catch(({ response }) => {
                console.log("unlikeProduct Error: ", JSON.stringify(response));
                this.setState({ loading: false });
                if (response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Request wasn't successful.");
                }
            });
    };

    updateProductCard = () => {
        let { selectedProductIds } = this.props;
        let { designList } = this.state;
        designList = designList.map((product) => {
            if (selectedProductIds.includes(product.id)) {
                product.isSelected = true;
            } else {
                product.isSelected = false;
            }
            if (selectedProductIds.length) {
                product.isAddedToList = true;
            } else {
                product.isAddedToList = false;
            }
            return product;
        });
        this.setState({ designList });
    };

    render() {
        let { designList, showSuggestions, suggestions, search, collection } = this.state;
        return (
            <div className="explore-design">
                {/*<div className="filter-container explore-design-filter">
                  <div className="cat-menu cat-mobile-menu d-block d-xl-none" data-toggle="modal" data-target="#CatMenuMobile">
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="18" viewBox="0 0 26 18">
                          <g id="menu_5_" data-name="menu (5)" transform="translate(-2.5 -5)">
                              <line id="Line_53" data-name="Line 53" x2="18" transform="translate(6.5 14)" fill="none" stroke="#818ba0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                              <line id="Line_54" data-name="Line 54" x2="24" transform="translate(3.5 6)" fill="none" stroke="#818ba0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                              <line id="Line_55" data-name="Line 55" x2="9" transform="translate(11.5 22)" fill="none" stroke="#818ba0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                          </g>
                      </svg>
                  </div>
                  <div className="search flex-grow-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16.55" height="16.508" viewBox="0 0 16.55 16.508">
                          <path id="Path_23797" data-name="Path 23797" d="M15.916,15.191l-3.89-3.89a6.831,6.831,0,1,0-.674.674l3.89,3.89a.482.482,0,0,0,.337.142.468.468,0,0,0,.337-.142A.48.48,0,0,0,15.916,15.191ZM1,6.826A5.867,5.867,0,1,1,6.872,12.7,5.874,5.874,0,0,1,1,6.826Z" transform="translate(0.2 0.25)" fill="#a1a6b2" stroke="#a1a6b2" stroke-width="0.5"/>
                      </svg>
                      <input type="search" autocomplete="chrome-off" onFocus={() => this.setState({showSuggestions: true})} placeholder="Product name, collection name" name="search" className="w-100" value={search} onChange={this.onChange} onKeyPress={this.keyPressed}/>
                        {
                          showSuggestions &&
                          <div className="search-suggestions" ref={(node) => this.searchSuggestions = node}>
                            <ul>
                            {
                              suggestions.map((suggestion, i) => {
                                return(
                                  <li key={i} onClick={async() => {
                                    await this.setState({
                                      showSuggestions: false,
                                      search: suggestion.text
                                    })
                                    this._search();
                                  }}>
                                      {suggestion.text}
                                  </li>
                                )
                              })
                            }
                            </ul>
                          </div>
                      }
                  </div>
              </div>*/}
                <div className="designs">
                    <h4 className="mb-4 font-weight-normal">{collection.name}</h4>
                    <div className="show-products">
                        {designList.map((product, i) => {
                            return (
                                <ProductCardWithTick
                                    key={i}
                                    product={product}
                                    updateProductCard={() => this.updateProductCard()}
                                    likeProduct={this.likeProduct}
                                    unlikeProduct={this.unlikeProduct}
                                    details={this.details}
                                />
                            );
                        })}
                        {this.state.loading && (
                            <CreateSkeletons iterations={12}>
                                <ProductSkeleton />
                            </CreateSkeletons>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowProductCollection);
