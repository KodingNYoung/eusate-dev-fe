import { z } from "zod"

export const organisation = z.object({
  id: z.string(),
  owner: z.string(),
  date_created: z.string().datetime(),
  date_updated: z.string().datetime(),
  name: z.string(),
  meta: z.object({}),
})
