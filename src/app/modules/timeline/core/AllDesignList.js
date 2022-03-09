import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {capitalizeFirstLetter} from "../../../services/Util";
import {clearDesignSelection, selectAllDesign, toggleDesignSelection} from "../../store/action/Timeline";

const AllDesignList = () => {
    const timelineStore = useSelector(store => store.timelineStore)
    const dispatch = useDispatch()

    const isCheckboxChecked = (id) => {
        let design
        if (timelineStore.selectedDesignList.length > 0) {
            console.log("========", timelineStore.selectedDesignList)
            design = timelineStore.selectedDesignList.find(item => item === id);
        }
        return design !== undefined
    }

    const toggleCheckbox = (value) => {
        dispatch(toggleDesignSelection(value))
    }


    const renderDesignList = () => {
        return timelineStore?.orderInfo?.orderProductList?.map((design, index) => {
            return (
                <div className="single-design-row" key={`design_number_${index}`}>
                    <div className="design-details">
                        <div className="custom-chekbox">
                            <div className="form-group">
                                <input
                                    type="checkbox"
                                    id={`design_number_${index}`}
                                    value={design.id}
                                    checked={isCheckboxChecked(design.id)}
                                    onChange={() => toggleCheckbox(design.id)}
                                />
                                <label htmlFor={`design_number_${index}`}/>
                            </div>
                        </div>
                        <div className="design-info">
                            <img src={design.image} alt="design"/>
                            <span>{design.referenceNumber}</span>
                        </div>
                    </div>
                    <div className="design-status">
                        <span>{capitalizeFirstLetter(design.currentStage)}</span>
                        <div className="progress">
                            <div className="progress-bar bg-success" role="progressbar"
                                 style={{width: design.percentageOfCompleteness + "%"}}
                                 aria-valuenow={design.percentageOfCompleteness} aria-valuemin={0} aria-valuemax={100}/>
                        </div>
                    </div>
                </div>
            )
        })
    }

    const clearSelection = (e) => {
        if (e.target.checked === false) {
            dispatch(clearDesignSelection())
        } else {
            let designs = []
            let productList = timelineStore?.orderInfo?.orderProductList
            productList.forEach((design) => {
                designs.push(design.id)
            })
            dispatch(selectAllDesign(designs))
        }
    }

    return (
        <div className="all-designs-with-status common-blocks">
            <div className="select-all-designs">
                <div className="custom-chekbox">
                    <div className="form-group">
                        <input
                            type="checkbox"
                            id="all"
                            name
                            checked={timelineStore?.orderInfo?.orderProductList?.length === timelineStore?.selectedDesignList?.length}
                            onChange={clearSelection}
                        />
                        <label
                            htmlFor="all"><span>ALL DESIGN ({timelineStore?.selectedDesignList?.length})</span></label>
                    </div>
                </div>
            </div>
            <div className="design-lists scroll-y-label">
                {renderDesignList()}
            </div>
        </div>
    )
}

export default AllDesignList