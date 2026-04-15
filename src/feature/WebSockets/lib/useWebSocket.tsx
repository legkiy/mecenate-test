import { Comment } from '@/entities/comment';
import { getAppUuid } from '@/shared/lib/app-uuid';
import { useEffect, useRef, useState } from 'react';

enum WsMessageType {
  PING = 'ping',
  LIKE_UPDATED = 'like_updated',
  COMMENT_ADDED = 'comment_added',
}

type WsResponse =
  | {
      type: WsMessageType.PING;
    }
  | {
      type: WsMessageType.LIKE_UPDATED;
      postId: string;
      likesCount: number;
    }
  | {
      type: WsMessageType.COMMENT_ADDED;
      postId: string;
      comment: Comment;
    };

export function useWebSocket(postId: string) {
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [newComment, setNewComment] = useState<Comment | null>(null);
  const [likesCount, setLikesCount] = useState<number>(0);

  const uuid = getAppUuid();

  useEffect(() => {
    if (!uuid) return;

    const connect = () => {
      const url = `${process.env.EXPO_PUBLIC_API_URL}/ws?token=${uuid}`;
      const ws = new WebSocket(url);

      ws.onopen = () => {
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as WsResponse;

          if (data.type === WsMessageType.LIKE_UPDATED) {
            setLikesCount(data.likesCount);
          } else if (data.type === WsMessageType.COMMENT_ADDED) {
            setNewComment(data.comment);
          }
        } catch (e) {
          console.error('Ошибка парсинга WebSocket сообщения', e);
        }
      };

      ws.onclose = (e) => {
        setIsConnected(false);
        setTimeout(connect, 3000);
      };

      ws.onerror = (e) => {
        console.error('WebSocket ошибка', e);
      };

      wsRef.current = ws;
    };

    connect();

    return () => {
      wsRef.current?.close();
    };
  }, [uuid]);

  return { isConnected, newComment, likesCount };
}
