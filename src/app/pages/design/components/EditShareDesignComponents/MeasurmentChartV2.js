import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchPomAndSize,
    fetchProductMeasurement,
    fetchAllTemplate,
} from "../../../../redux/design/action";
import { addImageSuffix, validateFloatNumber } from "../../../../services/Util";
import { getPomAndSize, getProductMeasurement, getAllTemplate } from "../../../../redux/reducers";
import { toastSuccess, toastError } from "../../../../commonComponents/Toast";
import CustomDropdown from "../../../../commonComponents/CustomDropdown";
import useClickOutside from "../../../../hooks/useClickOutside";
// import ImageUpload from "../../../commonComponents/ImageUpload";
import Http from "../../../../services/Http";
// import AddPom from "./AddPom";

const MeasurmentChartV2 = ({ productId, documentGroup }) => {
    const [pomAndSize, setPomAndSize] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [unitType, setUnitType] = useState("CM");
    const [productMeasurement, setProductMeasurement] = useState(null);
    const [cellId, setCellId] = useState("");
    const [tollId, setTollId] = useState("");
    const [sizeId, setSizeId] = useState("");
    const [sizeColIndex, setSizeColIndex] = useState("");
    const [actionClick, setActionClick] = useState(false);
    const [grading, setGrading] = useState("");
    const [baseSize, setBaseSize] = useState("");
    const [showPomModal, setShowPomModal] = useState(false);
    const [templateNamePopUp, setTemplateNamePopUp] = useState(false);
    const [templateName, setTemplateName] = useState("");
    const [allTemplateList, setAllTemplateList] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState("Load from template");
    // const [measurementImage, setMeasurementImage] = useState(null);
    const [pomSearch, setPomSearch] = useState("");
    const [sizeSearch, setSizeSearch] = useState("");
    const [isCollapse, setIsCollapse] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const pomAndSizeList = useSelector(getPomAndSize);
    const productMeasurementList = useSelector(getProductMeasurement);
    const templateList = useSelector(getAllTemplate);
    const renderErrorInfo = () => {
        setErrors({
            templateNameError: "",
        });
    };

    const clickRef = useRef();
    const sizeClickRef = useRef();
    const saveRef = useRef();

    console.log("ppppp iDDDDDDDDDD", productId);

    useClickOutside(saveRef, () => {
        setTemplateNamePopUp(!templateNamePopUp);
        setErrors({ templateNameError: "" });
    });

    useEffect(() => {
        dispatch(fetchPomAndSize()).finally(() => {
            setIsLoading(false);
        });
        dispatch(fetchProductMeasurement(productId, unitType)).finally(() => {
            setIsLoading(false);
        });
        dispatch(fetchAllTemplate()).finally(() => {
            setIsLoading(false);
        });
    }, [dispatch, productId, unitType]);

    useEffect(() => {
        setPomAndSize(pomAndSizeList);
        setProductMeasurement(productMeasurementList);
        setAllTemplateList(
            templateList.map((item, index) => {
                return {
                    value: item,
                    label: item,
                    id: index,
                };
            })
        );
        // setMeasurementImage(data);
    }, [pomAndSizeList, productMeasurementList, templateList]);

    const onAddPom = async (productId, pomId) => {
        setIsLoading(true);
        await Http.POST("addPomToProduct", {
            measurementUnit: unitType,
            pointOfMeasurementId: pomId,
            productId: productId,
        })
            .then(({ data }) => {
                setIsLoading(false);
                if (data) {
                    // dispatch(fetchProductSteps(productId));
                    dispatch(fetchProductMeasurement(productId, unitType));
                }
            })
            .catch(({ response }) => {
                setIsLoading(false);
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Request was unsuccessful.");
                }
            });
    };

    const onRemovePom = async (productId, pomId) => {
        setIsLoading(true);
        await Http.POST("removePomFromProduct", {
            measurementUnit: unitType,
            pointOfMeasurementId: pomId,
            productId: productId,
        })
            .then(({ data }) => {
                setIsLoading(false);
                if (data) {
                    // dispatch(fetchProductSteps(productId));
                    dispatch(fetchProductMeasurement(productId, unitType));
                }
            })
            .catch(({ response }) => {
                setIsLoading(false);
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Request was unsuccessful.");
                }
            });
    };

    const onPomClick = (item) => {
        let newPom = { ...productMeasurement };
        if (newPom?.data.some((data) => data?.pomResponse?.id === item?.id)) {
            newPom = newPom.data.filter((data) => data.pomResponse.id !== item.id);
            onRemovePom(productId, item.id);
        } else {
            newPom.data.push(item);
            onAddPom(productId, item.id);
        }
    };

    const onAddSize = async (productId, sizeCode) => {
        setIsLoading(true);
        await Http.POST("addSizeToProduct", {
            measurementUnit: unitType,
            productId: productId,
            size: sizeCode,
        })
            .then(({ data }) => {
                setIsLoading(false);
                if (data) {
                    // dispatch(fetchProductSteps(productId));
                    dispatch(fetchProductMeasurement(productId, unitType));
                }
            })
            .catch(({ response }) => {
                setIsLoading(false);
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Request was unsuccessful.");
                }
            });
    };

    const onRemoveSize = async (productId, sizeCode) => {
        setIsLoading(true);
        await Http.POST("removeSizeFromProduct", {
            measurementUnit: unitType,
            productId: productId,
            size: sizeCode,
        })
            .then(({ data }) => {
                setIsLoading(false);
                if (data) {
                    // dispatch(fetchProductSteps(productId));
                    dispatch(fetchProductMeasurement(productId, unitType));
                }
            })
            .catch(({ response }) => {
                setIsLoading(false);
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Request was unsuccessful.");
                }
            });
    };

    const onSizeClick = (item) => {
        let newPom = { ...productMeasurement };
        if (newPom.sizeList.some((data) => data.code === item.code)) {
            newPom = newPom.sizeList.filter((data) => data.code !== item.code);
            onRemoveSize(productId, item.code);
        } else {
            newPom.sizeList.push(item);
            onAddSize(productId, item.code);
        }
    };

    const onToleranceClick = async (productId, type) => {
        setIsLoading(true);
        let body = {};
        if (type === "tol") {
            body = {
                measurementUnit: unitType,
                pointOfMeasurementId: productMeasurement.data[tollId].pomResponse.id,
                productId,
                tolerance: productMeasurement.data[tollId].tolerance,
            };
        } else {
            body = {
                measurementUnit: unitType,
                pointOfMeasurementId: productMeasurement.data[sizeId].pomResponse.id,
                productId,
                value: productMeasurement.data[sizeId].sizeValueList[sizeColIndex],
                size: productMeasurement.sizeList[sizeColIndex].code,
            };
        }

        await Http.POST("updateCellValue", body)
            .then(({ data }) => {
                setIsLoading(false);
                if (data) {
                    dispatch(fetchProductMeasurement(productId, unitType)).finally(() => {
                        setIsLoading(false);
                    });
                }
            })
            .catch(({ response }) => {
                setIsLoading(false);
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Request was unsuccessful.");
                }
            });
    };

    const onOutSideClick = () => {
        const type = "tol";
        onToleranceClick(productId, type);
        setCellId("");
        setTollId("");
    };
    useClickOutside(clickRef, onOutSideClick);

    const onOutSideSizeClick = () => {
        const type = "size";
        onToleranceClick(productId, type);
        setCellId("");
        setSizeId("");
        setSizeColIndex("");
    };
    useClickOutside(sizeClickRef, onOutSideSizeClick);

    const onTolChange = (e, index) => {
        let newPom = { ...productMeasurement };
        newPom.data[index].tolerance = e.target.value;
        setProductMeasurement(newPom);
    };

    const onSizeChange = (e, rowIndex, colIndex) => {
        let newPom = { ...productMeasurement };
        newPom.data[rowIndex].sizeValueList[colIndex] = e.target.value;
        setProductMeasurement(newPom);
    };

    const onAddGrading = async (productId, id) => {
        setIsLoading(true);
        setCellId("");
        setActionClick(false);
        let body = {
            baseSize: baseSize,
            gradingValue: grading,
            measurementUnit: unitType,
            pointOfMeasurementId: id,
            productId,
        };
        await Http.POST("addGrading", body)
            .then(({ data }) => {
                setIsLoading(false);
                if (data) {
                    dispatch(fetchProductMeasurement(productId, unitType)).finally(() => {
                        setIsLoading(false);
                    });
                }
            })
            .catch(({ response }) => {
                setIsLoading(false);
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Request was unsuccessful.");
                }
            });
    };
    const onAddNew = () => {
        setShowPomModal(true);
    };
    const onCloseModal = () => {
        dispatch(fetchPomAndSize()).finally(() => {
            setIsLoading(false);
        });
        setShowPomModal(false);
    };

    const onSaveTempalte = async (productId) => {
        if (templateName === "") {
            setErrors({ ...errors, templateNameError: "Template name is required" });
            return;
        }
        setIsLoading(true);
        setTemplateNamePopUp(false);
        let body = {
            productId,
            templateName,
        };
        await Http.POST("saveAsTemplate", body)
            .then(({ data }) => {
                setIsLoading(false);
                if (data) {
                    toastSuccess(data.message);
                    dispatch(fetchProductMeasurement(productId, unitType)).finally(() => {
                        setIsLoading(false);
                    });
                    dispatch(fetchAllTemplate()).finally(() => {
                        setIsLoading(false);
                    });
                }
            })
            .catch(({ response }) => {
                setIsLoading(false);
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Request was unsuccessful.");
                }
            });
        renderErrorInfo();
    };

    const onLoadTemplate = async (name) => {
        console.log("BBBBBBBBBBBB", productId);
        setIsLoading(true);
        let body = {
            productId,
            templateName: name,
            measurementUnit: unitType,
        };
        await Http.POST("loadFromTemplate", body)
            .then(({ data }) => {
                setIsLoading(false);
                if (data) {
                    setProductMeasurement(data);
                    console.log("LOADDDDDDDDD", data);
                }
            })
            .catch(({ response }) => {
                setIsLoading(false);
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Request was unsuccessful.");
                }
            });
    };

    const onItemClick = (type, item) => {
        setSelectedTemplate(item.value);
        onLoadTemplate(item.value);
    };

    // const onDeleteMainList = async (docId) => {
    //     await Http.DELETE("removeProductDocument", {}, `${productId}/${docId}`)
    //         .then(({ data }) => {
    //             dispatch(fetchDocResponse(productId)).finally(() => {
    //                 setIsLoading(false);
    //             });
    //             toastSuccess(data.message);
    //         })
    //         .catch(({ response }) => {
    //             console.log("uploadDocument ERROR: ", response);
    //         });
    // };

    // const onUploadImage = async (data) => {
    //     setIsLoading(true);
    //     await Http.POST("uploadDocumentInProduct", data, productId)
    //         .then(({ data }) => {
    //             setIsLoading(false);
    //             if (data) {
    //                 dispatch(fetchDocResponse(productId)).finally(() => {
    //                     setIsLoading(false);
    //                 });
    //                 toastSuccess(data.message);
    //             }
    //         })
    //         .catch(({ response }) => {
    //             setIsLoading(false);
    //             if (response && response.data && response.data.message) {
    //                 toastError(response.data.message);
    //             } else {
    //                 toastError("Request was unsuccessful.");
    //             }
    //         });
    // };

    const allPomList = pomAndSize?.pomResponseList?.filter((item) =>
        item.name.toLowerCase().includes(pomSearch.toLocaleLowerCase())
    );
    const allSizesList = pomAndSize?.sizeResponseList?.filter((item) =>
        item.code.toLowerCase().includes(sizeSearch.toLocaleLowerCase())
    );

    const onItemSearch = (value) => {
        setSearchTerm(value);
    };

    return (
        <div className="materials-section">
            <div className="file-upload-section-container">
                <div className="container-fluid px-0">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="upload-file-title">
                                <h3 className="semibold-16">Measurements</h3>
                                {/* <div className="file-uploader-row">
									<div className="one-fifth-item">
										<p className="regular-16">How to measure </p>
										{measurementImage?.docType ? (
											<div className="uploaded-image">
												<div
													className="delete-btn"
													onClick={() => onDeleteMainList(measurementImage.id)}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width={24}
														height={24}
														viewBox="0 0 24 24"
														fill="none"
													>
														<path
															d="M3 6H5H21"
															stroke="#F82B60"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
														<path
															d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
															stroke="#F82B60"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
														<path
															d="M10 11V17"
															stroke="#F82B60"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
														<path
															d="M14 11V17"
															stroke="#F82B60"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
												</div>
												<div className="full-image">
													<img
														src={
															measurementImage?.base64Str
																? measurementImage.base64Str
																: addImageSuffix(
																		measurementImage?.docUrl,
																		'_xthumbnail'
																  )
														}
														alt="Upload"
													/>
												</div>
											</div>
										) : (
											<ImageUpload
												onUploadImage={onUploadImage}
												docType="HOW_TO_MEASURE_IMAGE"
												productId={productId}
												type={'image'}
											/>
										)}
									</div>
								</div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid px-0">
                <div className="row">
                    <div className="col-md-12">
                        <div className="filter-container-top px-0">
                            <div className="filters">
                                <div
                                    className="filter-toggle no-after pl-0"
                                    onClick={() => setIsCollapse(!isCollapse)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M21.9988 8.0007C21.9988 7.4507 21.5487 7.0007 20.9988 7.0007H13.9987C13.4487 7.0007 12.9987 7.4507 12.9987 8.0007C12.9987 8.5507 13.4487 9.0007 13.9987 9.0007H20.9988C21.5487 9.0007 21.9988 8.5507 21.9988 8.0007ZM12.9987 16.0007C12.9987 16.5507 13.4487 17.0007 13.9987 17.0007H20.9988C21.5487 17.0007 21.9988 16.5507 21.9988 16.0007C21.9988 15.4507 21.5487 15.0007 20.9988 15.0007H13.9987C13.4487 15.0007 12.9987 15.4507 12.9987 16.0007ZM10.4688 4.6307C10.8588 5.0207 10.8588 5.6507 10.4688 6.0407L6.23875 10.2907C5.84875 10.6807 5.21875 10.6807 4.81875 10.2907L2.69875 8.1607C2.30875 7.7707 2.30875 7.1407 2.69875 6.7507C3.08875 6.3607 3.71875 6.3607 4.10875 6.7507L5.52875 8.1707L9.06875 4.6307C9.44875 4.2507 10.0887 4.2507 10.4688 4.6307ZM10.4787 12.6407C10.8687 13.0307 10.8687 13.6607 10.4787 14.0507L6.24875 18.3007C5.85875 18.6907 5.22875 18.6907 4.82875 18.3007L2.69875 16.1607C2.30875 15.7707 2.30875 15.1407 2.69875 14.7507C3.08875 14.3607 3.71875 14.3607 4.10875 14.7507L5.52875 16.1707L9.06875 12.6307C9.44875 12.2507 10.0887 12.2507 10.4787 12.6407Z"
                                            fill="#664AB6"
                                        />
                                    </svg>
                                    <span>Select</span>
                                </div>
                            </div>
                        </div>
                        {/* Filter Data container */}
                        <section className="filter-data-container px-0">
                            {isCollapse === false && (
                                <div className="filter-bar-section materials-filter dp2 custom-scrollbar open mt-4">
                                    <div className="filter-bar-top">
                                        <div className="filter-heading d-flex justify-content-between">
                                            <p>Select POM and Sizes</p>

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                onClick={() => setIsCollapse(!isCollapse)}
                                                className="cursor-pointer"
                                            >
                                                <path
                                                    d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                                                    fill="#6A7181"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="filter-content">
                                        <div id="accordion">
                                            <div className="card">
                                                <div className="card-header" id="headingOne">
                                                    <h5 className="mb-0">
                                                        <button
                                                            className="btn btn-link collapsed"
                                                            data-toggle="collapse"
                                                            data-target="#collapseOne"
                                                            aria-expanded="false"
                                                            aria-controls="collapseOne"
                                                        >
                                                            Points of measurement
                                                        </button>
                                                    </h5>
                                                </div>
                                                <div
                                                    id="collapseOne"
                                                    className="collapse"
                                                    aria-labelledby="headingOne"
                                                >
                                                    <div className="card-body">
                                                        <div className="form-group size36 m-0 search-filter">
                                                            <div className="with-icon right-icon">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Search"
                                                                    onChange={(e) =>
                                                                        setPomSearch(e.target.value)
                                                                    }
                                                                />
                                                                <span className="right-icon">
                                                                    <svg
                                                                        width={17}
                                                                        height={17}
                                                                        viewBox="0 0 17 17"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            clipRule="evenodd"
                                                                            d="M7.5 0C11.6421 0 15 3.35786 15 7.5C15 9.21015 14.4276 10.7866 13.464 12.0483L16.7071 15.2929C17.0976 15.6834 17.0976 16.3166 16.7071 16.7071C16.3466 17.0676 15.7794 17.0953 15.3871 16.7903L15.2929 16.7071L12.0483 13.464C10.7866 14.4276 9.21015 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0ZM7.5 2C4.46243 2 2 4.46243 2 7.5C2 10.5376 4.46243 13 7.5 13C8.85114 13 10.0885 12.5128 11.0459 11.7045C11.091 11.5536 11.1738 11.412 11.2929 11.2929C11.412 11.1738 11.5536 11.091 11.7041 11.0446C12.5128 10.0885 13 8.85114 13 7.5C13 4.46243 10.5376 2 7.5 2Z"
                                                                            fill="#9AA1AF"
                                                                        />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {/* <div className="add-btn">
                                                            <button className="button text">
                                                                <svg
                                                                    width={14}
                                                                    height={14}
                                                                    viewBox="0 0 14 14"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M13 8H8V13C8 13.55 7.55 14 7 14C6.45 14 6 13.55 6 13V8H1C0.45 8 0 7.55 0 7C0 6.45 0.45 6 1 6H6V1C6 0.45 6.45 0 7 0C7.55 0 8 0.45 8 1V6H13C13.55 6 14 6.45 14 7C14 7.55 13.55 8 13 8Z"
                                                                        fill="white"
                                                                    />
                                                                </svg>
                                                                <span
                                                                    className="ml-2"
                                                                    onClick={() => onAddNew()}
                                                                >
                                                                    Add new
                                                                </span>
                                                            </button>
                                                            {showPomModal && (
                                                                <AddPom
                                                                    onCloseModal={onCloseModal}
                                                                />
                                                            )}
                                                        </div> */}
                                                        <div className="custom-chekbox">
                                                            {allPomList?.map((item) => (
                                                                <div
                                                                    className="form-group"
                                                                    key={item.id}
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        id="person1"
                                                                        name="Company"
                                                                        checked={productMeasurement?.data
                                                                            ?.map(
                                                                                (data) =>
                                                                                    data
                                                                                        ?.pomResponse
                                                                                        ?.id
                                                                            )
                                                                            .includes(item.id)}
                                                                    />
                                                                    <label
                                                                        htmlFor="person1"
                                                                        onClick={() =>
                                                                            onPomClick(item)
                                                                        }
                                                                    >
                                                                        <span>{item.name}</span>
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-header" id="headingThree">
                                                    <h5 className="mb-0">
                                                        <button
                                                            className="btn btn-link collapsed"
                                                            data-toggle="collapse"
                                                            data-target="#collapseFour"
                                                            aria-expanded="false"
                                                            aria-controls="headingFour"
                                                        >
                                                            Sizes
                                                        </button>
                                                    </h5>
                                                </div>
                                                <div
                                                    id="collapseFour"
                                                    className="collapse"
                                                    aria-labelledby="headingFour"
                                                >
                                                    <div className="card-body">
                                                        <div className="form-group size36 m-0 pb-2 search-filter">
                                                            <div className="with-icon right-icon">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Search"
                                                                    onChange={(e) =>
                                                                        setSizeSearch(
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                />
                                                                <span className="right-icon">
                                                                    <svg
                                                                        width={17}
                                                                        height={17}
                                                                        viewBox="0 0 17 17"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            clipRule="evenodd"
                                                                            d="M7.5 0C11.6421 0 15 3.35786 15 7.5C15 9.21015 14.4276 10.7866 13.464 12.0483L16.7071 15.2929C17.0976 15.6834 17.0976 16.3166 16.7071 16.7071C16.3466 17.0676 15.7794 17.0953 15.3871 16.7903L15.2929 16.7071L12.0483 13.464C10.7866 14.4276 9.21015 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0ZM7.5 2C4.46243 2 2 4.46243 2 7.5C2 10.5376 4.46243 13 7.5 13C8.85114 13 10.0885 12.5128 11.0459 11.7045C11.091 11.5536 11.1738 11.412 11.2929 11.2929C11.412 11.1738 11.5536 11.091 11.7041 11.0446C12.5128 10.0885 13 8.85114 13 7.5C13 4.46243 10.5376 2 7.5 2Z"
                                                                            fill="#9AA1AF"
                                                                        />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="custom-chekbox mt-3">
                                                            {allSizesList?.map((item, index) => (
                                                                <div
                                                                    className="form-group"
                                                                    key={index}
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        id="size"
                                                                        name="Company"
                                                                        checked={productMeasurement?.sizeList
                                                                            ?.map(
                                                                                (data) => data?.code
                                                                            )
                                                                            .includes(item.code)}
                                                                    />
                                                                    <label
                                                                        htmlFor="size"
                                                                        onClick={() =>
                                                                            onSizeClick(item)
                                                                        }
                                                                    >
                                                                        <span>{item.value}</span>
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="data-table mt-4">
                                <div className="measurement-filter mb-3 d-flex justify-content-start align-items-center">
                                    <p className="mb-0">Measurement in:</p>
                                    <select
                                        name="team-members"
                                        id="team-member"
                                        onChange={(e) => setUnitType(e.target.value)}
                                    >
                                        <option value="CM">CM</option>
                                        <option value="INCH">INCH</option>
                                    </select>
                                    {/* <select
										name="running-order"
										id="running-order"
										onChange={(e) => onSelectTemplate(e)}
									>
										<option value>Load from template </option>
										{allTemplateList?.map((item) => (
											<option value={item} key={item}>
												{item}
											</option>
										))}
									</select> */}
                                    <div style={{ width: 300 }}>
                                        <CustomDropdown
                                            type="addItem"
                                            isAddNew={false}
                                            onItemClick={onItemClick}
                                            items={allTemplateList}
                                            onItemSearch={onItemSearch}
                                            selectedItem={selectedTemplate}
                                        />
                                    </div>
                                </div>
                                <div className="measurement-info-table">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>SL</th>
                                                <th>Points</th>
                                                <th>TOL(+/-)</th>
                                                {productMeasurement?.sizeList?.map(
                                                    (item, index) => (
                                                        <th key={index}>{item.value}</th>
                                                    )
                                                )}
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productMeasurement?.data?.map((item, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <span
                                                            className="d-inline-block align-middle"
                                                            // onClick={() => onToleranceClick(productId, item)}
                                                        >
                                                            {item.pomResponse?.name}
                                                        </span>
                                                    </td>
                                                    <td
                                                        onDoubleClick={() => {
                                                            setCellId(`${index}-tolerance`);
                                                            setTollId(index);
                                                        }}
                                                    >
                                                        {cellId === `${index}-tolerance` ? (
                                                            <input
                                                                ref={clickRef}
                                                                style={{ display: "block" }}
                                                                type="text"
                                                                value={item?.tolerance}
                                                                onChange={(e) =>
                                                                    onTolChange(e, index)
                                                                }
                                                                onKeyDown={(event) => {
                                                                    if (
                                                                        event.key === "Enter" ||
                                                                        event.key === "Escape"
                                                                    ) {
                                                                        setCellId("");
                                                                        setTollId("");
                                                                        onOutSideClick();
                                                                        event.preventDefault();
                                                                        event.stopPropagation();
                                                                    }
                                                                }}
                                                            ></input>
                                                        ) : (
                                                            <p>{item?.tolerance}</p>
                                                        )}
                                                    </td>

                                                    {item?.sizeValueList?.map((item2, colIndex) => (
                                                        <td
                                                            onDoubleClick={() => {
                                                                setCellId(
                                                                    `${index}-${colIndex}-size`
                                                                );
                                                                setSizeId(index);
                                                                setSizeColIndex(colIndex);
                                                            }}
                                                            key={colIndex}
                                                        >
                                                            {cellId ===
                                                            `${index}-${colIndex}-size` ? (
                                                                <input
                                                                    ref={sizeClickRef}
                                                                    style={{ display: "block" }}
                                                                    type="text"
                                                                    value={item2}
                                                                    onChange={(e) =>
                                                                        onSizeChange(
                                                                            e,
                                                                            index,
                                                                            colIndex
                                                                        )
                                                                    }
                                                                    onKeyDown={(event) => {
                                                                        if (
                                                                            event.key === "Enter" ||
                                                                            event.key === "Escape"
                                                                        ) {
                                                                            setCellId("");
                                                                            setSizeId("");
                                                                            setSizeColIndex("");
                                                                            onOutSideSizeClick();
                                                                            event.preventDefault();
                                                                            event.stopPropagation();
                                                                        }
                                                                    }}
                                                                ></input>
                                                            ) : (
                                                                <p>{item2}</p>
                                                            )}
                                                        </td>
                                                    ))}

                                                    <td>
                                                        <button
                                                            className="button text"
                                                            onClick={() => {
                                                                setActionClick(!actionClick);
                                                                setCellId(`${index}`);
                                                            }}
                                                        >
                                                            <img src="/icons/calculator.svg" alt />
                                                        </button>
                                                        {actionClick === true &&
                                                        parseInt(cellId) === index ? (
                                                            <div className="action-popup shadow-8dp bg-white d-flex align-items-end justify-content-between">
                                                                <div className="base-size">
                                                                    <span className="regular-14">
                                                                        Base size
                                                                    </span>
                                                                    <select
                                                                        name="base-size"
                                                                        id="base-size"
                                                                        onChange={(e) =>
                                                                            setBaseSize(
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                    >
                                                                        <option>Select </option>
                                                                        {productMeasurement?.sizeList.map(
                                                                            (item) => (
                                                                                <option
                                                                                    value={
                                                                                        item.code
                                                                                    }
                                                                                    key={item.code}
                                                                                >
                                                                                    {item.value}
                                                                                </option>
                                                                            )
                                                                        )}
                                                                    </select>
                                                                </div>
                                                                <div className="grading-value ml-2">
                                                                    <span className="regular-14">
                                                                        Grading value
                                                                        <span>
                                                                            <input
                                                                                type="text"
                                                                                value={grading}
                                                                                onChange={(e) =>
                                                                                    setGrading(
                                                                                        e.target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                                onKeyPress={
                                                                                    validateFloatNumber
                                                                                }
                                                                            />
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                                <div className="add ml-2">
                                                                    <button
                                                                        className="button size36"
                                                                        onClick={() => {
                                                                            onAddGrading(
                                                                                productId,
                                                                                item.pomResponse?.id
                                                                            );
                                                                            setGrading("");
                                                                        }}
                                                                    >
                                                                        Add
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {productMeasurement?.data?.length === 0 && (
                                        <p className="no-items regular-14">
                                            Size chart not available
                                        </p>
                                    )}
                                    <div className="save-template-btn text-right mt-4">
                                        <button
                                            className="button outline"
                                            onClick={() => setTemplateNamePopUp(true)}
                                        >
                                            Save as template
                                        </button>
                                        {templateNamePopUp && (
                                            <div
                                                className="template-popup shadow-8dp bg-white d-flex align-items-end justify-content-between"
                                                ref={saveRef}
                                            >
                                                <div className="grading-value">
                                                    <p className="regular-14 mb-2">Template name</p>
                                                    <input
                                                        type="text"
                                                        onChange={(e) =>
                                                            setTemplateName(e.target.value)
                                                        }
                                                    />
                                                    {errors.templateNameError && (
                                                        <p className="error">
                                                            {errors.templateNameError}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="add">
                                                    <button
                                                        className="button size36"
                                                        onClick={() => onSaveTempalte(productId)}
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeasurmentChartV2;
