import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import EventCard from '../EventCard/EventCard'; // Import EventCard component

const EventSwiper = ({ events }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  console.log('Events:', events); // For debugging

  return (
    <div className="w-full max-w-6xl mx-auto overflow-hidden px-2 relative">
      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 z-10">
        <button
          ref={prevRef}
          className="bg-base-300 cursor-pointer hover:bg-base-100 rounded-r-full p-2 shadow"
        >
          <ChevronLeft />
        </button>
      </div>
      <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
        <button
          ref={nextRef}
          className="bg-base-300 cursor-pointer hover:bg-base-100 rounded-l-full p-2 shadow"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Swiper */}
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 1 },
        }}
        pagination={{
          el: '.custom-pagination',
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        modules={[Pagination, Autoplay, Navigation]}
        className="w-full"
      >
        {events.length > 0 ? (
          events.map((event, index) => (
            <SwiperSlide key={index} className="w-full">
              <EventCard activeEvents={[event]} /> {/* Pass single event as array */}
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide className="w-full">
            <div className="flex flex-col items-center justify-center h-full p-4 w-full max-w-sm mx-auto">
              <p className="text-base-content text-center">No events available at the moment.</p>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
      <div className="custom-pagination flex justify-center mt-4 gap-2"></div>
    </div>
  );
};

export default EventSwiper;