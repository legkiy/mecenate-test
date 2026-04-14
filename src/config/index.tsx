import { Colors } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import QueryProvider from './query-client-provider';

type Props = {
  children: React.ReactNode;
};
const ConfigProvider = ({ children }: Props) => {
  return (
    <QueryProvider>
      <SafeAreaProvider>
        <SafeAreaView edges={['top']} style={styles.root}>
          {children}
        </SafeAreaView>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </QueryProvider>
  );
};
export default ConfigProvider;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.surface.bg,
  },
});
