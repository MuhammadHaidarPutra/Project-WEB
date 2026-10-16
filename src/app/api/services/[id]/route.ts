import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const service = await prisma.service.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!service) {
      return NextResponse.json(
        { error: 'Layanan tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(service);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Gagal mengambil layanan' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { name, description, advantages, process, faq, image, icon, order, isActive } = body;

    const existingService = await prisma.service.findUnique({ where: { id } });
    if (!existingService) {
      return NextResponse.json(
        { error: 'Layanan tidak ditemukan' },
        { status: 404 }
      );
    }

    let slug = existingService.slug;
    if (name && name !== existingService.name) {
      let baseSlug = slugify(name);
      slug = baseSlug;
      let counter = 1;
      while (
        await prisma.service.findFirst({
          where: { slug, NOT: { id } },
        })
      ) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        advantages: typeof advantages === 'object' ? JSON.stringify(advantages) : advantages,
        process: typeof process === 'object' ? JSON.stringify(process) : process,
        faq: typeof faq === 'object' ? JSON.stringify(faq) : faq,
        image,
        icon,
        order,
        isActive,
      },
    });

    return NextResponse.json(updatedService);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Gagal memperbarui layanan: ' + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await prisma.service.delete({ where: { id } });

    return NextResponse.json({ message: 'Layanan berhasil dihapus' });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Gagal menghapus layanan: ' + error.message },
      { status: 500 }
    );
  }
}
