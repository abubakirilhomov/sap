import React, { useState } from 'react';
import StudentsTable from './Students';

const StudentsRaiting = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center font-bold text-base-content/90"
          role="heading"
          aria-level="1"
        >
          Students Rating
        </p>

        <div className="flex items-center w-full sm:w-auto">
          <label className="input input-info input-bordered flex items-center sm:w- w-full max-w-xs sm:max-w-sm lg:w-96">
            <svg
              className="h-4 w-4 opacity-50 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              className="grow text-sm sm:text-base"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search students by name"
            />
          </label>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 md:mt-8 flex-1">
        <StudentsTable filterStudents={searchTerm} />
      </div>
    </div>
  );
};

export default StudentsRaiting;