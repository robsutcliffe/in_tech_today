import { sql } from "@vercel/postgres";
import { Post, isValidPost } from "@models/post.model";

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
          array_agg(t.name) AS tags
        FROM posts p
          LEFT JOIN tags t
            ON t.id = ANY(p.tags) AND t.approved = true
        WHERE similarity(summary::text, ${searchTerm}) * length(summary::text) / length(${searchTerm}) > 1
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
        LEFT JOIN tags t ON t.id = ANY(p.tags) AND t.approved = true
        GROUP BY p.id
        ORDER BY p.id DESC 
        LIMIT 5 
        OFFSET ${page * 5}
      `;

  return rows;
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
