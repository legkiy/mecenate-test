import { Colors } from '@/constants/theme';
import { Image as ExpoImage, ImageProps } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';

// Заглушка, если основное фото не загрузилось
const FALLBACK_IMAGE =
  'https://via.placeholder.com/300/ff0000/ffffff?text=Error';

type Props = React.ComponentProps<typeof ExpoImage> & {};
const Image = ({ source, style }: Props) => {
  const imageSources = source ? [source, FALLBACK_IMAGE] : [FALLBACK_IMAGE];

  return (
    <View style={[styles.container, style]}>
      <ExpoImage
        style={styles.image}
        source={imageSources as ImageProps['source']}
        placeholder="L6PZjs9F00~q%ndnIURj00Rj4n%M"
        contentFit="cover"
        transition={500}
        onError={() => console.log('Ошибка загрузки изображения')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: Colors.surface.soft,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Image;
