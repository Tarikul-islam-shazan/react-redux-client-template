import React from 'react';

const SingleStyle = () => {
    return(
        <div className='collection-box'>
            <div className='overflow-hidden relative h-[300px] sm:h-[330px] 5xl:h-[456px] p-4 bg-white'>
                <div className='h-full'>
                    <img className='w-full h-full object-cover' src='/images/products/3.jpg'/>
                </div>
                <div
                    className='w-[40px] h-[40px] bg-white border border-white-shade-100 flex justify-center items-center absolute right-[20px] top-[20px] cursor-pointer'>
                                    <span className='mt-2'>
                                        <svg width='38' height='36' viewBox='0 0 38 36' fill='none'
                                             xmlns='http://www.w3.org/2000/svg'>
                                            <g filter='url(#filter0_d_944_19802)'>
                                            <path
                                                d='M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z'
                                                fill='#DA336F'/>
                                            <path
                                                d='M18.4415 22.7608L10.5723 14.5663C8.35573 12.2582 8.49531 8.4736 10.8753 6.34929C13.2364 4.24181 16.8165 4.65105 18.6824 7.24171L18.9961 7.67724L19.3098 7.24171C21.1757 4.65105 24.7557 4.24181 27.1169 6.34929C29.4969 8.4736 29.6365 12.2582 27.4199 14.5663L19.5507 22.7608C19.2444 23.0797 18.7478 23.0797 18.4415 22.7608Z'
                                                stroke='#F5F5F5' strokeLinecap='round' strokeLinejoin='round'/>
                                            </g>
                                            <defs>
                                            <filter id='filter0_d_944_19802' x='0.496094' y='0.5' width='37' height='35'
                                                    filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
                                            <feFlood floodOpacity='0' result='BackgroundImageFix'/>
                                            <feColorMatrix in='SourceAlpha' type='matrix'
                                                           values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                                                           result='hardAlpha'/>
                                            <feOffset dy='4'/>
                                            <feGaussianBlur stdDeviation='4'/>
                                            <feComposite in2='hardAlpha' operator='out'/>
                                            <feColorMatrix type='matrix'
                                                           values='0 0 0 0 0.854167 0 0 0 0 0.199306 0 0 0 0 0.435056 0 0 0 0.2 0'/>
                                            <feBlend mode='normal' in2='BackgroundImageFix'
                                                     result='effect1_dropShadow_944_19802'/>
                                            <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_944_19802'
                                                     result='shape'/>
                                            </filter>
                                            </defs>
                                        </svg>
                                    </span>
                </div>
            </div>
            <div className='py-4'>
                <h4 className='text-xl font-bold text-primaryColor mb-3'>Cotton elastane boat neck</h4>
                <div className='flex  items-center gap-6 text-base text-primaryColor-shade-100 cursor-pointer'>
                    <span>View Collection</span>
                    <span>
                                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none'
                                         xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M21 12L14 19M3 12H21H3ZM21 12L14 5L21 12Z' stroke='#646464'
                                          strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
                                    </svg>
                                </span>
                </div>
            </div>
        </div>
    )
}

export default SingleStyle
