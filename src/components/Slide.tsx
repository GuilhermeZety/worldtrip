import { ReactNode } from "react";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

import { Swiper, SwiperProps } from 'swiper/react';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


interface SlideProps extends SwiperProps{
    children: ReactNode
}

export function Slide({ children, ...rest } : SlideProps){
    return (
        <Swiper
            style={{
            }}
            color='red'
            cssMode={true}
            navigation={true}
            pagination={{
                clickable: true,
            }}
            hashNavigation={{
                watchState: true,
            }}
            mousewheel={true}
            slidesPerView={1}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            {...rest}
        >
            {children}
        </Swiper>
    )
}