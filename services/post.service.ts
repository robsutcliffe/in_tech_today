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
        WHERE similarity(summary::text, ${searchTerm}) * (length(summary::text)/1000) / length(${searchTerm}) > 1
           OR similarity(title, ${searchTerm}) > 0.15
           OR similarity(blog, ${searchTerm}) > 0.2
           OR EXISTS (
              SELECT 1
              FROM tags t2
              WHERE t2.id = ANY(p.tags)
                AND t2.approved = true
                AND similarity(t2.name, ${searchTerm}) > 0.3
            )
        GROUP BY p.id, p.summary, p.title, p.blog, p.href, p.created_at
        ORDER BY
          ((similarity(tags::text, ${searchTerm})) * 7) +
          (similarity(summary::text, ${searchTerm}) * 10) +
          ((similarity(title::text, ${searchTerm})) * 2) +
          similarity(blog::text, ${searchTerm}) DESC
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
