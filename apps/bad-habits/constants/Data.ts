import { EncouragingMessage, PredefinedHabit } from '@/types';

// App Colors
export const COLORS = {
  primary: '#A076F9',
  primaryLight: '#B894FF',
  primaryDark: '#8A5CF6',
  secondary: '#F3F4F6',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  background: '#FFFFFF',
  backgroundDark: '#181A20',
  text: '#1F2937',
  textDark: '#F4F4F4',
  textSecondary: '#6B7280',
  textSecondaryDark: '#A0A0A0',
  border: '#E5E7EB',
  borderDark: '#23262F',
  card: '#FFFFFF',
  cardDark: '#1E222B',
};

// Theme-aware color function
export const getThemeColors = (isDark: boolean) => ({
  primary: COLORS.primary,
  primaryLight: COLORS.primaryLight,
  primaryDark: COLORS.primaryDark,
  secondary: isDark ? '#23262F' : COLORS.secondary,
  success: COLORS.success,
  warning: COLORS.warning,
  error: COLORS.error,
  info: COLORS.info,
  background: isDark ? COLORS.backgroundDark : COLORS.background,
  text: isDark ? COLORS.textDark : COLORS.text,
  textSecondary: isDark ? COLORS.textSecondaryDark : COLORS.textSecondary,
  border: isDark ? COLORS.borderDark : COLORS.border,
  card: isDark ? COLORS.cardDark : COLORS.card,
});

// Predefined habits for quick setup
export const PREDEFINED_HABITS: PredefinedHabit[] = [
  // Good Habits
  {
    name: 'Daily Exercise',
    description: 'Get moving for at least 30 minutes each day',
    type: 'good',
    category: 'exercise',
    icon: '🏃‍♂️',
    suggestedFrequency: 'daily',
  },
  {
    name: 'Read Books',
    description: 'Read for at least 20 minutes daily',
    type: 'good',
    category: 'learning',
    icon: '📚',
    suggestedFrequency: 'daily',
  },
  {
    name: 'Drink Water',
    description: 'Stay hydrated with 8 glasses of water',
    type: 'good',
    category: 'health',
    icon: '💧',
    suggestedFrequency: 'daily',
  },
  {
    name: 'Meditation',
    description: 'Practice mindfulness for 10 minutes',
    type: 'good',
    category: 'mindfulness',
    icon: '🧘‍♀️',
    suggestedFrequency: 'daily',
  },
  {
    name: 'Early Sleep',
    description: 'Go to bed before 11 PM',
    type: 'good',
    category: 'sleep',
    icon: '😴',
    suggestedFrequency: 'daily',
  },
  {
    name: 'Save Money',
    description: 'Put aside money for savings',
    type: 'good',
    category: 'finance',
    icon: '💰',
    suggestedFrequency: 'weekly',
  },
  {
    name: 'Call Family',
    description: 'Stay connected with loved ones',
    type: 'good',
    category: 'relationships',
    icon: '👨‍👩‍👧‍👦',
    suggestedFrequency: 'weekly',
  },
  {
    name: 'Learn New Skill',
    description: 'Dedicate time to learning something new',
    type: 'good',
    category: 'learning',
    icon: '🎯',
    suggestedFrequency: 'weekly',
  },

  // Bad Habits to Break
  {
    name: 'Skip Breakfast',
    description: 'Avoid skipping the most important meal',
    type: 'bad',
    category: 'health',
    icon: '🍳',
    suggestedFrequency: 'daily',
  },
  {
    name: 'Procrastination',
    description: 'Avoid putting off important tasks',
    type: 'bad',
    category: 'productivity',
    icon: '⏰',
    suggestedFrequency: 'daily',
  },
  {
    name: 'Excessive Screen Time',
    description: 'Limit time spent on devices',
    type: 'bad',
    category: 'health',
    icon: '📱',
    suggestedFrequency: 'daily',
  },
  {
    name: 'Unhealthy Snacking',
    description: 'Avoid junk food between meals',
    type: 'bad',
    category: 'diet',
    icon: '🍪',
    suggestedFrequency: 'daily',
  },
  {
    name: 'Late Night Eating',
    description: 'Avoid eating after 9 PM',
    type: 'bad',
    category: 'diet',
    icon: '🌙',
    suggestedFrequency: 'daily',
  },
  {
    name: 'Overspending',
    description: 'Control impulse purchases',
    type: 'bad',
    category: 'finance',
    icon: '💳',
    suggestedFrequency: 'weekly',
  },
  {
    name: 'Social Media Overuse',
    description: 'Limit time on social platforms',
    type: 'bad',
    category: 'social',
    icon: '📱',
    suggestedFrequency: 'daily',
  },
  {
    name: 'Negative Self-Talk',
    description: 'Practice positive thinking',
    type: 'bad',
    category: 'mindfulness',
    icon: '💭',
    suggestedFrequency: 'daily',
  },
];

