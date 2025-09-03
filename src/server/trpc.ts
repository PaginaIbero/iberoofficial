import { initTRPC } from '@trpc/server';

const t = initTRPC.create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof Error ? error.cause.message : undefined,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;