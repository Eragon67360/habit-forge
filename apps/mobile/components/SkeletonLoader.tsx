import { getThemeColors } from "@/constants/Data";
import { useAppStore } from "@/store/useAppStore";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = "100%",
  height = 20,
  borderRadius = 4,
  style,
}) => {
  const { currentTheme } = useAppStore();
  const COLORS = getThemeColors(currentTheme === "dark");
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    );
    animation.start();

    return () => animation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          backgroundColor: COLORS.border,
          opacity,
        },
        style,
      ]}
    />
  );
};

// Predefined skeleton components for common use cases
export const HabitCardSkeleton: React.FC = () => {
  const { currentTheme } = useAppStore();
  const COLORS = getThemeColors(currentTheme === "dark");

  return (
    <View style={[styles.habitCardSkeleton, { backgroundColor: COLORS.card }]}>
      <View style={styles.habitCardHeader}>
        <View style={styles.habitCardIcon}>
          <SkeletonLoader width={40} height={40} borderRadius={20} />
        </View>
        <View style={styles.habitCardContent}>
          <SkeletonLoader width="70%" height={16} style={styles.marginBottom} />
          <SkeletonLoader width="40%" height={12} />
        </View>
      </View>
      <View style={styles.habitCardStats}>
        <View style={styles.statItem}>
          <SkeletonLoader width={30} height={16} style={styles.marginBottom} />
          <SkeletonLoader width={50} height={10} />
        </View>
        <View style={styles.statItem}>
          <SkeletonLoader width={40} height={16} style={styles.marginBottom} />
          <SkeletonLoader width={60} height={10} />
        </View>
      </View>
    </View>
  );
};

export const QuoteCardSkeleton: React.FC = () => {
  const { currentTheme } = useAppStore();
  const COLORS = getThemeColors(currentTheme === "dark");

  return (
    <View style={[styles.quoteCardSkeleton, { backgroundColor: COLORS.card }]}>
      <SkeletonLoader
        width={24}
        height={24}
        borderRadius={12}
        style={styles.marginBottom}
      />
      <SkeletonLoader width="100%" height={18} style={styles.marginBottom} />
      <SkeletonLoader width="100%" height={18} style={styles.marginBottom} />
      <SkeletonLoader width="60%" height={14} />
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    overflow: "hidden",
  },
  habitCardSkeleton: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  habitCardHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  habitCardIcon: {
    marginRight: 12,
  },
  habitCardContent: {
    flex: 1,
  },
  habitCardStats: {
    flexDirection: "row",
    gap: 16,
  },
  statItem: {
    alignItems: "center",
  },
  quoteCardSkeleton: {
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
  },
  marginBottom: {
    marginBottom: 8,
  },
});
