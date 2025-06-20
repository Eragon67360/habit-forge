import { getThemeColors } from '@/constants/Data';
import { useAppStore } from '@/store/useAppStore';
import { router, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading, currentTheme, setAuthenticated, initializeStore } = useAppStore();
  const segments = useSegments();

  // Get theme-aware colors
  const COLORS = getThemeColors(currentTheme === 'dark');

  // Initialize store on mount - ensure users with passwords start unauthenticated
  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  useEffect(() => {
    if (isLoading) return;

    // If we're on splash, let it handle everything
    if (segments[0] === 'splash') {
      return;
    }

    // If we're on onboarding, let it handle its own logic
    if (segments[0] === 'onboarding') {
      return;
    }

    // If we're on auth screen, let it handle its own logic
    if (segments[0] === 'auth') {
      return;
    }

    // If we're on main app tabs and authenticated, let the tabs handle navigation
    if (segments[0] === '(tabs)' && isAuthenticated) {
      return;
    }

    // If user exists but not authenticated and has password, go to auth
    if (user && !isAuthenticated && user.hasPassword) {
      router.replace('/auth');
      return;
    }

    // If user exists and is authenticated, go to main app
    if (user && isAuthenticated) {
      router.replace('/(tabs)');
      return;
    }

    // If user exists but no password protection, go to main app (auto-authenticate)
    if (user && !user.hasPassword) {
      // Auto-authenticate users without password protection
      setAuthenticated(true);
      router.replace('/(tabs)');
      return;
    }

    // If no user exists, go to onboarding
    if (!user) {
      router.replace('/onboarding');
      return;
    }

    // Default: go to splash if we're not on any known screen
    router.replace('/splash');
  }, [user, isAuthenticated, isLoading, segments, setAuthenticated]);

  // Only show loading screen if we're not on splash and still loading
  const inSplash = segments[0] === 'splash';
  
  // Create styles with current theme colors
  const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.background,
    },
  });
  
  if (isLoading && !inSplash) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return <>{children}</>;
} 