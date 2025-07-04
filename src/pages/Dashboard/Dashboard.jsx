import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import axiosInstance from '../../axiosInstance/axiosInstance';
import Loading from '../../components/Loading/Loading';
import CustomSwiper from '../../components/CustomSwiper/CustomSwiper';
import { useNavigate } from 'react-router-dom';
import TopUserRatings from '../../components/TopUserRating/TopUserRating';
import EventSwiper from '../../components/EventSwiper/EventSwiper';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [events, setEvents] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [activeEvents, setActiveEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsResponse = await axiosInstance.get('/api/v1/events/newslist/');
        const ratingsResponse = await axiosInstance.get('/api/v1/users/rating/');
        const activeEventsRes = await axiosInstance.get('/api/v1/events/getactiveevents/');
        setEvents(eventsResponse.data);
        setRatings(ratingsResponse.data);
        setActiveEvents(activeEventsRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="text-error p-6">{error}</div>;

  const topRatings = ratings.results.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="md:p-4 px-1 bg-base-100 rounded md:min-h-screen md:w-full md:max-w-6xl mx-auto"
    >
      <h1 className="text-4xl font-bold mb-8" role="heading" aria-level="1">
        Dashboard
      </h1>

      {/* Latest News Section */}
      <motion.div
        className="bg-base-100 p-6 rounded-xl shadow-xl border border-base-300 w-full mb-6"
        role="region"
        aria-label="Latest News Section"
      >
        <h2 className="text-2xl font-semibold mb-4" role="heading" aria-level="2">
          Latest News
        </h2>
        <CustomSwiper events={events} />
      </motion.div>

      {/* Ratings and Active Events Section */}
      <motion.div
        className="flex flex-col md:flex-row gap-6"
        role="region"
        aria-label="Ratings and Active Events Section"
      >
        <div className="flex-1">
          <EventSwiper events={activeEvents} />
        </div>
        <div className="md:w-1/3 p-4 w-full">
          <TopUserRatings
            ratings={ratings.results}
            onClick={() => navigate('/users/ratings')}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
