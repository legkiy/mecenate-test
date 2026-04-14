import { Colors, Spacing } from '@/constants/theme';
import Feed from '@/widgets/Feed';
import FeedTab from '@/widgets/FeedTab';
import { useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import PagerView from 'react-native-pager-view';

const TABS = [
  { id: 0, label: 'Все', value: undefined },
  { id: 1, label: 'Бесплатные', value: 'free' },
  { id: 2, label: 'Платные', value: 'paid' },
] as const;

const FeedScreen = () => {
  const [activeTab, setActiveTab] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  const handleTabPress = useCallback((index: number) => {
    setActiveTab(index);
    pagerRef.current?.setPage(index);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={syles.tabs}>
        {TABS.map((tab) => (
          <FeedTab
            key={tab.id}
            isActive={activeTab === tab.id}
            onPress={() => handleTabPress(tab.id)}
            label={tab.label}
          />
        ))}
      </View>

      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={(e) => setActiveTab(e.nativeEvent.position)}
      >
        {TABS.map((tab) => (
          <Feed key={tab.id} tier={tab.value} />
        ))}
      </PagerView>
    </View>
  );
};
export default FeedScreen;

const syles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    backgroundColor: Colors.surface.fg,
    borderColor: Colors.border.default,
    borderWidth: 1,
    borderRadius: Spacing.lg,
    margin: Spacing.lg,
  },
});
