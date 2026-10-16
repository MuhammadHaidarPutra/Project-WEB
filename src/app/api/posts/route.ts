import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;

    const where: any = {};
    if (category) {
      where.category = { slug: category };
    }
    if (status) {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
      ];
    }

    const posts = await prisma.post.findMany({
      where,
      include: {
        author: { select: { name: true, email: true } },
        category: { select: { id: true, name: true, slug: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return NextResponse.json(posts);
  } catch (error: any) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data artikel' },
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
    const { title, excerpt, content, thumbnail, status, categoryId } = body;

    if (!title || !content || !categoryId) {
      return NextResponse.json(
        { error: 'Judul, konten, dan kategori wajib diisi' },
        { status: 400 }
      );
    }

    // Generate unique slug
    let baseSlug = slugify(title);
    let slug = baseSlug;
    let counter = 1;
    while (await prisma.post.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt: excerpt || title,
        content,
        thumbnail,
        status: status || 'DRAFT',
        authorId: (session.user as any).id || (await prisma.user.findFirst())?.id || '',
        categoryId,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
      },
      include: {
        author: { select: { name: true, email: true } },
        category: true,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Gagal membuat artikel: ' + error.message },
      { status: 500 }
    );
  }
}