// Encouraging messages for different scenarios
export const ENCOURAGING_MESSAGES: EncouragingMessage[] = [
  // Achievement messages
  {
    id: 'achievement_1',
    type: 'achievement',
    message: 'Amazing job! You\'re on a {streak}-day streak! Keep shining!',
    emoji: '🌟',
    conditions: { minStreak: 1 },
  },
  {
    id: 'achievement_2',
    type: 'achievement',
    message: 'Incredible! {streak} days strong! You\'re unstoppable!',
    emoji: '💪',
    conditions: { minStreak: 7 },
  },
  {
    id: 'achievement_3',
    type: 'achievement',
    message: 'Wow! {streak} days! You\'re building something amazing!',
    emoji: '🏆',
    conditions: { minStreak: 30 },
  },
  {
    id: 'achievement_4',
    type: 'achievement',
    message: 'Legendary! {streak} days! You\'re an inspiration!',
    emoji: '👑',
    conditions: { minStreak: 100 },
  },

  // Setback messages
  {
    id: 'setback_1',
    type: 'setback',
    message: 'Remember, every day is a new beginning. You\'ve got this!',
    emoji: '💪',
  },
  {
    id: 'setback_2',
    type: 'setback',
    message: 'Setbacks are just stepping stones to success. Keep going!',
    emoji: '🌈',
  },
  {
    id: 'setback_3',
    type: 'setback',
    message: 'Don\'t let one bad day define you. Tomorrow is full of possibilities!',
    emoji: '🌅',
  },
  {
    id: 'setback_4',
    type: 'setback',
    message: 'You\'re stronger than any setback. Time to bounce back!',
    emoji: '🚀',
  },

  // Daily check-in messages
  {
    id: 'daily_1',
    type: 'daily',
    message: 'Welcome back! Ready to make today count?',
    emoji: '😊',
  },
  {
    id: 'daily_2',
    type: 'daily',
    message: 'Great to see you! Let\'s make this day amazing!',
    emoji: '✨',
  },
  {
    id: 'daily_3',
    type: 'daily',
    message: 'You\'re here! That\'s the first step to success!',
    emoji: '🎯',
  },
  {
    id: 'daily_4',
    type: 'daily',
    message: 'Another day, another opportunity to grow!',
    emoji: '🌱',
  },

  // Milestone messages
  {
    id: 'milestone_1',
    type: 'milestone',
    message: '🎉 10 days! You\'re building momentum!',
    emoji: '🎉',
    conditions: { minStreak: 10, maxStreak: 10 },
  },
  {
    id: 'milestone_2',
    type: 'milestone',
    message: '🎊 30 days! You\'re creating lasting change!',
    emoji: '🎊',
    conditions: { minStreak: 30, maxStreak: 30 },
  },
  {
    id: 'milestone_3',
    type: 'milestone',
    message: '🏆 100 days! You\'re absolutely incredible!',
    emoji: '🏆',
    conditions: { minStreak: 100, maxStreak: 100 },
  },
  {
    id: 'milestone_4',
    type: 'milestone',
    message: '👑 365 days! You\'re a true champion!',
    emoji: '👑',
    conditions: { minStreak: 365, maxStreak: 365 },
  },
];

// Habit categories with icons and colors
export const HABIT_CATEGORIES = {
  health: { name: 'Health', icon: '🏥', color: '#EF4444' },
  productivity: { name: 'Productivity', icon: '⚡', color: '#F59E0B' },
  relationships: { name: 'Relationships', icon: '❤️', color: '#EC4899' },
  learning: { name: 'Learning', icon: '🎓', color: '#3B82F6' },
  finance: { name: 'Finance', icon: '💰', color: '#10B981' },
  mindfulness: { name: 'Mindfulness', icon: '🧘‍♀️', color: '#8B5CF6' },
  exercise: { name: 'Exercise', icon: '🏃‍♂️', color: '#F97316' },
  diet: { name: 'Diet', icon: '🥗', color: '#84CC16' },
  sleep: { name: 'Sleep', icon: '😴', color: '#6366F1' },
  social: { name: 'Social', icon: '👥', color: '#06B6D4' },
  other: { name: 'Other', icon: '📝', color: '#6B7280' },
} as const;

// App configuration
export const APP_CONFIG = {
  name: 'Bad Habits',
  version: '1.0.0',
  developer: 'Thomas Moser',
  contact: 'thomas-moser@orange.fr',
  maxHabits: 20,
  maxNotesPerHabit: 50,
  passwordMinLength: 6,
  passwordMaxLength: 6,
  usernameMinLength: 2,
  usernameMaxLength: 20,
  reminderTimeDefault: '09:00',
  streakMilestones: [1, 7, 10, 30, 50, 100, 365],
} as const;

// Storage keys
export const STORAGE_KEYS = {
  USER_DATA: '@bad_habits_user',
  HABITS: '@bad_habits_habits',
  CHECK_INS: '@bad_habits_checkins',
  MILESTONES: '@bad_habits_milestones',
  SETTINGS: '@bad_habits_settings',
  NOTIFICATIONS: '@bad_habits_notifications',
  ONBOARDING_COMPLETE: '@bad_habits_onboarding',
} as const;

// Notification IDs
export const NOTIFICATION_IDS = {
  DAILY_REMINDER: 'daily_reminder',
  STREAK_MILESTONE: 'streak_milestone',
  ENCOURAGEMENT: 'encouragement',
} as const; 