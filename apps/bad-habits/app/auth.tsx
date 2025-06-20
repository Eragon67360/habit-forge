import { getThemeColors } from '@/constants/Data';
import { useAppStore } from '@/store/useAppStore';
import { verifyPassword } from '@/utils/helpers';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthScreen() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  
  const { user, setAuthenticated, currentTheme } = useAppStore();

  // Get theme-aware colors
  const COLORS = getThemeColors(currentTheme === 'dark');

  useEffect(() => {
    if (!user?.hasPassword) {
      // User doesn't have password protection, go directly to main app
      setAuthenticated(true);
      router.replace('/(tabs)');
    }
  }, [user, setAuthenticated]);

  const shakeInput = useCallback(() => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [shakeAnimation]);

  const handleSubmit = useCallback(async () => {
    if (password.length !== 6) {
      return;
    }

    setIsLoading(true);

    try {
      // Simple delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));

      if (user?.passwordHash && await verifyPassword(password, user.passwordHash)) {
        setAuthenticated(true);
        router.replace('/(tabs)');
      } else {
        setPassword('');
        shakeInput();
        // Removed Alert - just shake animation and clear input
      }
    } catch {
      Alert.alert('Error', 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [password, user?.passwordHash, setAuthenticated, shakeInput]);

  // Auto-submit when password reaches 6 digits
  useEffect(() => {
    if (password.length === 6) {
      handleSubmit();
    }
  }, [password, handleSubmit]);

  const handleNumberPress = (number: string) => {
    if (password.length < 6) {
      setPassword(prev => prev + number);
    }
  };

  const handleDelete = () => {
    setPassword(prev => prev.slice(0, -1));
  };

  const renderNumberPad = () => {
    const numbers = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['', '0', 'del'],
    ];

    return numbers.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.numberRow}>
        {row.map((number, colIndex) => (
          <TouchableOpacity
            key={colIndex}
            style={[
              styles.numberButton,
              number === 'del' && styles.deleteButton,
              number === '' && styles.emptyButton,
            ]}
            onPress={() => {
              if (number === 'del') {
                handleDelete();
              } else if (number !== '') {
                handleNumberPress(number);
              }
            }}
            disabled={number === '' || isLoading}
          >
            <Text style={[
              styles.numberText,
              number === 'del' && styles.deleteText,
            ]}>
              {number === 'del' ? '⌫' : number}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  const renderPasswordDots = () => {
    return (
      <View style={styles.passwordContainer}>
        {Array.from({ length: 6 }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.passwordDot,
              index < password.length && styles.passwordDotFilled,
            ]}
          />
        ))}
      </View>
    );
  };

  // Create styles with current theme colors
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    keyboardView: {
      flex: 1,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    header: {
      alignItems: 'center',
      marginBottom: 40,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: COLORS.text,
      marginBottom: 8,
    },
    usernameText: {
      fontSize: 18,
      color: COLORS.primary,
      fontWeight: '600',
      marginBottom: 8,
    },
    instructionText: {
      fontSize: 16,
      color: COLORS.textSecondary,
      textAlign: 'center',
    },
    passwordSection: {
      alignItems: 'center',
      marginBottom: 40,
    },
    passwordContainer: {
      flexDirection: 'row',
      gap: 12,
    },
    passwordDot: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: COLORS.border,
      backgroundColor: 'transparent',
    },
    passwordDotFilled: {
      backgroundColor: COLORS.primary,
      borderColor: COLORS.primary,
    },
    numberPadContainer: {
      marginBottom: 30,
    },
    numberRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 16,
    },
    numberButton: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: COLORS.card,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 8,
      borderWidth: 1,
      borderColor: COLORS.border,
    },
    deleteButton: {
      backgroundColor: COLORS.card,
      borderColor: COLORS.border,
    },
    emptyButton: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    numberText: {
      fontSize: 24,
      fontWeight: '600',
      color: COLORS.text,
    },
    deleteText: {
      fontSize: 20,
      color: COLORS.text,
    },
    loadingContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    loadingText: {
      fontSize: 16,
      fontWeight: '600',
      color: COLORS.text,
    },
    forgotContainer: {
      padding: 20,
      alignItems: 'center',
    },
    forgotButton: {
      alignItems: 'center',
    },
    forgotText: {
      fontSize: 14,
      color: COLORS.textSecondary,
      textDecorationLine: 'underline',
    },
  });

  if (!user) {
    return null; // Will redirect to onboarding
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Text style={styles.usernameText}>{user.username}</Text>
            <Text style={styles.instructionText}>
              Enter your 6-digit password to continue
            </Text>
          </View>

          <Animated.View
            style={[
              styles.passwordSection,
              {
                transform: [{ translateX: shakeAnimation }],
              },
            ]}
          >
            {renderPasswordDots()}
          </Animated.View>

          <View style={styles.numberPadContainer}>
            {renderNumberPad()}
          </View>

        </View>

        {/* Forgot Password at the very bottom */}
        <View style={styles.forgotContainer}>
          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => {
              Alert.alert(
                'Reset Password',
                'This will reset your password. You will need to set up a new one.',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: () => {
                      // In a real app, you'd implement password reset logic
                      Alert.alert('Reset', 'Password reset functionality would be implemented here.');
                    },
                  },
                ]
              );
            }}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 