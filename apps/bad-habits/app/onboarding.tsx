import { APP_CONFIG, getThemeColors } from '@/constants/Data';
import { useAppStore } from '@/store/useAppStore';
import { User, UserPreferences } from '@/types';
import { generateId, hashPassword, validatePassword, validateUsername } from '@/utils/helpers';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingScreen() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hasPassword, setHasPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { setUser, setAuthenticated, currentTheme } = useAppStore();

  // Get theme-aware colors
  const COLORS = getThemeColors(currentTheme === 'dark');

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else {
      const validationErrors = validateUsername(username);
      if (validationErrors.length > 0) {
        newErrors.username = validationErrors[0].message;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (hasPassword) {
      if (!password) {
        newErrors.password = 'Password is required';
      } else {
        const validationErrors = validatePassword(password);
        if (validationErrors.length > 0) {
          newErrors.password = validationErrors[0].message;
        }
      }
      
      if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    } else if (step === 2) {
      if (validateStep2()) {
        createUser();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
    }
  };

  const createUser = async () => {
    try {
      const defaultPreferences: UserPreferences = {
        theme: 'auto',
        language: 'en',
        notifications: {
          enabled: true,
          dailyReminders: true,
          streakMilestones: true,
          encouragingMessages: true,
          reminderTime: APP_CONFIG.reminderTimeDefault,
        },
        primaryColor: COLORS.primary,
      };

      const userId = generateId();
      
      let passwordHash: string | undefined;
      if (hasPassword) {
        passwordHash = await hashPassword(password);
      }

      const user: User = {
        id: userId,
        username: username.trim(),
        hasPassword,
        passwordHash,
        createdAt: new Date(),
        lastLoginAt: new Date(),
        preferences: defaultPreferences,
      };

      setUser(user);
      
      // Only auto-authenticate users without password protection
      if (!hasPassword) {
        setAuthenticated(true);
        // Navigate to main app
        router.replace('/(tabs)' as any);
      } else {
        // Let AuthWrapper handle routing to auth screen
        router.replace('/auth');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create user. Please try again.');
    }
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>WELCOME TO</Text>
        <Text style={styles.title}>HABITFORGE</Text>
        <Text style={styles.subtitle}>
          Let&apos;s forge your path to better habits and personal growth
        </Text>
      </View>
      
      <View style={styles.formSection}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>CHOOSE A FORGE NAME</Text>
          <TextInput
            style={[styles.input, errors.username && styles.inputError]}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your forge name"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={APP_CONFIG.usernameMaxLength}
          />
          {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
        </View>
      </View>
      
      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
          <Text style={styles.primaryButtonText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>SECURE YOUR FORGE 🔒</Text>
        <Text style={styles.subtitle}>
          Optionally add a 6-digit password to protect your habit forge
        </Text>
      </View>
      
      <View style={styles.formSection}>
        <View style={styles.passwordToggle}>
          <TouchableOpacity
            style={[styles.toggleButton, hasPassword && styles.toggleButtonActive]}
            onPress={() => setHasPassword(!hasPassword)}
          >
            <Text style={[styles.toggleText, hasPassword && styles.toggleTextActive]}>
              {hasPassword ? '✓' : ''} PROTECT MY FORGE
            </Text>
          </TouchableOpacity>
        </View>
        
        {hasPassword && (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>6-DIGIT FORGE KEY</Text>
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter 6 digits"
                keyboardType="numeric"
                maxLength={6}
                secureTextEntry
              />
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>CONFIRM FORGE KEY</Text>
              <TextInput
                style={[styles.input, errors.confirmPassword && styles.inputError]}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm 6 digits"
                keyboardType="numeric"
                maxLength={6}
                secureTextEntry
              />
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
            </View>
          </>
        )}
      </View>
      
      <View style={styles.buttonSection}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleBack}>
            <Text style={styles.secondaryButtonText}>BACK</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
            <Text style={styles.primaryButtonText}>START FORGING</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // Create styles with current theme colors
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    keyboardView: {
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
      padding: 20,
    },
    header: {
      marginBottom: 40,
    },
    progressBar: {
      height: 4,
      backgroundColor: COLORS.border,
      borderRadius: 2,
      marginBottom: 10,
    },
    progressFill: {
      height: '100%',
      backgroundColor: COLORS.primary,
      borderRadius: 2,
    },
    stepIndicator: {
      fontSize: 14,
      color: COLORS.textSecondary,
      textAlign: 'center',
      fontWeight: '600',
    },
    stepContainer: {
      flex: 1,
      justifyContent: 'space-between',
    },
    headerSection: {
      alignItems: 'center',
      marginBottom: 40,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: COLORS.text,
      textAlign: 'center',
      marginBottom: 16,
      letterSpacing: 1,
    },
    subtitle: {
      fontSize: 16,
      color: COLORS.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
      maxWidth: 300,
    },
    formSection: {
      flex: 1,
      justifyContent: 'center',
    },
    inputContainer: {
      marginBottom: 24,
    },
    label: {
      fontSize: 14,
      fontWeight: 'bold',
      color: COLORS.text,
      marginBottom: 12,
      letterSpacing: 0.5,
    },
    input: {
      borderWidth: 2,
      borderColor: COLORS.border,
      borderRadius: 25,
      padding: 20,
      fontSize: 16,
      backgroundColor: COLORS.card,
      color: COLORS.text,
      textAlign: 'center',
    },
    inputError: {
      borderColor: COLORS.error,
    },
    errorText: {
      color: COLORS.error,
      fontSize: 14,
      marginTop: 8,
      textAlign: 'center',
      fontWeight: '600',
    },
    passwordToggle: {
      marginBottom: 24,
    },
    toggleButton: {
      padding: 20,
      borderWidth: 2,
      borderColor: COLORS.border,
      borderRadius: 25,
      backgroundColor: COLORS.card,
      alignItems: 'center',
    },
    toggleButtonActive: {
      borderColor: COLORS.primary,
      backgroundColor: COLORS.primary + '20',
    },
    toggleText: {
      fontSize: 16,
      color: COLORS.text,
      textAlign: 'center',
      fontWeight: 'bold',
      letterSpacing: 0.5,
    },
    toggleTextActive: {
      color: COLORS.primary,
    },
    buttonSection: {
      marginTop: 40,
    },
    buttonRow: {
      flexDirection: 'row',
      gap: 16,
    },
    primaryButton: {
      flex: 1,
      backgroundColor: COLORS.primary,
      padding: 20,
      borderRadius: 25,
      alignItems: 'center',
      shadowColor: COLORS.primary,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    primaryButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
    secondaryButton: {
      flex: 1,
      backgroundColor: COLORS.secondary,
      padding: 20,
      borderRadius: 25,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: COLORS.border,
    },
    secondaryButtonText: {
      color: COLORS.text,
      fontSize: 16,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(step / 2) * 100}%` }]} />
            </View>
            <Text style={styles.stepIndicator}>STEP {step} OF 2</Text>
          </View>
          
          {step === 1 ? renderStep1() : renderStep2()}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 