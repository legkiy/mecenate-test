import { Colors, Fonts } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextLayoutEvent,
  View,
} from 'react-native';

type Props = {
  text?: string;
};

const NUM_LINES = 2;

const PostDescription = ({ text }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [isMeasured, setIsMeasured] = useState(false);

  const toggleExpanded = (event: GestureResponderEvent) => {
    event.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const onTextLayout = (event: TextLayoutEvent) => {
    if (!isMeasured) {
      if (event.nativeEvent.lines.length > NUM_LINES) {
        setShowReadMore(true);
      }
      setIsMeasured(true);
    }
  };

  return (
    <View style={styles.box}>
      <Text
        numberOfLines={
          !isMeasured ? undefined : isExpanded ? undefined : NUM_LINES
        }
        onTextLayout={onTextLayout}
        style={[
          styles.desc,
          !isMeasured && { opacity: 0, position: 'absolute' },
        ]}
      >
        {text}
      </Text>
      {showReadMore && !isExpanded && (
        <LinearGradient
          colors={[Colors.surface.fg + '00', Colors.surface.fg]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.2, y: 0 }}
          style={styles.readMore}
        >
          <Text
            onPress={toggleExpanded}
            style={{
              color: Colors.text.primory,
            }}
          >
            Показать еще
          </Text>
        </LinearGradient>
      )}
    </View>
  );
};
export default PostDescription;

const styles = StyleSheet.create({
  box: {
    position: 'relative',
  },
  desc: {
    fontSize: Fonts.md,
    color: Colors.text.default,
  },
  readMore: {
    position: 'absolute',
    color: Colors.text.primory,
    fontWeight: '500',
    paddingLeft: 20,
    bottom: 0,
    right: 0,
    // backgroundColor: Colors.surface.fg,
  },
});
