import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

const PostIdScreen = () => {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  return <Text>PostIdScreen {postId}</Text>;
};
export default PostIdScreen;
