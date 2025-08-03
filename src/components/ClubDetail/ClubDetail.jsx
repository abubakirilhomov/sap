import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance/axiosInstance';
import Loading from '../Loading/Loading';
import { motion } from 'framer-motion';
import { FaCrown } from 'react-icons/fa';
import { BsFillLightningChargeFill } from 'react-icons/bs';
import { MdCategory } from 'react-icons/md';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const ClubDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClub = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/v1/clubs/${id}`);
        setClub(data);
      } catch (err) {
        console.error('Failed to load club', err);
      } finally {
        setLoading(false);
      }
    };
    fetchClub();
  }, [id]);

  if (loading) return <Loading />;
  if (!club) return <div className="text-error text-center text-xl mt-10">Club not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 w-full max-w-5xl mx-auto"
    >
      <button
        className="btn btn-soft mb-6 flex items-center gap-2 text-base"
        onClick={() => navigate(-1)}
      >
        <FiArrowLeftCircle className="text-xl" />
        Back to List
      </button>

      <div className="bg-base-200 p-6 rounded-2xl shadow-xl border border-base-300">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {club.logo ? (
            <img
              src={club?.logo}
              alt="Club Logo"
              className="w-36 h-36 rounded-full object-cover shadow-lg"
            />
          ) : (
            <div className="w-36 h-36 rounded-full bg-primary  flex items-center justify-center text-4xl font-bold shadow-lg">
              {club?.name[0]}
            </div>
          )}

          <div className="flex-1 space-y-3 text-base-content">
            <h2 className="text-3xl font-bold">{club?.name}</h2>

            <div className="flex items-center gap-2 text-base-content/70">
              <MdCategory className="text-lg" />
              <p>Category: <span className='text-base-100 bg-info text-center px-2 py-1 rounded-full text-xs font-medium'> {club.category?.name}</span></p>
            </div>

            <div className="flex items-center gap-2 text-base-content/70">
              <FaCrown className="text-warning" />
              <p className='font-medium'>Leader: <span className='font-bold'>{club?.leader?.name} {club?.leader?.surname}</span></p>
            </div>

            <div className="flex items-center gap-2 text-base-content/70">
              <BsFillLightningChargeFill className="text-yellow-500" />
              <p className='font-medium'>Tokens: <span className='font-bold'> {club?.tokens}</span></p>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button className="btn btn-primary btn-wide transition-transform hover:scale-105">
            Follow
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ClubDetail;
