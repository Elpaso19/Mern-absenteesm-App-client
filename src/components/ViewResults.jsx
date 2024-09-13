import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { toast } from 'react-toastify';

const StudentResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('/admin/results');
        setResults(response.data.results);
      } catch (error) {
          toast.error('Failed to fetch results');
          
      }
    };

    fetchResults();
  }, []);
    console.log(results)

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Results</h2>
      {results.length === 0 ? (
        <p> No results  yet.</p>
      ) : (
        <table className="min-w-full bg-white border  border-gray-800">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b  border-gray-800">Exam Title</th>
              <th className="py-2 px-4 border-b  border-gray-800">Matric Number</th>
              <th className="py-2 px-4 border-b  border-gray-800">Surname</th>
              <th className="py-2 px-4 border-b  border-gray-800">OtherName</th>
              <th className="py-2 px-4 border-b  border-gray-800">Score</th>
              <th className="py-2 px-4 border-b  border-gray-800">Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result._id}>
                <td className="py-2 px-4 border-b  border-gray-800">{result.exam.title}</td>
                <td className="py-2 px-4 border-b  border-gray-800">{result.student.MATRIC_NUMBER}</td>
                <td className="py-2 px-4 border-b  border-gray-800">{result.student.SURNAME}</td>
                <td className="py-2 px-4 border-b  border-gray-800">{result.student.OTHER_NAME}</td>
                <td className="py-2 px-4 border-b  border-gray-800">{result.score}</td>
                <td className="py-2 px-4 border-b  border-gray-800">
                  {new Date(result.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentResults;
