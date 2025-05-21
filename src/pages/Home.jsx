import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

// Static data for demo purposes
const recipeCategories = [
  {
    id: 1,
    name: 'Breakfast',
    description: 'Start your day right',
    icon: 'coffee',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    name: 'Lunch',
    description: 'Midday favorites',
    icon: 'utensils',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    name: 'Dinner',
    description: 'Evening delights',
    icon: 'soup',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 4,
    name: 'Desserts',
    description: 'Sweet treats',
    icon: 'cake',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 5,
    name: 'Healthy',
    description: 'Nutritious choices',
    icon: 'salad',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 6,
    name: 'Vegetarian',
    description: 'Plant-based goodness',
    icon: 'leaf',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  }
];

const featuredRecipes = [
  {
    id: 1,
    title: 'Classic Margherita Pizza',
    description: 'A traditional Italian pizza with fresh mozzarella, tomatoes, and basil.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    prepTime: 30,
    cookTime: 15,
    servings: 4,
    category: 'Dinner',
    author: 'Chef Maria',
    rating: 4.8,
    reviewCount: 128
  },
  {
    id: 2,
    title: 'Avocado Toast with Poached Eggs',
    description: 'Creamy avocado spread on artisanal bread topped with perfectly poached eggs.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    prepTime: 15,
    cookTime: 10,
    servings: 2,
    category: 'Breakfast',
    author: 'Nutritionist Sarah',
    rating: 4.6,
    reviewCount: 95
  },
  {
    id: 3,
    title: 'Thai Green Curry',
    description: 'Aromatic Thai curry with coconut milk, vegetables, and your choice of protein.',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    category: 'Dinner',
    author: 'Chef Anan',
    rating: 4.9,
    reviewCount: 212
  },
  {
    id: 4,
    title: 'Chocolate Lava Cake',
    description: 'Decadent chocolate cake with a molten center, served with vanilla ice cream.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    prepTime: 15,
    cookTime: 12,
    servings: 4,
    category: 'Desserts',
    author: 'Pastry Chef Jean',
    rating: 4.7,
    reviewCount: 156
  }
];

// Components
const HeroSection = () => {
  return (
    <section className="relative">
      <div 
        className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90 mix-blend-multiply"
        aria-hidden="true"
      ></div>
      
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80')`,
          zIndex: -1
        }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl text-shadow-lg"
        >
          Share Your <span className="text-yellow-300">Culinary Journey</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-lg text-xl text-white text-shadow"
        >
          Discover, create, and share amazing recipes with a community of food enthusiasts.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a 
            href="#explore" 
            className="btn bg-white text-primary hover:bg-surface-100 focus:ring-white"
          >
            Explore Recipes
          </a>
          <a 
            href="#create" 
            className="btn bg-primary-dark text-white border border-white hover:bg-primary-dark/90 focus:ring-white"
          >
            Create Recipe
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const CategoryCard = ({ category }) => {
  const IconComponent = getIcon(category.icon);
  
  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      className="group card overflow-hidden"
    >
      <div className="h-40 overflow-hidden relative">
        <img 
          src={category.image} 
          alt={category.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-xl font-bold text-white">{category.name}</h3>
          <p className="text-white/80 text-sm">{category.description}</p>
        </div>
      </div>
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <IconComponent className="h-5 w-5 text-primary mr-2" />
          <span className="text-surface-600 dark:text-surface-300">{category.name}</span>
        </div>
        <a 
          href={`#${category.name.toLowerCase()}`}
          className="text-primary dark:text-primary-light hover:underline text-sm font-medium"
        >
          View Recipes
        </a>
      </div>
    </motion.div>
  );
};

const RecipeCard = ({ recipe }) => {
  const [isSaved, setIsSaved] = useState(false);
  const ClockIcon = getIcon('clock');
  const UsersIcon = getIcon('users');
  const StarIcon = getIcon('star');
  const BookmarkIcon = getIcon('bookmark');
  
  const handleSaveRecipe = () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      toast.success(`Recipe "${recipe.title}" saved to your collection!`);
    } else {
      toast.info(`Recipe "${recipe.title}" removed from your collection.`);
    }
  };
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="card group overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <button 
            onClick={handleSaveRecipe}
            className={`p-2 rounded-full ${isSaved ? 'bg-primary text-white' : 'bg-white/80 text-surface-700'}`}
            aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
          >
            <BookmarkIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="absolute top-2 left-2">
          <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
            {recipe.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-2 line-clamp-1">
          {recipe.title}
        </h3>
        
        <p className="text-surface-600 dark:text-surface-300 text-sm mb-4 line-clamp-2">
          {recipe.description}
        </p>
        
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center text-xs text-surface-600 dark:text-surface-400">
            <ClockIcon className="h-4 w-4 mr-1" />
            <span>{recipe.prepTime + recipe.cookTime} min</span>
          </div>
          
          <div className="flex items-center text-xs text-surface-600 dark:text-surface-400">
            <UsersIcon className="h-4 w-4 mr-1" />
            <span>{recipe.servings} servings</span>
          </div>
          
          <div className="flex items-center text-xs">
            <StarIcon className="h-4 w-4 mr-1 text-yellow-400" />
            <span className="font-medium">{recipe.rating}</span>
            <span className="text-surface-500 dark:text-surface-400 ml-1">({recipe.reviewCount})</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-surface-200 dark:border-surface-700">
          <div className="text-xs text-surface-600 dark:text-surface-400">
            By {recipe.author}
          </div>
          
          <a 
            href={`#recipe/${recipe.id}`}
            className="text-primary dark:text-primary-light hover:underline text-sm font-medium"
          >
            View Recipe
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [visibleRecipes, setVisibleRecipes] = useState(4);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const handleLoadMore = () => {
    // In a real app, this would fetch more recipes from an API
    toast.info("Loading more recipes would fetch from an API in a real app.");
    setVisibleRecipes(prevCount => prevCount + 4);
  };
  
  const handleCategoryFilter = (category) => {
    setActiveCategory(category);
    // In a real app, this would filter recipes by category
    toast.info(`Filtering recipes by ${category} category.`);
  };
  
  // Get unique categories from recipes
  const categories = ['All', ...new Set(featuredRecipes.map(recipe => recipe.category))];
  
  const ChevronDown = getIcon('chevron-down');
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Main Features Section */}
      <section id="create" className="py-16 px-4 sm:px-6 lg:px-8 bg-surface-50 dark:bg-surface-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-4">
              Create Your Culinary Masterpiece
            </h2>
            <p className="max-w-2xl mx-auto text-surface-600 dark:text-surface-300">
              Share your favorite recipes with the world. Our easy-to-use recipe creator helps you format your culinary creations beautifully.
            </p>
          </div>
          
          <MainFeature />
        </div>
      </section>
      
      {/* Categories Section */}
      <section id="categories" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-surface-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-4">
              Explore Recipe Categories
            </h2>
            <p className="max-w-2xl mx-auto text-surface-600 dark:text-surface-300">
              Discover recipes organized by category, from hearty breakfasts to delectable desserts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipeCategories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Recipes Section */}
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
                  <StarIcon key={i} className="w-5 h-5" />
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
                  <StarIcon key={i} className={`w-5 h-5 ${i === 4 ? 'text-surface-300 dark:text-surface-600' : ''}`} />
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
                  <StarIcon key={i} className="w-5 h-5" />
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