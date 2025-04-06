import { NextResponse } from 'next/server'
import { prisma } from '../../../../prisma'

export async function GET() {
  const ingredients = await prisma.ingredient.findMany()
  return NextResponse.json(ingredients)
}
