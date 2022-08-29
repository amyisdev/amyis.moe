import { Context, createRouter } from './context'
import { exclude, excludeMany } from '@/utils/helpers'
import { createPollInput, votePollInput } from '@/validators/polls'
import { TRPCError } from '@trpc/server'
import { nanoid } from 'nanoid'
import { getClientIp } from 'request-ip'
import { z } from 'zod'

const MAX_POLLS = 20

const getVoterId = (ctx: Context) => {
  if (ctx.session) return ctx.session.user?.email
  if (ctx.req) return getClientIp(ctx.req)
  return undefined
}

export const pollsRouter = createRouter()
  .query('public-polls', {
    async resolve({ ctx }) {
      const polls = await ctx.prisma.poll.findMany({
        where: { isPublic: true },
      })

      return excludeMany(polls, ['id', 'ownerEmail', 'createdAt', 'updatedAt'])
    },
  })

  .query('get-poll', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const voterId = getVoterId(ctx)
      if (!voterId) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
      }

      const poll = await ctx.prisma.poll.findFirst({
        where: { urlId: input.id },
        include: {
          _count: {
            select: { votes: true },
          },
          options: {
            include: { _count: true },
            orderBy: { id: 'asc' },
          },
        },
      })

      if (!poll) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Poll not found' })
      }

      const userVote = await ctx.prisma.pollVote.findFirst({
        where: { pollId: poll.id, voterId },
      })

      return {
        isOwner: poll.ownerEmail === ctx.session?.user?.email,
        poll: exclude(poll, ['id', 'ownerEmail', 'createdAt', 'updatedAt']),
        userVote,
      }
    },
  })

  .mutation('vote-poll', {
    input: votePollInput,
    async resolve({ ctx, input }) {
      const voterId = getVoterId(ctx)
      if (!voterId) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
      }

      const optionId = parseInt(input.optionId)

      const option = await ctx.prisma.pollOption.findFirst({
        where: { id: optionId },
        include: { poll: true },
      })

      if (!option) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Invalid option' })
      }

      if (option.poll.stoppedAt) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'This poll has been closed' })
      }

      const userVoted = await ctx.prisma.pollVote.count({
        where: { voterId, pollId: option.pollId },
      })

      if (userVoted !== 0) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'You have submitted a vote to this poll' })
      }

      const userVote = await ctx.prisma.pollVote.create({
        data: { voterId, optionId, pollId: option.pollId },
      })

      return { userVote }
    },
  })

  .middleware(({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You must be signed in to create a poll' })
    }

    return next()
  })

  .mutation('stop-poll', {
    input: z.object({ id: z.string() }),
    async resolve({ ctx, input }) {
      const poll = await ctx.prisma.poll.findFirst({
        where: { urlId: input.id, ownerEmail: ctx.session?.user?.email || '' },
      })

      if (!poll) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Poll not found' })
      }

      await ctx.prisma.poll.update({
        where: { id: poll.id },
        data: { stoppedAt: new Date() },
      })
    },
  })

  .query('my-polls', {
    async resolve({ ctx }) {
      if (!ctx.session?.user?.email) {
        return []
      }

      return ctx.prisma.poll.findMany({
        where: { ownerEmail: ctx.session.user.email },
      })
    },
  })

  .mutation('create-poll', {
    input: createPollInput,
    async resolve({ ctx, input }) {
      const ownedPolls = await ctx.prisma.poll.count({
        where: { ownerEmail: ctx.session?.user?.email || '' },
      })

      if (ownedPolls >= MAX_POLLS) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `You can only make up to ${MAX_POLLS} polls. Please delete a poll before creating a new one.`,
        })
      }

      const poll = await ctx.prisma.poll.create({
        data: {
          ...input,
          urlId: nanoid(12),
          ownerEmail: ctx.session?.user?.email || '',
          startedAt: new Date(),
          options: {
            createMany: {
              data: input.options,
            },
          },
        },
      })

      return { poll }
    },
  })
