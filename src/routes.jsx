import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './components/admin/AdminDashboard';
import UploadVideo from './components/admin/UploadVideo';
import CreateTest from './components/admin/CreateTest';
import ViewStudents from './components/admin/ViewStudents';
import ViewStudentResults from './components/admin/ViewStudentResults';
import StudentDashboard from './components/student/StudentDashboard';
import ViewCourses from './components/student/ViewCourses';
import ViewCourseVideos from './components/student/ViewCourseVideos';
import AttendTest from './components/student/AttendTest';
import ViewTestResults from './components/student/ViewTestResults';
import StudentProfile from './components/student/StudentProfile';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import TestingPage from './components/TestingPage';

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/upload-video" element={<UploadVideo />} />
      <Route path="/admin/create-test" element={<CreateTest />} />
      <Route path="/admin/view-students" element={<ViewStudents />} />
      <Route path="/admin/view-student-results/:studentId" element={<ViewStudentResults />} />

      {/* Student Routes */}
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/view-courses" element={<ViewCourses />} />
      <Route path="/student/view-course-videos/:courseId" element={<ViewCourseVideos />} />
      <Route path="/student/attend-test/:courseId/:testId" element={<AttendTest />} />
      <Route path="/student/view-test-results" element={<ViewTestResults />} />
      <Route path="/student/profile" element={<StudentProfile />} />

      {/* Testing Page */}
      <Route path="/testing" element={<TestingPage />} />

      {/* Default Route */}
      <Route path="/" element={<Navigate to="/testing" />} />
    </Routes>
  );
};

export default RoutesConfig;
