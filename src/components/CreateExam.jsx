import React, { useState } from 'react';
import axios from '../services/api';
import { toast } from 'react-toastify';

const CreateExam = () => {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
    const [duration, setDuration] = useState('');

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
    };

    const handleChangeQuestion = (index, e) => {
        const newQuestions = [...questions];
        newQuestions[index][e.target.name] = e.target.value;
        setQuestions(newQuestions);
    };

    const handleChangeOption = (qIndex, oIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = value;
        setQuestions(newQuestions);
    };

    const handleCreateExam = async () => {
        if (!title || !duration || questions.some(q => !q.question || !q.correctAnswer)) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            await axios.post('/admin/create-exam', { title, questions, duration });
            setQuestions([{ question: '', options: ['', '', '', ''], correctAnswer: '' }])
            setTitle("")
            setDuration("")
            toast.success('Exam created successfully');
        } catch (error) {
            toast.error('Failed to create exam');
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">Create Exam</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Exam Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Duration (in minutes)</label>
                <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            {questions.map((question, index) => (
                <div key={index} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Question {index + 1}</label>
                    <input
                        type="text"
                        name="question"
                        value={question.question}
                        onChange={(e) => handleChangeQuestion(index, e)}
                        className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 mb-2"
                    />
                    {question.options.map((option, oIndex) => (
                        <input
                            key={oIndex}
                            type="text"
                            value={option}
                            onChange={(e) => handleChangeOption(index, oIndex, e.target.value)}
                            className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 mb-2"
                            placeholder={`Option ${oIndex + 1}`}
                        />
                    ))}
                    <input
                        type="text"
                        name="correctAnswer"
                        value={question.correctAnswer}
                        onChange={(e) => handleChangeQuestion(index, e)}
                        className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Correct Answer"
                    />
                </div>
            ))}
            <button
                onClick={handleAddQuestion}
                className="w-full px-4 py-2 mb-4 text-white bg-gray-600 rounded-md hover:bg-gray-700"
            >
                Add Question
            </button>
            <button
                onClick={handleCreateExam}
                className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
                Create Exam
            </button>
        </div>
    );
};

export default CreateExam;

