import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';
import axios from 'axios';

const Dashboard = () => {
  const store = useSelector((state) => state);
  const [events, setEvents] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsResponse = await axios.get('http://37.140.216.178/api/v1/events/newslist/');
        const ratingsResponse = await axios.get('http://37.140.216.178/api/v1/users/rating/');
        setEvents(eventsResponse.data);
        setRatings(ratingsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="p-6 bg-base-200 min-h-screen"
    >
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          className="bg-base-100 p-6 rounded-xl shadow-xl border border-base-300"
          whileHover={{ scale: 1.1, rotate: 2 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-primary">Student Info</h2>
          <ul className="space-y-2 text-base-content">
            <li>Home</li>
            <li>Shop</li>
            <li>Clubs</li>
            <li>Profile</li>
            <li>Posts</li>
          </ul>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: '#f59e0b' }}
            className="btn btn-warning mt-6 w-full"
          >
            Log out
          </motion.button>
        </motion.div>
        <motion.div
          className="bg-base-100 p-6 rounded-xl shadow-xl border border-base-300 lg:col-span-2"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-primary">Latest News</h2>
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500 }}
            className="h-72"
          >
            {events.map((event, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="flex flex-col items-center justify-center h-full bg-gradient-to-r from-base-200 to-base-300 rounded-lg p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <h3 className="text-xl font-medium">{event.title || 'Event Title'}</h3>
                  <p className="text-base-content mt-2">{event.description || 'Exciting events ahead!'}</p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
        <motion.div
          className="bg-base-100 p-6 rounded-xl shadow-xl border border-base-300"
          whileHover={{ scale: 1.1 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-primary">Club Ratings</h2>
          <ul className="space-y-2 text-base-content">
            {ratings.length > 0 ? ratings.map((rating, index) => (
              <motion.li
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {rating.name || 'Not found'}
              </motion.li>
            )) : <li>Not found</li>}
          </ul>
        </motion.div>
        <motion.div
          className="bg-base-100 p-6 rounded-xl shadow-xl border border-base-300 lg:col-span-2"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-primary">Profile Stats</h2>
          <p className="text-base-content">Add club details or general info here...</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;