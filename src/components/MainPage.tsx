import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import BlackFridayImg from "../assets/black_week.webp"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './MainPage.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { green } from '@mui/material/colors';
import { UseScrollTriggerOptions } from '@mui/material/useScrollTrigger/useScrollTrigger';

function redirectTo(to: string) {
  return () => {

  }
}

export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 9000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide onClick={redirectTo("")}>
            <div id="bg-img" className='special'>
                <img src={BlackFridayImg} alt="Black Friday"/>
            </div>
        </SwiperSlide>
        <SwiperSlide onClick={redirectTo("")}>
            <div id="bg-img">
                <iframe src="https://www.youtube.com/embed/M_kY84M_cTs?controls=0&showinfo=0&rel=0&autoplay=1&cc_load_policy=0&playsinline=1&loop=1&mute=1&enablejsapi=1&origin=http://localhost:5173&widgetid=1" frameBorder="0"></iframe>
                <div className="filter"></div>
            </div>
            <div id="text">
                <p>Check yourself in <span style={{color: 'rgb(170, 29, 29)'}}>Santa claus 🎅</span> <span style={{ color: 'green'}}>gift</span></p>
            </div>
        </SwiperSlide>
        <SwiperSlide onClick={redirectTo("")}>
            <div id='bg-img'>
                <iframe allowFullScreen frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" title="TK23 Marq P1 Arctic Haze" width="640" height="360" src="https://www.youtube.com/embed/PH36n-oXxi8?controls=0&amp;showinfo=0&amp;rel=0&amp;autoplay=1&amp;cc_load_policy=0&amp;playsinline=1&amp;loop=1&amp;mute=1&amp;enablejsapi=1&amp;origin=http://localhost:5173&amp;widgetid=1"></iframe>
                <div className="filter"></div>
            </div>
            <div id="text" style={{ alignItems: 'center', color: "rgb(241, 127, 74)" }}>
                <p>Customize your dreamed Trek via ProjectOne</p>
            </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
