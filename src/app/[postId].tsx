import { CommentInput } from '@/entities/comment';
import { PostCard, postService, SkeletonPost } from '@/entities/post';
import { useWebSocket } from '@/feature/WebSockets';
import CommentsList from '@/widgets/CommentsList';
import { useHeaderHeight } from '@react-navigation/elements';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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

  const { data, isLoading } = useQuery({
    queryKey: postService.queryKeys.detail(postId),
    queryFn: () => postService.getById(postId),
  });

  const { likesCount, newComment } = useWebSocket(postId);

  if (isLoading) {
    return <SkeletonPost />;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={headerHeight + 60}
    >
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} ref={scrollRef}>
          {data?.data?.post && (
            <View onLayout={(e) => setPostHeight(e.nativeEvent.layout.height)}>
              <PostCard
                {...data?.data?.post}
                likesCount={likesCount || data?.data?.post.likesCount}
                isDetail
              />
            </View>
          )}
          <CommentsList
            postId={postId}
            newComment={newComment}
            allComentsCount={data?.data?.post?.commentsCount || 0}
          />
        </ScrollView>
        <CommentInput postId={postId} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default PostIdScreen;
