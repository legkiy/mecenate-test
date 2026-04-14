import { postService } from '@/entities/post';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

const PostIdScreen = () => {
  const { postId } = useLocalSearchParams<{ postId: string }>();

  const { data } = useQuery({
    queryKey: postService.queryKeys.detail(postId),
    queryFn: () => postService.getById(postId),
  });
  console.log(data);

  return <Text>PostIdScreen {postId}</Text>;
};
export default PostIdScreen;
