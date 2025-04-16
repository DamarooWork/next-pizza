import { authOptions } from '@/lib/constants/next-auth-options'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const user = await getServerSession(authOptions)

    if (!user) {
      return NextResponse.json(
        { message: 'Вы не авторизованы' },
        { status: 401 }
      )
    }

    const data = await prisma.user.findUnique({
      where: {
        id: Number(user.user.id),
      },
      select: {
        fullName: true,
        email: true,
        password: false,
      },
    })

    return NextResponse.json(data)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: '[USER_GET] Server error' },
      { status: 500 }
    )
  }
}
