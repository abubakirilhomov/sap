<<<<<<< HEAD
import React, { useState } from "react";
import { motion } from "framer-motion";
import Loading from "../Loading/Loading";
import ClubCard from "../ClubCard/ClubCard";
import { useNavigate } from "react-router-dom";

const ClubContent = ({ clubs, loading, error, searchTerm, setSearchTerm }) => {
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const filteredClubs = clubs.filter((club) =>
      club.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    if (loading) return <Loading />;
    if (error) return <div className="text-error p-6">{error}</div>;
  
    return (
      <>
        <motion.input
          type="text"
          placeholder="Search clubs..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full max-w-md mb-6 p-2 rounded-lg border border-base-300 focus:outline-none focus:ring-2 focus:ring-secondary"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />
  
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {filteredClubs.map((club) => (
            <ClubCard
              key={club.id}
              club={club}
              onClick={() => navigate(`/clubs/${club.id}`)}
            />
          ))}
        </motion.div>
  
        {filteredClubs.length === 0 && (
          <p className="text-center text-base-content/70 mt-6">
            No clubs found. Try a different search!
          </p>
        )}
      </>
    );
=======
import React from "react";
import ClubCard from "../ClubCard/ClubCard";

const ClubContent = ({ clubs, loading, error, searchTerm, setSearchTerm, currentUserId, onUpdate }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  
  return (
    <div>
      <input
        type="text"
        placeholder="Search clubs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered mb-4 w-full"
      />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredClubs.map((club) => (
          <ClubCard
            key={club.id}
            club={club}
            currentUserId={currentUserId}  // ✅ user idni uzatyapmiz
            onClick={() => console.log("View club", club.id)}
            onUpdate={onUpdate}            // ✅ follow/unfollow bo‘lganda qayta fetch
          />
        ))}
      </div>
    </div>
  );
>>>>>>> 439d21ca1f6bdbf57ab9e72d0296f3ce99134966
};

export default ClubContent;
