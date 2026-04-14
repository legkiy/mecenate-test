import { Colors, Fonts, Spacing } from '@/constants/theme';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../Button';
import Image from '../Image';
type Props = {
  error?: Error;
  onRetry?: () => void;
  label: string;
  retryLabel: string;
};
const ErrorDisplay = ({ error, onRetry, label, retryLabel }: Props) => {
  if (!error) {
    return null;
  }

  return (
    <View style={styles.box}>
      <Image
        source={require('./error_placeholder.png')}
        style={{
          width: 112,
          aspectRatio: '1/1',
        }}
      />
      <Text>{label}</Text>
      <Button style={{ width: '100%' }}>
        <Text style={styles.btnText}>{retryLabel}</Text>
      </Button>
    </View>
  );
};
export default ErrorDisplay;

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  btnText: {
    color: Colors.text.fg,
    fontWeight: '600',
    fontSize: Fonts.md,
  },
});
