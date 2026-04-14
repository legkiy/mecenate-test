import { Colors, Fonts, Spacing } from '@/constants/theme';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

type Props = {
  label: string;
  startIcon?: React.ReactElement;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
};

const Chip = ({ label, startIcon, style, textStyle, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.box,
        onPress && pressed && styles.pressed,
        style,
      ]}
    >
      {startIcon}
      <Text style={[styles.label, textStyle]}>{label}</Text>
    </Pressable>
  );
};
export default Chip;

const styles = StyleSheet.create({
  box: {
    backgroundColor: Colors.surface.soft,
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: Spacing.xl,
    padding: 10,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  pressed: {
    backgroundColor: Colors.surface.softPressed,
  },
  label: {
    color: Colors.text.mute,
    fontSize: Fonts.xs,
    fontWeight: '700',
  },
});
