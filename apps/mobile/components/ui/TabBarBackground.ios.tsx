import { getThemeColors } from "@/constants/Data";
import { useAppStore } from "@/store/useAppStore";
import { StyleSheet, View } from "react-native";

export default function BlurTabBarBackground() {
  const { currentTheme } = useAppStore();
  const COLORS = getThemeColors(currentTheme === "dark");
  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: COLORS.card }]} />
  );
}

export function useBottomTabOverflow() {
  // You can keep the original logic if needed
  return 0;
}
