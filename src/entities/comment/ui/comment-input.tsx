import { Colors, Fonts, Spacing } from '@/constants/theme';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { commentsService } from '../service';
type Props = {
  postId: string;
};
const CommentInput = ({ postId }: Props) => {
  const [value, setValue] = useState('');

  const onSubmit = async () => {
    if (!value.trim()) return;
    try {
      await commentsService.sendComment(postId, {
        text: value,
      });
      setValue('');
      Keyboard.dismiss();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.box}>
      <TextInput
        style={styles.input}
        value={value}
        onChange={(e) => setValue(e.nativeEvent.text)}
        placeholder="Ваш коментарий"
        placeholderTextColor={Colors.text.muteSecond}
      />
      <TouchableOpacity disabled={!value.trim()} onPress={onSubmit}>
        <AntDesign
          name="send"
          size={24}
          color={
            !value.trim()
              ? Colors.surface.primoryDisabled
              : Colors.surface.primory
          }
        />
      </TouchableOpacity>
    </View>
  );
};
export default CommentInput;

const styles = StyleSheet.create({
  box: {
    backgroundColor: Colors.surface.fg,
    flexDirection: 'row',
    padding: Spacing.lg,
    gap: Spacing.md,
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: Spacing.lg,
    borderRadius: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.surface.soft,
    fontSize: Fonts.md,
    flex: 1,
    height: 40,
  },
});
