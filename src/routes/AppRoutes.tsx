import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import NewPassword from '../pages/auth/NewPassword';
import Dashboard from '../pages/dashboard/Dashboard';
import NotFound from '../pages/NotFound';
import Projects from  '../pages/dashboard/Projects'
import NewProject from '../pages/dashboard/NewProject';
import ProjectDetails from '../pages/dashboard/ProjectDetails';
import EditProject from '../pages/dashboard/EditProject';
import ProjectTimeline from '../pages/dashboard/ProjectTimeline';
import Inventory from '../pages/inventory/Inventory';
import Construction from '../pages/inventory/construction/Construction';
import Fertilizers from  '../pages/inventory/Fertilizers/Fertilizers';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/new" element={<NewProject />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />
      <Route path="/projects/:id/edit" element={<EditProject />} />
      <Route path="/projects/:id/timeline" element={<ProjectTimeline />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/inventory/construction/manage" element={<Construction />} />
      <Route path="/inventory/fertilizers/manage" element={<Fertilizers />} />

      <Route path="*" element={<NotFound />} /> {/* Add this line for 404 route */}
    </Routes>
  );
};

export default AppRoutes;