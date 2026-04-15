import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdmitCardPage from './pages/AdmitCardPage';
import ViewResultPage from './pages/ViewResultPage';
import RaiseGrievancePage from './pages/RaiseGrievancePage';
import ManageStudentsPage from './pages/ManageStudentsPage';
import ScheduleExamsPage from './pages/ScheduleExamsPage';
import AssignRoomsPage from './pages/AssignRoomsPage';
import PublishResultsPage from './pages/PublishResultsPage';

interface UserData {
  token: string;
  email: string;
  fullName: string;
  role: string;
}

function App() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('nems_user');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const handleLogin = (userData: UserData) => {
    localStorage.setItem('nems_token', userData.token);
    localStorage.setItem('nems_user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('nems_token');
    localStorage.removeItem('nems_user');
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          user ? <Navigate to={user.role === 'ADMIN' ? '/admin' : '/student'} /> :
          <LoginPage onLogin={handleLogin} />
        } />
        <Route path="/register" element={
          user ? <Navigate to="/student" /> :
          <RegisterPage onLogin={handleLogin} />
        } />

        {/* Student Routes */}
        <Route path="/student" element={
          user && user.role === 'STUDENT' ?
          <StudentDashboard user={user} onLogout={handleLogout} /> :
          <Navigate to="/login" />
        } />
        <Route path="/student/admit-card" element={
          user ? <AdmitCardPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
        } />
        <Route path="/student/results" element={
          user ? <ViewResultPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
        } />
        <Route path="/student/grievance" element={
          user ? <RaiseGrievancePage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
        } />

        {/* Admin Routes */}
        <Route path="/admin" element={
          user && user.role === 'ADMIN' ?
          <AdminDashboard user={user} onLogout={handleLogout} /> :
          <Navigate to="/login" />
        } />
        <Route path="/admin/students" element={
          user && user.role === 'ADMIN' ?
          <ManageStudentsPage user={user} onLogout={handleLogout} /> :
          <Navigate to="/login" />
        } />
        <Route path="/admin/schedule" element={
          user && user.role === 'ADMIN' ?
          <ScheduleExamsPage user={user} onLogout={handleLogout} /> :
          <Navigate to="/login" />
        } />
        <Route path="/admin/rooms" element={
          user && user.role === 'ADMIN' ?
          <AssignRoomsPage user={user} onLogout={handleLogout} /> :
          <Navigate to="/login" />
        } />
        <Route path="/admin/results" element={
          user && user.role === 'ADMIN' ?
          <PublishResultsPage user={user} onLogout={handleLogout} /> :
          <Navigate to="/login" />
        } />

        {/* Default */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
