import React, {useState} from "react";
import LoadingOverlay from "react-loading-overlay";
import {
    LOADER_COLOR,
    LOADER_LEFT, LOADER_MARGIN_LEFT,
    LOADER_MARGIN_TOP,
    LOADER_OVERLAY_BACKGROUND,
    LOADER_POSITION, LOADER_TEXT,
    LOADER_TOP,
    LOADER_WIDTH
} from "../../constant";
import Http from "../../services/Http";
import {toastError, toastSuccess} from "../../commonComponents/Toast";
import {useHistory} from "react-router-dom";

const BrandCreation = () => {

    const [loading, setLoading] = useState(false)
    const [brandName, setBrandName] = useState("")
    const history = useHistory();

    const handleSubmit = () => {
        let postData = {};
        postData.brandName = "?brandName=" + brandName
        setLoading(true)
        Http.POST('updateBrandInfo', "","?brandName=" + brandName)
            .then((response) => {
                toastSuccess(response.data.message);
                // history.push("")
                setLoading(false)
            })
            .catch(({response}) => {
                setLoading(false)
                if (response && response.data && response.data.message) {
                    toastError(response.data.message);
                } else {
                    toastError("Request wasn't successful.");
                }
            });
    }

    return (
        <LoadingOverlay
            active={loading}
            styles={{
                overlay: (base) => ({
                    ...base,
                    background: LOADER_OVERLAY_BACKGROUND
                }),
                spinner: (base) => ({
                    ...base,
                    width: LOADER_WIDTH,
                    position: LOADER_POSITION,
                    top: LOADER_TOP,
                    left: LOADER_LEFT,
                    marginTop: LOADER_MARGIN_TOP,
                    marginLeft: LOADER_MARGIN_LEFT,
                    '& svg circle': {
                        stroke: LOADER_COLOR
                    }
                }),
                content: (base) => ({
                    ...base,
                    color: LOADER_COLOR
                })
            }}
            spinner
            text={LOADER_TEXT}>
            <div className="questionnaire otp">
                <div className="questionnaire-form">
                    <div className="ques-heading">
                        <h2>Submit Your brand name</h2>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group">
                                <div className="country-code">
                                    <input onChange={e => setBrandName(e.target.value)} value={brandName} name="code"
                                           type="text" className="text-center bg-gray-light border-0 font-weight-bold"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn-brand m-0" onClick={handleSubmit}>Verify</button>
                </div>
            </div>
        </LoadingOverlay>
    );
};

export default BrandCreation