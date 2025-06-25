import { APP_CONFIG, ENCOURAGING_MESSAGES } from "@/constants/Data";
import QuoteService from "@/services/QuoteService";
import {
  AppState,
  Habit,
  HabitCategory,
  HabitCheckIn,
  NotificationSettings,
  Quote,
  StreakMilestone,
  User,
  UserPreferences,
} from "@/types";
import { generateId } from "@/utils/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Custom replacer/reviver for JSON serialization to handle Date objects
const jsonStorage = createJSONStorage(() => AsyncStorage, {
  reviver: (key, value) => {
    if (
      typeof value === "string" &&
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)
    ) {
      return new Date(value);
    }
    return value;
  },
});

// Custom storage to handle authentication state for users with passwords
const customStorage = {
  getItem: async (name: string) => {
    const value = await AsyncStorage.getItem(name);
    if (value) {
      try {
        const parsed = JSON.parse(value);
        // Reset authentication for users with passwords
        if (
          parsed.state &&
          parsed.state.user &&
          parsed.state.user.hasPassword
        ) {
          parsed.state.isAuthenticated = false;
        }
        return JSON.stringify(parsed);
      } catch (error) {
        console.error("🏪 [store] Error parsing stored state:", error);
        return value;
      }
    }
    return value;
  },
  setItem: async (name: string, value: string) => {
    await AsyncStorage.setItem(name, value);
  },
  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
  },
};

function isSimpleMessageArray(arr: any[]): arr is string[] {
  return typeof arr[0] === "string";
}

interface AppStore extends AppState {
  // Authentication actions
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
  setAuthenticated: (isAuthenticated: boolean) => void;

  // Habit actions
  addHabit: (
    habit: Omit<
      Habit,
      "id" | "createdAt" | "updatedAt" | "streak" | "currentPeriod"
    >,
  ) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  toggleHabitActive: (id: string) => void;

  // Check-in actions
  addCheckIn: (checkIn: Omit<HabitCheckIn, "id">) => void;
  updateCheckIn: (id: string, updates: Partial<HabitCheckIn>) => void;
  deleteCheckIn: (id: string) => void;

  // Streak and milestone actions
  updateStreak: (habitId: string) => void;
  addMilestone: (milestone: Omit<StreakMilestone, "id">) => void;

  // Settings actions
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;

  // UI actions
  setLoading: (isLoading: boolean) => void;
  setTheme: (theme: "light" | "dark") => void;

  // Quote actions
  fetchDailyQuote: () => Promise<void>;
  setDailyQuote: (quote: Quote | null) => void;
  refreshQuote: () => Promise<void>;
  forceRefreshQuote: () => Promise<void>;
  forceNewQuote: () => Promise<void>;

  // Utility actions
  resetApp: () => void;
  resetAppData: () => void;
  getHabitById: (id: string) => Habit | undefined;
  getCheckInsByHabitId: (habitId: string) => HabitCheckIn[];
  getHabitsByCategory: (category: HabitCategory) => Habit[];
  getHabitsByType: (type: "good" | "bad") => Habit[];
  getActiveHabits: () => Habit[];
  getTodayCheckIns: () => HabitCheckIn[];
  getEncouragingMessage: (
    type: "achievement" | "setback" | "daily" | "milestone",
    streak?: number,
  ) => string;

  // Reset authentication for testing (users with passwords should start unauthenticated)
  resetAuthentication: () => void;

  // Initialize store - ensure users with passwords start unauthenticated
  initializeStore: () => void;
}

const initialState: Omit<
  AppState,
  "user" | "habits" | "checkIns" | "milestones"
