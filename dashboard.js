/**
 * Dashboard Functionality
 * SANURA FLAVOURS - Food Ordering System
 */

'use strict';

// DOM Elements
const userName = document.getElementById('userName');
const profileFullName = document.getElementById('profileFullName');
const profileEmail = document.getElementById('profileEmail');
const profilePhone = document.getElementById('profilePhone');
const profileCity = document.getElementById('profileCity');
const profileAddress = document.getElementById('profileAddress');
const profilePostalCode = document.getElementById('profilePostalCode');
const profileRegistered = document.getElementById('profileRegistered');
const logoutBtn = document.getElementById('logoutBtn');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const editProfileBtn = document.getElementById('editProfileBtn');
const globalMessage = document.getElementById('globalMessage');

/**
 * Load user data from localStorage
 */
function loadUserData() {
  const currentUser = localStorage.getItem('currentUser');

  if (!currentUser) {
    // Redirect to registration if no user is logged in
    window.location.href = 'registration.html';
    return;
  }

  const user = JSON.parse(currentUser);
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const userData = users.find(u => u.id === user.id);

  if (!userData) {
    // User data not found, redirect to registration
    window.location.href = 'registration.html';
    return;
  }

  // Populate user information
  const firstName = user.fullName.split(' ')[0];
  userName.textContent = firstName;
  profileFullName.textContent = user.fullName;
  profileEmail.textContent = user.email;
  profilePhone.textContent = user.phone;
  profileCity.textContent = user.city;
  profileAddress.textContent = user.address;
  profilePostalCode.textContent = user.postalCode;

  // Format registration date
  if (userData.registeredAt) {
    const registeredDate = new Date(userData.registeredAt);
    const formattedDate = registeredDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    profileRegistered.textContent = formattedDate;
  } else {
    profileRegistered.textContent = 'Recently';
  }
}

/**
 * Show message notification
 */
function showMessage(message, type = 'info') {
  globalMessage.textContent = message;
  globalMessage.className = `global-message ${type}`;

  setTimeout(() => {
    globalMessage.classList.add('hidden');
  }, 5000);
}

/**
 * Handle logout
 */
function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('currentUser');
    showMessage('Logged out successfully!', 'success');
    setTimeout(() => {
      window.location.href = 'registration.html';
    }, 1500);
  }
}

/**
 * Handle edit profile
 */
function handleEditProfile() {
  showMessage('Edit profile feature coming soon!', 'info');
}

/**
 * Toggle navigation menu on mobile
 */
function handleNavToggle() {
  navMenu.classList.toggle('open');
}

/**
 * Close navigation menu when clicking on a link
 */
function handleNavLinkClick(e) {
  if (e.target.classList.contains('nav-link')) {
    navMenu.classList.remove('open');
    e.preventDefault();
    // Handle navigation logic here
    showMessage('Feature coming soon!', 'info');
  }
}

/**
 * Close navigation menu when resizing to larger screen
 */
function handleResize() {
  if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
    navMenu.classList.remove('open');
  }
}

/**
 * Handle action button clicks
 */
function handleActionClick(e) {
  if (e.target.classList.contains('action-btn')) {
    showMessage('Feature coming soon!', 'info');
  }
}

/**
 * Initialize dashboard
 */
function initializeDashboard() {
  // Load user data
  loadUserData();

  // Setup event listeners
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }

  if (editProfileBtn) {
    editProfileBtn.addEventListener('click', handleEditProfile);
  }

  if (navToggle) {
    navToggle.addEventListener('click', handleNavToggle);
  }

  if (navMenu) {
    navMenu.addEventListener('click', handleNavLinkClick);
  }

  // Action buttons
  const actionCards = document.querySelectorAll('.action-card');
  actionCards.forEach(card => {
    card.addEventListener('click', handleActionClick);
  });

  // Window resize listener
  window.addEventListener('resize', handleResize);

  // Show welcome message
  showMessage('Welcome to SANURA FLAVOURS!', 'success');
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeDashboard);
} else {
  initializeDashboard();
}
