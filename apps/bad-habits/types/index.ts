// Core types for the Bad Habits tracking app

export interface User {
  id: string;
  username: string;
  hasPassword: boolean;
  passwordHash?: string;
  createdAt: Date;
  lastLoginAt: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: 'en' | 'fr';
  notifications: NotificationSettings;
  primaryColor: string;
}

export interface NotificationSettings {
  enabled: boolean;
  dailyReminders: boolean;
  streakMilestones: boolean;
  encouragingMessages: boolean;
  reminderTime: string; // HH:mm format
}

export interface Habit {
  id: string;
  name: string;
  description?: string;
  type: 'good' | 'bad';
  category: HabitCategory;
  streak: number;
  startDate: Date;
  lastCheckIn?: Date;
  notes: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  targetFrequency: 'daily' | 'weekly' | 'monthly';
  currentPeriod: {
    start: Date;
    end: Date;
    checkIns: Date[];
  };
}

export type HabitCategory = 
  | 'health'
  | 'productivity'
  | 'relationships'
  | 'learning'
  | 'finance'
  | 'mindfulness'
  | 'exercise'
  | 'diet'
  | 'sleep'
  | 'social'
  | 'other';

export interface HabitCheckIn {
  id: string;
  habitId: string;
  date: Date;
  notes?: string;
  mood?: 'great' | 'good' | 'okay' | 'bad' | 'terrible';
  completed: boolean;
}

export interface StreakMilestone {
  id: string;
  habitId: string;
  streakCount: number;
  achievedAt: Date;
  message: string;
}

export interface AppState {
  user: User | null;
  habits: Habit[];
  checkIns: HabitCheckIn[];
  milestones: StreakMilestone[];
  isLoading: boolean;
  isAuthenticated: boolean;
  currentTheme: 'light' | 'dark';
}

export interface NotificationData {
  id: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  scheduledDate?: Date;
  type: 'reminder' | 'milestone' | 'encouragement';
}

export interface PredefinedHabit {
  name: string;
  description: string;
  type: 'good' | 'bad';
  category: HabitCategory;
  icon: string;
  suggestedFrequency: 'daily' | 'weekly' | 'monthly';
}

export interface EncouragingMessage {
  id: string;
  type: 'achievement' | 'setback' | 'daily' | 'milestone';
  message: string;
  emoji: string;
  conditions?: {
    minStreak?: number;
    maxStreak?: number;
    habitType?: 'good' | 'bad';
  };
}

export interface StorageKeys {
  USER_DATA: '@bad_habits_user';
  HABITS: '@bad_habits_habits';
  CHECK_INS: '@bad_habits_checkins';
  MILESTONES: '@bad_habits_milestones';
  SETTINGS: '@bad_habits_settings';
  NOTIFICATIONS: '@bad_habits_notifications';
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  validationErrors?: ValidationError[];
}

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Onboarding: undefined;
  HabitDetail: { habitId: string };
  AddHabit: undefined;
  EditHabit: { habitId: string };
  Settings: undefined;
  Profile: undefined;
  Notifications: undefined;
};

export type TabParamList = {
  Home: undefined;
  Habits: undefined;
  Progress: undefined;
  Settings: undefined;
}; 