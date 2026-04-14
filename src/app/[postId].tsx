import { CommentsScreen } from '@/entities/comment/ui';
import { PostCard, postService, SkeletonPost } from '@/entities/post';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

const PostIdScreen = () => {
  const { postId } = useLocalSearchParams<{ postId: string }>();

  const { data, isLoading } = useQuery({
    queryKey: postService.queryKeys.detail(postId),
    queryFn: () => postService.getById(postId),
  });
  if (isLoading) {
    return <SkeletonPost />;
  }

  return (
    <View>
      {data?.data?.post && <PostCard {...data?.data?.post} isDetail />}
      <CommentsScreen postId={postId} />
    </View>
  );
};
export default PostIdScreen;
