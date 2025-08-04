import React from 'react';
import studentImage from '../../../public/students.png';

const getMedalEmoji = (index, isFiltered, originalIndex) => {
  if (isFiltered) return originalIndex + 1; 
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

const StudentRow = ({ item, index, isFiltered }) => {
  return (
    <tr className="hover:bg-base-200 transition-all ">
      <td className="text-center font-bold text-lg ">{getMedalEmoji(index, isFiltered, item.originalIndex)}</td>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-10 w-10 ring-2 ring-primary ring-offset-2 ring-offset-base-100">
              <img
                src={item?.image || studentImage}
                onError={(e) => (e.target.src = studentImage)}
                alt={`${item.name} avatar`}
                className="object-cover"
              />
            </div>
          </div>
          <p className="font-bold">{item.name}</p>
        </div>
      </td>
      <td className="font-bold">{item.surname}</td>
      <td className="font-bold">{item.faculty?.faculty_name}</td>
      <td>
        <p className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(item?.grade?.grade_name)}`}>
          {item?.grade?.grade_name}
        </p>
      </td>
    </tr>
  );
};

export default StudentRow;