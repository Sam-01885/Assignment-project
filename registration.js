<<<<<<< HEAD
/**
 * Registration Form Validation and Management
 * SANURA FLAVOURS - Food Ordering System
 */

'use strict';

// Form Elements
const form = document.getElementById('registrationForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const addressInput = document.getElementById('address');
const cityInput = document.getElementById('city');
const postalCodeInput = document.getElementById('postalCode');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const termsCheckbox = document.getElementById('terms');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const welcomeName = document.getElementById('welcomeName');
const proceedBtn = document.getElementById('proceedBtn');
const loadingSpinner = document.querySelector('.loading-spinner');
const globalMessage = document.getElementById('globalMessage');

// Validation Rules
const validators = {
  fullName: {
    validate: (value) => {
      const trimmed = value.trim();
      if (!trimmed) return { valid: false, message: 'Full name is required' };
      if (trimmed.length < 3) return { valid: false, message: 'Name must be at least 3 characters' };
      if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) return { valid: false, message: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
      return { valid: true };
    }
  },
  email: {
    validate: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) return { valid: false, message: 'Email address is required' };
      if (!emailRegex.test(value)) return { valid: false, message: 'Please enter a valid email address' };
      return { valid: true };
    }
  },
  phone: {
    validate: (value) => {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!value) return { valid: false, message: 'Phone number is required' };
      const cleanedPhone = value.replace(/\D/g, '');
      if (cleanedPhone.length < 10) return { valid: false, message: 'Phone number must be at least 10 digits' };
      if (!phoneRegex.test(value)) return { valid: false, message: 'Phone number contains invalid characters' };
      return { valid: true };
    }
  },
  address: {
    validate: (value) => {
      const trimmed = value.trim();
      if (!trimmed) return { valid: false, message: 'Street address is required' };
      if (trimmed.length < 5) return { valid: false, message: 'Address must be at least 5 characters' };
      return { valid: true };
    }
  },
  city: {
    validate: (value) => {
      const trimmed = value.trim();
      if (!trimmed) return { valid: false, message: 'City is required' };
      if (trimmed.length < 2) return { valid: false, message: 'City must be at least 2 characters' };
      if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) return { valid: false, message: 'City can only contain letters, spaces, hyphens, and apostrophes' };
      return { valid: true };
    }
  },
  postalCode: {
    validate: (value) => {
      const trimmed = value.trim();
      if (!trimmed) return { valid: false, message: 'Postal code is required' };
      if (!/^[\d\s\-a-zA-Z]+$/.test(trimmed)) return { valid: false, message: 'Postal code contains invalid characters' };
      return { valid: true };
    }
  },
  password: {
    validate: (value) => {
      if (!value) return { valid: false, message: 'Password is required' };
      if (value.length < 8) return { valid: false, message: 'Password must be at least 8 characters' };
      if (!/[A-Z]/.test(value)) return { valid: false, message: 'Password must contain at least one uppercase letter' };
      if (!/[a-z]/.test(value)) return { valid: false, message: 'Password must contain at least one lowercase letter' };
      if (!/[0-9]/.test(value)) return { valid: false, message: 'Password must contain at least one number' };
      return { valid: true };
    }
  },
  confirmPassword: {
    validate: (value) => {
      if (!value) return { valid: false, message: 'Please confirm your password' };
      if (value !== passwordInput.value) return { valid: false, message: 'Passwords do not match' };
      return { valid: true };
    }
  },
  terms: {
    validate: (value) => {
      if (!value) return { valid: false, message: 'You must agree to the terms and conditions' };
      return { valid: true };
    }
  }
};

/**
 * Display error message for a field
 */
function displayError(fieldName, message) {
  const errorElement = document.getElementById(`${fieldName}Error`);
  const inputElement = document.getElementById(fieldName);

  if (errorElement) {
    errorElement.textContent = message;
  }

  if (inputElement && fieldName !== 'terms') {
    inputElement.classList.remove('success');
    inputElement.classList.add('error');
  }
}

/**
 * Clear error message for a field
 */
