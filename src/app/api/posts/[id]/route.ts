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
    const post = await prisma.post.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        author: { select: { name: true, email: true } },
        category: true,
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Artikel tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Gagal mengambil artikel' },
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
    const { title, excerpt, content, thumbnail, status, categoryId } = body;

    const existingPost = await prisma.post.findUnique({ where: { id } });
    if (!existingPost) {
      return NextResponse.json(
        { error: 'Artikel tidak ditemukan' },
        { status: 404 }
      );
    }

    let slug = existingPost.slug;
    if (title && title !== existingPost.title) {
      let baseSlug = slugify(title);
      slug = baseSlug;
      let counter = 1;
      while (
        await prisma.post.findFirst({
          where: { slug, NOT: { id } },
        })
      ) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        thumbnail,
        status,
        categoryId,
        publishedAt:
          status === 'PUBLISHED' && !existingPost.publishedAt
            ? new Date()
            : existingPost.publishedAt,
      },
      include: {
        author: { select: { name: true } },
        category: true,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Gagal memperbarui artikel: ' + error.message },
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
    await prisma.post.delete({ where: { id } });

    return NextResponse.json({ message: 'Artikel berhasil dihapus' });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Gagal menghapus artikel: ' + error.message },
      { status: 500 }
    );
  }
}
