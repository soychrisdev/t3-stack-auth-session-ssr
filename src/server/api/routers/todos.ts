import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const todosRouter = createTRPCRouter({

  getTodosById: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany({
      where: {
        authorId: ctx.session.user.id
      },
    }
    )
  }),
  mutateTodo: protectedProcedure.input(z.object({
    id: z.string(),
    updatedAt: z.date(),
    published: z.boolean(),
    title: z.string(),
    state: z.enum(['DOING', 'DONE', 'STANDBY']),
    description: z.string(),
  })).mutation(({ ctx, input }) => {
    const { id, updatedAt, published, title, state, description } = input;

    return ctx.prisma.todo.update({
      where: {
        id,
      },
      data: {
        updatedAt, published, title, state, description
      },
    })
  })


});
