import ConfigProvider from '@/config';
import { Colors } from '@/constants/theme';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <ConfigProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: Colors.surface.bg,
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="[postId]" />
      </Stack>
    </ConfigProvider>
  );
}
