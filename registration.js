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
