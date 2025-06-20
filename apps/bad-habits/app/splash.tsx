import { APP_CONFIG, getThemeColors } from '@/constants/Data';
import { useAppStore } from '@/store/useAppStore';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen() {
  const { user, currentTheme } = useAppStore();

  // Get theme-aware colors
  const COLORS = getThemeColors(currentTheme === 'dark');

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Simulate loading time for better UX
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Check if user exists in storage
        if (user) {
          // User exists, check if password protection is needed
          if (user.hasPassword) {
            router.replace('/auth');
          } else {
            router.replace('/(tabs)');
          }
        } else {
          // No user exists, go to onboarding
          router.replace('/onboarding');
        }
      } catch (error) {
        console.error('🌅 [splash] Error during initialization:', error);
        // Fallback to onboarding on error
        router.replace('/onboarding');
      }
    };

    initializeApp();
  }, [user]);

  // Create styles with current theme colors
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    content: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 40,
    },
    logoContainer: {
      alignItems: 'center',
      marginTop: 60,
    },
    logo: {
      fontSize: 80,
      marginBottom: 20,
      color: COLORS.primary,
    },
    appName: {
      fontSize: 36,
      fontWeight: 'bold',
      color: COLORS.text,
      marginBottom: 8,
      letterSpacing: 1,
    },
    tagline: {
      fontSize: 16,
      color: COLORS.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
      maxWidth: 280,
    },
    welcomeContainer: {
      alignItems: 'center',
      maxWidth: 300,
    },
    welcomeTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: COLORS.text,
      marginBottom: 12,
      textAlign: 'center',
    },
    welcomeMessage: {
      fontSize: 16,
      color: COLORS.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
    },
    loadingContainer: {
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 14,
      color: COLORS.textSecondary,
      marginTop: 12,
    },
    footer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    footerText: {
      fontSize: 12,
      color: COLORS.textSecondary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo/Brand */}
        <View style={styles.logoContainer}>
          <Text style={styles.appName}>HabitForge</Text>
          <Text style={styles.tagline}>Forge Your Best Self</Text>
        </View>

        {/* Welcome Message */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>Welcome to HabitForge</Text>
          <Text style={styles.welcomeMessage}>
            Building better habits starts with a single step. Let&apos;s forge your path to success.
          </Text>
        </View>

        {/* Loading Indicator */}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Preparing your forge...</Text>
        </View>

        {/* Version Info */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Version {APP_CONFIG.version}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
} 