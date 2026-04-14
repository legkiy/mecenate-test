import { Colors, Spacing } from '@/constants/theme';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { io, Socket } from 'socket.io-client';
import { Comment, CreateCommentDto } from '../model';

interface Props {
  postId: string;
}

const CommentsScreen: React.FC<Props> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [inputText, setInputText] = useState<string>('');

  // Типизируем Ref для Socket.io
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    // Инициализация
    socket.current = io(process.env.EXPO_PUBLIC_API_URL_ + '/ws?tocken=');

    // Вход в комнату
    socket.current.emit('joinRoom', { postId });

    // Слушатель с типизацией приходящих данных
    socket.current.on('newComment', (comment: Comment) => {
      setComments((prev) => [comment, ...prev]);
    });

    return () => {
      socket.current?.disconnect();
    };
  }, [postId]);

  const sendComment = () => {
    if (!inputText.trim() || !socket.current) return;

    const newCommentPayload: CreateCommentDto = {
      postId,
      text: inputText,
    };

    // Отправка события
    socket.current.emit('sendMessage', newCommentPayload);
    setInputText('');
  };

  // Типизация отрисовки элемента списка
  const renderItem: ListRenderItem<Comment> = ({ item }) => (
    <View style={styles.commentContainer}>
      <View style={styles.avatarPlaceholder} />
      <View style={styles.commentContent}>
        <Text style={styles.userName}>{item.author?.displayName}</Text>
        <Text style={styles.commentText}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <View>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Ваш комментарий"
          value={inputText}
          onChangeText={setInputText}
          placeholderTextColor={Colors.text.muteSecond}
        />
        <TouchableOpacity
          onPress={sendComment}
          style={styles.sendButton}
          disabled={!inputText.trim()}
        >
          <AntDesign
            name="send"
            size={24}
            color={
              inputText.trim()
                ? Colors.surface.primory
                : Colors.surface.primoryDisabled
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContent: { padding: 15 },
  commentContainer: { flexDirection: 'row', marginBottom: 15 },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E1E1E1',
  },
  commentContent: { marginLeft: 12, flex: 1 },
  userName: { fontWeight: '600', fontSize: 14, color: '#000' },
  commentText: { fontSize: 14, color: '#333', marginTop: 2 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface.fg,
    width: '100%',
    minHeight: 40,
    padding: Spacing.lg,
  },
  input: {
    flex: 1,
    minHeight: 40,
    borderColor: Colors.surface.soft,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  sendButton: { marginLeft: 12 },
});

export default CommentsScreen;
