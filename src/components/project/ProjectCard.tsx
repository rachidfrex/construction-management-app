import React, { useState, useRef, useEffect } from 'react'; // Add React import here
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTranslationContext } from '../../context/TranslationContext';
import { useToast } from '../../context/ToastContext';
import ConfirmationModal from '../ui/ConfirmationModal';
import { 
  HiOutlineEye,
  HiOutlinePencil,   
  HiOutlineCalendar,
  HiOutlineUsers,
  HiOutlineCube,
  HiOutlineDocument,
  HiOutlineArchive,
  HiOutlineTrash,
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiDotsVertical,
} from 'react-icons/hi';

interface Project {
  id: number;
  name: string;
  description: string;
  clientName: string;
  startDate: string;
  endDate: string;
  status: 'In Progress' | 'Completed' | 'Delayed' | 'Canceled';
  type: string;
  team: string[];
  progress: number;
  budget: number;
  materialsUsed: number;
}

interface ProjectCardProps {
  project: Project;
}


export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t } = useTranslation();
  const { direction } = useTranslationContext();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const statusColors = {
    'In Progress': 'bg-yellow-100 text-yellow-800',
    'Completed': 'bg-green-100 text-green-800',
    'Delayed': 'bg-red-100 text-red-800',
    'Canceled': 'bg-gray-100 text-gray-800'
  };

  const menuItems = [
    { 
      label: t('projects.actions.viewDetails'), 
      icon: <HiOutlineEye className="w-4 h-4" />,
      action: () => navigate(`/projects/${project.id}`),
    },
    { 
      label: t('projects.actions.editProject'), 
      icon: <HiOutlinePencil className="w-4 h-4" />,
      action: () => navigate(`/projects/${project.id}/edit`),
    },
    { 
      label: t('projects.actions.timeline'), 
      icon: <HiOutlineCalendar className="w-4 h-4" />,
      action: () => navigate(`/projects/${project.id}/timeline`),
    },
    { 
      label: t('projects.actions.team'), 
      icon: <HiOutlineUsers className="w-4 h-4" />,
      action: () => navigate(`/projects/${project.id}/team`),
    },
    { 
      label: t('projects.actions.materials'), 
      icon: <HiOutlineCube className="w-4 h-4" />,
      action: () => navigate(`/projects/${project.id}/materials`),
    },
    { 
      label: t('projects.actions.documents'), 
      icon: <HiOutlineDocument className="w-4 h-4" />,
      action: () => navigate(`/projects/${project.id}/documents`),
    },
    { 
      label: t('projects.actions.archive'), 
      icon: <HiOutlineArchive className="w-4 h-4" />,
      action: () => {
        setShowArchiveModal(true);
        setShowMenu(false);
      },
      className: 'text-yellow-600 hover:text-yellow-700',
    },
    { 
      label: t('projects.actions.delete'), 
      icon: <HiOutlineTrash className="w-4 h-4" />,
      action: () => {
        setShowDeleteModal(true);
        setShowMenu(false);
      },
      className: 'text-red-600 hover:text-red-700',
    },
  ];

  const handleArchiveProject = () => {
    showToast('success', t('projects.messages.archived'));
    setShowMenu(false);
  };

  const handleDeleteProject = () => {
    showToast('success', t('projects.messages.deleted'));
    setShowMenu(false);
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{project.name}</h3>
          <p className="text-sm text-gray-500">{t('projects.client')}: {project.clientName}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xxs font-medium ${statusColors[project.status]}`}>
            {t(`projects.status.${project.status.toLowerCase().replace(' ', '')}`)}
          </span>
          <div className="relative" ref={menuRef}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <HiDotsVertical className="w-5 h-5 text-gray-400" />
            </motion.button>

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100"
                >
                  {menuItems.map((item, index) => (
                    <React.Fragment key={index}>
                      {index === menuItems.length - 2 && (
                        <div className="h-px bg-gray-200 my-1" />
                      )}
                      <motion.button
                        whileHover={{ x: direction === 'rtl' ? -2 : 2 }}
                        onClick={item.action}
                        className={`w-full px-4 py-2 text-sm text-left flex items-center gap-2 hover:bg-gray-50 transition-colors ${item.className || 'text-gray-700'}`}
                      >
                        {item.icon}
                        {item.label}
                      </motion.button>
                    </React.Fragment>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-gray-500 text-xs">
          <HiOutlineCalendar className="w-4 h-4 mr-2" />
          <span>{new Date(project.startDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-gray-500 text-xs">
          <HiOutlineClock className="w-4 h-4 mr-2" />
          <span>{new Date(project.endDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-gray-500 text-xs">
          <HiOutlineCurrencyDollar className="w-4 h-4 mr-2" />
          <span>${project.budget.toLocaleString()}</span>
        </div>
        <div className="flex items-center text-gray-500 text-xs">
          <HiOutlineUsers className="w-4 h-4 mr-2" />
          <span>{project.team.length} {t('projects.members')}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="font-medium text-gray-600">{t('projects.progress')}</span>
          <span className="font-medium text-gray-900">{project.progress}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`h-full rounded-full ${
              project.progress >= 90 ? 'bg-green-500' :
              project.progress >= 50 ? 'bg-blue-500' :
              'bg-yellow-500'
            }`}
          />
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          handleDeleteProject();
          setShowDeleteModal(false);
        }}
        title={t('projects.modals.deleteTitle')}
        message={t('projects.modals.deleteMessage')}
        type="danger"
        confirmText={t('projects.modals.deleteConfirm')}
      />

      <ConfirmationModal
        isOpen={showArchiveModal}
        onClose={() => setShowArchiveModal(false)}
        onConfirm={() => {
          handleArchiveProject();
          setShowArchiveModal(false);
        }}
        title={t('projects.modals.archiveTitle')}
        message={t('projects.modals.archiveMessage')}
        type="warning"
        confirmText={t('projects.modals.archiveConfirm')}
      />
    </motion.div>
  );
};

export default ProjectCard;