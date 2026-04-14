import { Colors, Fonts, Spacing } from '@/constants/theme';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  label: string;
  startIcon: React.ReactElement;
};

const Chip = ({ label, startIcon }: Props) => {
  return (
    <View style={styles.box}>
      {startIcon}
      <Text style={styles.label}>{label}</Text>
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
