'use client';

import { trpc } from '@/app/_trpc/client';

const Page = () => {
  trpc.cargaDatos.cargarPaises.useQuery();
};

export default Page;