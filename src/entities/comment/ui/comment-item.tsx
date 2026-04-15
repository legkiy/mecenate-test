import { Fonts, Spacing } from '@/constants/theme';
import { Avatar } from '@/entities/user';
import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Comment } from '../model';

type Props = Comment & {};

const CommentItem = ({ author, text }: Props) => {
  return (
    <View style={styles.box}>
      <Avatar src={author?.avatarUrl || ''} />
      <View style={{ gap: 2 }}>
        <Text style={styles.name}>{author?.displayName}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};
export default memo(CommentItem);

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  name: {
    fontWeight: '700',
    fontSize: Fonts.md,
  },
  text: {
    fontWeight: '500',
    fontSize: Fonts.xs,
  },
});
