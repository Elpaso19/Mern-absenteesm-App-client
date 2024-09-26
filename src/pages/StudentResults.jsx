import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

const StudentResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('/student/results');
        setResults(Array.isArray(response.data.results) ? response.data.results : []);
      } catch (error) {
        toast.error('Failed to fetch results');
        setResults([]);  // Set to empty array on error
      } finally {
        setLoading(false);  // Stop loading
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <Spinner />
        <p>Loading results...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <BackButton />
      <h2 className="text-2xl font-bold mb-4">Your Results</h2>
      {results.length === 0 ? (
        <p>You have not taken any exams yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-6 border-b border-r border-gray-300 text-left">Exam Title</th>
                <th className="py-3 px-6 border-b border-r border-gray-300 text-left">Score</th>
                <th className="py-3 px-6 border-b border-gray-300 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr
                  key={result._id}
                  className="hover:bg-gray-100 transition-colors duration-200"
                >
                  <td className="py-3 px-6 border-b border-r border-gray-300 text-center">
                    {result.exam?.title}
                  </td>
                  <td className="py-3 px-6 border-b border-r border-gray-300 text-center">
                    {result.score}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-300 text-center">
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
