import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {capitalizeFirstLetter, getShortName} from "../../../services/Util";
import {clearDesignSelection, selectAllDesign, toggleDesignSelection} from "../../store/action/Timeline";
import {useParams} from "react-router-dom";
import {Tooltip} from "@material-ui/core";

const AllDesignList = ({setLoader}) => {
    const timelineStore = useSelector(store => store.timelineStore)
    const dispatch = useDispatch()
    const params = useParams();

    const isCheckboxChecked = (id) => {
        let design
        if (timelineStore.selectedDesignList.length > 0) {
            design = timelineStore.selectedDesignList.find(item => item === id);
        }
        return design !== undefined
    }

    const toggleCheckbox = async (value) => {
        window.scrollTo(0, 0)
        setLoader(true)
        await dispatch(toggleDesignSelection(value, generateParams()))
        setLoader(false)
    }

    const generateParams = () => {
        return `${params.orderId}?page=0&size=6`
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

                            <Tooltip
                                title={design.referenceNumber}
                                placement="top"
                                arrow
                            >
                                <span>
                                    {getShortName(design.referenceNumber, 15)}
                                </span>
                            </Tooltip>
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

    const clearSelection = async (e) => {
        window.scrollTo(0, 0)
        setLoader(true)
        if (e.target.checked === false) {
            await dispatch(clearDesignSelection(generateParams()))
        } else {
            let designs = []
            let productList = timelineStore?.orderInfo?.orderProductList
            productList.forEach((design) => {
                designs.push(design.id)
            })
            await dispatch(selectAllDesign(designs, generateParams()))
        }
        setLoader(false)
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
                            onClick={clearSelection}
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