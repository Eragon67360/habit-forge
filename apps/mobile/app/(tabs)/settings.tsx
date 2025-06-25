import { APP_CONFIG, getThemeColors } from "@/constants/Data";
import { notificationService } from "@/services/NotificationService";
import { useAppStore } from "@/store/useAppStore";
import { NotificationSettings } from "@/types";
import { haptics } from "@/utils/haptics";
import {
  hashPassword,
  validatePassword,
  verifyPassword,
} from "@/utils/helpers";
import React, { useCallback, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>(
    {}
  );
  const [usernameErrors, setUsernameErrors] = useState<Record<string, string>>(
    {}
  );

  const {
    user,
    updatePreferences,
    updateNotificationSettings,
    setTheme,
    currentTheme,
    resetApp,
    updateUser,
  } = useAppStore();

  // Get theme-aware colors
  const COLORS = getThemeColors(currentTheme === "dark");

  // Create styles with current theme colors
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 100,
    },
    header: {
      padding: 20,
      paddingBottom: 20,
      marginBottom: 8,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: COLORS.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: COLORS.textSecondary,
    },
    section: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: "bold",
      color: COLORS.text,
      marginBottom: 12,
      paddingHorizontal: 20,
    },
    sectionContent: {
      backgroundColor: COLORS.card,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: COLORS.border,
    },
    settingItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: 20,
      borderBottomWidth: 0,
    },
    settingContent: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 16,
      fontWeight: "500",
      color: COLORS.text,
      marginBottom: 2,
    },
    settingSubtitle: {
      fontSize: 14,
      color: COLORS.textSecondary,
    },
    settingRight: {
      marginLeft: 12,
    },
    settingValue: {
      fontSize: 16,
      color: COLORS.primary,
      fontWeight: "500",
    },
    themeSelector: {
      flexDirection: "row",
      gap: 8,
    },
    themeOption: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      backgroundColor: COLORS.secondary,
      borderWidth: 1,
      borderColor: COLORS.border,
    },
    themeOptionActive: {
      backgroundColor: COLORS.primary + "20",
      borderColor: COLORS.primary,
    },
    themeOptionText: {
      fontSize: 12,
      color: COLORS.text,
      fontWeight: "500",
    },
    themeOptionTextActive: {
      color: COLORS.primary,
      fontWeight: "600",
    },
    modalContainer: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: COLORS.text,
      marginBottom: 20,
      textAlign: "center",
    },
    closeButton: {
      padding: 8,
    },
    closeButtonText: {
      fontSize: 20,
      color: COLORS.textSecondary,
    },
    modalContent: {
      backgroundColor: COLORS.background,
      borderRadius: 20,
      padding: 24,
      margin: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    inputContainer: {
      marginBottom: 20,
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: "600",
      color: COLORS.text,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      backgroundColor: COLORS.card,
      color: COLORS.text,
    },
    inputError: {
      borderColor: COLORS.error,
    },
    errorText: {
      color: COLORS.error,
      fontSize: 14,
      marginTop: 4,
    },
    saveButton: {
      backgroundColor: COLORS.primary,
      padding: 20,
      borderRadius: 25,
      alignItems: "center",
      marginTop: 20,
      shadowColor: COLORS.primary,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    saveButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
      letterSpacing: 1,
    },
    destructiveText: {
      color: COLORS.error,
    },
    destructiveSubtext: {
      color: COLORS.error + "80",
    },
  });

  // Unified toggle component that looks consistent across platforms
  const UnifiedToggle = React.memo(
    ({
      value,
      onValueChange,
      disabled = false,
    }: {
      value: boolean;
      onValueChange: (value: boolean) => void;
      disabled?: boolean;
    }) => (
      <Switch
        value={value}
        onValueChange={(newValue) => {
          haptics.toggleSwitch();
          onValueChange(newValue);
        }}
        disabled={disabled}
        trackColor={{ false: COLORS.border, true: COLORS.primary + "40" }}
        thumbColor={value ? COLORS.primary : COLORS.textSecondary}
        ios_backgroundColor={COLORS.border}
      />
    )
  );

  UnifiedToggle.displayName = "UnifiedToggle";

  const handleResetAppData = useCallback(() => {
    haptics.heavy();
    Alert.alert(
      "Reset App Data",
      "This will permanently delete ALL your data including user account, habits, streaks, settings, and preferences. You will need to set up the app again from scratch. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset Everything",
          style: "destructive",
          onPress: () => {
            resetApp();
          },
        },
      ]
    );
  }, [resetApp]);

  const handleThemeChange = useCallback(
    (theme: "light" | "dark" | "auto") => {
      haptics.buttonPress();
      updatePreferences({ theme });
      // Always set the theme immediately for better UX
      if (theme === "auto") {
        // For auto, we'll let the system handle it
        setTheme("light"); // Default fallback
      } else {
        setTheme(theme);
      }
    },
    [updatePreferences, setTheme]
  );

  const handleNotificationToggle = useCallback(
    (setting: keyof NotificationSettings) => {
      if (!user) return;

      haptics.toggleSwitch();
      const newSettings = {
        ...user.preferences.notifications,
        [setting]: !user.preferences.notifications[setting],
      };

      updateNotificationSettings(newSettings);
    },
    [user, updateNotificationSettings]
  );

  const handleTestNotification = useCallback(async () => {
    try {
      haptics.buttonPress();
      await notificationService.sendImmediateNotification(
        "🧪 Test Notification",
        "This is a test notification to verify the system is working!",
        { type: "test" }
      );
      Alert.alert(
        "Success",
        "Test notification sent! Check your notification panel."
      );
    } catch (error) {
      haptics.error();
      Alert.alert(
        "Error",
        "Failed to send test notification. Check permissions."
      );
    }
  }, []);

  const handlePasswordProtectionToggle = useCallback(
    (value: boolean) => {
      if (value) {
        haptics.buttonPress();
        setShowPasswordModal(true);
      } else {
        haptics.warning();
        Alert.alert(
          "Disable Password",
          "Are you sure you want to disable password protection?",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Disable",
              style: "destructive",
              onPress: () => {
                // Actually disable password protection
                updateUser({
                  hasPassword: false,
                  passwordHash: undefined,
                });
                Alert.alert("Success", "Password protection disabled.");
              },
            },
          ]
        );
      }
    },
    [updateUser]
  );

  const handleUsernameChange = useCallback(() => {
    const errors: Record<string, string> = {};

    // Validate username
    if (!newUsername.trim()) {
      errors.username = "Username is required";
    } else if (newUsername.trim().length < 2) {
      errors.username = "Username must be at least 2 characters";
    } else if (newUsername.trim().length > 20) {
      errors.username = "Username must be less than 20 characters";
    }

    setUsernameErrors(errors);

    if (Object.keys(errors).length === 0) {
      haptics.formSubmit();
      // Update username
      updateUser({
        username: newUsername.trim(),
      });
      Alert.alert("Success", "Username updated successfully!");
      setShowUsernameModal(false);
      setNewUsername("");
      setUsernameErrors({});
    } else {
      haptics.formError();
    }
  }, [newUsername, updateUser]);

  const handlePasswordChange = useCallback(async () => {
    const errors: Record<string, string> = {};

    // Validate current password
    if (user?.hasPassword && user.passwordHash) {
      const isCurrentPasswordValid = await verifyPassword(
        currentPassword,
        user.passwordHash
      );
      if (!isCurrentPasswordValid) {
        errors.currentPassword = "Current password is incorrect";
      }
    }

    // Validate new password
    const newPasswordErrors = validatePassword(newPassword);
    if (newPasswordErrors.length > 0) {
      errors.newPassword = newPasswordErrors[0].message;
    }

    // Validate password confirmation
    if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setPasswordErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        haptics.formSubmit();
        // Update password
        const hashedPassword = await hashPassword(newPassword);

        updateUser({
          hasPassword: true,
          passwordHash: hashedPassword,
        });
        Alert.alert("Success", "Password updated successfully!");
        setShowPasswordModal(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordErrors({});
      } catch (error) {
        haptics.formError();
        Alert.alert("Error", "Failed to update password. Please try again.");
      }
    } else {
      haptics.formError();
    }
  }, [currentPassword, newPassword, confirmPassword, user, updateUser]);

  const renderSettingItem = useCallback(
    (
      title: string,
      subtitle?: string,
      rightElement?: React.ReactNode,
      onPress?: () => void,
      isDestructive?: boolean
    ) => (
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => {
          if (onPress) {
            haptics.buttonPress();
            onPress();
          }
        }}
        disabled={!onPress}
        activeOpacity={0.7}
      >
        <View style={styles.settingContent}>
          <Text
            style={[
              styles.settingTitle,
              isDestructive && styles.destructiveText,
            ]}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[
                styles.settingSubtitle,
                isDestructive && styles.destructiveSubtext,
              ]}
            >
              {subtitle}
            </Text>
          )}
        </View>
        {rightElement && (
          <View style={styles.settingRight}>{rightElement}</View>
        )}
      </TouchableOpacity>
    ),
    [styles]
  );

  const renderSection = useCallback(
    (title: string, children: React.ReactNode) => (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionContent}>{children}</View>
      </View>
    ),
    [styles]
  );

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your experience</Text>
        </View>

        {renderSection(
          "Account",
          <>
            {renderSettingItem(
              "Username",
              "Tap to change your username",
              <Text style={styles.settingValue}>{user.username}</Text>,
              () => {
                setNewUsername(user.username);
                setShowUsernameModal(true);
              }
            )}
            {renderSettingItem(
              "Password Protection",
              user.hasPassword ? "Enabled" : "Disabled",
              <UnifiedToggle
                value={user.hasPassword}
                onValueChange={handlePasswordProtectionToggle}
              />
            )}
          </>
        )}

        {renderSection(
          "Appearance",
          <>
            {renderSettingItem(
              "Theme",
              "Choose your preferred theme",
              <View style={styles.themeSelector}>
                {(["light", "dark", "auto"] as const).map((theme) => (
                  <TouchableOpacity
                    key={theme}
                    style={[
                      styles.themeOption,
                      currentTheme === theme && styles.themeOptionActive,
                    ]}
                    onPress={() => handleThemeChange(theme)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.themeOptionText,
                        currentTheme === theme && styles.themeOptionTextActive,
                      ]}
                    >
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </>
        )}

        {renderSection(
          "Notifications",
          <>
            {renderSettingItem(
              "Enable Notifications",
              "Receive notifications for reminders and milestones",
              <UnifiedToggle
                value={user.preferences.notifications.enabled}
                onValueChange={() => handleNotificationToggle("enabled")}
              />
            )}
            {renderSettingItem(
              "Daily Reminders",
              "Get reminded to check in with your habits",
              <UnifiedToggle
                value={user.preferences.notifications.dailyReminders}
                onValueChange={() => handleNotificationToggle("dailyReminders")}
                disabled={!user.preferences.notifications.enabled}
              />
            )}
            {renderSettingItem(
              "Streak Milestones",
              "Celebrate when you reach streak milestones",
              <UnifiedToggle
                value={user.preferences.notifications.streakMilestones}
                onValueChange={() =>
                  handleNotificationToggle("streakMilestones")
                }
                disabled={!user.preferences.notifications.enabled}
              />
            )}
            {renderSettingItem(
              "Encouraging Messages",
              "Receive motivational messages",
              <UnifiedToggle
                value={user.preferences.notifications.encouragingMessages}
                onValueChange={() =>
                  handleNotificationToggle("encouragingMessages")
                }
                disabled={!user.preferences.notifications.enabled}
              />
            )}
            {renderSettingItem(
              "Test Notifications",
              "Send a test notification to verify setup",
              undefined,
              handleTestNotification
            )}
          </>
        )}

        {renderSection(
          "About",
          <>
            {renderSettingItem(
              "Version",
              `Current version of the app`,
              <Text style={styles.settingValue}>{APP_CONFIG.version}</Text>
            )}
            {renderSettingItem(
              "Developer",
              "Built with ❤️ by",
              <Text style={styles.settingValue}>{APP_CONFIG.developer}</Text>
            )}
            {renderSettingItem(
              "Contact",
              "Get in touch for support",
              <Text style={styles.settingValue}>{APP_CONFIG.contact}</Text>
            )}
            {renderSettingItem(
              "AI API Status",
              process.env.EXPO_PUBLIC_OPENAI_API_KEY
                ? "Configured"
                : "Not configured",
              <Text
                style={[
                  styles.settingValue,
                  {
                    color: process.env.EXPO_PUBLIC_OPENAI_API_KEY
                      ? COLORS.primary
                      : COLORS.error,
                  },
                ]}
              >
                {process.env.EXPO_PUBLIC_OPENAI_API_KEY ? "✅" : "❌"}
              </Text>
            )}
          </>
        )}

        {renderSection(
          "Data Management",
          <>
            {renderSettingItem(
              "Reset App Data",
              "Permanently delete all your data and start fresh",
              undefined,
              handleResetAppData,
              true
            )}
          </>
        )}
      </ScrollView>

      {/* Username Change Modal */}
      <Modal
        visible={showUsernameModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Change Username</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                haptics.buttonPress();
                setShowUsernameModal(false);
                setNewUsername("");
                setUsernameErrors({});
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>New Username</Text>
              <TextInput
                style={[
                  styles.input,
                  usernameErrors.username && styles.inputError,
                ]}
                value={newUsername}
                onChangeText={setNewUsername}
                placeholder="Enter new username"
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={20}
              />
              {usernameErrors.username && (
                <Text style={styles.errorText}>{usernameErrors.username}</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleUsernameChange}
              activeOpacity={0.8}
            >
              <Text style={styles.saveButtonText}>SAVE USERNAME</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Password Change Modal */}
      <Modal
        visible={showPasswordModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {user.hasPassword ? "Change Password" : "Set Password"}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                haptics.buttonPress();
                setShowPasswordModal(false);
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setPasswordErrors({});
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            {user.hasPassword && (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Current Password</Text>
                <TextInput
                  style={[
                    styles.input,
                    passwordErrors.currentPassword && styles.inputError,
                  ]}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  placeholder="Enter current password"
                  secureTextEntry
                  maxLength={6}
                  keyboardType="numeric"
                />
                {passwordErrors.currentPassword && (
                  <Text style={styles.errorText}>
                    {passwordErrors.currentPassword}
                  </Text>
                )}
              </View>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>New Password (6 digits)</Text>
              <TextInput
                style={[
                  styles.input,
                  passwordErrors.newPassword && styles.inputError,
                ]}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter 6-digit password"
                secureTextEntry
                maxLength={6}
                keyboardType="numeric"
              />
              {passwordErrors.newPassword && (
                <Text style={styles.errorText}>
                  {passwordErrors.newPassword}
                </Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <TextInput
                style={[
                  styles.input,
                  passwordErrors.confirmPassword && styles.inputError,
                ]}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm 6-digit password"
                secureTextEntry
                maxLength={6}
                keyboardType="numeric"
              />
              {passwordErrors.confirmPassword && (
                <Text style={styles.errorText}>
                  {passwordErrors.confirmPassword}
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handlePasswordChange}
              activeOpacity={0.8}
            >
              <Text style={styles.saveButtonText}>SAVE PASSWORD</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
