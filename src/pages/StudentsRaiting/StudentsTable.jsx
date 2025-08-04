import React from 'react';
import StudentRow from './StudentRow';

const StudentsTable = ({ students, page, pageSize, isFiltered }) => {
  return (
    <table className="table w-full shadow-2xl">
      <thead className="bg-gradient-to-r from-primary to-secondary ">
        <tr className="text-primary-content">
          <th className="text-primary-content font-bold text-lg">Rank</th>
          <th className="text-primary-content font-bold text-lg">Name</th>
          <th className="text-primary-content font-bold text-lg">Surname</th>
          <th className="text-primary-content font-bold text-lg">Faculty</th>
          <th className="text-primary-content font-bold text-lg">Role</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, idx) => (
          <StudentRow
            key={student.id}
            item={student}
            index={(page - 1) * pageSize + idx}
            isFiltered={isFiltered}
          />
        ))}
      </tbody>
    </table>
  );
};

export default StudentsTable;