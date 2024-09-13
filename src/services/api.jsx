// import axios from 'axios';

// // Create an instance of Axios with custom config
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   withCredentials: true, // Ensures cookies are sent with requests
// });

// export const login = (credentials) => api.post('/auth/login', credentials);
// export const logout = () => api.post('/auth/logout');

// export default api;
import axios from 'axios';

// Create an instance of Axios with custom config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  withCredentials: true, // Ensures cookies are sent with requests
});

// Auth Endpoints
export const login = (credentials) => api.post('/auth/login', credentials);
export const logout = () => api.post('/auth/logout');

// Admin Endpoints
export const uploadStudents = (formData) => api.post('/admin/upload-students', formData);
export const createExam = (examData) => api.post('/admin/create-exam', examData);
export const fetchResults = () => api.get('/admin/results');
export const fetchAbsentees = () => api.get('/admin/absentees');

// Student Endpoints
export const fetchStudentExam = () => api.get('/student/exam');
export const submitExam = (examData) => api.post('/student/take-exam', examData);
export const fetchStudentResults = () => api.get('/student/results');

export default api;

