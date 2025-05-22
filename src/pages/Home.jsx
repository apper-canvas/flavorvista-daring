import React, { useState, useEffect } from 'react';
import { getIcon } from '../utils/iconUtils';
import { BankingFeature } from '../components/MainFeature';
import MainFeature from '../components/MainFeature';
import { motion } from 'framer-motion';
// Account card component
const AccountCard = ({ account, onViewDetails }) => {
  const { type, number, balance, currency } = account;
  
  const getTypeIcon = (type) => {
    switch(type.toLowerCase()) {
      case 'savings':
        return getIcon('PiggyBank', { size: 20 });
      case 'current':
        return getIcon('Wallet', { size: 20 });
      case 'loan':
        return getIcon('Building', { size: 20 });
      case 'gold loan':
        return getIcon('Star', { size: 20 });
      default:
        return getIcon('CreditCard', { size: 20 });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-blue-50 text-blue-600 mr-3">
            {getTypeIcon(type)}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{type} Account</h3>
            <p className="text-xs text-gray-500">•••• {number.slice(-4)}</p>
          </div>
        </div>
        <button 
          onClick={() => onViewDetails(account)}
          className="text-blue-600 hover:text-blue-800"
        >
          {getIcon('ChevronRight', { size: 18 })}
        </button>
      </div>
      
      <div className="mt-2">
        <span className="text-xs text-gray-500">Available Balance</span>
        <p className="text-xl font-bold text-gray-900">{currency} {balance.toLocaleString()}</p>
      </div>
    </div>
  );
};

// Transaction item component
const TransactionItem = ({ transaction }) => {
  const { title, amount, date, type, category } = transaction;

  const getCategoryIcon = (category) => {
    switch(category.toLowerCase()) {
      case 'transfer':
        return getIcon('ArrowLeftRight', { size: 18 });
      case 'deposit':
        return getIcon('TrendingUp', { size: 18 });
      case 'withdrawal':
        return getIcon('TrendingDown', { size: 18 });
      case 'payment':
        return getIcon('CreditCard', { size: 18 });
      case 'loan':
        return getIcon('Building', { size: 18 });
      default:
        return getIcon('DollarSign', { size: 18 });
    }
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100">
      <div className="flex items-center">
        <div className={`p-2 rounded-full mr-3 ${
          type === 'credit' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
        }`}>
          {getCategoryIcon(category)}
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{title}</h4>
          <p className="text-xs text-gray-500">{new Date(date).toLocaleDateString()}</p>
        </div>
      </div>
      <p className={`font-medium ${
        type === 'credit' ? 'text-green-600' : 'text-red-600'
      }`}>
        {type === 'credit' ? '+' : '-'} ₹{amount.toLocaleString()}
      </p>
    </div>
  );
};

// Home (Dashboard) component
const Home = () => {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  
  // Mock data loading effect
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAccounts([
        {
          id: 1,
          type: 'Savings',
          number: '50001234567',
          balance: 125000.00,
          currency: '₹',
          interestRate: 3.5,
          transactions: []
        },
        {
          id: 2,
          type: 'Current',
          number: '10009876543',
          balance: 75000.00,
          currency: '₹',
          transactions: []
        },
        {
          id: 3,
          type: 'Loan',
          number: '30001598742',
          balance: 500000.00,
          currency: '₹',
          interestRate: 8.5,
          dueDate: '2025-08-15',
          transactions: []
        }
      ]);
      
      setTransactions([
        {
          id: 1,
          title: 'Salary Deposit',
          amount: 50000.00,
          date: '2023-08-01',
          type: 'credit',
          category: 'deposit',
          accountId: 1
        },
        {
          id: 2,
          title: 'Rent Payment',
          amount: 15000.00,
          date: '2023-08-02',
          type: 'debit',
          category: 'payment',
          accountId: 2
        },
        {
          id: 3,
          title: 'Grocery Shopping',
          amount: 2500.00,
          date: '2023-08-03',
          type: 'debit',
          category: 'payment',
          accountId: 2
        },
        {
          id: 4,
          title: 'Transfer to Savings',
          amount: 10000.00,
          date: '2023-08-04',
          type: 'debit',
          category: 'transfer',
          accountId: 2
        },
        {
          id: 5,
          title: 'Loan EMI Payment',
          amount: 12500.00,
          date: '2023-08-05',
          type: 'debit',
          category: 'loan',
          accountId: 1
        }
      ]);
      
      setLoading(false);
    }, 1500);
  }, []);
  
  const handleViewAccountDetails = (account) => {
    setSelectedAccount(account);
    setShowAccountDetails(true);
  };
  
  const closeAccountDetails = () => {
    setShowAccountDetails(false);
    setSelectedAccount(null);
  };
  
  // Handler for loan application
  const handleLoanApplication = (type) => {
    alert(`Navigating to ${type} loan application form`);
    // In a real implementation, this would navigate to the loan application page
    // window.location.href = `/loans/apply?type=${type}`;
  };
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
    <div className="space-y-8">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading your financial information...</p>
        </div>
      ) : (
        <>
          {/* Account Overview Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">My Accounts</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {accounts.map(account => (
                <AccountCard 
                  key={account.id} 
                  account={account} 
                  onViewDetails={handleViewAccountDetails}
                />
              ))}
              
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 flex flex-col justify-center items-center text-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-3">
                  {getIcon('PiggyBank', { size: 24 })}
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Open a New Account</h3>
                <p className="text-sm text-gray-600 mb-3">Start saving or get a loan with competitive rates</p>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Get Started
                </button>
              </div>
            </div>
          </section>
          
          <MainFeature />
          
          {/* Recent Transactions Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              {transactions.length > 0 ? (
                <div>
                  {transactions.slice(0, 5).map(transaction => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                  ))}
                  {transactions.length > 5 && (
                    <div className="text-center pt-4">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Load More Transactions
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No recent transactions to display</p>
                </div>
              )}
            </div>
          </section>
          
          {/* Loan Services Section */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Loan Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <BankingFeature 
                icon={getIcon('Home', { size: 24 })}
                title="Home Loans"
                description="Realize your dream of owning a home with our competitive interest rates and flexible repayment options."
                action={() => handleLoanApplication('home')}
                color="blue"
              />
              
              <BankingFeature 
                icon={getIcon('Car', { size: 24 })}
                title="Vehicle Loans"
                description="Drive away in your dream vehicle with easy financing and quick approval process."
                action={() => handleLoanApplication('vehicle')}
                color="green"
              />
              
              <BankingFeature 
                icon={getIcon('Star', { size: 24 })}
                title="Gold Loans"
                description="Get immediate funds by leveraging your gold assets with attractive interest rates."
                action={() => handleLoanApplication('gold')}
                color="amber"
              />
            </div>
          </section>
          
          {/* Security Features Section */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Security Features</h2>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex">
                  <div className="p-2 rounded-full bg-blue-50 text-blue-600 mr-3 h-fit">
                    {getIcon('Fingerprint', { size: 20 })}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Biometric Authentication</h3>
                    <p className="text-sm text-gray-600">Secure your account with fingerprint or face recognition.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="p-2 rounded-full bg-blue-50 text-blue-600 mr-3 h-fit">
                    {getIcon('ShieldCheck', { size: 20 })}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="p-2 rounded-full bg-blue-50 text-blue-600 mr-3 h-fit">
                    {getIcon('Lock', { size: 20 })}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Instant Card Freeze</h3>
                    <p className="text-sm text-gray-600">Temporarily block your card with a single tap if lost.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                  Manage Security Settings
                </button>
              </div>
            </div>
          </section>
          
          {/* Customer Support Section */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex items-center">
                <div className="p-3 rounded-full bg-blue-50 text-blue-600 mr-4">
                  {getIcon('MessageSquare', { size: 24 })}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Chat with Us</h3>
                  <p className="text-sm text-gray-600 mb-3">Get instant support from our customer service team.</p>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Start Chat
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex items-center">
                <div className="p-3 rounded-full bg-blue-50 text-blue-600 mr-4">
                  {getIcon('PhoneCall', { size: 24 })}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Call Us</h3>
                  <p className="text-sm text-gray-600 mb-3">Speak directly with our customer support representatives.</p>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Call Now
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      
      {/* Account Details Modal */}
      {showAccountDetails && selectedAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">{selectedAccount.type} Account Details</h2>
                <button 
                  onClick={closeAccountDetails}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center mb-4">
                  <p className="text-sm text-gray-600 mb-1">Available Balance</p>
                  <p className="text-3xl font-bold text-gray-900">{selectedAccount.currency} {selectedAccount.balance.toLocaleString()}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Number</span>
                    <span className="font-medium text-gray-900">•••• {selectedAccount.number.slice(-4)}</span>
                  </div>
                  
                  {selectedAccount.interestRate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest Rate</span>
                      <span className="font-medium text-gray-900">{selectedAccount.interestRate}%</span>
                    </div>
                  )}
                  
                  {selectedAccount.dueDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Due Date</span>
                      <span className="font-medium text-gray-900">{new Date(selectedAccount.dueDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                  View Transactions
                </button>
                
                <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition duration-300">
                  Download Statement
                </button>
              </div>
            </div>
        >
          <a 
      )}
        </div>
      </section>
      
  
      <section id="latest" className="py-16 px-4 sm:px-6 lg:px-8 bg-surface-50 dark:bg-surface-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-2">
                Featured Recipes
              </h2>
              <p className="text-surface-600 dark:text-surface-300">
                Discover our most popular and highest-rated recipes.
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="inline-flex rounded-md shadow-sm">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 text-sm font-medium ${
                      index === 0 ? 'rounded-l-md' : ''
                    } ${
                      index === categories.length - 1 ? 'rounded-r-md' : ''
                    } ${
                      activeCategory === category 
                        ? 'bg-primary text-white' 
                        : 'bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700'
                    } border border-surface-300 dark:border-surface-600`}
                    onClick={() => handleCategoryFilter(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRecipes.slice(0, visibleRecipes).map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          
          {visibleRecipes < featuredRecipes.length && (
            <div className="mt-10 text-center">
              <button
                onClick={handleLoadMore}
                className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Load More
                <ChevronDown className="ml-2 h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-surface-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="max-w-2xl mx-auto text-surface-600 dark:text-surface-300">
              Join thousands of food enthusiasts who have shared their recipes and cooking experiences on FlavorVista.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" 
                  alt="User" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-surface-900 dark:text-white">Sophia R.</h4>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">Food Blogger</p>
                </div>
              </div>
              <p className="text-surface-700 dark:text-surface-300">
                "FlavorVista has transformed how I share my recipes with my audience. The visual recipe creator makes my content look professional and engaging!"
              </p>
              <div className="mt-4 flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{getIcon('star')({ className: "w-5 h-5" })}</span>
                ))}
              </div>
              
            </div>
            
            {/* Testimonial 2 */}
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" 
                  alt="User" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-surface-900 dark:text-white">James T.</h4>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">Home Chef</p>
                </div>
              </div>
              <p className="text-surface-700 dark:text-surface-300">
                "I've discovered so many amazing recipes here! The community feedback has helped me improve my cooking skills tremendously."
              </p>
              <div className="mt-4 flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{getIcon('star')({ className: `w-5 h-5 ${i === 4 ? 'text-surface-300 dark:text-surface-600' : ''}` })}</span>
                ))}
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" 
                  alt="User" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-surface-900 dark:text-white">Elena M.</h4>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">Professional Chef</p>
                </div>
              </div>
              <p className="text-surface-700 dark:text-surface-300">
                "As a professional chef, I appreciate the attention to detail in FlavorVista's recipe format. It's perfect for sharing my culinary creations with precise instructions."
              </p>
              <div className="mt-4 flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{getIcon('star')({ className: "w-5 h-5" })}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-primary/90 mix-blend-multiply"
          aria-hidden="true"
        ></div>
        
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80')`,
            zIndex: -1
          }}
        ></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 text-shadow-lg">
            Ready to Share Your Culinary Creations?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8 text-shadow">
            Join our community of food enthusiasts and showcase your recipes to the world.
          </p>
          <a 
            href="#create" 
            className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-lg bg-white text-primary hover:bg-surface-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Create Your First Recipe
          </a>
        </div>
      </section>
    </div>
  );
}