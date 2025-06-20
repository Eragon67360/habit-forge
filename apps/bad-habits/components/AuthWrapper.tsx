import { getThemeColors } from '@/constants/Data';
import { useAppStore } from '@/store/useAppStore';
import { router, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading, currentTheme } = useAppStore();
  const segments = useSegments();

  // Get theme-aware colors
  const COLORS = getThemeColors(currentTheme === 'dark');

  useEffect(() => {
    const inSplash = segments[0] === 'splash';
    const inOnboarding = segments[0] === 'onboarding';
    const inAuth = segments[0] === 'auth';
    const inTabs = segments[0] === '(tabs)';

    console.log('AuthWrapper: Current state:', {
      user: !!user,
      isAuthenticated,
      isLoading,
      segments: segments[0],
      inSplash,
      inOnboarding,
      inAuth,
      inTabs
    });

    // If we're on splash, let it handle everything
    if (inSplash) {
      console.log('AuthWrapper: On splash, letting it handle navigation');
      return;
    }

    // If we're on onboarding, let it handle its own logic
    if (inOnboarding) {
      console.log('AuthWrapper: On onboarding, letting screen handle logic');
      return;
    }

    // If we're on auth screen, let it handle its own logic
    if (inAuth) {
      console.log('AuthWrapper: On auth, letting screen handle logic');
      return;
    }

    // If we're on main app tabs and authenticated, let the tabs handle navigation
    if (inTabs && isAuthenticated) {
      console.log('AuthWrapper: On main app and authenticated, letting tabs handle navigation');
      return;
    }

    // If user exists but not authenticated and has password, go to auth
    if (user && user.hasPassword && !isAuthenticated) {
      console.log('AuthWrapper: User has password but not authenticated, going to auth');
      router.replace('/auth' as any);
      return;
    }

    // If user exists and is authenticated, go to main app
    if (user && isAuthenticated) {
      console.log('AuthWrapper: User authenticated, going to main app');
      router.replace('/(tabs)' as any);
      return;
    }

    // If user exists but no password protection, go to main app (auto-authenticate)
    if (user && !user.hasPassword) {
      console.log('AuthWrapper: User exists without password, auto-authenticating');
      // Auto-authenticate users without password protection
      useAppStore.getState().setAuthenticated(true);
      router.replace('/(tabs)' as any);
      return;
    }

    // If no user exists, go to onboarding
    if (!user) {
      console.log('AuthWrapper: No user, going to onboarding');
      router.replace('/onboarding' as any);
      return;
    }

    // Default: go to splash if we're not on any known screen
    if (!inSplash && !inOnboarding && !inAuth && !inTabs) {
      console.log('AuthWrapper: Unknown screen, going to splash');
      router.replace('/splash' as any);
    }
  }, [user, isAuthenticated, segments]);

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