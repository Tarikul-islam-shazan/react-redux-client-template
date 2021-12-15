import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from "loadjs";
import RichTextEditor from "react-rte";

import LoadingOverlay from "react-loading-overlay";
import Http from "../../services/Http";
import { toastSuccess, toastError } from "../../commonComponents/Toast";
import { _storeData, validateShareDesign } from "./actions";
import ColorDropdown from "./components/ColorDropdown";
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
} from "../../constant";

let toolbarConfig = { display: [] };

class ShareDesign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            fabricType: "",
            fabricCompositionDetails: "",
            productGroupId: "",
            tableJson: null,
            note: RichTextEditor.createEmptyValue(),
            pantoneColorIdList: [],
            documentId: "",
            productDesignDoc: {},
            productTypeList: [],
            fabricTypeList: [],
            designCategoryList: [],
            collectionList: [],
            collectionId: "",
            showAddCollectionPopup: false,
            showCollectionAddOption: false,
            collectionName: "",
            isLoading: false,
            errors: {
                nameError: "",
                fabricTypeError: "",
                fabricCompositionDetailsError: "",
                productGroupIdError: "",
                collectionNameError: "",
                collectionIdError: "",
                colorListError: "",
            },
        };
    }

    setPickerRef = (node, i) => {
        this["colorRef_" + i] = node;
    };

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

    componentDidMount = async () => {
        document.title = "Share Design - Nitex";
        window.addEventListener("mousedown", this.handleClickOutside);
        await this.getProductTypes();
        await this.getFabricTypes();
        await this.getDesignCategories();
        await this.fetchCollectionList();
        loadjs(["/js/script.js"]);
    };

    componentWillUnmount = () => {
        window.removeEventListener("mousedown", this.handleClickOutside);
    };

    getProductTypes = async () => {
        await Http.GET("getProductTypeWithGroup")
            .then(({ data }) => {
                this.setState({
                    productTypeList: data,
                });
            })
            .catch(({ response }) => {
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Request was not successful");
                }
            });
    };

    getFabricTypes = async () => {
        await Http.GET("getFabricTypes")
            .then(({ data }) => {
                if (data) {
                    this.setState({
                        fabricTypeList: data,
                    });
                }
            })
            .catch(({ response }) => {
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Request was not successful");
                }
            });
    };

    getDesignCategories = async () => {
        await Http.GET("getDesignCategories")
            .then(({ data }) => {
                if (data) {
                    this.setState({
                        designCategoryList: data,
                    });
                }
            })
            .catch(({ response }) => {
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Request was not successful");
                }
            });
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    onChangeRT = (val, key) => {
        this.setState({
            [key]: val,
        });
    };

    onFileUpload = (e, docType) => {
        let file = e.target.files[0];
        let key = e.target.name;
        let data = {
            name: file.name,
            docMimeType: file.type,
            documentType: docType,
            base64Str: "",
        };
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            data.base64Str = reader.result;
            this.setState({
                productDesignDoc: data,
            });
            Http.UPLOAD_WITH_PROGRESS("uploadDocument", data, "", this.showUploadProgress)
                .then(({ data }) => {
                    this.setState({
                        documentId: data.id,
                    });
                })
                .catch(({ response }) => {
                    if (response && response.data && response.data.message) {
                        toastError(response.data.message);
                    } else {
                        toastError("Request was not successful");
                    }
                });
        };
        reader.onerror = function (error) {
            toastError(error);
        };
    };

    showUploadProgress = (data, doc) => {
        console.log("uploadDocument progress amount: ", (data.loaded / data.total) * 100, doc);
    };

    removeColor = (id) => {
        let { pantoneColorIdList } = this.state;
        pantoneColorIdList = pantoneColorIdList.filter((color, i) => color != id);
        this.setState({ pantoneColorIdList });
    };

    addColor = (id) => {
        let { pantoneColorIdList } = this.state;
        pantoneColorIdList.push(id);
        this.setState({ pantoneColorIdList });
    };

    onShareDesign = async (body) => {
        this.setState({ isLoading: true });
        await Http.POST("shareDesign", body)
            .then(({ data }) => {
                this.setState({ showAddCollectionPopup: false, isLoading: false });
                if (data.success) {
                    this.props.history.push("/designs/edit/" + data.id);
                } else {
                    toastError(data.message);
                }
            })
            .catch(({ response }) => {
                this.setState({ isLoading: false });
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Request was not successful");
                }
            });
    };

    submit = () => {
        let validated = validateShareDesign(this.state);
        this.setState({
            errors: { ...this.state.errors, ...validated.errors },
            pantoneColorIdList: validated.errors.pantoneColorIdList
                ? validated.errors.pantoneColorIdList
                : this.state.pantoneColorIdList,
        });
        if (validated.isValid) {
            this.setState({ showAddCollectionPopup: true });
            // this.onShareDesign(validated.reqBody);
        } else {
            loadjs(["/js/script.js"]);
        }
    };

    // fetchCollectionList = async (term = "") => {
    //     await Http.GET("getCollectionList", `?name=${term}`)
    //         .then(({ data }) => {
    //             if (data.data) {
    //                 this.setState({ collectionList: data.data });
    //             }
    //         })
    //         .catch(({ response }) => {
    //             if (response && response.data && response.data.message) {
    //                 toastError(response.data.message);
    //             } else {
    //                 toastError("Request was not successful");
    //             }
    //         });
    // };

    fetchCollectionList = async (term = "") => {
        let userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            userInfo = JSON.parse(userInfo);
        } else {
            userInfo = {};
        }
        await Http.GET("getUserCollectionList", `${userInfo.id}?name=${term}`)
            .then(({ data }) => {
                if (data.data) {
                    this.setState({ collectionList: data.data });
                }
            })
            .catch(({ response }) => {
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Request was not successful");
                }
            });
    };

    addToExistingCollection = async (collectionId) => {
        let {
            documentId,
            fabricCompositionDetails,
            fabricType,
            name,
            note,
            pantoneColorIdList,
            productCategoryId,
            productGroupId,
        } = this.state;
        await this.setState({ collectionId });
        await this.onShareDesign({
            documentId,
            fabricCompositionDetails,
            fabricType,
            isNitexProduct: false,
            name,
            note: note.toString("html"),
            pantoneColorIdList,
            productCategoryId,
            productGroupId,
            collectionId,
        });
    };

    createNewCollection = async () => {
        let { collectionName } = this.state;
        if (!collectionName) {
            this.setState({
                errors: { ...this.state.errors, collectionNameError: "Collection name required" },
            });
            return;
        } else {
            this.setState({
                errors: { ...this.state.errors, collectionNameError: "" },
            });
        }
        let body = {
            name: collectionName,
            privacy: "CUSTOM",
        };

        await Http.POST("addCollection", body)
            .then(({ data }) => {
                if (data) {
                    this.addToExistingCollection(data.id);
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

    onChangeText = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    render() {
        let {
            name,
            productCategoryId,
            fabricType,
            fabricCompositionDetails,
            productGroupId,
            note,
            productDesignDoc,
            productTypeList,
            fabricTypeList,
            designCategoryList,
            showAddCollectionPopup,
            showCollectionAddOption,
            collectionList,
        } = this.state;
        let {
            nameError,
            productCategoryIdError,
            fabricTypeError,
            fabricCompositionDetailsError,
            productGroupIdError,
            documentIdError,
            collectionNameError,
            colorListError,
        } = this.state.errors;

        return (
            <>
                <div>
                    <h4 className="semibold">Share your design</h4>
                    <p className="color-gray">
                        Get costing on any designs you like to manufacture for your label
                    </p>
                </div>

                <div className="share-your-design-form">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <div
                                            className={`uploader upload-design-image  mb-4 mb-sm-0 ${
                                                documentIdError ? `error2` : ``
                                            }`}
                                        >
                                            {productDesignDoc && productDesignDoc.name ? (
                                                <div className="uploaded-img-banner">
                                                    <img
                                                        className="border-0"
                                                        src={productDesignDoc.base64Str}
                                                        alt=""
                                                    />
                                                    <div
                                                        className="banner-close"
                                                        onClick={() =>
                                                            this.setState({
                                                                productDesignDoc: {},
                                                                documentId: "",
                                                            })
                                                        }
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="32.604"
                                                            height="32.604"
                                                            viewBox="0 0 32.604 32.604"
                                                        >
                                                            <g
                                                                id="Group_11390"
                                                                data-name="Group 11390"
                                                                transform="translate(61.557 -265.911) rotate(45)"
                                                            >
                                                                <path
                                                                    id="Path_27710"
                                                                    data-name="Path 27710"
                                                                    d="M2135.273,2351v38.108"
                                                                    transform="translate(-1967.718 -2138.497)"
                                                                    fill="none"
                                                                    stroke="#fff"
                                                                    strokeLinecap="round"
                                                                    strokeWidth="4"
                                                                ></path>
                                                                <path
                                                                    id="Path_27711"
                                                                    data-name="Path 27711"
                                                                    d="M0,0V38.109"
                                                                    transform="translate(186.609 231.555) rotate(90)"
                                                                    fill="none"
                                                                    stroke="#fff"
                                                                    strokeLinecap="round"
                                                                    strokeWidth="4"
                                                                ></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <label
                                                        for="drag-upload"
                                                        className="drag-upload"
                                                    >
                                                        &nbsp;
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="drag-upload"
                                                        className="file-upload"
                                                        name="productDesignDoc"
                                                        onChange={(e) =>
                                                            this.onFileUpload(e, "PRODUCT_DESIGN")
                                                        }
                                                    />
                                                </>
                                            )}
                                        </div>
                                        {documentIdError ? (
                                            <label className="error">{documentIdError}</label>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="stepper m-0">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label for="">Design name*</label>
                                            <input
                                                type="text"
                                                placeholder="Enter design name"
                                                className={`bg-gray-light border-0 ${
                                                    nameError ? `error2` : ``
                                                }`}
                                                name="name"
                                                value={name}
                                                onChange={this.onChange}
                                            />
                                            {nameError ? (
                                                <label className="error">{nameError}</label>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label for="">Design Category*</label>
                                            <select
                                                className={`w-100 bg-gray-light border-0 ${
                                                    productCategoryIdError ? `error2` : ``
                                                }`}
                                                name="productCategoryId"
                                                value={productCategoryId}
                                                onClick={this.onChange}
                                            >
                                                <option value="">Select category</option>
                                                {designCategoryList.map((item, i) => {
                                                    return (
                                                        <option key={i} value={item.id}>
                                                            {item.name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            {productCategoryIdError ? (
                                                <label className="error">
                                                    {productCategoryIdError}
                                                </label>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label for="">Market*</label>
                                            <select
                                                className={`w-100 bg-gray-light border-0 ${
                                                    productGroupIdError ? `error2` : ``
                                                }`}
                                                name="productGroupId"
                                                value={productGroupId}
                                                onClick={this.onChange}
                                            >
                                                <option value="">Select</option>
                                                {productTypeList.map((item, i) => (
                                                    <option value={item.id} key={item.id}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {productGroupIdError ? (
                                                <label className="error">
                                                    {productGroupIdError}
                                                </label>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label for="">Fabric type</label>
                                            <select
                                                className={`w-100 bg-gray-light border-0 ${
                                                    fabricTypeError ? `error2` : ``
                                                }`}
                                                name="fabricType"
                                                value={fabricType}
                                                onClick={this.onChange}
                                            >
                                                <option value="">Select fabric type</option>
                                                {fabricTypeList.map((item, i) => {
                                                    return (
                                                        <option key={i} value={item.code}>
                                                            {item.value}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            {/*<input type="text" placeholder="Fabric type" className="bg-gray-light border-0" name="fabricType" value={fabricType} onChange={this.onChange}/>*/}
                                            {fabricTypeError ? (
                                                <label className="error">{fabricTypeError}</label>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label for="">Fabric details</label>
                                            <input
                                                type="text"
                                                placeholder="Enter fabric details"
                                                className={`bg-gray-light border-0 ${
                                                    fabricCompositionDetailsError ? `error2` : ``
                                                }`}
                                                name="fabricCompositionDetails"
                                                value={fabricCompositionDetails}
                                                onChange={this.onChange}
                                            />
                                            {fabricCompositionDetailsError ? (
                                                <label className="error">
                                                    {fabricCompositionDetailsError}
                                                </label>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>

                                    <ColorDropdown
                                        error={colorListError}
                                        addColor={this.addColor}
                                        removeColor={this.removeColor}
                                    />

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label for="">Notes</label>
                                            <RichTextEditor
                                                className="rich-text"
                                                toolbarConfig={toolbarConfig}
                                                value={note}
                                                placeholder="Additional note....."
                                                onChange={(val) => this.onChangeRT(val, "note")}
                                                toolbarStyle={{ display: "none" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="text-right">
                                            <button
                                                className="btn-brand m-0 brand-bg-color"
                                                onClick={() => this.submit()}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {showAddCollectionPopup ? (
                    <div className="create-new-collection">
                        <div className="pop-container" ref={this.setWrapperRef}>
                            <LoadingOverlay
                                active={this.state.isLoading}
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
                                <h4 className="c-popup-title">Add to collection</h4>
                                <div className="all-collection">
                                    <div className="collection-search">
                                        <input
                                            type="search"
                                            placeholder="Collection name"
                                            onChange={(e) =>
                                                this.fetchCollectionList(e.target.value)
                                            }
                                        />
                                        <img src="/icons/search.svg" alt="search" />
                                    </div>
                                    {collectionList.length > 0 ? (
                                        <ul className="p-0 m-0 existing-item pop-list-item custom-scrollbar">
                                            {collectionList.map((collection, i) => {
                                                return (
                                                    <li key={i}>
                                                        <span>{collection.name}</span>
                                                        <button
                                                            className="button size32"
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
                                    ) : (
                                        <span className="no-collection-found">
                                            No collection found
                                        </span>
                                    )}
                                </div>

                                <span
                                    className="create-newbutton cursor-pointer"
                                    onClick={() =>
                                        this.setState({
                                            showCollectionAddOption: !showCollectionAddOption,
                                        })
                                    }
                                >
                                    <span className="plus">+</span> Create new collection
                                </span>
                                {showCollectionAddOption ? (
                                    <>
                                        <div className="collection-add-element">
                                            <div className="form-group">
                                                <label htmlFor="cname">Collection name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Type your collection name"
                                                    classname="bg-gray-light border-0"
                                                    name="collectionName"
                                                    onChange={(e) => this.onChangeText(e)}
                                                />
                                                {collectionNameError ? (
                                                    <label className="error">
                                                        {collectionNameError}
                                                    </label>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                            <div className="buttons text-right">
                                                <button
                                                    onClick={() =>
                                                        this.setState({
                                                            showCollectionAddOption:
                                                                !showCollectionAddOption,
                                                        })
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    disabled={this.state.isLoading}
                                                    onClick={() => this.createNewCollection()}
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </LoadingOverlay>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </>
        );
    }
}

const mapStateToProps = (store) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            _storeData,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareDesign);
