import React from 'react';
import CustomSwiperDesktop from './CustomSwiperDesktop';
import CustomSwiperMobile from './CustomSwiperMobile';

const CustomSwiper = ({ events }) => {
  return (
    <>
      {/* Desktop and tablets */}
      <div className="hidden  md:block">
        <CustomSwiperDesktop events={events} />
      </div>

      {/* Mobile only */}
      <div className="block md:hidden">
        <CustomSwiperMobile events={events} />
      </div>
    </>
  );
};

export default CustomSwiper;
