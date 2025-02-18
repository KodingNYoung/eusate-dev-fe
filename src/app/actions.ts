"use server"

import { getSession } from "@/lib/sessions"

export const getClientSession = async () => await getSession()
