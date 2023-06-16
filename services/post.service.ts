import { sql } from "@vercel/postgres";
import { Post, isValidPost } from "@models/post.model";
export async function getPostsByDate(date: string): Promise<Post[]> {
  const { rows }: { rows: Post[] } =
    await sql`SELECT * from POSTS where updated_at=${date}`;
  return rows;
}

// needs CREATE EXTENSION IF NOT EXISTS pg_trgm;
// and CREATE EXTENSION fuzzystrmatch;
export async function searchPosts(
  page: number = 0,
  searchTerm: string = ""
): Promise<Post[]> {
  const { rows }: { rows: Post[] } = await sql`
        SELECT
          blog,
          title,
          href,
          summary,
          created_at,
          array_agg(t.name) AS tags,
          strpos(LOWER(summary::text), LOWER(${searchTerm})) AS summaryPossition
        FROM posts p
          JOIN tags t
            ON t.id = ANY(p.tags)
        WHERE t.approved = true
          AND similarity(summary::text, ${searchTerm}) * length(summary::text) / length(${searchTerm}) > 1
          OR similarity(t.name, ${searchTerm}) > 0.3
        GROUP BY p.id, summary
        ORDER BY
          similarity(tags::text, ${searchTerm}) DESC,
          similarity(summary::text, ${searchTerm}) * length(summary::text) DESC
        LIMIT 5
        OFFSET ${page * 5}
      `;

  return rows;
}

export async function getPosts(page: number = 0): Promise<Post[]> {
  const { rows }: { rows: Post[] } = await sql`
        SELECT blog, title, href, summary, created_at, array_agg(t.name) AS tags  
        FROM posts p
        JOIN tags t ON t.id = ANY(p.tags)
        WHERE t.approved = true
        GROUP BY p.id
        ORDER BY p.id DESC 
        LIMIT 5 
        OFFSET ${page * 5}
      `;

  return rows;
}

export async function checkPostUrl({ href }): Promise<boolean> {
  const { rows }: { rows: Post[] } =
    await sql`SELECT * from POSTS where href=${href}`;
  return !!rows[0];
}

export async function addPosts(posts: Post[]) {
  const date: string = new Date().toISOString().split("T")[0];

  for (const post of posts) {
    if (isValidPost(post)) {
      await sql.query(
        `
        INSERT INTO
        posts (tags, blog, href, title, summary, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $6)`,
        [post.tags, post.blog, post.href, post.title, post.summary, date]
      );
    }
  }
}
