import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ReactComponent as NextArrow } from '../../assets/images/right-nav.svg';

const SliderWrapper = (props) => {
    const settings = {
        dots: true,
        loop:true,
        nav:true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6
    };

    return (
        <Slider {...settings}>
            {props.children}
        </Slider>
    )
}

export default SliderWrapper
