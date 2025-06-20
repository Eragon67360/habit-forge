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
export const ENCOURAGING_MESSAGES: Record<'achievement' | 'setback' | 'daily' | 'milestone', EncouragingMessage[]> = {
  daily: [
    { message: 'A journey of a thousand miles begins with a single step.' },
    { message: 'Success is the sum of small efforts, repeated day in and day out.' },
    { message: 'The secret of your future is hidden in your daily routine.' },
  ],
  achievement: [
    { message: 'Great job! You\'ve hit a {streak}-day streak!' },
    { message: 'Wow, {streak} days in a row! You\'re on fire!' },
    { message: 'Keep up the amazing work! That\'s a {streak}-day streak!' },
  ],
  setback: [
    { message: 'Don\'t worry, a small setback is just a setup for a major comeback.' },
    { message: 'It\'s okay to stumble. What matters is getting back up.' },
    { message: 'Progress isn\'t always linear. Keep pushing forward!' },
  ],
  milestone: [
    { message: 'Congratulations on reaching a {streak}-day milestone! You are unstoppable.' },
    { message: 'You\'ve hit a major milestone of {streak} days! Celebrate your progress.' },
  ],
};

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
  personal: { name: 'Personal', icon: '👤', color: '#7E22CE' },
  creative: { name: 'Creative', icon: '🎨', color: '#DB2777' },
  other: { name: 'Other', icon: '📝', color: '#6B7280' },
} as const;

// App configuration
export const APP_CONFIG = {
  name: 'Bad Habits',
  version: '1.0.0',
  developer: 'Thomas Moser',
  contact: 'thomas-moser@orange.fr',
  storageKey: 'bad-habits-storage',
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