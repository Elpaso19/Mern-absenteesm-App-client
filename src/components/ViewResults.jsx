import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { toast } from 'react-toastify';

const StudentResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('/admin/results');
        console.log('Results fetched:', response.data.results);  // Debugging line
        setResults(response.data.results);
      } catch (error) {
        toast.error('Failed to fetch results');
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Student Results</h2>
      {results.length === 0 ? (
        <p>No results yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-6 border-b border-r border-gray-300 text-left">Exam Title</th>
                <th className="py-3 px-6 border-b border-r border-gray-300 text-left">Matric Number</th>
                <th className="py-3 px-6 border-b border-r border-gray-300 text-left">Surname</th>
                <th className="py-3 px-6 border-b border-r border-gray-300 text-left">Other Name</th>
                <th className="py-3 px-6 border-b border-r border-gray-300 text-left">Score</th>
                <th className="py-3 px-6 border-b border-gray-300 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr
                  key={result._id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                >
                  <td className="py-3 px-6 border-b border-r border-gray-300">{result.exam?.title}</td>
                  <td className="py-3 px-6 border-b border-r border-gray-300">{result.student?.MATRIC_NUMBER}</td>
                  <td className="py-3 px-6 border-b border-r border-gray-300">{result.student?.SURNAME}</td>
                  <td className="py-3 px-6 border-b border-r border-gray-300">{result.student?.OTHER_NAMES || 'N/A'}</td>
                  <td className="py-3 px-6 border-b border-r border-gray-300">{result.score}</td>
                  <td className="py-3 px-6 border-b border-gray-300">
                    {new Date(result.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentResults;
