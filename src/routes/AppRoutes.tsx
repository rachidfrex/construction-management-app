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
import Logout from '../pages/auth/Logout';
import AddConstruction from '../pages/inventory/construction/AddConstruction';
import Sales from '@/pages/sales/sales';
import Layout from '../components/layouts/Layout';

const AppRoutes: React.FC = () => {
  return (
    <Layout>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      {/* auth  */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/logout" element={<Logout />} />
      {/* dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
      {/* projects */}
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/new" element={<NewProject />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />
      <Route path="/projects/:id/edit" element={<EditProject />} />
      <Route path="/projects/:id/timeline" element={<ProjectTimeline />} />
      {/* inventory */}
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/inventory/construction/manage" element={<Construction />} />
      <Route path="/inventory/fertilizers/manage" element={<Fertilizers />} />
      <Route path="/inventory/construction/add" element={<AddConstruction />} />
      {/* Sales */}
      <Route path="/sales" element={<Sales />} />
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} /> 
    </Routes>
    </Layout>
  );
};

export default AppRoutes;