import React, { useEffect, useRef } from 'react';
import { authUserInfo } from '../../services/Util';

const EmailVerification = ({ target }) => {
    const popupRef = useRef();

    useEffect(() => {
        popupRef.current.click()
    }, [])

    return (
        <>
            <button ref={popupRef} type='button' className='btn hidden' data-bs-toggle='modal'
                    data-bs-target={`#${target}`}>
                Activated Soon
            </button>
            <div
                className='modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto'
                id={`${target}`} tabIndex='-1' aria-labelledby='exampleModalCenterTitle' aria-modal='true'
                data-bs-backdrop='static'
                role='dialog'>
                <div className='modal-dialog max-w-[680px] modal-dialog-centered relative w-auto pointer-events-none'>
                    <div
                        className='modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding outline-none text-current'>
                        <div
                            className='modal-header flex flex-shrink-0 items-center justify-between bg-primaryColor-shade-300 p-4'>
                            <h5 className='text-xl font-bold leading-normal text-primaryColor uppercase'
                                id='exampleModalScrollableLabel'>
                                EMAIL VERIFICATION
                            </h5>
                        </div>
                        <div className='modal-body relative p-4'>
                            <p className='text-xl'>
                                A verification link has been sent to your email address. <br/>
                                By clicking the link, you can navigate forward.
                            </p>
                        </div>
                        <div className='modal-footer p-4'>
                            <button type='button' className='btn w-full'>
                                <a href={`mailto:${authUserInfo().email}`}>GO TO EMAIL</a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmailVerification
