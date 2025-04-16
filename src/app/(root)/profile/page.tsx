import { ProfileForm } from '@/components/shared'
import { GetUserSession } from '@/lib/get-user-session'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const session = await GetUserSession()
  if (!session) {
    return redirect('/not-auth')
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: +session.id,
      },
    })

    if (!user) {
      return redirect('/not-auth')
    }

    return <ProfileForm data={user} />
  } catch (error) {
    console.error('[PROFILE_PAGE] Error:', error)
    return redirect('/not-auth')
  }
}
