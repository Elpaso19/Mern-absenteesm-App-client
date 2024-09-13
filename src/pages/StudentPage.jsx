import React from 'react';
import { Link } from 'react-router-dom';

const StudentPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Student Portal</h1>
      <div className="mt-6 space-y-4">
        <Link
          to="/student/exam"
          className="block text-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Take Exam
        </Link>
        <Link
          to="/student/results"
          className="block text-center bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          View Results
        </Link>
      </div>
    </div>
  );
};

export default StudentPage;
