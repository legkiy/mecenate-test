import { Colors, Fonts } from '@/constants/theme';
import Chip from '@/shared/ui/Chip';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as Haptics from 'expo-haptics';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  SlideInDown,
  SlideOutUp,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { postService } from '../../service';

const AnimatedNumber = ({
  value,
  isLiked,
}: {
  value: number;
  isLiked: boolean;
}) => {
  return (
    <View style={styles.container}>
      <Animated.Text
        key={value}
        entering={SlideInDown.duration(200)}
        exiting={SlideOutUp.duration(200)}
        style={[
          styles.text,
          { color: isLiked ? Colors.text.accent : Colors.text.mute },
        ]}
      >
        {value}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 20,
  },
  text: {
    color: Colors.text.mute,
    fontSize: Fonts.xs,
    fontWeight: '700',
  },
});

// Компонент для вылетающего сердечка
const FloatingHeart = ({ onComplete }: { onComplete: () => void }) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
    opacity: opacity.value,
    position: 'absolute',
    top: -20,
    left: 10,
  }));

  useState(() => {
    translateY.value = withTiming(-60, { duration: 800 });
    scale.value = withTiming(1.5, { duration: 400 });
    opacity.value = withTiming(0, { duration: 800 }, (finished) => {
      if (finished) scheduleOnRN(onComplete);
    });
  });

  return (
    <Animated.View style={animatedStyle}>
      <FontAwesome name="heart" size={18} color={Colors.surface.accent} />
    </Animated.View>
  );
};

type Props = {
  initCounts?: number;
  postId: string;
  initIsLiked: boolean;
};

const LikeCounts = ({ initCounts = 0, initIsLiked, postId }: Props) => {
  const [count, setCount] = useState(initCounts);
  const [isLiked, setIsLiked] = useState(initIsLiked);
  const [hearts, setHearts] = useState<number[]>([]); // Для рендера нескольких сердечек

  const scale = useSharedValue(1);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = useCallback(async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    scale.value = withSequence(withSpring(1.3), withSpring(1));

    if (!isLiked) {
      setHearts((prev) => [...prev, Date.now()]);
    }

    // Оптимистичное обновление UI
    const prevCount = count;
    const prevLiked = isLiked;
    setCount(isLiked ? count - 1 : count + 1);
    setIsLiked(!isLiked);

    try {
      const res = await postService.toggleLike(postId);
      if (res.data) {
        setCount(res.data.likesCount);
        setIsLiked(res.data.isLiked);
      }
    } catch {
      setCount(prevCount);
      setIsLiked(prevLiked);
    }
  }, [scale, isLiked, count, postId]);

  return (
    <View>
      {hearts.map((id) => (
        <FloatingHeart
          key={id}
          onComplete={() => setHearts((prev) => prev.filter((h) => h !== id))}
        />
      ))}

      <Chip
        onPress={handlePress}
        label={<AnimatedNumber value={count} isLiked={isLiked} />}
        style={[isLiked && { backgroundColor: Colors.surface.accent }]}
        textStyle={[isLiked && { color: Colors.text.accent }]}
        startIcon={
          <Animated.View style={iconStyle}>
            <FontAwesome
              name={isLiked ? 'heart' : 'heart-o'}
              size={22}
              color={isLiked ? Colors.text.accent : Colors.text.mute}
            />
          </Animated.View>
        }
      />
    </View>
  );
};

export default LikeCounts;
