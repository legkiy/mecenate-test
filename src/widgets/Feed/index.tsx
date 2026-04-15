import { Spacing } from '@/constants/theme';
import { PostCard, postService, SkeletonPost } from '@/entities/post';
import ErrorDisplay from '@/shared/ui/ErrorDisplay';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';

type Props = {
  tier?: 'free' | 'paid';
};

const PAGE_SIZE = 10;

const Feed = ({ tier }: Props) => {
  const {
    data,
    isLoading,
    refetch,
    isRefetching,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: postService.queryKeys.listByTier(tier),
    queryFn: ({ pageParam }) =>
      postService.getList({ tier: tier, cursor: pageParam, limit: PAGE_SIZE }),
    getNextPageParam: (lastPage) =>
      lastPage.data?.hasMore
        ? (lastPage.data.nextCursor ?? undefined)
        : undefined,
    initialPageParam: undefined as string | undefined,
  });

  const posts = data?.pages.flatMap((page) => page.data?.posts ?? []) ?? [];

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
          data={posts}
          renderItem={({ item, index }) =>
            isLoading && index < 2 ? <SkeletonPost /> : <PostCard {...item} />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <View style={{ padding: Spacing.lg }}>
                <ActivityIndicator />
              </View>
            ) : null
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
