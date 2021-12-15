import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from "loadjs";
import Modal from "react-bootstrap/Modal";
import Http from "../../services/Http";
import { toastSuccess, toastError } from "../../commonComponents/Toast";
import EmptyState from "../../commonComponents/EmptyState";
import ProductCardWithTick from "../../commonComponents/ProductCardWithTick";
import { ProductSkeleton, CreateSkeletons } from "../../commonComponents/ProductSkeleton";

import { LOCAL_QUOTE_NOW_KEY } from "../../constant";
import {
    _getKey,
    formatProductTypeWithGroup,
    STATUS_NOT_ALLOWED_FOR_SHOW_EXPLORE_DESIGN,
} from "../../services/Util";
import { _storeData, _getProductForQuote } from "./actions";
import MyCollections from "./components/MyCollections";

const isSelected = (filters, type, id) => {
    let flag = false;
    filters.map((filter) => {
        if (filter.type === type && filter.id === id) {
            flag = true;
        }
    });
    return flag;
};

// const breakPoints = [
//     { width: 767, itemsToShow: 1 },
//     { width: 768, itemsToShow: 2 },
//     { width: 1024, itemsToShow: 3 },
//     { width: 1366, itemsToShow: 4 },
//     { width: 1920, itemsToShow: 5 },
// ];

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1025, itemsToShow: 4 },
    { width: 1440, itemsToShow: 5 },
];

