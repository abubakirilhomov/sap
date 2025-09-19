import React from 'react';
import studentImage from '../../../public/students.png';

const getMedalEmoji = (index, isFiltered) => {
    if (isFiltered) return ""; 
    return ['🥇', '🥈', '🥉'][index] || index + 1;
  };
  

const getGradeColor = (grade) => {
  switch (grade) {
    case "Senior": return "bg-warning text-black";
    case "Middle": return "bg-info text-base-content";
    case "Junior": return "bg-success text-base-content";
    default: return "bg-base-300 text-base-content";
  }
};

const StudentCard = ({ item, index }) => {
  return (
    <div className="bg-base-100 border border-base-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="mask mask-squircle h-12 w-12 ring-2 ring-primary ring-offset-2 ring-offset-base-100">
            <img
              src={item?.image || studentImage}
              onError={(e) => (e.target.src = studentImage)}
              alt={`${item.name} avatar`}
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <p className="font-bold text-lg">{item.name} {item.surname}</p>
            <p className="font-bold text-lg">{getMedalEmoji(index)}</p>
          </div>
          <p className="text-sm text-base-content/70">{item.faculty?.faculty_namegit}</p>
          <p className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(item?.grade?.grade_name)}`}>
            {item?.grade?.grade_name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
