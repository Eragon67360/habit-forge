import { getThemeColors } from "@/constants/Data";
import { useAppStore } from "@/store/useAppStore";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");
const CHART_WIDTH = width - 80;
const CHART_HEIGHT = 200;

interface AnalyticsChartProps {
  habitId: string;
  days?: number;
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  habitId,
  days = 30,
}) => {
  const { currentTheme, checkIns } = useAppStore();
  const COLORS = getThemeColors(currentTheme === "dark");

  // Generate data for the last N days
  const generateChartData = () => {
    const data = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      const dayCheckIns = checkIns.filter(
        (checkIn) =>
          checkIn.habitId === habitId &&
          checkIn.date?.toDateString() === date.toDateString(),
      );

      data.push({
        date,
        completed: dayCheckIns.some((checkIn) => checkIn.completed),
        count: dayCheckIns.length,
      });
    }

    return data;
  };

  const chartData = generateChartData();
  const completionRate = Math.round(
    (chartData.filter((day) => day.completed).length / days) * 100,
  );

  const renderBar = (day: any, index: number) => {
    const barHeight = day.completed ? 40 : 8;
    const barColor = day.completed ? COLORS.success : COLORS.primary;

    return (
      <View key={index} style={styles.barContainer}>
        <View
          style={[
            styles.bar,
            {
              height: barHeight,
              backgroundColor: barColor,
              opacity: day.completed ? 1 : 0.6,
            },
          ]}
        />
        {index % 7 === 0 && index > 0 && (
          <Text style={[styles.dateLabel, { color: COLORS.textSecondary }]}>
            {day.date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS.card }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: COLORS.text }]}>
          Progress Chart
        </Text>
        <Text style={[styles.completionRate, { color: COLORS.primary }]}>
          {completionRate}% (last 7 days)
        </Text>
      </View>

      <View style={styles.chartContainer}>
        <View style={styles.chart}>{chartData.map(renderBar)}</View>
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendDot, { backgroundColor: COLORS.success }]}
          />
          <Text style={[styles.legendText, { color: COLORS.textSecondary }]}>
            Completed
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendDot, { backgroundColor: COLORS.primary }]}
          />
          <Text style={[styles.legendText, { color: COLORS.textSecondary }]}>
            Missed
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  completionRate: {
    fontSize: 16,
    fontWeight: "700",
  },
  chartContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: CHART_HEIGHT,
    width: CHART_WIDTH,
    justifyContent: "space-between",
  },
  barContainer: {
    alignItems: "center",
    flex: 1,
  },
  bar: {
    width: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  dateLabel: {
    fontSize: 10,
    fontWeight: "500",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
