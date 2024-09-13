
import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import BackButton  from '../components/BackButton';

const StudentResults = () => {
    const [results, setResults] = useState([]);
     const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('/student/results');
        // Ensure that `results` is an array before setting it in the state
        setResults(Array.isArray(response.data.results) ? response.data.results : []);
      } catch (error) {
        toast.error('Failed to fetch results');
        setResults([]);  // Set to empty array on error
      }finally {
        setLoading(false); // Stop loading
      }
    };

    fetchResults();
  }, []);
    
    
    console.log(results)
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
      <h2 className="text-xl font-bold mb-4">Your Results</h2>
      {results.length === 0 ? (
        <p>You have not taken any exams yet.</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Exam Title</th>
              <th className="py-2 px-4 border-b">Score</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result._id}>
                <td className="py-2 px-4 border-b">{result.exam.title}</td>
                <td className="py-2 px-4 border-b">{result.score}</td>
                <td className="py-2 px-4 border-b">
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
