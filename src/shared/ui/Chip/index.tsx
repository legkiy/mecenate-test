import { Colors, Fonts, Spacing } from '@/constants/theme';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

type Props = {
  label: string;
  startIcon: React.ReactElement;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const Chip = ({ label, startIcon, style, textStyle }: Props) => {
  return (
    <View style={[styles.box, style]}>
      {startIcon}
      <Text style={[styles.label, textStyle]}>{label}</Text>
    </View>
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
  label: {
    color: Colors.text.mute,
    fontSize: Fonts.xs,
    fontWeight: '700',
  },
});
