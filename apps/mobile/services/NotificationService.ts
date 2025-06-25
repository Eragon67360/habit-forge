import { UserPreferences } from "@/types";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export class NotificationService {
  private static instance: NotificationService;
  private isInitialized = false;

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  /**
   * Initialize notification service
   */
  async initialize(): Promise<boolean> {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        return false;
      }

      // Configure notification behavior
      await Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
          shouldShowBanner: true,
          shouldShowList: true,
        }),
      });

      // Configure for Android
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#A076F9",
        });
      }

      this.isInitialized = true;
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Schedule a daily reminder notification
   */
  async scheduleDailyReminder(
    time: string,
    preferences: UserPreferences,
  ): Promise<void> {
    if (!preferences.notifications.dailyReminders) return;

    try {
      const [hour, minute] = time.split(":").map(Number);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "HabitForge Reminder",
          body: "Time to check in on your habits!",
          data: { type: "daily_reminder" },
        },
        trigger: {
          hour,
          minute,
          repeats: true,
          type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        },
      });
    } catch (error) {
      // Handle error silently
    }
  }

  /**
   * Schedule a streak milestone notification
   */
  async scheduleStreakMilestone(
    habitName: string,
    streakCount: number,
    scheduledDate: Date,
  ): Promise<void> {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "🎉 Streak Milestone!",
          body: `Congratulations! You've reached a ${streakCount}-day streak with "${habitName}"!`,
          data: { type: "streak_milestone", habitName, streakCount },
        },
        trigger: null, // Send immediately
      });
    } catch (error) {
      // Handle error silently
    }
  }

  /**
   * Schedule an encouraging message notification
   */
  async scheduleEncouragement(
    message: string,
    scheduledDate: Date,
  ): Promise<void> {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "💪 Keep Going!",
          body: "Every day is a new opportunity to build better habits.",
          data: { type: "encouragement" },
        },
        trigger: null, // Send immediately
      });
    } catch (error) {
      // Handle error silently
    }
  }

  /**
   * Cancel all scheduled notifications
   */
  async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      // Handle error silently
    }
  }

  /**
   * Cancel specific notification by ID
   */
  async cancelNotification(notificationId: string): Promise<void> {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
      // Handle error silently
    }
  }

  /**
   * Get all scheduled notifications
   */
  async getScheduledNotifications(): Promise<
    Notifications.NotificationRequest[]
  > {
    try {
      return await Notifications.getAllScheduledNotificationsAsync();
    } catch (error) {
      return [];
    }
  }

  /**
   * Send immediate notification (for testing)
   */
  async sendImmediateNotification(
    title: string,
    body: string,
    data?: Record<string, any>,
  ): Promise<void> {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
        },
        trigger: null, // Send immediately
      });
    } catch (error) {
      // Handle error silently
    }
  }

  /**
   * Update notification settings based on user preferences
   */
  async updateNotificationSettings(
    preferences: UserPreferences,
  ): Promise<void> {
    try {
      // Cancel existing notifications
      await this.cancelAllNotifications();

      // Schedule new notifications based on preferences
      if (preferences.notifications.dailyReminders) {
        await this.scheduleDailyReminder(
          preferences.notifications.reminderTime,
          preferences,
        );
      }
    } catch (error) {
      // Handle error silently
    }
  }

  /**
   * Get streak milestone message based on count
   */
  private getStreakMilestoneMessage(streakCount: number): string {
    switch (streakCount) {
      case 1:
        return "First day down! You're on your way! 🌟";
      case 7:
        return "A whole week! You're building momentum! 💪";
      case 10:
        return "Double digits! You're unstoppable! 🎯";
      case 30:
        return "A month strong! You're creating lasting change! 🏆";
      case 50:
        return "50 days! You're absolutely incredible! 🌟";
      case 100:
        return "100 days! You're a true champion! 👑";
      case 365:
        return "A full year! You're legendary! 🎊";
      default:
        return `Amazing! ${streakCount} days and counting! 🌟`;
    }
  }

  /**
   * Check if notifications are enabled
   */
  async areNotificationsEnabled(): Promise<boolean> {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      return status === "granted";
    } catch (error) {
      return false;
    }
  }

  /**
   * Request notification permissions
   */
  async requestPermissions(): Promise<boolean> {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      return status === "granted";
    } catch (error) {
      return false;
    }
  }
}

// Export singleton instance
export const notificationService = NotificationService.getInstance();
