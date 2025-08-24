// Validation functions
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateName = (name) => {
  return name.length >= 2;
};

export const validateCourseCode = (code) => {
  return /^[A-Z]{2,4}\d{3,4}$/.test(code);
};

export const validateScore = (score) => {
  return score >= 0 && score <= 100;
};