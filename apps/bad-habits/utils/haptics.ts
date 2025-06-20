import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export class HapticService {
  private static instance: HapticService;
  private isEnabled: boolean = true;

  private constructor() {}

  static getInstance(): HapticService {
    if (!HapticService.instance) {
      HapticService.instance = new HapticService();
    }
    return HapticService.instance;
  }

  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  private shouldTrigger(): boolean {
    return this.isEnabled && Platform.OS === 'ios';
  }

  // Light impact for subtle interactions
  light() {
    if (this.shouldTrigger()) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }

  // Medium impact for standard interactions
  medium() {
    if (this.shouldTrigger()) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }

  // Heavy impact for important interactions
  heavy() {
    if (this.shouldTrigger()) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  }

  // Success notification
  success() {
    if (this.shouldTrigger()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }

  // Warning notification
  warning() {
    if (this.shouldTrigger()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  }

  // Error notification
  error() {
    if (this.shouldTrigger()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }

  // Selection feedback
  selection() {
    if (this.shouldTrigger()) {
      Haptics.selectionAsync();
    }
  }

  // Custom haptic patterns for specific interactions
  habitComplete() {
    this.success();
  }

  habitMissed() {
    this.warning();
  }

  buttonPress() {
    this.light();
  }

  toggleSwitch() {
    this.medium();
  }

  deleteAction() {
    this.heavy();
  }

  navigation() {
    this.light();
  }

  formSubmit() {
    this.medium();
  }

  formError() {
    this.error();
  }
}

// Export singleton instance
export const haptics = HapticService.getInstance(); 