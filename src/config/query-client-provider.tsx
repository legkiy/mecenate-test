import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // повтор запроса при ошибке
      staleTime: 1000 * 30, // 30 секунд кэш считается свежим
      refetchOnWindowFocus: false,
    },
  },
});

type Props = {
  children: React.ReactNode;
};

const QueryProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
