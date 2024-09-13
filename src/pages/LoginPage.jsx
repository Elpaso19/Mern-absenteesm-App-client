import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Switch } from '@headlessui/react';

const LoginPage = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [MATRIC_NUMBER, setMATRIC_NUMBER] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (isAdmin) {
        if (!username || !password) {
          toast.error('Please provide valid admin credentials');
          return;
        }
        await login({ username, password });
        navigate('/admin/dashboard');
      } else {
        if (!MATRIC_NUMBER) {
          toast.error('Please provide a valid matric number');
          return;
        }
        await login({ MATRIC_NUMBER });
        navigate('/student');
      }
    } catch (error) {
      toast.error('Login failed, please try again');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-md shadow">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <Switch.Group>
          <div className="flex items-center justify-center mb-4">
            <Switch.Label className="mr-4">Student</Switch.Label>
            <Switch
              checked={isAdmin}
              onChange={setIsAdmin}
              className={`${isAdmin ? 'bg-indigo-600' : 'bg-gray-300'} relative inline-flex items-center h-6 rounded-full w-11`}
            >
              <span className="sr-only">Toggle Login Type</span>
              <span
                className={`${isAdmin ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full`}
              />
            </Switch>
            <Switch.Label className="ml-4">Admin</Switch.Label>
          </div>
        </Switch.Group>
        <form onSubmit={handleLogin} className="space-y-4">
          {isAdmin ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700">Matric Number</label>
              <input
                type="text"
                value={MATRIC_NUMBER}
                onChange={(e) => setMATRIC_NUMBER(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
