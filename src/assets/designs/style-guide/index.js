import React from 'react'

const StyleGuide = () => {
    //change the Boilarplate name to your specified name
    return (
        <div className='container p-10 space-y-16'>
            <div>
                <h2 className="mb-4">Modal & Buttons</h2>
                <div className="flex flex-wrap gap-5">
                    <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
                        Vertically centered modal
                    </button>
                    <button type="button" className="btn flex justify-between items-center w-1/4">
                        <span>Login Now</span>
                        <span className="ml-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 12L14 19M3 12H21H3ZM21 12L14 5L21 12Z" stroke="#F5F5F5" stroke-width="1.5"
                                  stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                    </button>
                    <button type="button" className="btn flex justify-between items-center w-1/4">
                        <span>Ask <strong>Collection</strong></span>
                        <span className="ml-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 12L14 19M3 12H21H3ZM21 12L14 5L21 12Z" stroke="#F5F5F5" stroke-width="1.5"
                                  stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                    </button>
                </div>

                <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                    id="exampleModalCenter" tabIndex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true"
                    role="dialog">
                    <div className="modal-dialog max-w-[680px] modal-dialog-centered relative w-auto pointer-events-none">
                        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding outline-none text-current">
                            <div className="modal-header flex flex-shrink-0 items-center justify-between bg-primaryColor-shade-300 p-4">
                                <h5 className="text-xl font-bold leading-normal text-primaryColor uppercase"
                                    id="exampleModalScrollableLabel">
                                    Forget Password
                                </h5>
                                <button type="button"
                                        className="btn-close box-content w-4 h-4 p-1 !mr-0.5 text-black border-none  opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                        data-bs-dismiss="modal" aria-label="Close">
                                </button>
                            </div>
                            <div className="modal-body relative p-4">
                                <div className="input-group">
                                    <label htmlFor="email" className="label">Email address *</label>
                                    <input type="email"
                                           className="form-field bg-primaryColor-shade-300"
                                           id="email"
                                           placeholder="e.g. shiblysaikat@gmail.com"
                                           name="email"/>
                                </div>
                                <p className="text-xl">A recovery link has been sent to your email address. <br/>
                                    By clicking the link, you can change your password. </p>
                            </div>
                            <div className="modal-footer p-4">
                                <button type="button" className="btn w-full" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
                                    Receive Recovery Link
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <h2 className="mb-8">Text Boxes & Drop-downs</h2>
                <div className="flex flex-wrap gap-5">
                    <div className="form-group flex flex-wrap gap-5">
                        <div className="input-group">
                            <label htmlFor="email" className="label">Email address *</label>
                            <input type="email"
                                   className="form-field border-error"
                                   id="email"
                                   placeholder="Enter email"
                                   name="email"/>
                            <span className="text-error text-sm">Invalid Email Address</span>
                        </div>
                        <div className="input-group">
                            <label htmlFor="name" className="label">Name *</label>
                            <input type="text"
                                   className="form-field"
                                   id="name"
                                   placeholder="Enter Name"
                                   name="name"/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="email" className="label">Password *</label>
                            <div className="relative">
                                <input type="password"
                                       className="form-field pr-12"
                                       id="password"
                                       placeholder="Enter password"
                                       name="password"/>
                                <span className="absolute cursor-pointer right-[17px] top-[17px]">
                                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                   </svg>
                               </span>
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="email" className="label">Password *</label>
                            <div className="relative">
                                <input type="password"
                                       className="form-field pr-12"
                                       id="password"
                                       placeholder="Enter password"
                                       name="password"/>
                                <span className="absolute cursor-pointer right-[17px] top-[17px]">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 2L22 22" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884L6.71277 6.7226Z" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M14 14.2357C13.4692 14.7107 12.7684 14.9996 12 14.9996C10.3431 14.9996 9 13.6565 9 11.9996C9 11.1759 9.33193 10.4298 9.86932 9.8877" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                               </span>
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="search" className="label">Search *</label>
                            <div className="relative">
                                <input type="text"
                                       className="form-field pr-12"
                                       id="search"
                                       placeholder="Search ..."
                                       name="search"/>
                                <span className="absolute cursor-pointer right-[17px] top-[17px]">
                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17 17L22 22L17 17ZM19.5 10.75C19.5 15.5825 15.5825 19.5 10.75 19.5C5.91751 19.5 2 15.5825 2 10.75C2 5.91751 5.91751 2 10.75 2C15.5825 2 19.5 5.91751 19.5 10.75Z" stroke="#282828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                      </svg>
                               </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="mb-8">Others</h2>
                <div className="flex flex-wrap gap-5">
                <div className="w-[40px] h-[40px] bg-white flex justify-center items-center absolute right-[20px] top-[20px] cursor-pointer">
                    <span className="mt-2">
                        <svg width="38" height="36" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d_944_19802)">
                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" fill="#DA336F"/>
                            <path d="M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z" stroke="#F5F5F5" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <defs>
                            <filter id="filter0_d_944_19802" x="0.496094" y="0.5" width="37" height="35" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="4"/>
                            <feGaussianBlur stdDeviation="4"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0.854167 0 0 0 0 0.199306 0 0 0 0 0.435056 0 0 0 0.2 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_944_19802"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_944_19802" result="shape"/>
                            </filter>
                            </defs>
                        </svg>
                    </span>
                </div>
                </div>
            </div>
        </div>
    )
}

export default StyleGuide //change the Boilarplate name to your specified name
