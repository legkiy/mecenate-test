import { randomUUID } from 'expo-crypto';
import { ApiClient } from './core';

export const mecenateApiClient = new ApiClient({
  baseUrl: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const uuid = randomUUID();

mecenateApiClient.addRequestInterceptor(async (config) => {
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
