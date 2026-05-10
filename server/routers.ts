import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { getAllPhones, getPhoneById, phoneExists, insertPhone, updatePhone, deletePhone } from "./supabase-db";
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
      .input(z.string().or(z.number()))
      .query(async ({ input }) => {
        return await getPhoneById(String(input));
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

        try {
          const specs = JSON.parse(input.specs);
          return await insertPhone({
            brand: input.brand,
            model: input.model,
            specs,
            imageUrl: input.imageUrl,
          });
        } catch (error) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid JSON in specs",
          });
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
        // Only admins can update phones
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Only admins can update phones",
          });
        }

        const { id, specs, ...updates } = input;
        const updateData: any = updates;
        if (specs) {
          try {
            updateData.specs = JSON.parse(specs);
          } catch (error) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Invalid JSON in specs",
            });
          }
        }
        return await updatePhone(String(id), updateData);
      }),

    delete: protectedProcedure
      .input(z.string().or(z.number()))
      .mutation(async ({ input, ctx }) => {
        // Only admins can delete phones
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Only admins can delete phones",
          });
        }

        return await deletePhone(String(input));
      }),
  }),
});

export type AppRouter = typeof appRouter;
