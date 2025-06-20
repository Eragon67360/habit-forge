import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';

import AuthWrapper from '@/components/AuthWrapper';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useAppStore } from '@/store/useAppStore';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { user, setTheme, currentTheme } = useAppStore();
  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Update theme based on user preferences or system
  useEffect(() => {
    if (user?.preferences.theme === 'auto') {
      setTheme(colorScheme || 'light');
    } else if (user?.preferences.theme) {
      setTheme(user.preferences.theme);
    } else {
      setTheme(colorScheme || 'light');
    }
  }, [user?.preferences.theme, colorScheme, setTheme]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ErrorBoundary>
      <ThemeProvider value={currentTheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthWrapper>
          <Stack screenOptions={{ headerShown: false }} initialRouteName="splash">
            {/* Splash screen - first screen to load */}
            <Stack.Screen name="splash" />
            
            {/* Authentication screens */}
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="auth" />
            
            {/* Main app screens */}
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style={currentTheme === 'dark' ? 'light' : 'dark'} />
        </AuthWrapper>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
