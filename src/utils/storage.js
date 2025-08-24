// LocalStorage utility functions
const STORAGE_KEY = 'sis_data';

// Load data from localStorage
export const loadData = () => {
  try {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    if (serializedData === null) {
      return null;
    }
    return JSON.parse(serializedData);
  } catch (err) {
    console.error("Error loading data from localStorage:", err);
    return null;
  }
};

// Save data to localStorage
export const saveData = (data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, serializedData);
  } catch (err) {
    console.error("Error saving data to localStorage:", err);
  }
};

// Initialize app data
export const initializeData = () => {
  const existingData = loadData();
  if (!existingData) {
    // Import initialData only when needed to avoid circular dependencies
    import('../data/initialData').then((module) => {
      saveData(module.initialData);
    });
    return null;
  }
  return existingData;
};

// Clear all data (for debugging)
export const clearData = () => {
  localStorage.removeItem(STORAGE_KEY);
};