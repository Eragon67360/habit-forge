import { getThemeColors } from "@/constants/Data";
import { useAppStore } from "@/store/useAppStore";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";

interface AnimatedCardProps {
  children: React.ReactNode;
  onPress?: () => void;
  delay?: number;
  style?: any;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  onPress,
  delay = 0,
  style,
}) => {
  const { currentTheme } = useAppStore();
  const COLORS = getThemeColors(currentTheme === "dark");

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const pressAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [delay, scaleAnim, opacityAnim]);

  const handlePressIn = () => {
    Animated.timing(pressAnim, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(pressAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{ scale: Animated.multiply(scaleAnim, pressAnim) }],
    opacity: opacityAnim,
  };

  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <Animated.View style={[animatedStyle, style]}>
      <CardComponent
        style={[
          styles.card,
          { backgroundColor: COLORS.card, borderColor: COLORS.border },
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        {children}
      </CardComponent>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});
