import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

// Add auth token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('nems_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password });

export const register = (data: any) =>
  api.post('/auth/register', data);

// Module 1: Master Reference Data
export const getRegions = () => api.get('/regions');
export const getExams = () => api.get('/exams');
export const createExam = (data: any) => api.post('/exams', data);
export const getExamCenters = () => api.get('/exam-centers');
export const getRooms = () => api.get('/rooms');

// Module 2: Students & Registrations
export const getStudents = () => api.get('/students');
export const getStudent = (id: number) => api.get(`/students/${id}`);
export const getRegistrations = () => api.get('/registrations');

// Module 3: Scheduling
export const getSchedules = () => api.get('/schedules');
export const createSchedule = (data: any) => api.post('/schedules', data);
export const getSeatAllocations = () => api.get('/seat-allocations');

// Module 4: Invigilators
export const getInvigilators = () => api.get('/invigilators');

// Module 5: Attendance
export const getAttendance = () => api.get('/attendance');
export const getAttendanceStats = () => api.get('/attendance/stats');

// Module 6: Evaluation
export const getEvaluators = () => api.get('/evaluators');
export const getEvaluations = () => api.get('/evaluations');

// Module 7: Results
export const getResults = () => api.get('/results');
export const getResultsByStudent = (id: number) => api.get(`/results/student/${id}`);
export const createResult = (data: any) => api.post('/results', data);

// Module 8: Grievances
export const getGrievances = () => api.get('/grievances');
export const createGrievance = (data: any) => api.post('/grievances', data);
export const resolveGrievance = (id: number, resolution: string) =>
  api.put(`/grievances/${id}/resolve`, resolution);

// Module 9: Security
export const getMalpracticeReports = () => api.get('/malpractice-reports');

export default api;
