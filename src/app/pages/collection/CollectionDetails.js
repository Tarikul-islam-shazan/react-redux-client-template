import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Modal from "react-bootstrap/Modal";
import LoadingOverlay from "react-loading-overlay";
import Http from "../../services/Http";
import { toastSuccess, toastError } from "../../commonComponents/Toast";
import {
    encodeQueryData,
    clothingLabelStatus,
    STATUS_NOT_ALLOWED_FOR_SELECTION,
    authUserInfo,
} from "../../services/Util";
import ProductCardWithTick from "../../commonComponents/ProductCardWithTick";
import { ModalMyProductCard } from "../../commonComponents/ModalMyProductCard";
import AddCollectionTeamMember from "../../commonComponents/AddCollectionTeamMember";
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
    LOCAL_QUOTE_NOW_KEY,
} from "../../constant";
import { _storeData, _getProductForQuote } from "../design/actions";

// const filterProductBasedOnStatus = (products) => {
//     return products.filter((product) => !["LOCKED", "SOLD"].includes(product.availabilityStatus));
// };

class CollectionDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collection: {},
            page: 0,
            size: 20,
            loading: false,
            name: "",
            hasNext: true, //to check if pagination is available or not
            height: window.innerHeight,
            totalCount: 0,
            show: false,
            productList: [],
            myDesignList: [],
            myDesignHasNext: true,
            myDesignPage: 0,
            myDesignSize: 10,
            myDesignLoading: false,
            showAddMemberModal: false,
            showAddProductModal: false,
            usersByTypeList: [],
            allCheckBox: false,
            searchUserText: "",
            searchUserSuggestions: [],
            searchUserLoading: false,
            collectionList: [],
            collectionName: "",
            collectionNameError: "",
            showAddCollectionPopup: false,
            showCollectionAddOption: true,
            collectionType: "",
            collectionViewType: "",
            showEdit: true,
        };
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    };

    handleWindowScroll = async () => {
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
            let { hasNext, page, loading, productList, size } = this.state;
            if (hasNext && !loading && productList.length) {
                await this.getCollectionProducts(page + 1);
            }
        }
    };

    handleMyProductScroll = async () => {
        const wrappedElement = document.getElementById("myProductList");
        if (
            wrappedElement.scrollHeight - wrappedElement.scrollTop ===
            wrappedElement.clientHeight
        ) {
            let { myDesignHasNext, myDesignPage, myDesignLoading, myDesignList, myDesignSize } =
                this.state;
            if (myDesignHasNext && !myDesignLoading && myDesignList.length) {
                let data = await this.myProducts(myDesignPage + 1);
                if (data.length > 0) {
                    await this.setState({
                        myDesignList: [...myDesignList, ...data],
                        myDesignPage: myDesignPage + 1,
                        myDesignHasNext: data.length === myDesignSize ? true : false,
                        myDesignLoading: false,
                    });
                } else {
                    this.setState({
                        myDesignHasNext: false,
                        myDesignLoading: false,
                    });
                }
            } else {
                if (!myDesignHasNext) {
                    // toastWarning("No more rfq's found.")
                }
            }
        }
    };

    handleClickOutside = (event) => {
        if (this.AddNewMemberModal && !this.AddNewMemberModal.contains(event.target)) {
            this.setState({
                showAddMemberModal: false,
            });
        }
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                showAddCollectionPopup: false,
            });
        }
        if (this.addMyProductsModal && !this.addMyProductsModal.contains(event.target)) {
            this.setState({
                showAddProductModal: false,
            });
        }
    };

    getTitleName = () => {
        let { collection } = this.state;
        if (collection) {
            let title = collection.name;
            document.title = `View collection ${
                title ? title : ""
            } Nitex - The easiest clothing manufacturing software`;
        }
    };

    componentDidUpdate = () => {
        this.getTitleName();
    };

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleWindowScroll);
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    componentDidMount = async () => {
        window.addEventListener("scroll", this.handleWindowScroll);
        document.addEventListener("mousedown", this.handleClickOutside);
        let id = this.props.match.params.id;
        if (id !== "private-collection") {
            await this.getCollectionDetails(id);
        }
        await this.getCollectionProducts(0);
        await this.fetchCollectionList();
        if (id === "private-collection") {
            await this.setState({
                collectionType: "private-collection",
            });
            return;
        }
        let myDesignList = await this.myProducts();
        this.setState({ myDesignList });
        await this.getUsersByTypes();
    };

    getCollectionDetails = (collectionId) => {
        this.setState({ loading: true });
        let { size, name } = this.state;
        let user = authUserInfo();
        Http.GET("getCollectionDetails", collectionId)
            .then(({ data }) => {
                if (data) {
                    data.userResponseList = data.userResponseList.filter(
                        (addedUser) => addedUser.id !== user.id
                    );
                    if (user.id) {
                        data.userResponseList = [user, ...data.userResponseList];
                    }
                    this.setState({ collection: data });
                }
            })
            .catch(({ response }) => {
                this.setState({ loading: false });
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Something went wrong! Please try again.");
                }
            });
    };

    getCollectionProducts = async (page = 0) => {
        let paramName = "viewType";
        let regex = new RegExp("[\\?&]" + paramName + "=([^&#]*)");
        let results = regex.exec(this.props.location.search);
        if (results !== null) {
            if (results[1] !== "MY_PRODUCTS") {
                await this.setState({
                    showEdit: false,
                });
            }
            await this.setState({
                collectionViewType: results[1],
            });
            this.getViewTypeCollectionList(page, results[1]);
            return;
        }

        let collectionId = this.props.match.params.id;
        this.setState({ loading: true });
        let { size, name, productList } = this.state;
        Http.GET("getCollectionProducts", `${collectionId}?page=${page}&size=${size}`)
            .then(({ data }) => {
                this.setState({ loading: false });
                if (data) {
                    this.setState({
                        productList: [...productList, ...data.data],
                        page,
                        hasNext: data.currentPage + 1 < data.totalPages ? true : false,
                    });
                }
            })
            .catch(({ response }) => {
                this.setState({ loading: false });
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Something went wrong! Please try again.");
                }
            });
    };

    getViewTypeCollectionList = async (page, viewType) => {
        let { size, productList } = this.state;
        Http.GET("getCollectionProductsByCollectionType", `${viewType}?page=${page}&size=${size}`)
            .then(({ data }) => {
                this.setState({ loading: false });
                if (data) {
                    this.setState({
                        productList: [...productList, ...data.data],
                        page,
                        hasNext: data.currentPage + 1 < data.totalPages ? true : false,
                    });
                }
            })
            .catch(({ response }) => {
                this.setState({ loading: false });
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Something went wrong! Please try again.");
                }
            });
    };

    myProducts = async (myDesignPage = 0) => {
        this.setState({ myDesignLoading: true });
        let { myDesignList, myDesignSize } = this.state;
        let params = `?page=${myDesignPage}&size=${myDesignSize}&filterBy=ADDED_BY_ME&filterBy=FAVED_BY_ME&filterBy=QUOTATION`;
        let designParams = `?page=${myDesignPage}&size=${myDesignSize}&availabilityStatus=AVAILABLE`;
        let result = [];
        await Http.GET("getProductList", params)
            .then(({ data }) => {
                this.setState({ myDesignLoading: false });
                if (data && data.length > 0) {
                    const designList = data.filter(
                        (design) => design.availabilityStatus === "AVAILABLE"
                    );
                    result = [...result, ...designList];
                }
            })
            .catch((response) => {
                this.setState({ myDesignLoading: false });
                toastError("Something went wrong! Please try again.");
            });

        await Http.GET("searchProduct", designParams)
            .then(({ data }) => {
                this.setState({ myDesignLoading: false });
                if (data.productResponseList && data.productResponseList.length > 0) {
                    const pickDesignList = data.productResponseList.filter(
                        (design) => design.availabilityStatus === "AVAILABLE"
                    );
                    result = [...result, ...pickDesignList];
                }
            })
            .catch(({ response }) => {
                this.setState({ myDesignLoading: false });
                toastError("Something went wrong! Please try again.");
            });
        return result;
    };

    getUsersByTypes = async () => {
        let { usersByTypeList } = this.state;
        let params = `?userTypes=FASHION_DESIGNER&userTypes=EXECUTIVE`;
        await Http.GET("getUsersByTypes", params)
            .then(({ data }) => {
                this.setState({ loading: false });
                if (data) {
                    this.setState({
                        usersByTypeList: data,
                    });
                }
            })
            .catch(({ response }) => {
                this.setState({ loading: false });
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Something went wrong! Please try again.");
                }
            });
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

    formatUserTypeList = () => {
        let { usersByTypeList, searchUserText, searchUserSuggestions } = this.state;
        let result = [];
        if (searchUserText) {
            result.push(
                <ul class="p-0 m-0 existing-item">
                    {searchUserSuggestions.length ? (
                        searchUserSuggestions.map((user, i) => {
                            return (
                                <li key={i}>
                                    <div class="d-flex align-items-center">
                                        <img
                                            src={require("../../assets/images/pro_pic_default.svg")}
                                            alt=""
                                        />
                                        <div class="d-flex flex-column ml-2">
                                            <span>{user.name}</span>
                                            <div class="email">{user.email}</div>
                                        </div>
                                    </div>
                                    <button
                                        class="btn-brand m-0 brand-bg-color"
                                        onClick={() => this.addUserToCollection(user)}
                                    >
                                        Add
                                    </button>
                                </li>
                            );
                        })
                    ) : (
                        <li>
                            <div class="d-flex align-items-center">
                                <div class="d-flex flex-column ml-2">
                                    <span>No suggestions found</span>
                                </div>
                            </div>
                        </li>
                    )}
                </ul>
            );
        } else {
            for (const [key, value] of Object.entries(usersByTypeList)) {
                result.push(
                    <ul class="p-0 m-0 existing-item" key={key}>
                        <div class="title">{key}</div>
                        {value.map((user, i) => {
                            return (
                                <li key={i}>
                                    <div class="d-flex align-items-center">
                                        <img
                                            src={require("../../assets/images/pro_pic_default.svg")}
                                            alt=""
                                        />
                                        <div class="d-flex flex-column ml-2">
                                            <span>{user.name}</span>
                                            <div class="email">{user.email}</div>
                                        </div>
                                    </div>
                                    <button
                                        class="btn-brand m-0 brand-bg-color"
                                        onClick={() => this.addUserToCollection(user)}
                                    >
                                        Add
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                );
            }
        }

        return result;
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
                    let { productList } = this.state;
                    productList = productList.map((item, i) => {
                        if (item.id == id) {
                            item.liked = true;
                            return item;
                        }
                        return item;
                    });
                    this.setState({
                        productList,
                    });
                } else {
                    toastError(data.message);
                }
            })
            .catch(({ response }) => {
                this.setState({ loading: false });
                if (response && response.data && response.data.message) {
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
                    let { productList } = this.state;
                    productList = productList.map((item, i) => {
                        if (item.id == id) {
                            item.liked = false;
                            return item;
                        }
                        return item;
                    });
                    this.setState({
                        productList,
                    });
                } else {
                    toastError(data.message);
                }
                this.setState({ loading: false });
            })
            .catch(({ response }) => {
                this.setState({ loading: false });
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Request wasn't successful.");
                }
            });
    };

    updateProductCard = () => {
        let { selectedProductIds } = this.props;
        let { productList } = this.state;
        productList = productList.map((product) => {
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
        this.setState({ productList });
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

    addToCollection = (product) => {
        let collectionId = this.props.match.params.id;

        let body = {
            id: collectionId,
            productIds: [product.id],
        };
        Http.POST("addProductToCollection", body)
            .then(({ data }) => {
                if (data.success) {
                    this.setState({
                        productList: [product, ...this.state.productList],
                    });
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

    onChange = async (e) => {
        let { name, value, checked } = e.target;
        let { productList } = this.state;
        this.setState({
            [name]: name === "allCheckBox" ? checked : value,
        });
        if (name === "allCheckBox") {
            if (checked === true) {
                let list = [];
                productList.map((product) => {
                    if (!STATUS_NOT_ALLOWED_FOR_SELECTION.includes(product.availabilityStatus)) {
                        list.push(product.id);
                    }
                });
                await this.props._storeData("selectedProductIds", list);
                this.updateProductCard();
            } else {
                await this.props._storeData("selectedProductIds", []);
                this.updateProductCard();
            }
        } else if (name === "searchUserText") {
            this.getSearchSuggestions();
        }
    };

    getSearchSuggestions = async () => {
        let { searchUserText } = this.state;
        this.setState({ searchUserLoading: true });
        let params = `?userType=BUYER&email=${searchUserText}`;
        await Http.GET("getUserSuggestions", params)
            .then(({ data }) => {
                this.setState({ searchUserLoading: false });
                if (data) {
                    this.setState({
                        searchUserSuggestions: data,
                    });
                }
            })
            .catch((response) => {
                this.setState({ searchUserLoading: false });
                toastError("Something went wrong! Please try again.");
            });
    };

    _search = async () => {
        await this.setState({
            page: 0,
            // size : 100
        });
        this.renderList(0, false);
    };

    details = (id) => {
        this.props.history.push("/collections/view/" + id);
    };

    goToEdit = (id) => {
        this.props.history.push("/collection/edit/" + id);
    };

    delete = async (id) => {
        let body = {
            id,
        };
        await Http.DELETE_WITH_BODY("deleteCollection", body)
            .then(({ data }) => {
                this.setState({ loading: false });
                if (data.success) {
                    toastSuccess(data.message);
                    this.props.history.push("/collections/list");
                } else {
                    toastError(data.message);
                }
            })
            .catch(({ response }) => {
                this.setState({ loading: false });
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Something went wrong! Please try again.");
                }
            });
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

    addUserToCollection = (user) => {
        let collectionId = this.props.match.params.id;
        let { collection } = this.state;
        let body = {
            collectionId,
            userIds: [user.id],
        };
        Http.POST("shareCollection", body)
            .then(({ data }) => {
                if (data && data.success) {
                    if (collection.userResponseList && collection.userResponseList.length) {
                        let flag = true;
                        collection.userResponseList.map((item) => {
                            if (item.id == user.id) {
                                flag = false;
                            }
                        });
                        if (flag) {
                            toastSuccess(data.message);
                            collection.userResponseList = [...collection.userResponseList, user];
                        } else {
                            toastSuccess("Collection already shared");
                        }
                    } else {
                        collection.userResponseList = [user];
                    }
                    this.setState({ collection });
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

    removeUserFromCollelction = async (user) => {
        let collectionId = this.props.match.params.id;
        let { collection } = this.state;
        let body = {
            collectionId,
            userIds: [user.id],
        };
        await Http.POST("removeMemberFromCollection", body)
            .then(({ data }) => {
                if (data && data.success) {
                    let updatedCollection = collection.userResponseList.filter(
                        (item) => item.id !== user.id
                    );
                    toastSuccess(data.message);
                    collection.userResponseList = [...updatedCollection];
                }
                this.setState({ collection });
            })
            .catch(({ response }) => {
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Request was unsuccessful.");
                }
            });
    };

    render() {
        let {
            name,
            collection,
            productList,
            showAddMemberModal,
            showAddProductModal,
            myDesignList,
            usersByTypeList,
            searchUserText,
            searchUserSuggestions,
            collectionList,
            collectionName,
            collectionNameError,
            showAddCollectionPopup,
            showCollectionAddOption,
            collectionType,
            collectionViewType,
            showEdit,
            loading,
            myDesignLoading,
        } = this.state;

        const moreMember = 4;
        let memberData = {
            usersByTypeList,
            searchUserText,
            searchUserSuggestions,
            memberList: collection && collection.userResponseList,
        };

        const renderIcon = (user) => {
            if (user.profilePicDocument && user.profilePicDocument.docUrl) {
                return (
                    <img
                        onClick={() => this.setState({ showAddMemberModal: !showAddMemberModal })}
                        src={user.profilePicDocument.docUrl}
                        alt=""
                        data-toggle="tooltip"
                        data-placement="top"
                        title={user.name}
                    />
                );
            }
            return (
                <img
                    onClick={() => this.setState({ showAddMemberModal: !showAddMemberModal })}
                    src="/images/pro_pic_default.svg"
                    alt=""
                    data-toggle="tooltip"
                    data-placement="top"
                    title={user.name}
                />
            );
        };

        const renderMemberIcon = (collection) => {
            if (collection.userResponseList.length > moreMember) {
                return collection.userResponseList.slice(0, moreMember).map((user, i) => {
                    return renderIcon(user);
                });
            } else {
                return collection.userResponseList.map((user, i) => {
                    return renderIcon(user);
                });
            }
        };

        return (
            <>
                <div class="explore-design">
                    <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-5  buyer-add-customer">
                        <div class="">
                            {collectionViewType === "MY_PRODUCTS" ? (
                                <h4 class="font-26 semibold mb-4 mb-sm-0">My designs</h4>
                            ) : collectionViewType === "LIKED_PRODUCTS" ? (
                                <h4 class="font-26 semibold mb-4 mb-sm-0">My favourites</h4>
                            ) : (
                                <h4 class="font-26 semibold mb-4 mb-sm-0">{collection.name}</h4>
                            )}
                        </div>
                        {!collectionType &&
                        !collectionViewType &&
                        collection.privacy === "CUSTOM" ? (
                            <div className="add-buyer d-flex flex-column flex-sm-row align-items-center justify-content-end">
                                {collection.privacy === "CUSTOM" ||
                                collection.privacy === "USER_TYPE" ? (
                                    <div className="position-relative">
                                        <div className="added-members">
                                            <div
                                                id="AddNewMember"
                                                ref={(node) => (this.AddNewMemberButton = node)}
                                                className={`add-new-member ${
                                                    showAddMemberModal ? `show` : ``
                                                }`}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="39"
                                                    height="39"
                                                    viewBox="0 0 39 39"
                                                    onClick={() =>
                                                        this.setState({
                                                            showAddMemberModal: !showAddMemberModal,
                                                        })
                                                    }
                                                >
                                                    <g
                                                        id="Group_22785"
                                                        data-name="Group 22785"
                                                        transform="translate(-1471 -119)"
                                                    >
                                                        <circle
                                                            id="Ellipse_122"
                                                            data-name="Ellipse 122"
                                                            cx="18.5"
                                                            cy="18.5"
                                                            r="18.5"
                                                            transform="translate(1472 120)"
                                                            fill="#ebe8e8"
                                                            stroke="#fff"
                                                            strokeWidth="2"
                                                        />
                                                        <text
                                                            id="_"
                                                            data-name="+"
                                                            transform="translate(1484 148)"
                                                            fill="#21242b"
                                                            fontSize="24"
                                                            fontFamily="OpenSans-Semibold, Open Sans"
                                                            fontWeight="600"
                                                        >
                                                            <tspan x="0" y="0">
                                                                +
                                                            </tspan>
                                                        </text>
                                                    </g>
                                                </svg>
                                            </div>

                                            {collection && collection.userResponseList ? (
                                                <>
                                                    {renderMemberIcon(collection)}
                                                    {collection.userResponseList.length >
                                                    moreMember ? (
                                                        <div className="more-people">
                                                            <a
                                                                href="#"
                                                                onClick={() =>
                                                                    this.setState({
                                                                        showAddMemberModal:
                                                                            !showAddMemberModal,
                                                                    })
                                                                }
                                                            >
                                                                +
                                                                {collection.userResponseList
                                                                    .length - moreMember}
                                                            </a>
                                                        </div>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                        <div
                                            className={`add-people-popup no-padding-popup shadow ${
                                                showAddMemberModal ? `show` : ``
                                            }`}
                                            ref={(node) => (this.AddNewMemberModal = node)}
                                        >
                                            <div className="close-add-people mb-3 d-block d-sm-none">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20.941"
                                                    height="20.941"
                                                    viewBox="0 0 20.941 20.941"
                                                >
                                                    <g
                                                        id="Group_22803"
                                                        data-name="Group 22803"
                                                        transform="translate(2489.29 -478.941)"
                                                    >
                                                        <line
                                                            id="Line_153"
                                                            data-name="Line 153"
                                                            x2="25.615"
                                                            transform="translate(-2487.875 480.355) rotate(45)"
                                                            fill="none"
                                                            stroke="#21242b"
                                                            stroke-linecap="round"
                                                            strokeWidth="2"
                                                        />
                                                        <line
                                                            id="Line_154"
                                                            data-name="Line 154"
                                                            x2="25.615"
                                                            transform="translate(-2469.763 480.355) rotate(135)"
                                                            fill="none"
                                                            stroke="#21242b"
                                                            stroke-linecap="round"
                                                            strokeWidth="2"
                                                        />
                                                    </g>
                                                </svg>
                                            </div>
                                            <AddCollectionTeamMember
                                                memberData={memberData}
                                                onAddMember={this.addUserToCollection}
                                                onRemoveMember={this.removeUserFromCollelction}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>

                    <div class="add-more-designs">
                        <div
                            class={`add-more ml-auto ${showAddProductModal ? `open` : ``}`}
                            id="myProductList"
                            onScroll={this.handleMyProductScroll}
                            ref={(node) => (this.addMyProductsModal = node)}
                        >
                            <div id="closeRPop" class="p-3 cursor-pointer">
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
                            <div class="header d-flex justify-content-between align-items-center">
                                <h4 className="semibold">Add more designs to collection</h4>
                                <div>
                                    {/* <div class="cursor-pointer d-inline-block mr-2 mr-sm-4">
                                      <svg onClick={() => this.myProducts(0)} xmlns="http://www.w3.org/2000/svg" width="24.877" height="27.209" viewBox="0 0 24.877 27.209">
                                          <g id="reload" transform="translate(-20.982 0)">
                                              <g id="Group_11184" data-name="Group 11184" transform="translate(20.982 0)">
                                                  <path id="Path_27871" data-name="Path 27871" d="M26.048,5.4a10.847,10.847,0,0,1,14.1-.372l-3.228.122a.75.75,0,0,0,.028,1.5h.028l4.956-.183a.749.749,0,0,0,.722-.75V5.623h0l-.183-4.9a.751.751,0,0,0-1.5.056l.117,3.073a12.337,12.337,0,0,0-16.046.433,12.341,12.341,0,0,0-3.712,12.062.747.747,0,0,0,.728.572.65.65,0,0,0,.178-.022.751.751,0,0,0,.55-.906A10.84,10.84,0,0,1,26.048,5.4Z" transform="translate(-20.982 0)" fill="#41487c"></path>
                                                  <path id="Path_27872" data-name="Path 27872" d="M98.7,185.786a.749.749,0,1,0-1.456.356,10.839,10.839,0,0,1-17.452,10.9l3.267-.294a.751.751,0,0,0-.139-1.495l-4.939.444a.749.749,0,0,0-.678.817l.444,4.939a.749.749,0,0,0,.745.683.27.27,0,0,0,.067-.006.749.749,0,0,0,.678-.817l-.267-3.006a12.254,12.254,0,0,0,7.129,2.717c.211.011.422.017.628.017A12.339,12.339,0,0,0,98.7,185.786Z" transform="translate(-74.167 -174.923)" fill="#41487c"></path>
                                              </g>
                                          </g>
                                      </svg>
                                  </div> */}
                                    <div
                                        className="cursor-pointer d-inline-block"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Add new design"
                                    >
                                        <svg
                                            onClick={() => window.open("/designs/add")}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="27.615"
                                            height="27.615"
                                            viewBox="0 0 27.615 27.615"
                                        >
                                            <g
                                                id="Group_11190"
                                                data-name="Group 11190"
                                                transform="translate(-2672.328 4255.322) rotate(45)"
                                            >
                                                <line
                                                    id="Line_153"
                                                    data-name="Line 153"
                                                    x2="25.615"
                                                    transform="translate(-1108.875 -4907.645) rotate(45)"
                                                    fill="none"
                                                    stroke="#41487c"
                                                    stroke-linecap="round"
                                                    stroke-width="2"
                                                ></line>
                                                <line
                                                    id="Line_154"
                                                    data-name="Line 154"
                                                    x2="25.615"
                                                    transform="translate(-1090.763 -4907.645) rotate(135)"
                                                    fill="none"
                                                    stroke="#41487c"
                                                    stroke-linecap="round"
                                                    stroke-width="2"
                                                ></line>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div class="added-item custom-scrollbar">
                                {!myDesignLoading ? (
                                    myDesignList.map((product, i) => {
                                        return (
                                            <ModalMyProductCard
                                                key={i}
                                                product={product}
                                                buttonAction={this.addToCollection}
                                                buttonTitle="Add to collection"
                                            />
                                        );
                                    })
                                ) : (
                                    <CreateSkeletons iterations={10}>
                                        <ProductSkeleton />
                                    </CreateSkeletons>
                                )}
                            </div>
                        </div>
                    </div>

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
                                <span
                                    class="create-newbutton cursor-pointer"
                                    onClick={() => this.setState({ showCollectionAddOption: true })}
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

                                {collectionList.length > 0 ? (
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

                    {productList.length === 0 && !loading && (
                        <div class="alert alert-secondary text-center" role="alert">
                            No result found
                        </div>
                    )}

                    {productList.length > 0 && !loading && (
                        <div class="designs">
                            <div class="all-select d-flex align-items-center mb-3">
                                <div class="flex-grow-1 d-flex align-items-center">
                                    <div class="all-checkbox bg-gray-light p-3">
                                        <div class="custom-chekbox">
                                            <div class="form-group m-0">
                                                <input
                                                    type="checkbox"
                                                    id="All"
                                                    name="allCheckBox"
                                                    onChange={this.onChange}
                                                />
                                                <label for="All" class="m-0">
                                                    <span class="align-middle">All</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="show-products">
                                {productList.map((product, i) => {
                                    return (
                                        <ProductCardWithTick
                                            key={i}
                                            product={product}
                                            updateProductCard={() => this.updateProductCard()}
                                            addToQuote={this.addToQuote}
                                            likeProduct={this.likeProduct}
                                            unlikeProduct={this.unlikeProduct}
                                            showEdit={showEdit}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(CollectionDetails);
