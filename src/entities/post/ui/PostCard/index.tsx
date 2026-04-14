import { Colors, Fonts, Spacing } from '@/constants/theme';
import { components } from '@/shared/api/endpoints';
import Button from '@/shared/ui/Button';
import Chip from '@/shared/ui/Chip';
import Image from '@/shared/ui/Image';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BlurView } from 'expo-blur';
import { Link, router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import LikeCounts from './like-counts';
import PostDescription from './post-description';

type Props = components['schemas']['Post'] & {};
const PostCard = ({
  title,
  coverUrl,
  body,
  author,
  likesCount,
  commentsCount,
  isLiked,
  id,
  tier,
}: Props) => {
  const isPaid = tier === 'paid';

  return (
    <Link href={`/${id}`} disabled={isPaid}>
      <View style={styles.container}>
        <View style={styles.head}>
          <Image source={author?.avatarUrl} style={styles.avatar} />
          <Text style={[styles.name]}>{author?.displayName}</Text>
        </View>
        <View>
          <Image source={coverUrl} style={styles.img} />
          {isPaid && (
            <BlurView intensity={60} tint="dark" style={styles.blurIverlay}>
              <Button>
                <View
                  style={{
                    backgroundColor: Colors.surface.fg,
                    padding: Spacing.xs,
                    alignItems: 'center',
                    borderRadius: Spacing.xl,
                    aspectRatio: '1/1',
                  }}
                >
                  <FontAwesome
                    name="dollar"
                    size={Fonts.md}
                    color={Colors.text.primory}
                  />
                </View>
              </Button>
              <Text style={styles.paidText}>
                Контент скрыт пользователем.{'\n'}Доступ откроется после доната
              </Text>
              <Button>
                <Text
                  style={{
                    color: Colors.text.fg,
                    fontWeight: '600',
                    fontSize: Fonts.md,
                    paddingInline: Spacing.xl,
                  }}
                >
                  Отправить донат
                </Text>
              </Button>
            </BlurView>
          )}
        </View>

        <View style={styles.info}>
          {isPaid ? (
            <>
              <View style={[styles.skeleton, { width: '50%' }]} />
              <View style={[styles.skeleton, { width: '100%' }]} />
            </>
          ) : (
            <>
              <Text
                style={{
                  fontSize: Fonts.lg,
                  color: Colors.text.default,
                  fontWeight: '700',
                }}
              >
                {title}
              </Text>
              <PostDescription text={body} />
            </>
          )}
        </View>
        {!isPaid && (
          <View style={styles.actions}>
            <LikeCounts
              initCounts={likesCount}
              initIsLiked={!!isLiked}
              postId={id}
            />
            <Chip
              onPress={() => router.push(`/${id}`)}
              label={String(commentsCount)}
              startIcon={
                <FontAwesome
                  name="comment"
                  size={22}
                  color={Colors.text.mute}
                />
              }
            />
          </View>
        )}
      </View>
    </Link>
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
  name: {
    fontSize: Fonts.md,
    color: Colors.text.default,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    paddingInline: Spacing.lg,
    paddingBottom: Spacing.md,
    gap: Spacing.xs,
  },
  blurIverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  paidText: {
    color: Colors.text.fg,
  },
  skeleton: {
    height: Fonts.lg * 1.3,
    backgroundColor: '#F2F2F7',
    borderRadius: Spacing.xl,
  },
});
