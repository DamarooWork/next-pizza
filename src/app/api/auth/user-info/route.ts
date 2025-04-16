import { GetUserSession } from '@/lib/get-user-session';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';


export async function GET(req: any, res: any) {
  try {
    const user = await GetUserSession()

    if (!user) {
      return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 });
    }

    const data = await prisma.user.findUnique({
      where: {
        id: Number(user.id),
      },
      select: {
        fullName: true,
        email: true,
        password: false,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: '[USER_GET] Server error' }, { status: 500 });
  }
}