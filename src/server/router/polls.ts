import { createRouter } from './context'
import { excludeMany } from '@/utils/helpers'
import { createPollInput } from '@/validators/polls'
import { TRPCError } from '@trpc/server'
import { nanoid } from 'nanoid'

const MAX_POLLS = 20

export const pollsRouter = createRouter()
  .query('public-polls', {
    async resolve({ ctx }) {
      const polls = await ctx.prisma.poll.findMany({
        where: { isPublic: true },
      })

      return excludeMany(polls, ['id', 'ownerEmail', 'createdAt', 'updatedAt'])
    },
  })
  .middleware(({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    return next()
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
