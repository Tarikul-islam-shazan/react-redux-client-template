import React, {useEffect, useState} from "react";
import Http from "../../services/Http";
import {toastError, toastSuccess} from "../../commonComponents/Toast";
import {useHistory} from "react-router-dom";
import LoaderComponent from "../../commonComponents/Loader";
import IntlTelInput from "react-intl-tel-input";

const BrandCreation = ({location}) => {
    const [loading, setLoading] = useState(true)
    const [brandName, setBrandName] = useState("")
    const [brandError, setBrandError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [state, setState] = useState({iso2: "us", countryCode: "1"})
    const history = useHistory();
    const verificationToken = new URLSearchParams(location.search).get("token");


    const getUserInfo = async () => {
        await Http.GET('userInfo')
            .then((response) => {
                let {data} = response;
                localStorage.setItem('userInfo', JSON.stringify(data));
                verifyEmail(data)
            })
            .catch(({response}) => {
                toastError(response.data.message);
            });
    }

    const verifyEmail = async (data) => {
        if (data.emailVerified === false && verificationToken !== null) {
            await Http.POST("verifyEmail", "", `?token=${verificationToken}`).catch((error) => {
                toastError(error.response.data.message)
            })
        }
    }

    const verifyToken = async () => {
        if (verificationToken !== null) {
            await Http.POST("verifyToken", "", `?verificationToken=${verificationToken}`).then((response) => {
                localStorage.setItem("token", `${response.data.tokenType} ${response.data.accessToken}`);
                localStorage.setItem("refreshToken", `${response.data.refreshToken}`);
            }).catch((error) => {
                toastError(error.response.data.message)
            })
        }
    }

    useEffect(() => {
        verifyToken()
        getUserInfo()
        setLoading(false)
    }, [])

    const handleSubmit = () => {
        if (brandName === "") {
            setBrandError("Brand Name Required!");
            return false;
        }
        if (phoneNumber === "") {
            setPhoneNumberError("Phone Number Required!")
            return false
        }
        let userInfo = JSON.parse(localStorage.getItem("userInfo"))
        let body = {
            email: userInfo.email,
            brandName: brandName,
            phoneNumber: "+" + state.countryCode + phoneNumber,
            countryCode: state.countryCode,
            iso2: state.iso2
        };
        setLoading(true)
        Http.POST('updateBusinessInfo', body)
            .then((response) => {
                toastSuccess("Information updated successful!");
                setLoading(false)
                history.push("/loginPopup")
            })
            .catch(({response}) => {
                setLoading(false)
                toastError("Request wasn't successful.");
            });
    }

    const onChange = (event) => {
        setBrandName(event.target.value)
        if (event.target.value !== null) {
            setBrandError("")
        }
    }

    const onChangeFlag = (e, f) => {
        console.log(f)
        setState({
            iso2: f.iso2,
            countryCode: f.dialCode
        })
    }

    const onChangeNumber = async (numberValidation, phoneNumber) => {
        await setPhoneNumber(phoneNumber)
        await setPhoneNumberError("");
    }


    const popupHeading = () => {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo.emailVerified === false) {
            return (
                <div className="ques-heading">
                    <img src={process.env.PUBLIC_URL + "/icons/emailVerificationSuccessful.png"} alt/>
                    <h2>Your email is successfully verified</h2>
                    <p>Please submit your brand name & phone number</p>
                </div>
            )
        } else {
            return (
                <div className="ques-heading">
                    <h2>Please submit your brand name & phone number</h2>
                </div>
            )
        }
    }


    return (
        <LoaderComponent loading={loading}>
            <div className="questionnaire otp">
                <div className="questionnaire-form">
                    {popupHeading()}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group">
                                <div className="country-code">
                                    <input
                                        onChange={onChange}
                                        value={brandName}
                                        name="code"
                                        type="text"
                                        placeholder="Brand name"
                                        className="bg-gray-light border-0 font-weight-bold"
                                    />
                                    {brandError && <span className="error">{brandError}</span>}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="form-group">
                                <div className="country-phone-code">
                                    <IntlTelInput
                                        containerClassName="intl-tel-input"
                                        inputClassName={`form-control ${phoneNumberError ? 'error' : ''}`}
                                        onSelectFlag={onChangeFlag}
                                        onPhoneNumberChange={onChangeNumber}
                                        separateDialCode={true}
                                        defaultValue={""}
                                        defaultCountry={""}
                                    />
                                </div>
                                {
                                    phoneNumberError &&
                                    <div
                                        className="error"
                                    >
                                        {phoneNumberError}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <button className="btn-brand m-0" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </LoaderComponent>
    );
};

export default BrandCreation