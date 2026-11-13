import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, latitude, longitude, addressNote, issueType } = body;

    if (!phone || latitude === undefined || longitude === undefined) {
      return NextResponse.json(
        { success: false, error: 'Phone and GPS coordinates are required' },
        { status: 400 }
      );
    }

    const ticket = await prisma.emergencyTicket.create({
      data: {
        phone,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        addressNote: addressNote || 'พิกัด GPS อัตโนมัติจากผู้ใช้งาน',
        issueType: issueType || 'BATTERY_DEPLETED',
        status: 'DISPATCHED',
        assignedVan: 'AURA-VAN-02 (กำลังเดินทาง)',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'หน่วยบริการ Aura Mobile Service กำลังเดินทางไปหาคุณ',
      ticket,
    });
  } catch (error) {
    console.error('Error creating emergency ticket:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to dispatch emergency service' },
      { status: 500 }
    );
  }
}
