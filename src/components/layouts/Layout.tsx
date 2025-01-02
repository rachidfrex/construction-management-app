import { ReactNode } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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