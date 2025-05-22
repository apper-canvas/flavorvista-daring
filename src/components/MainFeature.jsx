import React, { useState } from 'react';
import { getIcon } from '../utils/iconUtils';

const BankingFeature = ({ icon, title, description, action, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200"
  };
import { motion, AnimatePresence } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';
    <div className={`border rounded-lg p-6 ${colorClasses[color]} transition-all hover:shadow-md`}>
      <div className="flex flex-col h-full">
        <div className="mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-80 mb-4 flex-grow">{description}</p>
        <div>
          <button 
            onClick={action} 
            className={`inline-flex items-center text-sm font-medium hover:underline`}
          >
            Learn more
            <span className="ml-1">{getIcon('ChevronRight', { size: 16 })}</span>
          </button>
  const ImageIcon = getIcon('image');
      </div>
    </div>
  );
};

const QuickAction = ({ icon, label, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all"
    >
      <div className="text-blue-600 mb-2">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </button>
  );
};

const MainFeature = () => {
  const [activeTab, setActiveTab] = useState('accounts');

  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <QuickAction 
            icon={getIcon('ArrowLeftRight', { size: 28 })} 
            label="Transfer Money" 
            onClick={() => window.location.href = '/transfers'}
          />
          <QuickAction 
            icon={getIcon('FileClock', { size: 28 })} 
            label="Pay Bills" 
            onClick={() => window.location.href = '/bills'}
          />
          <QuickAction 
            icon={getIcon('Building', { size: 28 })} 
            label="Apply for Loan" 
            onClick={() => window.location.href = '/loans/apply'}
          />
          <QuickAction 
            icon={getIcon('LifeBuoy', { size: 28 })} 
            label="Get Support" 
            onClick={() => window.location.href = '/support'}
          />
        </div>
  const CheckIcon = getIcon('check-circle');
  const ClockIcon = getIcon('clock');
  const UsersIcon = getIcon('users');
  const TagIcon = getIcon('tag');

export { BankingFeature, QuickAction };
export default MainFeature;
  const ListIcon = getIcon('list');
  const FileTextIcon = getIcon('file-text');
  const YoutubeIcon = getIcon('youtube');
  
  // Category options
  const categoryOptions = [
    { value: '', label: 'Select a category' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'desserts', label: 'Desserts' },
    { value: 'healthy', label: 'Healthy' },
    { value: 'vegetarian', label: 'Vegetarian' },
  ];
  
  // Handlers
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };
  
  const handleRemoveIngredient = (index) => {
    if (ingredients.length > 1) {
      const updatedIngredients = [...ingredients];
      updatedIngredients.splice(index, 1);
      setIngredients(updatedIngredients);
    }
  };
  
  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };
  
  const handleAddInstruction = () => {
    setInstructions([...instructions, '']);
  };
  
  const handleRemoveInstruction = (index) => {
    if (instructions.length > 1) {
      const updatedInstructions = [...instructions];
      updatedInstructions.splice(index, 1);
      setInstructions(updatedInstructions);
    }
  };
  
  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = value;
    setInstructions(updatedInstructions);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!recipeTitle) {
      toast.error('Recipe title is required');
      setIsSubmitting(false);
      return;
    }
    
    if (!category) {
      toast.error('Please select a category');
      setIsSubmitting(false);
      return;
    }
    
    if (!imagePreview) {
      toast.error('Please upload a recipe image');
      setIsSubmitting(false);
      return;
    }
    
    // Check if all ingredients are filled
    if (ingredients.some(ingredient => !ingredient.trim())) {
      toast.error('Please fill all ingredients or remove empty ones');
      setIsSubmitting(false);
      return;
    }
    
    // Check if all instructions are filled
    if (instructions.some(instruction => !instruction.trim())) {
      toast.error('Please fill all instructions or remove empty ones');
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        resetForm();
      }, 3000);
    }, 1500);
  };
  
  const resetForm = () => {
    setRecipeTitle('');
    setDescription('');
    setCategory('');
    setPrepTime('');
    setCookTime('');
    setServings('');
    setVideoUrl('');
    setIngredients(['']);
    setInstructions(['']);
    setImagePreview(null);
    setActiveStep(1);
    setShowSuccess(false);
  };
  
  const handleNextStep = () => {
    if (activeStep === 1) {
      // Validate basic info
      if (!recipeTitle) {
        toast.error('Recipe title is required');
        return;
      }
      if (!category) {
        toast.error('Please select a category');
        return;
      }
      if (!imagePreview) {
        toast.error('Please upload a recipe image');
        return;
      }
    }
    
    setActiveStep(prevStep => prevStep + 1);
  };
  
  const handlePrevStep = () => {
    setActiveStep(prevStep => prevStep - 1);
  };
  
  // Progress bar width calculation
  const progressWidth = () => {
    return `${(activeStep / 3) * 100}%`;
  };
  
  return (
    <div className="bg-white dark:bg-surface-800 rounded-xl shadow-lg max-w-4xl mx-auto overflow-hidden">
      {/* Form header */}
      <div className="px-6 py-4 border-b border-surface-200 dark:border-surface-700">
        <h3 className="text-xl font-semibold text-surface-900 dark:text-white">Create New Recipe</h3>
        
        {/* Progress indicator */}
        <div className="mt-4 relative">
          <div className="overflow-hidden h-2 text-xs flex rounded-full bg-surface-200 dark:bg-surface-700">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: progressWidth() }}
              transition={{ duration: 0.3 }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
            ></motion.div>
          </div>
          
          <div className="flex justify-between mt-2 text-xs font-medium text-surface-600 dark:text-surface-400">
            <div className={`${activeStep >= 1 ? 'text-primary dark:text-primary-light' : ''}`}>
              Recipe Basics
            </div>
            <div className={`${activeStep >= 2 ? 'text-primary dark:text-primary-light' : ''}`}>
              Ingredients
            </div>
            <div className={`${activeStep >= 3 ? 'text-primary dark:text-primary-light' : ''}`}>
              Instructions
            </div>
          </div>
        </div>
      </div>
      
      {/* Form content */}
      <form onSubmit={handleSubmit} className="px-6 py-8">
        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-10"
            >
              <div className="inline-flex p-4 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                <CheckIcon className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">
                Recipe Submitted Successfully!
              </h3>
              <p className="text-surface-600 dark:text-surface-400 mb-6">
                Your recipe has been created and is now awaiting review.
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="btn btn-primary"
              >
                Create Another Recipe
              </button>
            </motion.div>
          ) : activeStep === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="recipeTitle" className="block text-sm font-medium text-surface-900 dark:text-surface-200 mb-1">
                  Recipe Title *
                </label>
                <input
                  type="text"
                  id="recipeTitle"
                  value={recipeTitle}
                  onChange={(e) => setRecipeTitle(e.target.value)}
                  placeholder="Enter your recipe title"
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-surface-900 dark:text-surface-200 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Briefly describe your recipe"
                  className="input min-h-[100px]"
                  rows="3"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-surface-900 dark:text-surface-200 mb-1">
                    Category *
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="input appearance-none pr-10"
                      required
                    >
                      {categoryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-surface-500">
                      <TagIcon className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="prepTime" className="block text-sm font-medium text-surface-900 dark:text-surface-200 mb-1">
                    Prep Time (mins)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="prepTime"
                      min="0"
                      value={prepTime}
                      onChange={(e) => setPrepTime(e.target.value)}
                      placeholder="15"
                      className="input pr-10"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-surface-500">
                      <ClockIcon className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="cookTime" className="block text-sm font-medium text-surface-900 dark:text-surface-200 mb-1">
                    Cook Time (mins)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="cookTime"
                      min="0"
                      value={cookTime}
                      onChange={(e) => setCookTime(e.target.value)}
                      placeholder="30"
                      className="input pr-10"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-surface-500">
                      <ClockIcon className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="servings" className="block text-sm font-medium text-surface-900 dark:text-surface-200 mb-1">
                    Servings
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="servings"
                      min="1"
                      value={servings}
                      onChange={(e) => setServings(e.target.value)}
                      placeholder="4"
                      className="input pr-10"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-surface-500">
                      <UsersIcon className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="videoUrl" className="block text-sm font-medium text-surface-900 dark:text-surface-200 mb-1">
                    YouTube Video URL
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      id="videoUrl"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className="input pr-10"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-surface-500">
                      <YoutubeIcon className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <span className="block text-sm font-medium text-surface-900 dark:text-surface-200 mb-3">
                  Recipe Image *
                </span>
                
                <div 
                  className="border-2 border-dashed border-surface-300 dark:border-surface-700 rounded-lg p-6 text-center cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imagePreview ? (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Recipe preview" 
                        className="max-h-48 mx-auto rounded-md"
                      />
                      <p className="mt-2 text-sm text-surface-600 dark:text-surface-400">
                        Click to change image
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <ImageIcon className="h-12 w-12 text-surface-400 mx-auto" />
                      <div className="text-sm text-surface-900 dark:text-surface-200 font-medium">
                        Upload Recipe Image
                      </div>
                      <p className="text-xs text-surface-500 dark:text-surface-400">
                        Click to browse or drag and drop<br />
                        PNG, JPG or WEBP (max 5MB)
                      </p>
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </motion.div>
          ) : activeStep === 2 ? (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-lg font-medium text-surface-900 dark:text-surface-200">
                    <div className="flex items-center">
                      <ListIcon className="h-5 w-5 mr-2" />
                      Ingredients
                    </div>
                  </label>
                  
                  <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="flex items-center text-sm font-medium text-primary dark:text-primary-light hover:underline"
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add Ingredient
                  </button>
                </div>
                
                <div className="space-y-3">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) => handleIngredientChange(index, e.target.value)}
                        placeholder={`Ingredient ${index + 1}`}
                        className="input flex-grow"
                      />
                      
                      <button
                        type="button"
                        onClick={() => handleRemoveIngredient(index)}
                        disabled={ingredients.length === 1}
                        className={`p-2 rounded-full ${
                          ingredients.length === 1 
                            ? 'text-surface-400 dark:text-surface-600 cursor-not-allowed' 
                            : 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                        }`}
                        aria-label="Remove ingredient"
                      >
                        <MinusIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-surface-50 dark:bg-surface-700/30 p-4 rounded-lg">
                <h4 className="font-medium text-surface-900 dark:text-surface-200 mb-2">
                  Ingredient Tips
                </h4>
                <ul className="text-sm text-surface-600 dark:text-surface-400 space-y-1 list-disc list-inside">
                  <li>Include the quantity (e.g., 2 cups, 1 tablespoon)</li>
                  <li>Specify preparation state (e.g., chopped, diced, minced)</li>
                  <li>List ingredients in the order they are used</li>
                  <li>Be specific about the type of ingredient (e.g., kosher salt vs. table salt)</li>
                </ul>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-lg font-medium text-surface-900 dark:text-surface-200">
                    <div className="flex items-center">
                      <FileTextIcon className="h-5 w-5 mr-2" />
                      Cooking Instructions
                    </div>
                  </label>
                  
                  <button
                    type="button"
                    onClick={handleAddInstruction}
                    className="flex items-center text-sm font-medium text-primary dark:text-primary-light hover:underline"
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add Step
                  </button>
                </div>
                
                <div className="space-y-4">
                  {instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="mt-2 flex-shrink-0">
                        <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-medium">
                          {index + 1}
                        </span>
                      </div>
                      
                      <div className="flex-grow">
                        <textarea
                          value={instruction}
                          onChange={(e) => handleInstructionChange(index, e.target.value)}
                          placeholder={`Step ${index + 1} instructions`}
                          className="input min-h-[80px]"
                          rows="2"
                        ></textarea>
                      </div>
                      
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => handleRemoveInstruction(index)}
                          disabled={instructions.length === 1}
                          className={`p-2 rounded-full ${
                            instructions.length === 1 
                              ? 'text-surface-400 dark:text-surface-600 cursor-not-allowed' 
                              : 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                          }`}
                          aria-label="Remove step"
                        >
                          <MinusIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-surface-50 dark:bg-surface-700/30 p-4 rounded-lg">
                <h4 className="font-medium text-surface-900 dark:text-surface-200 mb-2">
                  Instruction Tips
                </h4>
                <ul className="text-sm text-surface-600 dark:text-surface-400 space-y-1 list-disc list-inside">
                  <li>Be clear and specific about each step</li>
                  <li>Include cooking temperatures and times</li>
                  <li>Mention visual cues (e.g., "until golden brown")</li>
                  <li>Break complex steps into smaller, manageable steps</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
      
      {/* Form footer */}
      {!showSuccess && (
        <div className="px-6 py-4 bg-surface-50 dark:bg-surface-700/30 border-t border-surface-200 dark:border-surface-700 flex justify-between">
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={activeStep === 1}
            className={`btn ${
              activeStep === 1
                ? 'btn-ghost opacity-50 cursor-not-allowed'
                : 'btn-ghost'
            }`}
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Previous
          </button>
          
          {activeStep < 3 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="btn btn-primary"
            >
              Next
              <ChevronRight className="h-5 w-5 ml-1" />
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Recipe
                  <CheckIcon className="h-5 w-5 ml-1" />
                </>
              )}
            </button>
          )}
        </div>
      )}
      
      {/* Recipe preview */}
      {imagePreview && activeStep === 1 && (
        <div className="px-6 py-4 bg-surface-50 dark:bg-surface-700/30 border-t border-surface-200 dark:border-surface-700">
          <h4 className="text-sm font-medium text-surface-900 dark:text-surface-200 mb-2">
            Recipe Preview
          </h4>
          <div className="bg-white dark:bg-surface-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                <img 
                  src={imagePreview} 
                  alt="Recipe" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-surface-900 dark:text-white">
                  {recipeTitle || 'Recipe Title'}
                </h3>
                <p className="text-sm text-surface-500 dark:text-surface-400">
                  {category ? categoryOptions.find(option => option.value === category)?.label : 'Category'} 
                  {(prepTime || cookTime) ? ` • ${parseInt(prepTime || 0) + parseInt(cookTime || 0)} min` : ''}
                  {servings ? ` • ${servings} servings` : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}