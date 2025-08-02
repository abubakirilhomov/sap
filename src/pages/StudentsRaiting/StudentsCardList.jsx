import React from 'react';
import StudentCard from './StudentCard';

const StudentsCardList = ({ students, page, pageSize }) => {
  return (
    <>
      {students.map((student, idx) => (
        <StudentCard key={student.id} item={student} index={(page - 1) * pageSize + idx} />
      ))}
    </>
  );
};

export default StudentsCardList;
