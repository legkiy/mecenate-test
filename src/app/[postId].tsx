import { CommentInput } from '@/entities/comment';
import { PostCard, postService, SkeletonPost } from '@/entities/post';
import { useWebSocket } from '@/feature/WebSockets';
import CommentsList from '@/widgets/CommentsList';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const PostIdScreen = () => {
  const { postId } = useLocalSearchParams<{ postId: string }>();

  const { data, isLoading } = useQuery({
    queryKey: postService.queryKeys.detail(postId),
    queryFn: () => postService.getById(postId),
  });

  const { likesCount, newComment } = useWebSocket(postId);

  if (isLoading) {
    return <SkeletonPost />;
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
      >
        {data?.data?.post && (
          <PostCard
            {...data?.data?.post}
            likesCount={likesCount || data?.data?.post.likesCount}
            isDetail
          />
        )}
        <CommentsList
          postId={postId}
          newComment={newComment}
          allComentsCount={data?.data?.post?.commentsCount || 0}
        />
        <CommentInput />
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};
export default PostIdScreen;
