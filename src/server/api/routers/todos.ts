import { z } from "zod";

import {
  createTRPCRouter,
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
    published: z.string(),
    title: z.string().min(1),
    state: z.string().min(1),
    description: z.string().min(1),
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
  }),
  createTodo: protectedProcedure.input(z.object({
    published: z.string(),
    title: z.string().min(1),
    state: z.string().min(1),
    description: z.string().min(1),
  })).mutation(async ({ ctx, input }) => {
    const task = await ctx.prisma.todo.create({
      data: {
        ...input,
        authorId: ctx.session.user.id,
      },
    });
    return task;
  }),


});
