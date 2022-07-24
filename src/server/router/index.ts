// src/server/router/index.ts
import { authRouter } from './auth'
import { createRouter } from './context'
import { exampleRouter } from './example'
import superjson from 'superjson'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('auth.', authRouter)

// export type definition of API
export type AppRouter = typeof appRouter
