import React, {Component} from "react";
import EditColorDropdown from "../EditColorDropdown";
import {renderMultiColor} from "../../../../services/Util";

export const ColorAndFabrication = ({
                                        data,
                                        setPickerRef,
                                        errors,
                                        designCategoryList,
                                        productTypeList,
                                        fabricTypeList,
                                        flag,
                                        flagName,
                                        toggleFlag,
                                        addColor,
                                        removeColor,
                                        onChange,
                                        onSubmit,
                                        classes,
                                    }) => {
    return (
        <div className={classes}>
            <div className="edit-section" style={{display: flag ? "block" : "none"}}>
                <span className="p-edit cursor-pointer" onClick={() => onSubmit(flagName)}>
                    <span className="d-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16.576"
                            height="15.841"
                            viewBox="0 0 16.576 15.841"
                        >
                            <g
                                id="Icon_feather-edit-3"
                                data-name="Icon feather-edit-3"
                                transform="translate(0.75 0.75)"
                            >
                                <path
                                    id="Path_29430"
                                    data-name="Path 29430"
                                    d="M18,30h7.538"
                                    transform="translate(-10.462 -15.659)"
                                    fill="none"
                                    stroke="#21242b"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1.5"
                                ></path>
                                <path
                                    id="Path_29431"
                                    data-name="Path 29431"
                                    d="M15.808,4.838A1.777,1.777,0,1,1,18.32,7.351L7.85,17.821l-3.35.838.838-3.35Z"
                                    transform="translate(-4.5 -4.318)"
                                    fill="none"
                                    stroke="#21242b"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1.5"
                                ></path>
                            </g>
                        </svg>
                    </span>
                    <div className="done">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="19.452"
                            height="14.162"
                            viewBox="0 0 19.452 14.162"
                        >
                            <path
                                id="Path_27878"
                                data-name="Path 27878"
                                d="M2444.531-5030.171l4.091,4.335,12.533-11.748"
                                transform="translate(-2443.117 5038.998)"
                                fill="none"
                                stroke="#21242b"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                            />
                        </svg>
                    </div>
                </span>
                <div className="container-fluid px-0 mt-4">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Design category*</label>
                                <select
                                    className={`w-100 bg-gray-light ${
                                        errors.productCategoryIdError ? `error2` : ``
                                    }`}
                                    name="productCategoryId"
                                    value={data.categoryResponse?.id}
                                    onClick={(e) => onChange(e.target.name, e.target.value)}
                                >
                                    <option value="">Select design category</option>
                                    {designCategoryList.map((item, i) => {
                                        return (
                                            <option key={i} value={item.id}>
                                                {item.name}
                                            </option>
                                        );
                                    })}
                                </select>
                                {errors.productCategoryIdError ? (
                                    <label className="error">{errors.productCategoryIdError}</label>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Market*</label>
                                <select
                                    className={`w-100 bg-gray-light ${
                                        errors.productGroupIdError ? `error2` : ``
                                    }`}
                                    name="productGroupId"
                                    value={data.marketResponse?.id}
                                    onClick={(e) => onChange(e.target.name, e.target.value)}
                                >
                                    <option value="">Select market</option>
                                    {productTypeList.map((item, i) => (
                                        <option value={item.id} key={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.productGroupIdError ? (
                                    <label className="error">{errors.productGroupIdError}</label>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Fabric type*</label>
                                <select
                                    className={`w-100 bg-gray-light ${
                                        errors.fabricTypeError ? `error2` : ``
                                    }`}
                                    name="fabricType"
                                    value={data.fabricType}
                                    onClick={(e) => onChange(e.target.name, e.target.value)}
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
                                {/*<input type="text" className={errors.fabricTypeError ? 'error2' : ''} placeholder="Enter fabric type" name="fabricType" value={data.fabricType} onChange={(e) => onChange(e.target.name, e.target.value)}/>*/}
                                {errors.fabricTypeError && (
                                    <label className="error">{errors.fabricTypeError}</label>
                                )}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Fabric details</label>
                                <input
                                    type="text"
                                    className={`${
                                        errors.fabricDetailsError ? `error2` : ``
                                    } bg-gray-light`}
                                    placeholder="Enter fabric details"
                                    name="fabricCompositionDetails"
                                    value={data.fabricCompositionDetails}
                                    onChange={(e) => onChange(e.target.name, e.target.value)}
                                />
                                {errors.fabricDetailsError ? (
                                    <label className="error">{errors.fabricDetailsError}</label>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <EditColorDropdown
                                    colorData={data.colorResponseList}
                                    addColor={addColor}
                                    removeColor={removeColor}
                                />
                                {errors.colorListError && (
                                    <label className="error">{errors.colorListError}</label>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="view-section" style={{display: !flag ? "block" : "none"}}>
                <span className="p-edit cursor-pointer" onClick={() => toggleFlag(flagName)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16.576"
                        height="15.841"
                        viewBox="0 0 16.576 15.841"
                    >
                        <g
                            id="Icon_feather-edit-3"
                            data-name="Icon feather-edit-3"
                            transform="translate(0.75 0.75)"
                        >
                            <path
                                id="Path_29430"
                                data-name="Path 29430"
                                d="M18,30h7.538"
                                transform="translate(-10.462 -15.659)"
                                fill="none"
                                stroke="#21242b"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                            ></path>
                            <path
                                id="Path_29431"
                                data-name="Path 29431"
                                d="M15.808,4.838A1.777,1.777,0,1,1,18.32,7.351L7.85,17.821l-3.35.838.838-3.35Z"
                                transform="translate(-4.5 -4.318)"
                                fill="none"
                                stroke="#21242b"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                            ></path>
                        </g>
                    </svg>
                </span>
                <div className="container-fluid px-0 mt-4">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Design category*</label>
                                <span>{data.categoryResponse?.name}</span>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Market*</label>
                                <span>{data.marketResponse?.name}</span>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Fabric type</label>
                                <span>{data.fabricType}</span>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Fabric details</label>
                                <span>{data.fabricCompositionDetails}</span>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Color</label>
                                {data.colorResponseList &&
                                    data.colorResponseList.map((colorObj, i) => {
                                        return (
                                            <div className="mb-2">
                                                <span>
                                                    {renderMultiColor(colorObj)}
                                                    {colorObj.hexCode} - {colorObj.name}
                                                </span>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
