import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loadjs from "loadjs";
import Modal from "react-bootstrap/Modal";
import RichTextEditor from "react-rte";

import LoadingOverlay from "react-loading-overlay";
import Http from "../../services/Http";
import { toastSuccess, toastError, toastWarning } from "../../commonComponents/Toast";
import { _storeData, validateShareDesign } from "./actions";

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
} from "../../constant";
import ColorRowWithPicker from "./components/ColorRowWithPicker";

import { Title } from "./components/EditShareDesignComponents/Title";
import { ColorAndFabrication } from "./components/EditShareDesignComponents/ColorAndFabrication";
import { DocumentHandler } from "./components/EditShareDesignComponents/DocumentHandler";
import { Notes } from "./components/EditShareDesignComponents/Notes";
import MeasurmentChartV2 from "./components/EditShareDesignComponents/MeasurmentChartV2";
import { ImageItem } from "./components/EditShareDesignComponents/ImageItem";

class EditShareDesign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            designDetails: {},
            designDocuments: {},
            designCategoryList: [],
            productTypeList: [],
            fabricTypeList: [],
            editTitle: false,
            editColorAndFabrication: false,
            editNotes: false,
            pantoneColorIdList: [],
            showProgressModal: false,
            loading: false,
            uploadInProgressDocs: {},
            visibleDocType: "",
            errors: {
                nameError: "",
                fabricTypeError: "",
                fabricTypeIdError: "",
                fabricDetailsError: "",
                productTypeIdError: "",
            },
        };
    }

    setPickerRef = (node, i) => {
        this["colorRef_" + i] = node;
        console.log("setPickerRef", node, i);
    };

    getTitleName = () => {
        let { designDetails } = this.state;
        if (designDetails) {
            let title = designDetails.name;
            document.title = `Edit design ${
                title ? title : ""
            } Nitex - The easiest clothing manufacturing software`;
        }
    };

    componentDidUpdate = () => {
        this.getTitleName();
    };

    componentDidMount = async () => {
        let id = this.props.match.params.id;
        window.addEventListener("mousedown", this.handleClickOutside);
        this.getDesignDetails(id);
        this.getDesignDocuments(id);
        this.getProductTypes();
        this.getFabricTypes();
        this.getDesignCategories();
    };

    componentWillUnmount = () => {
        window.removeEventListener("mousedown", this.handleClickOutside);
    };

    getDesignDetails = async (id) => {
        this.setState({ loading: true });
        await Http.GET("getShareDesignDetails", id)
            .then(({ data }) => {
                this.setState({ loading: false });
                if (data) {
                    data.note = data.note
                        ? RichTextEditor.createValueFromString(data.note, "html")
                        : RichTextEditor.createEmptyValue();
                    data.productCategoryId = data.categoryResponse ? data.categoryResponse.id : "";
                    data.productGroupId = data.marketResponse ? data.marketResponse.id : "";
                    data.colorEditRequestList = data.colorResponseList
                        ? data.colorResponseList.map((item) => {
                              return {
                                  id: item.id,
                                  value: item.name,
                                  code: item.code,
                                  hexCode: item.hexCode,
                                  colorId: item.id,
                              };
                          })
                        : [];

                    this.setState({ designDetails: data });
                }
            })
            .catch(({ response }) => {
                console.log("getShareDesignDetails ERROR: ", JSON.stringify(response));
                this.setState({ loading: false });
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Something went wrong! Please try again.");
                }
            });
    };

    getDesignDocuments = async (id) => {
        await Http.GET("getDocumentResponse", id)
            .then(({ data }) => {
                console.log("getDesignImages SUCCESS: ", data);
                if (data) {
                    this.setState({
                        designDocuments: data,
                    });
                }
            })
            .catch(({ response }) => {
                console.log("getDesignImages ERROR: ", JSON.stringify(response));
                this.setState({ loading: false });
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Something went wrong! Please try again.");
                }
            });
    };

    getProductTypes = async () => {
        await Http.GET("getProductTypeWithGroup")
            .then(({ data }) => {
                this.setState({
                    productTypeList: data,
                });
            })
            .catch((response) => {});
    };

    getFabricTypes = async () => {
        await Http.GET("getFabricTypes")
            .then(({ data }) => {
                if (data) {
                    this.setState({
                        fabricTypeList: data,
                    });
                    loadjs(["/js/script.js"]);
                }
            })
            .catch((response) => {});
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
            .catch((response) => {});
    };

    toggleFlag = async (sectionName) => {
        let temp = this.state[sectionName];
        console.log("from toggleFlag", temp, !temp, sectionName);
        await this.setState(
            {
                [sectionName]: !temp,
            },
            () => {
                if (sectionName === "editColorAndFabrication") {
                    loadjs(["/js/reloda-niceSelect.js"]);
                }
            }
        );
    };

    onChange = (name, value) => {
        let { designDetails } = this.state;
        designDetails[name] = value;
        this.setState({
            designDetails,
        });
    };

    removeColor = (item) => {
        let { designDetails } = this.state;

        if (designDetails.colorEditRequestList) {
            designDetails.colorEditRequestList = designDetails.colorEditRequestList.filter(
                (color, i) => color.id !== item.id
            );
        }
        this.setState({ designDetails });
    };

    addColor = (item) => {
        let { designDetails } = this.state;
        if (designDetails.colorEditRequestList) {
            designDetails.colorEditRequestList.push(item);
        }

        this.setState({ designDetails });
    };

    onFileSelect = async (e, docType, documentGroup, featureImageDoc = "") => {
        let files = Array.from(e.target.files);
        await files.map((item) => {
            let data = {
                name: item.name,
                docMimeType: item.type,
                documentType: docType,
                documentGroup,
                base64Str: "",
                productId: this.props.match.params.id,
            };
            let reader = new FileReader();
            reader.readAsDataURL(item);
            reader.onload = () => {
                data.base64Str = reader.result;
                this.uploadFile(data, featureImageDoc);
            };
            reader.onerror = function (error) {
                console.log("Error: ", error);
            };
        });
    };

    uploadFile = async (doc, featureImageDoc) => {
        this.setState({ loading: true });
        let id = this.props.match.params.id;
        await Http.POST("addNewGroupDocument", doc)
            .then(({ data }) => {
                this.setState({ loading: false });
                if (data.id) {
                    toastSuccess(data.message);
                    this.getDesignDocuments(id);
                    if (doc.documentGroup === "FEATURE_IMAGE") {
                        this.onFileRemove(featureImageDoc);
                    }
                }
            })
            .catch(({ response }) => {
                console.log("uploadDocument ERROR: ", response);
            });
    };

    onFileRemove = (deletedDoc) => {
        let productId = this.props.match.params.id;
        Http.DELETE("removeProductDocument", {}, `${productId}/${deletedDoc.id}`)
            .then(({ data }) => {
                if (data) {
                    toastSuccess(data.message);
                    this.getDesignDocuments(productId);
                }
            })
            .catch(({ response }) => {
                console.log("uploadDocument ERROR: ", response);
            });
    };

    setVisibleDocType = (docType) => {
        this.setState({
            visibleDocType: docType,
        });
    };

    updateDetails = (sectionName) => {
        let productId = this.props.match.params.id;
        let { designDetails } = this.state;
        let validated = null;

        if (sectionName === "editTitle") {
            validated = validateShareDesign(designDetails, true, false);
        } else if (sectionName === "editColorAndFabrication") {
            validated = validateShareDesign(designDetails, false, false);
            designDetails.colorEditRequestList = validated.errors.colorEditRequestList
                ? validated.errors.colorEditRequestList
                : designDetails.colorEditRequestList;
        }

        this.setState({
            errors: { ...this.state.errors, ...validated.errors },
            designDetails,
        });

        if (validated.isValid) {
            validated.reqBody.id = productId;
            Http.PUT("updateDesignDetails", validated.reqBody, productId)
                .then(({ data }) => {
                    if (data.success) {
                        this.getDesignDetails(productId);
                        toastSuccess("Updated successfully.");
                        this.toggleFlag(sectionName);
                    }
                })
                .catch(({ response }) => {
                    console.log("uploadDocument ERROR: ", response);
                    toastError("Error occured.");
                });
        } else {
            loadjs(["/js/script.js"]);
        }
    };

    updateNoteAndSize = (sectionName, measurementChart = null) => {
        let productId = this.props.match.params.id;
        let { designDetails } = this.state;
        let body = {};

        if (sectionName === "editNotes") {
            body.note = designDetails.note.toString("html");
        } else if (sectionName === "editMeasurementChart") {
            body.sizeText = JSON.stringify(measurementChart);
        }

        Http.PUT("updateSizeTable", body, productId)
            .then(({ data }) => {
                console.log("uploadDocument POST SUCCESS: ", data);
                if (data.success) {
                    toastSuccess("Updated successfully.");
                    if (sectionName === "editMeasurementChart" && designDetails.sizeTable) {
                        designDetails.sizeText = JSON.stringify(measurementChart);
                        this.setState({
                            designDetails,
                        });
                    } else {
                        this.toggleFlag(sectionName);
                    }
                }
            })
            .catch(({ response }) => {
                console.log("uploadDocument ERROR: ", response);
                toastError("Error occured.");
            });
    };

    render() {
        let {
            designDetails,
            designDocuments,
            designCategoryList,
            productTypeList,
            fabricTypeList,
            editTitle,
            editColorAndFabrication,
            editNotes,
            showProgressModal,
            visibleDocType,
            errors,
        } = this.state;
        let productId = this.props.match.params.id;
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
                <div className="desgin-name-header d-flex justify-content-between align-items-center flex-column flex-sm-row">
                    <Title
                        data={designDetails}
                        errors={errors}
                        flag={editTitle}
                        flagName="editTitle"
                        toggleFlag={this.toggleFlag}
                        onChange={this.onChange}
                        onSubmit={this.updateDetails}
                    />

                    <div className="flex-grow-1 text-right add-another-product">
                        <span
                            className="font-18 text-underline cursor-pointer brand-color"
                            onClick={() => this.props.history.push("/designs/add")}
                        >
                            +Add another product
                        </span>
                    </div>
                </div>

                <section className="product-img-and-info">
                    <div className="product-images d-flex justify-content-between">
                        {designDocuments?.featureImageDocResponse ? (
                            <div className="item">
                                <div className="type-of-img-name d-flex justify-content-between align-items-center">
                                    <span className="font-20">Feature image</span>
                                </div>
                                <div className="p-img">
                                    <img
                                        src={designDocuments.featureImageDocResponse.docUrl}
                                        alt=""
                                    />
                                    <input
                                        type="file"
                                        style={{ display: "none" }}
                                        ref={(input) => (this.inputElement = input)}
                                        name="PRODUCT_DESIGN"
                                        onChange={(e) =>
                                            this.onFileSelect(
                                                e,
                                                e.target.name,
                                                "FEATURE_IMAGE",
                                                designDocuments.featureImageDocResponse
                                            )
                                        }
                                    />
                                    <div className="dlt" onClick={() => this.inputElement.click()}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="32"
                                            height="32"
                                            viewBox="0 0 32 32"
                                        >
                                            <g
                                                id="Group_11134"
                                                data-name="Group 11134"
                                                transform="translate(-389 -180)"
                                            >
                                                <path
                                                    id="Path_27873"
                                                    data-name="Path 27873"
                                                    d="M17.528,82.973H12.715V78.109h1.591a.5.5,0,0,0,.4-.788L11.615,73.04a.493.493,0,0,0-.8,0L7.719,77.321a.5.5,0,0,0,.4.788H9.713v4.863H4.323A4.821,4.821,0,0,1,0,78.151a4.566,4.566,0,0,1,2.264-3.942,3.061,3.061,0,0,1-.188-1.068,3.1,3.1,0,0,1,3.108-3.108,3.055,3.055,0,0,1,1.063.188,6.222,6.222,0,0,1,11.822,2.054,5.412,5.412,0,0,1-.541,10.7Z"
                                                    transform="translate(394 121.35)"
                                                    fill="#472f91"
                                                />
                                                <rect
                                                    id="Rectangle_6032"
                                                    data-name="Rectangle 6032"
                                                    width="32"
                                                    height="32"
                                                    rx="4"
                                                    transform="translate(421 180) rotate(90)"
                                                    fill="rgba(190,205,239,0.25)"
                                                    opacity="0.623"
                                                />
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="item">
                                <div className="type-of-img-name">
                                    <span className="font-20">Feature image</span>
                                </div>
                                <div className="uploader">
                                    <label for="drag-upload" className="drag-upload">
                                        &nbsp;
                                    </label>
                                    <input
                                        type="file"
                                        className="file-upload"
                                        id="drag-upload"
                                        name="PRODUCT_DESIGN"
                                        onChange={(e) =>
                                            this.onFileSelect(e, e.target.name, "FEATURE_IMAGE")
                                        }
                                    />
                                    {/*<div className="center-center">
                                  <div id="loading-spinner"></div>
                              </div>*/}
                                </div>
                            </div>
                        )}

                        <ColorAndFabrication
                            data={designDetails}
                            setPickerRef={this.setPickerRef}
                            errors={errors}
                            designCategoryList={designCategoryList}
                            productTypeList={productTypeList}
                            fabricTypeList={fabricTypeList}
                            flag={editColorAndFabrication}
                            flagName="editColorAndFabrication"
                            toggleFlag={this.toggleFlag}
                            addColor={this.addColor}
                            removeColor={this.removeColor}
                            onChange={this.onChange}
                            onSubmit={this.updateDetails}
                            classes="product-type item d-block d-xl-none"
                        />

                        <DocumentHandler
                            data={
                                designDocuments.physicalSampleResponse
                                    ? designDocuments.physicalSampleResponse.otherDocumentList
                                    : []
                            }
                            title="Physical sample"
                            name="REFERENCE_IMAGE"
                            classes="upload-a-file"
                            visibleDocType={visibleDocType}
                            setVisibleDocType={() =>
                                this.setVisibleDocType("physicalSampleResponse")
                            }
                            onFileSelect={(e) =>
                                this.onFileSelect(e, e.target.name, "PHYSICAL_SAMPLE")
                            }
                            onFileRemove={this.onFileRemove}
                        />

                        <DocumentHandler
                            data={
                                designDocuments.flatSketchResponse
                                    ? designDocuments.flatSketchResponse.otherDocumentList
                                    : []
                            }
                            title="Flat sketches"
                            name="REFERENCE_IMAGE"
                            classes="upload-a-file"
                            visibleDocType={visibleDocType}
                            setVisibleDocType={() => this.setVisibleDocType("flatSketchResponse")}
                            onFileSelect={(e) => this.onFileSelect(e, e.target.name, "FLAT_SKETCH")}
                            onFileRemove={this.onFileRemove}
                        />

                        <DocumentHandler
                            data={
                                designDocuments.referenceImageResponse
                                    ? designDocuments.referenceImageResponse.otherDocumentList
                                    : []
                            }
                            title="Reference images"
                            name="REFERENCE_IMAGE"
                            classes="upload-a-file"
                            visibleDocType={visibleDocType}
                            setVisibleDocType={() =>
                                this.setVisibleDocType("referenceImageResponse")
                            }
                            onFileSelect={(e) =>
                                this.onFileSelect(e, e.target.name, "REFERENCE_IMAGE")
                            }
                            onFileRemove={this.onFileRemove}
                        />

                        <DocumentHandler
                            data={
                                designDocuments.artWorksResponse
                                    ? designDocuments.artWorksResponse.otherDocumentList
                                    : []
                            }
                            title="Art works"
                            name="REFERENCE_IMAGE"
                            classes="upload-a-file"
                            visibleDocType={visibleDocType}
                            setVisibleDocType={() => this.setVisibleDocType("artWorksResponse")}
                            onFileSelect={(e) => this.onFileSelect(e, e.target.name, "ART_WORK")}
                            onFileRemove={this.onFileRemove}
                        />
                    </div>

                    <div className="product-info flex-wrap d-flex justify-content-between align-items-start flex-column flex-xl-row">
                        <ColorAndFabrication
                            data={designDetails}
                            setPickerRef={this.setPickerRef}
                            errors={errors}
                            designCategoryList={designCategoryList}
                            productTypeList={productTypeList}
                            fabricTypeList={fabricTypeList}
                            flag={editColorAndFabrication}
                            flagName="editColorAndFabrication"
                            toggleFlag={this.toggleFlag}
                            addColor={this.addColor}
                            removeColor={this.removeColor}
                            onChange={this.onChange}
                            onSubmit={this.updateDetails}
                            classes="product-type item d-none d-xl-block"
                        />

                        <div className="product-notes flex-grow-1">
                            {visibleDocType ? (
                                <div className="more-files">
                                    <div className="type-of-img-name d-flex justify-content-between align-items-center">
                                        <span className="font-20">
                                            {visibleDocType.replace(/_/g, " ")}
                                        </span>
                                        <span
                                            className="close-pop cursor-pointer"
                                            onClick={() => this.setState({ visibleDocType: "" })}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="51.282"
                                                height="51.282"
                                                viewBox="0 0 51.282 51.282"
                                            >
                                                <g
                                                    id="Group_11113"
                                                    data-name="Group 11113"
                                                    transform="translate(-7253.316 1861.454) rotate(45)"
                                                >
                                                    <g
                                                        id="Rectangle_6065"
                                                        data-name="Rectangle 6065"
                                                        transform="translate(3867.015 -6463.247) rotate(90)"
                                                        fill="#f2f2f2"
                                                        stroke="#21242b"
                                                        stroke-width="1"
                                                    >
                                                        <rect
                                                            width="36.262"
                                                            height="36.262"
                                                            rx="18"
                                                            stroke="none"
                                                        />
                                                        <rect
                                                            x="0.5"
                                                            y="0.5"
                                                            width="35.262"
                                                            height="35.262"
                                                            rx="17.5"
                                                            fill="none"
                                                        />
                                                    </g>
                                                    <path
                                                        id="close_3_"
                                                        data-name="close (3)"
                                                        d="M5.747,4.934,10.512.168a.575.575,0,0,1,.813.813L6.559,5.747l4.766,4.766a.575.575,0,0,1-.813.813L5.747,6.559.981,11.325a.575.575,0,0,1-.813-.813L4.934,5.747.168.981A.575.575,0,0,1,.981.168Z"
                                                        transform="translate(3848.689 -6453.438) rotate(45)"
                                                        fill="#21242b"
                                                        stroke="#21242b"
                                                        stroke-width="0.25"
                                                    />
                                                </g>
                                            </svg>
                                        </span>
                                    </div>
                                    <div className="product-images">
                                        {designDocuments[visibleDocType]?.otherDocumentList &&
                                            designDocuments[visibleDocType]?.otherDocumentList.map(
                                                (doc, i) => {
                                                    return (
                                                        <ImageItem
                                                            key={i}
                                                            doc={doc}
                                                            remove={this.onFileRemove}
                                                        />
                                                    );
                                                }
                                            )}
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                            <Notes
                                data={designDetails}
                                flag={editNotes}
                                flagName="editNotes"
                                toggleFlag={this.toggleFlag}
                                onChange={this.onChange}
                                onSubmit={this.updateNoteAndSize}
                            />

                            {/* <MeasurementChart
                                data={designDetails}
                                onChange={this.onChange}
                                onSubmit={this.updateNoteAndSize}
                            /> */}

                            <MeasurmentChartV2 productId={productId} />
                        </div>
                    </div>
                </section>
            </LoadingOverlay>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditShareDesign);
