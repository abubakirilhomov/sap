import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BsFillLightningChargeFill } from "react-icons/bs";

const gradeColors = {
  Freshmen: "bg-blue-500",
  Sophomore: "bg-purple-500",
  Junior: "bg-pink-500",
  Senior: "bg-amber-500",
  Default: "bg-neutral",
};

const Navbar = ({ tokens }) => {
  const user = useSelector((state) => state?.auth?.userInfo === null ? null : state?.auth?.userInfo[0]);
  const [imgError, setImgError] = useState(false);
  const gradeName = user && user?.grade && user?.grade?.grade_name ? user?.grade?.grade_name : "Default";
  const gradeColor = gradeColors[gradeName] || gradeColors.Default;

  return (
    <div className="bg-base-200 hidden md:block navbar shadow-sm">
      <div className='navbar-start'>
        <input className='input input-md' placeholder="Search" type="text" />
      </div>
      <div className='navbar-center'>

      </div>
      <div className="navbar-end">
        <div className='flex items-center mr-4 border border-primary py-2 px-5 rounded'>
          <BsFillLightningChargeFill className="text-2xl text-amber-500 mr-2" />
          <span className="text-primary">
            {tokens}
          </span>
        </div>
        <div className="dropdown dropdown-end">
          {user?.image && !imgError ? (
            <div tabIndex={0} role="button" className="avatar select-none cursor-pointer">
              <div
                className={`w-10 rounded-full ring ${gradeColor} ring-offset-2 ring-offset-base-100 transition-all`}
              >
                <img
                  src={user.image}
                  alt={`${user.name || "User"} ${user.surname || ""}`}
                  onError={() => setImgError(true)}
                />
              </div>
            </div>
          ) : (
            <div
              tabIndex={0}
              role="button"
              className={`avatar select-none avatar-placeholder cursor-pointer ${gradeColor} text-neutral-content rounded-full w-10 h-10`}
            >
              <div className="text-xl">
                {user?.name?.[0] || "?"}
              </div>
            </div>
          )}
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-sm"
          >
            <li><a>Profile</a></li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;