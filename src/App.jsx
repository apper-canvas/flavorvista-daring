import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { getIcon } from './utils/iconUtils';

// Pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// Components
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const MoonIcon = getIcon('moon');
  const SunIcon = getIcon('sun');
  const MenuIcon = getIcon('menu');
  const XIcon = getIcon('x');
  const SearchIcon = getIcon('search');
  
  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 shadow-sm backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                FlavorVista
              </span>
            </a>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-surface-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search recipes..." 
                className="pl-10 pr-4 py-2 w-64 rounded-full border border-surface-300 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <a href="/" className="px-3 py-2 text-surface-700 dark:text-surface-200 hover:text-primary dark:hover:text-primary-light rounded-md">Home</a>
            <a href="#categories" className="px-3 py-2 text-surface-700 dark:text-surface-200 hover:text-primary dark:hover:text-primary-light rounded-md">Categories</a>
            <a href="#latest" className="px-3 py-2 text-surface-700 dark:text-surface-200 hover:text-primary dark:hover:text-primary-light rounded-md">Latest</a>
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
          </div>
          
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
            
            <button
              onClick={toggleDarkMode}
              className="ml-2 p-2 rounded-full text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }} 
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800"
        >
          <div className="px-4 pt-2 pb-4 space-y-1">
            <div className="relative mb-3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-surface-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search recipes..." 
                className="pl-10 pr-4 py-2 w-full rounded-full border border-surface-300 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <a 
              href="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#categories" 
              className="block px-3 py-2 rounded-md text-base font-medium text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </a>
            <a 
              href="#latest" 
              className="block px-3 py-2 rounded-md text-base font-medium text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Latest
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

// Footer component
const Footer = () => {
  const GithubIcon = getIcon('github');
  const TwitterIcon = getIcon('twitter');
  const InstagramIcon = getIcon('instagram');
  
  return (
    <footer className="bg-white dark:bg-surface-900 border-t border-surface-200 dark:border-surface-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-surface-900 dark:text-surface-100">FlavorVista</h3>
            <p className="text-surface-600 dark:text-surface-400">
              Share and discover delicious recipes from around the world. Join our community of food enthusiasts!
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-surface-900 dark:text-surface-100">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#breakfast" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light">
                  Breakfast
                </a>
              </li>
              <li>
                <a href="#lunch" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light">
                  Lunch
                </a>
              </li>
              <li>
                <a href="#dinner" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light">
                  Dinner
                </a>
              </li>
              <li>
                <a href="#desserts" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light">
                  Desserts
                </a>
              </li>
              <li>
                <a href="#healthy" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light">
                  Healthy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-surface-900 dark:text-surface-100">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light">
                <TwitterIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light">
                <InstagramIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light">
                <GithubIcon className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-surface-600 dark:text-surface-400">
                Subscribe to our newsletter for the latest recipes!
              </p>
              <div className="mt-2 flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-4 py-2 rounded-l-lg border border-surface-300 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="px-4 py-2 bg-primary text-white rounded-r-lg hover:bg-primary-dark">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-surface-200 dark:border-surface-800 text-center text-surface-600 dark:text-surface-400">
          <p>© 2023 FlavorVista. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <Footer />
      
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="dark:bg-surface-800 dark:text-surface-100"
      />
    </div>
  );
}

export default App;