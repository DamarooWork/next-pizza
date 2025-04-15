'use server'
import { GetUserSession } from '@/lib/get-user-session'
import { prisma } from '@/lib/prisma'
import { hashSync } from 'bcrypt'

interface Props {
  email: string
  fullName: string
  password: string
}
export async function updateUserInfo({ email, fullName, password }: Props) {
  try {
    const currentUser = await GetUserSession()
    if (!currentUser) {
      throw new Error('Пользователь не найден')
    }
    await prisma.user.update({
      where: {
        id: +currentUser.id,
      },
      data: {
        email,
        fullName,
        password: hashSync(password, 10),
      },
    })
  } catch (error) {
    console.error('[UPDATE_USER_INFO] Server error', error)
    return error
  }
}
