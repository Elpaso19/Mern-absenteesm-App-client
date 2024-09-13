import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { toast } from 'react-toastify';

const ManageAbsentees = () => {
  const [exams, setExams] = useState([]); // State to store exams
  const [examId, setExamId] = useState(''); // State to store selected exam ID
  const [absentees, setAbsentees] = useState([]); // State to store absentees

  // Fetch exams on component mount
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('/admin/exams'); // Fetch exams from the backend
        setExams(response.data.exams); // Set the fetched exams in state
      } catch (error) {
        toast.error('Failed to fetch exams');
      }
    };

    fetchExams();
  }, []);

  // Fetch absentees when examId changes
  useEffect(() => {
    const fetchAbsentees = async () => {
      if (!examId) return; // Do nothing if no exam is selected
      try {
        const response = await axios.get(`/admin/absentees?examId=${examId}`);
        setAbsentees(response.data.absentees); // Set the fetched absentees in state
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setAbsentees([]); // Handle case where there are no absentees
          toast.info('No absentees found for this exam.');
        } else {
          toast.error('Failed to fetch absentees');
        }
      }
    };

    fetchAbsentees();
  }, [examId]);
    
    
    // console.log(absentees)

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Manage Absentees</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Exam</label>
        <select
          value={examId}
          onChange={(e) => setExamId(e.target.value)}
          className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">-- Select Exam --</option>
          {exams.map((exam) => (
            <option key={exam._id} value={exam._id}>
              {exam.title}
            </option>
          ))}
        </select>
      </div>
      {absentees.length === 0 ? (
        <p>No absentees found.</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              {/* <th className="py-2 px-4 border-b">Student Name</th> */}
              <th className="py-2 px-4 border-b">Matric Number</th>
              <th className="py-2 px-4 border-b">Surname</th>
              <th className="py-2 px-4 border-b">Other Names</th>
              <th className="py-2 px-4 border-b">Exam Title</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {absentees.map((absentee) => (
              <tr key={absentee._id}>
                {/* <td className="py-2 px-4 border-b">{absentee.student.name}</td> */}
                <td className="py-2 px-4 border-b">{absentee.studentMatricNumber}</td>
                <td className="py-2 px-4 border-b">{absentee.surname}</td>
                <td className="py-2 px-4 border-b">{absentee.otherName}</td>
                <td className="py-2 px-4 border-b">{absentee. examTitle}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(absentee.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageAbsentees;
