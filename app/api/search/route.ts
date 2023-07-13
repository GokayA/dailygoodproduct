import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get('q');

  if (!q) return new Response('Invalid query', { status: 400 });

  const results = await db.post.findMany({
    where: {
      title: {
        contains: q,
      },
    },
    include: {
      _count: true,
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
  });

  return new Response(JSON.stringify(results));
}
