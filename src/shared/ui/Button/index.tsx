import { Colors, Fonts, Spacing } from '@/constants/theme';
import React, { ReactElement } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

type ButtonProps = {
  onPress?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  children?: ReactElement; // Поддержка ReactElement
  style?: StyleProp<ViewStyle>;
};

const Button = ({
  onPress,
  isLoading,
  isDisabled,
  children,
  style,
}: ButtonProps) => {
  const activeOpacity = isDisabled || isLoading ? 1 : 0.7;

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={isDisabled || isLoading ? undefined : onPress}
      style={[styles.button, isDisabled && styles.disabled, style]}
    >
      {isLoading ? <ActivityIndicator color={Colors.text.accent} /> : children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.surface.primory,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: Colors.surface.primoryDisabled,
    opacity: 0.6,
  },
  text: {
    color: Colors.text.fg,
    fontSize: Fonts.md,
    fontWeight: '600',
  },
});
