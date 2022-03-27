import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeFirstLetter, getShortName } from "../../../services/Util";
import {
    toggleDesignSelection,
} from "../../store/action/Timeline";
import { useParams } from "react-router-dom";
import { Tooltip } from "@material-ui/core";

const AllDesignList = ({ setLoader }) => {
    const timelineStore = useSelector((store) => store.timelineStore);
    const dispatch = useDispatch();
    const params = useParams();

    const isCheckboxChecked = (id) => {
        let design;
        if (timelineStore.selectedDesignList.length > 0) {
            design = timelineStore.selectedDesignList.find((item) => item === id);
        }
        return design !== undefined;
    };

    const toggleCheckbox = async (value) => {
        window.scrollTo(0, 0);
        setLoader(true);
        await dispatch(toggleDesignSelection(value, generateParams(), params.orderId));
        setLoader(false);
    };

    const generateParams = () => {
        return `${params.orderId}?page=0&size=15`;
    };

    const renderDesignList = () => {
        return timelineStore?.orderInfo?.orderProductList?.map((design, index) => {
            return (
                <div
                    className={`single-design-row ${
                        isCheckboxChecked(design.id) ? "selected" : ""
                    }`}
                    key={`design_number_${index}`}
                    onClick={() => toggleCheckbox(design.id)}
                >
                    <div className="design-details">
                        <div className="style-image">
                            <img src={design.image} alt="design" />
                        </div>
                        <div className="design-info">
                            <Tooltip title={design.referenceNumber} placement="top" arrow>
                                <span className="design-title">
                                    {getShortName(design.referenceNumber, 15)}
                                </span>
                            </Tooltip>
                            <p className="gray_dark_02">{design.quantity} Units</p>
                            <div className="design-status">
                                <div className="progress">
                                    <div
                                        className="progress-bar bg-success"
                                        role="progressbar"
                                        style={{ width: design.percentageOfCompleteness + "%" }}
                                        aria-valuenow={design.percentageOfCompleteness}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    />
                                </div>
                                <span>{capitalizeFirstLetter(design.currentStage)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="all-designs-with-status">
            <div className="design-lists scroll-y-label">{renderDesignList()}</div>
        </div>
    );
};

export default AllDesignList;
