import { Spacing } from '@/constants/theme';
import { PostCard, postService, SkeletonPost } from '@/entities/post';
import ErrorDisplay from '@/shared/ui/ErrorDisplay';
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
          label="Не удалось загрузить публикации"
          retryLabel="Повторить"
          onRetry={refetch}
        />
      )}
      {!error && (
        <FlatList
          refreshing={isRefetching}
          keyExtractor={(item) => item.id}
          onRefresh={refetch}
          data={data?.data?.posts}
          renderItem={({ item }) =>
            isLoading ? <SkeletonPost /> : <PostCard {...item} />
          }
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
