import { components } from '@/shared/api/endpoints';

export type Comment = components['schemas']['Comment'];

export type CreateCommentDto= {
  postId: string;
  text: string;
}