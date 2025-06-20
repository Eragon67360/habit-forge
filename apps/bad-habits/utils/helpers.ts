import { APP_CONFIG } from '@/constants/Data';
import { ValidationError } from '@/types';

/**
 * Generate a unique ID for entities
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Simple password hashing function (for demo purposes)
 * In production, use a proper hashing library like bcrypt
 */
export const hashPassword = (password: string): string => {
  // Simple hash for demo - replace with proper hashing in production
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
};

/**
 * Validate password format
 */
export const validatePassword = (password: string): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (password.length !== APP_CONFIG.passwordMaxLength) {
    errors.push({
      field: 'password',
      message: `Password must be exactly ${APP_CONFIG.passwordMaxLength} digits`,
    });
  }
  
  if (!/^\d+$/.test(password)) {
    errors.push({
      field: 'password',
      message: 'Password must contain only numbers',
    });
  }
  
  return errors;
};

/**
 * Validate username format
 */
export const validateUsername = (username: string): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (username.length < APP_CONFIG.usernameMinLength) {
    errors.push({
      field: 'username',
      message: `Username must be at least ${APP_CONFIG.usernameMinLength} characters`,
    });
  }
  
  if (username.length > APP_CONFIG.usernameMaxLength) {
    errors.push({
      field: 'username',
      message: `Username must be no more than ${APP_CONFIG.usernameMaxLength} characters`,
    });
  }
  
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push({
      field: 'username',
      message: 'Username can only contain letters, numbers, and underscores',
    });
  }
  
  return errors;
};

/**
 * Format date for display
 */
export const formatDate = (date: Date): string => {
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString();
  }
};

/**
 * Format time for display
 */
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Calculate days between two dates
 */
export const daysBetween = (date1: Date, date2: Date): number => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
};

/**
 * Check if a date is today
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

/**
 * Check if a date is yesterday
 */
export const isYesterday = (date: Date): boolean => {
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return date.toDateString() === yesterday.toDateString();
};

/**
 * Get the start of the current week (Monday)
 */
export const getStartOfWeek = (date: Date = new Date()): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  return new Date(d.setDate(diff));
};

/**
 * Get the end of the current week (Sunday)
 */
export const getEndOfWeek = (date: Date = new Date()): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + 7; // Adjust when day is Sunday
  return new Date(d.setDate(diff));
};

/**
 * Get the start of the current month
 */
export const getStartOfMonth = (date: Date = new Date()): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Get the end of the current month
 */
export const getEndOfMonth = (date: Date = new Date()): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

/**
 * Debounce function for search inputs
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Capitalize first letter of string
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Generate a random encouraging message
 */
export const getRandomEncouragingMessage = (): string => {
  const messages = [
    'You\'re doing great! 🌟',
    'Keep up the amazing work! 💪',
    'Every step counts! 🎯',
    'You\'ve got this! ✨',
    'Small progress is still progress! 🌱',
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};

/**
 * Check if streak should be reset (missed more than 1 day)
 */
export const shouldResetStreak = (lastCheckIn: Date): boolean => {
  const today = new Date();
  const daysSinceLastCheckIn = daysBetween(today, lastCheckIn);
  return daysSinceLastCheckIn > 1;
};

/**
 * Calculate completion percentage for a habit
 */
export const calculateCompletionRate = (
  checkIns: Date[],
  startDate: Date,
  endDate: Date
): number => {
  const totalDays = daysBetween(endDate, startDate) + 1;
  const completedDays = checkIns.length;
  return Math.round((completedDays / totalDays) * 100);
}; 