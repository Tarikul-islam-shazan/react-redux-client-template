import React, {useEffect, useState} from 'react';
import Http from '../../services/Http';
import {toast} from 'react-toastify';
import {getCurrentLocalDateTime} from '../../services/Util';

const GreetingSlider = () => {
    const [greetings, setGreetings] = useState([])
    const [activeSlideId, setActiveSlideId] = useState(1)

    useEffect(() => {
        Http.GET('fetchGreetingSlider', `?localDateTime=${getCurrentLocalDateTime()}`).then(({data}) => {
            setGreetings(data)
        }).catch(err => {
            toast.error(err.response.data.message)
        })
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            greetings.length < activeSlideId ? setActiveSlideId(1) : setActiveSlideId(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const renderSliderContent = () => {
        return greetings.map((item, index) => {
            return (
                <div
                    className={(index + 1) === activeSlideId ? 'carousel-item active relative float-left w-full' : 'carousel-item relative float-left w-full'}
                    key={`item_${item.id}`}>
                    <div className='flex justify-between'>
                            <span className='text-white-shade-100 text-4xl font-bold uppercase opacity-20'>
                                DEC 17 <br/>2022
                            </span>
                    </div>
                    <div className='carousel-caption pb-5'>
                            <span className='inline-block text-xl text-white-shade-100 mb-3'>
                                Good Morning!
                            </span>
                        <h5 className='text-4xl text-white-shade-100 font-bold mb-3'>
                            Robert D. Junior Ironman
                        </h5>
                        <span className='inline-block text-xl text-white-shade-100 mb-3'>
                                Wishing you a productive day
                            </span>
                    </div>
                </div>
            )
        })
    }

    const renderSliderIndicator = () => {
        return greetings.map((item, index) => {
            return (
                <button
                    key={`indicator_${item.id}`}
                    type='button'
                    data-bs-target='#carouselExampleCaptions'
                    data-bs-slide-to={index}
                    className={(index + 1) === activeSlideId ? 'active' : ''}
                />
            )
        })
    }


    return (
        <div className='xl:w-[30%] 4xl:w-1/4'>
            <div id='carouselExampleCaptions' className='carousel slide relative  bg-[#0476E0] px-4 py-6'
                 data-bs-ride='carousel'>
                <div className='carousel-inner relative w-full overflow-hidden'>
                    {renderSliderContent()}
                </div>
                <div className='carousel-indicators m-0 mr-2 flex justify-end'>
                    <div>
                        {renderSliderIndicator()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GreetingSlider
