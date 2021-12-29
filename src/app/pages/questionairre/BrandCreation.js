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
    const [brandError, setBrandError] = useState("");
    const history = useHistory();

    const handleSubmit = () => {
        if (brandName === "") {
            setBrandError("Brand Name Required!");
            return false;
        }
        let postData = {};
        postData.brandName = "?brandName=" + brandName
        setLoading(true)
        Http.POST('updateBrandInfo', "", "?brandName=" + brandName)
            .then((response) => {
                toastSuccess(response.data.message);
                history.push("/loginPopup")
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

    const onChange = (event) => {
        setBrandName(event.target.value)
        if (event.target.value !== null) {
            setBrandError("")
        }
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
                                    <input
                                        onChange={onChange}
                                        value={brandName}
                                        name="code"
                                        type="text"
                                        className="text-center bg-gray-light border-0 font-weight-bold"
                                    />
                                    {brandError && <span className="error">{brandError}</span>}
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