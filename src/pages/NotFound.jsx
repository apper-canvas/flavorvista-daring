import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getIcon } from '../utils/iconUtils';

export default function NotFound() {
  const HomeIcon = getIcon('home');
  const ChefHatIcon = getIcon('chef-hat');
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="p-6 bg-primary/10 dark:bg-primary/20 rounded-full">
            <ChefHatIcon className="w-20 h-20 text-primary" />
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-6xl md:text-8xl font-extrabold text-surface-900 dark:text-white"
        >
          404
        </motion.h1>
        
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 text-2xl md:text-3xl font-bold text-surface-800 dark:text-surface-200"
        >
          Recipe Not Found
        </motion.h2>
        
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4 text-surface-600 dark:text-surface-400 text-lg max-w-md mx-auto"
        >
          Oops! It seems this culinary creation has gone missing from our menu.
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10"
        >
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <p className="text-surface-500 dark:text-surface-400">
            Looking for inspiration? Try one of our 
            <Link to="/" className="text-primary dark:text-primary-light ml-1 hover:underline">
              featured recipes
            </Link>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}