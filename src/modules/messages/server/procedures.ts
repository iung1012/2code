import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/db";
import { consumeCredits } from "@/lib/usage";
import { protectedProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const messagesRouter = createTRPCRouter({
    getMany: protectedProcedure
        .input(
            z.object({
                projectId: z.string().min(1, { message: "project ID is required" })
            })
        )
        .query(async ({ input, ctx }) => {
            const result = await prisma.message.findMany({
                where: {
                    projectId: input.projectId,
                    project: {
                        userId: ctx.auth.userId // is this really necessary?
                    }
                },
                include: {
                    fragment: true
                },
                orderBy: {
                    updatedAt: "asc"
                }
            });
            return result;
        }),
    create: protectedProcedure
        .input(
            z.object({
                value: z.string()
                    .min(1, { message: "Message is required" })
                    .max(10000, { message: "Prompt is too long" }),
                projectId: z.string()
                    .min(1, { message: "Project ID cannot be null" })
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const existingProject = await prisma.project.findUnique({
                where: {
                    id: input.projectId,
                    userId: ctx.auth.userId
                }
            });

            if (!existingProject) throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" });

            // also charge with one credit 
            try {
                await consumeCredits();
            } catch (e) {
                if (e instanceof Error) {
                    throw new TRPCError({ code: "BAD_REQUEST", message: "Something went wrong" });
                } else {
                    throw new TRPCError({
                        code: "TOO_MANY_REQUESTS",
                        message: "You have run out of credits"
                    })
                }
            }

            const createdMessage = await prisma.message.create({
                data: {
                    projectId: existingProject.id,
                    content: input.value,
                    role: "USER",
                    type: "RESULT"
                }
            });

            await inngest.send({
                name: "code-agent/run",
                data: {
                    value: input.value,
                    projectId: input.projectId
                }
            });

            return createdMessage;
        })
})