> = {
  isLoading: false,
  isQuoteLoading: false,
  isAuthenticated: false,
  currentTheme: "light",
  dailyQuote: null,
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      user: null,
      habits: [],
      checkIns: [],
      milestones: [],

      // Authentication actions
      setUser: (user) => {
        // Only auto-authenticate users without password protection
        const shouldAutoAuthenticate = !user.hasPassword;
        set({ user, isAuthenticated: shouldAutoAuthenticate });
      },

      updateUser: (updates) => {
        set((state) => {
          const newUser = state.user ? { ...state.user, ...updates } : null;
          return { user: newUser };
        });
      },

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          habits: [],
          checkIns: [],
          milestones: [],
        }),

      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

      // Reset authentication for testing (users with passwords should start unauthenticated)
      resetAuthentication: () => {
        set({ isAuthenticated: false });
      },

      // Habit actions
      addHabit: (habitData) => {
        const newHabit: Habit = {
          ...habitData,
          id: generateId(),
          createdAt: new Date(),
          updatedAt: new Date(),
          streak: 0,
          currentPeriod: {
            start: new Date(),
            end: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
            checkIns: [],
          },
        };

        set((state) => ({
          habits: [...state.habits, newHabit],
        }));
      },

      updateHabit: (id, updates) =>
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === id
              ? { ...habit, ...updates, updatedAt: new Date() }
              : habit,
          ),
        })),

      deleteHabit: (id) =>
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== id),
          checkIns: state.checkIns.filter((checkIn) => checkIn.habitId !== id),
          milestones: state.milestones.filter(
            (milestone) => milestone.habitId !== id,
          ),
        })),

      toggleHabitActive: (id) =>
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === id
              ? { ...habit, isActive: !habit.isActive, updatedAt: new Date() }
              : habit,
          ),
        })),

      // Check-in actions
      addCheckIn: (checkInData) => {
        const newCheckIn: HabitCheckIn = {
          ...checkInData,
          id: generateId(),
        };

        set((state) => ({
          checkIns: [...state.checkIns, newCheckIn],
        }));

        // Update habit streak and last check-in
        get().updateStreak(checkInData.habitId);
      },

      updateCheckIn: (id, updates) =>
        set((state) => ({
          checkIns: state.checkIns.map((checkIn) =>
            checkIn.id === id ? { ...checkIn, ...updates } : checkIn,
          ),
        })),

      deleteCheckIn: (id) =>
        set((state) => ({
          checkIns: state.checkIns.filter((checkIn) => checkIn.id !== id),
        })),

      // Streak and milestone actions
      updateStreak: (habitId) => {
        const state = get();
        const habit = state.habits.find((h) => h.id === habitId);
        if (!habit) return;

        const today = new Date();
        const todayStr = today.toDateString();
        const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
        const yesterdayStr = yesterday.toDateString();

        const todayCheckIn = state.checkIns.find(
          (checkIn) =>
            checkIn.habitId === habitId &&
            checkIn.date?.toDateString() === todayStr &&
            checkIn.completed,
        );

        const yesterdayCheckIn = state.checkIns.find(
          (checkIn) =>
            checkIn.habitId === habitId &&
            checkIn.date?.toDateString() === yesterdayStr &&
            checkIn.completed,
        );

        let newStreak = habit.streak;

        if (todayCheckIn) {
          if (yesterdayCheckIn) {
            // Continue streak
            newStreak = habit.streak + 1;
          } else {
            // Start new streak
            newStreak = 1;
          }
        } else {
          // No check-in today, streak remains the same
          newStreak = habit.streak;
        }

        // Check for milestone
        const milestoneReached = (
          APP_CONFIG.streakMilestones as readonly number[]
        ).includes(newStreak);
        const existingMilestone = state.milestones.find(
          (m) => m.habitId === habitId && m.streakCount === newStreak,
        );

        if (milestoneReached && !existingMilestone) {
          const encouragingMessage = state.getEncouragingMessage(
            "milestone",
            newStreak,
          );
          state.addMilestone({
            habitId,
            streakCount: newStreak,
            achievedAt: new Date(),
            message: encouragingMessage,
          });
        }

        state.updateHabit(habitId, {
          streak: newStreak,
          lastCheckIn: todayCheckIn ? today : habit.lastCheckIn,
        });
      },

      addMilestone: (milestoneData) => {
        const newMilestone: StreakMilestone = {
          ...milestoneData,
          id: generateId(),
        };

        set((state) => ({
          milestones: [...state.milestones, newMilestone],
        }));
      },

      // Settings actions
      updatePreferences: (preferences) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                preferences: { ...state.user.preferences, ...preferences },
              }
            : null,
        })),

      updateNotificationSettings: (settings) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                preferences: {
                  ...state.user.preferences,
                  notifications: {
                    ...state.user.preferences.notifications,
                    ...settings,
                  },
                },
              }
            : null,
        })),

      // UI actions
      setLoading: (isLoading) => set({ isLoading }),
      setTheme: (theme) =>
        set((state) => ({
          currentTheme: theme,
          user: state.user
            ? {
                ...state.user,
                preferences: {
                  ...state.user.preferences,
                  preferredTheme: theme,
                },
              }
            : null,
        })),

      // Quote actions
      fetchDailyQuote: async () => {
        try {
          const quote = await QuoteService.getInstance().getDailyQuote();
          set({ dailyQuote: quote });
        } catch (error) {
          // Keep existing quote if fetch fails
          console.warn("Failed to fetch daily quote:", error);
        }
      },

      setDailyQuote: (quote) => set({ dailyQuote: quote }),

      refreshQuote: async () => {
        try {
          const quoteService = QuoteService.getInstance();
          const quote = await quoteService.refreshQuote();
          set({ dailyQuote: quote });
        } catch (error) {
          console.error("Error refreshing quote:", error);
          // Keep existing quote if refresh fails
        }
      },

      forceRefreshQuote: async () => {
        set({ isQuoteLoading: true });
        try {
          const quote = await QuoteService.getInstance().refreshQuote();
          set({ dailyQuote: quote, isQuoteLoading: false });
        } catch (error) {
          // Keep existing quote if refresh fails
          console.warn("Failed to refresh quote:", error);
          set({ isQuoteLoading: false });
        }
      },

      // Force a new quote regardless of day
      forceNewQuote: async () => {
        set({ isQuoteLoading: true });
        try {
          const quote = await QuoteService.getInstance().refreshQuote();
          set({ dailyQuote: quote, isQuoteLoading: false });
        } catch (error) {
          // Keep existing quote if fetch fails
          console.warn("Failed to force new quote:", error);
          set({ isQuoteLoading: false });
        }
      },

      // Utility actions
      resetApp: () => {
        // Ensure complete reset including authentication state
        set({
          user: null,
          habits: [],
          checkIns: [],
          milestones: [],
          dailyQuote: null,
          isLoading: false,
          isAuthenticated: false,
          currentTheme: "light",
        });
      },

      resetAppData: () =>
        set({
          user: null,
          habits: [],
          checkIns: [],
          milestones: [],
          dailyQuote: null,
          isLoading: false,
          isAuthenticated: false,
          currentTheme: "light",
        }),

      getHabitById: (id) => get().habits.find((habit) => habit.id === id),

      getCheckInsByHabitId: (habitId) =>
        get().checkIns.filter((checkIn) => checkIn.habitId === habitId),

      getHabitsByCategory: (category) =>
        get().habits.filter((habit) => habit.category === category),

      getHabitsByType: (type) =>
        get().habits.filter((habit) => habit.type === type),

      getActiveHabits: () => get().habits.filter((habit) => habit.isActive),

      getTodayCheckIns: () => {
        const todayStr = new Date().toDateString();
        return get().checkIns.filter(
          (checkIn) => checkIn.date?.toDateString() === todayStr,
        );
      },

      getEncouragingMessage: (type, streak) => {
        const messages = ENCOURAGING_MESSAGES[type];
        if (!messages || messages.length === 0) return "";

        const randomMessage =
          messages[Math.floor(Math.random() * messages.length)];
        let messageText = randomMessage.message;

        if (streak) {
          messageText = messageText.replace("{streak}", streak.toString());
        }

        return messageText;
      },

      // Initialize store - ensure users with passwords start unauthenticated
      initializeStore: () => {
        const state = get();
        if (state.user && state.user.hasPassword) {
          set({ isAuthenticated: false });
        }
      },
    }),
    {
      name: APP_CONFIG.storageKey,
      storage: createJSONStorage(() => customStorage),
    },
  ),
);
