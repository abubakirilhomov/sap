import React from 'react';
import { motion } from 'framer-motion';
import { UserRound, Medal } from 'lucide-react';

const TopUserRatings = ({ ratings = [], onClick }) => {
  const topRatings = ratings.slice(0, 5);
  const serverUrl = import.meta.env.VITE_API_URL;
  const maxNameLength = 20;

  const truncateName = (name) => {
    if (!name) return 'User';
    return name.length > maxNameLength ? `${name.slice(0, maxNameLength)}...` : name;
  };

  const medalColors = {
    0: 'text-yellow-400', // Gold for 1st
    1: 'text-gray-300', // Silver for 2nd
    2: 'text-amber-600', // Bronze for 3rd
  };

  return (
    <motion.div
      className="p-4 max-w-[350px] sm:p-6 rounded-2xl shadow-2xl border w-full sm:max-w-xs md:max-w-sm lg:max-w-xs relative overflow-hidden"
      role="region"
      aria-label="User Ratings Section"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
   

    >
      {/* Subtle background glow effect */}
      <div className="absolute inset-0 opacity-50 pointer-events-none" />

      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-base-content/90 flex items-center gap-2" role="heading" aria-level="2">
        <Medal className="w-6 h-6 text-accent" /> Top 5 Champions
      </h2>

      <ul className="space-y-3">
        {topRatings.length > 0 ? (
          topRatings.map((rating, index) => (
            <motion.li
              key={index}
              className="flex items-center gap-3 sm:gap-4 bg-base-200/80 rounded-lg px-3 sm:px-4 py-3 hover:bg-base-300/90 cursor-pointer transition-all duration-300"
              whileHover={{ scale: 1.03, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
              whileTap={{ scale: 0.98 }}
              onClick={onClick}
            >
              <span
                className={`${index < 3 ? medalColors[index] : 'badge-primary'} text-base sm:text-3xl w-20 h-20 sm:w-8 sm:h-8 flex items-center justify-center font-bold`}
              >
                {index < 3 ? (
                  <Medal className="" size={20} />
                ) : (
                  index + 1
                )}
              </span>

              {rating.image ? (
                <img
                  src={`${serverUrl}${rating.image}`}
                  alt={rating.name || 'User'}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-base-300/50 shadow-sm"
                />
              ) : (
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-base-300/50 flex items-center justify-center text-sm text-base-content/50">
                  <UserRound className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm sm:text-base line-clamp-1 text-base-content/90">
                  {truncateName(rating.name)}
                </p>
                <p className="text-xs sm:text-sm text-base-content/60 line-clamp-1 font-medium">
                  {rating.grade?.grade_name || 'No grade'}
                </p>
              </div>
            </motion.li>
          ))
        ) : (
          <li className="text-base-content/70 text-sm sm:text-base">No champions yet!</li>
        )}
      </ul>

      {ratings.length > 5 && (
        <div className="text-end mt-4">
          <motion.button
            className="btn btn-sm btn-outline btn-accent text-xs sm:text-sm font-medium"
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View full leaderboard →
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default TopUserRatings;