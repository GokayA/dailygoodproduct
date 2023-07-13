import { db } from '@/lib/db';
import { z } from 'zod';

export async function GET(req: Request) {
  const url = new URL(req.url);

  try {
    const { limit, page } = z
      .object({
        limit: z.string(),
        page: z.string(),
      })
      .parse({
        limit: url.searchParams.get('limit'),
        page: url.searchParams.get('page'),
      });
    const posts = await db.post.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        votes: true,
        author: true,
        comments: true,
      },
    });
    return new Response(JSON.stringify(posts));
  } catch (error) {
    return new Response('Something wrong about fetching products', {
      status: 500,
    });
  }
}
