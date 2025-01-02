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
  const isNotFoundRoute = !PUBLIC_ROUTES.includes(location.pathname) && 
                         !location.pathname.startsWith('/dashboard') &&
                         !location.pathname.startsWith('/projects') &&
                         !location.pathname.startsWith('/inventory');

  // Return bare layout for public routes and 404
  if (isPublicRoute || isNotFoundRoute) {
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