function clearError(fieldName) {
  const errorElement = document.getElementById(`${fieldName}Error`);
  const inputElement = document.getElementById(fieldName);

  if (errorElement) {
    errorElement.textContent = '';
  }

  if (inputElement && fieldName !== 'terms') {
    inputElement.classList.remove('error');
  }
}

/**
 * Mark field as valid
 */
function markValid(fieldName) {
  const inputElement = document.getElementById(fieldName);
  if (inputElement && fieldName !== 'terms') {
    inputElement.classList.remove('error');
    inputElement.classList.add('success');
  }
  clearError(fieldName);
}

/**
 * Validate a single field
 */
function validateField(fieldName) {
  let value;

  if (fieldName === 'terms') {
    value = termsCheckbox.checked;
  } else {
    const element = document.getElementById(fieldName);
    value = element ? element.value : '';
  }

  const validator = validators[fieldName];
  if (!validator) return true;

  const result = validator.validate(value);

  if (!result.valid) {
    displayError(fieldName, result.message);
    return false;
  } else {
    markValid(fieldName);
    return true;
  }
}

/**
 * Validate entire form
 */
function validateForm() {
  const fields = ['fullName', 'email', 'phone', 'address', 'city', 'postalCode', 'password', 'confirmPassword', 'terms'];
  const results = fields.map(field => validateField(field));
  return results.every(result => result === true);
}

/**
 * Calculate password strength
 */
function calculatePasswordStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 2) return { level: 'weak', percentage: 33 };
  if (strength === 3) return { level: 'medium', percentage: 66 };
  return { level: 'strong', percentage: 100 };
}

/**
 * Update password strength indicator
 */
function updatePasswordStrength() {
  const password = passwordInput.value;
  const strengthBar = document.querySelector('.strength-bar-fill');
  const strengthText = document.querySelector('.strength-text');

  if (!password) {
    if (strengthBar) strengthBar.className = 'strength-bar-fill';
    if (strengthText) strengthText.textContent = '';
    return;
  }

  const strength = calculatePasswordStrength(password);

  if (strengthBar) {
    strengthBar.className = `strength-bar-fill ${strength.level}`;
    strengthBar.style.width = strength.percentage + '%';
  }

  if (strengthText) {
    strengthText.className = `strength-text ${strength.level}`;
    strengthText.textContent = strength.level.charAt(0).toUpperCase() + strength.level.slice(1);
  }
}

/**
 * Show global message
 */
function showMessage(message, type = 'info') {
  if (!globalMessage) return;

  globalMessage.textContent = message;
  globalMessage.className = `global-message ${type}`;

  setTimeout(() => {
    globalMessage.classList.add('hidden');
  }, 5000);
}

/**
 * Store user data in localStorage
 */
function storeUserData(data) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const newUser = {
    id: Date.now().toString(),
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    address: data.address,
    city: data.city,
    postalCode: data.postalCode,
    password: btoa(data.password), // Basic encoding (use proper hashing in production)
    registeredAt: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify({
    id: newUser.id,
    fullName: newUser.fullName,
    email: newUser.email,
    phone: newUser.phone,
    address: newUser.address,
    city: newUser.city,
    postalCode: newUser.postalCode
  }));

  return newUser;
}

/**
 * Handle form submission
 */
function handleFormSubmit(e) {
  e.preventDefault();

  // Validate form
  if (!validateForm()) {
    showMessage('Please fill in all fields correctly', 'error');
    return;
  }

  // Show loading spinner
  if (loadingSpinner) {
    loadingSpinner.classList.remove('hidden');
  }
  submitBtn.disabled = true;

  // Simulate API call delay
  setTimeout(() => {
    try {
      // Store user data
      const userData = {
        fullName: fullNameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        address: addressInput.value.trim(),
        city: cityInput.value.trim(),
        postalCode: postalCodeInput.value.trim(),
        password: passwordInput.value
      };

      storeUserData(userData);

      // Show success message
      if (loadingSpinner) {
        loadingSpinner.classList.add('hidden');
      }

      // Hide form, show success message
      form.style.display = 'none';
      successMessage.classList.remove('hidden');
      welcomeName.textContent = userData.fullName.split(' ')[0];

      showMessage('Account created successfully!', 'success');
    } catch (error) {
      showMessage(error.message || 'An error occurred during registration', 'error');
      if (loadingSpinner) {
        loadingSpinner.classList.add('hidden');
      }
      submitBtn.disabled = false;
    }
  }, 1500);
}

