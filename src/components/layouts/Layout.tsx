import { ReactNode } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}
const PUBLIC_ROUTES =[
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/new-password',
  '/logout',
  '/404',
  


];



const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);

  if (isPublicRoute) {
    return <>{children}</>;
  }
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Sidebar />
      <Header />
       <div>
       {children}
       </div>
     
    </div>
  );
};

export default Layout;