import { Colors, Fonts, Spacing } from '@/constants/theme';
import { CommentInput, CommentItem, commentsService } from '@/entities/comment';
import { PostCard, postService, SkeletonPost } from '@/entities/post';
import { useWebSocket } from '@/feature/WebSockets';
import { useHeaderHeight } from '@react-navigation/elements';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const PostIdScreen = () => {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const headerHeight = useHeaderHeight();
  const scrollRef = useRef<ScrollView>(null);
  const [postHeight, setPostHeight] = useState(0);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      if (scrollRef.current && postHeight) {
        scrollRef.current.scrollTo({
          y: postHeight - 40,
          animated: true,
        });
      }
    });

    return () => {
      showSub.remove();
    };
  }, [postHeight]);

  const { data: postData, isLoading } = useQuery({
    queryKey: postService.queryKeys.detail(postId),
    queryFn: () => postService.getById(postId),
  });
  const {
    data: commentsData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: commentsService.queryKeys.listByPostId(postId),
    queryFn: ({ pageParam }) =>
      commentsService.getListByPostId(postId, { cursor: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.data?.hasMore
        ? (lastPage.data.nextCursor ?? undefined)
        : undefined,
    initialPageParam: undefined as string | undefined,
  });

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const { likesCount } = useWebSocket(postId);

  const [sortNewFirst, setSortNewFirst] = useState(true);

  const comments = useMemo(
    () =>
      commentsData?.pages.flatMap((page) => page.data?.comments ?? []) ?? [],
    [commentsData?.pages],
  );

  const sortedComments = useMemo(() => {
    return [...comments].sort((a, b) => {
      const dateA = new Date(a.createdAt ?? 0).getTime();
      const dateB = new Date(b.createdAt ?? 0).getTime();
      return sortNewFirst ? dateB - dateA : dateA - dateB;
    });
  }, [comments, sortNewFirst]);

  const handleChangeSorting = () => {
    setSortNewFirst((prev) => !prev);
  };

  if (isLoading) {
    return <SkeletonPost />;
  }

  const commentsCount =
    ((postData?.data?.post?.commentsCount || 0) < 20
      ? 20
      : postData?.data?.post?.commentsCount || 0) -
    20 +
    (comments.length || 0);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={headerHeight + 60}
    >
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(el) => el.id}
          data={sortedComments}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => <CommentItem {...item} />}
          ListHeaderComponent={
            <>
              {postData?.data?.post && (
                <View
                  onLayout={(e) => setPostHeight(e.nativeEvent.layout.height)}
                >
                  <PostCard
                    {...postData?.data?.post}
                    likesCount={likesCount || postData?.data?.post.likesCount}
                    isDetail
                  />
                </View>
              )}
              <View style={styles.header}>
                <Text style={styles.counts}>{commentsCount} коментария</Text>
                <TouchableOpacity onPress={handleChangeSorting}>
                  <Text style={styles.sorting}>
                    {sortNewFirst ? 'Сначала новые' : 'Сначала старые'}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          }
        />
        <CommentInput postId={postId} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default PostIdScreen;

const styles = StyleSheet.create({
  comments: {
    backgroundColor: Colors.surface.fg,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  header: {
    paddingBottom: Spacing.xs,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface.fg,
    paddingHorizontal: Spacing.lg,
  },
  counts: {
    fontWeight: '600',
    fontSize: Fonts.md,
    color: Colors.text.soft,
  },
  sorting: {
    color: Colors.text.primory,
    fontWeight: '500',
    fontSize: Fonts.md,
  },
});
