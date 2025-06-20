import { getThemeColors, HABIT_CATEGORIES } from '@/constants/Data';
import { useAppStore } from '@/store/useAppStore';
import { Habit, HabitCheckIn } from '@/types';
import { haptics } from '@/utils/haptics';
import React, { useCallback, useMemo } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface HabitCardProps {
  habit: Habit;
  todayCheckIns: HabitCheckIn[];
  onCheckIn: (habit: Habit, completed: boolean) => void;
  style?: any;
}

export const HabitCard = React.memo<HabitCardProps>(({
  habit,
  todayCheckIns,
  onCheckIn,
  style,
}) => {
  const { currentTheme } = useAppStore();
  const COLORS = getThemeColors(currentTheme === 'dark');

  // Memoize expensive calculations
  const category = useMemo(() => HABIT_CATEGORIES[habit.category], [habit.category]);
  
  const status = useMemo(() => {
    const todayCheckIn = todayCheckIns.find(
      (checkIn: HabitCheckIn) => checkIn.habitId === habit.id
    );
    
    if (todayCheckIn) {
      return todayCheckIn.completed ? 'completed' : 'missed';
    }
    
    return 'pending';
  }, [habit.id, todayCheckIns]);

  // Memoize styles to prevent re-creation
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);

  // Memoize callback functions
  const handleComplete = useCallback(() => {
    haptics.habitComplete();
    onCheckIn(habit, true);
  }, [habit, onCheckIn]);

  const handleMiss = useCallback(() => {
    haptics.habitMissed();
    onCheckIn(habit, false);
  }, [habit, onCheckIn]);

  return (
    <View style={[styles.habitCard, style]}>
      <View style={[styles.habitCardImage, { backgroundColor: category.color || `${COLORS.primary}30` }]}>
        <Text style={styles.habitIcon}>{category.icon}</Text>
      </View>

      <View style={styles.habitCardContent}>
        <View style={styles.habitCardHeader}>
          <View style={styles.habitInfo}>
            <Text style={styles.habitName}>{habit.name}</Text>
            <Text style={styles.habitCategory}>{category.name}</Text>
          </View>
          <View style={styles.streakContainer}>
            <Text style={styles.streakText}>{habit.streak}</Text>
            <Text style={styles.streakLabel}>days</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.habitActions}>
        {status === 'pending' && (
          <>
            <TouchableOpacity
              style={[styles.actionButton, styles.completeButton]}
              onPress={handleComplete}
              activeOpacity={0.8}
            >
              <Text style={styles.completeButtonText}>Complete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.missButton]}
              onPress={handleMiss}
              activeOpacity={0.8}
            >
              <Text style={styles.missButtonText}>Miss</Text>
            </TouchableOpacity>
          </>
        )}
        
        {status === 'completed' && (
          <View style={styles.completedStatus}>
            <Text style={styles.completedText}>Completed!</Text>
          </View>
        )}
        
        {status === 'missed' && (
          <View style={styles.missedStatus}>
            <Text style={styles.missedText}>Missed</Text>
          </View>
        )}
      </View>
    </View>
  );
});

// Separate styles creation to avoid re-creation on every render
const createStyles = (COLORS: any) => StyleSheet.create({
  habitCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    width: 280, // Fixed width for better performance
    marginRight: 16,
    marginBottom: 8,
  },
  habitCardImage: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  habitIcon: {
    fontSize: 40,
  },
  habitCardContent: {
    padding: 20,
  },
  habitCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  habitInfo: {
    flex: 1,
    marginRight: 12,
  },
  habitName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  habitCategory: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  streakContainer: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: COLORS.primary + '20',
  },
  streakText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  streakLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
    marginTop: 2,
  },
  habitActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  actionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  completeButton: {
    backgroundColor: COLORS.primary,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  missButton: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  missButtonText: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
  completedStatus: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.primary + '20',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  completedText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  missedStatus: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.error + '20',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  missedText: {
    color: COLORS.error,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

HabitCard.displayName = 'HabitCard'; 