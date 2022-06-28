import React, { useEffect, useState } from 'react';

const GreetingSlider = () => {
    const [greetings, seGreetings] = useState([])

    useEffect(() => {

    },[])

    return(
        <div className='xl:w-[30%] 4xl:w-1/4'>
            <div id='carouselExampleCaptions' className='carousel slide relative  bg-[#0476E0] px-4 py-6'
                 data-bs-ride='carousel'>
                <div className='carousel-inner relative w-full overflow-hidden'>
                    <div className='carousel-item active relative float-left w-full'>
                        <div className='flex justify-between'>
                                        <span className='text-white-shade-100 text-4xl font-bold uppercase opacity-20'>
                                            DEC 17 <br/>
                                            2022
                                        </span>
                            <img src='./images/cloud.png' className='' alt=''/>
                        </div>
                        <div className='carousel-caption pb-5'>
                                    <span
                                        className='inline-block text-xl text-white-shade-100 mb-3'>Good Morning!</span>
                            <h5 className='text-4xl text-white-shade-100 font-bold mb-3'>Robert D. Junior
                                Ironman</h5>
                            <span className='inline-block text-xl text-white-shade-100 mb-3'>Wishing you a productive day</span>
                        </div>
                    </div>
                    <div className='carousel-item relative float-left w-full'>
                        <div className='flex justify-between'>
                                        <span className='text-white-shade-100 text-4xl font-bold uppercase opacity-20'>
                                            DEC 18 <br/>
                                            2022
                                        </span>
                            <img src='./images/cloud.png' className='' alt=''/>
                        </div>
                        <div className='carousel-caption pb-5'>
                                    <span
                                        className='inline-block text-xl text-white-shade-100 mb-3'>Good Morning!</span>
                            <h5 className='text-4xl text-white-shade-100 font-bold mb-3'>Robert D. Junior
                                Ironman</h5>
                            <span className='inline-block text-xl text-white-shade-100 mb-3'>Wishing you a productive day</span>
                        </div>
                    </div>
                    <div className='carousel-item relative float-left w-full'>
                        <div className='flex justify-between'>
                                        <span className='text-white-shade-100 text-4xl font-bold uppercase opacity-20'>
                                            DEC 19 <br/>
                                            2022
                                        </span>
                            <img src='./images/cloud.png' className='' alt=''/>
                        </div>
                        <div className='carousel-caption pb-5'>
                                    <span
                                        className='inline-block text-xl text-white-shade-100 mb-3'>Good Morning!</span>
                            <h5 className='text-4xl text-white-shade-100 font-bold mb-3'>Robert D. Junior
                                Ironman</h5>
                            <span className='inline-block text-xl text-white-shade-100 mb-3'>Wishing you a productive day</span>
                        </div>
                    </div>
                    <div className='carousel-item relative float-left w-full'>
                        <div className='flex justify-between'>
                                        <span className='text-white-shade-100 text-4xl font-bold uppercase opacity-20'>
                                            DEC 20 <br/>
                                            2022
                                        </span>
                            <img src='./images/cloud.png' className='' alt=''/>
                        </div>
                        <div className='carousel-caption pb-5'>
                                    <span
                                        className='inline-block text-xl text-white-shade-100 mb-3'>Good Morning!</span>
                            <h5 className='text-4xl text-white-shade-100 font-bold mb-3'>Robert D. Junior
                                Ironman</h5>
                            <span className='inline-block text-xl text-white-shade-100 mb-3'>Wishing you a productive day</span>
                        </div>
                    </div>
                </div>
                <div className='carousel-indicators m-0 mr-2 flex justify-end'>
                    <div>
                        <button
                            type='button'
                            data-bs-target='#carouselExampleCaptions'
                            data-bs-slide-to='0'
                            className='active'
                            aria-current='true'
                            aria-label='Slide 1'
                        />
                        <button
                            type='button'
                            data-bs-target='#carouselExampleCaptions'
                            data-bs-slide-to='1'
                            aria-label='Slide 2'
                        />
                        <button
                            type='button'
                            data-bs-target='#carouselExampleCaptions'
                            data-bs-slide-to='2'
                            aria-label='Slide 3'
                        ></button>
                        <button
                            type='button'
                            data-bs-target='#carouselExampleCaptions'
                            data-bs-slide-to='3'
                            aria-label='Slide 4'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GreetingSlider
