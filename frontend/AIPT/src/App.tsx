import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import InterviewerHome from './pages/InterviewerHome';
import CandidateHome from './pages/CandidateHome';

const App: React.FC = () => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  const PrivateRoute = ({ children, role }: { children: JSX.Element, role: string }) => {
    if (!token) {
      return <Navigate to="/login" />;
    }

    if (role && userRole !== role) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/interviewer-home" 
        element={
          <PrivateRoute role="interviewer">
            <InterviewerHome />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/candidate-home" 
        element={
          <PrivateRoute role="candidate">
            <CandidateHome />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
}

export default App;
