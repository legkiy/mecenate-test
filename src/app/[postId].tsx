import {
  PostCard,
  PostComments,
  postService,
  SkeletonPost,
} from '@/entities/post';
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
      <PostComments />
    </View>
  );
};
export default PostIdScreen;