/**
 * Real-time field validation
 */
function setupRealTimeValidation() {
  const fields = ['fullName', 'email', 'phone', 'address', 'city', 'postalCode', 'confirmPassword'];

  fields.forEach(fieldName => {
    const element = document.getElementById(fieldName);
    if (element) {
      element.addEventListener('blur', () => {
        validateField(fieldName);
      });

      element.addEventListener('input', () => {
        if (element.classList.contains('error')) {
          validateField(fieldName);
        }
      });
    }
  });

  // Password strength indicator
  if (passwordInput) {
    passwordInput.addEventListener('input', updatePasswordStrength);
    passwordInput.addEventListener('blur', () => {
      validateField('password');
    });
  }

  // Terms checkbox
  if (termsCheckbox) {
    termsCheckbox.addEventListener('change', () => {
      validateField('terms');
    });
  }
}

/**
 * Proceed to dashboard
 */
function handleProceedToDashboard() {
  window.location.href = 'dashboard.html';
}

/**
 * Initialize form
 */
function initializeForm() {
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

  if (proceedBtn) {
    proceedBtn.addEventListener('click', handleProceedToDashboard);
  }

  setupRealTimeValidation();
}

// Initialize on DOM load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeForm);
} else {
  initializeForm();
}
=======
import { getToken, getUser, clearStorage } from './storage.js';
import { API_BASE } from '../api/config.js';

'use strict';

window.showMessage = (message, type = 'info') => {
  const messageEl = document.getElementById('global-message');
  if (!messageEl) return;
  messageEl.textContent = message;
  messageEl.className = `message ${type}`;
  messageEl.classList.remove('hidden');
  setTimeout(() => {
    messageEl.classList.add('hidden');
  }, 5000);
};

window.showLoading = () => {
  const spinner = document.getElementById('loading-spinner') || document.querySelector('.loading-spinner');
  if (spinner) spinner.classList.remove('hidden');
};

window.hideLoading = () => {
  const spinner = document.getElementById('loading-spinner') || document.querySelector('.loading-spinner');
  if (spinner) spinner.classList.add('hidden');
};

window.apiFetch = async (endpoint, options = {}) => {
  showLoading();
  try {
    const token = getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    };
    const response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || data.error || `HTTP error! status: ${response.status}`);
    }
    return response.ok ? await response.json() : null;
  } catch (error) {
    showMessage(error.message || 'An error occurred', 'error');
    throw error;
  } finally {
    hideLoading();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const pathname = window.location.pathname.split('/').pop() || 'index.html';
  if (pathname !== 'login.html' && !getToken()) {
    window.location.replace('login.html');
    return;
  }

  const userInfoEl = document.getElementById('user-info');
  const logoutBtn = document.getElementById('logout-btn');
  const userProfile = document.querySelector('.user-profile'); // optional container

  if (getToken()) {
    const user = getUser();
    if (userInfoEl) {
      userInfoEl.textContent = user.name || user.email || 'User';
    }
    if (userProfile) {
      userProfile.classList.remove('hidden');
    }
    if (logoutBtn) {
      logoutBtn.classList.remove('hidden');
    }
  } else {
    if (userProfile) {
      userProfile.classList.add('hidden');
    }
    if (logoutBtn) {
      logoutBtn.classList.add('hidden');
    }
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      clearStorage();
      window.location.replace('login.html');
    });
  }

  // Navigation toggle
  const navToggle = document.getElementById('nav-toggle') || document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu') || document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('open');
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navMenu.classList.remove('open');
      }
    });
  }
});
>>>>>>> 1ecbd1cedbf30456824508a573516ace5aa3d569
