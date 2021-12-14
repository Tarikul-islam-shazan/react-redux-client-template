import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import $ from "jquery";
import loadjs from "loadjs";
import LoadingOverlay from "react-loading-overlay";
import Http from "../../services/Http";
import { toastSuccess, toastError, toastWarning } from "../../commonComponents/Toast";
import ProductCard from "../../commonComponents/ProductCard";
import ProductCardWithTick from "../../commonComponents/ProductCardWithTick";
import { ProductSkeleton, CreateSkeletons } from "../../commonComponents/ProductSkeleton";
import { QuoteNowProduct } from "./components/QuoteNowProduct";
import { QuoteNowMyProductCard } from "./components/QuoteNowMyProductCard";
import EmptyState from "../../commonComponents/EmptyState";

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
    LOCAL_QUOTE_NOW_KEY,
} from "../../constant";
import { _getKey, formatProductTypeWithGroup, copy } from "../../services/Util";
import { fetchGeneralSettingsData } from "../../redux/actions";
import { _storeData, _getProductForQuote, getTotal } from "./actions";

class QuoteNowCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            designList: [],
            page: 0,
            size: 10,
            search: "",
            hasNext: true, //to check if pagination is available or not
            height: window.innerHeight,
            cart: [],
            title: "",
            TURN_AROUND_TIME: "",
            MOQ: "",
        };
    }

    handleScroll = async () => {
        const wrappedElement = document.getElementById("sidebarCollapse");
        if (
            wrappedElement.scrollHeight - wrappedElement.scrollTop ===
            wrappedElement.clientHeight
        ) {
            let { hasNext, page, loading, designList, size } = this.state;
            if (hasNext && !loading && designList.length) {
                let data = await this.renderList(page + 1);
                if (data.length > 0) {
                    await this.setState({
                        designList: [...designList, ...data],
                        page: page + 1,
                        hasNext: data.length === size ? true : false,
                        loading: false,
                    });
                } else {
                    this.setState({
                        // designList : [],
                        hasNext: false,
                        loading: false,
                    });
                    // toastWarning("Product List - no data found.");
                }
            } else {
                if (!hasNext) {
                    // toastWarning("No more rfq's found.")
                }
            }
        }
    };

    componentDidMount = async () => {
        document.title = "Request quotes with Nitex - The easiest clothing manufacturing software";
        // window.addEventListener("scroll", this.handleScroll);
        let quote = localStorage.getItem(LOCAL_QUOTE_NOW_KEY);

        if (quote) {
            quote = JSON.parse(quote);
            if (quote && quote.products) {
                this.setState({
                    cart: quote.products,
                });
            }
            if (quote && quote.title) {
                this.setState({
                    title: quote.title,
                });
            }
            if (quote) {
                this.props._storeData("quoteObj", quote);
            }
        }

        const keys = ["MOQ", "TURN_AROUND_TIME"];
        const data = await fetchGeneralSettingsData(keys);
        if (data) {
            this.setState({
                TURN_AROUND_TIME: data["TURN_AROUND_TIME"] ? data["TURN_AROUND_TIME"].value : "",
                MOQ: data["MOQ"] ? data["MOQ"].value : "",
            });
        }
        // this.setState({loading: true});
        let designList = await this.renderList();
        this.setState({ designList });
    };

    renderList = async (page = 0) => {
        this.setState({ loading: true, searching: true });
        let { size, designList, search, sort, productTypeId, filters } = this.state;
        let params = `?page=${page}&size=${size}&filterBy=ADDED_BY_ME&filterBy=FAVED_BY_ME&filterBy=QUOTATION`;
        let designParams = `?page=${page}&size=${size}&availabilityStatus=AVAILABLE`;
        let result = [];
        await Http.GET("getProductList", params)
            .then(({ data }) => {
                this.setState({ loading: false });
                if (data && data.length > 0) {
                    const designList = data.filter(
                        (design) => design.availabilityStatus === "AVAILABLE"
                    );
                    result = [...result, ...designList];
                }
            })
            .catch((response) => {
                this.setState({ loading: false });
                toastError("Something went wrong! Please try again.");
            });

        await Http.GET("searchProduct", designParams)
            .then(({ data }) => {
                this.setState({ loading: false });
                if (data.productResponseList && data.productResponseList.length > 0) {
                    const pickDesignList = data.productResponseList.filter(
                        (design) => design.availabilityStatus === "AVAILABLE"
                    );
                    result = [...result, ...pickDesignList];
                }
            })
            .catch(({ response }) => {
                this.setState({ loading: false });
                toastError("Something went wrong! Please try again.");
            });
        return result;
    };

    onChange = async (e) => {
        await this.setState({
            [e.target.name]: e.target.value,
        });
        await this.updateCartGlobally();
    };

    onChangeQuantity = async (productIndex, colorIndex, name, value) => {
        let { cart } = this.state;
        let copiedCart = copy(cart);
        copiedCart[productIndex].colorWiseSizeQuantityPairList[colorIndex].sizeQuantityPairList.map(
            (pair) => {
                if (pair.code === name) {
                    pair.quantity = value;
                }
            }
        );
        await this.setState({ cart: copiedCart });
        await this.updateCartGlobally();
    };

    updateCart = async (cart) => {
        await this.setState({ cart });
        await this.updateCartGlobally();
    };

    removeFromCart = async (index) => {
        let { cart } = this.state;
        let newCart = [...cart];
        newCart = newCart.filter((product, i) => i !== index);
        this.updateCart(newCart);
    };

    updateCartGlobally = async () => {
        let { title, cart } = this.state;
        cart = cart.map((product) => {
            product.error = "";
            return product;
        });
        let quote = {
            title,
            products: cart,
        };
        await this.setState({ cart });
        await this.props._storeData("quoteObj", quote);
        localStorage.setItem(LOCAL_QUOTE_NOW_KEY, JSON.stringify(quote));
    };

    addToQuote = async (ids) => {
        let products = await _getProductForQuote(ids);
        let quote = localStorage.getItem(LOCAL_QUOTE_NOW_KEY);
        if (quote) {
            quote = JSON.parse(quote);
        }
        if (quote && quote.products && quote.products.length) {
            quote.products = [...quote.products, ...products];
        } else if (quote) {
            quote.products = products;
        } else {
            quote = {
                products,
            };
        }
        this.setState({ cart: quote.products });
        localStorage.setItem(LOCAL_QUOTE_NOW_KEY, JSON.stringify(quote));
        await this.props._storeData("quoteObj", quote);
        await this.props._storeData("selectedProductIds", []);
    };

    validate = () => {
        this.setState({ loading: false });
        let { cart, title } = this.state;
        let flag = true;
        cart = cart.map((product, i) => {
            let tempFlag = true;
            product.colorWiseSizeQuantityPairList.map((colorWithSize) => {
                colorWithSize.sizeQuantityPairList.map((pair) => {
                    if (
                        getTotal(colorWithSize.sizeQuantityPairList) <
                        parseInt(product.minimumOrderQuantity)
                    ) {
                        flag = false;
                        tempFlag = false;
                        product.error = "Please insert values greater than or equal to MOQ";
                    }
                });
            });
            if (tempFlag) {
                product.error = "";
            }
            return product;
        });
        this.setState({ cart });
        return flag;
    };

    removeAllFromCart = async () => {
        let { cart } = this.state;
        cart = [];
        this.updateCart(cart);
    };

    submit = async () => {
        let { title, cart } = this.state;
        await this.setState({ loading: true });
        if (this.validate()) {
            let body = {
                name: title,
                rfqRequestDTOList: cart.map((product) => {
                    let total = 0;
                    product.colorWiseSizeQuantityPairList.map((colorWithSize) => {
                        colorWithSize.sizeQuantityPairList.map((pair) => {
                            if (pair.quantity === "" || pair.quantity === null) {
                                pair.quantity = 0;
                            } else {
                                total += parseInt(pair.quantity);
                            }
                        });
                    });
                    return {
                        productId: product.id,
                        total,
                        colorWiseSizeQuantityPairList: product.colorWiseSizeQuantityPairList,
                    };
                }),
            };
            await Http.POST("addRfq", body)
                .then(({ data }) => {
                    this.setState({ loading: false });
                    if (data.success) {
                        localStorage.setItem(LOCAL_QUOTE_NOW_KEY, "");
                        toastSuccess(data.message);
                        this.removeAllFromCart();
                        this.props.history.push("/quotes/list");
                    } else {
                        toastError(data.message);
                    }
                })
                .catch((response) => {
                    this.setState({ loading: false });
                    toastError("Something went wrong! Please try again.");
                });
        }
    };

    render() {
        let { designList, cart, title, TURN_AROUND_TIME, MOQ, loading } = this.state;
        return (
            <div className="add-quote d-flex">
                <div className="confirm-quote-request">
                    {cart.length !== 0 ? (
                        <>
                            <div className="header-title d-flex justify-content-between align-items-center">
                                <a href="#">
                                    <h3 className="text-black">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="13.903"
                                            height="25.806"
                                            viewBox="0 0 13.903 25.806"
                                            className="mr-4"
                                            onClick={() => this.props.history.goBack()}
                                        >
                                            <path
                                                id="Path_27864"
                                                data-name="Path 27864"
                                                d="M3768.991,1419.1l-11.489-11.489,11.489-11.489"
                                                transform="translate(-3756.502 -1394.708)"
                                                fill="none"
                                                stroke="#21242b"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                            />
                                        </svg>
                                        Confirm RFQ
                                    </h3>
                                </a>
                                <div className="add-more-design font-14 brand-color text-underline d-block d-xl-none cursor-pointer">
                                    Add more designs
                                </div>
                            </div>
                            <div className="mt-3 rfq-title">
                                <label>RFQ title*</label>
                                <input
                                    type="text"
                                    placeholder="Give a title forr your request"
                                    name="title"
                                    value={title}
                                    onChange={this.onChange}
                                    className="w-100 bg-gray-light"
                                />
                            </div>
                            <div className="quote-req-list-container mt-3">
                                {
                                    cart.map((product, i) => {
                                        return (
                                            <QuoteNowProduct
                                                key={i}
                                                product={product}
                                                index={i}
                                                onChange={this.onChangeQuantity}
                                                remove={this.removeFromCart}
                                                defaultTurnAroundTime={TURN_AROUND_TIME}
                                                defaultMoq={MOQ}
                                            />
                                        );
                                    })
                                    // .reverse()
                                }
                                <button
                                    className="m-0 btn-brand  shadow float-right"
                                    onClick={this.submit}
                                >
                                    Submit to RFQ
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="mt-5 not-found">
                            <EmptyState title="No quote added yet" />
                        </div>
                    )}
                </div>
                <div className="">
                    <div
                        className="add-more ml-auto"
                        id="sidebarCollapse"
                        onScroll={this.handleScroll}
                    >
                        <div id="closeRPop" className="p-3 cursor-pointer d-inline-block d-xl-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22.84"
                                height="12.32"
                                viewBox="0 0 22.84 12.32"
                            >
                                <g
                                    id="Group_5016"
                                    data-name="Group 5016"
                                    transform="translate(-1582.964 -1119.323)"
                                >
                                    <path
                                        id="Path_2339"
                                        data-name="Path 2339"
                                        d="M6734.325,696h21.625"
                                        transform="translate(-5151.361 429.59)"
                                        fill="none"
                                        stroke="#000"
                                        stroke-width="1.5"
                                    />
                                    <path
                                        id="Path_2340"
                                        data-name="Path 2340"
                                        d="M6766.935,684.293l5.8,5.8-5.46,5.46"
                                        transform="translate(-5167.99 435.56)"
                                        fill="none"
                                        stroke="#000"
                                        stroke-width="1.5"
                                    />
                                </g>
                            </svg>
                        </div>
                        <div className="header rfq-header">
                            
                            <div className="rfq-design-btn">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h4 className="semibold">Select design for RFQ</h4>   
                                    <button onClick={() => window.open("/designs/add")}>
                                        <span>Design</span>
                                        <img src="../icons/upload.svg"/>
                                    </button>
                                </div>
                                <div className="search">
                                    <img src="../icons/search.svg" />
                                    <input type="search" className="w-100" placeholder="Search"/>
                                </div>
                            </div>
                        </div>

                        <div className="added-item  custom-scrollbar">
                            {!loading ? (
                                designList.map((product, i) => {
                                    return (
                                        <QuoteNowMyProductCard
                                            key={i}
                                            cart={cart}
                                            product={product}
                                            addToQuote={this.addToQuote}
                                            defaultTurnAroundTime={TURN_AROUND_TIME}
                                            defaultMoq={MOQ}
                                        />
                                    );
                                })
                            ) : (
                                <CreateSkeletons iterations={12}>
                                    <ProductSkeleton />
                                </CreateSkeletons>
                            )}
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuoteNowCart);
