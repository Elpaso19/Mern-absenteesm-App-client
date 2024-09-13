import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import StudentPage from './pages/StudentPage';
import ExamPage from './pages/ExamPage';
import StudentResults from './pages/StudentResults';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/admin/dashboard" element={<DashboardPage />} />
                    <Route path="/student" element={<StudentPage />} />
                    <Route path="/student/exam" element={<ExamPage />} />
                    <Route path="/student/results" element={<StudentResults />} />
                </Routes>
                <ToastContainer />
            </div>
        </Router>
    );
}

export default App;
