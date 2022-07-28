// src/server/router/index.ts
import { authRouter } from './auth'
import { createRouter } from './context'
import { spotifyRouter } from './spotify'
import superjson from 'superjson'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('spotify.', spotifyRouter)
  .merge('auth.', authRouter)

// export type definition of API
export type AppRouter = typeof appRouter
