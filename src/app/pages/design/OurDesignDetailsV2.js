import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from "loadjs";
import LoadingOverlay from "react-loading-overlay";
import Slider from "react-slick";
import ImageViewer from "react-simple-image-viewer";
import Modal from "react-bootstrap/Modal";

import Http from "../../services/Http";
import { toastSuccess, toastError } from "../../commonComponents/Toast";
import { _storeData, _getProductForQuote } from "../design/actions";

import ProductCardWithTick from "../../commonComponents/ProductCardWithTick";
import { columns, fixedHeaders, LOADER_STYLE } from "../../constants";
import { MeasurementTable } from "./components/MeasurementTable";
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
import { productAvailabilityStatus, authUserInfo } from "../../services/Util";

import {
    ProductThumbsSkeleton,
    ProductHeroImageSkeleton,
    ProductDetailsSkeleton,
    ProductSkeleton,
    CreateSkeletons,
} from "../../commonComponents/ProductSkeleton";
import { ProductDetailsImgThumb } from "../../commonComponents/ProductDetailsImgThumb";
import { fetchGeneralSettingsData } from "../../redux/actions";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class OurDesignDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            loading: false,
            selectedImage: "",
            imageViewerFlag: false,
            imageViewerData: [],
            imageViewerCurrentIndex: 0,
            similarDesigns: [],
            similarDesignLoading: false,
            measurementModal: false,
            page: 0,
            collectionList: [],
            showAddCollectionPopup: false,
            showCollectionAddOption: false,
            collectionName: "",
            collectionNameError: "",
            TURN_AROUND_TIME: "",
            MOQ: "",
        };
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    };

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            let id = this.props.match.params.id;
            let { selectedProductIds } = this.props;
            if (selectedProductIds.length === 1 && selectedProductIds[0] == id) {
                this.props._storeData("selectedProductIds", []);
            }
            this.setState({
                showAddCollectionPopup: false,
            });
        }
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
            let { hasNext, page, similarDesignLoading, similarDesigns, size } = this.state;
            console.log("message", "bottom reached", hasNext, page, similarDesignLoading);
            if (hasNext && !similarDesignLoading && similarDesigns.length) {
                let data = await this.getSimilarDesign(page + 1);
            } else if (similarDesigns.length) {
                if (!hasNext) {
                    // toastWarning("No more data found.")
                }
            }
        } else {
        }
    };

    getTitleName = () => {
        let { product } = this.state;
        if (product) {
            let title = product.name;
            document.title = `Design details ${
                title ? title : ""
            } Nitex - The easiest clothing manufacturing software`;
        }
    };

    componentDidUpdate = () => {
        this.getTitleName();
    };

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    componentDidMount = async () => {
        document.title = "Product details on Nitex - The easiest clothing manufacturing software";
        window.addEventListener("scroll", this.handleScroll);
        document.addEventListener("mousedown", this.handleClickOutside);
        let id = this.props.match.params.id;
        this.setState({
            loading: true,
        });
        let selectedImage = "";
        let flag = 1;

        await Http.GET("getProductDetails", id)
            .then(({ data }) => {
                console.log("getProductDetails SUCCESS: ", data);
                if (data) {
                    document.title = data.name;
                    data.documentResponseList.map((doc, i) => {
                        if (doc.docType == "PRODUCT_DESIGN" && flag) {
                            flag = 0;
                            selectedImage = doc.docUrl;
                        }
                        if (data.documentResponseList.length == i + 1 && flag) {
                            selectedImage = data.documentResponseList[0].docUrl;
                        }
                    });
                    this.setState({
                        loading: false,
                        product: data,
                        selectedImage,
                    });
                } else {
                    this.setState({ loading: false });
                    // toastError(data.message);
                }
                // loadjs(['/js/script.js','/js/custom.js']);
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
        const keys = ["MOQ", "TURN_AROUND_TIME"];
        const data = await fetchGeneralSettingsData(keys);
        if (data) {
            this.setState({
                TURN_AROUND_TIME: data["TURN_AROUND_TIME"] ? data["TURN_AROUND_TIME"].value : "",
                MOQ: data["MOQ"] ? data["MOQ"].value : "",
            });
        }
        this.getSimilarDesign();
        this.fetchCollectionList();
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
                    let { similarDesigns, product } = this.state;
                    let productId = this.props.match.params.id;
                    if (productId === id) {
                        product.liked = true;
                        this.setState({ product });
                    }
                    similarDesigns = similarDesigns.map((item, i) => {
                        if (item.id == id) {
                            item.liked = true;
                            return item;
                        }
                        return item;
                    });

                    this.setState({
                        similarDesigns,
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
                    let { similarDesigns, product } = this.state;
                    let productId = this.props.match.params.id;
                    if (productId === id) {
                        product.liked = false;
                        this.setState({ product });
                    }
                    similarDesigns = similarDesigns.map((item, i) => {
                        if (item.id == id) {
                            item.liked = false;
                            return item;
                        }
                        return item;
                    });

                    this.setState({
                        similarDesigns,
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

    toggleLike = () => {
        let { product } = this.state;
        let id = this.props.match.params.id;
        if (product.liked) {
            this.unlikeProduct(id);
        } else {
            this.likeProduct(id);
        }
    };

    addToQuote = async (ids, heroProduct = false) => {
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
        if (heroProduct) {
            toastSuccess("Quote added successfully.");
            this.props.history.push("/quote-now");
        }
        this.updateProductCard();
    };

    updateProductCard = () => {
        let { selectedProductIds } = this.props;
        let { similarDesigns } = this.state;
        similarDesigns = similarDesigns.map((product) => {
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
        this.setState({ similarDesigns });
    };

    getSimilarDesign = async (page = 0) => {
        await this.setState({ similarDesignLoading: true });
        let id = this.props.match.params.id;
        await Http.GET("getMoreProductInCollection", `${id}?page=${page}&size=20`)
            .then(({ data }) => {
                if (data.length) {
                    let result = data.map((product) => {
                        product.isSelected = false;
                        return product;
                    });
                    this.setState({
                        similarDesigns: result,
                        page,
                        similarDesignLoading: false,
                        hasNext: data.length === 20 ? true : false,
                    });
                } else {
                    this.setState({
                        hasNext: false,
                        similarDesignLoading: false,
                    });
                }
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

    getDocUrlFromDocResponse = (docResponse) => {
        return docResponse?.docUrl;
    };
    //     if (docResponse.docType !== "FRONT_IMAGE") {
    //       return docResponse?.docUrl;
    //   }
    getListOfDocUrlFromProductDocumentResponse = (productDocumentResponse, groupKey) => {
        let result = [];

        if (productDocumentResponse === null || productDocumentResponse === undefined)
            return result;

        let groupWiseDocumentResponse = productDocumentResponse[groupKey];

        let keySet = ["front", "back", "fabric", "side", "embelishment"];
        keySet.map((key) => {
            let docUrl = this.getDocUrlFromDocResponse(groupWiseDocumentResponse[key]);
            if (docUrl !== null && docUrl !== undefined) result.push(docUrl);
        });

        groupWiseDocumentResponse.otherDocumentList.map((docResponse) => {
            let docUrl = this.getDocUrlFromDocResponse(docResponse);
            if (docUrl !== null && docUrl !== undefined) result.push(docUrl);
        });

        return result;
    };

    getListOfDocUrlFromProductResponse = (
        productDocumentResponse,
        groupKey,
        isLeftSlider = false
    ) => {
        let result = [];

        if (productDocumentResponse === null || productDocumentResponse === undefined)
            return result;

        let groupWiseDocumentResponse = productDocumentResponse[groupKey];

        let keySet = ["back", "fabric", "side", "embelishment"];
        keySet.map((key) => {
            let docUrl;
            if (key === "front" && isLeftSlider) {
                docUrl = "";
            } else {
                docUrl = this.getDocUrlFromDocResponse(groupWiseDocumentResponse[key]);
            }

            if (docUrl !== null && docUrl !== undefined) result.push(docUrl);
        });

        groupWiseDocumentResponse.otherDocumentList.map((docResponse) => {
            let docUrl = this.getDocUrlFromDocResponse(docResponse);
            if (docUrl !== null && docUrl !== undefined) result.push(docUrl);
        });

        return result;
    };

    getSliderDocuments = (productDocumentResponse) => {
        let result = [];
        let physicaSampleArr = this.getListOfDocUrlFromProductResponse(
            productDocumentResponse,
            "physicalSampleResponse"
        );

        if (productDocumentResponse) {
            result.push(
                this.getDocUrlFromDocResponse(productDocumentResponse.featureImageDocResponse)
            );
        }
        physicaSampleArr &&
            physicaSampleArr.map((url) => {
                result.push(url);
            });

        return result;
    };

    getImageByType = (typeList = ["PRODUCT_DESIGN", "REFERENCE_IMAGE"], included = true) => {
        let { product } = this.state;
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
    };

    setSelectedImage = async (index) => {
        let { product } = this.state;
        await this.setState({
            selectedImage: product.documentResponseList[index].docUrl,
        });
        // loadjs(['/js/design-details.js']);
    };

    showImageViewer = (docs, index) => {
        this.setState({
            imageViewerFlag: true,
            imageViewerCurrentIndex: index,
            imageViewerData: docs,
        });
    };

    goTo = (index) => {
        this.sliderMain.slickGoTo(index);
        this.sliderNav.slickGoTo(index);
    };

    edit = () => {
        let id = this.props.match.params.id;
        this.props.history.push("/designs/edit/" + id);
    };

    onChangeText = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
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

    addShowingProductToCollection = () => {
        let id = this.props.match.params.id;
        this.props._storeData("selectedProductIds", [id]);
        this.updateProductCard();
        this.setState({
            showAddCollectionPopup: true,
        });
    };

    addShowingProductToQuote = async () => {
        let id = this.props.match.params.id;
        this.addToQuote([id], true);
    };

    render() {
        let {
            product,
            selectedImage,
            loading,
            imageViewerFlag,
            imageViewerData,
            imageViewerCurrentIndex,
            similarDesigns,
            similarDesignLoading,
            measurementModal,
            collectionList,
            showAddCollectionPopup,
            showCollectionAddOption,
            collectionName,
            collectionNameError,
            TURN_AROUND_TIME,
            MOQ,
        } = this.state;
        const settingsSliderMain = {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            // asNavFor: '.slider-nav',
            beforeChange: (prev, next) => {
                this.sliderNav.slickGoTo(next);
            },
        };
        const settingsSliderNav = {
            slidesToShow:
                this.getSliderDocuments(product.productDocumentResponse).length > 4
                    ? 4
                    : this.getSliderDocuments(product.productDocumentResponse).length,
            // slidesToShow: 4,
            slidesToScroll: 1,
            vertical: true,
            // asNavFor: '.slider-for',
            dots: false,
            focusOnSelect: true,
            verticalSwiping: true,
            arrows: false,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        vertical: false,
                        slidesToShow: 4,
                        arrows: true,
                    },
                },
                {
                    breakpoint: 580,
                    settings: {
                        vertical: false,
                        slidesToShow: 3,
                        arrows: true,
                    },
                },
                {
                    breakpoint: 380,
                    settings: {
                        vertical: false,
                        slidesToShow: 2,
                        arrows: true,
                    },
                },
            ],
        };
        return (
            <div className="product-details-slider-container">
                {imageViewerFlag && (
                    <ImageViewer
                        backgroundStyle={{ backgroundColor: "rgba(0,0,0,.5)", zIndex: 999 }}
                        src={imageViewerData}
                        currentIndex={imageViewerCurrentIndex}
                        onClose={() => {
                            this.setState({
                                imageViewerFlag: false,
                                imageViewerCurrentIndex: 0,
                            });
                        }}
                    />
                )}
                <div className="row">
                    <div className="col-lg-7">
                        <div className="product-detail-gallery sticky-120">
                            <div className="thumbnail-prev">
                                <section className="banner-section">
                                    <div className="vehicle-detail-banner banner-content clearfix">
                                        <div className="banner-slider">
                                            {/*<div className="slider slider-nav thumb-image">*/}
                                            <Slider
                                                ref={(slider) => (this.sliderNav = slider)}
                                                {...settingsSliderNav}
                                                className="slider slider-nav thumb-image"
                                            >
                                                {this.getSliderDocuments(
                                                    product.productDocumentResponse
                                                ).map((item, i) => {
                                                    return (
                                                        <a
                                                            href="#"
                                                            onClick={() => this.goTo(i)}
                                                            className="thumbnail-image"
                                                            key={i}
                                                        >
                                                            <div className="thumbImg">
                                                                <img src={item} />
                                                            </div>
                                                        </a>
                                                    );
                                                })}
                                            </Slider>
                                            {/*</div>*/}

                                            <Slider
                                                ref={(slider) => (this.sliderMain = slider)}
                                                {...settingsSliderMain}
                                                className="slider slider-for"
                                            >
                                                {/*<div className="slider slider-for">*/}
                                                {this.getSliderDocuments(
                                                    product.productDocumentResponse
                                                ).map((item, i) => {
                                                    return (
                                                        <div
                                                            className="slider-banner-image"
                                                            key={i}
                                                        >
                                                            <a
                                                                className="item-slick"
                                                                onClick={() =>
                                                                    this.showImageViewer(
                                                                        this.getSliderDocuments(
                                                                            product.productDocumentResponse
                                                                        ),
                                                                        i
                                                                    )
                                                                }
                                                            >
                                                                <img src={item} />
                                                            </a>
                                                        </div>
                                                    );
                                                })}
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
                                <h3 className="font-26 semibold">{product.name}</h3>
                            </div>
                            {/* {productAvailabilityStatus(product)} */}
                            <div className="d-flex flex-column flex-sm-row">
                                <div className="info-item mr-5">
                                    <label className="font-14 text-muted">Market</label>
                                    <h5 className="font-18 semibold">
                                        <span>{product.productGroup?.name}</span>
                                        {product.productGroup?.name && product.category && (
                                            <span>, </span>
                                        )}
                                        <span>{product.category}</span>
                                    </h5>
                                </div>
                                <div className="info-item">
                                    <label className="font-14 text-muted">Fabric details</label>
                                    <h5 className="font-18 semibold">
                                        {product.fabricDetails ? product.fabricDetails : "N/A"}
                                    </h5>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="d-flex align-items-center mb-2">
                                    <label className="w-auto m-0 font-14">Available sizes</label>
                                </div>
                                <span className="font-18 semibold text-uppercase">
                                    {product.sizeList && product.sizeList.toString()}
                                </span>
                            </div>

                            <div className="info-item">
                                <div className="d-flex align-items-center mb-2">
                                    <a href="javascript:void(0)">
                                        <span
                                            className="font-14 brand-color"
                                            onClick={() =>
                                                this.setState({ measurementModal: true })
                                            }
                                        >
                                            Measurement Guide
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="d-flex align-items-center mb-2">
                                    <label className="w-auto m-0 font-14">Color</label>
                                </div>
                                <div className="color-picker">
                                    <ul>
                                        {product.colorResponseList &&
                                        product.colorResponseList.length ? (
                                            product.colorResponseList.map((color) => {
                                                return (
                                                    <li className="d-flex align-items-center">
                                                        <span
                                                            style={{
                                                                backgroundColor: color.hexCode,
                                                            }}
                                                        ></span>
                                                        <div className="font-18 semibold ml-2 d-flex justify-content-between">
                                                            <p className="mb-0">{color.name}</p>
                                                            {color.name && color.code && (
                                                                <p className="mb-0"> - </p>
                                                            )}
                                                            <p className="mb-0">{color.code}</p>
                                                        </div>
                                                    </li>
                                                );
                                            })
                                        ) : (
                                            <></>
                                        )}
                                    </ul>
                                </div>
                            </div>
                            {this.getListOfDocUrlFromProductDocumentResponse(
                                product.productDocumentResponse,
                                "physicalSampleResponse"
                            ).length ? (
                                <div className="info-item">
                                    <label className="font-14 text-muted mb-2">
                                        Physical sample
                                    </label>
                                    <div className="d-flex">
                                        {this.getListOfDocUrlFromProductDocumentResponse(
                                            product.productDocumentResponse,
                                            "physicalSampleResponse"
                                        ).map((item, i) => {
                                            return (
                                                <ProductDetailsImgThumb
                                                    key={i}
                                                    item={item}
                                                    index={i}
                                                    showGallery={this.showImageViewer}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}

                            {this.getListOfDocUrlFromProductDocumentResponse(
                                product.productDocumentResponse,
                                "flatSketchResponse"
                            ).length ? (
                                <div className="info-item">
                                    <label className="font-14 text-muted mb-2">Flat sketches</label>
                                    <div className="d-flex">
                                        {this.getListOfDocUrlFromProductDocumentResponse(
                                            product.productDocumentResponse,
                                            "flatSketchResponse"
                                        ).map((item, i) => {
                                            return (
                                                <ProductDetailsImgThumb
                                                    key={i}
                                                    item={item}
                                                    index={i}
                                                    showGallery={this.showImageViewer}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}

                            {this.getListOfDocUrlFromProductDocumentResponse(
                                product.productDocumentResponse,
                                "referenceImageResponse"
                            ).length ? (
                                <div className="info-item">
                                    <label className="font-14 text-muted mb-2">
                                        Reference images
                                    </label>
                                    <div className="d-flex">
                                        {this.getListOfDocUrlFromProductDocumentResponse(
                                            product.productDocumentResponse,
                                            "referenceImageResponse"
                                        ).map((item, i) => {
                                            return (
                                                <ProductDetailsImgThumb
                                                    key={i}
                                                    item={item}
                                                    index={i}
                                                    showGallery={this.showImageViewer}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}

                            {this.getListOfDocUrlFromProductDocumentResponse(
                                product.productDocumentResponse,
                                "artWorksResponse"
                            ).length ? (
                                <div className="info-item">
                                    <label className="font-14 text-muted mb-2">Art works</label>
                                    <div className="d-flex">
                                        {this.getListOfDocUrlFromProductDocumentResponse(
                                            product.productDocumentResponse,
                                            "artWorksResponse"
                                        ).map((item, i) => {
                                            return (
                                                <ProductDetailsImgThumb
                                                    key={i}
                                                    item={item}
                                                    index={i}
                                                    showGallery={this.showImageViewer}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}

                            <div className="info-item">
                                <label className="font-14 text-muted mb-2">
                                    Minimum order quantity
                                </label>
                                <h5 className="font-18 semibold">
                                    Starts from{" "}
                                    {product.minimumOrderQuantity
                                        ? `${product.minimumOrderQuantity} Pcs`
                                        : `${MOQ} Pcs`}
                                    <span
                                        className="ml-2"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        data-original-title="Minimum order quantity"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                        >
                                            <g
                                                id="Group_13"
                                                data-name="Group 13"
                                                transform="translate(1445 -3505)"
                                            >
                                                <circle
                                                    id="Ellipse_1"
                                                    data-name="Ellipse 1"
                                                    cx="9"
                                                    cy="9"
                                                    r="9"
                                                    transform="translate(-1445 3505)"
                                                    fill="#ddd"
                                                ></circle>
                                                <text
                                                    id="Price_will_be_updated_within_24_hours"
                                                    data-name="Price will be updated within 24 hours"
                                                    transform="translate(-1436 3518)"
                                                    fill="#21242b"
                                                    font-size="11"
                                                    font-family="SegoeUI, Segoe UI"
                                                >
                                                    <tspan x="-1.332" y="0">
                                                        i
                                                    </tspan>
                                                </text>
                                            </g>
                                        </svg>
                                    </span>
                                </h5>
                            </div>
                            <div className="info-item">
                                <label className="font-14 text-muted mb-2">Turn around time</label>
                                <h5 className="font-18 semibold">
                                    As fast as{" "}
                                    {product.turnAroundTime
                                        ? `${product.turnAroundTime} Days`
                                        : `${TURN_AROUND_TIME} Days`}
                                    <span
                                        className="ml-2"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        data-original-title="Turn around time"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                        >
                                            <g
                                                id="Group_13"
                                                data-name="Group 13"
                                                transform="translate(1445 -3505)"
                                            >
                                                <circle
                                                    id="Ellipse_1"
                                                    data-name="Ellipse 1"
                                                    cx="9"
                                                    cy="9"
                                                    r="9"
                                                    transform="translate(-1445 3505)"
                                                    fill="#ddd"
                                                ></circle>
                                                <text
                                                    id="Price_will_be_updated_within_24_hours"
                                                    data-name="Price will be updated within 24 hours"
                                                    transform="translate(-1436 3518)"
                                                    fill="#21242b"
                                                    font-size="11"
                                                    font-family="SegoeUI, Segoe UI"
                                                >
                                                    <tspan x="-1.332" y="0">
                                                        i
                                                    </tspan>
                                                </text>
                                            </g>
                                        </svg>
                                    </span>
                                </h5>
                            </div>
                            <div className="info-item">
                                <label className="font-14 text-muted mb-2">Notes</label>
                                <p
                                    className="font-16"
                                    dangerouslySetInnerHTML={{
                                        __html: product.note ? product.note : "",
                                    }}
                                ></p>
                            </div>

                            <div className="info-item details-action">
                                <div className="text-left mt-4">
                                    {parseInt(product.addedBy) === parseInt(authUserInfo().id) ? (
                                        <a
                                            onClick={this.edit}
                                            className="btn btn-outline-secondary mr-3 border-gray-light"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="23.677"
                                                height="23.396"
                                                viewBox="0 0 23.677 23.396"
                                            >
                                                <g id="edit" transform="translate(0.1 -0.161)">
                                                    <path
                                                        id="Path_23189"
                                                        data-name="Path 23189"
                                                        d="M21.517,51.47a.581.581,0,0,0-.581.581v5.155a1.744,1.744,0,0,1-1.742,1.742H2.9a1.744,1.744,0,0,1-1.742-1.742V42.075A1.744,1.744,0,0,1,2.9,40.333H8.058a.581.581,0,1,0,0-1.161H2.9a2.906,2.906,0,0,0-2.9,2.9v15.13a2.906,2.906,0,0,0,2.9,2.9H19.194a2.906,2.906,0,0,0,2.9-2.9V52.05a.581.581,0,0,0-.581-.581Zm0,0"
                                                        transform="translate(0 -36.652)"
                                                        fill="#707a8b"
                                                        stroke="#707a8b"
                                                        stroke-width="0.2"
                                                    />
                                                    <path
                                                        id="Path_23190"
                                                        data-name="Path 23190"
                                                        d="M123.776,1.026a2.613,2.613,0,0,0-3.7,0L109.723,11.385a.58.58,0,0,0-.149.256l-1.362,4.918a.581.581,0,0,0,.714.715l4.918-1.362a.58.58,0,0,0,.256-.149L124.457,5.4a2.616,2.616,0,0,0,0-3.7ZM110.988,11.762l8.478-8.478L122.2,6.018,113.721,14.5Zm-.546,1.1,2.184,2.185-3.021.837Zm13.195-8.276-.616.616-2.734-2.734.616-.616a1.451,1.451,0,0,1,2.053,0l.682.681A1.454,1.454,0,0,1,123.636,4.581Zm0,0"
                                                        transform="translate(-101.909)"
                                                        fill="#707a8b"
                                                        stroke="#707a8b"
                                                        stroke-width="0.2"
                                                    />
                                                </g>
                                            </svg>
                                        </a>
                                    ) : (
                                        <></>
                                    )}
                                    <a
                                        className={`btn btn-outline-secondary mr-3 border-gray-light favourite ${
                                            product.liked ? "favourite-active" : ""
                                        }`}
                                        onClick={this.toggleLike}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="26.474"
                                            height="24.783"
                                            viewBox="0 0 26.474 24.783"
                                        >
                                            <path
                                                id="like_1_"
                                                data-name="like (1)"
                                                d="M26.43,9.216c-.386-4.283-3.4-7.39-7.165-7.39a7.113,7.113,0,0,0-6.1,3.54,6.856,6.856,0,0,0-5.955-3.54C3.441,1.826.43,4.933.044,9.216a7.67,7.67,0,0,0,.225,2.808,12.061,12.061,0,0,0,3.665,6.158l9.223,8.427,9.382-8.427A12.062,12.062,0,0,0,26.2,12.024,7.688,7.688,0,0,0,26.43,9.216Z"
                                                transform="translate(0 -1.826)"
                                                fill="#8f95a2"
                                            />
                                        </svg>
                                    </a>
                                    <a
                                        onClick={() => this.addShowingProductToCollection()}
                                        className="btn btn-outline-secondary mr-3  border-gray-light cursor-pointer"
                                    >
                                        Add to collection
                                    </a>
                                    <a
                                        onClick={() => this.addShowingProductToQuote()}
                                        className="btn mr-3  border-0 brand-bg-color-secondary text-white quote-now cursor-pointer"
                                    >
                                        Add to quote
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {similarDesigns.length > 0 && (
                    <div className="other-description p-0 pt-5 mt-4">
                        <div className="designs">
                            <h4 className="mb-4">More from this collection</h4>
                            <div className="show-products">
                                {similarDesigns.map((product, i) => {
                                    return (
                                        <ProductCardWithTick
                                            key={i}
                                            product={product}
                                            updateProductCard={() => this.updateProductCard(i)}
                                            likeProduct={this.likeProduct}
                                            unlikeProduct={this.unlikeProduct}
                                            addToQuote={this.addToQuote}
                                        />
                                    );
                                })}
                                {this.state.similarDesignLoading && (
                                    <CreateSkeletons iterations={12}>
                                        <ProductSkeleton />
                                    </CreateSkeletons>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                <Modal
                    show={measurementModal}
                    onHide={() => this.setState({ measurementModal: false })}
                    dialogClassName="modal-xl share-design-modal"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    {/*<Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                    </Modal.Title>
                </Modal.Header>*/}

                    <div className="modal-header border-0">
                        <h4 className="font-weight-normal m-0">Measurement chart</h4>
                        <button
                            type="button"
                            className="close pt-3 pb-2"
                            onClick={() => this.setState({ measurementModal: false })}
                            aria-label="Close"
                        >
                            <i className="material-icons">close</i>
                        </button>
                    </div>
                    <Modal.Body className="p-0">
                        <div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <MeasurementTable
                                        measurementResponse={product.measurementResponse}
                                        className={"measurement-table"}
                                    />
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
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
                            <div style={{ width: 20 }}></div>
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
                            <span
                                class="create-newbutton cursor-pointer"
                                onClick={() =>
                                    this.setState({
                                        showCollectionAddOption: !showCollectionAddOption,
                                    })
                                }
                            >
                                + Create new collection
                            </span>
                            {showCollectionAddOption ? (
                                <>
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
                                </>
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

export default connect(mapStateToProps, mapDispatchToProps)(OurDesignDetails);
