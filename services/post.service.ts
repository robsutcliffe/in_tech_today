import { sql } from "@vercel/postgres";
import { Post, isValidPost } from "../models/post.model";
export async function getPostsByDate(date: string): Promise<Post[]> {
    const { rows }: { rows: Post[]} = await sql`SELECT * from POSTS where updated_at=${date}`;
    return rows;
}

export async function getLastFivePosts(): Promise<Post[]> {
    const { rows }: { rows: Post[]} = await sql`SELECT * from POSTS ORDER BY id DESC LIMIT 5`;
    return rows;
}

export async function checkPostUrl({href}): Promise<boolean> {
    const { rows }: { rows: Post[]} = await sql`SELECT * from POSTS where href=${href}`;
    return !!rows[0];
}

export async function addPosts(posts: Post[]) {
    const date: string = new Date().toISOString().split('T')[0];

    for(const post of posts) {
        if(isValidPost(post)) {
            await sql`
                INSERT INTO
                    posts (tags, blog, href, title, summary, created_at, updated_at)
                VALUES (${JSON.stringify(post.tags)}, ${post.blog}, ${post.href}, ${post.title}, ${JSON.stringify(post.summary)}, ${date}, ${date})
        `;
        }
    }
}