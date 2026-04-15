import { Comment, commentsService } from '@/entities/comment';
import { components } from '@/shared/api/endpoints';
import { getAppUuid } from '@/shared/lib/app-uuid';
import { useQueryClient } from '@tanstack/react-query';
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

  const queryClient = useQueryClient();

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
            queryClient.setQueryData<components['schemas']['CommentsResponse']>(
              commentsService.queryKeys.listByPostId(postId),
              (prev) => {
                if (!prev) return {};
                if (
                  prev?.data?.comments?.some((c) => c.id === data.comment.id)
                ) {
                  return prev;
                }

                return {
                  ...prev,
                  data: {
                    ...prev?.data,
                    comments: [...(prev?.data?.comments || []), data.comment],
                  },
                };
              },
            );
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
