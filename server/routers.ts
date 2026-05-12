import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { getAllPhones, getPhoneById, phoneExists, insertPhone, updatePhone, deletePhone } from "./db";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
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
      .input(z.string().or(z.number()))
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
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can add phones" });
        }

        const exists = await phoneExists(input.brand, input.model);
        if (exists) {
          throw new TRPCError({ code: "CONFLICT", message: "Phone already exists" });
        }

        try {
          // Verify JSON if it's a string
          JSON.parse(input.specs);
          return await insertPhone({
            brand: input.brand,
            model: input.model,
            specs: input.specs,
            imageUrl: input.imageUrl,
          });
        } catch (error) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid JSON in specs" });
        }
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.string().or(z.number()),
          brand: z.string().min(1).optional(),
          model: z.string().min(1).optional(),
          specs: z.string().optional(),
          imageUrl: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can update phones" });
        }

        const { id, ...updates } = input;
        return await updatePhone(id, updates);
      }),

    delete: protectedProcedure
      .input(z.string().or(z.number()))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can delete phones" });
        }
        return await deletePhone(input);
      }),
  }),
});

export type AppRouter = typeof appRouter;
