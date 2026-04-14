import { Spacing } from '@/constants/theme';
import { PostCard, postService } from '@/entities/post';
import ErrorDisplay from '@/shared/ui/ErrorDisplay';
import Feather from '@expo/vector-icons/Feather';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { FlatList, View } from 'react-native';

type Props = {
  tier?: 'free' | 'paid';
};

const Feed = ({ tier }: Props) => {
  const { data, isLoading, refetch, isRefetching, error } = useQuery({
    queryKey: postService.queryKeys.listByTier(tier),
    queryFn: () => postService.getList({ tier: tier }),
    placeholderData: keepPreviousData,
  });

  return (
    <View style={{ flex: 1 }}>
      {error && (
        <ErrorDisplay
          error={error}
          label="По вашему запросу ничего не найдено"
          retryLabel="Повторите"
          onRetry={refetch}
        />
      )}
      {isLoading && <Feather name="loader" size={24} color="black" />}
      {!isLoading && !error && (
        <FlatList
          refreshing={isRefetching}
          onRefresh={refetch}
          data={data?.data?.posts}
          renderItem={({ item }) => <PostCard {...item} />}
          contentContainerStyle={{
            gap: Spacing.lg,
            paddingBottom: Spacing.xl,
          }}
        />
      )}
    </View>
  );
};
export default Feed;
