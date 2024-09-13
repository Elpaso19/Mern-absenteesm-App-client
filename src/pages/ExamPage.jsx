import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

const ExamPage = () => {
    const [exam, setExam] = useState(null);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(0); // Timer state in seconds
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const response = await axios.get('/student/exam');
                setExam(response.data.exam);  // Set the exam data
                setTimeLeft(response.data.exam.duration * 60);  // Set the timer
            } catch (error) {
                toast.error('Failed to load exam questions');
            }
        };

        fetchExam();
    }, []);

    const handleChange = (questionId, option) => {
        setAnswers({
            ...answers,
            [questionId]: option,
        });
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();  // Prevent default form submission if triggered by user
        try {
            await axios.post('/student/exam', {
                examId: exam._id,
                answers,
            });
            toast.success('Exam submitted successfully!');
            navigate('/');
        } catch (error) {
            toast.error('Failed to submit exam');
        }
    };
//define the timer format
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };


    if (!exam) {
        return (
            <div className="text-center mt-10">
                <Spinner />
                <p>Loading exam...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
            <h2 className="text-2xl font-bold text-center mb-6">{exam.title}</h2>
            <div className="text-right mb-4">
                <span className="text-lg font-bold">Time Left: {formatTime(timeLeft)}</span>
            </div>
            <form onSubmit={handleSubmit}>
                {exam.questions.map((question, index) => (
                    <div key={question._id} className="mb-6">
                        <h3 className="text-lg font-medium mb-3">
                            {index + 1}. {question.question}
                        </h3>
                        <div className="space-y-2">
                            {question.options.map((option) => (
                                <label key={option} className="block">
                                    <input
                                        type="radio"
                                        name={question._id}
                                        value={option}
                                        onChange={() => handleChange(question._id, option)}
                                        className="mr-2"
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 mt-6"
                >
                    Submit Exam
                </button>
            </form>
        </div>
    );
};

export default ExamPage;
