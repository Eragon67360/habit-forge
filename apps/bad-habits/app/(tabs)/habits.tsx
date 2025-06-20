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
  
  const {
    habits,
    getHabitsByCategory,
    getHabitsByType,
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
    
    return matchesCategory && matchesType && matchesSearch;
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
    } catch (error) {
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
    } catch (error) {
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

  const renderHabitCard = (habit: Habit) => {
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
              {habit.description && (
                <Text style={styles.habitDescription}>{habit.description}</Text>
              )}
            </View>
          </View>
          <View style={styles.habitStatus}>
            <View style={[
              styles.statusIndicator,
              habit.isActive ? styles.statusActive : styles.statusInactive,
            ]}>
              <Text style={styles.statusText}>
                {habit.isActive ? 'Active' : 'Inactive'}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.habitStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{habit.streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {habit.lastCheckIn ? formatDate(habit.lastCheckIn) : 'Never'}
            </Text>
            <Text style={styles.statLabel}>Last Check-in</Text>
          </View>
        </View>
        
        <View style={styles.habitActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              // Edit functionality
              Alert.alert('Edit Habit', 'Edit functionality will be implemented soon.');
            }}
          >
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleToggleHabit(habit.id)}
          >
            <Text style={styles.actionButtonText}>
              {habit.isActive ? 'Deactivate' : 'Activate'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteAction]}
            onPress={() => handleDeleteHabit(habit)}
          >
            <Text style={[styles.actionButtonText, styles.deleteActionText]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
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

        {/* Mode Toggle */}
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
              {/* Habit Name */}
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

              {/* Description */}
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

              {/* Category Selection */}
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

              {/* Type Selection */}
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

              {/* Frequency Selection */}
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

              {/* Create Button */}
              <TouchableOpacity
                style={styles.createButton}
                onPress={handleCreateHabit}
              >
                <Text style={styles.createButtonText}>CREATE HABIT</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* Predefined Habits */}
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

  // Create styles with current theme colors
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      paddingBottom: 8,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: COLORS.text,
    },
    addButton: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 25,
    },
    addButtonText: {
      color: 'white',
      fontWeight: '600',
    },
    searchContainer: {
      paddingHorizontal: 20,
      marginBottom: 12,
    },
    searchInput: {
      backgroundColor: COLORS.card,
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: 12,
      padding: 12,
      fontSize: 16,
      color: COLORS.text,
    },
    filterContainer: {
      marginBottom: 8,
      maxHeight: 50,
    },
    filterContent: {
      paddingHorizontal: 20,
      gap: 8,
    },
    filterChip: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      backgroundColor: COLORS.card,
      borderWidth: 1,
      borderColor: COLORS.border,
      gap: 4,
      height: 32,
    },
    filterChipActive: {
      backgroundColor: COLORS.primary + '20',
      borderColor: COLORS.primary,
    },
    filterChipIcon: {
      fontSize: 16,
    },
    filterChipText: {
      fontSize: 14,
      color: COLORS.text,
    },
    filterChipTextActive: {
      color: COLORS.primary,
      fontWeight: '600',
    },
    typeFilterContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 12,
      gap: 8,
    },
    typeChip: {
      flex: 1,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 8,
      backgroundColor: COLORS.card,
      borderWidth: 1,
      borderColor: COLORS.border,
      alignItems: 'center',
      height: 36,
    },
    typeChipActive: {
      backgroundColor: COLORS.primary + '20',
      borderColor: COLORS.primary,
    },
    typeChipText: {
      fontSize: 14,
      color: COLORS.text,
    },
    typeChipTextActive: {
      color: COLORS.primary,
      fontWeight: '600',
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
    },
    habitCard: {
      backgroundColor: COLORS.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: COLORS.border,
    },
    habitHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    habitInfo: {
      flexDirection: 'row',
      flex: 1,
    },
    habitIconContainer: {
      marginRight: 12,
    },
    habitIcon: {
      fontSize: 24,
    },
    habitText: {
      flex: 1,
    },
    habitName: {
      fontSize: 16,
      fontWeight: '600',
      color: COLORS.text,
      marginBottom: 2,
    },
    habitCategory: {
      fontSize: 14,
      color: COLORS.textSecondary,
      marginBottom: 4,
    },
    habitDescription: {
      fontSize: 14,
      color: COLORS.textSecondary,
      fontStyle: 'italic',
    },
    habitStatus: {
      marginLeft: 12,
    },
    statusIndicator: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    statusActive: {
      backgroundColor: COLORS.success + '20',
    },
    statusInactive: {
      backgroundColor: COLORS.textSecondary + '20',
    },
    statusText: {
      fontSize: 12,
      fontWeight: '600',
    },
    habitStats: {
      flexDirection: 'row',
      marginBottom: 12,
      gap: 16,
    },
    statItem: {
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.primary,
    },
    statLabel: {
      fontSize: 12,
      color: COLORS.textSecondary,
    },
    habitActions: {
      flexDirection: 'row',
      gap: 8,
    },
    actionButton: {
      flex: 1,
      padding: 8,
      borderRadius: 6,
      alignItems: 'center',
    },
    actionButtonText: {
      color: COLORS.text,
      fontSize: 12,
      fontWeight: '600',
    },
    deleteAction: {
      backgroundColor: COLORS.error + '20',
      borderWidth: 1,
      borderColor: COLORS.error,
    },
    deleteActionText: {
      color: COLORS.error,
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
      fontWeight: 'bold',
      color: COLORS.text,
    },
    closeButton: {
      padding: 8,
    },
    closeButtonText: {
      fontSize: 20,
      color: COLORS.textSecondary,
    },
    modalContent: {
      flex: 1,
      padding: 20,
    },
    inputContainer: {
      marginBottom: 16,
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
      padding: 12,
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
      padding: 12,
      fontSize: 16,
      color: COLORS.text,
      height: 100,
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
      padding: 8,
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: 8,
      backgroundColor: COLORS.card,
    },
    categoryOptionActive: {
      backgroundColor: COLORS.primary + '20',
      borderColor: COLORS.primary,
    },
    categoryIcon: {
      fontSize: 16,
      marginRight: 8,
    },
    categoryText: {
      fontSize: 14,
      color: COLORS.text,
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
      padding: 8,
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: 8,
      backgroundColor: COLORS.card,
      alignItems: 'center',
    },
    typeOptionActive: {
      backgroundColor: COLORS.primary + '20',
      borderColor: COLORS.primary,
    },
    typeOptionText: {
      fontSize: 14,
      color: COLORS.text,
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
      padding: 8,
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: 8,
      backgroundColor: COLORS.card,
      alignItems: 'center',
    },
    frequencyOptionActive: {
      backgroundColor: COLORS.primary + '20',
      borderColor: COLORS.primary,
    },
    frequencyOptionText: {
      fontSize: 14,
      color: COLORS.text,
    },
    frequencyOptionTextActive: {
      color: COLORS.primary,
      fontWeight: '600',
    },
    createButton: {
      backgroundColor: COLORS.primary,
      padding: 16,
      borderRadius: 25,
      alignItems: 'center',
    },
    createButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    modeToggle: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 16,
      gap: 8,
    },
    modeOption: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
      backgroundColor: COLORS.card,
      borderWidth: 1,
      borderColor: COLORS.border,
      alignItems: 'center',
    },
    modeOptionActive: {
      backgroundColor: COLORS.primary + '20',
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
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search habits..."
          placeholderTextColor={COLORS.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      {renderCategoryFilter()}
      {renderTypeFilter()}
      
      <ScrollView style={styles.content}>
        {filteredHabits.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No habits found</Text>
            <Text style={styles.emptyStateSubtext}>
              {searchQuery || selectedCategory !== 'all' || selectedType !== 'all'
                ? 'Try adjusting your filters or search terms'
                : 'Add your first habit to get started!'}
            </Text>
          </View>
        ) : (
          filteredHabits.map(renderHabitCard)
        )}
      </ScrollView>
      
      {renderAddHabitModal()}
    </SafeAreaView>
  );
}

// Helper function for date formatting
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