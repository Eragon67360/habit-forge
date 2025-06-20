import { getThemeColors, HABIT_CATEGORIES } from '@/constants/Data';
import { useAppStore } from '@/store/useAppStore';
import { Habit, HabitCheckIn } from '@/types';
import { formatDate } from '@/utils/helpers';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [encouragingMessage, setEncouragingMessage] = useState('');
  
  const {
    user,
    habits,
    checkIns,
    getActiveHabits,
    getTodayCheckIns,
    addCheckIn,
    updateStreak,
    getEncouragingMessage,
    currentTheme,
  } = useAppStore();

  // Get theme-aware colors
  const COLORS = getThemeColors(currentTheme === 'dark');

  const activeHabits = getActiveHabits();
  const todayCheckIns = getTodayCheckIns();

  // Create styles with current theme colors
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    scrollView: {
      flex: 1,
    },
    heroSection: {
      padding: 20,
      paddingBottom: 10,
      backgroundColor: COLORS.card,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
    },
    greetingContainer: {
      alignItems: 'flex-start',
    },
    greetingTime: {
      fontSize: 28,
      fontWeight: 'bold',
      color: COLORS.text,
      marginBottom: 4,
    },
    greetingName: {
      fontSize: 28,
      fontWeight: 'bold',
      color: COLORS.primary,
      marginBottom: 8,
    },
    greetingDate: {
      fontSize: 16,
      color: COLORS.textSecondary,
    },
    quoteContainer: {
      margin: 20,
      marginTop: 16,
      padding: 20,
      backgroundColor: COLORS.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: COLORS.border,
      shadowColor: COLORS.text,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    quoteText: {
      fontSize: 16,
      color: COLORS.text,
      textAlign: 'center',
      fontWeight: '500',
      lineHeight: 24,
      fontStyle: 'italic',
    },
    statsContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 24,
      gap: 12,
    },
    statCard: {
      flex: 1,
      backgroundColor: COLORS.card,
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: COLORS.border,
      shadowColor: COLORS.text,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 1,
    },
    statNumber: {
      fontSize: 24,
      fontWeight: 'bold',
      color: COLORS.primary,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: COLORS.textSecondary,
      textAlign: 'center',
      fontWeight: '500',
    },
    section: {
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: COLORS.text,
      marginBottom: 16,
    },
    habitCard: {
      backgroundColor: COLORS.card,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: COLORS.border,
      shadowColor: COLORS.text,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    habitHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    habitInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    habitIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: COLORS.primary + '15',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    habitIcon: {
      fontSize: 20,
    },
    habitText: {
      flex: 1,
    },
    habitName: {
      fontSize: 18,
      fontWeight: '600',
      color: COLORS.text,
      marginBottom: 4,
    },
    habitCategory: {
      fontSize: 14,
      color: COLORS.textSecondary,
      fontWeight: '500',
    },
    streakContainer: {
      alignItems: 'center',
      backgroundColor: COLORS.primary + '10',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 12,
    },
    streakText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: COLORS.primary,
    },
    streakLabel: {
      fontSize: 12,
      color: COLORS.textSecondary,
      fontWeight: '500',
    },
    habitActions: {
      flexDirection: 'row',
      gap: 12,
    },
    actionButton: {
      flex: 1,
      padding: 14,
      borderRadius: 12,
      alignItems: 'center',
      borderWidth: 1,
    },
    completeButton: {
      backgroundColor: COLORS.success + '15',
      borderColor: COLORS.success,
    },
    completeButtonText: {
      color: COLORS.success,
      fontWeight: '600',
      fontSize: 16,
    },
    missButton: {
      backgroundColor: COLORS.error + '15',
      borderColor: COLORS.error,
    },
    missButtonText: {
      color: COLORS.error,
      fontWeight: '600',
      fontSize: 16,
    },
    completedStatus: {
      flex: 1,
      padding: 14,
      backgroundColor: COLORS.success + '15',
      borderRadius: 12,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: COLORS.success,
    },
    completedText: {
      color: COLORS.success,
      fontWeight: '600',
      fontSize: 16,
    },
    missedStatus: {
      flex: 1,
      padding: 14,
      backgroundColor: COLORS.error + '15',
      borderRadius: 12,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: COLORS.error,
    },
    missedText: {
      color: COLORS.error,
      fontWeight: '600',
      fontSize: 16,
    },
    emptyState: {
      alignItems: 'center',
      padding: 40,
    },
    emptyStateText: {
      fontSize: 18,
      fontWeight: '600',
      color: COLORS.textSecondary,
      marginBottom: 8,
    },
    emptyStateSubtext: {
      fontSize: 14,
      color: COLORS.textSecondary,
      textAlign: 'center',
    },
  });

  useEffect(() => {
    // Set encouraging message on mount
    const message = getEncouragingMessage('daily');
    setEncouragingMessage(message);
  }, [getEncouragingMessage]);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleCheckIn = (habit: Habit, completed: boolean) => {
    try {
      const newCheckIn: Omit<HabitCheckIn, 'id'> = {
        habitId: habit.id,
        date: new Date(),
        completed,
        notes: '',
      };

      addCheckIn(newCheckIn);

      // Show encouraging message
      const message = completed
        ? getEncouragingMessage('achievement', habit.streak + 1)
        : getEncouragingMessage('setback');

      if (message) {
        Alert.alert(
          completed ? 'Great job!' : 'Keep going!',
          message,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to check in. Please try again.');
    }
  };

  const getHabitStatus = (habit: Habit) => {
    const todayCheckIn = todayCheckIns.find(
      (checkIn: HabitCheckIn) => checkIn.habitId === habit.id
    );
    
    if (todayCheckIn) {
      return todayCheckIn.completed ? 'completed' : 'missed';
    }
    
    return 'pending';
  };

  const renderHabitCard = (habit: Habit) => {
    const status = getHabitStatus(habit);
    const category = HABIT_CATEGORIES[habit.category];
    
    return (
      <View key={habit.id} style={styles.habitCard}>
        <View style={styles.habitHeader}>
          <View style={styles.habitInfo}>
            <View style={styles.habitIconContainer}>
              <Text style={styles.habitIcon}>{category.icon}</Text>
            </View>
            <View style={styles.habitText}>
              <Text style={styles.habitName}>{habit.name}</Text>
              <Text style={styles.habitCategory}>{category.name}</Text>
            </View>
          </View>
          <View style={styles.streakContainer}>
            <Text style={styles.streakText}>{habit.streak}</Text>
            <Text style={styles.streakLabel}>days</Text>
          </View>
        </View>
        
        <View style={styles.habitActions}>
          {status === 'pending' && (
            <>
              <TouchableOpacity
                style={[styles.actionButton, styles.completeButton]}
                onPress={() => handleCheckIn(habit, true)}
              >
                <Text style={styles.completeButtonText}>Complete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.missButton]}
                onPress={() => handleCheckIn(habit, false)}
              >
                <Text style={styles.missButtonText}>Miss</Text>
              </TouchableOpacity>
            </>
          )}
          
          {status === 'completed' && (
            <View style={styles.completedStatus}>
              <Text style={styles.completedText}>Completed today</Text>
            </View>
          )}
          
          {status === 'missed' && (
            <View style={styles.missedStatus}>
              <Text style={styles.missedText}>Missed today</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderStats = () => {
    const totalHabits = activeHabits.length;
    const completedToday = todayCheckIns.filter((checkIn: HabitCheckIn) => checkIn.completed).length;
    const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

    return (
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalHabits}</Text>
          <Text style={styles.statLabel}>Active Habits</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{completedToday}</Text>
          <Text style={styles.statLabel}>Completed Today</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{completionRate}%</Text>
          <Text style={styles.statLabel}>Completion Rate</Text>
        </View>
      </View>
    );
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Hero Section with Greeting */}
        <View style={styles.heroSection}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingTime}>{getGreeting()}</Text>
            <Text style={styles.greetingName}>{user?.username}</Text>
            <Text style={styles.greetingDate}>{formatDate(new Date())}</Text>
          </View>
        </View>

        {/* Encouraging Quote */}
        {encouragingMessage && (
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>{encouragingMessage}</Text>
          </View>
        )}

        {/* Stats Section */}
        {renderStats()}

        {/* Habits Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today&apos;s Habits</Text>
          {activeHabits.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No active habits yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Add some habits to start tracking your progress
              </Text>
            </View>
          ) : (
            activeHabits.map(renderHabitCard)
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
