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
    const project = await prisma.project.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        images: true,
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Proyek tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Gagal mengambil proyek' },
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
    const { name, category, location, year, area, description, thumbnail, status, galleryImages } = body;

    const existingProject = await prisma.project.findUnique({ where: { id } });
    if (!existingProject) {
      return NextResponse.json(
        { error: 'Proyek tidak ditemukan' },
        { status: 404 }
      );
    }

    let slug = existingProject.slug;
    if (name && name !== existingProject.name) {
      let baseSlug = slugify(name);
      slug = baseSlug;
      let counter = 1;
      while (
        await prisma.project.findFirst({
          where: { slug, NOT: { id } },
        })
      ) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    // Update gallery images if provided
    if (Array.isArray(galleryImages)) {
      await prisma.projectImage.deleteMany({ where: { projectId: id } });
      if (galleryImages.length > 0) {
        await prisma.projectImage.createMany({
          data: galleryImages.map((img: string) => ({
            projectId: id,
            imageUrl: img,
          })),
        });
      }
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        name,
        slug,
        category,
        location,
        year,
        area,
        description,
        thumbnail,
        status,
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Gagal memperbarui proyek: ' + error.message },
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
    await prisma.project.delete({ where: { id } });

    return NextResponse.json({ message: 'Proyek berhasil dihapus' });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Gagal menghapus proyek: ' + error.message },
      { status: 500 }
    );
  }
}
