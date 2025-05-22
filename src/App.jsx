import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getIcon } from './utils/iconUtils';
import Home from './pages/Home';

// Auth Components
const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showBiometric, setShowBiometric] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState('username'); // 'username' or 'phone'
  const [phoneVerification, setPhoneVerification] = useState({ show: false, phone: '', otp: ['', '', '', ''] });
  
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('isAuthenticated', 'true');
      window.location.href = '/dashboard';
    }, 1000);
  };

  const handlePhoneLogin = (e) => {
    e.preventDefault();
    if (!phoneVerification.phone) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    setLoading(true);
    // Simulate sending OTP
    setTimeout(() => {
      setLoading(false);
      setPhoneVerification({ ...phoneVerification, show: true });
      toast.success("OTP sent to your phone number");
    }, 1000);
  };
  
  const handleOtpChange = (index, value) => {
    // Only allow digits
    if (value && !/^\d+$/.test(value)) return;
    
    const newOtp = [...phoneVerification.otp];
    newOtp[index] = value;
    setPhoneVerification({ ...phoneVerification, otp: newOtp });
    
    // Auto-focus next input
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };
  
  const handleVerifyOtp = () => {
    const otpValue = phoneVerification.otp.join('');
    if (otpValue.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP");
      return;
    }
    
    setLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('isAuthenticated', 'true');
      window.location.href = '/dashboard';
    }, 1000);
  };
  
  const PhoneLogin = () => (
    <form onSubmit={handlePhoneLogin}>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2">Phone Number</label>
        <input 
          type="tel" 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
          placeholder="Enter your registered phone number"
          value={phoneVerification.phone}
          onChange={(e) => setPhoneVerification({...phoneVerification, phone: e.target.value})}
          required
        />
      </div>
      
      <button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex justify-center items-center"
        disabled={loading}
      >
        {loading ? (
          <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : 'Send Verification Code'}
      </button>
    </form>
  );
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-700 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">SecureBank</h1>
          <p className="text-gray-600 mt-2">Welcome to your secure banking portal</p>
        </div>
        
        {/* Login Method Toggle */}
        <div className="flex border border-gray-300 rounded-lg overflow-hidden mb-6">
          <button
            type="button"
            className={`flex-1 py-2 text-center font-medium ${loginMethod === 'username' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setLoginMethod('username')}
          >
            Username
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-center font-medium ${loginMethod === 'phone' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setLoginMethod('phone')}
          >
            Phone Number
          </button>
        </div>

        {/* Phone Verification Modal */}
        {phoneVerification.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-sm w-full">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 text-blue-600">
                  {getIcon('Shield', { size: 64 })}
                </div>
                <h3 className="text-xl font-bold mb-2">Enter Verification Code</h3>
                <p className="text-gray-600 mb-6">
                  A 4-digit code has been sent to {phoneVerification.phone}
                </p>
                
                <div className="flex justify-center gap-2 mb-6">
                  {[0, 1, 2, 3].map((index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg"
                      value={phoneVerification.otp[index]}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={handleVerifyOtp}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex justify-center items-center mb-4"
                  disabled={loading}
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : 'Verify'}
                </button>
                
                <div className="text-sm text-gray-600">
                  Didn't receive the code? <button className="text-blue-600 hover:text-blue-800">Resend</button>
                </div>
                
                <button 
                  onClick={() => setPhoneVerification({ ...phoneVerification, show: false })}
                  className="mt-6 text-blue-600 hover:text-blue-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        
        {loginMethod === 'username' ? (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Username</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Enter your username"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                required
              />
              <div className="flex justify-end mt-2">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">Forgot password?</a>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Sign In'}
            </button>
          </form>
        ) : (
          <PhoneLogin />
        )}
        
        <div className="mt-6">
          <button 
            onClick={() => setShowBiometric(true)}
            className="w-full border border-blue-600 text-blue-600 font-medium py-3 px-4 rounded-lg transition duration-300 hover:bg-blue-50 flex items-center justify-center"
          >
            <span className="mr-2">{getIcon('Fingerprint')}</span>
            Sign in with Biometrics
          </button>
        </div>
        
        {showBiometric && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-sm w-full">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 text-blue-600">
                  {getIcon('Fingerprint', { size: 64 })}
                </div>
                <h3 className="text-xl font-bold mb-2">Biometric Authentication</h3>
                <p className="text-gray-600 mb-6">Place your finger on the scanner to verify your identity</p>
                <div className="animate-pulse text-blue-600 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16 mx-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <button 
                  onClick={() => setShowBiometric(false)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Main Layout Component
const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-blue-900 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between">
          {isSidebarOpen ? (
            <h1 className="text-xl font-bold">SecureBank</h1>
          ) : (
            <span className="text-xl font-bold">SB</span>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white">
            {getIcon(isSidebarOpen ? 'ChevronLeft' : 'ChevronRight')}
          </button>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <a href="/dashboard" className="flex items-center p-2 rounded-lg hover:bg-blue-800">
                <span>{getIcon('LayoutDashboard')}</span>
                {isSidebarOpen && <span className="ml-3">Dashboard</span>}
              </a>
            </li>
            <li>
              <a href="/accounts" className="flex items-center p-2 rounded-lg hover:bg-blue-800">
                <span>{getIcon('Wallet')}</span>
                {isSidebarOpen && <span className="ml-3">Accounts</span>}
              </a>
            </li>
            <li>
              <a href="/transfers" className="flex items-center p-2 rounded-lg hover:bg-blue-800">
                <span>{getIcon('ArrowLeftRight')}</span>
                {isSidebarOpen && <span className="ml-3">Transfers</span>}
              </a>
            </li>
            <li>
              <a href="/loans" className="flex items-center p-2 rounded-lg hover:bg-blue-800">
                <span>{getIcon('Building')}</span>
                {isSidebarOpen && <span className="ml-3">Loans</span>}
              </a>
            </li>
            <li>
              <a href="/support" className="flex items-center p-2 rounded-lg hover:bg-blue-800">
                <span>{getIcon('LifeBuoy')}</span>
                {isSidebarOpen && <span className="ml-3">Support</span>}
              </a>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-blue-800">
          <button 
            onClick={handleLogout}
            className="flex items-center p-2 rounded-lg hover:bg-blue-800 w-full"
          >
            <span>{getIcon('LogOut')}</span>
            {isSidebarOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Welcome, User</h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">{getIcon('Bell')}</button>
            <button className="p-2 rounded-full hover:bg-gray-100">{getIcon('UserCircle')}</button>
          </div>
        </header>
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
import { motion } from 'framer-motion';
import { getIcon } from './utils/iconUtils';

// Pages
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><MainLayout><Home /></MainLayout></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
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