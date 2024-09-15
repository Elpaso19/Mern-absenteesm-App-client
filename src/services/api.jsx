import axios from 'axios';
import { toast } from 'react-toastify';

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  withCredentials: true, // Ensures cookies are sent with requests
});

// Add Request Interceptor: Automatically add Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add Response Interceptor: Handle 401 Unauthorized responses
api.interceptors.response.use(
  (response) => response, // Pass through the successful response
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized, clear the token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
      toast.error('Session expired, please log in again');
    }
    return Promise.reject(error); // Return the error for further handling
  }
);

// Auth Endpoints
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);

    // Assuming the token is returned in the response
    const token = response.data.token;

    // Store token in localStorage
    localStorage.setItem('token', token);

    // Set the Authorization header for future requests
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return response;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token'); // Clear the token
  return api.post('/auth/logout');
};

// Admin Endpoints (Protected)
export const uploadStudents = (formData) => api.post('/admin/upload-students', formData);
export const createExam = (examData) => api.post('/admin/create-exam', examData);
export const fetchResults = async () => {
  try {
    const response = await api.get('/admin/results');
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      toast.error('Unauthorized: Please log in again');
      window.location.href = '/login';
    } else {
      toast.error('Failed to fetch results');
    }
    throw error;
  }
};

export const fetchAbsentees = () => api.get('/admin/absentees');

// Student Endpoints (Protected)
export const fetchStudentExam = () => api.get('/student/exam');
export const submitExam = (examData) => api.post('/student/take-exam', examData);
export const fetchStudentResults = () => api.get('/student/results');

export default api;
