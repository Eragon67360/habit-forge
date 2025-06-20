import { UserPreferences } from '@/types';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

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
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Request permissions
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.warn('Notification permissions not granted');
        return;
      }

      // Configure for Android
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#A076F9',
        });
      }

      this.isInitialized = true;
      console.log('Notification service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize notification service:', error);
    }
  }

  /**
   * Schedule a daily reminder notification
   */
  async scheduleDailyReminder(
    time: string,
    preferences: UserPreferences
  ): Promise<void> {
    if (!preferences.notifications.dailyReminders) return;

    try {
      const [hour, minute] = time.split(':').map(Number);
      
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Time for your habits! 🌟',
          body: 'Ready to make today count? Check in with your habits!',
          data: { type: 'daily_reminder' },
        },
        trigger: {
          hour,
          minute,
          repeats: true,
          type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        },
      });

      console.log(`Daily reminder scheduled for ${time}`);
    } catch (error) {
      console.error('Failed to schedule daily reminder:', error);
    }
  }

  /**
   * Schedule a streak milestone notification
   */
  async scheduleStreakMilestone(
    habitName: string,
    streakCount: number,
    scheduledDate: Date
  ): Promise<void> {
    try {
      const message = this.getStreakMilestoneMessage(streakCount);
      
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `🎉 ${streakCount} Day Streak!`,
          body: `${habitName}: ${message}`,
          data: { 
            type: 'streak_milestone',
            habitName,
            streakCount,
          },
        },
        trigger: {
          date: scheduledDate,
          type: Notifications.SchedulableTriggerInputTypes.DATE,
        },
      });

      console.log(`Streak milestone notification scheduled for ${habitName}`);
    } catch (error) {
      console.error('Failed to schedule streak milestone:', error);
    }
  }

  /**
   * Schedule an encouraging message notification
   */
  async scheduleEncouragement(
    message: string,
    scheduledDate: Date
  ): Promise<void> {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Keep going! 💪',
          body: message,
          data: { type: 'encouragement' },
        },
        trigger: {
          date: scheduledDate,
          type: Notifications.SchedulableTriggerInputTypes.DATE,
        },
      });

      console.log('Encouragement notification scheduled');
    } catch (error) {
      console.error('Failed to schedule encouragement:', error);
    }
  }

  /**
   * Cancel all scheduled notifications
   */
  async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      console.log('All notifications cancelled');
    } catch (error) {
      console.error('Failed to cancel notifications:', error);
    }
  }

  /**
   * Cancel specific notification by ID
   */
  async cancelNotification(notificationId: string): Promise<void> {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      console.log(`Notification ${notificationId} cancelled`);
    } catch (error) {
      console.error('Failed to cancel notification:', error);
    }
  }

  /**
   * Get all scheduled notifications
   */
  async getScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
    try {
      return await Notifications.getAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Failed to get scheduled notifications:', error);
      return [];
    }
  }

  /**
   * Send immediate notification (for testing)
   */
  async sendImmediateNotification(
    title: string,
    body: string,
    data?: Record<string, any>
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
      console.error('Failed to send immediate notification:', error);
    }
  }

  /**
   * Update notification settings based on user preferences
   */
  async updateNotificationSettings(preferences: UserPreferences): Promise<void> {
    try {
      // Cancel existing notifications
      await this.cancelAllNotifications();

      // Schedule new notifications based on preferences
      if (preferences.notifications.dailyReminders) {
        await this.scheduleDailyReminder(
          preferences.notifications.reminderTime,
          preferences
        );
      }

      console.log('Notification settings updated');
    } catch (error) {
      console.error('Failed to update notification settings:', error);
    }
  }

  /**
   * Get streak milestone message based on count
   */
  private getStreakMilestoneMessage(streakCount: number): string {
    switch (streakCount) {
      case 1:
        return 'First day down! You\'re on your way! 🌟';
      case 7:
        return 'A whole week! You\'re building momentum! 💪';
      case 10:
        return 'Double digits! You\'re unstoppable! 🎯';
      case 30:
        return 'A month strong! You\'re creating lasting change! 🏆';
      case 50:
        return '50 days! You\'re absolutely incredible! 🌟';
      case 100:
        return '100 days! You\'re a true champion! 👑';
      case 365:
        return 'A full year! You\'re legendary! 🎊';
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
      return status === 'granted';
    } catch (error) {
      console.error('Failed to check notification permissions:', error);
      return false;
    }
  }

  /**
   * Request notification permissions
   */
  async requestPermissions(): Promise<boolean> {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Failed to request notification permissions:', error);
      return false;
    }
  }
}

// Export singleton instance
export const notificationService = NotificationService.getInstance(); 