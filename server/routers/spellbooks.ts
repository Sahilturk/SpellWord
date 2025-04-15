import { z } from "zod";
import { publicProcedure, router } from "../trpc";

import { prisma } from "../prisma";

export const spellbooksRouter = router({
  get: publicProcedure.query(async () => {
    return prisma.spellbook.findMany({
      include: {
        spells: true,
      },
    });
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      await prisma.spellbook.create({
        data: {
          title: input.title,
          description: input.description,
        },
      });
    }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      return await prisma.spellbook.findFirst({
        where: {
          id: input.id,
        },
        include: {
          spells: true,
        },
      });
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      await  prisma.spellbook.delete({
        where: {
          id: input.id,
        },
      });
    }),
});