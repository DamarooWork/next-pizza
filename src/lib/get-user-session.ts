import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/constants/next-auth-options"

export async function GetUserSession(){
  const session = await getServerSession(authOptions)

  return session?.user ?? null
}