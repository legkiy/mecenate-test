import Image from '@/shared/ui/Image';
import { ImageProps } from 'expo-image';
import { StyleSheet } from 'react-native';

type Props = {
  src: string;
  style?: ImageProps['style'];
};

const Avatar = ({ src }: Props) => {
  return <Image source={src} style={styles.avatar} />;
};
export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    aspectRatio: '1/1',
    borderRadius: '100%',
  },
});
