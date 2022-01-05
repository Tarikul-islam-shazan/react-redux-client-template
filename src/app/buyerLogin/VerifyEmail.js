import React, {useEffect, useState} from "react";
import LoaderComponent from "../commonComponents/Loader";
import Http from "../services/Http";
import {toastError, toastSuccess} from "../commonComponents/Toast";

const TIME_LIMIT = 120;
const TIME_INTERVAL = 1000;

const VerifyEmail = () => {
    const [loading, setLoading] = useState(false)
    const [timeLimit, setTimeLimit] = useState(TIME_LIMIT)

    useEffect(() => {
        const timer = setInterval(() => {
            if (timeLimit === 0) {
                clearInterval(timer);
            } else {
                setTimeLimit(timeLimit - 1)
            }
        }, TIME_INTERVAL);

        return () => clearInterval(timer)
    }, [timeLimit])

    const resend = () => {
        setLoading(true)
        Http.POST("resendVerificationMail")
            .then(res => {
                toastSuccess("Mail Resend Successful!")
                setLoading(false)
            }).catch(error => {
            toastError(error.response.data.message);
            setLoading(false)
        })
    }

    return (
        <LoaderComponent loading={loading}>
            <div className="questionnaire otp verify-email-address">
                <div className="questionnaire-form">
                    <div className="ques-heading mb-3">
                        <h2>Verify your Email</h2>
                        <p className="font-16 mt-2 mb-3">Check your email and click the link to activate your account</p>
                        <img src={process.env.PUBLIC_URL + "/icons/verifyEmail.png"} alt className="mb-4"/>
                        <p className="font-16 my-2">If you don't receive the email please check spam</p>
                        <p className="font-16 my-2">OR</p>
                    </div>
                    {
                        timeLimit ?
                            <button
                                className="btn-brand font-16 brand-color bg-gray-light m-0" disabled
                            >
                                Resend E-mail
                                after {`${Math.floor(timeLimit / 60)}:${(timeLimit - (Math.floor(timeLimit / 60) * 60))}`} mins
                            </button> :
                            <button
                                className="btn-brand m-0"
                                onClick={resend}
                            >
                                Resend E-mail
                            </button>
                    }
                </div>
            </div>
        </LoaderComponent>
    )
}

export default VerifyEmail