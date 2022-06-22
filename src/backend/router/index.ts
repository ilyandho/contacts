import * as trpc from "@trpc/server";
import { prisma } from "../../backend/utils/prisma";
import { z } from "zod";

export const appRouter = trpc
  .router()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    async resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? "world"}`,
      };
    },
  })
  .mutation("add-contact", {
    input: z.object({
      name: z.string(),
      email: z.string(),
    }),
    async resolve({ input }) {
      const contact = await prisma.contact.create({
        data: {
          ...input,
        },
      });
      return { success: true, contact };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
