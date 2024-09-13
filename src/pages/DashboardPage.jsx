import React, { useState } from 'react';
import StudentUpload from '../components/StudentUpload';
import CreateExam from '../components/CreateExam';
import ViewResults from '../components/ViewResults';
import ManageAbsentees from '../components/ManageAbsentees';
import BackButton from '../components/BackButton'; 

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('upload');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'upload':
        return <StudentUpload />;
      case 'createExam':
        return <CreateExam />;
      case 'viewResults':
        return <ViewResults />;
      case 'manageAbsentees':
        return <ManageAbsentees />;
      default:
        return <StudentUpload />;
    }
  };

  return (
      <div className="p-6">
          <BackButton /> 
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-4 py-2 rounded-md ${activeTab === 'upload' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
        >
          Upload Students
        </button>
        <button
          onClick={() => setActiveTab('createExam')}
          className={`px-4 py-2 rounded-md ${activeTab === 'createExam' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
        >
          Create Exam
        </button>
        <button
          onClick={() => setActiveTab('viewResults')}
          className={`px-4 py-2 rounded-md ${activeTab === 'viewResults' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
        >
          View Results
        </button>
        <button
          onClick={() => setActiveTab('manageAbsentees')}
          className={`px-4 py-2 rounded-md ${activeTab === 'manageAbsentees' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
        >
          Manage Absentees
        </button>
      </div>
      <div>{renderTabContent()}</div>
    </div>
  );
};

export default DashboardPage;
