'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React, { useState } from 'react';

import { trpc } from './client';

const Providers = ({children}: {children: React.ReactNode}) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  }));
  const [trpcClient] = useState(() => trpc.createClient({
    links: [
      httpBatchLink({
        url: `${process.env.NEXT_PUBLIC_URL}/api/trpc`,
        // Batch requests for better performance
        maxURLLength: 2083,
      })
    ]
  }));
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> 
    </trpc.Provider>
  )
}

export default Providers;