class PickDesignV2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupwiseProductList: [],
            loading: false,
            designList: [],
            page: 0,
            size: 20,
            search: "",
            sort: "favCount,desc",
            productTypeId: "",
            popular: [],
            trending: [],
            nitexSuggestion: [],
            hasNext: true, //to check if pagination is available or not
            height: window.innerHeight,
            landingData: [],
            showFilters: false,
            filterOptions: {},
            showSelectedFilters: false,
            filters: [],
            suggestions: [],
            searching: false,
            initialLoading: false,
            showSuggestions: false,
            responsiveFilterModal: false,
            pagination: 0,
            collectionList: [],
            collectionName: "",
            collectionNameError: "",
            showAddCollectionPopup: false,
        };
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    };

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
            let { hasNext, page, loading, designList, size, landingData } = this.state;
            if (hasNext && !loading) {
                let data = await this.renderList(page + 1);
                if (data.length > 0) {
                    await this.setState({
                        designList: [...designList, ...data],
                        // landingData: [...landingData, ...data],
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

    handleClickOutside = (event) => {
        if (this.searchSuggestions && !this.searchSuggestions.contains(event.target)) {
            this.setState({
                showSuggestions: false,
            });
        }

        if (this.searchFilters && !this.searchFilters.contains(event.target)) {
            this.setState({
                showFilters: false,
                filters: this.state.filters.filter((item) => item.showSelected),
            });
        }

        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                showAddCollectionPopup: false,
            });
        }
    };

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    componentDidMount = async () => {
        document.title = "Explore designs with Nitex - The easiest clothing manufacturing software";
        document.addEventListener("mousedown", this.handleClickOutside);
        window.addEventListener("scroll", this.handleScroll);
        this.setState({ loading: true });

        let designList = await this.renderList();
        this.setState({ designList: designList });

        this.setFilterOptions();
        this.fetchCollectionList();
    };

    setFilterOptions = async () => {
        Http.GET("getExploreDesignFilterOptions")
            .then(({ data }) => {
                let response = { ...data };
                this.setState({ filterOptions: response });
            })
            .catch(({ response }) => {});
    };

    fetchCollectionList = () => {
        let userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            userInfo = JSON.parse(userInfo);
        } else {
            userInfo = {};
        }
        Http.GET("getUserCollectionList", userInfo.id)
            .then(({ data }) => {
                if (data.data) {
                    this.setState({ collectionList: data.data });
                }
            })
            .catch(({ response }) => {});
    };

    setFilters = async (type, id, name) => {
        let { filters, search } = this.state;
        let flag = true;
        filters.map((filter) => {
            if (filter.type === type && filter.id === id) {
                flag = false;
            }
        });
        if (flag) {
            filters.push({ type, id, name, showSelected: false });
        } else {
            filters = filters.filter((filter) => !(filter.type === type && filter.id === id));
            if (!filters.length && search === "") {
                await this.resetFilter();
                return;
            }
        }
        await this.setState({
            filters,
            showSelectedFilters: filters.length === 0 ? false : this.state.showSelectedFilters,
        });
        if (!flag) {
            this._search();
        }
    };

    renderList = async (page = 0) => {
        this.setState({ loading: true });
        let { size, designList, search, sort, productTypeId, filters } = this.state;
        let params = `?page=${page}&size=${size}&exploreDesign=true`;
        if (search) {
            params += `&search=${search.trim()}`;
        }
        filters.map((filter) => {
            let key = "";
            if (filter.type === "CATEGORY") {
                key = "category";
            } else if (filter.type === "SEASON") {
                key = "season";
            } else if (filter.type === "FABRIC_TYPE") {
                key = "fabricType";
            } else if (filter.type === "MARKET") {
                key = "productGroupId";
            } else if (filter.type === "COMPOSITION") {
                key = "composition";
            }
            params += `&${key}=${filter.id}`;
        });
        let result = [];
        await Http.GET("searchProduct", params) //previous url -> getPickDesign
            .then(({ data }) => {
                this.setState({ loading: false });
                if (data.productResponseList) {
                    this.setState({ pagination: data.totalHits });
                    result = data.productResponseList;
                } else {
                    // toastWarning("Product List - no data found.");
                }
                loadjs(["/js/script.js", "/js/custom.js"]);
            })
            .catch((response) => {
                this.setState({ loading: false });
                toastError("Something went wrong! Please try again.");
            });
        return result;
    };

    onChange = async (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            page: 0,
            hasNext: true,
            productTypeId: "",
            // size : 100
        });
    };

    onChangeText = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    keyPressed = async (e) => {
        if (e.key === "Enter") {
            this._search();
        }
    };

    applyFilters = async () => {
        let { filters } = this.state;
        await this.setState({
            showSelectedFilters: true,
            filters: filters.map((filter) => {
                filter.showSelected = true;
                return filter;
            }),
        });
        this._search();
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
            searching: true,
        });
        let designList = await this.renderList();
        await this.setState({
            designList,
            hasNext: designList.length === this.state.size ? true : false,
            loading: false,
        });
        this.updateProductCard();
    };

    resetFilter = async () => {
        await this.setState({
            filters: [],
            search: "",
            page: 0,
            searching: false,
            showSelectedFilters: false,
        });
        let designList = await this.renderList();
        this.setState({ designList: designList });
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
                this.setState({ loading: false });
                if (data.success) {
                    // toastSuccess(data.message);
                    let { designList } = this.state;
                    designList = designList.map((item, i) => {
                        if (item.id == id) {
                            item.liked = true;
                            return item;
                        }
                        return item;
                    });

                    let result = designList.map((collection) => {
                        if (collection.collectionViewType === "PRODUCT_LIST") {
                            collection.productResponseList = collection.productResponseList.map(
                                (product) => {
                                    if (product.id === id) {
                                        product.liked = true;
                                    }
                                    return product;
                                }
                            );
                        }
                        return collection;
                    });

                    this.setState({
                        // designList,
                        designList: result,
                    });
                } else {
                    toastError(data.message);
                }
            })
            .catch(({ response }) => {
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
                if (data.success) {
                    // toastSuccess(data.message);
                    let { designList } = this.state;
                    designList = designList.map((item, i) => {
                        if (item.id == id) {
                            item.liked = false;
                            return item;
                        }
                        return item;
                    });

                    let result = designList.map((collection) => {
                        if (collection.collectionViewType === "PRODUCT_LIST") {
                            collection.productResponseList = collection.productResponseList.map(
                                (product) => {
                                    if (product.id === id) {
                                        product.liked = false;
                                    }
                                    return product;
                                }
                            );
                        }
                        return collection;
                    });

                    this.setState({
                        // designList,
                        designList: result,
                    });
                } else {
                    toastError(data.message);
                }
                this.setState({ loading: false });
            })
            .catch(({ response }) => {
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
        designList = designList.map((collection) => {
            if (collection.productResponseList) {
                collection.productResponseList = collection.productResponseList.map((product) => {
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
            }
            return collection;
        });
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
        localStorage.setItem(LOCAL_QUOTE_NOW_KEY, JSON.stringify(quote));
        await this.props._storeData("quoteObj", quote);
        await this.props._storeData("selectedProductIds", []);
        this.updateProductCard();
        this.props.history.push("/quote-now");
    };

    createNewCollection = () => {
        let { collectionName } = this.state;
        if (!collectionName) {
            this.setState({
                collectionNameError: "Collection name required",
            });
            return;
        } else {
            this.setState({
                collectionNameError: "",
            });
        }
        let body = {
            name: collectionName,
            privacy: "CUSTOM",
            viewType: "PRODUCT_LIST",
        };
        Http.POST("addCollection", body)
            .then(({ data }) => {
                if (data) {
                    this.addToExistingCollection(data.id);
                    // this.setState({showAddCollectionPopup: false});
                }
            })
            .catch(({ response }) => {
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Request was unsuccessful.");
                }
            });
    };

    addToExistingCollection = (collectionId) => {
        let body = {
            id: collectionId,
            productIds: this.props.selectedProductIds,
        };
        Http.POST("addProductToCollection", body)
            .then(({ data }) => {
                if (data) {
                    this.props._storeData("selectedProductIds", []);
                    this.updateProductCard();
                    this.setState({ showAddCollectionPopup: false });
                    toastSuccess(data.message);
                }
            })
            .catch(({ response }) => {
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Request was unsuccessful.");
                }
            });
    };

    getAllAvailableProducts = (data) => {
        return data.filter(
            (product) =>
                !STATUS_NOT_ALLOWED_FOR_SHOW_EXPLORE_DESIGN.includes(product.availabilityStatus)
        );
    };

    render() {
        let {
            designList,
            groupwiseProductList,
            search,
            productTypeId,
            sort,
            showFilters,
            landingData,
            filterOptions,
            filters,
            searching,
            showSuggestions,
            suggestions,
            responsiveFilterModal,
            pagination,
            showSelectedFilters,
            collectionList,
            showAddCollectionPopup,
            collectionName,
            collectionNameError,
        } = this.state;

        return (
            <div className="explore-design">
                <div className="filter-container explore-design-filter new-explore">
                    <div className="cat-menu d-none d-xl-block">
                        <span
                            className="explore-design-filter-icon"
                            onClick={() => this.setState({ showFilters: !showFilters })}
                        >
                            <img src="../icons/Filter.svg" />
                            <span className="filter-text">Filter</span>
                            <img src="../icons/arrow_drop_up.svg" alt="arrow" />
                        </span>
                    </div>
                    <div
                        className="cat-menu cat-mobile-menu d-block d-xl-none"
                        data-toggle="modal"
                        data-target="#CatMenuMobile"
                    >
                        <span
                            className="explore-design-filter-icon"
                            onClick={() => this.setState({ responsiveFilterModal: true })}
                        >
                            <img src="../icons/Filter.svg" />
                        </span>
                    </div>
                    <div className="search flex-grow-1">
                        <svg
                            onClick={() => this._search()}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16.55"
                            height="16.508"
                            viewBox="0 0 16.55 16.508"
                        >
                            <path
                                id="Path_23797"
                                data-name="Path 23797"
                                d="M15.916,15.191l-3.89-3.89a6.831,6.831,0,1,0-.674.674l3.89,3.89a.482.482,0,0,0,.337.142.468.468,0,0,0,.337-.142A.48.48,0,0,0,15.916,15.191ZM1,6.826A5.867,5.867,0,1,1,6.872,12.7,5.874,5.874,0,0,1,1,6.826Z"
                                transform="translate(0.2 0.25)"
                                fill="#a1a6b2"
                                stroke="#a1a6b2"
                                strokeWidth="0.5"
                            />
                        </svg>
                        <input
                            type="search"
                            autoComplete="chrome-off"
                            placeholder="Search with name"
                            name="search"
                            className="w-100"
                            value={search}
                            onChange={this.onChange}
                            onKeyPress={this.keyPressed}
                        />
                    </div>
                    <div
                        className="filter-cat"
                        style={{ display: showFilters ? "flex" : "none" }}
                        ref={(node) => (this.searchFilters = node)}
                    >
                        <div className="d-flex">
                            <ul className="list custom-scrollbar">
                                <div className="title">Categories</div>
                                {filterOptions.categories &&
                                    filterOptions.categories.map((item, i) => {
                                        return (
                                            <li
                                                style={{
                                                    color: isSelected(filters, "CATEGORY", item.id)
                                                        ? "rgb(238 118 31)"
                                                        : "black",
                                                }}
                                                key={i}
                                                onClick={() =>
                                                    this.setFilters("CATEGORY", item.id, item.name)
                                                }
                                            >
                                                {item.name}
                                            </li>
                                        );
                                    })}
                            </ul>

                            <ul className="list custom-scrollbar">
                                <div className="title">Market</div>
                                {filterOptions.productGroupResponseList &&
                                    filterOptions.productGroupResponseList.map((item, i) => {
                                        return (
                                            <li
                                                style={{
                                                    color: isSelected(filters, "MARKET", item.id)
                                                        ? "rgb(238 118 31)"
                                                        : "black",
                                                }}
                                                key={i}
                                                onClick={() =>
                                                    this.setFilters("MARKET", item.id, item.name)
                                                }
                                            >
                                                {item.name}
                                            </li>
                                        );
                                    })}
                            </ul>

                            <ul className="list custom-scrollbar">
                                <div className="title">Season</div>
                                {filterOptions.seasonResponseList &&
                                    filterOptions.seasonResponseList.map((item, i) => {
                                        return (
                                            <li
                                                style={{
                                                    color: isSelected(filters, "SEASON", item.code)
                                                        ? "rgb(238 118 31)"
                                                        : "black",
                                                }}
                                                key={i}
                                                onClick={() =>
                                                    this.setFilters("SEASON", item.code, item.name)
                                                }
                                            >
                                                {item.name}
                                            </li>
                                        );
                                    })}
                            </ul>

                            <ul className="list custom-scrollbar">
                                <div className="title">Composition</div>
                                {filterOptions.compositionResponseList &&
                                    filterOptions.compositionResponseList.map((item, i) => {
                                        return (
                                            <li
                                                style={{
                                                    color: isSelected(
                                                        filters,
                                                        "COMPOSITION",
                                                        item.code
                                                    )
                                                        ? "rgb(238 118 31)"
                                                        : "black",
                                                }}
                                                key={i}
                                                onClick={() =>
                                                    this.setFilters(
                                                        "COMPOSITION",
                                                        item.code,
                                                        item.value
                                                    )
                                                }
                                            >
                                                {item.value}
                                            </li>
                                        );
                                    })}
                            </ul>

                            <ul className="list custom-scrollbar">
                                <div className="title">Fabric type</div>
                                {filterOptions.fabricTypeResponseList &&
                                    filterOptions.fabricTypeResponseList.map((item, i) => {
                                        return (
                                            <li
                                                style={{
                                                    color: isSelected(
                                                        filters,
                                                        "FABRIC_TYPE",
                                                        item.code
                                                    )
                                                        ? "rgb(238 118 31)"
                                                        : "black",
                                                }}
                                                key={i}
                                                onClick={() =>
                                                    this.setFilters(
                                                        "FABRIC_TYPE",
                                                        item.code,
                                                        item.value
                                                    )
                                                }
                                            >
                                                {item.value}
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                        <div className="filter-actions d-flex align-items-center">
                            <button
                                className="m-0 btn-brand m-0 shadow float-right"
                                onClick={this.applyFilters}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>

                {/* {!searching && collectionList && collectionList.length > 0 && (
                    <div className=" collection-list">
                        <h4 className="mb-4 font-weight-normal">
                            Collections for you
                            <a href={"/collections/list"}>
                                <span className="view-all">View all</span>
                            </a>
                        </h4>
                        <MyCollections myCollectionLists={collectionList} />
                    </div>
                )} */}

                <div>
                    {showSelectedFilters && filters.length ? (
                        <ul className="filter-tag">
                            {filters.map((filter, i) => {
                                if (filter.showSelected) {
                                    return (
                                        <li className="active" key={i}>
                                            <a>{filter.name}</a>
                                            <div
                                                className="close-tag"
                                                onClick={() =>
                                                    this.setFilters(
                                                        filter.type,
                                                        filter.id,
                                                        filter.name
                                                    )
                                                }
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="10.888"
                                                    height="10.888"
                                                    viewBox="0 0 10.888 10.888"
                                                >
                                                    <g
                                                        id="Group_10684"
                                                        data-name="Group 10684"
                                                        transform="translate(50.699 -260.002) rotate(45)"
                                                    >
                                                        <path
                                                            id="Path_27710"
                                                            data-name="Path 27710"
                                                            d="M2135.273,2351v14.4"
                                                            transform="translate(-1979.574 -2138.497)"
                                                            fill="none"
                                                            stroke="#fff"
                                                            strokeWidth="1"
                                                        />
                                                        <path
                                                            id="Path_27711"
                                                            data-name="Path 27711"
                                                            d="M0,0V14.4"
                                                            transform="translate(162.898 219.699) rotate(90)"
                                                            fill="none"
                                                            stroke="#fff"
                                                            strokeWidth="1"
                                                        />
                                                    </g>
                                                </svg>
                                            </div>
                                        </li>
                                    );
                                }
                                return <></>;
                            })}
                        </ul>
                    ) : (
                        <></>
                    )}
                </div>

                {searching ? (
                    <div className="designs">
                        <h4 className="mb-4 font-weight-normal">
                            <span>
                                Search results{" "}
                                <a
                                    href="#"
                                    onClick={this.resetFilter}
                                    className="text-underline ml-3 font-18"
                                >
                                    Clear
                                </a>
                            </span>
                            <span class="result">{pagination} Designs</span>
                        </h4>
                        {!this.state.loading && !designList.length ? (
                            <EmptyState
                                title="No designs found"
                                subTitle="You may want to try using different keywords, checking for typos, or adjusting your filters"
                            />
                        ) : (
                            <></>
                        )}

                        <div className="show-products">
                            {this.getAllAvailableProducts(designList).map((product, i) => {
                                return (
                                    <ProductCardWithTick
                                        key={i}
                                        product={product}
                                        updateProductCard={() => this.updateProductCard()}
                                        addToQuote={this.addToQuote}
                                        likeProduct={this.likeProduct}
                                        unlikeProduct={this.unlikeProduct}
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
                ) : (
                    <>
                        <div className="designs">
                            <h4 className="mb-4 font-weight-normal">
                                <span>Explore our design</span>
                                <span class="result">{pagination} Designs</span>
                            </h4>
                            <div className="show-products">
                                {designList.map((data, i) => {
                                    return (
                                        <ProductCardWithTick
                                            key={i}
                                            product={data}
                                            updateProductCard={() => this.updateProductCard()}
                                            addToQuote={this.addToQuote}
                                            likeProduct={this.likeProduct}
                                            unlikeProduct={this.unlikeProduct}
                                        />
                                    );
                                })}
                                {this.state.loading && (
                                    <CreateSkeletons iterations={12}>
                                        <ProductSkeleton />
                                    </CreateSkeletons>
                                )}
                            </div>
                            {this.state.initialLoading && (
                                <div className="show-products">
                                    <CreateSkeletons iterations={12}>
                                        <ProductSkeleton />
                                    </CreateSkeletons>
                                </div>
                            )}
                        </div>
                    </>
                )}
                {this.props.selectedProductIds.length ? (
                    <div className="selected-item-popup d-flex justify-content-between">
                        <div className="d-flex align-items-start align-items-sm-center flex-column flex-sm-row">
                            <h4 className="mr-0 mr-sm-5 font-24 font-weight-bold mb-0">
                                Selected ({this.props.selectedProductIds.length})
                            </h4>
                            <button
                                className="m-0 btn-brand brand-bg-color shadow"
                                onClick={() => this.addToQuote(this.props.selectedProductIds)}
                            >
                                Add to quote
                            </button>
                            <div style={{ width: 20 }}></div>
                            <button
                                className="m-0 btn-brand brand-bg-color shadow"
                                onClick={() => this.setState({ showAddCollectionPopup: true })}
                            >
                                Add to collection
                            </button>
                        </div>
                        <div className="close">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16.436"
                                height="16.436"
                                viewBox="0 0 16.436 16.436"
                                onClick={async () => {
                                    await this.props._storeData("selectedProductIds", []);
                                    this.updateProductCard();
                                }}
                            >
                                <path
                                    id="close_3_"
                                    data-name="close (3)"
                                    d="M15.218,14.056l6.815-6.815A.822.822,0,0,1,23.2,8.4L16.38,15.218,23.2,22.033A.822.822,0,0,1,22.033,23.2L15.218,16.38,8.4,23.2a.822.822,0,0,1-1.162-1.162l6.815-6.815L7.241,8.4A.822.822,0,0,1,8.4,7.241Z"
                                    transform="translate(-7 -7)"
                                />
                            </svg>
                        </div>
                    </div>
                ) : (
                    <></>
                )}

                {showAddCollectionPopup ? (
                    <div class="create-new-collection">
                        <div class="pop-container" ref={this.setWrapperRef}>
                            <span class="create-newbutton cursor-pointer">
                                + Create new collection
                            </span>
                            <div class="create-new d-flex">
                                <input
                                    type="text"
                                    placeholder="Type your collection name"
                                    class="bg-gray-light border-0"
                                    name="collectionName"
                                    value={collectionName}
                                    onChange={this.onChangeText}
                                />
                                <button
                                    class="btn-brand m-0 brand-bg-color"
                                    onClick={this.createNewCollection}
                                >
                                    Create
                                </button>
                            </div>
                            {collectionNameError ? (
                                <p className="error">{collectionNameError}</p>
                            ) : (
                                <></>
                            )}
                            {collectionList.length ? (
                                <div class="all-collection">
                                    <span>All collection</span>
                                    <ul class="p-0 m-0 existing-item pop-list-item custom-scrollbar">
                                        {collectionList.map((collection, i) => {
                                            return (
                                                <li key={i}>
                                                    <span>{collection.name}</span>
                                                    <button
                                                        class="btn-brand m-0 brand-bg-color"
                                                        onClick={() =>
                                                            this.addToExistingCollection(
                                                                collection.id
                                                            )
                                                        }
                                                    >
                                                        Add
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                ) : (
                    <></>
                )}

                <Modal
                    show={responsiveFilterModal}
                    onHide={() => this.setState({ responsiveFilterModal: false })}
                    dialogClassName="modal-xl share-design-modal"
                    role="dialog"
                    aria-labelledby="bottom_modal"
                    className="bottom"
                >
                    {/*<Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                    </Modal.Title>
                </Modal.Header>*/}

                    <div className="modal-header border-0">
                        <button
                            type="button"
                            className="close pt-3 pb-2"
                            onClick={() => this.setState({ responsiveFilterModal: false })}
                            aria-label="Close"
                        >
                            <i className="material-icons">close</i>
                        </button>
                    </div>
                    <Modal.Body className="p-0">
                        <nav className="sidebar-collapse filter-cat-mobile-menu d-block d-xl-none">
                            <div>
                                <ul className="list-unstyled">
                                    <li>
                                        <a
                                            href="#pageSubmenuCategory"
                                            data-toggle="collapse"
                                            aria-expanded="false"
                                            className="dropdown-toggle"
                                        >
                                            Category
                                        </a>
                                        <ul
                                            className="collapse list-unstyled sub-collapse-menu"
                                            id="pageSubmenuCategory"
                                        >
                                            {filterOptions.categories &&
                                                filterOptions.categories.map((item, i) => {
                                                    return (
                                                        <li
                                                            style={{
                                                                color: isSelected(
                                                                    filters,
                                                                    "CATEGORY",
                                                                    item.id
                                                                )
                                                                    ? "rgb(238 118 31)"
                                                                    : "black",
                                                            }}
                                                            key={i}
                                                            onClick={() =>
                                                                this.setFilters(
                                                                    "CATEGORY",
                                                                    item.id,
                                                                    item.name
                                                                )
                                                            }
                                                        >
                                                            {item.name}
                                                        </li>
                                                    );
                                                })}
                                        </ul>
                                    </li>

                                    <li>
                                        <a
                                            href="#pageSubmenuMarket"
                                            data-toggle="collapse"
                                            aria-expanded="false"
                                            className="dropdown-toggle"
                                        >
                                            Market
                                        </a>
                                        <ul
                                            className="collapse list-unstyled sub-collapse-menu"
                                            id="pageSubmenuMarket"
                                        >
                                            {filterOptions.productGroupResponseList &&
                                                filterOptions.productGroupResponseList.map(
                                                    (item, i) => {
                                                        return (
                                                            <li
                                                                style={{
                                                                    color: isSelected(
                                                                        filters,
                                                                        "MARKET",
                                                                        item.id
                                                                    )
                                                                        ? "rgb(238 118 31)"
                                                                        : "black",
                                                                }}
                                                                key={i}
                                                                onClick={() =>
                                                                    this.setFilters(
                                                                        "MARKET",
                                                                        item.id,
                                                                        item.name
                                                                    )
                                                                }
                                                            >
                                                                {item.name}
                                                            </li>
                                                        );
                                                    }
                                                )}
                                        </ul>
                                    </li>

                                    <li>
                                        <a
                                            href="#pageSubmenuSeason"
                                            data-toggle="collapse"
                                            aria-expanded="false"
                                            className="dropdown-toggle"
                                        >
                                            Season
                                        </a>
                                        <ul
                                            className="collapse list-unstyled sub-collapse-menu"
                                            id="pageSubmenuSeason"
                                        >
                                            {filterOptions.seasonResponseList &&
                                                filterOptions.seasonResponseList.map((item, i) => {
                                                    return (
                                                        <li
                                                            style={{
                                                                color: isSelected(
                                                                    filters,
                                                                    "SEASON",
                                                                    item.code
                                                                )
                                                                    ? "rgb(238 118 31)"
                                                                    : "black",
                                                            }}
                                                            key={i}
                                                            onClick={() =>
                                                                this.setFilters(
                                                                    "SEASON",
                                                                    item.code,
                                                                    item.name
                                                                )
                                                            }
                                                        >
                                                            {item.name}
                                                        </li>
                                                    );
                                                })}
                                        </ul>
                                    </li>

                                    <li>
                                        <a
                                            href="#pageSubmenuComposition"
                                            data-toggle="collapse"
                                            aria-expanded="false"
                                            className="dropdown-toggle"
                                        >
                                            Composition
                                        </a>
                                        <ul
                                            className="collapse list-unstyled sub-collapse-menu"
                                            id="pageSubmenuComposition"
                                        >
                                            {filterOptions.compositionResponseList &&
                                                filterOptions.compositionResponseList.map(
                                                    (item, i) => {
                                                        return (
                                                            <li
                                                                style={{
                                                                    color: isSelected(
                                                                        filters,
                                                                        "COMPOSITION",
                                                                        item.code
                                                                    )
                                                                        ? "rgb(238 118 31)"
                                                                        : "black",
                                                                }}
                                                                key={i}
                                                                onClick={() =>
                                                                    this.setFilters(
                                                                        "COMPOSITION",
                                                                        item.code,
                                                                        item.value
                                                                    )
                                                                }
                                                            >
                                                                {item.value}
                                                            </li>
                                                        );
                                                    }
                                                )}
                                        </ul>
                                    </li>

                                    <li>
                                        <a
                                            href="#pageSubmenuFabricType"
                                            data-toggle="collapse"
                                            aria-expanded="false"
                                            className="dropdown-toggle"
                                        >
                                            Fabric type
                                        </a>
                                        <ul
                                            className="collapse list-unstyled sub-collapse-menu"
                                            id="pageSubmenuFabricType"
                                        >
                                            {filterOptions.fabricTypeResponseList &&
                                                filterOptions.fabricTypeResponseList.map(
                                                    (item, i) => {
                                                        return (
                                                            <li
                                                                style={{
                                                                    color: isSelected(
                                                                        filters,
                                                                        "FABRIC_TYPE",
                                                                        item.code
                                                                    )
                                                                        ? "rgb(238 118 31)"
                                                                        : "black",
                                                                }}
                                                                key={i}
                                                                onClick={() =>
                                                                    this.setFilters(
                                                                        "FABRIC_TYPE",
                                                                        item.code,
                                                                        item.value
                                                                    )
                                                                }
                                                            >
                                                                {item.value}
                                                            </li>
                                                        );
                                                    }
                                                )}
                                        </ul>
                                    </li>
                                </ul>
                                <button
                                    className="m-0 btn-brand m-0 shadow"
                                    onClick={async () => {
                                        await this.setState({
                                            showSelectedFilters: true,
                                            responsiveFilterModal: false,
                                        });
                                        this._search();
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        </nav>
                    </Modal.Body>
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(PickDesignV2);
