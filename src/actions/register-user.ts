'use server'
import { VerificationUserTemplate } from '@/components/shared/email-templates'
import { sendEmail } from '@/lib/send-email'
import { prisma } from '@/lib/prisma'
import { hashSync } from 'bcryptjs'

interface Props {
  email: string
  fullName: string
  password: string
}
export async function registerUser({ email, fullName, password }: Props) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (user) {
      if (!user.verified) {
        throw new Error('Почта не подтверждена')
      }
      throw new Error('Этот электронный адрес уже занят!')
    }

    const createdUser = await prisma.user.create({
      data: {
        email,
        fullName,
        password: hashSync(password, 10),
      },
    })
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    })
    await sendEmail({
      subject: 'Next Pizza / 📝 Подтверждение регистрации',
      emailTo: createdUser.email,
      ReactNode: await VerificationUserTemplate({
        code,
      }),
    })
  } catch (error) {
    console.error('[REGISTER_USER] Server error', error)
    return error
  }
}
