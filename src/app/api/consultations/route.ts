import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const where: any = {};
    if (status && status !== 'Semua') {
      where.status = status;
    }

    const consultations = await prisma.consultation.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(consultations);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Gagal mengambil data konsultasi' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    const consultation = await prisma.consultation.create({
      data: {
        name,
        email,
        phone,
        service,
        message,
        status: 'NEW',
      },
    });

    return NextResponse.json(consultation, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Gagal mengirim pesan konsultasi' },
      { status: 500 }
    );
  }
}
