import { mecenateApiClient } from '@/shared/api/client';
import { components, paths } from '@/shared/api/endpoints';

class CommentsService {
  api = mecenateApiClient;

  queryKeys = {
    listByPostId: (postId?: string) => ['comments', postId],
  };

  async getListByPostId(
    postId: string,
    query?: paths['/posts/{id}/comments']['get']['parameters']['query'],
  ) {
    const res = await this.api.get<components['schemas']['CommentsResponse']>(
      `/posts/${postId}/comments`,
      {
        query,
      },
    );
    return res;
  }

  async sendComment(
    postId: string,
    body: {
      text: string;
    },
  ) {
    const res = await this.api.post<
      components['schemas']['CommentCreatedResponse']
    >(`/posts/${postId}/comments`, body);
    return res;
  }
}

export const commentsService = new CommentsService();
