import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { getAllPhones, getPhoneById, phoneExists, insertPhone, updatePhone, deletePhone } from "./db";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  phones: router({
    list: publicProcedure
      .input(
        z.object({
          brand: z.string().optional(),
          model: z.string().optional(),
        }).optional()
      )
      .query(async ({ input }) => {
        return await getAllPhones(input);
      }),

    getById: publicProcedure
      .input(z.number())
      .query(async ({ input }) => {
        return await getPhoneById(input);
      }),

    create: protectedProcedure
      .input(
        z.object({
          brand: z.string().min(1),
          model: z.string().min(1),
          specs: z.string(),
          imageUrl: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // Only admins can add phones
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Only admins can add phones",
          });
        }

        // Check if phone already exists
        const exists = await phoneExists(input.brand, input.model);
        if (exists) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Phone with this brand and model already exists",
          });
        }

        return await insertPhone({
          brand: input.brand,
          model: input.model,
          specs: input.specs,
          imageUrl: input.imageUrl,
        });
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          brand: z.string().min(1).optional(),
          model: z.string().min(1).optional(),
          specs: z.string().optional(),
          imageUrl: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // Only admins can update phones
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Only admins can update phones",
          });
        }

        const { id, ...updates } = input;
        return await updatePhone(id, updates);
      }),

    delete: protectedProcedure
      .input(z.number())
      .mutation(async ({ input, ctx }) => {
        // Only admins can delete phones
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Only admins can delete phones",
          });
        }

        return await deletePhone(input);
      }),
  }),
});

export type AppRouter = typeof appRouter;
