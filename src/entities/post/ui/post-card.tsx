import { Colors, Fonts, Spacing } from '@/constants/theme';
import { components } from '@/shared/api/endpoints';
import Chip from '@/shared/ui/Chip';
import Image from '@/shared/ui/Image';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';

type Props = components['schemas']['Post'] & {};
const PostCard = ({
  title,
  coverUrl,
  preview,
  author,
  likesCount,
  commentsCount,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Image source={author?.avatarUrl} style={styles.avatar} />
        <Text style={[styles.defaultText, { fontWeight: '700' }]}>
          {author?.displayName}
        </Text>
      </View>
      <Image source={coverUrl} style={styles.img} />
      <View style={styles.info}>
        <Text
          style={{
            fontSize: Fonts.lg,
            color: Colors.text.primary,
            fontWeight: '700',
          }}
        >
          {title}
        </Text>
        <Text style={styles.defaultText}>{preview}</Text>
      </View>
      <View style={styles.actions}>
        <Chip
          label={String(likesCount)}
          startIcon={
            <FontAwesome name="heart-o" size={24} color={Colors.text.mute} />
          }
        />
        <Chip
          label={String(commentsCount)}
          startIcon={
            <FontAwesome name="comment" size={24} color={Colors.text.mute} />
          }
        />
      </View>
    </View>
  );
};
export default PostCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface.fg,
  },
  head: {
    flexDirection: 'row',
    padding: Spacing.lg,
    paddingTop: Spacing.md,
    gap: Spacing.lg,
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    aspectRatio: '1/1',
    borderRadius: '100%',
  },
  img: {
    width: '100%',
    aspectRatio: '1/1',
  },
  info: {
    padding: Spacing.lg,
    paddingTop: Spacing.xs,
    gap: Spacing.xs,
  },
  defaultText: { fontSize: Fonts.md, color: Colors.text.primary },
  actions: {
    flexDirection: 'row',
    paddingInline: Spacing.lg,
    paddingBottom: Spacing.md,
    gap: Spacing.xs,
  },
});
