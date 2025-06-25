import { getThemeColors } from "@/constants/Data";
import { useAppStore } from "@/store/useAppStore";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface FilterOptions {
  dateRange: "all" | "today" | "week" | "month";
  sortBy: "name" | "streak" | "created";
  sortOrder: "asc" | "desc";
  showInactive: boolean;
}

interface AdvancedFiltersProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  visible,
  onClose,
  onApply,
  currentFilters,
}) => {
  const { currentTheme } = useAppStore();
  const COLORS = getThemeColors(currentTheme === "dark");

  const [filters, setFilters] = useState<FilterOptions>(currentFilters);

  const dateRangeOptions = [
    { key: "all", label: "All Time" },
    { key: "today", label: "Today" },
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
  ];

  const sortOptions = [
    { key: "name", label: "Name" },
    { key: "streak", label: "Streak" },
    { key: "created", label: "Created Date" },
  ];

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={[styles.container, { backgroundColor: COLORS.background }]}>
        <View style={[styles.header, { borderBottomColor: COLORS.border }]}>
          <Text style={[styles.title, { color: COLORS.text }]}>
            Advanced Filters
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={[styles.closeText, { color: COLORS.textSecondary }]}>
              ✕
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {/* Date Range Filter */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: COLORS.text }]}>
              Date Range
            </Text>
            <View style={styles.optionsGrid}>
              {dateRangeOptions.map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.optionChip,
                    {
                      backgroundColor: COLORS.card,
                      borderColor: COLORS.border,
                    },
                    filters.dateRange === option.key && {
                      backgroundColor: COLORS.primary + "15",
                      borderColor: COLORS.primary,
                    },
                  ]}
                  onPress={() =>
                    setFilters({ ...filters, dateRange: option.key as any })
                  }
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: COLORS.text },
                      filters.dateRange === option.key && {
                        color: COLORS.primary,
                        fontWeight: "600",
                      },
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Sort Options */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: COLORS.text }]}>
              Sort By
            </Text>
            <View style={styles.sortContainer}>
              <View style={styles.sortOptions}>
                {sortOptions.map((option) => (
                  <TouchableOpacity
                    key={option.key}
                    style={[
                      styles.sortOption,
                      {
                        backgroundColor: COLORS.card,
                        borderColor: COLORS.border,
                      },
                      filters.sortBy === option.key && {
                        backgroundColor: COLORS.primary + "15",
                        borderColor: COLORS.primary,
                      },
                    ]}
                    onPress={() =>
                      setFilters({ ...filters, sortBy: option.key as any })
                    }
                  >
                    <Text
                      style={[
                        styles.sortOptionText,
                        { color: COLORS.text },
                        filters.sortBy === option.key && {
                          color: COLORS.primary,
                          fontWeight: "600",
                        },
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={[
                  styles.sortOrderButton,
                  { backgroundColor: COLORS.card, borderColor: COLORS.border },
                ]}
                onPress={() =>
                  setFilters({
                    ...filters,
                    sortOrder: filters.sortOrder === "asc" ? "desc" : "asc",
                  })
                }
              >
                <Text style={[styles.sortOrderText, { color: COLORS.primary }]}>
                  {filters.sortOrder === "asc" ? "↑" : "↓"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Show Inactive Toggle */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: COLORS.text }]}>
              Display Options
            </Text>

            <TouchableOpacity
              style={[
                styles.toggleOption,
                { backgroundColor: COLORS.card, borderColor: COLORS.border },
                filters.showInactive && {
                  backgroundColor: COLORS.primary + "15",
                  borderColor: COLORS.primary,
                },
              ]}
              onPress={() =>
                setFilters({ ...filters, showInactive: !filters.showInactive })
              }
            >
              <Text
                style={[
                  styles.toggleText,
                  { color: COLORS.text },
                  filters.showInactive && {
                    color: COLORS.primary,
                    fontWeight: "600",
                  },
                ]}
              >
                Show Inactive Habits
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={[styles.footer, { borderTopColor: COLORS.border }]}>
          <TouchableOpacity
            style={[styles.applyButton, { backgroundColor: COLORS.primary }]}
            onPress={handleApply}
          >
            <Text style={[styles.applyButtonText, { color: "white" }]}>
              Apply Filters
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    fontSize: 18,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  optionChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    minWidth: "48%",
  },
  optionText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sortOptions: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  sortOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    minWidth: "48%",
  },
  sortOptionText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  sortOrderButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sortOrderText: {
    fontSize: 18,
    fontWeight: "600",
  },
  toggleOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "500",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
  },
  applyButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
