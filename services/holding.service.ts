import { sql } from "@vercel/postgres";

type HoldingType = {
  href: string;
  blog: string;
  title: string;
};

export function removeHoldingPost(href: string): void {
  sql`DELETE FROM posts_holding_pen  WHERE href = ${href};`;
}
export function ignoreHoldingPost(href: string): void {
  sql`UPDATE posts_holding_pen 
      SET ignore = true 
      WHERE href=${href};`;
}

// can't currently add multiple rows
// check this in future https://github.com/orgs/vercel/discussions/2336
export async function addPost({ href, blog, title }) {
  await sql`INSERT INTO posts_holding_pen
      (href, blog, title) VALUES (${href}, ${blog}, ${title});`;
}

export async function getNextPost(): Promise<HoldingType> {
  const { rows }: { rows: HoldingType[] } =
    await sql`SELECT * FROM posts_holding_pen WHERE ignore = false LIMIT 1`;
  return rows[0];
}

export async function getAllHrefs(): Promise<string[]> {
  const { rows }: { rows: { href: string }[] } = await sql`
        SELECT href FROM posts_holding_pen
        UNION ALL
        SELECT href FROM posts`;
  return rows.map((row) => row.href);
}
