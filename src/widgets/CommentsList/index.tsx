import { Colors, Fonts, Spacing } from '@/constants/theme';
import { Comment, CommentItem, commentsService } from '@/entities/comment';
import { components } from '@/shared/api/endpoints';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  postId: string;
  newComment: Comment | null;
  allComentsCount: number;
};

const CommentsList = ({ postId, newComment, allComentsCount }: Props) => {
  const { data } = useQuery({
    queryKey: commentsService.queryKeys.listByPostId(postId),
    queryFn: () => commentsService.getListByPostId(postId),
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!newComment) return;

    queryClient.setQueryData<components['schemas']['CommentsResponse']>(
      commentsService.queryKeys.listByPostId(postId),
      (prev) => {
        if (!prev) return {};

        if (prev?.data?.comments?.some((c) => c.id === newComment.id)) {
          return prev;
        }

        return {
          ...prev,
          data: {
            ...prev?.data,
            comments: [newComment, ...(prev?.data?.comments || [])],
          },
        };
      },
    );
  }, [newComment, postId, queryClient]);

  const [sortNewFirst, setSortNewFirst] = useState(true);

  const sortedMessages = useMemo(() => {
    const comments = data?.data?.comments || [];
    return sortNewFirst
      ? [...comments].sort((a, b) => 
          new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())
      : [...comments].sort((a, b) => 
          new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime());
  }, [data?.data?.comments, sortNewFirst]);

  const handleChangeSorting = () => {
    setSortNewFirst((prev) => !prev);
  };

  const commentsCount =
    (allComentsCount || 20) - 20 + (data?.data?.comments?.length || 0);

  return (
    <View style={styles.box}>
      <View style={styles.header}>
        <Text style={styles.counts}>{commentsCount} коментария</Text>
        <TouchableOpacity onPress={handleChangeSorting}>
          <Text style={styles.sorting}>
            {sortNewFirst ? 'Сначала новые' : 'Сначала старые'}
          </Text>
        </TouchableOpacity>
      </View>
      {sortedMessages?.map((el) => (
        <CommentItem key={el.id} {...el} />
      ))}
    </View>
  );
};
export default CommentsList;

const styles = StyleSheet.create({
  box: {
    backgroundColor: Colors.surface.fg,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  header: {
    marginBottom: Spacing.xs,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
