import React, { useState } from 'react';
import { BsFillLightningChargeFill } from 'react-icons/bs';
import { FaCrown } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import axiosInstance from '../../axiosInstance/axiosInstance';

const ClubCard = ({ club, onClick }) => {
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollowToggle = async () => {
        try {
            if (isFollowing) {
                await axiosInstance.delete('/api/v1/clubs/unfollow/', { data: { club_id: club.id } });
                toast.info("Unfollowed", { position: "bottom-right", autoClose: 3000 });
            } else {
                await axiosInstance.post('/api/v1/clubs/follow/', { club_id: club.id });
                toast.success("Followed", { position: "bottom-right", autoClose: 3000 });
            }
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error("Follow toggle failed: ", error.response?.data || error.message);
            toast.error("Error toggling follow", { position: "bottom-right", autoClose: 3000 });
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

            <div className="flex items-center gap-3 text-sm text-base-content/70">
                <FaCrown className="text-warning" />
                <p className='font-medium'>
                    Leader: <span className='font-bold'>{club?.leader?.name} {club?.leader?.surname}</span>
                </p>
            </div>

            <div className="text-sm flex items-center gap-2 text-base-content/70">
                <BsFillLightningChargeFill className="text-yellow-500" />
                <p className='font-medium'>
                    Tokens: <span className='font-bold text-info'>{club?.tokens}</span>
                </p>
            </div>

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
};

export default ClubCard;
