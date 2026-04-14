import { Colors, Fonts, Spacing } from '@/constants/theme';
import { BlurView } from 'expo-blur';
import { StyleSheet, View } from 'react-native';

const SkeletonPost = () => {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <View style={[styles.skeleton, styles.avatar]} />
        <View style={[styles.skeleton, { width: '30%' }]} />
      </View>
      <View>
        <BlurView intensity={10} tint="dark" style={styles.img} />
      </View>

      <View style={styles.info}>
        <View style={[styles.skeleton, { width: '50%' }]} />
        <View style={[styles.skeleton, { width: '100%' }]} />
      </View>
    </View>
  );
};
export default SkeletonPost;

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
  img: {
    width: '100%',
    aspectRatio: '1/1',
  },
  info: {
    padding: Spacing.lg,
    paddingTop: Spacing.xs,
    gap: Spacing.xs,
  },
  skeleton: {
    height: Fonts.lg * 1.3,
    backgroundColor: '#F2F2F7',
    borderRadius: Spacing.xl,
  },
  avatar: {
    width: 40,
    aspectRatio: '1/1',
    borderRadius: '100%',
  },
});
