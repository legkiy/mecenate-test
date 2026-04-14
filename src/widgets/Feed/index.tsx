import { Spacing } from '@/constants/theme';
import { Post, PostCard } from '@/entities/post';
import { FlatList, Text, View } from 'react-native';

type Props = {
  postsList: Post[];
  refreshing: boolean;
  onRefresh: () => void;
  isLoading: boolean;
};

const Feed = ({ postsList, refreshing, onRefresh, isLoading }: Props) => {
  return (
    <View style={{ flex: 1, paddingBottom: Spacing.lg }}>
      {isLoading && <Text>loading...</Text>}
      {!isLoading && (
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          data={postsList}
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
