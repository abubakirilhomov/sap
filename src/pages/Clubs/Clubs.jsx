import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import axiosInstance from "../../axiosInstance/axiosInstance";
import { ToastContainer } from 'react-toastify';
import ClubContent from '../../components/ClubContent/ClubContent';

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  // ✅ Hozirgi user id ni olish
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/api/v1/students/profile/");
        if (res.data.length > 0) {
          setCurrentUserId(res.data[0].id); // user id saqlaymiz
        }
      } catch (err) {
        console.error("User profile fetch error:", err);
      }
    };
    fetchProfile();
  }, []);

  // ✅ Klublarni olish
  const fetchClubs = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/clubs/list/");
      setClubs(response.data);
    } catch (error) {
      console.error("Error fetching club data:", error);
      setError("Failed to load club data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className='p-4 bg-gradient-to-br from-base-100 via-base-200 to-base-300 rounded min-h-screen w-full max-w-6xl mx-auto'
    >
      <ToastContainer position="bottom-right" autoClose={5000} theme="dark" />
      <h1 className='md:text-4xl text-2xl font-bold mb-8'>Clubs</h1>

      <ClubContent
        clubs={clubs}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        currentUserId={currentUserId}  // ✅ prop qilib pastga uzatyapmiz
        onUpdate={fetchClubs}          // ✅ follow/unfollow bo‘lganda yangilash uchun
      />
    </motion.div>
  );
};

export default Clubs;
