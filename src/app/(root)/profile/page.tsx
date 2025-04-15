import { ProfileForm } from '@/components/shared'
import { GetUserSession } from '@/lib/get-user-session'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

interface Props {
  className?: string
}
export default async function ProfilePage({ className }: Props) {
  const session = await GetUserSession()
  if (!session) {
    return redirect('/not-auth')
  }
  const user = await prisma.user.findFirst({
    where: {
      id: +session.id,
    },
  })
  if (!user) {
    return redirect('/not-auth')
  }
  return <ProfileForm data={user} />
}
