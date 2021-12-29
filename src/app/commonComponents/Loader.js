import React from "react";
import {
    LOADER_COLOR,
    LOADER_LEFT,
    LOADER_MARGIN_LEFT,
    LOADER_MARGIN_TOP,
    LOADER_OVERLAY_BACKGROUND,
    LOADER_POSITION,
    LOADER_TEXT,
    LOADER_TOP,
    LOADER_WIDTH,
} from "../constant";
import LoadingOverlay from "react-loading-overlay";

const LoaderComponent = ({ loading, children }) => {
    return (
        <LoadingOverlay
            active={loading}
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
            {children}
        </LoadingOverlay>
    );
};

export default LoaderComponent;
