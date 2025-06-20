import { getThemeColors } from '@/constants/Data';
import { useAppStore } from '@/store/useAppStore';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface AccessibilityWrapperProps {
  children: React.ReactNode;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: 'button' | 'header' | 'text' | 'image' | 'none';
  accessibilityState?: {
    disabled?: boolean;
    selected?: boolean;
    checked?: boolean;
    busy?: boolean;
    expanded?: boolean;
  };
  onAccessibilityTap?: () => void;
  style?: any;
}

export const AccessibilityWrapper: React.FC<AccessibilityWrapperProps> = ({
  children,
  accessible = true,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'none',
  accessibilityState,
  onAccessibilityTap,
  style,
}) => {
  const accessibilityProps = {
    accessible,
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
    accessibilityState,
    onAccessibilityTap,
  };

  return (
    <View style={style} {...accessibilityProps}>
      {children}
    </View>
  );
};

interface AccessibleButtonProps {
  title: string;
  onPress: () => void;
  hint?: string;
  disabled?: boolean;
  style?: any;
  textStyle?: any;
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  title,
  onPress,
  hint,
  disabled = false,
  style,
  textStyle,
}) => {
  const { currentTheme } = useAppStore();
  const COLORS = getThemeColors(currentTheme === 'dark');

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: disabled ? COLORS.border : COLORS.primary,
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 12,
          alignItems: 'center',
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessible={true}
      accessibilityLabel={title}
      accessibilityHint={hint}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      <Text
        style={[
          {
            color: disabled ? COLORS.textSecondary : 'white',
            fontSize: 16,
            fontWeight: '600',
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

interface AccessibleTextProps {
  children: React.ReactNode;
  style?: any;
  accessibilityRole?: 'header' | 'text' | 'none';
  accessibilityLabel?: string;
}

export const AccessibleText: React.FC<AccessibleTextProps> = ({
  children,
  style,
  accessibilityRole = 'text',
  accessibilityLabel,
}) => {
  return (
    <Text
      style={style}
      accessible={true}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </Text>
  );
}; 