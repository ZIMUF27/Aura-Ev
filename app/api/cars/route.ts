import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const brand = searchParams.get('brand');
  const minSoh = searchParams.get('minSoh');

  try {
    const cars = await prisma.car.findMany({
      where: {
        status: 'AVAILABLE',
        ...(brand && brand !== 'all'
          ? { brand: { equals: brand } }
          : {}),
        ...(minSoh
          ? {
              batteryReport: {
                sohPercentage: { gte: parseInt(minSoh) },
              },
            }
          : {}),
      },
      include: {
        batteryReport: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ success: true, count: cars.length, data: cars });
  } catch (error) {
    console.error('Error fetching cars:', error);
    return NextResponse.json({ success: false, error: 'Database query failed' }, { status: 500 });
  }
}
