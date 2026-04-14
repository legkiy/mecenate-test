import { postService } from '@/entities/post';
import Feed from '@/widgets/Feed';
import FeedTab from '@/widgets/FeedTab';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';

const TABS = [
  { id: 0, label: 'Все', value: undefined },
  { id: 1, label: 'Бесплатные', value: 'free' },
  { id: 2, label: 'Платные', value: 'paid' },
] as const;

const FeedScreen = () => {
  const [activeTab, setActiveTab] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  const currentTier = TABS[activeTab].value;

  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: postService.queryKeys.listByTier(currentTier),
    queryFn: () => postService.getList({ tier: currentTier }),
  });

  const handleTabPress = useCallback((index: number) => {
    setActiveTab(index);
    pagerRef.current?.setPage(index);
  }, []);

  if (error) return <Text>Error</Text>;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row' }}>
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
          <Feed
            key={tab.id}
            isLoading={isLoading}
            onRefresh={refetch}
            postsList={data?.data?.posts || []}
            refreshing={isRefetching}
          />
        ))}
      </PagerView>
    </View>
  );
};
export default FeedScreen;
