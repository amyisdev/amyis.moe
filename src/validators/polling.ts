import { z } from 'zod'

export const createPollInput = z.object({
  question: z.string().min(5).max(500),
  isPublic: z.boolean().optional(),
  options: z
    .object({
      content: z.string().min(5).max(500),
    })
    .array()
    .min(2)
    .max(10),
})
