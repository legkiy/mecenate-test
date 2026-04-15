import { getOrCreateAppUuid } from '@/shared/lib/app-uuid';
import { ApiClient } from './core';

export const mecenateApiClient = new ApiClient({
  baseUrl: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

mecenateApiClient.addRequestInterceptor(async (config) => {
  const uuid = await getOrCreateAppUuid();
  return {
    ...config,
    headers: {
      Authorization: `Bearer ${uuid}`,
      ...config.headers,
    },
    query: {
      ...config.query,
    },
  };
});

mecenateApiClient.addResponseInterceptor((response: any) => {
  return response;
});
