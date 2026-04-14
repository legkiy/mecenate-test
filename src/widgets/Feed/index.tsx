import { Spacing } from '@/constants/theme';
import { PostCard, postService } from '@/entities/post';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { FlatList, Text, View } from 'react-native';

type Props = {
  tier?: 'free' | 'paid';
};

const Feed = ({ tier }: Props) => {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: postService.queryKeys.listByTier(tier),
    queryFn: () => postService.getList({ tier: tier }),
    placeholderData: keepPreviousData,
  });

  return (
    <View style={{ flex: 1, paddingBottom: Spacing.lg }}>
      {isLoading && <Text>loading...</Text>}
      {!isLoading && (
        <FlatList
          refreshing={isRefetching}
          onRefresh={refetch}
          data={data?.data?.posts}
          renderItem={({ item }) => <PostCard {...item} />}
          contentContainerStyle={{
            gap: Spacing.lg,
          }}
        />
      )}
    </View>
  );
};
export default Feed;
