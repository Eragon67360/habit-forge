import { IconSymbol } from '@/components/ui/IconSymbol';
import { getThemeColors, HABIT_CATEGORIES } from '@/constants/Data';
import { useAppStore } from '@/store/useAppStore';
import { Habit, HabitCheckIn } from '@/types';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Path, Svg } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = height / 2;

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const {
    user,
    getActiveHabits,
    getTodayCheckIns,
    addCheckIn,
    getEncouragingMessage,
    currentTheme,
    dailyQuote,
    fetchDailyQuote,
    forceRefreshQuote,
    isQuoteLoading,
  } = useAppStore();

  // Get theme-aware colors
  const COLORS = getThemeColors(currentTheme === 'dark');

  const allActiveHabits = getActiveHabits();
  const todayCheckIns = getTodayCheckIns();

  // Filter active habits based on search query
  const activeHabits = allActiveHabits.filter((habit: Habit) => {
    const matchesSearch = habit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         habit.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Fetch quote only if we don't have one - this prevents infinite loops
  React.useEffect(() => {
    if (!dailyQuote) {
      fetchDailyQuote();
    }
  }, [dailyQuote, fetchDailyQuote]); // Added missing dependencies

  // Create styles with current theme colors
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    scrollView: {
      flex: 1,
    },
    headerBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: HEADER_HEIGHT*2,
    },
    headerContainer: {
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom:20
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    avatarText: {
      color: COLORS.card,
      fontSize: 18,
      fontWeight: 'bold',
    },
    headerName: {
      color: COLORS.background,
      fontSize: 16,
      fontWeight: '800',
    },
    menuIcon: {
      fontSize: 24,
      color: COLORS.text,
    },
    titleSection: {
      paddingHorizontal: 0,
      marginTop: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: COLORS.background,
      lineHeight: 40,
    },
    searchSection: {
      marginTop: 24,
    },
    searchBar: {
      backgroundColor: COLORS.card,
      borderRadius: 25,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      height: 50,
    },
    searchInput: {
      flex: 1,
      marginLeft: 12,
      fontSize: 16,
      color: COLORS.text,
    },
    filterButton: {
      fontSize: 20,
    },
    section: {
      paddingHorizontal: 20,
      marginTop: 0,
      paddingTop: 30,
      borderRadius: 20,

    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: COLORS.background,
      marginBottom: 16,
    },
    habitCard: {
      backgroundColor: COLORS.card,
      borderRadius: 20,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
      width: width * 0.66,
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
    emptyState: {
      alignItems: 'center',
      paddingVertical: 60,
      paddingHorizontal: 20,
      backgroundColor: COLORS.card,
      borderRadius: 20,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
    },
    emptyStateText: {
      fontSize: 18,
      fontWeight: '600',
      color: COLORS.text,
      marginBottom: 8,
    },
    emptyStateSubtext: {
      fontSize: 14,
      color: COLORS.textSecondary,
      textAlign: 'center',
    },
    quoteSection: {
      marginTop: 20,
      paddingHorizontal: 20,
      paddingBottom: 40,
    },
    quoteCard: {
      backgroundColor: COLORS.card,
      borderRadius: 20,
      padding: 24,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
    },
    quoteIcon: {
      fontSize: 24,
      color: COLORS.primary,
      marginBottom: 16,
    },
    quoteText: {
      fontSize: 18,
      fontStyle: 'italic',
      color: COLORS.text,
      lineHeight: 26,
      marginBottom: 16,
      textAlign: 'center',
    },
    quoteAuthor: {
      fontSize: 14,
      color: COLORS.textSecondary,
      textAlign: 'center',
      fontWeight: '600',
    },
  });

  const onRefresh = async () => {
    setRefreshing(true);
    
    try {
      // Add a small delay to prevent rapid requests
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Force refresh the daily quote from AI (always get new quote regardless of day)
      await forceRefreshQuote();
      
      // The store will automatically reload data from storage
      // since Zustand persist middleware handles this
      
    } catch (error) {
      console.error('Error refreshing content:', error);
      
      // Show user-friendly error message for rate limits
      if (error instanceof Error && error.message.includes('Rate limit')) {
        Alert.alert(
          'Rate Limit Reached',
          'You\'ve hit the API rate limit. Please wait 1-2 minutes before trying again, or consider upgrading your OpenAI plan for higher limits.',
          [{ text: 'OK' }]
        );
      }
    } finally {
      setRefreshing(false);
    }
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
    } catch {
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBackground}>
        <Svg height="100%" width="100%" style={{ position: 'absolute', bottom: 0, marginBottom:20 }}>
          <Path
            d={`M0,0
                L${width},0 
                L${width},${HEADER_HEIGHT + 100} 
                Q${width/2},${HEADER_HEIGHT+100} 
                0,${HEADER_HEIGHT} 
                L0,0 
                Z`}
            fill={COLORS.primary}
          />
        </Svg>
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />
          }
        >
          {/* Header Content */}
          <View style={styles.headerContainer}>
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <View style={[styles.avatar, { backgroundColor: COLORS.card }]}>
                  <Text style={[styles.avatarText, { color: COLORS.primary }]}>{user?.username?.[0].toUpperCase()}</Text>
                </View>
                <Text style={styles.headerName}>{user?.username}</Text>
              </View>
            </View>

            {/* Title */}
            <View style={styles.titleSection}>
              <Text style={styles.title}>Build Better Habits, One Day at a Time.</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchSection}>
              <View style={[styles.searchBar, { backgroundColor: COLORS.card, borderWidth: 0 }]}>
                <IconSymbol name="magnifyingglass" color={COLORS.textSecondary} size={20} />
                <TextInput
                  placeholder="Search habits..."
                  placeholderTextColor={COLORS.textSecondary}
                  style={styles.searchInput}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
            </View>
          </View>
          
          {/* Habits Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today&apos;s Habits</Text>
            {activeHabits.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  {searchQuery 
                    ? 'No habits found matching your search'
                    : 'You have no active habits.'
                  }
                </Text>
                <Text style={styles.emptyStateSubtext}>
                  {searchQuery
                    ? 'Try adjusting your search terms'
                    : 'Use the plus button to add a habit.'
                  }
                </Text>
              </View>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginHorizontal: -20 }}
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
              >
                {activeHabits.map(renderHabitCard)}
              </ScrollView>
            )}
          </View>
          
          {/* Quote of the Day Section */}
          <View style={styles.quoteSection}>
            <View style={styles.quoteCard}>
              <Text style={styles.quoteIcon}>💭</Text>
              {isQuoteLoading ? (
                <>
                  <Text style={styles.quoteText}>
                    Loading new inspirational quote...
                  </Text>
                  <Text style={styles.quoteAuthor}>
                    — AI is thinking...
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.quoteText}>
                    {dailyQuote ? `${dailyQuote.text}` : 'Loading inspirational quote...'}
                  </Text>
                  <Text style={styles.quoteAuthor}>
                    {dailyQuote ? `— ${dailyQuote.author}` : '— Loading...'}
                  </Text>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}