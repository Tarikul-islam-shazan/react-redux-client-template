import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from "loadjs";
import Modal from "react-bootstrap/Modal";

import LoadingOverlay from "react-loading-overlay";
import Http from "../../services/Http";
import { toastSuccess, toastError, toastWarning } from "../../commonComponents/Toast";
import Loader from "../../commonComponents/Loader";
import { encodeQueryData, convertTimeToLocal, convertDateTimeToLocal } from "../../services/Util";
import moment from "moment";
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
import DeleteModal from "../../commonComponents/modals/DeleteModal";

// import {CollectionCard} from './components/CollectionCard';

class CollectionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collectionList: [],
            fixedCollections: [],
            page: 0,
            size: 15,
            loading: false,
            showRemove: false,
            name: "",
            hasNext: true, //to check if pagination is available or not
            height: window.innerHeight,
            totalCount: 0,
            removedCollectionId: null,
            show: false,
            showAddCollectionPopup: false,
            collectionName: "",
            collectionNameError: "",
            selectedTab: "SHARED",
            collectionLoading: false,
        };
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    };

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                showAddCollectionPopup: false,
            });
        }
    };

    handleScroll = () => {
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
            let { hasNext, page, loading } = this.state;
            console.log("message", "bottom reached", hasNext, page, loading);
            if (hasNext && !loading) {
                this.renderList(page + 1, true);
            } else {
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

    componentDidMount = async () => {
        document.title = "My collections - Nitex - The easiest clothing manufacturing software";
        window.addEventListener("scroll", this.handleScroll);
        document.addEventListener("mousedown", this.handleClickOutside);
        //   this.getFixedCollections();
        await this.renderList(0);
        // await this.setData();
    };

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    getFixedCollections = async () => {
        await Http.GET("getFixedCollection")
            .then(({ data }) => {
                console.log("PRODUCT LIST SUCCESS: ", data);
                this.setState({ loading: false });
                if (data) {
                    this.setState({
                        fixedCollections: data,
                    });
                }
            })
            .catch((response) => {
                console.log("PRODUCT LIST ERROR: ", JSON.stringify(response));
                this.setState({ loading: false });
                toastError("Something went wrong! Please try again.");
            });
    };

    renderList = async (page = 0, merge = true) => {
        let userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            userInfo = JSON.parse(userInfo);
        } else {
            userInfo = {};
        }
        this.setState({ loading: true });
        let { size, name, collectionList, selectedTab } = this.state;

        let params = {
            page: page,
            size: size,
            name,
            memberType: selectedTab,
        };
        let paramData = encodeQueryData(params);

        await Http.GET("getUserCollectionList", userInfo.id + paramData)
            .then(({ data }) => {
                console.log("getclients SUCCESS: ", data);
                if (data.data && data.data.length > 0) {
                    if (merge) {
                        this.setState({
                            collectionList: [...collectionList, ...data.data],
                            page: page,
                            hasNext: data.currentPage + 1 >= data.totalPages ? false : true,
                            loading: false,
                            totalCount: data.totalElements,
                        });
                    } else {
                        this.setState({
                            collectionList: data.data,
                            page: page,
                            hasNext: data.currentPage + 1 >= data.totalPages ? false : true,
                            loading: false,
                            totalCount: data.totalElements,
                        });
                    }
                } else {
                    this.setState({
                        collectionList: merge ? collectionList : [],
                        hasNext: false,
                        loading: false,
                        totalCount: data.totalElements,
                    });
                    // toastWarning("Project List - no data found.");
                }
            })
            .catch((response) => {
                console.log("PROJECT LIST ERROR: ", JSON.stringify(response));
                this.setState({ loading: false });
                toastError("Something went wrong! Please try again.");
            });
    };

    onChange = async (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    _search = async (searchTerm) => {
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

    delete = async (id) => {};

    createNewCollection = () => {
        this.setState({
            collectionLoading: true,
        });
        let { collectionName } = this.state;
        if (!collectionName) {
            this.setState({
                collectionNameError: "Collection name required",
                collectionLoading: false,
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
                    if (data.success) {
                        toastSuccess(data.message);
                        let temp = {
                            id: data.id,
                            name: collectionName,
                            collectionViewType: "PRODUCT_LIST",
                            numOfDesign: 0,
                            documentResponseList: [],
                        };
                        let { collectionList } = this.state;
                        this.setState({
                            collectionName: "",
                            collectionList: [temp, ...collectionList],
                            collectionLoading: false,
                        });
                    }
                    this.setState({ showAddCollectionPopup: false, collectionLoading: false });
                }
            })
            .catch(({ response }) => {
                this.setState({
                    collectionLoading: false,
                });
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Request was unsuccessful.");
                }
            });
    };

    removeCollection = (id) => {
        this.setState({
            removedCollectionId: id,
            showRemove: true
        })
    }

    handleClose = () => {
        this.setState({
            showRemove: false
        })
    }

    deleteCollection = async () => {
        let {collectionList, removedCollectionId} = this.state;
        let body = {
            id: removedCollectionId
        };
        await Http.DELETE_WITH_BODY('deleteCollection', body)
            .then(({data}) => {
                this.setState({loading: false});
                toastSuccess(data.message);
                collectionList = collectionList.filter((collection) => collection.id !== removedCollectionId);
                this.setState({
                    showRemove: false,
                    collectionList
                });
            })
            .catch(({response}) => {
                this.setState({loading: false});
                toastError('Something went wrong! Please try again.');
            });
    }

    render() {
        let {
            name,
            collectionList,
            fixedCollections,
            showAddCollectionPopup,
            collectionName,
            collectionNameError,
            selectedTab,
        } = this.state;

        const getDuration = (postedTime) => {
            if (postedTime) {
                let timeDifference = 0;
                let timeAdded = postedTime?.split("T")[1];
                let dateAdded = postedTime?.split("T")[0];

                let formattedQuoteDate = convertDateTimeToLocal(
                    dateAdded,
                    timeAdded,
                    "DD/MM/YYYY hh:mm A"
                );
                formattedQuoteDate = moment(formattedQuoteDate, "DD/MM/YYYY hh:mm A");
                const currentDate = moment().format("DD/MM/YYYY hh:mm A");
                const formattedCurrentDate = moment(currentDate, "DD/MM/YYYY hh:mm A");
                timeDifference = formattedCurrentDate.diff(formattedQuoteDate, "days");
                let hours = 0;
                if (timeDifference < 1 && timeDifference >= 0) {
                    hours = formattedCurrentDate.diff(formattedQuoteDate, "hours");
                    return `${hours} hours ago`;
                } else if (timeDifference >= 1) {
                    return `${timeDifference} days ago`;
                } else {
                    let minutes = formattedCurrentDate.diff(formattedQuoteDate, "minutes");
                    return `${minutes} minutes ago`;
                }
            }
        };

        const onSearch = (e) => {
            this.setState({ name: e.target.value });
            this._search();
        };

        return (
            <LoadingOverlay
                active={this.state.loading}
                styles={{
                    overlay: (base) => ({
                        ...base,
                        background: LOADER_OVERLAY_BACKGROUND,
                    }),
                    spinner: (base) => ({
                        ...base,
                        width: LOADER_WIDTH,
                        position: LOADER_POSITION,
                        top: LOADER_TOP,
                        left: LOADER_LEFT,
                        marginTop: LOADER_MARGIN_TOP,
                        marginLeft: LOADER_MARGIN_LEFT,
                        "& svg circle": {
                            stroke: LOADER_COLOR,
                        },
                    }),
                    content: (base) => ({
                        ...base,
                        color: LOADER_COLOR,
                    }),
                }}
                spinner
                text={LOADER_TEXT}
            >
                <div className="explore-design collection-list">
                    <div className="d-flex justify-content-between mb-3 mb-sm-0 collection-top-header">
                        <div className="filter-container explore-design-filter mb-3">
                            <h3>Collections</h3>

                            {/*<div className="search w-100">*/}
                            {/*    <svg xmlns="http://www.w3.org/2000/svg" width="16.55" height="16.508" viewBox="0 0 16.55 16.508">*/}
                            {/*        <path id="Path_23797" data-name="Path 23797" d="M15.916,15.191l-3.89-3.89a6.831,6.831,0,1,0-.674.674l3.89,3.89a.482.482,0,0,0,.337.142.468.468,0,0,0,.337-.142A.48.48,0,0,0,15.916,15.191ZM1,6.826A5.867,5.867,0,1,1,6.872,12.7,5.874,5.874,0,0,1,1,6.826Z" transform="translate(0.2 0.25)" fill="#a1a6b2" stroke="#a1a6b2" stroke-width="0.5"></path>*/}
                            {/*    </svg>*/}
                            {/*    <input type="search" placeholder="Search by collection name….. " className="w-100"/>*/}
                            {/*</div>*/}
                        </div>
                        <div className="header-button collection-header">
                            <span className="search collection-search">
                                <svg
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
                                        stroke-width="0.5"
                                    ></path>
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    name="search"
                                    value={name}
                                    onChange={(e) => onSearch(e)}
                                />
                            </span>
                            <button
                                className="m-0 btn-with-icon"
                                onClick={() => this.props.history.push("/designs/add")}
                            >
                                <img src="../icons/upload.svg" />
                                Upload design
                            </button>
                            <button
                                className="m-0 btn-brand"
                                onClick={() => this.setState({ showAddCollectionPopup: true })}
                            >
                                + Create collection
                            </button>
                        </div>
                    </div>
                    <div className="collections-tab">
                        <ul>
                            <li
                                className={selectedTab === "SHARED" ? "active" : ""}
                                onClick={async () => {
                                    await this.setState({
                                        selectedTab: "SHARED",
                                        collectionList: [],
                                        name: "",
                                    });
                                    await this.renderList(0, false);
                                }}
                            >
                                Shared with me
                            </li>
                            <li
                                className={selectedTab === "OWNER" ? "active" : ""}
                                onClick={async () => {
                                    await this.setState({
                                        selectedTab: "OWNER",
                                        collectionList: [],
                                        name: "",
                                    });
                                    await this.getFixedCollections();
                                    await this.renderList(0, false);
                                }}
                            >
                                My collections
                            </li>
                        </ul>
                    </div>

                    {selectedTab === "OWNER" && !name && (
                        <div className="collection-type-container mb-5">
                            {fixedCollections.map((collection, i) => {
                                let docs =
                                    collection.documentResponseList &&
                                    collection.documentResponseList.length
                                        ? collection.documentResponseList
                                        : [];
                                let img1 = docs.length > 0 ? docs[0].docUrl : "";
                                let img2 = docs.length > 1 ? docs[1].docUrl : "";
                                let img3 = docs.length > 2 ? docs[2].docUrl : "";
                                return (
                                    <div
                                        className="collection-type-item"
                                        key={i}
                                        onClick={() => {
                                            this.props.history.push(
                                                "/collections/view/private-collection?viewType=" +
                                                    collection.collectionViewType
                                            );
                                        }}
                                    >
                                        <div className="product-img-container">
                                            <div className="prev-img">
                                                <img
                                                    src={
                                                        img1
                                                            ? img1
                                                            : require("../../assets/images/default_product.svg")
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                            <div className="prev-img-thumb">
                                                <img
                                                    src={
                                                        img2
                                                            ? img2
                                                            : require("../../assets/images/default_product.svg")
                                                    }
                                                    alt=""
                                                />
                                                <img
                                                    src={
                                                        img3
                                                            ? img3
                                                            : require("../../assets/images/default_product.svg")
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        {collection.collectionViewType === "MY_PRODUCTS" ? (
                                            <>
                                                <h4 className="font-16 font-weight-normal mt-3 d-flex justify-content-between">
                                                    <span>My designs</span>
                                                </h4>
                                                <div className="quantity collections-quantity">
                                                    <span className="design-category">
                                                        {`${
                                                            collection.numOfDesign > 1
                                                                ? `${collection.numOfDesign} Styles`
                                                                : `${collection.numOfDesign} Style`
                                                        }`}
                                                    </span>
                                                </div>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                        {collection.collectionViewType === "LIKED_PRODUCTS" ? (
                                            <>
                                                <h4 className="font-16 font-weight-normal mt-3 d-flex justify-content-between">
                                                    <span>My favourites</span>
                                                </h4>
                                                <div className="quantity collections-quantity">
                                                    <span className="design-category">
                                                        {`${
                                                            collection.numOfDesign > 1
                                                                ? `${collection.numOfDesign} Styles`
                                                                : `${collection.numOfDesign} Style`
                                                        }`}
                                                    </span>
                                                </div>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* <h4 className="mb-4 font-weight-normal">Custom collections</h4> */}
                    <div className="collection-type-container">
                        {collectionList.map((collection, i) => {
                            let docs =
                                collection.documentResponseList &&
                                collection.documentResponseList.length
                                    ? collection.documentResponseList
                                    : [];
                            let img1 = docs.length > 0 ? docs[0].docUrl : "";
                            let img2 = docs.length > 1 ? docs[1].docUrl : "";
                            let img3 = docs.length > 2 ? docs[2].docUrl : "";
                            return (
                                <div
                                    className="collection-type-item"
                                    key={i}
                                >
                                    <div onClick={() =>
                                        this.props.history.push(
                                            "/collections/view/" + collection.id + `?selectedTab=${this.state.selectedTab}`
                                        )
                                    }>
                                        <div className="product-img-container">
                                            <div className="prev-img">
                                                <img
                                                    src={
                                                        img1
                                                            ? img1
                                                            : require("../../assets/images/default_product.svg")
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                            <div className="prev-img-thumb">
                                                <img
                                                    src={
                                                        img2
                                                            ? img2
                                                            : require("../../assets/images/default_product.svg")
                                                    }
                                                    alt=""
                                                />
                                                <img
                                                    src={
                                                        img3
                                                            ? img3
                                                            : require("../../assets/images/default_product.svg")
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        <h4 className="font-16 font-weight-normal mt-3 d-flex flex-column">
                                            <span>{collection.name}</span>
                                        </h4>
                                    </div>
                                    <div className="quantity collections-quantity">
                                        <span>
                                            <span>By: </span> {collection.ownerName}
                                        </span>
                                        <span className="design-category dot">
                                            {`${
                                                collection.numOfDesign > 1
                                                    ? `${collection.numOfDesign} Styles`
                                                    : `${collection.numOfDesign} Style`
                                            }`}
                                        </span>
                                        {collection.lastDesignUpdatedAt && (
                                            <span className="design-category dot">
                                                {getDuration(collection.lastDesignUpdatedAt)}
                                            </span>
                                        )}
                                        {selectedTab === "OWNER" &&
                                            <span
                                                onClick={() => this.removeCollection(collection.id)}
                                                className="float-right"
                                            >
                                                Delete
                                            </span>
                                        }
                                    </div>
                                </div>
                            );
                        })}
                        {showAddCollectionPopup ? (
                            <div className="create-new-collection">
                                <div className="pop-container" ref={this.setWrapperRef}>
                                    <span className="create-newbutton cursor-pointer">
                                        + Create new collection
                                    </span>
                                    <div className="create-new d-flex">
                                        <input
                                            type="text"
                                            placeholder="Type your collection name"
                                            className="bg-gray-light border-0"
                                            name="collectionName"
                                            value={collectionName}
                                            onChange={this.onChange}
                                        />
                                        <button
                                            className="btn-brand m-0 brand-bg-color"
                                            onClick={this.createNewCollection}
                                            disabled={this.state.collectionLoading}
                                        >
                                            Create
                                        </button>
                                    </div>
                                    {collectionNameError ? (
                                        <p className="error">{collectionNameError}</p>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                {this.state.showRemove && (
                    <DeleteModal onRemove={this.deleteCollection} onClose={this.handleClose} />
                )}
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = (store) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);
