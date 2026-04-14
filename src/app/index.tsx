import { Spacing } from '@/constants/theme';
import { PostCard, postService } from '@/entities/post';
import { useQuery } from '@tanstack/react-query';
import { FlatList, Text } from 'react-native';

const FeedScreen = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: postService.queryKeys.list,
    queryFn: () => postService.getList(),
  });
  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error</Text>;

  return (
    <FlatList
      data={data?.data?.posts}
      renderItem={({ item }) => <PostCard {...item} />}
      contentContainerStyle={{ gap: Spacing.lg, paddingBottom: Spacing.lg }}
    />
  );
};
export default FeedScreen;
