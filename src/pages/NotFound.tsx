import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';


const PlugCable = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute left-1/2 transform -translate-x-1/2 "
      style={{ top: '5%' }} // Moved higher up
    >
      <motion.div
        animate={{ 
          y: [0, 15, 0],
          rotate: [-3, 3, -3]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        {/* Cable SVG */}
        <svg width="200" height="200" viewBox="0 0 200 250">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
            {/* Add shadow filter */}
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#00000033"/>
            </filter>
          </defs>
  
          {/* Animated Cable Path */}
          <motion.path
            d="M100,0 Q100,100 100,200"
            stroke="url(#gradient)"
            strokeWidth="6"
            fill="none"
            filter="url(#shadow)"
            animate={{
              d: [
                "M100,0 Q70,100 100,200",
                "M100,0 Q130,100 100,200",
                "M100,0 Q70,100 100,200"
              ]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
  
          {/* Socket at top */}
          <rect x="85" y="0" width="30" height="20" fill="#374151" rx="2"/>
          
          {/* Plug */}
          {/* <motion.g
            animate={{
              rotate: [-5, 5, -5]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ transformOrigin: '100px 200px' }}
          >
            <rect x="80" y="200" width="40" height="60" rx="5" fill="url(#gradient)" filter="url(#shadow)"/>
            <rect x="90" y="260" width="20" height="20" fill="url(#gradient)" filter="url(#shadow)"/>
            <circle cx="95" cy="220" r="5" fill="white" opacity="0.5"/>
            <circle cx="105" cy="220" r="5" fill="white" opacity="0.5"/>
          </motion.g> */}
          <motion.g
  animate={{
    rotate: [-5, 5, -5]
  }}
  transition={{
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }}
  style={{ transformOrigin: '100px 200px' }}
>
  {/* Main plug body */}
  <rect x="80" y="200" width="40" height="60" rx="5" fill="url(#gradient)" filter="url(#shadow)"/>
  <rect x="90" y="260" width="20" height="20" fill="url(#gradient)" filter="url(#shadow)"/>
  
  {/* Indicator lights */}
  <circle cx="95" cy="220" r="5" fill="white" opacity="0.5"/>
  <circle cx="105" cy="220" r="5" fill="white" opacity="0.5"/>

  {/* Metal prongs - moved to bottom */}
  <motion.g
    animate={{
      y: [-2, 2, -2]
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 0.5
    }}
  >
    {/* Left prong */}
    <rect 
      x="87" 
      y="275" /* Adjusted y position to be at the bottom */
      width="8" 
      height="25" 
      rx="2"
      fill="#D1D5DB"
      filter="url(#shadow)"
    />
    {/* Right prong */}
    <rect 
      x="105" 
      y="275" /* Adjusted y position to be at the bottom */
      width="8" 
      height="25" 
      rx="2"
      fill="#D1D5DB"
      filter="url(#shadow)"
    />
    
    {/* Metallic shine effects */}
    <rect 
      x="89" 
      y="277" /* Adjusted y position */
      width="4" 
      height="21" 
      rx="1"
      fill="white"
      opacity="0.3"
    />
    <rect 
      x="107" 
      y="277" /* Adjusted y position */
      width="4" 
      height="21" 
      rx="1"
      fill="white"
      opacity="0.3"
    />
  </motion.g>
</motion.g>
        </svg>
      </motion.div>
    </motion.div>
  );


const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="max-w-3xl mx-auto text-center">
      <PlugCable />

        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <motion.div
            animate={{ 
              rotate: [0, -2, 2, -2, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400"
          >
            404
          </motion.div>
          
          {/* Animated Circles */}
          <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-green-200 opacity-20"
                style={{
                  width: Math.random() * 100 + 50,
                  height: Math.random() * 100 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.random() * 50 - 25, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8 space-y-4"
        >
          <h1 className="text-4xl font-bold text-gray-900">Page Not Found</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Oops! The page you're looking for seems to have wandered off. Let's get you back on track.
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8"
        >
          <Link to="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium inline-flex items-center gap-2 hover:bg-green-700 transition-colors"
            >
              <HiHome className="w-5 h-5" />
              Back to Home
            </motion.button>
          </Link>
        </motion.div>

        
        {/* Animation de zebe */}
            <motion.div
            className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-green-500 to-transparent overflow-hidden"
            animate={{
                opacity: [0.5, 1, 0.5],
                scaleX: [0.8, 1.2, 0.8],
            }}
            style={{
                position: 'fixed', // Change to fixed positioning
                bottom: 0,
                left: 0,
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            />
      </div>
    </div>
  );
};

export default NotFound;