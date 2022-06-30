import React, { useEffect, useState } from 'react';
import Http from '../../services/Http';
import { toast } from 'react-toastify';

const OurOffer = () => {

    const [ offer, setOffer] = useState({})

    useEffect(() => {
        Http.GET('nitexOffer').then(({ data }) => {
            setOffer(data)
        }).catch(({ response }) => {
            toast.error(response.data.message)
        })
    }, [])

    return Object.keys(offer).length > 0 && (
        <div className='at-a-glance my-14'>
            <h2 className='text-2xl text-primaryColor mb-5'>What <strong>NITEX</strong> can offer</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 tab:grid-cols-3 xl:!grid-cols-4 gap-5'>
                <div className='glance-box'>
                    <div
                        className='overflow-hidden flex items-center relative h-[250px] 4xl:h-[296px] p-8 bg-white'>
                        <div>
                            <div className='text-5xl 3xl:text-6xl text-primaryColor mb-1'>{offer?.noOfStyle}+</div>
                            <span className='text-lg text-primaryColor uppercase'>Styles</span>
                        </div>
                    </div>
                </div>
                <div className='glance-box'>
                    <div
                        className='overflow-hidden flex items-center relative h-[250px] 4xl:h-[296px] p-8 bg-white'>
                        <div>
                            <div className='text-5xl 3xl:text-6xl text-primaryColor mb-1'>{offer?.noOfCollection}+</div>
                            <span className='text-lg text-primaryColor uppercase'>Collections</span>
                        </div>
                    </div>
                </div>
                <div className='glance-box'>
                    <div
                        className='overflow-hidden flex items-center relative h-[250px] 4xl:h-[296px] p-8 bg-white'>
                        <div>
                            <div className='text-5xl 3xl:text-6xl text-primaryColor mb-1'>{offer?.leadDay} Days</div>
                            <span className='text-lg text-primaryColor uppercase'>Lead Time</span>
                        </div>
                    </div>
                </div>
                <div className='glance-box'>
                    <div
                        className='overflow-hidden flex items-center relative h-[250px] 4xl:h-[296px] p-8 bg-white'>
                        <div>
                            <div className='text-5xl 3xl:text-6xl text-primaryColor mb-1'>{offer?.noOfMaterial}+</div>
                            <span className='text-lg text-primaryColor uppercase'>Materials in use</span>
                        </div>
                    </div>
                </div>
                <div className='glance-box'>
                    <div
                        className='overflow-hidden flex items-center relative h-[250px] 4xl:h-[296px] p-8 bg-white'>
                        <div>
                            <div className='text-5xl 3xl:text-6xl text-primaryColor mb-1'>{offer?.noOfCategory}+</div>
                            <span className='text-lg text-primaryColor uppercase'>Categories</span>
                        </div>
                    </div>
                </div>
                <div className='glance-box'>
                    <div
                        className='overflow-hidden flex items-center relative h-[250px] 4xl:h-[296px] p-8 bg-white'>
                        <div>
                            <div className='text-5xl 3xl:text-6xl text-primaryColor mb-1'>{offer?.noOfSeasons}</div>
                            <span className='text-lg text-primaryColor uppercase'>Seasons</span>
                        </div>
                    </div>
                </div>
                <div className='glance-box'>
                    <div
                        className='overflow-hidden flex items-center relative h-[250px] 4xl:h-[296px] p-8 bg-white'>
                        <div>
                            <div className='text-5xl 3xl:text-6xl text-primaryColor mb-1'>{offer?.leadDay} Days</div>
                            <span className='text-lg text-primaryColor uppercase'>Lead Time</span>
                        </div>
                    </div>
                </div>
                <div
                    className='see-all flex items-center justify-center bg-primaryColor hover:bg-black h-[250px] 4xl:h-[296px] cursor-pointer'>
                    <div className='text-white-shade-100 text-[40px] text-center flex flex-col items-center'>
                        <div>Dashboard</div>
                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none'
                             xmlns='http://www.w3.org/2000/svg'>
                            <path d='M21 12L14 19M3 12H21H3ZM21 12L14 5L21 12Z' stroke='#F5F5F5' strokeWidth='1.5'
                                  strokeLinecap='round' strokeLinejoin='round'/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurOffer
