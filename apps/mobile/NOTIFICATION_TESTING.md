# Notification Testing Guide

## Overview

Your React Native app uses `expo-notifications` for push notifications. The notification system includes:

- Daily reminders
- Streak milestones
- Encouraging messages
- Test notifications

## Testing Methods

### 1. **In-App Test Button** (Recommended)

I've added a "Test Notifications" button to your Settings screen. Here's how to use it:

1. Open the app
2. Go to Settings → Notifications section
3. Tap "Test Notifications"
4. You should see a success alert and receive a test notification

### 2. **Manual Testing via Code**

You can test notifications programmatically by calling the NotificationService:

```typescript
import { notificationService } from "@/services/NotificationService";

// Test immediate notification
await notificationService.sendImmediateNotification(
  "Test Title",
  "Test message body",
  { type: "test" }
);

// Test daily reminder
await notificationService.scheduleDailyReminder("09:00", userPreferences);

// Test streak milestone
await notificationService.scheduleStreakMilestone("Exercise", 7, new Date());
```

### 3. **Testing Different Notification Types**

#### Daily Reminders

- Enable "Daily Reminders" in Settings
- Set a reminder time
- Wait for the scheduled time or test immediately

#### Streak Milestones

- Enable "Streak Milestones" in Settings
- Create a habit and check in multiple days
- Reach milestone numbers (7, 14, 30, 60, 90, 180, 365 days)

#### Encouraging Messages

- Enable "Encouraging Messages" in Settings
- These are triggered by various app events

## Troubleshooting

### Common Issues

1. **No notifications appearing**

   - Check if notifications are enabled in device settings
   - Verify app permissions in Settings → Notifications
   - Ensure "Enable Notifications" is turned on in the app

2. **Permission denied**

   - The app will request permissions on first use
   - If denied, go to device Settings → Apps → HabitForge → Notifications
   - Enable notifications manually

3. **Notifications not working on Android**

   - Check if battery optimization is disabled for the app
   - Verify the notification channel is created (should happen automatically)

4. **Notifications not working on iOS**
   - Check if notifications are enabled in iOS Settings
   - Ensure the app has notification permissions

### Debug Steps

1. **Check Notification Service Status**

   ```typescript
   const isEnabled = await notificationService.areNotificationsEnabled();
   console.log("Notifications enabled:", isEnabled);
   ```

2. **Check Scheduled Notifications**

   ```typescript
   const scheduled = await notificationService.getScheduledNotifications();
   console.log("Scheduled notifications:", scheduled);
   ```

3. **Request Permissions**
   ```typescript
   const granted = await notificationService.requestPermissions();
   console.log("Permissions granted:", granted);
   ```

## Development Testing

### Testing in Development

- Notifications work in development builds
- Use Expo Go or development builds for testing
- Test on both iOS and Android devices

### Testing in Production

- Build a production APK/IPA
- Test on real devices (not simulators)
- Verify notifications work with app in background

## Notification Configuration

### Android Configuration

- Channel: "default" with high importance
- Vibration pattern: [0, 250, 250, 250]
- Light color: #A076F9

### iOS Configuration

- Uses default iOS notification settings
- Supports banners, sounds, and badges

### Notification Handler

The app configures notifications to:

- Show alerts: ✅
- Play sounds: ✅
- Set badges: ❌
- Show banners: ✅
- Show in notification list: ✅

## Best Practices

1. **Always test on real devices** - simulators don't support push notifications
2. **Test with app in background** - notifications behave differently
3. **Test permission flows** - ensure users can enable/disable notifications
4. **Test different notification types** - daily, milestone, encouragement
5. **Verify notification content** - titles, bodies, and data payloads

## Quick Test Checklist

- [ ] Enable notifications in app settings
- [ ] Grant device permissions
- [ ] Use "Test Notifications" button
- [ ] Verify notification appears
- [ ] Test with app in background
- [ ] Test different notification types
- [ ] Verify notification content
- [ ] Test on both iOS and Android
