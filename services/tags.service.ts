import { sql } from "@vercel/postgres";

export async function getTagId({
  newTag,
}: {
  newTag: string;
}): Promise<number> {
  const { rows } = await sql`
    SELECT id 
    FROM tags
    WHERE DIFFERENCE(name, ${newTag}) = 4`;

  if (rows[0]) {
    return rows[0].id;
  } else {
    const { rows } = await sql`
    INSERT INTO tags
      (name, soundex, approved) 
      VALUES (${newTag}, SOUNDEX(${newTag}), false)
    RETURNING id`;
    return rows[0].id;
  }
}
