<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { BsFillLightningChargeFill } from 'react-icons/bs';
import { FaCrown } from 'react-icons/fa';
=======
// ClubCard.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { BsFillLightningChargeFill } from 'react-icons/bs';
import { FaCrown, FaUsers } from 'react-icons/fa';
>>>>>>> 439d21ca1f6bdbf57ab9e72d0296f3ce99134966
import { MdCategory } from 'react-icons/md';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import axiosInstance from '../../axiosInstance/axiosInstance';

<<<<<<< HEAD
const ClubCard = ({ club, onClick, currentUserId }) => {
    const [isFollowing, setIsFollowing] = useState(false);

    // ✅ refresh bo‘lganda ham tekshiradi
    useEffect(() => {
        console.log(
            "DEBUG ClubCard:",
            "club.id =", club?.id,
            "members_id =", club?.members_id,
            "currentUserId =", currentUserId
        );

        if (Array.isArray(club?.members_id)) {
            setIsFollowing(club.members_id.includes(currentUserId));
        } else {
            // Agar string yoki undefined bo‘lsa
            setIsFollowing(false);
        }
    }, [club, currentUserId]);

    const handleFollowToggle = async () => {
        try {
            if (isFollowing) {
                // ✅ Unfollow
                await axiosInstance.delete('/api/v1/clubs/unfollow/', {
                    data: { club_id: club.id }
                });
                toast.info("Unfollowed", { position: "bottom-right", autoClose: 3000 });
                setIsFollowing(false);
            } else {
                // ✅ Follow
                await axiosInstance.post('/api/v1/clubs/follow/', {
                    club_id: club.id
                });
                toast.success("Followed", { position: "bottom-right", autoClose: 3000 });
                setIsFollowing(true);
            }
        } catch (error) {
            console.error("Follow toggle failed: ", error.response?.data || error.message);

            if (error.response?.data?.error === "User is already a member of this club.") {
                setIsFollowing(true);
                toast.info("Siz allaqachon a'zo ekansiz!", { position: "bottom-right", autoClose: 3000 });
            } else {
                toast.error("Error toggling follow", { position: "bottom-right", autoClose: 3000 });
            }
        }
    };

    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-br from-base-100 to-base-200 hover:shadow-xl shadow-md transition-all duration-300 p-5 rounded-xl border border-base-300 flex flex-col gap-4"
        >
            {/* HEADER */}
            <div className="flex items-center gap-4">
                {club?.logo ? (
                    <img
                        src={club?.logo}
                        alt="club logo"
                        className="w-14 h-14 object-cover rounded-full border border-base-300"
                    />
                ) : (
                    <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-semibold uppercase">
                        {club?.name[0]}
                    </div>
                )}
                <div>
                    <p className="text-xl font-bold text-base-content">{club?.name}</p>
                    <div className="text-sm text-base-content/60 flex items-center gap-2 mt-1">
                        <MdCategory />
                        <span className="bg-info text-base-100 px-2 py-0.5 rounded-full text-xs font-medium">
                            {club?.category?.name}
                        </span>
                    </div>
                </div>
            </div>

            {/* LEADER */}
            <div className="flex items-center gap-3 text-sm text-base-content/70">
                <FaCrown className="text-warning" />
                <p className='font-medium'>
                    Leader: <span className='font-bold'>{club?.leader?.name} {club?.leader?.surname}</span>
                </p>
            </div>

            {/* TOKENS */}
            <div className="text-sm flex items-center gap-2 text-base-content/70">
                <BsFillLightningChargeFill className="text-yellow-500" />
                <p className='font-medium'>
                    Points: <span className='font-bold text-info'>{club?.tokens}</span>
                </p>
            </div>

            {/* ACTIONS */}
            <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                    className='btn btn-primary btn-sm btn-soft w-full'
                    onClick={handleFollowToggle}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </button>


                <button onClick={onClick} className='btn btn-soft btn-sm w-full'>
                    View
                </button>
            </div>
        </motion.div>
    );
=======
const ClubCard = ({ club, onClick, currentUserId, onUpdate }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  // ✅ A'zolar soni (member count)
  const memberCount = useMemo(
    () => (Array.isArray(club?.member_ids) ? club.member_ids.length : 0),
    [club?.member_ids]
  );

  useEffect(() => {
    if (Array.isArray(club?.member_ids)) {
      setIsFollowing(club.member_ids.includes(currentUserId));
    } else {
      setIsFollowing(false);
    }
  }, [club, currentUserId]);

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await axiosInstance.delete('/api/v1/clubs/unfollow/', { data: { club_id: club.id } });
        toast.info('Unfollowed');
      } else {
        await axiosInstance.post('/api/v1/clubs/follow/', { club_id: club.id });
        toast.success('Followed');
      }
      onUpdate?.(); // 🔄 ro‘yxatni yangilash
    } catch (error) {
      console.error('Follow toggle failed: ', error.response?.data || error.message);
      toast.error('Error toggling follow');
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="bg-gradient-to-br from-base-100 to-base-200 hover:shadow-xl shadow-md transition-all duration-300 p-5 rounded-xl border border-base-300 flex flex-col gap-4"
    >
      <div className="flex items-center gap-4">
        {club?.logo ? (
          <img
            src={club.logo}
            alt="club logo"
            className="w-14 h-14 object-cover rounded-full border border-base-300"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-semibold uppercase">
            {club?.name?.[0] || '?'}
          </div>
        )}

        <div className="min-w-0">
          <p className="text-xl font-bold text-base-content truncate">{club?.name}</p>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-base-content/60">
            {/* Kategoriya */}
            <span className="inline-flex items-center gap-1">
              <MdCategory />
              <span className="bg-info text-base-100 px-2 py-0.5 rounded-full text-xs font-medium">
                {club?.category?.name || 'Uncategorized'}
              </span>
            </span>

            {/* ✅ A'zolar soni badge */}
            <span className="inline-flex items-center gap-1 bg-base-300 px-2 py-0.5 rounded-full text-xs font-medium">
              <FaUsers className="opacity-80" />
              {memberCount} member{memberCount === 1 ? '' : 's'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 text-sm text-base-content/70">
        <FaCrown className="text-warning shrink-0" />
        <p className="font-medium truncate">
          Leader:{' '}
          <span className="font-bold">
            {club?.leader?.name || '—'} {club?.leader?.surname || ''}
          </span>
        </p>
      </div>

      <div className="text-sm flex items-center gap-2 text-base-content/70">
        <BsFillLightningChargeFill className="text-yellow-500" />
        <p className="font-medium">
          Points: <span className="font-bold text-info">{club?.tokens ?? 0}</span>
        </p>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          className="btn btn-primary btn-sm btn-soft w-full"
          onClick={handleFollowToggle}
          disabled={!currentUserId}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>

        <button onClick={onClick} className="btn btn-soft btn-sm w-full">
          View
        </button>
      </div>
    </motion.div>
  );
>>>>>>> 439d21ca1f6bdbf57ab9e72d0296f3ce99134966
};

export default ClubCard;
