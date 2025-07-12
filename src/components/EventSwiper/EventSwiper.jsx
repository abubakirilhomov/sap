
// components/EventSwiper/EventSwiper.jsx
import React from 'react';
import EventSwiperDesktop from './EventSwiperDesktop';
import EventSwiperMobile from './EventSwiperMobile';

const EventSwiper = ({ events }) => {
  return (
    <>
      <div className="hidden max-w-[750px] md:block">
        <EventSwiperDesktop events={events} />
      </div>
      <div className="block w-[350px] md:hidden">
        <EventSwiperMobile events={events} />
      </div>
    </>
  );
};

export default EventSwiper;
