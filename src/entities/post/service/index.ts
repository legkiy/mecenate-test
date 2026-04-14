import { mecenateApiClient } from '@/shared/api/client';
import { components, paths } from '@/shared/api/endpoints';

type GetListResponse = components['schemas']['PostsResponse'];

class PostService {
  api = mecenateApiClient;

  queryKeys = {
    list: ['posts-list'],
    listByTier: (tier?: string) => ['posts-list', tier],
    detail: (id: string) => ['post', id],
  };
  async getList(
    query?: paths['/posts']['get']['parameters']['query'],
  ): Promise<GetListResponse> {
    const res = await this.api.get<GetListResponse>('/posts', {
      query,
    });
    return res;
  }

  async getById(
    id: string,
  ): Promise<components['schemas']['PostDetailResponse']> {
    const res = await this.api.get<components['schemas']['PostDetailResponse']>(
      `/posts/${id}`,
    );
    return res;
  }

  async toggleLike(postId: string): Promise<components['schemas']['LikeResponse']> {
    const res = await this.api.post<components['schemas']['LikeResponse']>(
      `/posts/${postId}/like`,
    );
    return res;
  }
}

export const postService = new PostService();
