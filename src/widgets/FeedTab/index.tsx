import { Colors, Spacing } from '@/constants/theme';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  isActive: boolean;
  onPress: () => void;
  label: string;
};
const FeedTab = ({ isActive, onPress, label }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.tabItem, isActive && styles.activeTabItem]}
      onPress={onPress}
    >
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
export default FeedTab;

const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: Spacing.lg,
  },
  activeTabItem: {
    backgroundColor: Colors.surface.primory,
  },
  tabText: {
    color: Colors.text.mute,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
});
