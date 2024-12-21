// src/pages/dashboard/ProjectTimeline.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiOutlineArrowLeft, 
  HiOutlinePlusCircle,
  HiOutlineCalendar,
  HiOutlineCheck,
  HiOutlineClock,
  HiOutlineFlag
} from 'react-icons/hi';
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';

interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  duration: string;
}

const ProjectTimeline = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockEvents: TimelineEvent[] = [
          {
            id: 1,
            title: 'Project Initiation',
            date: '2024-01-15',
            status: 'completed',
            description: 'Initial project planning and team allocation',
            assignee: 'John Doe',
            priority: 'high',
            duration: '2 weeks'
          },
          // Add more mock events...
        ];
        
        setTimelineEvents(mockEvents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching timeline:', error);
      }
    };

    fetchTimeline();
  }, [id]);

  const getStatusColor = (status: TimelineEvent['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-yellow-500';
      case 'upcoming':
        return 'bg-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <main className="lg:ml-64 mt-5 pt-16 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header with Back Button */}
          <div className="flex items-center gap-4 mb-8">
            <motion.button
              whileHover={{ x: -4 }}
              onClick={() => navigate(`/projects/${id}`)}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <HiOutlineArrowLeft className="w-6 h-6 text-gray-600" />
            </motion.button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Project Timeline</h1>
              <p className="text-gray-600 text-sm mt-1">Track project milestones and progress</p>
            </div>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Timeline Events */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Timeline Events</h2>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
                  >
                    <HiOutlinePlusCircle className="w-5 h-5" />
                    Add Event
                  </motion.button>
                </div>

                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

                  {/* Timeline Events */}
                  <div className="space-y-8">
                    {timelineEvents.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-10"
                      >
                        {/* Event Dot */}
                        <div className={`absolute left-3 w-3 h-3 -translate-x-1/2 rounded-full ${getStatusColor(event.status)}`} />
                        
                        {/* Event Card */}
                        <div className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                              <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium
                              ${event.priority === 'high' ? 'bg-red-100 text-red-700' :
                                event.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'}`}
                            >
                              {event.priority}
                            </span>
                          </div>
                          
                          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <HiOutlineCalendar className="w-4 h-4" />
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <HiOutlineClock className="w-4 h-4" />
                              <span>{event.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <HiOutlineFlag className="w-4 h-4" />
                              <span>{event.status}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Statistics */}
            <div className="lg:col-span-4 space-y-6">
              {/* Progress Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Completed</span>
                      <span className="font-medium text-gray-900">65%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '65%' }}
                        className="h-2 bg-green-500 rounded-full"
                      />
                    </div>
                  </div>
                  
                  {/* Add more statistics here */}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  {/* Add action buttons */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectTimeline;