import React, { useEffect, useState } from 'react';
import Http from '../../services/Http';
import { toast } from 'react-toastify';
import { authUserInfo, changeDateFormat, getCurrentLocalDateTime } from '../../services/Util';
import moment from 'moment';
import CloudBG from '../../../assets/images/bg-cloud.jpg';

const GreetingSlider = () => {
    const [greetings, setGreetings] = useState([])
    const [activeSlideId, setActiveSlideId] = useState(1)
    const [currentDate, setCurrentDate] = useState('')
    const [timeText, setTimeText] = useState('')

    useEffect(() => {
        let today = moment(new Date()).format().split('T')[0]
        let curHr = new Date().getHours()
        if (curHr < 12) {
            setTimeText('Good Morning')
        } else if (curHr < 18) {
            setTimeText('Good Afternoon')
        } else {
            setTimeText('Good Evening')
        }
        setCurrentDate(today)
        Http.GET('fetchGreetingSlider', `?localDateTime=${getCurrentLocalDateTime()}`).then(({ data }) => {
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
                    className={(index + 1) === activeSlideId ? 'carousel-item active relative bg-cover float-left h-full px-4 py-6 w-full bg-no-repeat bg-right-top' : 'carousel-item bg-cover h-full px-4 py-6 relative float-left w-full bg-no-repeat bg-right-top'}
                    key={`item_${item.id}`}  style={{ 'background-image': `url(${CloudBG})` }}>
                    <div className='flex justify-between'>
                            <span className='text-white-shade-100 text-4xl font-bold uppercase opacity-20'>
                                {changeDateFormat(currentDate, 'YYYY-MM-DD', 'MMM DD')}
                                <br/>{changeDateFormat(currentDate, 'YYYY-MM-DD', 'YYYY')}
                            </span>
                    </div>
                    <div className='carousel-caption pb-5 mt-9'>
                            <span className='inline-block text-xl text-white-shade-100 mb-3'>
                                {timeText}!
                            </span>
                        <h5 className='text-4xl text-white-shade-100 font-bold mb-3 truncate-2'>
                            {authUserInfo()?.name}
                        </h5>
                        <span className='inline-block text-xl text-white-shade-100 mb-3 truncate-2'>
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
            <div id='carouselExampleCaptions' className='carousel slide relative   h-full '
                 data-bs-ride='carousel'>
                <div className='carousel-inner relative w-full overflow-hidden h-full'>
                    {renderSliderContent()}
                </div>
                <div className='carousel-indicators m-0 mr-2 flex justify-end absolute bottom-[20px] right-[15px]'>
                    <div>
                        {renderSliderIndicator()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GreetingSlider
