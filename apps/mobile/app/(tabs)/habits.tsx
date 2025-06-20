import { AccessibleButton, AccessibleText } from '@/components/AccessibilityWrapper';
import { AdvancedFilters } from '@/components/AdvancedFilters';
import { AnalyticsChart } from '@/components/AnalyticsChart';
import { AnimatedCard } from '@/components/AnimatedCard';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { getThemeColors, HABIT_CATEGORIES, PREDEFINED_HABITS } from '@/constants/Data';
import { useAppStore } from '@/store/useAppStore';
import { Habit, HabitCategory } from '@/types';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HabitsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<HabitCategory | 'all'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'good' | 'bad'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newHabit, setNewHabit] = useState({
    name: '',
    description: '',
    category: 'exercise' as HabitCategory,
    type: 'good' as 'good' | 'bad',
    frequency: 'daily' as 'daily' | 'weekly' | 'monthly',
    icon: '🏃‍♂️',
  });
  const [habitErrors, setHabitErrors] = useState<Record<string, string>>({});
  const [addMode, setAddMode] = useState<'custom' | 'predefined'>('custom');
  const [advancedFilters, setAdvancedFilters] = useState({
    dateRange: 'all' as 'all' | 'today' | 'week' | 'month',
    sortBy: 'name' as 'name' | 'streak' | 'created',
    sortOrder: 'asc' as 'asc' | 'desc',
    showInactive: true,
  });
  
  const {
    habits,
    toggleHabitActive,
    deleteHabit,
    currentTheme,
    addHabit,
  } = useAppStore();

  // Get theme-aware colors
  const COLORS = getThemeColors(currentTheme === 'dark');

  const filteredHabits = habits.filter((habit: Habit) => {
    const matchesCategory = selectedCategory === 'all' || habit.category === selectedCategory;
    const matchesType = selectedType === 'all' || habit.type === selectedType;
    const matchesSearch = habit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         habit.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesInactive = advancedFilters.showInactive || habit.isActive;
    
    return matchesCategory && matchesType && matchesSearch && matchesInactive;
  });

  // Sort habits based on advanced filters
  const sortedHabits = [...filteredHabits].sort((a, b) => {
    let comparison = 0;
    
    switch (advancedFilters.sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'streak':
        comparison = a.streak - b.streak;
        break;
      case 'created':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
    }
    
    return advancedFilters.sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleToggleHabit = (habitId: string) => {
    toggleHabitActive(habitId);
  };

  const handleDeleteHabit = (habit: Habit) => {
    Alert.alert(
      'Delete Habit',
      `Are you sure you want to delete "${habit.name}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteHabit(habit.id),
        },
      ]
    );
  };

  const handleAddFromPredefined = (predefinedHabit: typeof PREDEFINED_HABITS[0]) => {
    try {
      const habitData = {
        name: predefinedHabit.name,
        description: predefinedHabit.description,
        category: predefinedHabit.category,
        type: predefinedHabit.type,
        targetFrequency: predefinedHabit.suggestedFrequency,
        startDate: new Date(),
        notes: [],
        isActive: true,
        lastCheckIn: undefined,
      };
      
      addHabit(habitData);
      setShowAddModal(false);
      Alert.alert('Success', `"${predefinedHabit.name}" added to your habits!`);
    } catch {
      Alert.alert('Error', 'Failed to add predefined habit. Please try again.');
    }
  };

  const validateHabitForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!newHabit.name.trim()) {
      errors.name = 'Habit name is required';
    } else if (newHabit.name.trim().length < 2) {
      errors.name = 'Habit name must be at least 2 characters';
    } else if (newHabit.name.trim().length > 50) {
      errors.name = 'Habit name must be less than 50 characters';
    }
    
    if (newHabit.description && newHabit.description.length > 200) {
      errors.description = 'Description must be less than 200 characters';
    }
    
    setHabitErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateHabit = () => {
    if (!validateHabitForm()) return;
    
    try {
      const habitData = {
        name: newHabit.name.trim(),
        description: newHabit.description.trim() || undefined,
        category: newHabit.category,
        type: newHabit.type,
        targetFrequency: newHabit.frequency,
        startDate: new Date(),
        notes: [],
        isActive: true,
        lastCheckIn: undefined,
      };
      
      addHabit(habitData);
      setShowAddModal(false);
      setNewHabit({
        name: '',
        description: '',
        category: 'exercise',
        type: 'good',
        frequency: 'daily',
        icon: '🏃‍♂️',
      });
      setHabitErrors({});
      Alert.alert('Success', 'Habit created successfully!');
    } catch {
      Alert.alert('Error', 'Failed to create habit. Please try again.');
    }
  };

  const handleResetForm = () => {
    setNewHabit({
      name: '',
      description: '',
      category: 'exercise',
      type: 'good',
      frequency: 'daily',
      icon: '🏃‍♂️',
    });
    setHabitErrors({});
  };

  const renderCategoryFilter = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filterContainer}
      contentContainerStyle={styles.filterContent}
    >
      <TouchableOpacity
        style={[
          styles.filterChip,
          selectedCategory === 'all' && styles.filterChipActive,
        ]}
        onPress={() => setSelectedCategory('all')}
        accessible={true}
        accessibilityLabel="Show all categories"
        accessibilityRole="button"
      >
        <Text style={[
          styles.filterChipText,
          selectedCategory === 'all' && styles.filterChipTextActive,
        ]}>
          All
        </Text>
      </TouchableOpacity>
      
      {Object.entries(HABIT_CATEGORIES).map(([key, category]) => (
        <TouchableOpacity
          key={key}
          style={[
            styles.filterChip,
            selectedCategory === key && styles.filterChipActive,
          ]}
          onPress={() => setSelectedCategory(key as HabitCategory)}
          accessible={true}
          accessibilityLabel={`Filter by ${category.name} category`}
          accessibilityRole="button"
        >
          <Text style={styles.filterChipIcon}>{category.icon}</Text>
          <Text style={[
            styles.filterChipText,
            selectedCategory === key && styles.filterChipTextActive,
          ]}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderTypeFilter = () => (
    <View style={styles.typeFilterContainer}>
      <TouchableOpacity
        style={[
          styles.typeChip,
          selectedType === 'all' && styles.typeChipActive,
        ]}
        onPress={() => setSelectedType('all')}
        accessible={true}
        accessibilityLabel="Show all habit types"
        accessibilityRole="button"
      >
        <Text style={[
          styles.typeChipText,
          selectedType === 'all' && styles.typeChipTextActive,
        ]}>
          All Types
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.typeChip,
          selectedType === 'good' && styles.typeChipActive,
        ]}
        onPress={() => setSelectedType('good')}
        accessible={true}
        accessibilityLabel="Show only good habits"
        accessibilityRole="button"
      >
        <Text style={[
          styles.typeChipText,
          selectedType === 'good' && styles.typeChipTextActive,
        ]}>
          Good Habits
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.typeChip,
          selectedType === 'bad' && styles.typeChipActive,
        ]}
        onPress={() => setSelectedType('bad')}
        accessible={true}
        accessibilityLabel="Show only bad habits"
        accessibilityRole="button"
      >
        <Text style={[
          styles.typeChipText,
          selectedType === 'bad' && styles.typeChipTextActive,
        ]}>
          Bad Habits
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderHabitCard = (habit: Habit, index: number) => {
    const category = HABIT_CATEGORIES[habit.category];
    
    return (
      <AnimatedCard
        key={habit.id}
        delay={index * 100}
        style={{}}
      >
        <View>
          <View style={styles.habitHeader}>
            <View style={styles.habitIconContainer}>
              <Text style={styles.habitIcon}>{category.icon}</Text>
            </View>
            <View style={styles.habitInfo}>
              <AccessibleText
                style={styles.habitName}
                accessibilityRole="header"
                accessibilityLabel={`Habit: ${habit.name}`}
              >
                {habit.name}
              </AccessibleText>
              <AccessibleText
                style={styles.habitCategory}
                accessibilityLabel={`Category: ${category.name}`}
              >
                {category.name}
              </AccessibleText>
            </View>
            <View style={[
              styles.statusBadge,
              habit.isActive ? styles.statusActive : styles.statusInactive,
            ]}>
              <Text style={[
                styles.statusText,
                habit.isActive ? styles.statusTextActive : styles.statusTextInactive,
              ]}>
                {habit.isActive ? 'Active' : 'Inactive'}
              </Text>
            </View>
          </View>
          {habit.description && (
            <AccessibleText
              style={styles.habitDescription}
              accessibilityLabel={`Description: ${habit.description}`}
            >
              {habit.description}
            </AccessibleText>
          )}
          {habit.isActive && (
            <AnalyticsChart habitId={habit.id} days={7} />
          )}
          <View style={styles.habitStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{habit.streak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {habit.lastCheckIn ? formatDate(habit.lastCheckIn) : 'Never'}
              </Text>
              <Text style={styles.statLabel}>Last Check-in</Text>
            </View>
          </View>
          <View style={styles.habitActions}>
            <AccessibleButton
              title={habit.isActive ? 'Deactivate' : 'Activate'}
              onPress={() => handleToggleHabit(habit.id)}
              hint={`${habit.isActive ? 'Deactivate' : 'Activate'} this habit`}
              style={[styles.actionButton, styles.primaryAction]}
              textStyle={styles.primaryActionText}
            />
            <AccessibleButton
              title="Edit"
              onPress={() => {
                Alert.alert('Edit Habit', 'Edit functionality will be implemented soon.');
              }}
              hint="Edit this habit"
              style={[styles.actionButton, styles.secondaryAction]}
              textStyle={styles.secondaryActionText}
            />
            <AccessibleButton
              title="Delete"
              onPress={() => handleDeleteHabit(habit)}
              hint="Delete this habit permanently"
              style={[styles.actionButton, styles.dangerAction]}
              textStyle={styles.dangerActionText}
            />
          </View>
        </View>
      </AnimatedCard>
    );
  };

  const renderAddHabitModal = () => (
    <Modal
      visible={showAddModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Add New Habit</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setShowAddModal(false);
              handleResetForm();
            }}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.modeToggle}>
          <TouchableOpacity
            style={[
              styles.modeOption,
              addMode === 'custom' && styles.modeOptionActive,
            ]}
            onPress={() => setAddMode('custom')}
          >
            <Text style={[
              styles.modeOptionText,
              addMode === 'custom' && styles.modeOptionTextActive,
            ]}>
              Custom
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.modeOption,
              addMode === 'predefined' && styles.modeOptionActive,
            ]}
            onPress={() => setAddMode('predefined')}
          >
            <Text style={[
              styles.modeOptionText,
              addMode === 'predefined' && styles.modeOptionTextActive,
            ]}>
              Predefined
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          {addMode === 'custom' ? (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>HABIT NAME *</Text>
                <TextInput
                  style={[styles.input, habitErrors.name && styles.inputError]}
                  value={newHabit.name}
                  onChangeText={(text) => setNewHabit({ ...newHabit, name: text })}
                  placeholder="e.g., Daily Exercise"
                  placeholderTextColor={COLORS.textSecondary}
                  maxLength={50}
                />
                {habitErrors.name && <Text style={styles.errorText}>{habitErrors.name}</Text>}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>DESCRIPTION (OPTIONAL)</Text>
                <TextInput
                  style={[styles.textArea, habitErrors.description && styles.inputError]}
                  value={newHabit.description}
                  onChangeText={(text) => setNewHabit({ ...newHabit, description: text })}
                  placeholder="Describe your habit..."
                  placeholderTextColor={COLORS.textSecondary}
                  multiline
                  numberOfLines={3}
                  maxLength={200}
                />
                {habitErrors.description && <Text style={styles.errorText}>{habitErrors.description}</Text>}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>CATEGORY</Text>
                <View style={styles.categoryGrid}>
                  {Object.entries(HABIT_CATEGORIES).map(([key, category]) => (
                    <TouchableOpacity
                      key={key}
                      style={[
                        styles.categoryOption,
                        newHabit.category === key && styles.categoryOptionActive,
                      ]}
                      onPress={() => setNewHabit({ ...newHabit, category: key as HabitCategory })}
                    >
                      <Text style={styles.categoryIcon}>{category.icon}</Text>
                      <Text style={[
                        styles.categoryText,
                        newHabit.category === key && styles.categoryTextActive,
                      ]}>
                        {category.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>HABIT TYPE</Text>
                <View style={styles.typeSelector}>
                  <TouchableOpacity
                    style={[
                      styles.typeOption,
                      newHabit.type === 'good' && styles.typeOptionActive,
                    ]}
                    onPress={() => setNewHabit({ ...newHabit, type: 'good' })}
                  >
                    <Text style={[
                      styles.typeOptionText,
                      newHabit.type === 'good' && styles.typeOptionTextActive,
                    ]}>
                      Good Habit
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.typeOption,
                      newHabit.type === 'bad' && styles.typeOptionActive,
                    ]}
                    onPress={() => setNewHabit({ ...newHabit, type: 'bad' })}
                  >
                    <Text style={[
                      styles.typeOptionText,
                      newHabit.type === 'bad' && styles.typeOptionTextActive,
                    ]}>
                      Bad Habit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>FREQUENCY</Text>
                <View style={styles.frequencySelector}>
                  {['daily', 'weekly', 'monthly'].map((freq) => (
                    <TouchableOpacity
                      key={freq}
                      style={[
                        styles.frequencyOption,
                        newHabit.frequency === freq && styles.frequencyOptionActive,
                      ]}
                      onPress={() => setNewHabit({ ...newHabit, frequency: freq as 'daily' | 'weekly' | 'monthly' })}
                    >
                      <Text style={[
                        styles.frequencyOptionText,
                        newHabit.frequency === freq && styles.frequencyOptionTextActive,
                      ]}>
                        {freq.charAt(0).toUpperCase() + freq.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity
                style={styles.createButton}
                onPress={handleCreateHabit}
              >
                <Text style={styles.createButtonText}>CREATE HABIT</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.predefinedGrid}>
                {PREDEFINED_HABITS.map((predefinedHabit, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.predefinedCard}
                    onPress={() => handleAddFromPredefined(predefinedHabit)}
                  >
                    <View style={styles.predefinedContent}>
                      <Text style={styles.predefinedIcon}>{predefinedHabit.icon}</Text>
                      <Text style={styles.predefinedName}>{predefinedHabit.name}</Text>
                      <Text style={styles.predefinedDescription}>
                        {predefinedHabit.description}
                      </Text>
                    </View>
                    <View style={styles.predefinedMeta}>
                      <Text style={styles.predefinedType}>
                        {predefinedHabit.type === 'good' ? '✅' : '❌'} {predefinedHabit.type === 'good' ? 'Good' : 'Bad'}
                      </Text>
                      <Text style={styles.predefinedFrequency}>
                        {predefinedHabit.suggestedFrequency}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: COLORS.text,
    },
    headerActions: {
      flexDirection: 'row',
      gap: 8,
    },
    filterButton: {
      padding: 8,
      borderRadius: 16,
      backgroundColor: COLORS.card,
    },
    addButton: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
    },
    addButtonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '600',
    },
    searchContainer: {
      paddingHorizontal: 20,
      paddingVertical: 4,
    },
    searchInput: {
      backgroundColor: COLORS.card,
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      color: COLORS.text,
    },
    filterContainer: {
      paddingHorizontal: 20,
      marginBlock:8,
      height: 52,
    },
    filterContent: {
      paddingRight: 20,
      alignItems: 'center',
    },
    filterChip: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 16,
      backgroundColor: COLORS.card,
      borderWidth: 1,
      borderColor: COLORS.border,
      marginRight: 8,
      gap: 4,
      height: 32,
    },
    filterChipActive: {
      backgroundColor: COLORS.primary + '15',
      borderColor: COLORS.primary,
    },
    filterChipIcon: {
      fontSize: 12,
    },
    filterChipText: {
      fontSize: 13,
      color: COLORS.text,
      fontWeight: '500',
    },
    filterChipTextActive: {
      color: COLORS.primary,
      fontWeight: '600',
    },
    typeFilterContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 8,
      gap: 8,
      height: 40,
    },
    typeChip: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 16,
      backgroundColor: COLORS.card,
      borderWidth: 1,
      borderColor: COLORS.border,
      alignItems: 'center',
      height: 32,
    },
    typeChipActive: {
      backgroundColor: COLORS.primary + '15',
      borderColor: COLORS.primary,
    },
    typeChipText: {
      fontSize: 13,
      color: COLORS.text,
      fontWeight: '500',
    },
    typeChipTextActive: {
      color: COLORS.primary,
      fontWeight: '600',
    },
    content: {
      paddingHorizontal: 20,
      height: '100%',
    },
    habitCard: {
      backgroundColor: COLORS.card,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: COLORS.border,
      shadowColor: COLORS.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    habitHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    habitIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: COLORS.primary + '15',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
    },
    habitIcon: {
      fontSize: 20,
    },
    habitInfo: {
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
    habitDescription: {
      fontSize: 14,
      color: COLORS.textSecondary,
      lineHeight: 20,
      marginBottom: 16,
      paddingLeft: 64, // Align with habit name
    },
    statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      borderWidth: 1,
    },
    statusActive: {
      backgroundColor: COLORS.success + '15',
      borderColor: COLORS.success + '30',
    },
    statusInactive: {
      backgroundColor: COLORS.textSecondary + '15',
      borderColor: COLORS.textSecondary + '30',
    },
    statusText: {
      fontSize: 12,
      fontWeight: '600',
    },
    statusTextActive: {
      color: COLORS.success,
    },
    statusTextInactive: {
      color: COLORS.textSecondary,
    },
    habitStats: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      paddingVertical: 16,
      paddingHorizontal: 16,
      backgroundColor: COLORS.background,
      borderRadius: 12,
    },
    statItem: {
      flex: 1,
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 20,
      fontWeight: '700',
      color: COLORS.primary,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: COLORS.textSecondary,
      fontWeight: '500',
    },
    statDivider: {
      width: 1,
      height: 32,
      backgroundColor: COLORS.border,
      marginHorizontal: 16,
    },
    habitActions: {
      flexDirection: 'row',
      gap: 8,
    },
    actionButton: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      alignItems: 'center',
      borderWidth: 1,
    },
    primaryAction: {
      backgroundColor: COLORS.primary + '15',
      borderColor: COLORS.primary + '30',
    },
    primaryActionText: {
      color: COLORS.primary,
      fontSize: 14,
      fontWeight: '600',
    },
    secondaryAction: {
      backgroundColor: COLORS.card,
      borderColor: COLORS.border,
    },
    secondaryActionText: {
      color: COLORS.text,
      fontSize: 14,
      fontWeight: '600',
    },
    dangerAction: {
      backgroundColor: COLORS.error + '15',
      borderColor: COLORS.error + '30',
    },
    dangerActionText: {
      color: COLORS.error,
      fontSize: 14,
      fontWeight: '600',
    },
    emptyState: {
      alignItems: 'center',
      padding: 60,
      flex: 1,
      justifyContent: 'center',
      height: '100%',
    },
    emptyStateText: {
      fontSize: 20,
      fontWeight: '600',
      color: COLORS.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    emptyStateSubtext: {
      fontSize: 16,
      color: COLORS.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: COLORS.text,
    },
    closeButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: COLORS.card,
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeButtonText: {
      fontSize: 18,
      color: COLORS.textSecondary,
      fontWeight: '600',
    },
    modalContent: {
      flex: 1,
      padding: 20,
    },
    inputContainer: {
      marginBottom: 20,
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: COLORS.text,
      marginBottom: 8,
    },
    input: {
      backgroundColor: COLORS.card,
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      color: COLORS.text,
    },
    inputError: {
      borderColor: COLORS.error,
    },
    textArea: {
      backgroundColor: COLORS.card,
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      color: COLORS.text,
      height: 100,
      textAlignVertical: 'top',
    },
    errorText: {
      color: COLORS.error,
      fontSize: 12,
      marginTop: 8,
    },
    categoryGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    categoryOption: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: 12,
      backgroundColor: COLORS.card,
      minWidth: '48%',
    },
    categoryOptionActive: {
      backgroundColor: COLORS.primary + '15',
      borderColor: COLORS.primary,
    },
    categoryIcon: {
      fontSize: 16,
      marginRight: 8,
    },
    categoryText: {
      fontSize: 14,
      color: COLORS.text,
      fontWeight: '500',
    },
    categoryTextActive: {
      color: COLORS.primary,
      fontWeight: '600',
    },
    typeSelector: {
      flexDirection: 'row',
      gap: 8,
    },
    typeOption: {
      flex: 1,
      padding: 12,
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: 12,
      backgroundColor: COLORS.card,
      alignItems: 'center',
    },
    typeOptionActive: {
      backgroundColor: COLORS.primary + '15',
      borderColor: COLORS.primary,
    },
    typeOptionText: {
      fontSize: 14,
      color: COLORS.text,
      fontWeight: '500',
    },
    typeOptionTextActive: {
      color: COLORS.primary,
      fontWeight: '600',
    },
    frequencySelector: {
      flexDirection: 'row',
      gap: 8,
    },
    frequencyOption: {
      flex: 1,
      padding: 12,
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: 12,
      backgroundColor: COLORS.card,
      alignItems: 'center',
    },
    frequencyOptionActive: {
      backgroundColor: COLORS.primary + '15',
      borderColor: COLORS.primary,
    },
    frequencyOptionText: {
      fontSize: 14,
      color: COLORS.text,
      fontWeight: '500',
    },
    frequencyOptionTextActive: {
      color: COLORS.primary,
      fontWeight: '600',
    },
    createButton: {
      backgroundColor: COLORS.primary,
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 20,
    },
    createButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    modeToggle: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginVertical: 16,
      gap: 8,
    },
    modeOption: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      backgroundColor: COLORS.card,
      borderWidth: 1,
      borderColor: COLORS.border,
      alignItems: 'center',
    },
    modeOptionActive: {
      backgroundColor: COLORS.primary + '15',
      borderColor: COLORS.primary,
    },
    modeOptionText: {
      fontSize: 14,
      color: COLORS.text,
      fontWeight: '500',
    },
    modeOptionTextActive: {
      color: COLORS.primary,
      fontWeight: '600',
    },
    predefinedGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    predefinedCard: {
      width: '48%',
      backgroundColor: COLORS.card,
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: COLORS.border,
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: 140,
    },
    predefinedContent: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    predefinedIcon: {
      fontSize: 32,
      marginBottom: 8,
    },
    predefinedName: {
      fontSize: 14,
      fontWeight: '600',
      color: COLORS.text,
      textAlign: 'center',
      marginBottom: 4,
    },
    predefinedDescription: {
      fontSize: 12,
      color: COLORS.textSecondary,
      textAlign: 'center',
      marginBottom: 8,
    },
    predefinedMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 'auto',
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: COLORS.border + '30',
    },
    predefinedType: {
      fontSize: 10,
      color: COLORS.textSecondary,
    },
    predefinedFrequency: {
      fontSize: 10,
      color: COLORS.textSecondary,
      textTransform: 'capitalize',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Habits</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowAdvancedFilters(true)}
            accessible={true}
            accessibilityLabel="Open advanced filters"
            accessibilityRole="button"
          >
            <IconSymbol name="chart.bar.fill" size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}
            accessible={true}
            accessibilityLabel="Add new habit"
            accessibilityRole="button"
          >
            <Text style={styles.addButtonText}>+ Add</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search habits..."
          placeholderTextColor={COLORS.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          accessible={true}
          accessibilityLabel="Search habits"
          accessibilityRole="search"
        />
      </View>
      
      {renderCategoryFilter()}
      {renderTypeFilter()}
      
      <ScrollView style={styles.content}>
        {sortedHabits.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No habits found</Text>
            <Text style={styles.emptyStateSubtext}>
              {searchQuery || selectedCategory !== 'all' || selectedType !== 'all'
                ? 'Try adjusting your filters or search terms'
                : 'Add your first habit to get started!'}
            </Text>
          </View>
        ) : (
          sortedHabits.map((habit, index) => renderHabitCard(habit, index))
        )}
      </ScrollView>
      
      {renderAddHabitModal()}
      
      <AdvancedFilters
        visible={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        onApply={setAdvancedFilters}
        currentFilters={advancedFilters}
      />
    </SafeAreaView>
  );
}

const formatDate = (date: Date): string => {
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString();
  }
}; 