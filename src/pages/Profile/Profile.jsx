import React, { useState } from 'react';
import { MdLocalPhone, MdLocationOn } from "react-icons/md";
import { MdMailOutline } from "react-icons/md";
import { IoMdTrophy } from "react-icons/io";
import { FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const gradeColors = {
  Freshmen: "bg-blue-500",
  Sophomore: "bg-purple-500",
  Junior: "bg-pink-500",
  Senior: "bg-amber-500",
  Default: "bg-neutral",
};

const Profile = () => {
  const user = useSelector((state) => state.auth.userInfo[0]);
  const [imgError, setImgError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const gradeName = user?.grade?.grade_name || "Default";
  const gradeColor = gradeColors[gradeName] || gradeColors.Default;

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <div className="flex flex-wrap gap-4">
        {user?.image ? (
          <>
            <div className="w-full">
              <p className='font-bold text-secondary text-4xl'>Your Profile</p>
              <div className="breadcrumbs text-sm">
                <ul>
                  <li><a className='text-secondary'>App</a></li>
                  <li><a className='text-secondary'>Profile</a></li>
                </ul>
              </div>
            </div>

            <div className="card bg-base-100 w-80 h-120 shadow-md shadow-secondary">
              <div className="mt-4">
                <figure>
                  <img
                    src={user.image}
                    alt="Profile"
                    className='rounded-box w-60 h-60'
                    onError={() => setImgError(true)}
                  />
                </figure>
              </div>
              <div className="mt-4 flex flex-col justify-center items-center p-4">
                <p className="font-semibold text-2xl text-secondary">
                  {user.name || "User"} {user.surname || ""}
                </p>
                <div className="mt-4 border-t-2 border-secondary justify-center items-center">
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <p className='text-secondary'><MdLocationOn /></p>
                    <p className='text-secondary'>Tashkent, Uzbekistan</p>
                  </div>
                  <div className="flex items-center justify-center gap-5">
                    <p className='text-secondary'><MdMailOutline /></p>
                    <p className='text-secondary'>Example@gmail.com</p>
                  </div>
                  <div className="flex items-center justify-center gap-6">
                    <p className='text-secondary'><MdLocalPhone /></p>
                    <p className='text-secondary'>(+998) 99 606 3131</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-100 flex flex-col items-center">
              <div className="bg-base-100 rounded-2xl shadow-md shadow-secondary">
                <div className="w-96 p-6 bg-base-100 border-2 border-secondary rounded-md">
                  <div className="flex justify-between mb-4">
                    <p className="text-2xl font-semibold text-secondary">Account Details</p>
                    <p className='text-secondary text-2xl'><FaEdit /></p>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <p className='text-secondary font-medium'>First Name</p>
                      <p className='text-secondary font-medium'>{user.name || "Jafarbek"}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className='text-secondary font-medium'>Last Name</p>
                      <p className='text-secondary font-medium'>{user.surname || "Ulugbekov"}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className='text-secondary font-medium'>Date Of Birth</p>
                      <p className='text-secondary font-medium'>30/06/12</p>
                    </div>
                    <div className="flex justify-between">
                      <p className='text-secondary font-medium'>Gender</p>
                      <p className='text-secondary font-medium'>Male</p>
                    </div>
                    <div className="flex justify-between">
                      <p className='text-secondary font-medium'>ID</p>
                      <p className='text-secondary font-medium'>4646</p>
                    </div>
                    <div className="flex justify-between">
                      <p className='text-secondary font-medium'>Cours</p>
                      <p className='text-secondary font-medium'>4</p>
                    </div>
                    <div className="flex justify-between">
                      <p className='text-secondary font-medium'>Grade</p>
                      <p className='text-secondary font-medium'>{gradeName}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-base-100 rounded-2xl shadow-md shadow-secondary mt-10">
                <div className="w-96 p-6 bg-base-100 border-2 border-secondary rounded-md">
                  <div className="flex justify-between mb-4">
                    <p className="text-2xl font-semibold text-secondary">Adress</p>
                    <p className='text-secondary text-2xl'><FaEdit /></p>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <p className='text-secondary font-medium'>Adress</p>
                      <p className='text-secondary font-medium'>Yunusabad 13513 Kvartal</p>
                    </div>
                    <div className="flex justify-between">
                      <p className='text-secondary font-medium'>City</p>
                      <p className='text-secondary font-medium'>Tashkent</p>
                    </div>
                    <div className="flex justify-between">
                      <p className='text-secondary font-medium'>Country</p>
                      <p className='text-secondary font-medium'>UzBekistan</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="card card-dash bg-base-100 w-96 p-1 shadow-md shadow-secondary border-2 border-secondary">
                <div>
                  <p className='text-2xl text-secondary font-medium'>My Wishes</p>
                  <p className='text-secondary font-mono'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore eius rem...
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="card bg-base-100 w-full shadow-sm">
                <div className="card-body">
                  <div className="rounded-lg bg-neutral text-neutral-content w-96">
                    <div className="p-3">
                      <p className='text-secondary text-2xl font-bold'>My Achivments</p>
                    </div>
                    <div className="card-body items-center text-center">
                      <p className='text-2xl text-warning font-bold'>Club Achivments</p>
                      <p className='text-7xl text-warning'><IoMdTrophy /></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-error">No image or image failed to load.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;