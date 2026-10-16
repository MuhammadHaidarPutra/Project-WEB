import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get('active') === 'true';

    const where: any = {};
    if (activeOnly) {
      where.isActive = true;
    }

    const services = await prisma.service.findMany({
      where,
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(services);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Gagal mengambil data layanan' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, description, advantages, process, faq, image, icon, order, isActive } = body;

    if (!name || !description) {
      return NextResponse.json(
        { error: 'Nama dan deskripsi layanan wajib diisi' },
        { status: 400 }
      );
    }

    let baseSlug = slugify(name);
    let slug = baseSlug;
    let counter = 1;
    while (await prisma.service.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const service = await prisma.service.create({
      data: {
        name,
        slug,
        description,
        advantages: typeof advantages === 'object' ? JSON.stringify(advantages) : advantages,
        process: typeof process === 'object' ? JSON.stringify(process) : process,
        faq: typeof faq === 'object' ? JSON.stringify(faq) : faq,
        image,
        icon: icon || 'Home',
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Gagal membuat layanan: ' + error.message },
      { status: 500 }
    );
  }
}
