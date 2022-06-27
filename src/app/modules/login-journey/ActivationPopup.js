import React, { useEffect, useRef } from 'react';

const ActivationPopup = () => {
    const popupRef = useRef();

    useEffect(() => {
        popupRef.current.click()
    },[])

    return (
        <>
            <button ref={popupRef} type='button' className='btn hidden' data-bs-toggle='modal' data-bs-target='#ActivatedSoon'>
                Activated Soon
            </button>
            <div
                className='modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto open'
                id='ActivatedSoon' tabIndex='-1' aria-labelledby='exampleModalCenterTitle' aria-modal='true'
                data-bs-backdrop='static'
                role='dialog'>
                <div
                    className='modal-dialog max-w-[1840px] mx-4 5xl:mx-auto overflow-hidden modal-dialog-centered relative w-auto pointer-events-none'>
                    <div
                        className='modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding outline-none text-current'>
                        <div className='modal-header flex flex-shrink-0 items-center justify-between p-8 pb-0'>
                        </div>
                        <div className='modal-body relative p-4'>
                            <div className='px-4 sm:px-10 xl:px-20 pb-12'>
                                <h2 className='text-4xl sm:text-[44px] text-primaryColor uppercase font-bold mb-8'>Your
                                    Account will be activated Soon.</h2>
                                <div className='space-y-4'>
                                    <p className='text-xl'>Welcome! Sir <strong className='uppercase'>Kavin</strong>.
                                        Thanks
                                        for joining us!</p>
                                    <p className='text-xl'>This is <strong className='uppercase'>Saikat</strong>, a
                                        Business
                                        Evangelist dedicated to you and your brand. </p>
                                    <p className='text-xl'>We will contact you <strong>within 24 hours </strong></p>
                                    <p className='text-xl'>While waiting, you can check out how we’re empowering +50
                                        brands
                                        from across the world.</p>
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer pb-0 lg:pb-4 p-4 bg-white-shade-100'>
                            <div className='px-4 sm:px-10 xl:pl-20 pt-12 flex flex-col lg:flex-row justify-between'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:w-[54%] gap-12 pb-12'>
                                    <div className='flex items-center gap-6'>
                                            <span>
                                              <span
                                                  className='w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center'>
                                                <svg width='24' height='24' viewBox='0 0 24 24' fill='none'
                                                     xmlns='http://www.w3.org/2000/svg'>
                                                <path
                                                    d='M17.4 13.8758C16.425 12.6758 16.875 11.4008 17.7 10.2758C18.75 9.07576 18.75 7.20077 18.75 7.20077V4.87576C18.75 4.87576 12.3 4.42576 11.625 8.55076C10.875 4.42576 4.5 4.87576 4.5 4.87576V7.20077C4.5 7.20077 4.5 9.07576 5.55 10.2758C6.375 11.4008 6.825 12.6758 5.85 13.8758C4.425 15.6758 3.975 19.4258 6.525 22.4258H11.55H11.625H16.65C19.275 19.4258 18.9 15.6758 17.4 13.8758Z'
                                                    stroke='#282828' strokeWidth='1.5' strokeLinecap='round'
                                                    strokeLinejoin='round'/>
                                                <path
                                                    d='M10.348 6.4502C10.348 6.4502 8.09796 9.45019 9.14796 10.3502C9.82296 10.8752 11.623 8.25019 11.623 8.25019'
                                                    stroke='#282828' strokeWidth='1.5' strokeLinecap='round'
                                                    strokeLinejoin='round'/>
                                                <path
                                                    d='M13.425 6.4502C13.425 6.4502 15.675 9.45019 14.625 10.3502C13.95 10.8752 12.15 8.25019 12.15 8.25019'
                                                    stroke='#282828' strokeWidth='1.5' strokeLinecap='round'
                                                    strokeLinejoin='round'/>
                                                <path d='M18 4.5V1.5' stroke='#282828' strokeWidth='1.5'
                                                      strokeLinecap='round' strokeLinejoin='round'/>
                                                <path d='M5.25 4.5V1.5' stroke='#282828' strokeWidth='1.5'
                                                      strokeLinecap='round' strokeLinejoin='round'/>
                                                </svg>
                                            </span>
                                            </span>
                                        <span>100s of designs every week</span>
                                    </div>
                                    <div className='flex items-center gap-6'>
                                           <span>
                                                <span
                                                    className='w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center'>
                                                    <svg width='26' height='20' viewBox='0 0 26 20' fill='none'
                                                         xmlns='http://www.w3.org/2000/svg'>
                                                    <path
                                                        d='M22.8182 1H3.18182C1.97683 1 1 1.97683 1 3.18182V16.2727C1 17.4777 1.97683 18.4545 3.18182 18.4545H22.8182C24.0232 18.4545 25 17.4777 25 16.2727V3.18182C25 1.97683 24.0232 1 22.8182 1Z'
                                                        stroke='#282828' strokeWidth='1.5' strokeLinecap='round'
                                                        strokeLinejoin='round'/>
                                                    <path d='M1 7.54492H25' stroke='#282828' strokeWidth='1.5'
                                                          strokeLinecap='round' strokeLinejoin='round'/>
                                                    </svg>
                                                </span>
                                           </span>
                                        <span>Up to 150 days Credit line</span>
                                    </div>
                                    <div className='flex items-center gap-6'>
                                               <span>
                                                    <span
                                                        className='w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center'>
                                                        <svg width='26' height='26' viewBox='0 0 26 26' fill='none'
                                                             xmlns='http://www.w3.org/2000/svg'>
                                                        <path
                                                            d='M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z'
                                                            stroke='#282828' strokeWidth='1.5' strokeLinecap='round'
                                                            strokeLinejoin='round'/>
                                                        <path d='M12.9991 5.80078V13.0008L17.7991 15.4008'
                                                              stroke='#282828' strokeWidth='1.5' strokeLinecap='round'
                                                              strokeLinejoin='round'/>
                                                        </svg>
                                                    </span>
                                             </span>
                                        <span>4-6 wks production lead time</span>
                                    </div>
                                    <div className='flex items-center gap-6'>
                                               <span>
                                                    <span
                                                        className='w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center'>
                                                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none'
                                                             xmlns='http://www.w3.org/2000/svg'>
                                                        <path
                                                            d='M3 9C3 7.89543 3.89543 7 5 7H19C20.1046 7 21 7.89543 21 9V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V9Z'
                                                            stroke='#282828' strokeWidth='1.5' strokeLinecap='round'
                                                            strokeLinejoin='round'/>
                                                        <path
                                                            d='M8 10V6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V9.6888'
                                                            stroke='#282828' strokeWidth='1.5' strokeLinecap='round'
                                                            strokeLinejoin='round'/>
                                                        </svg>
                                                    </span>
                                                 </span>
                                        <span>Order as low as 250 units</span>
                                    </div>
                                    <div className='flex items-center gap-6'>
                                               <span>
                                                    <span
                                                        className='w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center'>
                                                       <svg width='26' height='24' viewBox='0 0 26 24' fill='none'
                                                            xmlns='http://www.w3.org/2000/svg'>
                                                        <path
                                                            d='M12.9995 8.99968C12.9995 6.87803 12.1567 4.84328 10.6565 3.34305C9.15623 1.84282 7.12149 1 4.99984 1H1V3.66656C1 5.78821 1.84282 7.82296 3.34305 9.32319C4.84328 10.8234 6.87803 11.6662 8.99968 11.6662H12.9995'
                                                            stroke='#282828' strokeWidth='1.5' strokeLinecap='round'
                                                            strokeLinejoin='round'/>
                                                        <path
                                                            d='M13.0005 14.3327C13.0005 12.211 13.8433 10.1763 15.3435 8.67606C16.8438 7.17583 18.8785 6.33301 21.0002 6.33301H25V7.66629C25 9.78793 24.1572 11.8227 22.657 13.3229C21.1567 14.8231 19.122 15.666 17.0003 15.666H13.0005'
                                                            stroke='#282828' strokeWidth='1.5' strokeLinecap='round'
                                                            strokeLinejoin='round'/>
                                                        <path d='M13.0005 22.3328V9' stroke='#282828' strokeWidth='1.5'
                                                              strokeLinecap='round' strokeLinejoin='round'/>
                                                        </svg>
                                                    </span>
                                            </span>
                                        <span>100% Sustainable materials</span>
                                    </div>
                                </div>
                                <div className='lg:w-[40%] flex flex-col xl:flex-row xl:items-end relative'>
                                    <div className='space-y-5 pb-8 relative z-10 '>
                                        <div>
                                            <a href='mailto:saikat@nitex.info'>
                                                <div className='flex gap-3'>
                                                     <span>
                                                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none'
                                                             xmlns='http://www.w3.org/2000/svg'>
                                                        <path
                                                            d='M20 5H4C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.44772 20.5523 5 20 5Z'
                                                            stroke='#282828' strokeWidth='1.5' strokeLinecap='round'
                                                            strokeLinejoin='round'/>
                                                        <path d='M20 5.5L12 13L4 5.5' stroke='#282828'
                                                              strokeWidth='1.5' strokeLinecap='round'
                                                              strokeLinejoin='round'/>
                                                        </svg>
                                                     </span>
                                                    <span>saikat@nitex.info</span>
                                                </div>
                                            </a>
                                        </div>
                                        <div>
                                            <a href='tel:+88 015 21 300 845'>
                                                <div className='flex gap-3'>
                                                     <span>
                                                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none'
                                                             xmlns='http://www.w3.org/2000/svg'>
                                                        <path
                                                            d='M3.51089 2L7.15002 2.13169C7.91653 2.15942 8.59676 2.64346 8.89053 3.3702L9.96656 6.03213C10.217 6.65159 10.1496 7.35837 9.78693 7.91634L8.40831 10.0375C9.22454 11.2096 11.4447 13.9558 13.7955 15.5633L15.5484 14.4845C15.9939 14.2103 16.5273 14.1289 17.0314 14.2581L20.5161 15.1517C21.4429 15.3894 22.0674 16.2782 21.9942 17.2552L21.7705 20.2385C21.6919 21.2854 20.8351 22.1069 19.818 21.9887C6.39245 20.4276 -1.48056 1.99997 3.51089 2Z'
                                                            stroke='#282828' strokeWidth='1.5' strokeLinecap='round'
                                                            strokeLinejoin='round'/>
                                                        </svg>
                                                     </span>
                                                    <span>+88 015 21 300 845</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <img src='./images/person.png' alt=''
                                         className='lg:absolute lg:max-h-[630px] lg:right-[-72px] lg:bottom-[-16px] xl:pl-14 4xl:pl-0'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ActivationPopup
