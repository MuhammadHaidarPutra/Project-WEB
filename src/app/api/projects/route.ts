import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;

    const where: any = {};
    if (category && category !== 'Semua') {
      where.category = category;
    }
    if (status) {
      where.status = status;
    }

    const projects = await prisma.project.findMany({
      where,
      include: {
        images: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Gagal mengambil data portofolio' },
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
    const { name, category, location, year, area, description, thumbnail, status, galleryImages } = body;

    if (!name || !category || !location || !year || !description) {
      return NextResponse.json(
        { error: 'Field wajib: nama, kategori, lokasi, tahun, deskripsi' },
        { status: 400 }
      );
    }

    let baseSlug = slugify(name);
    let slug = baseSlug;
    let counter = 1;
    while (await prisma.project.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const imagesToCreate = Array.isArray(galleryImages)
      ? galleryImages.map((img: string) => ({ imageUrl: img }))
      : [];

    const project = await prisma.project.create({
      data: {
        name,
        slug,
        category,
        location,
        year,
        area,
        description,
        thumbnail: thumbnail || (imagesToCreate.length > 0 ? imagesToCreate[0].imageUrl : null),
        status: status || 'PUBLISHED',
        images: {
          create: imagesToCreate,
        },
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Gagal membuat proyek: ' + error.message },
      { status: 500 }
    );
  }
}
