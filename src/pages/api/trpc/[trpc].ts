import { prisma } from '@/server/db/client'
import { appRouter } from '@/server/router'
import { createContext } from '@/server/router/context'
import { createNextApiHandler } from '@trpc/server/adapters/next'

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
  batching: { enabled: false },
  teardown: () => prisma.$disconnect(),
})
