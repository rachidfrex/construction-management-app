// First, create a reusable Breadcrumb component
// src/components/ui/Breadcrumb.tsx
import { Link } from 'react-router-dom';
import { HiChevronRight } from 'react-icons/hi';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <HiChevronRight className="w-4 h-4" />}
          {item.path ? (
            <motion.div whileHover={{ x: -2 }}>
              <Link 
                to={item.path}
                className="hover:text-gray-900 line-clamp-1 transition-colors"
              >
                {item.label}
              </Link>
            </motion.div>
          ) : (
            <span className="text-gray-900 font-medium line-clamp-1">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;